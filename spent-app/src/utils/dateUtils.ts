import * as moment from 'moment'
import {
  USER_COMMAND_OUTPUT_DATE_FORMAT,
  USER_INPUT_DATE_FORMAT,
  USER_OUTPUT_DATE_FORMAT,
} from './settings'

export const formatTimestamp = (timestamp: number) =>
  moment.unix(timestamp).format(USER_COMMAND_OUTPUT_DATE_FORMAT)

export const formatTransactionDate = (date: string) =>
  moment(date, USER_INPUT_DATE_FORMAT).format(USER_OUTPUT_DATE_FORMAT)
