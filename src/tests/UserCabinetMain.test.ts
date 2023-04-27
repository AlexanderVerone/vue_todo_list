import {beforeAll, describe, it, expect} from 'vitest';
import UserCabinetMain from '@/modules/UserCabinet/components/UserCabinetMain.vue';
import {mount} from '@vue/test-utils';
import {createVuetify} from 'vuetify';
import {createPinia, setActivePinia} from 'pinia';

describe('UserCabinetMain', () => {
  const vuetify = createVuetify()

  beforeAll(() => {
    setActivePinia(createPinia())
  })

  it ('mounted', () => {
    const wrapper = mount(UserCabinetMain, {
      global: {
        plugins: [vuetify],
      }
    })

    expect(wrapper.exists())
      .toBe(true)
  })
})