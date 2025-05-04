const sanitizeUpdatePayload = (data: Record<string, any>) => {
    const cleaned: Record<string, any> = {};

    for (const key in data) {
        const value = data[key];

        // Исключаем undefined и null
        if (value !== undefined && value !== null) {
            cleaned[key] = value;
        }
    }

    return cleaned;
};

export { sanitizeUpdatePayload }