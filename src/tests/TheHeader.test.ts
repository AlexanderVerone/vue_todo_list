import {describe, it, beforeAll, expect} from 'vitest';
import TheHeader from '@/components/TheHeader.vue';
import {mount} from '@vue/test-utils';
import {createPinia, setActivePinia} from 'pinia';
import {createVuetify} from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import {aliases, mdi} from 'vuetify/iconsets/mdi';

describe('TheHeader', () => {
  beforeAll(() => {
    setActivePinia(createPinia())
  })

  it ('mounted correctly', () => {
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

    const wrapper = mount(TheHeader, {
      global: {
        plugins: [vuetify],
      }
    })

    expect(wrapper.exists())
      .toBe(true)
  })
})