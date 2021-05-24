import TestModel, { ITest, Test } from '../entity/Test';
import { ValidationError } from '../model/HttpError';

class TestRepository {
    async findById(id: string): Promise<ITest['_id']> {
        return TestModel.findById(id);
    }

    async create(test: Test): Promise<ITest['_id']> {
        const { id, ...testData } = test;

        return TestModel.create({ ...testData });
    }

    async delete(id: string): Promise<ITest['_id']> {
        if (!await this.findById(id)) throw new ValidationError('Test not found');

        return TestModel.findByIdAndDelete(id);
    }

    async findAll():Promise<ITest['_id'][]> {
        return TestModel.find();
    }

    async findAllByThemeId(themeId: string):Promise<ITest['_id'][]> {
        return TestModel.find({ themeId: themeId });
    }
}

export default new TestRepository();
