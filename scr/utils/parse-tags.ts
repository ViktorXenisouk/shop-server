const parseTags = (tags?: string | null) => {

    if (tags)
        return tags.split(',');
    return null
}

export { parseTags }