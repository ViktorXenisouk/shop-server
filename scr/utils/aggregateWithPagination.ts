import { Model, FilterQuery } from "mongoose";

const aggregateWithPagination = async <T>(model: Model<T>, filter: FilterQuery<any>, page: number, limit: number = 10, sortField = '', sortOrder: -1 | 1=1) => {
    const skip = (page - 1) * limit;

    const sortOptions: Record<string, 1 | -1> = {
        [sortField]: sortOrder,
    };

    const result = await model.aggregate([
        { $match: filter },
        {
            $facet: {
                items: [
                    ...(sortField ? [{ $sort: sortOptions }] : []),
                    { $skip: skip },
                    { $limit: limit },
                ],
                totalCount: [
                    { $count: "count" }
                ]
            }
        },
        {
            $project: {
                items: 1,
                total: { $ifNull: [{ $arrayElemAt: ["$totalCount.count", 0] }, 0] }
            }
        }
    ]);

    const data = result[0].items
    const total = result[0].total
    const totalPages = Math.ceil(total / limit)

    return {
        data, paginationInfo: { total, page, totalPages }
    }
}

export { aggregateWithPagination }