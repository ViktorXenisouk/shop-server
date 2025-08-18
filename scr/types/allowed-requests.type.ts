interface AllowedRequests {
    name: string,
    url: string,
    icon: string,
    type: 'product' | 'category' | 'article'
    isAutoCreated: boolean
}

export { AllowedRequests }