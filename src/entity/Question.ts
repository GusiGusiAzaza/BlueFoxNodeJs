import { Document, model, Schema } from 'mongoose';
import { Answer } from './Answer';

const questionSchema = new Schema({
    testId: {
        type: String,
        require: true
    },
    question: {
        type: String,
        require: true
    },
    questionNumber: {
        type: Number,
        require: true
    },
    answers: {
        type: [{ answer: String, isRight: Boolean }],
        require: true
    }
});

export interface IQuestion extends Document {
    id: string;
    testId: string;
    question: string;
    questionNumber: number;
    answers: Answer[];
}

export class Question {
    id: string;
    testId: string;
    question: string;
    questionNumber: number;
    answers: Answer[];

    constructor(
        id: string,
        testId: string,
        question: string,
        questionNumber: number,
        answers: Answer[]
    ) {
        this.id = id;
        this.testId = testId;
        this.question = question;
        this.questionNumber = questionNumber;
        this.answers = answers;
    }
}

const QuestionModel = model('Question', questionSchema);

export default QuestionModel;
