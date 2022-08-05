/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function Frame({frameTitle}){
    const navigate = useNavigate();
    function closeFrame(){
        navigate('/connectMetaverse');
    }
    return(
        
        <Header>
            <Title>{frameTitle}</Title>
            <Icon 
                className="material-icons"
                onClick={closeFrame}>
                highlight_off 
            </Icon>
        </Header>
        
    );
}


const Header=styled.div`
background-color:#FEFFFF;
//margin-bottom:50px;
display:flex;
flex-direction:row;
justify-content:space-between;
padding : 20px 30px 50px 30px;

`
const Title = styled.div`
font-size:20px;
`

const Icon=styled.span`
cursor: pointer;

`

