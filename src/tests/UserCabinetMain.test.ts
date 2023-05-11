import {beforeAll, describe, it, expect} from 'vitest';
import UserCabinetMain from '@/modules/UserCabinet/components/UserCabinetMain.vue';
import {mount} from '@vue/test-utils';
import {createVuetify} from 'vuetify';
import {createPinia, setActivePinia} from 'pinia';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import {aliases, mdi} from 'vuetify/iconsets/mdi';
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';

describe('UserCabinetMain', () => {
  beforeAll(() => {
    global.ResizeObserver = class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    };

    setActivePinia(createPinia())
  })

  it ('mounted', () => {
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

    const wrapper = mount(UserCabinetMain, {
      global: {
        plugins: [vuetify, VCalendar],
      }
    })

    expect(wrapper.exists())
      .toBe(true)
  })
})