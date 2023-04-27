import {describe, it, beforeAll, expect} from 'vitest';
import TheHeader from '@/components/TheHeader.vue';
import {mount} from '@vue/test-utils';
import {createPinia, setActivePinia} from 'pinia';

describe('TheHeader', () => {
  beforeAll(() => {
    setActivePinia(createPinia())
  })

  it ('mounted correctly', () => {
    const wrapper = mount(TheHeader)

    expect(wrapper.exists())
      .toBe(true)
  })
})