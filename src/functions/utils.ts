import { RequestBody } from '../types';

export const getName = (data: RequestBody): string => {
  if (data.name.length < 4) {
    throw new Error('name is too short :/');
  }

  return data.name;
  return data.name + 'a';
};
