const Configuration = require('../../config/config')
const config = Configuration.load();

exports.calculatePagination = (offsetString, limit, result) => {
    let entriesCount = result;
    const offset = parseInt(offsetString);
    if (result[0] !== undefined && result[0].entries_count !== undefined) {
        entriesCount = parseInt(result[0].entries_count);
    }
    const pages = entriesCount > limit ? 1 + Math.floor(entriesCount / limit) : 1;
    const currentPage = 1 + offset / limit;
    const prevOffset = offset - limit;
    const hasPrev = !(prevOffset < 0);
    const nextOffset = (offset + limit) > entriesCount ? entriesCount : offset + limit;
    const hasNext = (nextOffset < entriesCount);

    const pageLinks = [];
    if (currentPage < 6) {
        // eslint-disable-next-line no-var
        for (var i = 1; i < 10; i++) {
            if (pages >= i) {
                pageLinks.push({
                    page: i,
                    offset: (i - 1) * config.COMPONENTS_LIMIT_PER_PAGE
                })
            }
        }
    } else {
        // eslint-disable-next-line no-var, no-redeclare
        for (var i = currentPage - 4; i < (currentPage + 5); i++) {
            const offset = (i - 1) * config.COMPONENTS_LIMIT_PER_PAGE
            if (offset <= entriesCount && pages >= i) {
                pageLinks.push({
                    page: i,
                    offset
                })
            }
        }
    }
    const pagination = {
        lastPageOffset: (pages - 1) * limit,
        prevOffset,
        hasPrev,
        nextOffset,
        hasNext,
        count: entriesCount,
        offset,
        currentPage,
        pages,
        pageLinks
    };
    return pagination;
}