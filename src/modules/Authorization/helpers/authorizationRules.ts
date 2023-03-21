export const rules = {
    email: [
        (value: string) => {
            if (value) {
                return true
            }

            return 'Поле E-mail обязательное'
        },
        (value: string) => {
            if (/.+@.+\..+/.test(value)) {
                return true
            }

            return 'Некорректный E-mail'
        },],
    password: [
        (value: string) => {
            if (value) {
                return true
            }

            return 'Поле Пароль обязательное'
        }
    ]
}