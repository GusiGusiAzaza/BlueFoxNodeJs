import { Document, model, Schema } from 'mongoose';

const testResultSchema = new Schema({
    userId: String,
    testId: String,
    questionsCount: Number,
    tryCount: Number,
    score: Number,
    rightAnswered: Number,
    startDate: Date,
    endDate: Date
});

export interface ITestResult extends Document {
    id: string;
    userId: string;
    testId: string;
    questionsCount: number;
    tryCount: number;
    score: number;
    rightAnswered: number;
    startDate: Date;
    endDate: Date;
}

export class TestResult {
    id: string;
    userId: string;
    testId: string;
    questionsCount: number;
    tryCount: number;
    score: number;
    rightAnswered: number;
    startDate: Date;
    endDate: Date;

    constructor(
        id: string,
        userId: string,
        testId: string,
        questionsCount: number = 0,
        tryCount: number = 1,
        score: number = 0,
        rightAnswered: number = 0,
        startDate: Date = new Date(),
        endDate: Date = new Date(0)
    ) {
        this.id = id;
        this.userId = userId;
        this.testId = testId;
        this.questionsCount = questionsCount;
        this.tryCount = tryCount;
        this.score = score;
        this.rightAnswered = rightAnswered;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}

const TestResultModel = model('TestResult', testResultSchema);

export default TestResultModel;
