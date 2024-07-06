const express = require("express");
const fs = require("fs");
const app = express();
const port = 8000;

const videosCartoonFileMap = {
    "MM":"Videos/MickeyMouse.mp4",
    "PP":"Videos/ThePowerpuffGirls.mp4",
    "TJ":"Videos/TomAndJerry.mp4",
}

app.get("/videos/:filename",(req,res)=>{
    
        const fileName = req.params.filename;
        const filePath = videosCartoonFileMap[fileName];
        if(!filePath){
            return res.status(404).send("File Not Found");
        }
        const stat =  fs.statSync(filePath);
        const fileSize = stat.size;
        const range = req.header.range;//Range: bytes=500-999  https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Range

        if(range){
            const parts = range.replace(/bytes=/,"").split("-"); //(REGEXP,"")
            const start = parseInt(parts[0],10);
            const end = parts[1]?parseInt(parts[1],10):fileSize-1;
            const chunkSize = end-start+1;
            const file =  fs.createReadStream(filePath,[start,end]);
            const head = {
                "Content-Range":`bytes ${start}-${end}/${fileSize}`,
                "Accept-Ranges":"bytes",
                "Content-Length":chunkSize,
                "Content-Type":"video/mp4"
            };
            res.writeHead(206,head);
             file.pipe(res);
        }
        else{
            const head = {
                "Content-Length":fileSize,
                "Content-Type":"video/mp4"
            };
            res.writeHead(200,head);
            fs.createReadStream(filePath).pipe(res);
        }
        
    }
 );

app.listen(port,()=>{
    console.log("server is listen on port: "+port);
})