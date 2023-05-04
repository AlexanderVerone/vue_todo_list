import {describe, it, expect} from 'vitest';
import {mount} from '@vue/test-utils';
import AuthorizationForm from '@/modules/Authorization/components/AuthorizationForm.vue';
import {createVuetify} from 'vuetify';
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import {fireEvent, render, screen} from '@testing-library/vue';
import {aliases, mdi} from 'vuetify/iconsets/mdi';

describe('AuthorizationForm', () => {
  const vuetify = createVuetify()

  it('mount correctly', () => {
    const wrapper = mount(AuthorizationForm, {
      global: {
        plugins: [vuetify],
      }
    })

    expect(wrapper.exists())
      .toBe(true)
  })

  it('define form button name from prop', async () => {
    const vuetify = createVuetify()
    const formTypeLogin = 'login'
    const formTypeAuth = 'register'

    const wrapper = render(AuthorizationForm, {
      props: {
        formType: formTypeLogin,
      },
      global: {
        plugins: [vuetify],
      }
    })

    expect(screen.getByText('Войти'))
      .toBeTruthy()

    await wrapper.rerender({ formType: formTypeAuth })

    expect(screen.getByText('Зарегистрироваться'))
      .toBeTruthy()

    await wrapper.rerender({ formType: null })

    expect(screen.getByText('Тип формы не указан'))
      .toBeTruthy()
  })
})

it('form with incorrect values return validation error messages', async () => {
  const vuetify = createVuetify({
    components,
    directives,
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      }
    },
    theme: {
      defaultTheme: 'dark'
    }
  })

  const wrapper = render(AuthorizationForm, {
    props: {
      formType: 'login',
    },
    global: {
      plugins: [vuetify],
    }
  })

  const authButton = screen.getByTestId('authButton')

  await fireEvent.click(authButton)

  expect(screen.getByText('Поле E-mail обязательное'))
    .toBeTruthy()

  await fireEvent.click(authButton)

  expect(screen.getByText('Поле Пароль обязательное'))
    .toBeTruthy()
})

it('fulfilled form emit the auth event', async () => {
  const vuetify = createVuetify({
    components,
    directives,
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      }
    },
    theme: {
      defaultTheme: 'dark'
    }
  })

  const wrapper = render(AuthorizationForm, {
    props: {
      formType: 'login'
    },
    global: {
      plugins: [vuetify],
    }
  })

  const { emitted } = wrapper

  const authButton = screen.getByTestId('authButton')
  const loginInput = screen.getByPlaceholderText('example@gmail.com')
  const passwordInput = screen.getByPlaceholderText('password')

  await fireEvent.update(loginInput, 'test@gmail.com')
  await fireEvent.update(passwordInput, '1234')

  await fireEvent.click(authButton)

  expect(emitted())
    .toHaveProperty('submit')
})
