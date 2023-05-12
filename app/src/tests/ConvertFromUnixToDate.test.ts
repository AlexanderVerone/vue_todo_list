import {describe, expect, it} from 'vitest';
import { convertFromUnixToDate, convertFromUnixToDateTime } from '@/modules/UserCabinet/helpers/utils';

describe('Unix to date convertion', () => {
  const unixTimeStamp = 1682170510

  it ('convert from unix to DD.MM.YYYY', () => {
    expect(convertFromUnixToDate(unixTimeStamp))
      .toBe('22.04.2023')
  })

  it ('convert from unix to HH:mm DD.MM.YYYY', () => {
    expect(convertFromUnixToDateTime(unixTimeStamp))
      .toBe('16:35 22.04.2023')
  })
})