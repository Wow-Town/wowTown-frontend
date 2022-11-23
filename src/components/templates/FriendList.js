/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import FrameHeader from '../templates/FrameHeader';
import ListFrame from '../atoms/ListFrame';
import { useState, useEffect  } from "react";
import {useMutation, useQuery} from 'react-query';
import { getAvatarFriendList } from "../../apis/avatar.api";
import FriendFrame from "../atoms/FriendFrame";
import { useNavigate } from "react-router-dom";

export default function FriendList(){
    const navigate = useNavigate();
    
    const tabContArr=[
        {   
            index:0,
            tabTitle:"친구 목록"
        },
        {
            index:1,
            tabTitle:"친구 요청"
        }
    ];
    const [activeIndex, setActiveIndex] = useState(0);
    const [friendList, setFriendList] = useState([]);

    const{ mutateAsync: handleGetAvatarFriendList } = useMutation(getAvatarFriendList,{
        onSuccess: ({response, success, error }) => {
            if(success){
                console.log('아바타 친구 목록');
                console.log(response); 
                if(activeIndex === 0){
                    setFriendList(response.filter(r => r.status === "APPROVED"));
                }
                else{
                    setFriendList(response.filter(r=> r.status === "REQUESTED"));
                }  
                
            }else{
                console.log('login failed: ', error);
            }
        }
        });

    const tabClickHandler=(index)=>{
        setActiveIndex(index);
    }

    useEffect(() =>{
        handleGetAvatarFriendList();
    },[activeIndex]) 
        

    function onClickClose(){
        navigate('/connectMetaverse');
    }


    return(
        <FriendListFrame>
            <FrameHeader frameTitle='친구 목록' icon={"highlight_off"} onClickClose={onClickClose}/>
            <TabFrame>
                {
                    tabContArr.map(
                        (cont)=>{
                            return <Tab1
                            key={cont.index} onClick={()=>{tabClickHandler(cont.index)}}
                            >{cont.tabTitle}</Tab1>
                        }
                    )
                }
            </TabFrame>
            <AllListFrame>
            {
                friendList.map((friend, idx)=>{
                    return <FriendFrame  key={idx} friend={friend}></FriendFrame>
                })
            } 
            </AllListFrame>
        </FriendListFrame>
    );
}

const FriendListFrame = styled.div`
    width:100%;
    height:100%; 
`

const A = styled.div`
    //padding : 20px 30px 20px 30px;
    border: 1px solid #A4A4A4 ;
    height:90%;
    width:490px;
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
// const Tab2 = styled.span`
//     padding: 4px 10px 4px 10px;
//     font-size:12px;
//     color: #A4A4A4;
//     border-bottom:1px solid white;
//     &:hover{
//         color: black;
//         border-bottom:1px solid;
//     }
// `


const AllListFrame =styled.div`
    display:flex;
    flex-direction: column; 
    align-items:center;
    padding: 20px 30px 20px 30px;
    border-top : 1px solid;
    height: 77%;
    overflow-y: scroll;
    

    &::-webkit-scrollbar {
        
        width: 6px;
        
        
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
