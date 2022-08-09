import { StatusType, ToDoType } from '../types/ToDo'

export const createCommonToDo: (
  id: number,
  title: string,
  description: string,
  status: StatusType
) => ToDoType = (id, title, description, status) => {
  return {
    id: id,
    title: title,
    description: description,
    status: status,
  }
}
