import useFetch from "../../Hooks/useFetch";
import "./Content.css";
import Line from "./LineChart";


const Content = (props:any) => {
  const { task, addedSecs } = props;

  const url = `http://api:5000/task_total?task=${task.task}`;
  const { statusText, data } = useFetch(url, [task, addedSecs]);


  // Convert seconds into hours, minutes seconds
  const secsToHMS = (seconds:number) => {
    if (seconds == null) return ""
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds % 3600) / 60);
    var remainingSeconds = seconds % 60;

    var result = "";
    if (hours > 0) {
      const label = hours == 1 ? "Hour" : "Hours"
      result += hours + ` ${label} `;
    }
    if (minutes > 0) {
      const label = minutes == 1 ? "Minute" : "Minutes"
      result += minutes + ` ${label} `;
    }
    if (remainingSeconds > 0) {
      const label = remainingSeconds == 1 ? "Second" : "Seconds"
      result += remainingSeconds + ` ${label}`;
    }
    
    return result;
  };
  

  return (
    <div className="task-container">
      <div className="task-content-header">
        {task && <h1>{task.task}</h1>}
        {statusText == "OK" && <h2>{secsToHMS(data.totalSecs)}</h2>}
      </div>
      <h2 className="chart-title">Tempo</h2>
      <Line task={task} addedSecs={addedSecs}/>
    </div>
  )
};

export default Content;
