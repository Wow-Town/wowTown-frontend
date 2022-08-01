/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import FrameHeader from "./FrameHeader";
import ListFrame from '../atoms/ListFrame';

export default function NoticeList(){

    

    return(
            <NoticeListFrame>
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
            </NoticeListFrame>
    );
}



const NoticeListFrame = styled.div`
width:100%;
height:100%;
overflow-y: auto;
`
