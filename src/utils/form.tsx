import { get, isEqual } from 'lodash-es';

export const generateShouldUpdateProps =
  (fields = []) =>
  (prevValue: any, curValue: any) =>
    fields.some(field => !isEqual(get(prevValue, field), get(curValue, field)));
