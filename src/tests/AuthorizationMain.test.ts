import {beforeAll, describe, it, expect} from 'vitest';
import AuthorizationMain from '@/modules/Authorization/components/AuthorizationMain.vue';
import {mount} from '@vue/test-utils';
import {createPinia, setActivePinia} from 'pinia';
import {createVuetify} from 'vuetify';

describe('AuthorizationMain', () => {
  const vuetify = createVuetify()

  beforeAll(() => {
    setActivePinia(createPinia())
  })

  it ('mount correctly', () => {
    const wrapper = mount(AuthorizationMain, {
      global: {
        plugins: [vuetify],
      }
    })

    expect(wrapper.exists())
      .toBe(true)
  })
})