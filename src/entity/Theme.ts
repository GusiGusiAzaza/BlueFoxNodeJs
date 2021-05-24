import { Document, model, Schema } from 'mongoose';

const themeSchema = new Schema({
    name: {
        type: String,
        unique: true
    }
});

export interface ITheme extends Document {
    id: string;
    name: string;
}

export class Theme {
    id: string;
    name: string;

    constructor(
        id: string,
        name: string
    ) {
        this.id = id;
        this.name = name;
    }
}

const ThemeModel = model('Theme', themeSchema);

export default ThemeModel;
