/* eslint-disable no-unused-vars */
// eslint-disable-next-line react/prop-types 
import styled from "styled-components";

export default function Button({color,height,fontSize,marginLeft,marginRight,buttonText, onClick}){
    return(
        <Wrapper>
            <StyledButton fontSize={fontSize} color={color} height={height} marginLeft={marginLeft} marginRight={marginRight} onClick={onClick} className="button">{buttonText}</StyledButton>
        </Wrapper>
    );
}

const Wrapper = styled.div`

`

const StyledButton = styled.button`
background-color: ${(props) =>props.color ||"#F98B00"};
border: #F98B00;
border-radius: 10px;
width: 95px;
height: ${(props) =>props.height ||"51px"};
align-items: center;
padding: 16px 25px;
font-style:normal;
font-weight: 600;
font-size: ${(props) =>props.fontSize ||"16px"};
line-height: 19px;
color: #FFFFFF;
padding: 0px 0px 0px 0px;
margin-left: ${(props) =>props.marginLeft ||"0px"};
margin-right: ${(props) =>props.marginRight ||"0px"};
cursor: pointer;
`