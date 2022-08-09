export type ToDoType = {
  id: number
  title: string
  description: string
  status: StatusType
}
export type StatusType = 'waiting' | 'current' | 'done'
