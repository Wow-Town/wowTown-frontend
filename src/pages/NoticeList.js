import styled from "styled-components";
import FrameHeader from "../components/FrameHeader";
import ListFrame from '../components/ListFrame';
export default function NoticeList(){

    

    return(
        <Frame >
            <FrameHeader frameTitle='공고 검색'/>
            <ListFrame/>
            <ListFrame/>
            <ListFrame/>
            <ListFrame/>
            <ListFrame/>
            <ListFrame/>
            <ListFrame/>
            <ListFrame/>
            <ListFrame/>
            <ListFrame/>
        </Frame>
    );
}

const Frame= styled.div`
    padding : 20px 30px 20px 30px;
    border: 1px solid #A4A4A4 ;
    width:490px;
    height:825px;
    overflow-y: scroll;

`