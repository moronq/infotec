import { useState } from 'react'
import './App.css'
import CreateToDo from './components/CreateToDo'
import ToDoEdit from './components/ToDoEdit'
import ToDoList from './components/ToDoList'
import { ToDoType } from './types/ToDo'

function App() {
  const [toDoList, setToDoList] = useState<Array<ToDoType>>([])
  const [activeToDo, setActiveToDo] = useState<null | ToDoType>(null)

  return (
    <main className="App">
      <div>
        <CreateToDo setToDoList={setToDoList} />
        <div className="toDoListContainer">
          <ToDoList
            toDoList={toDoList}
            setActiveToDo={setActiveToDo}
            setToDoList={setToDoList}
          />
        </div>
      </div>
      <ToDoEdit
        activeToDo={activeToDo}
        setToDoList={setToDoList}
        setActiveToDo={setActiveToDo}
      />
    </main>
  )
}

export default App
