export interface Todo {
    id: number
    isDone: boolean
    description: string
    deadline: number
    userId: number
    createdAt: string
    updatedAt: string
}

export interface NewTodo {
    description: string
    userId: number
    deadline: number
}