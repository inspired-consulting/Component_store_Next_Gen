const calculatePagination = require('../src/helpers/helper');

describe('helper function', () => {
    it('calculate first pagination', () => {
        const {
            lastPageOffset,
            prevOffset,
            hasPrev,
            nextOffset,
            hasNext,
            count,
            offset,
            currentPage,
            pages,
            pageLinks
        } = calculatePagination.calculatePagination('4', '8', '1');
        expect(lastPageOffset).toEqual(0);
        expect(prevOffset).toEqual(-4);
        expect(hasPrev).toEqual(false);
        expect(nextOffset).toEqual('1');
        expect(hasNext).toEqual(false);
        expect(count).toEqual('1');
        expect(offset).toEqual(4);
        expect(currentPage).toEqual(1.5);
        expect(pages).toEqual(1);
        expect(pageLinks).toEqual([{ offset: 0, page: 1 }]);
    });
});