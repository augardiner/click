import { useState, useEffect } from "react";
import "./Metronome.css";
import click from "./click.mp3"


const Metronome = (props:any) => {
  const { task, tempo, prevTempo } = props;
  const secondsPerClick = 60 / tempo;
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [startTime, setStartTime] = useState(0);


  const playTick = () => {
    var audio = new Audio(click);
    audio.play();
  };


  // start and stop click, change click tempo
  useEffect(() => {
    let timerId:any = null;
    
    if (isPlaying) {
      const interval = (secondsPerClick) * 1000;
      timerId = setInterval(playTick, interval);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [isPlaying, tempo]);
  

  // handle new session on tempo change
  useEffect(() => {
    if (isPlaying) {
      if (!task) return;
      const stopTime:any = new Date().valueOf();
      const runTime = Math.ceil((stopTime - startTime)/1000);
      handleNewSession(runTime, prevTempo);
      setStartTime(new Date().valueOf());
    }
  }, [tempo]);


  const handleStartStop = () => {
    if (!isPlaying) {
      playTick();
      setStartTime(new Date().valueOf());
    } else {
      if (task) {
        const stopTime:any = new Date().valueOf();
        const runTime = Math.ceil((stopTime - startTime)/1000);
        handleNewSession(runTime);
      }
    }
    setIsPlaying(!isPlaying);
  };
  

  // post session data to DB
  const handleNewSession = (runTime:number, prevTempo=null) => {
    const url = "/sessions";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        task_id: task.id,
        task: task.task,
        tempo: prevTempo ? prevTempo : tempo,
        start_time: startTime,
        run_time: runTime,
      })
    };
    
    if (runTime <= 1) return;

    fetch(url, requestOptions)
      .then(response => {return response.json()})
      .then(data => {
        // Trigger re-render once we know DB has been updated
        props.handleNewSession()
      })
      .catch(error => console.error(error));
  };


  return (
    <div className="metronome-containter">
      <div 
        className="second_ring"
        // style={{animation: `clickAnimation ${secondsPerClick}s ${isPlaying ? "infinite" : "0"}`}}
        >
      </div>
      <div 
        className="first_ring"
        // style={{animation: `clickAnimation ${secondsPerClick}s ${isPlaying ? "infinite" : "0"}`}}
        >
      </div>
      <div className="button" onClick={handleStartStop}>
        <div className="startStop">{isPlaying ? "STOP" : "START"}</div>
        <div>{tempo}</div>
      </div>
    </div>
  );
};

export default Metronome;
