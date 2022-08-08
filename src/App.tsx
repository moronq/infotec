import { useState } from 'react'
import styles from './App.module.scss'
import CreateToDo from './components/CreateToDo/CreateToDo'
import ToDoEdit from './components/ToDoEdit/ToDoEdit'
import ToDoList from './components/ToDoList/ToDoList'
import { ToDoType } from './types/ToDo'

function App() {
  const [toDoList, setToDoList] = useState<Array<ToDoType>>([])
  const [activeToDo, setActiveToDo] = useState<null | ToDoType>(null)

  return (
    <main className={styles.App}>
      <div className={styles.leftSide}>
        <CreateToDo setToDoList={setToDoList} />
        <ToDoList
          toDoList={toDoList}
          setActiveToDo={setActiveToDo}
          setToDoList={setToDoList}
          activeToDo={activeToDo}
        />
      </div>
      <div className={styles.rightSide}>
        <ToDoEdit
          activeToDo={activeToDo}
          setToDoList={setToDoList}
          setActiveToDo={setActiveToDo}
        />
      </div>
    </main>
  )
}

export default App
