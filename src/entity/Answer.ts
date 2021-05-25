export class Answer {
    id: string;
    answer: string;
    isRight: boolean;

    constructor(
        id: string,
        answer: string,
        isRight: boolean
    ) {
        this.id = answer;
        this.answer = answer;
        this.isRight = isRight;
    }
}

export interface IAnswer {
    id: string;
    answer: string;
    isRight: boolean;
}
