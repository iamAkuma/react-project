import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import About from './components/About'

function App() {
  const [showAdd, setshowAdd] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const taksFromServer = await fetchTasks()
      setTasks(taksFromServer)
    }
    getTasks()
  }, [])

  //Fetch tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }
  //Fetch task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }
  //Add task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()
    setTasks([...tasks, data])
  }

  // const addTask = (task) => {
  //   const id = Math.floor(Math.random() * 10000) + 1
  //   const newTask = { id, ...task }
  //   setTasks([...tasks, newTask])
  // }

  //Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })

    setTasks(tasks.filter((task) => task.id !== id))
  }

  //Toggle Reminder
  const toggleRem = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = {
      ...taskToToggle,
      reminder: !taskToToggle.reminder
    }

    const res = await fetch(`http://localhost:5000/tasks/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updTask)
      }
    )

    const data = await res.json()

    setTasks(tasks.map((task) =>
      task.id === id
        ?
        { ...task, reminder: data.reminder } : task))
  }

  return (
    <Router>
      <div className="container">
        <Header onAdd={() => setshowAdd(!showAdd)} show={showAdd} />
        <Routes>
         <Route path='/' element = {
        <>
              {showAdd && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? (
                <Tasks tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleRem} />
              )
                :
                ('No Tasks Added.'
                )}
            </>

          }
          />
    
          < Route path='/about' element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}


export default App;
