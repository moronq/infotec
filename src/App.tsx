import React, { useEffect, useRef, useState } from 'react'
import styles from './App.module.scss'
import CreateToDo from './components/CreateToDo/CreateToDo'
import ToDoEdit from './components/ToDoEdit/ToDoEdit'
import ToDoList from './components/ToDoList/ToDoList'
import { ToDoType } from './types/ToDo'

function App() {
  const [toDoList, setToDoList] = useState<Array<ToDoType>>([])
  const [activeToDo, setActiveToDo] = useState<null | ToDoType>(null)

  const resizable = useRef<HTMLDivElement | null>(null)

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const resizableEl = resizable.current
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)

    function onMouseMove(event: MouseEvent) {
      const delta = event.pageX - e.clientX - 16
      resizableEl!.style.width = e.clientX + delta + 'px'
    }
    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }
  }

  return (
    <main className={styles.App}>
      <div ref={resizable} className={styles.leftSide}>
        <CreateToDo setToDoList={setToDoList} />
        <ToDoList
          toDoList={toDoList}
          setActiveToDo={setActiveToDo}
          setToDoList={setToDoList}
          activeToDo={activeToDo}
        />
        <div
          onMouseDown={(e) => onMouseDown(e)}
          className={styles.dividerContainer}
        >
          <span className={styles.divider} />
        </div>
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
