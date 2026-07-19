

export class GenericRepository {
    model;
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        return await this.model.create(data);
    }

    async findAll(filter = {}) {
        return await this.model.find(filter);
    }

    async findById(id) {
        return await this.model.findById(id);
    }

    async findOne(filter) {
        return await this.model.findOne(filter);
    }

    async updateById(
        id,
        data
    ) {
        return await this.model.findByIdAndUpdate(id, data, {
            new: true,
        });
    }

    async deleteById(id) {
        const result = await this.model.findByIdAndDelete(id);

        return !!result;
    }

    async count(filter = {}) {
        return await this.model.countDocuments(filter);
    }

    async exists(filter) {
        const result = await this.model.exists(filter);

        return !!result;
    }
}