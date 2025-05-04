import Category from "../models/Category"

const getMergedTags = async (fullPath: string) => {
  const parts = fullPath.split('/').filter(Boolean);

  // Получим все уровни пути
  const allPaths: string[] = [];
  for (let i = 1; i <= parts.length; i++) {
    allPaths.push(parts.slice(0, i).join('/'));
  }

  // Найдём все категории по пути
  const categories = await Category.find({ fullPath: { $in: allPaths } });

  // Сортируем в порядке от корня к листу
  categories.sort((a, b) => a.fullPath.length - b.fullPath.length);

  const mergedTags: Record<string, any> = {};

  for (const cat of categories) {
    if (cat.tags) {
      for (const [key, value] of cat.tags.entries()) {
        mergedTags[key] = value; // перезаписывает, если один и тот же ключ
      }
    }
  }

  return mergedTags;
};

const buildTree = (items: any[]): any[] => {
  const map = new Map<string, any>();
  const roots: any[] = [];

  for (const item of items) {
    map.set(item.fullPath, { ...item, catalogs: [] });
  }

  for (const item of items) {
    const node = map.get(item.fullPath)!;
    if (item.parentPath) {
      const parent = map.get(item.parentPath);
      if (parent) {
        parent.catalogs.push(node);
      }
    } else {
      roots.push(node);
    }
  }

  return roots;
};

const flattenCatalogTree = (nodes: any[], parentPath = ""): any[] => {
  const result: any[] = [];

  for (const node of nodes) {
    const fullPath = parentPath ? `${parentPath}/${node.path}` : node.path;

    const current = {
      name: node.name,
      path: node.path,
      fullPath,
      parentPath: parentPath || undefined,
      discription: node.discription,
      imgUrl: node.imgUrl,
      tags: node.tags
    };

    result.push(current);

    if (node.catalogs && Array.isArray(node.catalogs)) {
      const children = flattenCatalogTree(node.catalogs, fullPath);
      result.push(...children);
    }
  }

  return result;
};

export { getMergedTags, buildTree,flattenCatalogTree }