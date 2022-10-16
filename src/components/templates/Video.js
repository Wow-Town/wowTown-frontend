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
        <VideoFrame id={id}>
            <VideoContent ref={viewRef} autoPlay controls></VideoContent>
        </VideoFrame>
    )
}

const VideoFrame = styled.div`

`

const VideoContent = styled.video`

`