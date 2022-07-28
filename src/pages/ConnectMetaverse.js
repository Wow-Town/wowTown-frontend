import Navbar from '../components/Navbar';
import Profile from './Profile';
import styled from 'styled-components';
import { Routes, Route } from "react-router-dom";
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import SelectNotice from './SelectNotice';
import NoticeList from './NoticeList';
import PostNotice from './PostNotice';
export default function connectMetaverse(){
    const navigate=useNavigate();
   
    function onClick(){
        navigate('/connectMetaverse/profile');
    }
    return(
        <Div>
            <Navbar/>
            <ContentsFrame>
                <Div2>
                    <Metaverse>ffff</Metaverse>
                    <Div3>
                        <DivCharacterName> 
                            <Span>닉네임</Span> 
                            <Button fontSize="13px" color="#C4C4C4" height ='27px' callback={() => {onClick()}}  buttonText="상세 보기"/>
                        </DivCharacterName>
                        <Menu>

                        </Menu>
                    </Div3>
                </Div2>
                <Routes>
                    <Route path="" element={<Empty>내용 나올 칸</Empty>} />
                    <Route path="profile" element={<Profile/>} />
                    <Route path="SelectNotice" element={<SelectNotice/>} />
                    <Route path="/studyGroups" element={<NoticeList/>} />
                    <Route path="/PostStudyGroups" element={<PostNotice/>} />
                </Routes>
          
                
            </ContentsFrame>
            
        </Div>
    )


}

const Div=styled.div`
    padding: 0px 0px 0px 0px;
    display:flex;
    flex-direction: column;
    width:100%;
    height:100%;

`
const ContentsFrame = styled.div`
    height: calc(100%-60px);
    width:1500px;
    display:flex;
    flex-direction: row;
    margin:0 auto;

    
`
const Div2 =styled.div`

`
const Metaverse = styled.div`
    position: sticky;
    top: 0;
    border: 1px solid  #bcbcbc;
    width:1067px;
    min-width:500px;
    height:662px;
`
const Div3 =styled.div`
    border: 1px solid  #bcbcbc;
    height:200px;
`

const DivCharacterName=styled.div`
    display:flex;
    flex-direction: row;
    align-items:center;
    margin:15px 20px 15px 20px;
    font-size:20px;
    font-weight: 600;
`

const Span=styled.span`
    margin-right:10px;
    margin-top:3px;

`
const Menu= styled.ul`
    margin-left:20px;
    margin-right:20px;
    padding-left:0px;

`
const Empty = styled.div`
    border: 1px solid  #bcbcbc;
    width:490px;
    height:100%;
    
`
