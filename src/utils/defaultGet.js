const defaultGet = (item, path, defaultPath, removeTags, concat) => {
    const value = concat ? item[path].concat(item[defaultPath]) : item[path] || item[defaultPath];
    if (removeTags) {
        return value.replace(/<(?:.|\n)*?>/gm, '');
    }
    return value;
};

export default defaultGet;
