import {beforeEach, describe, expect, it} from 'vitest';
import {createPinia, setActivePinia} from 'pinia';
import {useAuthorizationStore} from '@/modules/Authorization/store';

describe('authorizationStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())

  })

  it('initializes with empty values', () => {
    const store = useAuthorizationStore()

    expect(store.userId).null
    expect(store.userEmail).empty
    expect(store.userRoles)
      .toHaveLength(0)
  })
})