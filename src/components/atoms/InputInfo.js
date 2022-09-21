/* eslint-disable react/prop-types */
import styled from 'styled-components';


export default function InputInfo({maxLength, label, inputType,value,onChange,width}){
   //label="이메일 주소"inputType="email" value onChange
    return(
        <InputInfoDiv width={width}>
            <InputLabel>{label}</InputLabel>
            <InputFrame
            type={inputType} 
            defaultValue={value} 
            onChange={onChange} 
            maxLength={maxLength}
            autoComplete="on"
            width={width}
            ></InputFrame>
        </InputInfoDiv>
    );
}

const InputInfoDiv = styled.div`
    display:contents;
    flex-direction: column;
    padding:0px 0px 5px 0px;
    width: ${(props) =>props.width ||'502px'};
    position: absolute;
    top: 30px;

`

const InputLabel = styled.label`
    font-style:normal;
    font-size: 16px;
    font-weight: 700;
    width: 135px;
    line-height:20px; 
    padding: 0px 0px 10px 0px;
    
`

const InputFrame = styled.input`
    width: ${(props) =>props.width ||'502px'};
    height:50px; 
    background: #FFFFFF;
    border: 2px solid #A4A4A4;
    box-sizing: border-box;
    border-radius: 10px;
    padding: 1px 15px 1px 15px;

`



