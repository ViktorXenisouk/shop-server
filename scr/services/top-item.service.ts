import TopItem from '../models/top-item.model';
import { sanitizePayload } from '../utils/sanitizePayload';

class TopItemService {
    public async create(payload: any) {
        try {
            const newItem = new TopItem(sanitizePayload(payload));
            const saved = await newItem.save();
            return { status: 200, message: 'create', data: saved }
        } catch (err) {
            return { status: 500, message: 'Failed to create top item', error: err }
        }
    }
    public async find(category?: string, type?: string) {
        try {
            const filter: any = {};

            if (category) {
                filter.shortDescription = { $regex: `^${category}`, $options: 'i' };
            }

            if (type) {
                filter.type = { $regex: `^${type}$`, $options: 'i' }; // строгий match, без учёта регистра
            }

            const result = await TopItem.find(filter).lean();

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

    public async update(id: string, payload: any) {
        try {
            const sanitized = sanitizePayload(payload)
            const updated = await TopItem.findByIdAndUpdate(id, sanitized, {
                new: true,
            });
            if (!updated) {
                return { status: 404, message: 'product no found' }
            }
            return { status: 200, message: 'updated', data: updated }
        } catch (err) {
            return { status: 500, message: 'some error', error: err }
        }
    }

    public async delete(id: string) {
        try {
            const deleted = await TopItem.findByIdAndDelete(id);
            if (!deleted) {
                return { status: 404, message: 'item no found' }
            }
            return { status: 200, message: 'successfuly delete' }
        } catch (err) {
            return { status: 500, message: 'server error' }
        }
    }
}

export {TopItemService}