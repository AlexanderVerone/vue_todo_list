export const rules = {
  description: [
    (value: string) => {
      const trimValue = value.trim()
      if (trimValue.trim()) {
        return true
      }

      return 'Поле "Описание задачи" обязательное'
    }
  ]
}