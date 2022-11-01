module.exports = getNameCap = (name) => {
    return name?.slice(0,1)?.toUpperCase() + name?.slice(1,name?.length);
}