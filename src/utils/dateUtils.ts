import * as moment from 'moment'

export const formatTimestamp = (timestamp: number) =>
  moment.unix(timestamp).format('MM MMM YYYY, HH:mm')
