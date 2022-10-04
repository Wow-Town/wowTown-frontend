/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from 'styled-components';
import Navbar from '../components/templates/Navbar';
import { Routes,Route } from 'react-router-dom';

export default function StudyRoom(){

    return(
        
        <Div>
            <Navbar/>
            <StudyRoomFrame>
                <StudyRoomWrapper>
                    <VideoForStudyRoom>
                        영상 나옴
                    </VideoForStudyRoom>
                    <SettingsForStudyRoom>
                        세팅 나옴
                    </SettingsForStudyRoom>
                </StudyRoomWrapper>
                <GroupChat>
                    채팅 나옴
                </GroupChat>
            </StudyRoomFrame>
           
        </Div>
    );
}
const Div = styled.div`
    padding: 0px 0px 0px 0px;
    display:block;
    flex-direction: column;
    width:100%;
    height:100%;
`
const StudyRoomFrame = styled.div`
    border: 1px solid #A4A4A4;
    width:1500px;
    display:flex;
    flex-direction: row;
    margin:auto;
    
`
const StudyRoomWrapper= styled.div`
    border: 1px solid #A4A4A4;
    display:flex;
    flex-direction:column;
    width:50%;
    height:100%;


`
const VideoForStudyRoom =styled.div`
    border: 1px solid #A4A4A4;
    width:100%;
    height:60%;
    min-width:720px;
    height:662px;
`
const SettingsForStudyRoom = styled.div`
border: 1px solid #A4A4A4;
width:100%;
    height:60%;
    min-width:720px;
`
const GroupChat=styled.div`
width: 30%;
    padding: 20px 30px 20px 30px;
    margin: 30px 40px 30px 30px;
    border: 1px solid #A4A4A4;
    width: 30%;
    height: 700px;
`


