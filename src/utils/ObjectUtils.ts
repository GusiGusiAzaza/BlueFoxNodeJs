export const assignProperties = (target: any, source: any): any => {
    for (const [key, value] of Object.entries(source)) {
        target.hasOwnProperty(key) ? (target as any)[key] = value : null;
    }
};
