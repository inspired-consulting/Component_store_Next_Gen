const Configuration = require('../../config/config')
const config = Configuration.load();

exports.calculatePagination = (offsetString, limit, result) => {
    let componentCount = result;
    const offset = parseInt(offsetString);
    if (result[0] !== undefined && result[0].entries_count !== undefined) {
        componentCount = parseInt(result[0].entries_count);
    }
    const pages = componentCount > limit ? 1 + Math.floor(componentCount / limit) : 1;
    const currentPage = 1 + offset / limit;
    const prevOffset = offset - limit;
    const hasPrev = !(prevOffset < 0);
    const nextOffset = (offset + limit) > componentCount ? componentCount : offset + limit;
    const hasNext = (nextOffset < componentCount);

    const pageLinks = [];
    if (currentPage < 6) {
        for (let i = 1; i < 10; i++) {
            if (pages >= i) {
                pageLinks.push({
                    page: i,
                    offset: (i - 1) * config.COMPONENTS_LIMIT_PER_PAGE
                })
            }
        }
    } else {
        for (let i = currentPage - 4; i < (currentPage + 5); i++) {
            const offset = (i - 1) * config.COMPONENTS_LIMIT_PER_PAGE
            if (offset <= componentCount && pages >= i) {
                pageLinks.push({
                    page: i,
                    offset: offset
                })
            }
        }
    }
    const pagination = {
        lastPageOffset: (pages - 1) * limit,
        prevOffset: prevOffset,
        hasPrev: hasPrev,
        nextOffset: nextOffset,
        hasNext: hasNext,
        count: componentCount,
        offset: offset,
        currentPage: currentPage,
        pages: pages,
        pageLinks: pageLinks
    };
    return pagination;
}