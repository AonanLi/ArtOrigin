const defaultGet = (item, path, defaultPath, removeTags) => {
    const value = item[path] || item[defaultPath];
    if (removeTags) {
        return value.replace(/<(?:.|\n)*?>/gm, '');
    }
    return value;
};

export default defaultGet;
