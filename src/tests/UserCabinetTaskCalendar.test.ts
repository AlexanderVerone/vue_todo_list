import {describe, it, expect, beforeAll} from 'vitest';
import UserCabinetTaskCalendar from '@/modules/UserCabinet/components/UserCabinetTaskCalendar.vue';
import {mount} from '@vue/test-utils';
import VCalendar from 'v-calendar';
import {createVuetify} from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import {aliases, mdi} from 'vuetify/iconsets/mdi';

describe('UserCabinetTaskCalendar', () => {
  beforeAll(() => {
    global.ResizeObserver = class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
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

    const wrapper = mount(UserCabinetTaskCalendar, {
      props: { todos: [] },
      global: {
        plugins: [vuetify, VCalendar]
      }
    })

    expect(wrapper.exists())
      .toBe(true)
  })
})