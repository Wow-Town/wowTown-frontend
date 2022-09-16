/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import FrameHeader from "./FrameHeader";
import ListFrame from '../atoms/ListFrame';
import { useState, useEffect } from "react";
import SearchBar from '../atoms/SearchBar';
import SelectedInterestList from "./SelectedInterestList";
import { getNoticeList } from "../../apis/notice.api";
import {useMutation, useQuery} from 'react-query';
import { getAvatar } from "../../apis/avatar.api";

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
                <SearchBar setNoticeData={setNoticeData} />
            )
        },
        {
            tabTitle:"전체 공고",
            tabCont:(
                <TabEmpty/>
            )
        }
    ];
    const tabClickHandler=(index)=>{
        setActiveIndex(index);
    }

    const [searchedNotice,setSearchredNotice] =useState([]); 
    
    //보여줄 공고(페이지별 다름)
   


    //page 0 api 
    
    

    //page 1 제목 별 검색
    function setNoticeData(searchByTitleNotice){
        setSearchredNotice(searchByTitleNotice);
        console.log('부모',searchByTitleNotice);
    }

    //page 2 : 전체공고 api

    const{ mutateAsync: handleNoticeList } = useMutation(getNoticeList,{
        onSuccess: ({response, success, error }) => {
            if(success){
                setSearchredNotice(response);
                console.log(searchedNotice);
               
            }else{
                console.log('notice loading failed: ', error);
            }
        }
        });

    
    useEffect(() =>{
    
        if (activeIndex === 0){
            console.log("페이지 0 실행");
            
           
        }
        else if (activeIndex ===1){
            console.log("페이지 1 실행");
           
        }else {
            console.log("페이지 2 실행");
            handleNoticeList();
        
    }},[activeIndex]) ;
    
    

    return(
            <NoticeListPage>
                
                    <FrameHeader frameTitle='공고 검색'/>
                    <TabFrame>
                        <Tab1 onClick={()=> tabClickHandler(0)} >{tabContArr[0].tabTitle}</Tab1>
                        <Tab2 onClick={()=> tabClickHandler(1)}>{tabContArr[1].tabTitle}</Tab2>
                        <Tab2 onClick={()=> tabClickHandler(2)}>{tabContArr[2].tabTitle}</Tab2>
                    </TabFrame>
                    <ContentsBySearchType>
                        {tabContArr[activeIndex].tabCont}
                    </ContentsBySearchType>
                    <AllListFrame>
                        {searchedNotice.map(
                            (notice)=>{
                                return (<ListFrame
                                    key={notice.noticeId}
                                    ownerName={notice.ownerName}
                                    subject={notice.subject}
                                    interests={notice.interests}
                                />)
                            })
                        }
                    </AllListFrame>
                
                </NoticeListPage>
    );
}



const NoticeListPage = styled.div`
    width:100%;
    height:100%;
    
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
    height: 70%;
    overflow-y: scroll;
    

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
const TabEmpty = styled.div`

`