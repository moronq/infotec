import React, { FC, useEffect } from 'react'
import { ToDoType } from '../../types/ToDo'
import ToDoItem from '../ToDoItem/ToDoItem'
import styles from './ToDoList.module.scss'

type PropsType = {
  toDoList: Array<ToDoType>
  setActiveToDo: (arg: ToDoType | null) => void
  setToDoList: React.Dispatch<React.SetStateAction<ToDoType[]>>
  activeToDo: null | ToDoType
}

const ToDoList: FC<PropsType> = ({
  toDoList,
  setActiveToDo,
  setToDoList,
  activeToDo,
}) => {
  useEffect(() => {
    setActiveToDo(null)
  }, [toDoList])

  return (
    <section>
      <div className={styles.listTitleContainer}>
        <h3>To Do List</h3>
      </div>
      <ul className={styles.toDoListContainer}>
        {toDoList.map((el) => {
          return (
            <ToDoItem
              key={el.id}
              todo={el}
              setActiveToDo={setActiveToDo}
              setToDoList={setToDoList}
              activeToDo={activeToDo}
            />
          )
        })}
      </ul>
    </section>
  )
}

export default ToDoList
