import { Document, model, Schema } from 'mongoose';

const testSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    themeId: {
        type: String,
        require: true
    },
    timeLimit: {
        type: Number,
        require: true,
        min: 1,
        max: 240
    },
    passScore: {
        type: Number,
        require: true,
        min: 0,
        max: 100
    }
});

export interface ITest extends Document {
    id: string;
    name: string;
    themeId: string;
    timeLimit: number;
    passScore: number;
}

export class Test {
    id: string;
    name: string;
    themeId: string;
    timeLimit: number;
    passScore: number;

    constructor(
        id: string,
        name: string,
        themeId: string,
        timeLimit: number,
        passScore: number
    ) {
        this.id = id;
        this.name = name;
        this.themeId = themeId;
        this.timeLimit = timeLimit;
        this.passScore = passScore;
    }
}

const TestModel = model('Test', testSchema);

export default TestModel;
