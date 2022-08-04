/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import FrameHeader from "./FrameHeader";
import ListFrame from '../atoms/ListFrame';

export default function NoticeList(){

    

    return(
            <NoticeListFrame>
                <FrameHeader frameTitle='공고 검색'/>
                <SearchFrame>
                    설계 없음
                </SearchFrame>
                <AllListFrame>
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
                </AllListFrame>
            </NoticeListFrame>
    );
}



const NoticeListFrame = styled.div`
    padding : 20px 30px 20px 30px;
    border: 1px solid #A4A4A4 ;
    height:100%;
    overflow-y: auto;
    &::-webkit-scrollbar {
        width: 10px;
        
    }
    &::-webkit-scrollbar-thumb:hover {
        background: #A4A4A4;
    }
    &::-webkit-scrollbar-thumb:active {
        background: #A4A4A4;
    }
    &::-webkit-scrollbar-thumb {
        background: #BCBCBC;
        border-radius: 10px;
    }
`
const SearchFrame = styled.div`

`
const AllListFrame =styled.div`
    display:flex;
    flex-direction: column; 
    align-items:center;
    
`
