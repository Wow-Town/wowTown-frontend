/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import FrameHeader from '../templates/FrameHeader';
import { useState, useEffect  } from "react";
import { useMutation } from 'react-query';
import { getChatRoomAvatar } from "../../apis/chatRoom.api";
import AvatarFrame from "../atoms/AvatarFrame";

export default function ChatRoomAvatarList({chatRoomId, clickDehaze, setClickDehaze}){
    const tabContArr=[
        {   
            index:0,
            tabTitle:"온라인 아바타"
        },
        {
            index:1,
            tabTitle:"오프라인 아바타"
        }
    ];
    const [activeIndex, setActiveIndex] = useState(0);
    const [avatarList, setAvatarList] = useState([]);
    const [filterAvatarList, setFilterAvatarList] = useState(<></>);


        const{ mutateAsync: handleGetChatRoomAvatar } = useMutation(getChatRoomAvatar,{
            onSuccess: ({response, success, error }) => {
                if(success){
                    console.log('채팅방 아바타');
                    setAvatarList(response);
                }else{
                    console.log('login failed: ', error);
                }
            }
            });

    const tabClickHandler=(index)=>{
        setActiveIndex(index);
    }

    function onClickClose(){
        setClickDehaze(false);
    }

    useEffect(() =>{
        if(clickDehaze == true){
            handleGetChatRoomAvatar(chatRoomId);
        }
    },[clickDehaze]) 

    useEffect(() =>{
        if(activeIndex === 0){
            setFilterAvatarList(
                avatarList.filter(avatar => avatar.connectState === true).map((avatar, idx)=>{
                    return <AvatarFrame  key={idx} avatar={avatar}></AvatarFrame>
                })
            )
        }
        if(activeIndex === 1){
            setFilterAvatarList(
                avatarList.filter(avatar => avatar.connectState === false).map((avatar, idx)=>{
                    return <AvatarFrame  key={idx} avatar={avatar}></AvatarFrame>
                })
            )
        }
    },[activeIndex, avatarList]) 
        
    return(
        <ChatRoomAvatarListFrame clickDehaze={clickDehaze}>
            <ContentBlock>
                <Content>
                    <FrameHeader frameTitle='아바타 목록' icon={"west"}  onClickClose={onClickClose}/>
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
                    <AvatarListFrame>
                    {
                        filterAvatarList
                    } 
                    </AvatarListFrame>
                </Content>
            </ContentBlock>
        </ChatRoomAvatarListFrame>
    );
}

const ChatRoomAvatarListFrame = styled.div`
width:100%;
height:100%;
position absolute;
z-index: ${(props)=>props.clickDehaze?'1':'0'};
`

const ContentBlock = styled.div`
background-color: #ffffff;
width:70%;
height:100%;
position relative;
`

const Content = styled.div`
background-color: #ffffff;
width:auto;
height:auto;
padding:10px;
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

const AvatarListFrame = styled.div`
    height:100%;
    width:100%;
    `
