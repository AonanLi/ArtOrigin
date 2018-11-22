const defaultGet = (item, path, defaultPath) => item[path] || item[defaultPath];

export default defaultGet;
