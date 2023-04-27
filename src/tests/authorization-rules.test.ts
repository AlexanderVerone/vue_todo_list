import {describe, expect, it} from 'vitest';
import {rules} from '@/modules/Authorization/helpers/rules';

describe('Email rules', () => {
  it('email not empty', () => {
    expect(rules.email[0](''))
      .toBe('Поле E-mail обязательное')

    expect(rules.email[0]('test@gmail.com'))
      .toBeTruthy()
  })

  it('email in valid syntax', () => {
    expect(rules.email[1]('sometext'))
      .toBe('Некорректный E-mail')

    expect(rules.email[1]('test@test.gmail'))
      .toBeTruthy()
  })
})

describe('password rules', () => {
  it ('password not empty', () => {
    expect(rules.password[0](''))
      .toBe('Поле Пароль обязательное')

    expect(rules.password[0]('123456678'))
      .toBeTruthy()
  })
})