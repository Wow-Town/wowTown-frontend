/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";

export default function Frame({frameTitle, onClickClose, width, position, rigth, icon}){
    return(
        
        <Header width={width} position={position} rigth={rigth}>
            <Title>{frameTitle}</Title>
            <Icon 
                className="material-icons"
                onClick={onClickClose}>
                {icon} 
            </Icon>
        </Header>
        
    );
}


const Header=styled.div`
display:flex;
flex-direction:row;
justify-content:space-between;
padding : 20px 0px 50px 0px;
width: ${(props) =>props.width ||'100%'};
position: ${(props) =>props.position || 'relative'};
right: ${(props) =>props.rigth};
`
const Title = styled.div`
font-size:20px;
`

const Icon=styled.span`
cursor: pointer;

`

