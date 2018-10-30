import * as ohm from 'ohm-js'
import { grammar } from './grammar'

export const parseGrammar = (input: string): ohm.MatchResult => {
  return grammar.match(input)
}
