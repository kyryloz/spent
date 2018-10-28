import { Grammar } from './grammar'

export const checkName = (name: string): boolean => Grammar.STRING_VALUE_PATTERN.test(name)
