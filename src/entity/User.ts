import { Document, model, Schema } from 'mongoose';

const userSchema = new Schema({
    email: String,
    username: String,
    firstName: String,
    lastName: String,
    address: String,
    city: String,
    country: String,
    rightAnswered: Number,
    totalAnswered: Number,
    avgScore: Number,
    finishedTestsCount: Number,
    passedTestsCount: Number
});

export interface IUser extends Document {
    id: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    country: string;
    rightAnswered: number;
    totalAnswered: number;
    avgScore: number;
    finishedTestsCount: number;
    passedTestsCount: number;
}

export class User {
    id: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    country: string;
    rightAnswered: number;
    totalAnswered: number;
    avgScore: number;
    finishedTestsCount: number;
    passedTestsCount: number;

    constructor(
        id: string,
        email: string = '',
        username: string = '',
        firstName: string = '',
        lastName: string = '',
        address: string = '',
        city: string = '',
        country: string = '',
        rightAnswered: number = 0,
        totalAnswered: number = 0,
        avgScore: number = 0,
        finishedTestsCount: number = 0,
        passedTestsCount: number = 0
    ) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.country = country;
        this.rightAnswered = rightAnswered;
        this.totalAnswered = totalAnswered;
        this.avgScore = avgScore;
        this.finishedTestsCount = finishedTestsCount;
        this.passedTestsCount = passedTestsCount;
    }
}

const UserModel = model('User', userSchema);

export default UserModel;
