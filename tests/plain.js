'use strict';

QUnit.module('Тестируем функцию plain', function () {
	QUnit.test('Работает с единственным элементом', function (assert) {
		assert.deepEqual(plain([]), [], 'Работает с пустым массивом');
		assert.deepEqual(plain([42]), [42], 'Работает с массивом из одного элемента');
		assert.deepEqual(plain([1, 2, 3, 4]), [1, 2, 3, 4], 'Сохраняет порядок элементов');
		assert.deepEqual(plain(['', '']), ['', '']);
	});

	QUnit.test('Работает с единственным массивом', function (assert) {
		assert.deepEqual(plain([[]]), []);
		assert.deepEqual(plain([[42]]), [42]);
		assert.deepEqual(plain([[1, 2, 3, 4]]), [1, 2, 3, 4]);
		assert.deepEqual(plain([['', '']]), ['', '']);
	});

	QUnit.test('Работает со смешанными значениями', function (assert) {
		assert.deepEqual(plain([[], 42]), [42]);
		assert.deepEqual(plain([[42], 0]), [42, 0]);
		assert.deepEqual(plain([[1, 2, 3, 4], 5, 6, 7, 8]), [1, 2, 3, 4, 5, 6, 7, 8]);
		assert.deepEqual(plain([1, 2, [3]]), [1, 2, 3]);
	});

	QUnit.test('Работает с несколькими массивами', function (assert) {
		assert.deepEqual(plain([[], []]), [], 'Работает с пустыми массивами');
		assert.deepEqual(plain([[42], [42]]), [42, 42]);
		assert.deepEqual(plain([[42, 42], [42]]), [42, 42, 42]);
		assert.deepEqual(plain([[1], [2], [3], [4, 5, 6]]), [1, 2, 3, 4, 5, 6]);
		assert.deepEqual(plain([['To'], ['infinity'], ['...'], ['and'], ['beyond']]), ['To', 'infinity', '...', 'and', 'beyond']);
	});

	QUnit.test('Работает с вложенными массивами', function (assert) {
		assert.deepEqual(plain([[], [[], [], []]]), [], 'Работает с пустыми массивами');
		assert.deepEqual(plain([[42], [[42], [], [42]], [42]]), [42, 42, 42, 42]);
		assert.deepEqual(plain([[42, 42], [42, [42, [42, 42], 42]]]), [42, 42, 42, 42, 42, 42, 42]);
		assert.deepEqual(plain([[1], [2], [3], [4, 5, [6, 7, 8, [9]], 10], 11]), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
	});

	QUnit.test('Работает с объектами', function (assert) {
		assert.deepEqual(plain([{}, [{}, {}]]), [{}, {}, {}], 'Работает с пустыми объектами');
		assert.deepEqual(plain([[{ name: "Vasya" }], { name: "Vanya" }, [{ name: "Olga" }]]), [{ name: "Vasya" }, { name: "Vanya" }, { name: "Olga" }]);
	});

	QUnit.test('Работает с элементами разных типов', function (assert) {
		assert.deepEqual(plain([['abcde'], [['f'], [null, false], [NaN, NaN], NaN], -Infinity]), ['abcde', 'f', null, false, NaN, NaN, NaN, -Infinity]);
		assert.deepEqual(plain([undefined, [[[null, 900], { name: "Vasya" }, 0.99999], "properName", true, 0, [{}, Infinity]]]), [undefined, null, 900, { name: "Vasya"}, 0.99999, "properName", true, 0, {}, Infinity]);
	});
});
