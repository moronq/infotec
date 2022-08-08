import React, { FC, useState } from 'react'
import { generateRandomId } from '../../utils/generateRandomID'
import Button from '../Button/Button'
import styles from './CreateToDo.module.scss'

type PropsType = {
  setToDoList: any
}

const CreateToDo: FC<PropsType> = ({ setToDoList }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setToDoList((prevState: any) => [
      {
        id: generateRandomId(),
        title: title,
        description: description,
        status: 'waiting',
      },
      ...prevState,
    ])
    setTitle('')
    setDescription('')
  }

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }
  const onChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
  }

  return (
    <section className={styles.createToDo}>
      <div className={styles.createTitleContainer}>
        <h3>Create To Do</h3>
      </div>
      <form onSubmit={(e) => submit(e)} className={styles.createForm}>
        <label className={styles.createLabel}>
          Title:
          <input
            className={styles.createInput}
            type="text"
            placeholder="todo..."
            value={title}
            onChange={(e) => onChangeTitle(e)}
          />
        </label>
        <label className={styles.createLabel}>
          Description:
          <textarea
            className={styles.createInput}
            placeholder="description..."
            value={description}
            onChange={(e) => onChangeDescription(e)}
          />
        </label>
        <div className={styles.buttonContainer}>
          <Button type="submit">Create ToDo</Button>
        </div>
      </form>
    </section>
  )
}

export default CreateToDo
