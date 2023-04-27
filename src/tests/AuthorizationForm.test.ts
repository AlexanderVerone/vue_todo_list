import {describe, it, expect} from 'vitest';
import {mount} from '@vue/test-utils';
import AuthorizationForm from '@/modules/Authorization/components/AuthorizationForm.vue';
import {createVuetify} from 'vuetify';

describe('AuthorizationForm', () => {
  const vuetify = createVuetify()

  it('mount correctly', () => {
    const wrapper = mount(AuthorizationForm, {
      global: {
        plugins: [vuetify],
      }
    })

    expect(wrapper.exists())
      .toBe(true)
  })
})