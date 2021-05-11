import { Document, model, Schema } from 'mongoose';

const userSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        ref: 'Auth',
        required: true,
        unique: true
    },
    rightAnswered: Number,
    totalAnswered: Number,
    avgScore: Number,
    finishedTestsCount: Number,
    passedTestsCount: Number
});

export interface IUser extends Document {
    id: string;
    rightAnswered: number;
    totalAnswered: number;
    avgScore: number;
    finishedTestsCount: number;
    passedTestsCount: number;
}

export class User {
    id: string;
    rightAnswered: number;
    totalAnswered: number;
    avgScore: number;
    finishedTestsCount: number;
    passedTestsCount: number;

    constructor(
        id: string,
        rightAnswered: number = 0,
        totalAnswered: number = 0,
        avgScore: number = 0,
        finishedTestsCount: number = 0,
        passedTestsCount: number = 0
    ) {
        this.id = id;
        this.rightAnswered = rightAnswered;
        this.totalAnswered = totalAnswered;
        this.avgScore = avgScore;
        this.finishedTestsCount = finishedTestsCount;
        this.passedTestsCount = passedTestsCount;
    }
}

const UserModel = model('User', userSchema);

export default UserModel;
