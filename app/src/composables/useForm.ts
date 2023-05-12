import type {VForm} from 'vuetify/components';

export function useResetFormValidation (form: null | VForm) {
  if (!form) {
    return
  }

  return form.resetValidation()
}

export async function useValidateForm (form: null | VForm): Promise<boolean> {
  if (!form) {
    return false
  }

  const result = await form.validate()

  return result.valid
}