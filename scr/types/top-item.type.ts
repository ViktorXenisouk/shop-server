interface TopItem {
    type: 'product' | 'category' | 'article';
    title: string;
    url: string;
    imageUrl: string;
    shortDescription: string;
    priority: number
}

export { TopItem }