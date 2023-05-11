import {describe, it, expect} from 'vitest';
import UserCabinetNewTodoModal from '@/modules/UserCabinet/components/UserCabinetNewTodoModal.vue';
import {mount} from '@vue/test-utils';
import {createVuetify} from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import {aliases, mdi} from 'vuetify/iconsets/mdi';
import VCalendar from 'v-calendar';

describe('UserCabinetNewTodoModal', () => {
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

    const wrapper = mount(UserCabinetNewTodoModal, {
      global: {
        plugins: [vuetify, VCalendar],
      }
    })

    expect(wrapper.exists())
      .toBe(true)
  })
})