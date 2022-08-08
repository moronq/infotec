import React, { FC, useState } from 'react'
import { generateRandomId } from '../utils/generateRandomID'

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
  const onChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value)
  }

  return (
    <section>
      <h3>Create To Do</h3>
      <form onSubmit={(e) => submit(e)}>
        <label>
          title
          <input
            type="text"
            placeholder="todo..."
            value={title}
            onChange={(e) => onChangeTitle(e)}
          />
        </label>
        <label>
          description
          <input
            type="text"
            placeholder="description..."
            value={description}
            onChange={(e) => onChangeDescription(e)}
          />
        </label>

        <button type="submit">Create To Do</button>
      </form>
    </section>
  )
}

export default CreateToDo
