/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from 'styled-components';
import React, {useState} from 'react';

export default function Area({area, onClick, selectedInterests, setSelectedInterests}){
    const[isSelected,setIsSelected]=useState(false);
    

    function onAreaHandler(){
        if( isSelected ===false && selectedInterests.length <3){
            setIsSelected(true);
            setSelectedInterests([...selectedInterests,area]);
            console.log(area, isSelected, "선택됨");       
        }else if(isSelected ===true ){
            setIsSelected(false);
            setSelectedInterests(selectedInterests.filter(selectedInterests => selectedInterests !== area));
            console.log(area, isSelected, "취소함");
        }        
    }


    return(
        <>
        {
            isSelected ? 
            <ClickedArea key={area} onClick={onAreaHandler}>
                <Span>{area}</Span>
            </ClickedArea> 
            : 
            <DefaultArea key={area} onClick={onAreaHandler}>
                <Span>{area}</Span>
            </DefaultArea>
        }
        </>
                
    );
}

const DefaultArea = styled.li`
display: inline-block;
/* list-style-type : none; */
justify-content: center;
align-items: center;
padding: 0px 16px;
margin-right: 4px;
margin-bottom: 12px;
gap: 10px;
border: 1px solid #A4A4A4;
border-radius: 30px;
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 19px;
cursor: pointer;
`

const ClickedArea = styled.li`
display: inline-block;
/* list-style-type : none; */
justify-content: center;
align-items: center;
padding: 0px 16px;
margin-right: 12px;
margin-bottom: 12px;
gap: 10px;
border: 1px solid #A4A4A4;
background-color: #EEEEEE;
border-radius: 30px;
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 19px;
cursor: pointer;
`
const Span = styled.span`
line-height: 40px;
`