/* eslint-disable react/prop-types */
import Logo from '../atoms/Logo';
import styled from 'styled-components';

export default function Header({text}){
    return(
        <ContentsHeader>
            <Logo/>
            <ContenetsHeaderTitle>{text}</ContenetsHeaderTitle>
        </ContentsHeader>

    );
}

const  ContentsHeader= styled.div`
    padding-top: 10%;
    display:flex;
    flex-direction: column;
    justify-content: flex-start;   

`

const ContenetsHeaderTitle = styled.h2`
    font-style:normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 20px;
    width:670px;
    text-align: left;
    padding-left: 83px;
    padding-bottom: 64px;
`

