/* eslint-disable no-undef */
const temphelpers = require('../src/helpers/templateHelper');
const path = require('path');

describe('getCurrentURL helper function', () => {
    test('test with static req.url', () => {
        const req = { url: 'home' };
        const result = temphelpers.getHandlebarHelpers().helpers.getCurrentUrl(req, 'home');
        expect(result).toBe(true);
    });
    test('test with static req.url', () => {
        const req = { url: 'home' };
        const result = temphelpers.getHandlebarHelpers().helpers.getCurrentUrl(req, 'homes');
        expect(result).toBe(false);
    });
    test('test with static req.sort', () => {
        const req = { sort: 'abc' };
        const result = temphelpers.getHandlebarHelpers().helpers.getCurrentUrl(req, 'abc');
        expect(result).toBe(true);
    });
    test('test with static req.url', () => {
        const req = { url: 'abc' };
        const result = temphelpers.getHandlebarHelpers().helpers.getCurrentUrl(req, 'new');
        expect(result).toBe(false);
    });
});

describe('json helper function', () => {
    test('test with object', () => {
        const object = { name: 'hello world' }
        const result = temphelpers.getHandlebarHelpers().helpers.json(object);
        expect(result).toBe('{"name":"hello world"}');
    });
});

describe('add helper function', () => {
    test('test with pos numbers', () => {
        const result = temphelpers.getHandlebarHelpers().helpers.add(1, 2);
        expect(result).toBe(3);
    });
    test('test with neg numbers', () => {
        const result = temphelpers.getHandlebarHelpers().helpers.add(1, -11);
        expect(result).toBe(-10);
    });
    test('test with concat strings', () => {
        const result = temphelpers.getHandlebarHelpers().helpers.add('a', 'b');
        expect(result).toBe('ab');
    });
});

describe('eq helper function', () => {
    test('test with same chars', () => {
        const result = temphelpers.getHandlebarHelpers().helpers.eq('a', 'a');
        expect(result).toBe(true);
    });
    test('test with different chars', () => {
        const result = temphelpers.getHandlebarHelpers().helpers.eq('a', 'b');
        expect(result).toBe(false);
    });
    test('test with different chars', () => {
        const object = { name: 'hello' };
        const object2 = { name: 'hello' };
        const result = temphelpers.getHandlebarHelpers().helpers.eq(object, object2);
        expect(result).toBe(false);
    });
    test('test with different chars', () => {
        const object = { name: 'hello' };
        const object2 = { name: 'hello' };
        const result = temphelpers.getHandlebarHelpers().helpers.eq(object.name, object2.name);
        expect(result).toBe(true);
    });
});

describe('neq helper function', () => {
    test('test with not equal objects', () => {
        const object = { name: 'hello world' }
        const object2 = { name: 'hello world' }
        const result = temphelpers.getHandlebarHelpers().helpers.neq(object, object2);
        expect(result).toBe(true);
    });
    test('test the attributes of objects', () => {
        const object = { name: 'hello world' }
        const object2 = { name: 'hello world' }
        const result = temphelpers.getHandlebarHelpers().helpers.neq(object.name, object2.name);
        expect(result).toBe(false);
    });
});

describe('ifeq helper function', () => {
    test('test for previous pagination', () => {
        const object = 'prev'
        const object2 = 'prev'
        const options = { fn: () => { return 'show btn for prev site' } }
        const result = temphelpers.getHandlebarHelpers().helpers.ifeq(object, object2, options);
        expect(result).toBe('show btn for prev site');
    });
    test('test for next pagination', () => {
        const object = 'next'
        const object2 = 'next'
        const options = { fn: () => { return 'show btn for next site' } }
        const result = temphelpers.getHandlebarHelpers().helpers.ifeq(object, object2, options);
        expect(result).toBe('show btn for next site');
    });
    test('test for unequal pagination', () => {
        const object = 'next'
        const object2 = 'prev'
        const options = { fn: () => { return 'show btn for prev site' } }
        const result = temphelpers.getHandlebarHelpers().helpers.ifeq(object, object2, options);
        expect(result).toBe(undefined);
    });
});

describe('isEmpty helper function', () => {
    test('test with null', () => {
        const list = null;
        const result = temphelpers.getHandlebarHelpers().helpers.isEmpty(list);
        expect(result).toBe(true);
    });
    test('test with undefined', () => {
        const list = undefined;
        const result = temphelpers.getHandlebarHelpers().helpers.isEmpty(list);
        expect(result).toBe(true);
    });
    test('test with length', () => {
        const list = [];
        const result = temphelpers.getHandlebarHelpers().helpers.isEmpty(list);
        expect(result).toBe(true);
    });
    test('test with elements', () => {
        const list = [1, 2, 3];
        const result = temphelpers.getHandlebarHelpers().helpers.isEmpty(list);
        expect(result).toBe(false);
    });
});

describe('gt helper function', () => {
    test('test with 2 > 0', () => {
        const result = temphelpers.getHandlebarHelpers().helpers.gt(2, 0);
        expect(result).toBe(true);
    });
    test('test with 4 < 5', () => {
        const result = temphelpers.getHandlebarHelpers().helpers.gt(4, 5);
        expect(result).toBe(false);
    });
    test('test with 4 > undefined', () => {
        const result = temphelpers.getHandlebarHelpers().helpers.gt(4, undefined);
        expect(result).toBe(false);
    });
    test('test with undefined > null', () => {
        const result = temphelpers.getHandlebarHelpers().helpers.gt(undefined, null);
        expect(result).toBe(false);
    });
});

describe('link helper function', () => {
    test('test with local directory path to helpers', () => {
        const result = temphelpers.getHandlebarHelpers().helpers.link(path.join(__dirname, '../../helpers'));
        expect(result).toBe(path.join(__dirname, '../../helpers'));
    });
    test('test with hello world object', () => {
        const object = { name: 'hello world' }
        const result = temphelpers.getHandlebarHelpers().helpers.link(object.name);
        expect(result).toBe('hello world');
    });
});

describe('search params helper function', () => {
    test('test with preset abc and offset 4', () => {
        const params = { p: 'abc' }
        const result = temphelpers.getHandlebarHelpers().helpers.searchParams(params, 4);
        expect(result).toBe('?p=abc&offset=4');
    });
    test('test with preset new and offset 0', () => {
        const params = { p: 'new' }
        const result = temphelpers.getHandlebarHelpers().helpers.searchParams(params, 0);
        expect(result).toBe('?p=new');
    });
    test('test with query new and offset -8', () => {
        const params = { q: '1' }
        const result = temphelpers.getHandlebarHelpers().helpers.searchParams(params, -8);
        expect(result).toBe('?q=1&offset=-8');
    });
});
