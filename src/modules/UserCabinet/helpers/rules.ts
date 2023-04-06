export const rules = {
  description: [
    (value: string) => {
      if (value) {
        return true
      }

      return 'Поле "Описание задачи" обязательное'
    }
  ]
}