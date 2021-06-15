import React, { Component ,useEffect} from "react";
import { OpenCvProvider, useOpenCv } from 'opencv-react'
import "./Mailbox.css";
import img1 from "./1.png"

// class Mailbox extends Component{
//     render()
//     {
//         return(
//             <h1>Mailbox</h1>
//         )
//     }
// }

function MyComponent() {
  const { loaded, cv } = useOpenCv();




  useEffect(() => {
    if (cv) {
      let d = cv.imread('i')
      
      cv.imshow('b',d);
    }
  }, [cv]);

  return <div class="inputoutput">
  <img src={img1} id="i" />
  <canvas height={'50px'} width={'50px'} id="b"></canvas>
  <div class="caption">imageSrc <input type="file" id="fileInput" name="file" /></div>
</div>;
}

const Mailbox = () => {
  return (
    <OpenCvProvider>
      <MyComponent />
    </OpenCvProvider>
  );
};
export default Mailbox;
