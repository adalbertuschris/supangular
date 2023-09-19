// For this moment we are handling only snake_case to camelCase, camelCase to snake_case.
// When we are using particular method for example snake_case to camelCase, fields in object must be snake_case
// if they are not then they will be incorrectly converted
// For this moment is enough but we can handle more complex cases in future

import { SupabaseConverterOptions } from '../models/supabase-converter-options';

// Do we need handle other cases (inputs)?
// camelCase (in snake_case to camelCase), UPPERCASE, lowercase, snake_case, PascalCase, 'Title Case', 'dot.case',
// 'param-case', 'Sentence case', 'path/case', 'Header-Case'

const snakeToCamel = (str: string): string =>
  str.toLowerCase().replace(/[-_][a-z0-9]/g, (group: string) => group.slice(-1).toUpperCase());

const camelToSnake = (str: string): string => str.replace(/([A-Z0-9])/g, ($1: string) => `_${$1.toLowerCase()}`);

const isPlainObject = (input: any): boolean => input === Object(input) && !Array.isArray(input);

const convertObjectKeys = <T extends object, R extends object>(
  obj: T,
  converter: (objectKey: string) => string,
  options?: SupabaseConverterOptions
): R => {
  const recurse = <T1 extends object, R1 extends object>(input: T1): T1 | R1 => {
    if (isPlainObject(input)) {
      return Object.keys(input).reduce(
        (acc, key) =>
          Object.assign(acc, {
            [options?.skipKeys?.includes(key) ? key : options?.map?.[key] || converter(key)]: recurse(input[key])
          }),
        {} as R1
      );
    } else if (Array.isArray(input)) {
      return input.map((i) => recurse(i)) as R1;
    }
    return input as T1;
  };

  return recurse(obj) as R;
};

export const mapObjectPropsToCamelCase = <T extends object, R extends object>(
  obj: T,
  options?: SupabaseConverterOptions
): R => convertObjectKeys(obj, snakeToCamel, options);

export const mapObjectPropsToSnakeCase = <T extends object, R extends object>(
  obj: T,
  options?: SupabaseConverterOptions
): R => convertObjectKeys(obj, camelToSnake, options);
