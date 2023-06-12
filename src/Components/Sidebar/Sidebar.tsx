import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

const url = 'http://localhost:5000/tasks';

const Sidebar = (props:any) => {
  const { tasks, selectedTask, handleTaskChange } = props;

    
  const handleNewTask = (e:any) => {
    if (e.key === 'Enter') {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: e.target.value })
      };

      fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => handleTaskChange(data))
        .catch(error => console.log(error));
      e.target.value = ''
    }
  };

  
  const handleTaskDelete = (task:any) => {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task_id: task.id })
    };

    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => {
        data.delete = true;
        handleTaskChange(data);
      })
      .catch(error => console.log(error));
  };


  return (
    <div className='sidebar'>
        <h1 className='sidebar-header'>
          Click
        </h1>
        <input type="text" placeholder='Create New Task' onKeyDown={handleNewTask}/>
        <div className='task-list'>
          <ul>
            {selectedTask && tasks.map((task:any) => (
              <div
              key={task.id}
              className="task-item-container"
              >
                <div
                  onClick={() => handleTaskChange(task)}
                  className={selectedTask.id == task.id ? 'task-name active' : 'task-name'}
                  >
                  {task.task}
                </div>                  
                <div 
                  className="task-delete"
                  onClick={() => handleTaskDelete(task)}
                >
                  <FontAwesomeIcon icon={faTrashCan} size="xs"/>
                </div>
              </div>
            ))}
          </ul>
        </div>
    </div>
  )
};

export default Sidebar;
