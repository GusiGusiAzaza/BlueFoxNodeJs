import { Document, model, Schema } from 'mongoose';

const questionSchema = new Schema({
    resultId: String,
    questionId: String,
    answerId: String
});

export interface IQuestion extends Document {
    id: string;
    resultId: string;
    questionId: string;
    answerId: string;
}

export class Question {
    id: string;
    resultId: string;
    questionId: string;
    answerId: string;

    constructor(
        id: string,
        resultId: string,
        questionId: string,
        answerId: string
    ) {
        this.id = id;
        this.resultId = resultId;
        this.questionId = questionId;
        this.answerId = answerId;
    }
}

const QuestionModel = model('Question', questionSchema);

export default QuestionModel;
