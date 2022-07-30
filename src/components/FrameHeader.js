/* eslint-disable react/prop-types */
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function Frame({frameTitle}){
    const navigate = useNavigate();
    function closeFrame(){
        navigate('/connectMetaverse');
    }
    return(
        <Div>
            <Header>
            <Title>{frameTitle}</Title>
            <Icon 
            className="material-icons"
            onClick={closeFrame}
            >highlight_off </Icon>
            </Header>
        </Div>
    );
}

const Div=styled.div`
    background-color:#FEFFFF;
    margin-bottom:50px;
`
const Header=styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-between;

`
const Title = styled.div`
    font-size:20px;
`

const Icon=styled.span`
    cursor: pointer;
    
`

