import {beforeAll, describe, it, expect} from 'vitest';
import AuthorizationMain from '@/modules/Authorization/components/AuthorizationMain.vue';
import {mount} from '@vue/test-utils';
import {createPinia, setActivePinia} from 'pinia';
import {createVuetify} from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import {aliases, mdi} from 'vuetify/iconsets/mdi';

describe('AuthorizationMain', () => {
  beforeAll(() => {
    global.ResizeObserver = class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    };

    setActivePinia(createPinia())
  })

  it ('mount correctly', () => {
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

    const wrapper = mount(AuthorizationMain, {
      global: {
        plugins: [vuetify],
      }
    })

    expect(wrapper.exists())
      .toBe(true)
  })
})