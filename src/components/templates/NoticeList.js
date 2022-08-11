/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import FrameHeader from "./FrameHeader";
import ListFrame from '../atoms/ListFrame';
import { useState } from "react";
import SearchBar from '../atoms/SearchBar';
import SelectedInterestList from "./SelectedInterestList";
export default function NoticeList(){

    const [activeIndex, setActiveIndex] = useState(2);
    const tabContArr=[
        {
            tabTitle:"내 관심사로 검색"
            ,
            tabCont:(
                <SelectedInterestList  />
            )
        },
        {
            tabTitle:"제목으로 검색",
            tabCont:(
                <SearchBar/>
            )
        },
        {
            tabTitle:"빈 화면",
            tabCont:(
                <TabEmpty/>
            )
        }
    ];
    const tabClickHandler=(index)=>{
        setActiveIndex(index);
    }
    return(
            <NoticeListPage>
                
                    <FrameHeader frameTitle='공고 검색'/>
                    <TabFrame>
                        <Tab1 onClick={()=> tabClickHandler(0)} >{tabContArr[0].tabTitle}</Tab1>
                        <Tab2 onClick={()=> tabClickHandler(1)}>{tabContArr[1].tabTitle}</Tab2>
                    </TabFrame>
                    <ContentsBySearchType>
                        {tabContArr[activeIndex].tabCont}
                    </ContentsBySearchType>
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
                        <ListFrame/>
                        <ListFrame/>
                    </AllListFrame>
                
                </NoticeListPage>
    );
}



const NoticeListPage = styled.div`
    //padding : 20px 30px 20px 30px;
    border: 1px solid #A4A4A4 ;
    height:90%;
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

const TabFrame =styled.div`
    display:flex;
    border-bottom:1px solid black;
    
`
const Tab1 =styled.span`
    padding: 4px 10px 4px 10px;
    margin-left:20px;
    font-size:12px;
    color: #A4A4A4;
    border-bottom:1px solid white;
    &:hover{
        color: black;
        border-bottom:1px solid;
    }
   
`
const Tab2 = styled.span`
    padding: 4px 10px 4px 10px;
    font-size:12px;
    color: #A4A4A4;
    border-bottom:1px solid white;
    &:hover{
        color: black;
        border-bottom:1px solid;
    }
`

const ContentsBySearchType = styled.div`

`
const AllListFrame =styled.div`
    display:flex;
    flex-direction: column; 
    align-items:center;
    padding: 20px 30px 20px 30px;
    border-top : 1px solid;
    
    
`
const TabEmpty = styled.div`

`