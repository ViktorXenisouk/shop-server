import Category from "../models/category.model"
import { ICategory } from "../types/category.type";

const getMergedTags = async (fullPath: string) => {
  /*
  const parts = fullPath.split('/').filter(Boolean);

  // Получим все уровни пути
  const allPaths: string[] = [];
  for (let i = 1; i <= parts.length; i++) {
    allPaths.push(parts.slice(0, i).join('/'));
  }
*/
  // Найдём все категории по пути
  const categories = await Category.find({ fullPath: { $regex: `^${fullPath}` } });

  // Сортируем в порядке от корня к листу
  categories.sort((a, b) => a.fullPath.length - b.fullPath.length);

  const mergedTags: Record<string, any> = {};

  for (const cat of categories) {
    if (cat.filter) {
      for (const [key, value] of cat.filter.entries()) {
        mergedTags[key] = value; // перезаписывает, если один и тот же ключ
      }
    }
  }

  return mergedTags;
};

const buildTree = (items: { parentPath: string, fullPath: string, name: string, path: string }[]): any[] => {
  const map = new Map<string, any>();
  const roots: any[] = [];

  for (const item of items) {
    map.set(item.fullPath, { ...item, subCategories: [] });
  }

  for (const item of items) {
    const node = map.get(item.fullPath)!;
    console.log(node)
    if (item.parentPath && item.parentPath !== '') {
      const parent = map.get(item.parentPath);
      if (parent) {
        parent.subCategories.push(node);
      }
    } else {
      roots.push(node);
    }
  }

  console.log(roots.length)

  return roots;
};

const flattenCatalogTree = (nodes: any[], parentPath = ""): any[] => {
  const result: any[] = [];

  for (const node of nodes) {
    const fullPath = parentPath ? `${parentPath}/${node.path}` : node.path;

    const current: ICategory = {
      name: node.name,
      path: node.path,
      fullPath,
      parentPath: parentPath || '',
      discription: node.discription,
      imgUrl: node.imgUrl,
      filter: node.filter,
      isDeleted: false,
    };

    result.push(current);

    if (node.catalogs && Array.isArray(node.catalogs)) {
      const children = flattenCatalogTree(node.catalogs, fullPath);
      result.push(...children);
    }
  }

  return result;
};

const flattenCatalogTreeMultiple = (nodes: any[], parentPath = ""): any[] => {
  const result: any[] = [];

  for (let i = 0; i < 3; i++) {
    for (const node of nodes) {
      const fullPath = parentPath ? `${parentPath}${i}/${node.path}` : node.path + i;

      const filter = node.filter

      for (let field in filter) {
        if (filter[field].variant === 'tags-vertical' || filter[field].variant === 'tags-horizontal') {
          const array = [] as string[]
          for (let tag in filter[field].props.tags) {
            array.push(tag + i)
          }
          filter[field].props.tags = array
        }
      }

      const current: ICategory = {
        name: node.name + i,
        path: node.path + i,
        fullPath,
        parentPath: parentPath ? parentPath + i : '',
        discription: node.discription,
        imgUrl: node.imgUrl,
        filter: filter,
        isDeleted: false,
      };

      result.push(current);

      if (node.catalogs && Array.isArray(node.catalogs)) {
        const children = flattenCatalogTree(node.catalogs, fullPath);
        result.push(...children);
      }
    }
  }

  return result;
};

export { getMergedTags, buildTree, flattenCatalogTree, flattenCatalogTreeMultiple }