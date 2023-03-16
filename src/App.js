import { useEffect } from "react";
import { useState, useRef } from "react/cjs/react.development";
import "./App.css"

function App() {
  const [sessionType, setSessionType] = useState("Exercise")

  const [timer, setTimer] = useState(10)
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const increment = useRef(null)

  const changeSessionTime = (e) => {
    setTimer(e.target.value)
    console.log(e.target.values);
  }

  const changeBreakTime = (e) => {
    setTimer(e.target.value)
    console.log(e.target.value);
  }

  const handleStart = () => {
    setIsActive(true)
    setIsPaused(true)
    increment.current = setInterval(() => {
      setTimer((timer) => timer - 1)
    }, 1000)
  }

  const handlePause = () => {
    clearInterval(increment.current)
    setIsPaused(false)
  }

  const handleResume = () => {
    setIsPaused(true)
    increment.current = setInterval(() => {
      setTimer((timer) => timer - 1)
    }, 1000)
  }

  const handleReset = () => {
    clearInterval(increment.current)
    setIsActive(false)
    setIsPaused(false)
    if (sessionType === "Exercise") {
      setTimer(5)
    } else {
      setTimer(5)
    }
  }

  useEffect(()=>{
    if(timer<0){
      if (sessionType === "work") {
        setSessionType("Break")
        setTimer(5)
      } else {
        setSessionType("Exercise")
        setTimer(5)
      }
      
    }
  },[timer])

  const formatTime = () => {
    const getSeconds = `0${(timer % 60)}`.slice(-2)
    const minutes = `${Math.floor(timer / 60)}`
    const getMinutes = `0${minutes % 60}`.slice(-2)
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)

    return `${getHours} : ${getMinutes} : ${getSeconds}`
  }

  return (
    <div className="App">
      <div className="content">
        <section>
          <input onChange={changeSessionTime} defaultValue={5}/>
          <input onChange={changeBreakTime} defaultValue={5}/>
        </section>
        <h1>{sessionType} - {formatTime()}</h1>
        <div className='buttonsSection'>
          {
            !isActive && !isPaused ?
              <button className="btn btnPlay" onClick={handleStart}>Play</button>
              : (
                isPaused ? <button class="btn pauseBtn" onClick={handlePause}>Pause</button> :
                  <button className="btn btnResume" onClick={handleResume}>Resume</button>
              )
          }
          <button className="btn btnReset" onClick={handleReset}>Reset</button>
        </div>
      </div>
    </div>
  );
}

export default App;
