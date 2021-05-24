import QuestionModel, { IQuestion, Question } from '../entity/Question';
import { ValidationError } from '../model/HttpError';

class QuestionRepository {
    async findById(id: string): Promise<IQuestion['_id']> {
        return QuestionModel.findById(id);
    }

    async create(question: Question): Promise<IQuestion['_id']> {
        const { id, ...questionData } = question;

        return QuestionModel.create({ ...questionData });
    }

    async update(question: Question): Promise<IQuestion['_id']> {
        if (!await this.findById(question.id)) throw new ValidationError('Question not found');

        await QuestionModel.update({ _id: question.id }, question);

        return this.findById(question.id);
    }

    async delete(id: string): Promise<IQuestion['_id']> {
        if (!await this.findById(id)) throw new ValidationError('Question not found');

        return QuestionModel.findByIdAndDelete(id);
    }

    async findAllByTestId(testId: string):Promise<IQuestion['_id'][]> {
        return QuestionModel.find({ testId: testId });
    }
}

export default new QuestionRepository();
