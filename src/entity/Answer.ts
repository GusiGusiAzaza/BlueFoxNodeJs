export class Answer {
    answer: string;
    isRight: boolean;

    constructor(
        answer: string,
        isRight: boolean
    ) {
        this.answer = answer;
        this.isRight = isRight;
    }
}

export interface IAnswer {
    answer: string;
    isRight: boolean;
}
