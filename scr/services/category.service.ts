import Category from "../models/category.model";
import { getMergedTags, buildTree, flattenCatalogTree, flattenCatalogTreeMultiple } from "../utils/catalog.util";
import { sanitizePayload } from "../utils/sanitize-payload";
import { parseTags } from "../utils/parse-tags";
import { ICategory } from "../types/category.type";

class CategoryService {

    public async GetById(id: string) {
        try {
            const category = await Category.findById(id)

            return { success: true, status: 200, data: category, message: 'good' }
        }
        catch (err) {
            return { success: true, status: 500, message: 'some error' }
        }
    }

    public async GetBySubPath(subPath: string) {
        try {
            const category = await Category.findOne({ fullPath: subPath }).lean()

            if (!category)
                return { success: false, status: 404, message: 'cannot find category' }

            const filter = { parentPath: category.fullPath }

            const subCategories = await Category.find(filter).lean()

            const data = category as any

            data.subCategories = subCategories

            return { data, success: true, status: 200, message: 'okey' }
        } catch (err) {
            return { success: false, status: 500, message: 'some error' }
        }
    }

    public async Find(payload: { parentPath?: string, name?: string, tags?: string }) {
        try {
            const { parentPath, name, tags } = payload
            const filter = {} as any

            if (parentPath) {
                if (parentPath === '#root' || parentPath === '%23root')
                    filter.parentPath = { $exists: false }
                else
                    filter.parentPath = parentPath
            }
            if (name) filter.name = name
            const tagArray = parseTags(tags)
            if (tagArray) filter.tags = { $elemMatch: { $in: [...tagArray] } }

            const categories = await Category.find(filter).lean()

            return { success: true, status: 200, data: categories, message: 'nice' }
        }
        catch (err) {
            return { success: false, status: 500, message: 'some error' }
        }
    }

    public async Edit(id: string, payload: { path: string, name: string, discription: string, tags: string[] }) {
        const cat = await Category.findById(id);
        if (!cat) {
            return { success: false, status: 500, message: 'can not find your cat' };
        }

        if (payload.path) {
            const categories = await Category.find({ parentPath: { $regex: `^${cat.fullPath}` } });

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

        const sanitize = sanitizePayload(payload);
        cat.set(sanitize);
        await cat.save();

        return { success: true, status: 200, message: 'okey' };
    }

    public async GetByFullPath(fullPath: string) {
        try {
            const category = await Category.findOne({ fullPath });

            if (!category)
                return { success: false, status: 404, message: 'no find' }

            return { success: true, status: 200, data: category, message: 'find' }
        }
        catch (err) {
            return { success: false, status: 500, message: err || 'some mistake' }
        }
    }

    public async DeleteByFullPath(fullPath: string) {
        try {
            const category = await Category.findOneAndDelete({ fullPath });

            if (!category)
                return { success: false, status: 404, message: 'no find category' }

            return { success: true, status: 200, message: 'successfuly delete' }
        }
        catch (err) {
            return { success: false, status: 500, message: err || 'some mistake' }
        }
    }

    public async GetCategoryTree() {
        const categories = await Category.find({ isDeleted: { $ne: true } }).lean();


        const simplified = categories.map(cat => ({
            name: cat.name,
            path: cat.path,
            fullPath: cat.fullPath,
            parentPath: cat.parentPath,
        }));

        const tree = buildTree(simplified);

        return { success: true, status: 200, message: 'build tree', data: tree }
    }

    public async UploadCatalogJson(jsonTree: ICategory[]) {
        try {
            if (!Array.isArray(jsonTree)) {
                return { success: false, status: 400, message: "JSON должен быть массивом." };
            }

            const flattened = flattenCatalogTree(jsonTree);

            for (const item of flattened) {
                await Category.findOneAndUpdate(
                    { fullPath: item.fullPath },
                    { $set: item },
                    { upsert: true, new: true }
                );
            }
            return { success: true, status: 200, message: "Каталог успешно загружен и обновлён." }
        }
        catch (err) {
            return { success: false, status: 500, message: 'some error' }
        }
    }

    public async UploadCatalogJsonMultiple(jsonTree: any[]) {
        try {
            if (!Array.isArray(jsonTree)) {
                return { success: false, status: 400, message: "JSON должен быть массивом." };
            }

            const flattened = flattenCatalogTreeMultiple(jsonTree);

            for (const item of flattened) {
                await Category.findOneAndUpdate(
                    { fullPath: item.fullPath },
                    { $set: item },
                    { upsert: true, new: true }
                );
            }
            return { success: true, status: 200, message: "Каталог успешно загружен и обновлён." }
        }
        catch (err) {
            return { success: false, status: 500, message: 'some error' }
        }
    }

    public async Create(payback: { name: string, path: string, discription: string, tags: { [categoryName: string]: string[] }, parentPath?: string, fullpath?: string, imgUrl: string }) {
        try {
            if (!payback.name || !payback.path) {
                return { success: false, status: 400, message: "Имя и путь категории обязательны." };
            }

            if (payback.parentPath == '#root') {
                payback.fullpath = payback.path
                delete payback.parentPath
            }
            else {
                payback.fullpath = (payback.parentPath + '/' + payback.path)
            }

            payback.tags = payback.tags || {}
            payback.discription = payback.discription || ''
            payback.imgUrl = payback.imgUrl || ''

            const category = new Category(payback);

            await category.save();
            return { success: true, status: 200 };
        }
        catch (err) {
            return { success: true, status: 500, message: err || 'some error' }
        }
    }

    public async Delete(path: string) {
        if (!path) return { success: false, status: 400, message: "Путь категории обязателен." }
        try {
            const category = await Category.findOneAndDelete({ fullPath: path });

            if (!category)
                return { success: false, status: 404, message: "Категория не найдена." };

            return { success: true, status: 200 };
        }
        catch (err) {
            return { success: true, status: 500, message: err || 'some error' }
        }
    }

    public async GetTags(fullPath: string) {
        try {
            const tags = await getMergedTags(fullPath)

            if (!tags)
                return { success: false, status: 404, message: 'no found' }

            return { success: true, status: 200, message: 'find tags', data: tags }
        }
        catch (err) {
            return { success: false, status: 500, message: err || 'some err' }
        }
    }

}

export { CategoryService }