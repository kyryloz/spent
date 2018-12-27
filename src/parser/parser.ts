import * as ohm from 'ohm-js'
import { grammar } from 'parser/grammar'

export interface ParseGrammarResult {
  error: boolean
  success: boolean
  message?: string,
  match: ohm.MatchResult
}

export const parseGrammar = (input: string): ParseGrammarResult => {
  const match = grammar.match(input)
  const message = match.message

  console.log(message)

  return {
    error: match.failed(),
    success: match.succeeded(),
    message,
    match,
  }
}
