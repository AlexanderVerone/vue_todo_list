import {beforeAll, describe, it, expect} from 'vitest';
import {mount} from '@vue/test-utils';
import UserCabinetTable from '@/modules/UserCabinet/components/UserCabinetTable.vue';
import {createPinia, setActivePinia} from 'pinia';
import {createVuetify} from 'vuetify';

describe('UserCabinetTable', () => {
  const vuetify = createVuetify()

  beforeAll(() => {
    setActivePinia(createPinia())
  })

  it ('mounted', () => {
    const wrapper = mount(UserCabinetTable, { 
      props: { todos: [] }, 
      global: {
        plugins: [vuetify],
      }, })

    expect(wrapper.exists())
      .toBe(true)
  })
})