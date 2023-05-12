import moment from 'moment';

export const convertFromUnixToDate = (unixDate: number): string => {
  if (!unixDate) {
    return '-'
  }

  return moment.unix(unixDate)
    .format('DD.MM.YYYY')
}

export const convertFromUnixToDateTime = (unixDate: number): string => {
  if (!unixDate) {
    return '-'
  }

  return moment.unix(unixDate)
    .format('HH:mm DD.MM.YYYY')
}