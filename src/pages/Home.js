/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Button from '../components/Button';
import {Link, useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../components/Logo';

export default function Home(){
    const navigate=useNavigate();
   
    function gotoJoinPage(){
        navigate("/signUp");
    }
    function gotoLoginPage(){
        navigate("/login");
    }
    return(
        <div>
        <Navbar>
            <Logo/>
        </Navbar>
        <FullFrame>
        <ContentsFrame>
            <Title>와우타운 </Title>
            <Explanation>와우타운은 홍익대 팀빌딩 메타버스 플랫폼으로
학우들에게 팀빌딩 서비스와 스터디 공간을 제공합니다. </Explanation>
            <ButtonFrame>
                <Button callback={gotoJoinPage} buttonText="계정 생성"/>   
                <Button callback={gotoLoginPage} buttonText="로그인"/>
            </ButtonFrame>
        </ContentsFrame>
        <ImagesFrame>
            
        </ImagesFrame>
        </FullFrame>
        </div>
        
    )
}
const Navbar= styled.div`
height:60px;
background-color:white;
display:flex;


`
const FullFrame = styled.div`

`
const ContentsFrame=styled.div`
    width:100%;
    height:570px;
 `
const Title=styled.h1`
    font-size:64px;
`
const Explanation = styled.h3`

`

const ButtonFrame =styled.div`
    display:flex;

`
const ImagesFrame = styled.div`

`