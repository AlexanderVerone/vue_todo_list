import {describe, it, expect} from 'vitest';
import UserCabinetNewTodoModal from '@/modules/UserCabinet/components/UserCabinetNewTodoModal.vue';
import {mount} from '@vue/test-utils';
import {createVuetify} from 'vuetify';

describe('UserCabinetNewTodoModal', () => {
  const vuetify = createVuetify()

  it ('mounted', () => {
    const wrapper = mount(UserCabinetNewTodoModal, {
      global: {
        plugins: [vuetify],
      }
    })

    expect(wrapper.exists())
      .toBe(true)
  })
})