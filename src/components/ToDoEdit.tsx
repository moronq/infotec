import React, { FC, SetStateAction, useEffect, useState } from 'react'
import { ToDoType } from '../types/ToDo'

type PropsType = {
  activeToDo: null | ToDoType
  setToDoList: React.Dispatch<React.SetStateAction<Array<ToDoType>>>
  setActiveToDo: React.Dispatch<React.SetStateAction<ToDoType | null>>
}

const ToDoEdit: FC<PropsType> = ({
  activeToDo,
  setToDoList,
  setActiveToDo,
}) => {
  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('')

  useEffect(() => {
    if (activeToDo) {
      setTitle(activeToDo.title)
      setDescription(activeToDo.description)
      setStatus(activeToDo.status)
      setEditMode(false)
    }
  }, [activeToDo])

  const onEditClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setEditMode(true)
  }
  const onCancelClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    setEditMode(false)
  }
  const onDeleteClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    setToDoList((prevState) => prevState.filter((el) => el !== activeToDo))
    setActiveToDo(null)
  }
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }
  const onChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value)
  }
  const onChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value)
  }
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (activeToDo) {
      setToDoList((prevState) => {
        return [
          {
            id: activeToDo.id,
            status: status,
            description: description,
            title: title,
          } as ToDoType,
          ...prevState.filter((el) => el !== activeToDo),
        ]
      })
      setEditMode(false)
      setActiveToDo(null)
    }
  }

  return (
    <section>
      <h3>Edit ToDo</h3>
      {activeToDo ? (
        <form onSubmit={(e) => onSubmit(e)}>
          <div>
            <span>title: </span>
            {editMode ? (
              <label>
                <input value={title} onChange={(e) => onChangeTitle(e)} />
              </label>
            ) : (
              <span>{activeToDo.title}</span>
            )}
          </div>
          <div>
            <span>description: </span>
            {editMode ? (
              <input
                value={description}
                onChange={(e) => onChangeDescription(e)}
              />
            ) : (
              <span>{activeToDo.description}</span>
            )}
          </div>
          <div>
            <span>status: </span>
            {editMode ? (
              <select
                onChange={(e) => onChangeStatus(e)}
                defaultValue={activeToDo.status}
              >
                <option>waiting</option>
                <option>current</option>
                <option>done</option>
              </select>
            ) : (
              <span>{activeToDo.status}</span>
            )}
          </div>

          {editMode ? (
            <>
              <button type="submit">save</button>
              <button onClick={(e) => onCancelClick(e)}>cancel</button>
            </>
          ) : (
            <>
              <button>done</button>
              <button onClick={(e) => onEditClick(e)}>edit</button>
              <button onClick={(e) => onDeleteClick(e)}>delete</button>
            </>
          )}
        </form>
      ) : null}
    </section>
  )
}

export default ToDoEdit
