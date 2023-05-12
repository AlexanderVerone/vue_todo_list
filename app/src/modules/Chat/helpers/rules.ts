export const rules = {
  chatMessage: [
    (value: string) => {
      const trimValue = value.trim()
      if (trimValue.trim()) {
        return true
      }

      return 'Сообщение не должно быть пустым'
    }
  ]
}