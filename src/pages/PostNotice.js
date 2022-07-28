import styled from "styled-components";
import FrameHeader from "../components/FrameHeader";
export default function PostNotice(){

    

    return(
        <Frame >
            <FrameHeader frameTitle='공고 올리기'/>
            
        </Frame>
    );
}

const Frame= styled.div`
    padding : 20px 30px 20px 30px;
    border: 1px solid #A4A4A4 ;
    width:490px;

`