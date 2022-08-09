import React, { FC, useEffect, useState } from 'react'
import { StatusType, ToDoType } from '../../types/ToDo'
import { createCommonToDo } from '../../utils/createCommonToDo'
import { generateRandomId } from '../../utils/generateRandomID'
import Button from '../Button/Button'
import styles from './ToDoEdit.module.scss'

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
  const [status, setStatus] = useState<StatusType>('' as StatusType)

  useEffect(() => {
    if (activeToDo) {
      setTitle(activeToDo.title)
      setDescription(activeToDo.description)
      setStatus(activeToDo.status)
      setEditMode(false)
    }
  }, [activeToDo])

  const onCancelEditAction = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    arg: boolean
  ) => {
    e.preventDefault()
    setEditMode(arg)
  }

  const onEditClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onCancelEditAction(e, true)
  }
  const onCancelClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    onCancelEditAction(e, false)
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
  const onChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
  }
  const onChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as StatusType)
  }
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (activeToDo) {
      setToDoList((prevState) => {
        return [
          createCommonToDo(activeToDo.id, title, description, status),
          ...prevState.filter((el) => el !== activeToDo),
        ]
      })
      setEditMode(false)
      setActiveToDo(null)
    }
  }

  const onDoneClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    if (activeToDo) {
      if (activeToDo.status !== 'done') {
        setToDoList((prevState) => {
          return [
            ...prevState.filter((el) => el.id !== activeToDo.id),
            createCommonToDo(
              generateRandomId(),
              activeToDo.title,
              activeToDo.description,
              'done'
            ),
          ]
        })
      }
    }
  }

  return (
    <section className={styles.section}>
      <div className={styles.editTitleContainer}>
        <h3>Edit To Do</h3>
      </div>
      {activeToDo ? (
        <form className={styles.toDoEditForm} onSubmit={(e) => onSubmit(e)}>
          <div>
            <label className={styles.toDoEditLabel}>
              Title:
              {editMode ? (
                <input
                  placeholder="title..."
                  className={styles.editToDoInput}
                  value={title}
                  onChange={(e) => onChangeTitle(e)}
                />
              ) : (
                <span className={styles.toDoEditInfo}>{activeToDo.title}</span>
              )}
            </label>
          </div>
          <div>
            <label className={styles.toDoEditLabel}>
              Description:
              {editMode ? (
                <textarea
                  placeholder="description..."
                  className={styles.editToDoInput}
                  value={description}
                  onChange={(e) => onChangeDescription(e)}
                />
              ) : (
                <span className={styles.toDoEditInfo}>
                  {activeToDo.description}
                </span>
              )}
            </label>
          </div>
          <div>
            <label className={styles.toDoEditLabel}>
              Status:
              {editMode ? (
                <select
                  className={styles.editToDoInput}
                  onChange={(e) => onChangeStatus(e)}
                  defaultValue={activeToDo.status}
                >
                  <option>waiting</option>
                  <option>current</option>
                  <option>done</option>
                </select>
              ) : (
                <span className={styles.toDoEditInfo}>{activeToDo.status}</span>
              )}
            </label>
          </div>

          {editMode ? (
            <div className={styles.editButtonContainer}>
              <Button disabled={title.length === 0} type="submit">
                Save
              </Button>
              <Button callBack={onCancelClick}>Cancel</Button>
            </div>
          ) : (
            <div className={styles.editButtonContainer}>
              <Button callBack={onDoneClick}>Done</Button>
              <Button callBack={onEditClick}>Edit</Button>
              <Button callBack={onDeleteClick}>Delete</Button>
            </div>
          )}
        </form>
      ) : null}
    </section>
  )
}

export default ToDoEdit
