import { useState, useRef, useEffect } from "react";
import "./App.css";
import Metronome from "./Components/Metronome/Metronome";
import Sidebar from "./Components/Sidebar/Sidebar";
import Content from "./Components/Content/Content";
import { ReactComponent as GitHub } from './github.svg';


function App() {
  const [tempo, setTempo] = useState(60);
  const prevTempo = useRef<number | null>(null);
  const [tasks, setTasks] = useState<object[]>([]);
  const [selectedTask, setSelectedTask] = useState<object | null>(null);
  const [addedSecs, setaddedSecs] = useState<boolean>(false)


  useEffect(() => {
  const url = "http://localhost:5000/tasks";
    const fetchItems = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();

        setTasks(data);
        if (selectedTask == null && data) setSelectedTask(data[0]);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems(); 
  }, [selectedTask]);
  

  const handleTaskChange = (task:any) => {
    if (task.delete) {
      if (tasks.length == 1) setSelectedTask(null);
      else setSelectedTask(tasks[0]);
    } else {
      setSelectedTask(task);
    }
  };


  const addSecs = () => {
    setaddedSecs(!addedSecs);
  };


  const handleChangeTempo = (event:any) => {
    const newTempo = parseFloat(event.target.value);
    prevTempo.current = tempo;
    setTempo(newTempo);
  };

  
  return (
    <div className="app-container">
      <Sidebar 
        tasks={tasks}
        selectedTask={selectedTask}
        handleTaskChange={handleTaskChange}
        />
      <div className="main-body">
        <div className="top-bar">
          <a
            href="https://github.com/augardiner/click"
            target="_blank"
          >            
            <GitHub
              style={{ 
                height: 53, 
                width: 36,
                fill: '#999999',
                cursor: 'pointer',
              }}
            />
          </a>
        </div>
        <Metronome 
          tempo={tempo} 
          prevTempo={prevTempo.current}
          task={selectedTask}
          handleNewSession={addSecs}
        />
        <div className="slidecontainer">
          <input
            type="range"
            value={tempo}
            min="40" 
            max="208"
            onChange={handleChangeTempo}
            className="slider" 
            id="myRange">
          </input>
        </div>
        {!selectedTask && 
        <div className="content-init">
          <h2>Create A New Task To Track Your Progress</h2>
        </div>}
        {selectedTask && 
          <Content 
          task={selectedTask}
          addedSecs={addedSecs}
        />}
      </div>
      <div className="footer">
        <p>AUG | 2023</p>
      </div>
    </div>
  );
}

export default App;
