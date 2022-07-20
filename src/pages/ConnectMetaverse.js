import Navbar from '../components/Navbar';
import Profile from './Profile';
import styled from 'styled-components';
import { Routes, Route } from "react-router-dom";

export default function connectMetaverse(){
    return(
        <Div>
            <Navbar/>
            <ContentsFrame>
                <Routes>
                    <Route path="" element={<Empty/>} />
                    <Route path="profile" element={<Profile/>} />
                </Routes>
          
                <Metaverse>ffff</Metaverse>
            </ContentsFrame>
            
        </Div>
    )


}

const Div=styled.div`
    padding: 0px 0px 0px 0px;
    
`
const ContentsFrame = styled.div`
    height:calc( 100% - 60px );
    width:100%;
    position:fixed;
    top:60px;
    left:0;
    display:flex;
    flex-direction: row;
    background-color : #EEEEEE;
    
`
const Empty = styled.div`
    background-color:#FEFFFF;
    width:550px;
    height:100%;
    
`
const Metaverse = styled.div`
    width: 70%;
    background-color : #EEEEEE;

`