import {describe, expect, it} from 'vitest';
import {rules} from '@/modules/UserCabinet/helpers/rules';

describe('description rule', () => {
  const emptyString = ''
  const fullfilledString = 'Какое-то описание'

  it ('description is empty', () => {
    expect(rules.description[0](emptyString))
      .toBe('Поле "Описание задачи" обязательное')
  })

  it ('description is fullfilled', () => {
    expect(rules.description[0](fullfilledString))
      .toBeTruthy()
  })
})