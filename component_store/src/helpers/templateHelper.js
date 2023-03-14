
exports.getHandlebarHelpers = () => {
    return {
        // Specify helpers which are only registered on this instance.
        helpers: {
            getCurrentUrl (req, str) {
                return str === req.url || str === req.sort;
            },
            json: (context) => {
                return JSON.stringify(context);
            },
            add: (a, b) => {
                return a + b;
            },
            eq: (a, b) => {
                return a === b;
            },
            neq: (a, b) => {
                return a !== b;
            },
            ifeq: (a, b, options) => {
                if (a instanceof Number && b instanceof Number) {
                    // eslint-disable-next-line eqeqeq
                    return a == b;
                }
                // eslint-disable-next-line eqeqeq
                if (a == b) { return options.fn(this); }
                return options.inverse(this);
            },
            isEmpty: (list) => {
                // eslint-disable-next-line eqeqeq
                return (list == null || list === undefined || list.length == 0)
            },
            gt: (a, b) => {
                // eslint-disable-next-line eqeqeq
                if (a == undefined) return false;
                return (a > b);
            },
            link: (path) => {
                return path;
            },
            searchParams: (params, offset) => {
                return linkParams(params, offset);
            }
        }
    }
}

const linkParams = (params, offset) => {
    params.offset = offset
    // eslint-disable-next-line no-undef
    return buildQueryParamsString(params)
}

const buildQueryParamsString = (queryParamsObject) => {
    let queryParams = '?'
    for (const [key, value] of Object.entries(queryParamsObject)) {
        queryParams = value ? queryParams + `${key}=${value}&` : queryParams
    }
    return queryParams.endsWith('&') ? queryParams.substring(0, queryParams.length - 1) : queryParams;
}