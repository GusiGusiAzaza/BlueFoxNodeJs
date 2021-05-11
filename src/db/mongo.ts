import mongoose from 'mongoose';

import config from '../config/db';

export default async () => {
    await mongoose
        .connect(config.adminConnectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        .then(() => {
            console.log('MongoDB connected successfully');
        })
        .catch((e) => {
            console.log(e);
            // @ts-ignore
            this.reject();
        });
};
