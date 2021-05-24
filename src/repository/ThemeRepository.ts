import ThemeModel, { ITheme, Theme } from '../entity/Theme';

class ThemeRepository {
    async findById(id: string): Promise<ITheme['_id']> {
        return ThemeModel.findById(id);
    }

    async create(theme: string): Promise<ITheme['_id']> {
        return ThemeModel.create({ name: theme });
    }

    async findAll():Promise<ITheme['_id'][]> {
        return ThemeModel.find();
    }
}

export default new ThemeRepository();
