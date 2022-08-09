import React, { FC, useEffect, useState } from 'react'
import { ToDoType } from '../../types/ToDo'
import ToDoItem from '../ToDoItem/ToDoItem'
import styles from './ToDoList.module.scss'

type PropsType = {
  toDoList: Array<ToDoType>
  setActiveToDo: React.Dispatch<React.SetStateAction<ToDoType | null>>
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

  const [filteredToDo, setFilteredToDo] = useState<Array<ToDoType>>(toDoList)
  const [search, setSearch] = useState('')
  const [searchToDo, setSearchToDo] = useState<Array<ToDoType>>(filteredToDo)

  useEffect(() => {
    setFilteredToDo([
      ...toDoList.filter((el) => el.status === 'current'),
      ...toDoList.filter((el) => el.status === 'waiting'),
      ...toDoList.filter((el) => el.status === 'done'),
    ])
  }, [toDoList])

  useEffect(() => {
    setSearchToDo(filteredToDo)
  }, [filteredToDo])

  useEffect(() => {
    setSearchToDo(
      filteredToDo.filter((el) =>
        el.title.toLowerCase().includes(search.toLowerCase())
      )
    )
  }, [search])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  return (
    <section>
      <div className={styles.listTitleContainer}>
        <h3>To Do List</h3>
      </div>
      <label className={styles.toDoSearchLabel}>
        Search
        <input
          value={search}
          onChange={onChange}
          type="text"
          placeholder="search todo..."
          className={styles.toDoSearchInput}
        />
      </label>
      <ul className={styles.toDoListContainer}>
        {searchToDo.map((el) => {
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
