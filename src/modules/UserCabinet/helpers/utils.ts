import moment from 'moment';

export const convertFromUnix = (unixDate: number): string => {
  if (!unixDate) {
    return '-'
  }

  return moment.unix(unixDate)
    .format('DD.MM.YYYY')
}

export const convertToUnix = (date: string): number => {
  if (!date) {
    return 0
  }

  return moment(date, 'DD.MM.YYYY')
    .unix()
}

export const convertFromUnixToDateTime = (unixDate: number): string => {
  if (!unixDate) {
    return '-'
  }

  return moment.unix(unixDate)
    .format('HH:mm DD.MM.YYYY')
}