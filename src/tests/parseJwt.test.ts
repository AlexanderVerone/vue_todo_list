import {describe, expect, it} from 'vitest';
import {parseJwt} from '@/modules/Authorization/helpers/utils';

describe('parseJwt function', () => {
  const testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsZXhhbmRlcnZlcm9uZUBnbWFpbC5jb20iLCJpZCI6OCwicm9sZXMiOlt7ImlkIjoyLCJ2YWx1ZSI6IlVTRVIiLCJkZXNjcmlwdGlvbiI6ItCf0L7Qu9GM0LfQvtCy0LDRgtC10LvRjCIsImNyZWF0ZWRBdCI6IjIwMjMtMDMtMTNUMTY6MDA6NTkuMTg5WiIsInVwZGF0ZWRBdCI6IjIwMjMtMDMtMTNUMTY6MDA6NTkuMTg5WiIsIlVzZXJSb2xlcyI6eyJpZCI6Niwicm9sZUlkIjoyLCJ1c2VySWQiOjh9fV0sImlhdCI6MTY4MjMzOTU1OSwiZXhwIjoxNjgyNDI1OTU5fQ.1rb-0gEc7XCmJICnrgbe8zXX1gi40I_qjoaP6wOEUIo'
  const testObjectFromToken = {
    email: 'alexanderverone@gmail.com',
    id: 8,
    roles: [
      {
        id: 2,
        value: 'USER',
        description: 'Пользователь'
      }
    ]
  }

  it ('jwt return user information object', () => {
    expect(parseJwt(testToken))
      .toMatchObject(testObjectFromToken)
  })
})