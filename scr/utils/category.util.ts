const buildPathHierarchy = (path: string): string[] => {
    const parts = path.split('/');
    const result: string[] = [];
  
    for (let i = 0; i < parts.length; i++) {
      result.push(parts.slice(0, i + 1).join('/'));
    }
  
    return result;
}

const splitPath = (path: string) => path.split('/').filter(Boolean);

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

export { buildPathHierarchy, splitPath,buildTree,flattenCatalogTree }