import React, { FC, useRef } from 'react'
import { ToDoType } from '../../types/ToDo'
import { generateRandomId } from '../../utils/generateRandomID'
import styles from './ToDoItem.module.scss'

type PropsType = {
  todo: ToDoType
  setActiveToDo: React.Dispatch<React.SetStateAction<ToDoType | null>>
  setToDoList: React.Dispatch<React.SetStateAction<ToDoType[]>>
  activeToDo: null | ToDoType
}

const ToDoItem: FC<PropsType> = ({
  todo,
  setActiveToDo,
  setToDoList,
  activeToDo,
}) => {
  const inputEl = useRef(null)
  const inputSpanEl = useRef(null)
  const deleteButton = useRef(null)

  const onClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    let target = e.target
    if (
      target !== inputEl.current &&
      target !== inputSpanEl.current &&
      target !== deleteButton.current
    ) {
      setActiveToDo(todo)
    }
  }

  const onDelete = () => {
    setToDoList((prevState) => prevState.filter((el) => el !== todo))
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
    <li
      className={styles.toDoItem}
      onClick={(e) => onClick(e)}
      style={{
        textDecoration: todo.status == 'done' ? 'line-through' : 'none',
        color: todo.status == 'done' ? 'grey' : 'black',
        background:
          todo.id === activeToDo?.id
            ? '#c5c7cb'
            : todo.status === 'done'
            ? '#afc9bb'
            : todo.status === 'current'
            ? '#afb8c9'
            : todo.status === 'waiting'
            ? 'none'
            : 'none',
      }}
    >
      <label className={styles.check}>
        <input
          ref={inputEl}
          className={styles.checkInput}
          checked={todo.status === 'done'}
          onChange={(e) => onInputClick(e)}
          type="checkbox"
        />
        <span ref={inputSpanEl} className={styles.checkBox} />
      </label>
      <div className={styles.toDoItemTextContainer}>
        <p className={styles.toDoTitle}>{todo.title}</p>
        <p className={styles.toDoDescription}>{todo.description}</p>
        <p className={styles.toDoStatus}>status: {todo.status}</p>
      </div>
      <div>
        <button
          onClick={onDelete}
          ref={deleteButton}
          className={styles.toDoItemDelete}
        >
          &#9587;
        </button>
      </div>
    </li>
  )
}

export default ToDoItem
