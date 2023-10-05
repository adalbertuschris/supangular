import { mapObjectPropsToCamelCase, mapObjectPropsToSnakeCase } from './supabase-object.util';

// TODO write tests for scenarios:
// skipKeys
// map
// map have name which is also included in skipKeys

describe('SupabaseObjectUtil', () => {
  describe('mapObjectPropsToCamelCase', () => {
    it('return null when object is null', () => {
      const obj = null;
      const mappedObj = mapObjectPropsToCamelCase(obj);
      const expectedResult = null;

      expect(mappedObj).toEqual(expectedResult);
    });

    it('return undefined when object is undefined', () => {
      const obj = undefined;
      const mappedObj = mapObjectPropsToCamelCase(obj);
      const expectedResult = undefined;

      expect(mappedObj).toEqual(expectedResult);
    });

    it('return empty object when input object was empty', () => {
      const obj = {};
      const mappedObj = mapObjectPropsToCamelCase(obj);
      const expectedResult = {};

      expect(mappedObj).toEqual(expectedResult);
    });

    it('map object props (primitive types) from snake_case to camelCase', () => {
      const obj = { first_name: 'fn', last_name: 'ln' };
      const mappedObj = mapObjectPropsToCamelCase(obj);
      const expectedResult = { firstName: 'fn', lastName: 'ln' };

      expect(mappedObj).toEqual(expectedResult);
    });

    it('map object props to camelCase (different variations for prop names)', () => {
      const obj = {
        firstname: 'FN',
        FIRST_NAME_1: 'FN1',
        first_name_22: 'FN22',
        F2F: 'F2F',
        i18n: 'i18n',
        i18n_22: 'i18n22'
      };
      const mappedObj = mapObjectPropsToCamelCase(obj);
      const expectedResult = {
        firstname: 'FN',
        firstName1: 'FN1',
        firstName22: 'FN22',
        f2f: 'F2F',
        i18n: 'i18n',
        i18n22: 'i18n22'
      };

      expect(mappedObj).toEqual(expectedResult);
    });

    it('map object props from snake_case to camelCase when field include empty object', () => {
      const obj = { id_1: 1, user_info: {} };
      const mappedObj = mapObjectPropsToCamelCase(obj);
      const expectedResult = { id1: 1, userInfo: {} };

      expect(mappedObj).toEqual(expectedResult);
    });

    it('map object props from snake_case to camelCase when field include object', () => {
      const obj = { id_1: 1, user_info: { first_name: 'fn', last_name: 'ln' } };
      const mappedObj = mapObjectPropsToCamelCase(obj);
      const expectedResult = { id1: 1, userInfo: { firstName: 'fn', lastName: 'ln' } };

      expect(mappedObj).toEqual(expectedResult);
    });

    it('map object props from snake_case to camelCase when field include empty array', () => {
      const obj = { id_1: 1, users: [] };
      const mappedObj = mapObjectPropsToCamelCase(obj);
      const expectedResult = { id1: 1, users: [] };

      expect(mappedObj).toEqual(expectedResult);
    });

    it('map array with primitive types', () => {
      const obj = ['apple', 'banana'];
      const mappedObj = mapObjectPropsToCamelCase(obj);
      const expectedResult = ['apple', 'banana'];

      expect(mappedObj).toEqual(expectedResult);
    });

    it('map objects props included in array from snake_case to camelCase', () => {
      const obj = [
        {
          id_1: 1,
          roles: ['asset_publisher', 'page_publisher'],
          users: [{ first_name: 'fn1', info: { is_deactivated: true } }]
        },
        { id_1: 2, roles: ['asset_publisher_1'], users: [{ first_name: 'fn2', info: { is_deactivated: false } }] }
      ];
      const mappedObj = mapObjectPropsToCamelCase(obj);
      const expectedResult = [
        {
          id1: 1,
          roles: ['asset_publisher', 'page_publisher'],
          users: [{ firstName: 'fn1', info: { isDeactivated: true } }]
        },
        { id1: 2, roles: ['asset_publisher_1'], users: [{ firstName: 'fn2', info: { isDeactivated: false } }] }
      ];

      expect(mappedObj).toEqual(expectedResult);
    });
  });

  describe('mapObjectPropsToSnakeCase', () => {
    it('return null when object is null', () => {
      const obj = null;
      const mappedObj = mapObjectPropsToSnakeCase(obj);
      const expectedResult = null;

      expect(mappedObj).toEqual(expectedResult);
    });

    it('return undefined when object is undefined', () => {
      const obj = undefined;
      const mappedObj = mapObjectPropsToSnakeCase(obj);
      const expectedResult = undefined;

      expect(mappedObj).toEqual(expectedResult);
    });

    it('return empty object when input object was empty', () => {
      const obj = {};
      const mappedObj = mapObjectPropsToSnakeCase(obj);
      const expectedResult = {};

      expect(mappedObj).toEqual(expectedResult);
    });

    it('map object props (primitive types) from camelCase to snake_case', () => {
      const obj = { firstName: 'fn', lastName: 'ln' };
      const expectedResult = { first_name: 'fn', last_name: 'ln' };
      const mappedObj = mapObjectPropsToSnakeCase(obj);

      expect(mappedObj).toEqual(expectedResult);
    });

    it('map object props to snake_case (different variations for prop names)', () => {
      const obj = {
        firstname: 'FN',
        firstName1: 'FN1',
        firstName2: 'FN2',
        firstName22: 'FN22',
        f2F: 'F2F',
        i18n: 'i18n'
      };
      const expectedResult = {
        firstname: 'FN',
        first_name_1: 'FN1',
        first_name_2: 'FN2',
        first_name_2_2: 'FN22',
        f_2_f: 'F2F',
        i_1_8n: 'i18n'
      };
      const mappedObj = mapObjectPropsToSnakeCase(obj);

      expect(mappedObj).toEqual(expectedResult);
    });

    it('skip particular prop names and use custom map during convertion from snake_case to camelCase', () => {
      const obj = {
        firstName1: 'FN1',
        firstName22: 'FN22',
        i18n: 'i18n'
      };
      const expectedResult = {
        first_name_1: 'FN1',
        first_name_22: 'FN22',
        i18n: 'i18n'
      };
      const mappedObj = mapObjectPropsToSnakeCase(obj, { skipKeys: ['i18n'], map: { firstName22: 'first_name_22' } });

      expect(mappedObj).toEqual(expectedResult);
    });

    it('map object props from camelCase to snake_case when field include empty object', () => {
      const obj = { id1: 1, userInfo: {} };
      const expectedResult = { id_1: 1, user_info: {} };
      const mappedObj = mapObjectPropsToSnakeCase(obj);

      expect(mappedObj).toEqual(expectedResult);
    });

    it('map object props from camelCase to snake_case when field include object', () => {
      const obj = { id1: 1, userInfo: { firstName: 'fn', lastName: 'ln' } };
      const expectedResult = { id_1: 1, user_info: { first_name: 'fn', last_name: 'ln' } };
      const mappedObj = mapObjectPropsToSnakeCase(obj);

      expect(mappedObj).toEqual(expectedResult);
    });

    it('map object props from camelCase to snake_case when field include empty array', () => {
      const obj = { id1: 1, users: [] };
      const expectedResult = { id_1: 1, users: [] };
      const mappedObj = mapObjectPropsToSnakeCase(obj);

      expect(mappedObj).toEqual(expectedResult);
    });

    it('map array with primitive types', () => {
      const obj = ['apple', 'banana'];
      const expectedResult = ['apple', 'banana'];
      const mappedObj = mapObjectPropsToSnakeCase(obj);

      expect(mappedObj).toEqual(expectedResult);
    });

    it('map objects props included in array from camelCase to snake_case', () => {
      const obj = [
        {
          id1: 1,
          roles: ['asset_publisher', 'page_publisher'],
          users: [{ firstName: 'fn1', info: { isDeactivated: true } }]
        },
        { id1: 2, roles: ['asset_publisher_1'], users: [{ firstName: 'fn2', info: { isDeactivated: false } }] }
      ];
      const expectedResult = [
        {
          id_1: 1,
          roles: ['asset_publisher', 'page_publisher'],
          users: [{ first_name: 'fn1', info: { is_deactivated: true } }]
        },
        { id_1: 2, roles: ['asset_publisher_1'], users: [{ first_name: 'fn2', info: { is_deactivated: false } }] }
      ];
      const mappedObj = mapObjectPropsToSnakeCase(obj);

      expect(mappedObj).toEqual(expectedResult);
    });
  });
});
