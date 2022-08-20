/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import { AvatarState } from "../../utils/AvatarState";
import { useRecoilState } from 'recoil';
import { useState, useEffect ,useRef } from "react";
import { useCallback } from "react";

export default function Message({recv}){
    const [isSender, setIsSender] = useState(false);
    const [time, setTime] = useState();
    const [textFrameWidth, setTextFrameWidth] = useState();
    const [avatarImageWidth, setavatarImageWidth] = useState();
    const [avatar] = useRecoilState(AvatarState);

    //useCallback은 각각 textFrameWidth, avatarImageWidht를 계산하기 위한 callback 함수로 <AvatarImg ref={avatarImgRef}> 여기에 들어긴다.
    const avatarImgRef = useCallback(avatarImg =>{
        if(avatarImg !== null){
            console.log(avatarImg.getBoundingClientRect().width)
            setavatarImageWidth(avatarImg.getBoundingClientRect().width);
        }
    },[]);
    const textFrameRef = useCallback(textFrame =>{
        if(textFrame !== null){
            console.log(textFrame.getBoundingClientRect().width)
            setTextFrameWidth(textFrame.getBoundingClientRect().width);
        }
    },[]);

    useEffect(() =>{
        if(recv.sender === avatar.nickName){
            setIsSender(true);
        } 
        setTime(timeParser(recv.sendAt));
    },[recv])

    function timeParser(dateTime){
        let date = new Date(dateTime);
        let time = date.toLocaleTimeString().split(':')[0]+':'+date.toLocaleTimeString().split(':')[1];
        return time;
    }

  
    
    return(
        <MessageBlock isSender={isSender}> 
            {
                (isSender) ? 
                <>
                    <NickName align={"right"}>{recv.sender}</NickName>
                    <Content float={"right"}>
                    
                        <TimeFrame isSender={isSender} avatarImageWidth={avatarImageWidth} textFrameWidth={textFrameWidth} >
                            <Count align={"right"}>{recv.count !== 0 ? recv.count : ""}</Count>                                       
                            <Time>{time}</Time>
                        </TimeFrame>
                        <TextFrame ref={textFrameRef}>
                            <Text>{recv.message}</Text>
                        </TextFrame>
                        <AvatarImg ref={avatarImgRef}></AvatarImg>
                    </Content>
                </>
                :
                <>
                    <NickName align={"left"}>{recv.sender}</NickName>
                    <Content float={"left"}>
                        <AvatarImg ref={avatarImgRef}></AvatarImg>
                        <TextFrame ref={textFrameRef}>
                            <Text>{recv.message}</Text>
                        </TextFrame>
                        <TimeFrame isSender={isSender} avatarImageWidth={avatarImageWidth} textFrameWidth={textFrameWidth}>
                            <Count align={"left"}>{recv.count !== 0 ? recv.count : ""}</Count>                                       
                            <Time>{time}</Time>
                        </TimeFrame>
                    </Content>
                </>
            }
        </MessageBlock>
    );
}
const MessageBlock = styled.div`
margin-bottom:15px;
width:350px;
height: auto;
position: relative;
${({isSender})=>{
    return isSender? `float: right` : `float: left`;
}}
`

const NickName = styled.div`
margin-right: 50px;
margin-left: 50px;
font-size: 13px;
height: auto;
text-align: ${props =>props.align}
`
const AvatarImg = styled.div`
background-color:#C4C4C4;
width:30px;
height:30px;
line-height:60px;
border-radius:100px;
text-align: center;
vertical-align:middle;
margin: 5px 5px 5px 5px;
`

const Content = styled.div`
display:inline-flex;
align-items: center;
float: ${props => props.float};
`

const TextFrame = styled.div`
background-color:#A4A4A4;
max-width: 200px;
width: fit-content;
border-radius:40px;
padding: 3px 15px 3px 15px;
display:inline-flex;
align-items: center;
position: relative;
margin 3px;
`

const Text = styled.p`
max-width: 200px;
padding: 2px;
align-items: center;
position: relative;
margin 3px;
`
//+20을 한 이유는 AvatarImg width와 TextFrame width 길이를 계산하여 TimeFrame위치를 조정해주기 위함이다.
//위에서 구한 width는 padding을 제외한 값으로 임의로 padding 크기인 20px을 추가하였다.
const TimeFrame = styled.div`
display: inline-block;
position: absolute;
bottom: 0px;
${(props)=>{
    return props.isSender? 
    `right: ${props.avatarImageWidth + props.textFrameWidth +20}px` 
    : 
    `left: ${props.avatarImageWidth + props.textFrameWidth +20}px`
}}
`

const Count = styled.div`
display:block;
font-size: 12px;
text-align: ${props =>props.align}
`

const Time = styled.div`
height: fit-content;
text-align: center;
display: inline-block;
vertical-align:middle;
font-size: 12px;
`