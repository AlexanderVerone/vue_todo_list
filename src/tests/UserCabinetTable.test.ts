import {beforeAll, describe, it, expect} from 'vitest';
import {mount} from '@vue/test-utils';
import UserCabinetTable from '@/modules/UserCabinet/components/UserCabinetTable.vue';
import {createPinia, setActivePinia} from 'pinia';
import {createVuetify} from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import {aliases, mdi} from 'vuetify/iconsets/mdi';
import VCalendar from 'v-calendar';

describe('UserCabinetTable', () => {
  beforeAll(() => {
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

    const wrapper = mount(UserCabinetTable, { 
      props: { todos: [] }, 
      global: {
        plugins: [vuetify, VCalendar],
      },
    })

    expect(wrapper.exists())
      .toBe(true)
  })
})