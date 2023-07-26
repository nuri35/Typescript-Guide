import { MatchResult } from '../index';

export type MatchData = [
  Date,
  string,
  string,
  number,
  number,
  MatchResult,
  string
];

// example type basic
type Person = { age: number; name: string; alive: boolean };

const abc: Person = {
  age: 20,
  name: 'ali',
  alive: true,
};
