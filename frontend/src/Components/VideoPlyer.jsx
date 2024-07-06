import { useEffect,useRef} from "react";

const VideoPlayer=({videoId})=>{

    const videoRef = useRef(null);
    const backendPath = `http://localhost:8000/videos/${videoId}`
    
    useEffect(()=>{
        if(videoRef.current){
            videoRef.current.pause();
            videoRef.current.removeAttribute("src");
            videoRef.current.load();
        }
    });
    
    return(
       <video ref={videoRef} width={"320px"} height={"240px"} controls autoPlay>
            <source src={backendPath} type="video/mp4"/>
           Your browser does not support the video tag
       </video>
    );
}
export default VideoPlayer;