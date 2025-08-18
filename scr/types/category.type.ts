interface IFilter {
    variant: 'number' | 'min-max' | 'tags-horizontal' | 'tags-vertical';
    props: any;
}

interface ICategory {
    name: string;
    path: string;
    fullPath: string;
    parentPath: string;
    discription: string;
    imgUrl: string;
    filter: Map<string, IFilter>;
    isDeleted: boolean;
}

export { IFilter, ICategory }