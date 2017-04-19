const minWeightPath = require('./minWeightPath');

describe('minWeightPath', () => {
  describe('the provided example', () => {
    let matrix;
    beforeEach(() => {
      matrix = [[3, 1, 4], [1, 5, 9], [2, 6, 5]];
    });

    it('returns the correct path', () => {
      const result = minWeightPath(matrix);
      expect(result.path).toEqual([1, 1, 2]);
    });

    it('returns the correct weight', () => {
      const result = minWeightPath(matrix);
      expect(result.weight).toEqual(4);
    });
  });

  describe('a triangular matrix with lower-left side heavy', () => {
    let matrix;
    beforeEach(() => {
      matrix = [
        [8, 1, 1, 1, 1],
        [8, 8, 1, 1, 1],
        [8, 8, 8, 1, 1],
        [8, 8, 8, 8, 1],
        [8, 8, 8, 8, 8]
      ];
    });

    it('returns the correct path', () => {
      const result = minWeightPath(matrix);
      expect(result.path).toEqual([1, 1, 1, 1, 8]);
    });

    it('returns the correct weight', () => {
      const result = minWeightPath(matrix);
      expect(result.weight).toEqual(12);
    });
  });

  describe('a triangular matrix with upper-right side heavy', () => {
    let matrix;
    beforeEach(() => {
      matrix = [
        [9, 9, 9, 9, 9],
        [2, 9, 9, 9, 9],
        [2, 2, 9, 9, 9],
        [2, 2, 2, 9, 9],
        [2, 2, 2, 2, 9]
      ];
    });

    it('returns the correct path', () => {
      const result = minWeightPath(matrix);
      expect(result.path).toEqual([9, 2, 2, 2, 2]);
    });

    it('returns the correct weight', () => {
      const result = minWeightPath(matrix);
      expect(result.weight).toEqual(17);
    });
  });

  describe('a medium sized, rectangular matrix with a zig-zag path', () => {
    let matrix;
    beforeEach(() => {
      matrix = [
        [9, 1, 9, 9, 9],
        [9, 9, 1, 9, 9],
        [9, 1, 9, 9, 9],
        [9, 9, 1, 9, 9],
        [9, 9, 9, 1, 9],
        [9, 9, 1, 9, 9],
        [9, 1, 9, 9, 9],
      ];
    });

    it('returns the correct path', () => {
      const result = minWeightPath(matrix);
      expect(result.path).toEqual([1, 1, 1, 1, 1, 1, 1]);
    });

    it('returns the correct weight', () => {
      const result = minWeightPath(matrix);
      expect(result.weight).toEqual(7);
    });
  });

  describe('a path that hits the left and right sides', () => {
    let matrix;
    beforeEach(() => {
      matrix = [
        [9, 1, 9, 9, 9],
        [1, 9, 9, 9, 9],
        [9, 1, 9, 9, 9],
        [9, 9, 1, 9, 9],
        [9, 9, 9, 1, 9],
        [9, 9, 9, 9, 1],
        [9, 9, 9, 1, 9],
      ];
    });

    it('returns the correct path', () => {
      const result = minWeightPath(matrix);
      expect(result.path).toEqual([1, 1, 1, 1, 1, 1, 1]);
    });

    it('returns the correct weight', () => {
      const result = minWeightPath(matrix);
      expect(result.weight).toEqual(7);
    });
  });

  describe('empty matrixes', () => {
    it('return weight = 0 and path = [] for a matrix with no rows', () => {
      const matrix = [];
      expect(minWeightPath(matrix)).toEqual({ weight: 0, path: [] });
    });

    it('return weight = 0 and path = [] for a matrix with no columns', () => {
      const matrix = [
        [],
        []
      ];
      expect(minWeightPath(matrix)).toEqual({ weight: 0, path: [] });
    });
  });

  describe('invalid input', () => {
    describe('when the matrix has non-numeric values', () => {
      it('throws an exception', () => {
        const matrix = [
          [NaN, NaN, '*'],
          [undefined, true, {}]
        ];
        expect(() => minWeightPath(matrix)).toThrow();
      });
    });

    describe('when a row has an unequal length', () => {
      it('throws an exception', () => {
        const matrix = [
          [1, 2, 3],
          [],
          [4, 5, 6]
        ];
        expect(() => minWeightPath(matrix)).toThrow();
      });
    });
  });
});