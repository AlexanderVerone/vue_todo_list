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
    description: string | null
    userId?: number
    deadline: number | null
}