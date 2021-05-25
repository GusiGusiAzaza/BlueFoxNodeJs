import TestResultModel, { ITestResult, TestResult } from '../entity/TestResult';

class TestResultRepository {
    async findById(id: string): Promise<ITestResult['_id']> {
        return TestResultModel.findById(id);
    }

    async create(testResult: TestResult): Promise<ITestResult['_id']> {
        const { id, ...testResultData } = testResult;

        return TestResultModel.create({ ...testResultData });
    }

    async findAllByUserId(userId: string):Promise<ITestResult['_id'][]> {
        return TestResultModel.find({ userId: userId });
    }
}

export default new TestResultRepository();
