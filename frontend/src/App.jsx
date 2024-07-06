import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import VideoPlayer from './Components/VideoPlyer'

function App() {
  const [videoId, setVideoId] = useState(null);

  const playVideo = (e,videoId)=>{
    e.preventDefault();
    setVideoId(videoId);
  }
  return (
    <div>
      {videoId&&<VideoPlayer videoId={videoId}/>}<br/>
      <button onClick={(e)=>{playVideo(e,"MM")}}>Play Mickey</button>
      <button onClick={(e)=>{playVideo(e,"PP")}}>Play PowerPuffGirl</button>
      <button onClick={(e)=>{playVideo(e,"TJ")}}>Play TomAndJerry</button>
    </div>
  )
}

export default App
