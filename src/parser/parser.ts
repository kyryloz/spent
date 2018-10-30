import * as ohm from 'ohm-js'
import { grammar } from './grammar'

export const parse = (input: string): ohm.MatchResult => {
  return grammar.match(input)
}
