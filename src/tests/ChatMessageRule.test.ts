import {describe, expect, it} from 'vitest';
import {rules} from '@/modules/Chat/helpers/rules';

describe('chatMessage rule', () => {
  const emptyMessage = ''
  const fullfilledMessage = 'Привет, как дела?'

  it ('chatMessage is empty', () => {
    expect(rules.chatMessage[0](emptyMessage))
      .toBe('Сообщение не должно быть пустым')
  })

  it ('chatMessage is fullfilled', () => {
    expect(rules.chatMessage[0](fullfilledMessage))
      .toBeTruthy()
  })
})