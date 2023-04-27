import {describe, it, expect} from 'vitest';
import UserCabinetTaskCalendar from '@/modules/UserCabinet/components/UserCabinetTaskCalendar.vue';
import {mount} from '@vue/test-utils';

describe('UserCabinetTaskCalendar', () => {
  it ('mounted', () => {
    const wrapper = mount(UserCabinetTaskCalendar, {
      props: { todos: [] }
    })

    expect(wrapper.exists())
      .toBe(true)
  })
})