import { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/About";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import Header from './components/Header'
import Tasks from './components/Tasks';

function App() {

  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: 'Doctors Appointment',
      day: 'Feb 5th at 2:30pm',
      reminder: true,
    },
    {
      id: 2,
      text: 'Meeting at School',
      day: 'Feb 6th at 1:30pm',
      reminder: true,
    },
    {
      id: 3,
      text: 'Food Shopping',
      day: 'Feb 5th at 2:30pm',
      reminder: false,
    },
  ])

  const addTask = (task) => {
    const id = tasks.slice(-1).pop()?.id + 1 ?? 1
    setTasks([...tasks, { ...task, id }])
  }

  const deleteTask = id => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const toggleReminder = id => {
    setTasks(tasks.map(task => task.id === id ? { ...task, reminder: !task.reminder } : task))
  }

  return (
    <Router>
      <div className="container">
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
        
        <Routes>
          <Route path="/" element={
            <>
              {showAddTask && (<AddTask onAdd={addTask} />)}
              {tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />) : ('No Tasks to Show')}
            </>
          }/>

          <Route path="/about" element={<About/>} />
        </Routes>

        <Footer />
      </div>
    </Router>
  )
}

export default App;
