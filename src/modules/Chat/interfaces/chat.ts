export interface Message {
    id?: number
    userId: number
    userName: string
    text: string
    messageDate: number
    isRead?: boolean
}