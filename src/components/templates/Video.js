/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import { useRef ,useEffect } from 'react';

export default function Video({id,stream}) {
    const viewRef = useRef(null);

  useEffect(() => {
    if (!viewRef.current)
        return;
    viewRef.current.srcObject = stream ? stream : null;
  }, [stream]);

  return (
        //<VideoFrame >
        <VideoContent   ref={viewRef} autoPlay > 
            
        </VideoContent>
       //  </VideoFrame>
    )
}

const VideoFrame = styled.div`
    //display: flex;
    //align-items: center;
    //justify-content: center;
    //min-height: 100%;
    //border: 1px solid green;

`

const VideoContent = styled.video`
width:100%;
height:100%;
//object-fit: cover;
display: flex;
align-items: center;
justify-content: center;
min-height: 230px;


`