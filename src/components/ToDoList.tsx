import React, { FC, useEffect } from 'react'
import { ToDoType } from '../types/ToDo'
import ToDoItem from './ToDoItem'

type PropsType = {
  toDoList: Array<ToDoType>
  setActiveToDo: (arg: ToDoType | null) => void
  setToDoList: React.Dispatch<React.SetStateAction<ToDoType[]>>
}

const ToDoList: FC<PropsType> = ({ toDoList, setActiveToDo, setToDoList }) => {
  useEffect(() => {
    setActiveToDo(null)
  }, [toDoList])

  return (
    <section>
      <h3>To Do List</h3>
      <ul>
        {toDoList.map((el) => {
          return (
            <ToDoItem
              key={el.id}
              todo={el}
              setActiveToDo={setActiveToDo}
              setToDoList={setToDoList}
            />
          )
        })}
      </ul>
    </section>
  )
}

export default ToDoList
