import TopItemModel from '../models/top-item.model';
import { sanitizePayload } from '../utils/sanitize-payload';

class TopItemService {
    public async Create(payload: any) {
        try {
            const newItem = new TopItemModel(sanitizePayload(payload));
            const saved = await newItem.save();
            return {
                status: 201,
                message: 'create',
                data: saved
            }
        } catch (err) {
            console.error(err)
            return {
                status: 500,
                message: 'Failed to create top item',
            }
        }
    }
    public async Find(category?: string, type?: string) {
        try {
            const filter: any = {};

            if (category) {
                filter.shortDescription = { $regex: `^${category}`, $options: 'i' };
            }

            if (type) {
                filter.type = { $regex: `^${type}$`, $options: 'i' }
            }

            const result = await TopItemModel.find(filter).lean();

            return {
                status: 200,
                data: result,
                message: result.length > 0
                    ? 'Top items successfully retrieved'
                    : 'No top items found for the given filters',
            };

        } catch (err) {
            console.error('Error fetching top items:', err);
            return {
                status: 500,
                message: 'Failed to retrieve top items',
            };
        }
    }

    public async Update(id: string, payload: any) {
        try {
            const sanitized = sanitizePayload(payload)
            const updated = await TopItemModel.findByIdAndUpdate(id, sanitized, {
                new: true,
            });
            if (!updated) {
                return {
                    status: 404,
                    message: 'product no found'
                }
            }
            return {
                status: 200,
                message: 'updated',
                data: updated
            }
        } catch (err) {
            console.error(err)
            return {
                status: 500,
                message: 'some error',
            }
        }
    }

    public async Delete(id: string) {
        try {
            const deleted = await TopItemModel.findByIdAndDelete(id);
            if (!deleted) {
                return { status: 404, message: 'item no found' }
            }
            return {
                status: 204,
                message: 'successfuly delete'
            }
        } catch (err) {
            console.log(err)
            return {
                status: 500,
                message: 'server error'
            }
        }
    }
}

export { TopItemService }