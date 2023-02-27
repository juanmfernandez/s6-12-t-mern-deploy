const getPagination = (page, size) => {
    const limit = size ? +size : 10;
    const offset = page ? page * limit : 0;
    return { limit, offset };
};
const getPagingData = (count, page, limit) => {
    const totalPages = Math.ceil(count / limit);
    page = Number(page);
    const currentPage = page ? +page : 0;
    const prevPage = page ? page - 1 : -1;
    const nextPage = page<totalPages ? page + 1 : page - 1;    
    return { totalPages, currentPage, nextPage, prevPage };
}

module.exports = {
    getPagination,
    getPagingData
}