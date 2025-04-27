import fs from 'fs'
import { splitPath } from '../core/splitPath';
import CatalogModel from "../models/Catalog"

type Product = {
    name: string;
    path: string;
    a: string[];
} & any

const initialize = () => {
    const jsonText = fs.readFileSync("public/catalog.json", 'utf8');
    const data = JSON.parse(jsonText);

    const catalog: any[] = data.catalog as any[]

    foreachCatalog(catalog, '', iii)
}

const iii = (element: Product, fullPath: string) => {
    element.path = fullPath;

    const paths = splitPath(fullPath)

    element.a = fullPath.split('/')
    console.log('array:' + fullPath)

    return
    element.a.forEach((element: string) => {
        console.log(element)
    });
}

const foreachCatalog = (array: any[], path: string, callback: (element: Product, fullPath: string) => void) => {
    for (let i = 0; i < array.length; i++) {
        let fullPath = ''
        if (path == '') {
            fullPath = array[i].path;
        }
        else {
            fullPath = path + '/' + array[i].path;
        }
        callback(array[i], fullPath)
        const catalogs = array[i].catalogs as any[]
        if (catalogs) {
            foreachCatalog(catalogs, fullPath, callback)
        }
    }
}

initialize()