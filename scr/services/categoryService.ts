import Category from "../models/Category";
import { getMergedTags, buildTree, flattenCatalogTree } from "../utils/catalogUtils";
import { message } from "../types";

const updateCategory = async (payload: { path: string, name: string, discription: string, imgUrl: string }) => {
    const { path, name, discription, imgUrl } = payload;
    const paths = path.split("/").filter(Boolean);
    const parentPath = paths.slice(0, -1).join("/");
    const fullPath = paths.join("/");
    const lastSegment = paths[paths.length - 1];

    return Category.findOneAndUpdate(
        { fullPath },
        {
            $set: {
                path: lastSegment,
                fullPath,
                parentPath,
                name,
                discription,
                imgUrl,
            },
        },
        { upsert: true, new: true }
    );
};

const getCategoryByFullPath = async (fullPath: string) =>
    await Category.findOne({ fullPath });

const deleteCategoryByFullPath = async (fullPath: string) =>
    await Category.findOneAndDelete({ fullPath });

const addOrUpdateTag = async (fullPath: string, categoryKey: string, tagData: any): Promise<message> => {
    const category = await Category.findOne({ fullPath });
    if (!category) return { success: false, status: 404 }

    category.tags = category.tags || {} as Map<string, any>;
    category.tags.set(categoryKey, tagData);

    await category.save();
    return { success: true, status: 200 }
}

const getCategoryTree = async () => {
    const categories = await Category.find({ isDeleted: { $ne: true } }).lean();

    const simplified = categories.map(cat => ({
        name: cat.name,
        path: cat.path,
        fullPath: cat.fullPath,
        parentPath: cat.parentPath,
        discription: cat.discription,
        imgUrl: cat.imgUrl
    }));

    const tree = buildTree(simplified);
    return tree
}

const uploadCatalogJson = async (jsonTree: any[]): Promise<message> => {
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

const createCategory = async (name: string, path: string, discription: string, imgUrl: string, tags: string): Promise<message> => {
    // Проверка на обязательные параметры
    if (!name || !path) {
        return { success: false, status: 400, message: "Имя и путь категории обязательны." };
    }

    // Создание категории
    const category = new Category({
        name,
        path,
        fullPath: path,
        parentPath: '',
        discription: discription || '',
        imgUrl: imgUrl || '',
        tags: tags || {}
    });

    // Сохраняем категорию в базу данных
    await category.save();
    return { success: true, status: 200 };
}

const deleteCategory = async (path: string): Promise<message> => {
    if (!path) return { success: false, status: 400, message: "Путь категории обязателен." }
    // Ищем категорию по пути и удаляем
    const category = await Category.findOneAndDelete({ fullPath: path });

    if (!category) return { success: false, status: 404, message: "Категория не найдена." };
    return { success: true, status: 200 };
}

const removeTag = async(fullPath:string,categoryKey:string) : Promise<message> => {
  const category = await Category.findOne({ fullPath });
    if (!category || !category.tags) return {success:false,status:400,message:'do not find tags or category'};

    category.tags.delete(categoryKey);
    await category.save();
    return {success:true,status:200};
}

const getTags = async(fullPath: string) => {
    const tags = await getMergedTags(fullPath)
    return tags    
}

export { updateCategory, getCategoryByFullPath, deleteCategoryByFullPath, addOrUpdateTag, getCategoryTree, uploadCatalogJson, createCategory,deleteCategory,removeTag,getTags }