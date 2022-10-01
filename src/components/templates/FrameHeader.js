/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";

export default function Frame({frameTitle, onClickClose, fontSize, width, position, rigth, top, icon}){
    return(
        
        <Header width={width} position={position} rigth={rigth} top={top}>
            <Title fontSize={fontSize}>{frameTitle}</Title>
            <Icon 
                fontSize={fontSize}
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
top: ${(props) =>props.top};
`
const Title = styled.div`
font-size: ${(props) =>props.fontSize || '20px'};
`

const Icon=styled.span`
cursor: pointer;
font-size: ${(props) =>props.fontSize || '25px'};
`

