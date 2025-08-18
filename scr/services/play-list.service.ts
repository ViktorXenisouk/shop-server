import Playlist from "../models/play-list.model";
import productModel from "../models/product.model";
import { getMergedTags, buildTree, flattenCatalogTree, flattenCatalogTreeMultiple } from "../utils/catalog.util";
import { sanitizePayload } from "../utils/sanitize-payload";
import { parseTags } from "../utils/parse-tags";
import { IProduct } from "../types/product";

class PlayListService {
    private isRoot(path?: string | null) {
        if (!path || path === '#root' || path === '%23root')
            return true
        return false
    }

    public async GetByName(name: string) {
        try {
            const category = await Playlist.findOne({ path: { $eq: name } })

            if (!category) return {
                status: 404,
                message: 'no found'
            }

            return {
                status: 200,
                data: category,
            }
        }
        catch (err) {
            console.error(err)
            return {
                status: 500,
                message: 'error during getting category by name'
            }
        }
    }

    public async GetRootPlayLists() {
        try {
            const playLists = await Playlist.find({ parentPath: { $exists: false } }).lean()

            if (!playLists) return {
                status: 404,
                message: 'cannot find category'
            }

            const array = [] as any[]

            for (let i = 0; i < playLists.length; i++) {
                const newPlayList = { ...playLists[i] } as any
                const filter = { parentPath: newPlayList.fullPath }
                const subCategories = await Playlist.find(filter).lean()
                newPlayList.subCategories = subCategories
                array.push(newPlayList)
            }

            return {
                status: 200,
                data: array,
            }
        } catch (err) {
            console.error(err)
            return {
                status: 500,
                message: 'error during get root playlists'
            }
        }
    }

    public async Find(parentPath?: string, name?: string, tags?: string) {
        try {
            const filter = {} as any

            if (parentPath) {
                if (this.isRoot(parentPath))
                    filter.parentPath = { $exists: false }
                else
                    filter.parentPath = parentPath
            }

            if (name) filter.name = name

            const tagArray = parseTags(tags)

            if (tagArray)
                filter.tags = { $elemMatch: { $in: [...tagArray] } }

            const categories = await Playlist.find(filter).lean()

            return {
                status: 200, data:
                    categories,
                message: `successfuly find ${categories.length} categories`
            }
        }
        catch (err) {
            console.error(err)
            return {
                status: 500,
                message: 'error during find elements'
            }
        }
    }

    public async GetPlayListBySubPath(subPath: string) {
        try {
            const playList = await Playlist.findOne({ fullPath: subPath }).lean()

            if (!playList) return {
                status: 404,
                message: 'cannot find category'
            }

            const filter = { parentPath: playList.fullPath }

            const subCategories = await Playlist.find(filter).lean()

            const data = playList as any

            data.subCategories = subCategories

            return {
                status: 200,
                message: 'okey',
                data,
            }
        } catch (err) {
            console.error(err)
            return {
                status: 500,
                message: 'some error'
            }
        }
    }

    public async Update(path: string, payload: { path: string, name: string, discription: string, tags: string[], ids: string[], parentPath?: string }) {
        try {
            const cat = await Playlist.findOne({ path: path });

            if (!cat) return {
                status: 404,
                message: 'can not find your cat'
            };

            if (payload.path) {
                const categories = await Playlist.find({ parentPath: { $regex: `^${cat.fullPath}` } });

                const fullPath = cat.parentPath ? `${cat.parentPath}/${payload.path}` : payload.path;

                for (const categ of categories) {
                    if (categ.parentPath) {
                        categ.parentPath = categ.parentPath.replace(cat.fullPath, fullPath);
                    }
                    categ.fullPath = categ.fullPath.replace(cat.fullPath, fullPath);
                    await categ.save();
                }

                cat.fullPath = fullPath;
            }

            if (payload.parentPath) {
                delete payload.parentPath
            }

            const sanitize = sanitizePayload(payload);

            cat.set(sanitize);

            await cat.save();

            return {
                success: true,
                status: 200,
                message: 'successfully update'
            }
        }
        catch (err) {
            console.error(err)
            return {
                status: 500,
                message: 'some error'
            }
        }
    }

    public async getPlayListByFullPath(fullPath: string) {
        try {
            const category = await Playlist.findOne({ fullPath });

            if (!category) return {
                status: 404,
                message: 'no find'
            }

            return {
                 status: 200, 
                 data: category, 
                 message: 'find' 
                }
        }
        catch (err) {
            console.error(err)
            return { 
                 status: 500, 
                 message: 'some mistake' 
                }
        }
    }

    public async DeletePlayListByFullPath(fullPath: string) {
        try {
            const category = await Playlist.findOneAndDelete({ fullPath });

            if (!category)return {
                 status: 404, 
                 message: 'no find category' 
                }

            return { 
                status: 200, 
                message: 'successfuly delete'
             }
        }
        catch (err) {
            console.error(err)
            return { 
                 status: 500, 
                 message: 'some mistake' 
                }
        }
    }

    public async createPlaylist(payback: { path: string, parentPath?: string, fullPath: string, title: string, discription: string, tags: string[] }) {
        try {
            if (!payback.path || !payback.title)  return { 
                status: 400, 
                message: "Имя и путь категории обязательны." 
            }
            
            if (this.isRoot(payback.parentPath)) {
                payback.fullPath = payback.path
                delete payback.parentPath
            }
            else {
                payback.fullPath = (payback.parentPath + '/' + payback.path)
            }

            const playlist = new Playlist(payback);

            await playlist.save();

            return { 
                status: 201 ,
                message:'playlist successfuly create'
            }
        }
        catch (err) {
            console.error(err)
            return { 
                status: 500,
                 message: 'some error' 
                }
        }
    }

    public async getProductsByFullPath(fullPath: string, page: number | null, limit: number | null) {
        try {
            const playlist = await Playlist.findOne({ fullPath: { $regex: `^${fullPath}` } }).lean();

            if (!playlist)return { 
                status: 404 ,
                message:'cannot find playlist by full path'
            };

            const ids = playlist.ids

            const Products: IProduct[] = []

            if (page && limit) { // if user want to use pagination but it is optionary
                const start = (page - 1) * limit

                const end = start + limit

                ids.slice(start, end).forEach(async (id) => {
                    const p = await productModel.findById(id)
                    if (p)
                        Products.push(p)
                })
                return { 
                    status: 200, 
                    data: Products, 
                    paginationInfo: { 
                        total: ids.length, 
                        page: page, 
                        totalPages: Math.ceil(ids.length / limit) } 
                    };
            }
            else {
                for (let i = 0; i < ids.length; i++) {
                    const id = ids[i]
                    const product = await productModel.findById(id).lean()
                    if (product)
                        Products.push(product)
                }

                return { 
                    status: 200, 
                    data: Products 
                };
            }
        }
        catch (err) {
            console.error(err)
            return { 
                status: 500, 
                message: 'some error'
            }
        }
    }
}


export { PlayListService }