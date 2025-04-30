import fs from "fs";

// Тип для продукта
type Product = {
    name: string;
    path: string;
    discription?: string;
    imgUrl?: string;
    catalogs?: Product[];
    isDeleted?: Boolean;
};

type message = {
    message:string;
    success:boolean
}

// Проверка и санитизация на вредоносный код
const sanitizeInput = (input: string): string => {
    return input
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;");
};

const getPublicCatalog = () => {
    const jsonText = fs.readFileSync("public/catalog_users.json", 'utf8');
    return JSON.parse(jsonText);
}

// Получение каталога
const getCatalog = (): Product => {
    const jsonText = fs.readFileSync("public/catalog.json", 'utf8');
    return JSON.parse(jsonText) as Product;
};

// Сохранение каталога
const setCatalog = (json: Product) => {
    fs.writeFileSync("public/catalog.json", JSON.stringify(json));
    fs.writeFileSync("public/catalog_users.json", JSON.stringify(filterDeleted(json)));
};

// Функция поиска или создания по пути
const findOrCreateByPath = (product: Product, paths: string[], lvl: number, callback: (obj: Product) => void): message => {
    if (lvl >= paths.length) {
        callback(product);
        return {success:true,message:'Категория создана или обновлена успешно.'};
    }

    if (!product.catalogs) {
        product.catalogs = [];
    }

    let next = product.catalogs.find(cat => cat.path === paths[lvl]);

    if (!next) {
        next = {
            name: '',
            path: paths[lvl],
            catalogs: []
        };
        product.catalogs.push(next);
    }

    return findOrCreateByPath(next, paths, lvl + 1, callback);
};

// Создание с путём
const CreateWithPath = (path: string, name?: string, discription?: string, imgUrl?: string): message => {
    const product = getCatalog();
    const paths = path.split('/').filter(p => p); // Убираем пустые строки

    const result = findOrCreateByPath(product, paths, 0, (obj: Product) => {
        if (name) obj.name = sanitizeInput(name);
        if (discription) obj.discription = sanitizeInput(discription);
        if (imgUrl) obj.imgUrl = sanitizeInput(imgUrl);
    });

    setCatalog(product);

    return result;
};

// Удаление по пути
const removeByPath = (path: string, softDelete: boolean = true): message => {
    const product = getCatalog();
    const paths = path.split('/').filter(p => p);

    if (paths.length === 0) return { success: false, message: 'Неверный путь.' };

    if (paths.length === 1) {
        return { success: false, message: "Нельзя удалить корневой каталог." };
    }

    const last = paths[paths.length - 1];
    const parentPaths = paths.slice(0, -1);

    const result = findOrCreateByPath(product, parentPaths, 0, (parent: Product) => {
        if (!parent.catalogs) return;

        const target = parent.catalogs.find(c => c.path === last);

        if (softDelete && target) {
            target.isDeleted = true;
        } else {
            parent.catalogs = parent.catalogs.filter(c => c.path !== last);
        }
    });

    setCatalog(product);

    return { success: result.success, message: 'Категория удалена или помечена как удалённая.' };
};

// Редактирование по пути
const editByPath = (path: string, updates: Partial<Product>): message => {
    const product = getCatalog();
    const paths = path.split('/').filter(p => p);

    const result = findOrCreateByPath(product, paths, 0, (obj: Product) => {
        if (updates.name !== undefined) obj.name = sanitizeInput(updates.name);
        if (updates.discription !== undefined) obj.discription = sanitizeInput(updates.discription);
        if (updates.imgUrl !== undefined) obj.imgUrl = sanitizeInput(updates.imgUrl);
    });

    setCatalog(product);

    return result;
};

// Восстановление по пути
const restoreByPath = (path: string): message => {
    const product = getCatalog();
    const paths = path.split('/').filter(p => p);

    if (paths.length === 0) return { success: false, message: 'Неверный путь.' };

    const result = findOrCreateByPath(product, paths, 0, (obj: Product) => {
        if (obj.isDeleted) {
            delete obj.isDeleted;
            console.log(`Восстановлен: ${path}`);
        } else {
            return { success: false, message: `Элемент по пути '${path}' не был удалён или не найден.` };
        }
    });

    setCatalog(product);

    return { success: false, message: 'Элемент восстановлен.' };
};

// Фильтрация удалённых элементов
const filterDeleted = (product: Product): Product => {
    const clone: Product = { ...product };

    if (clone.catalogs) {
        clone.catalogs = clone.catalogs
            .filter(cat => !cat.isDeleted)
            .map(cat => filterDeleted(cat));
    }

    return clone;
};

// Экспорт
export { getCatalog,getPublicCatalog,CreateWithPath, removeByPath, editByPath, restoreByPath };
