export interface IUserAnswer {
    id: string;
    questionId: string;
    answerId: string;
}

export class UserAnswer {
    id: string;
    questionId: string;
    answerId: string;

    constructor(
        id: string,
        questionId: string,
        answerId: string
    ) {
        this.id = id;
        this.questionId = questionId;
        this.answerId = answerId;
    }
}
