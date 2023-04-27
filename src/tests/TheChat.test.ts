import {beforeAll, describe, it, expect} from 'vitest';
import {createPinia, setActivePinia} from 'pinia';
import {mount} from '@vue/test-utils';
import {TheChat} from '@/modules/Chat';
import {createVuetify} from 'vuetify';

describe('TheChat', () => {
  const vuetify = createVuetify()

  beforeAll(() => {
    setActivePinia(createPinia())
  })

  it ('mounted correctly', () => {
    const wrapper = mount(TheChat, {
      global: {
        plugins: [vuetify],
      }
    })

    expect(wrapper.exists())
      .toBe(true)
  })
})