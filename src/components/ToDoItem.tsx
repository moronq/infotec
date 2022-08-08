import React, { FC, useRef, useState } from 'react'
import { ToDoType } from '../types/ToDo'
import { generateRandomId } from '../utils/generateRandomID'

type PropsType = {
  todo: ToDoType
  setActiveToDo: (arg: ToDoType) => void
  setToDoList: React.Dispatch<React.SetStateAction<ToDoType[]>>
}

const ToDoItem: FC<PropsType> = ({ todo, setActiveToDo, setToDoList }) => {
  const inputEl = useRef(null)

  const onClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    let target = e.target
    if (target !== inputEl.current) {
      setActiveToDo(todo)
    }
  }

  const onInputClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.checked) {
      setToDoList((prevState) => {
        return [
          ...prevState.filter((el) => el.id !== todo.id),
          {
            id: generateRandomId(),
            description: todo.description,
            title: todo.title,
            status: 'done',
          } as ToDoType,
        ]
      })
    } else {
      setToDoList((prevState) => {
        return [
          {
            id: generateRandomId(),
            description: todo.description,
            title: todo.title,
            status: 'waiting',
          } as ToDoType,
          ...prevState.filter((el) => el.id !== todo.id),
        ]
      })
    }
  }
  return (
    <li onClick={(e) => onClick(e)}>
      <label>
        <input
          checked={todo.status === 'done'}
          ref={inputEl}
          onChange={(e) => onInputClick(e)}
          type="checkbox"
        />
      </label>
      <p>title : {todo.title}</p>
      <p>description: {todo.description}</p>
      <p>status: {todo.status}</p>
    </li>
  )
}

export default ToDoItem
