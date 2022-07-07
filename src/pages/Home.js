/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Button from '../components/Button';
import {Link, useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../components/Logo';
import img1 from '../img/ex1.png'; 
import img2 from '../img/ex2.png'; 
import img3 from '../img/ex3.png'; 
export default function Home(){
    const navigate=useNavigate();
   
    function gotoJoinPage(){
        navigate("/signUp");
    }
    function gotoLoginPage(){
        navigate("/login");
    }
    return(
        <Div>
        <Navbar>
            <Logo/>
        </Navbar>
        <FullFrame>
        <ContentsFrame>
            <Title>와우타운 </Title>
            <Explanation>와우타운은 홍익대 팀빌딩 메타버스 플랫폼으로<br/>
학우들에게 팀빌딩 서비스와 스터디 공간을 제공합니다. </Explanation>
            <ButtonFrame>
                <Button callback={gotoJoinPage} buttonText="계정 생성"/>   
                <Button color="#FFBC45" marginLeft= "30px" callback={gotoLoginPage} buttonText="로그인"/>
            </ButtonFrame>
        </ContentsFrame>
        <ImagesFrame>
            <Img1 src={img1}/>
            <Img2 src={img2}/>
            {/* <Img3 src={img3}/> */}
        </ImagesFrame>
        </FullFrame>
        </Div>
        
    )
}

const Div = styled.div`
    width:100%;

`
const Navbar= styled.div`
height:60px;
background-color:white;
display:flex;
flex-direction: row;
line-height:48px;


`
const FullFrame = styled.div`
    display:flex;
    height:720px;
    background-color: #EEEEEE;
    flex-direction:row;
    align-items:center;


`
const ContentsFrame=styled.div`
    width:40%;
    height:570px;
    display:flex;
    flex-direction:column;
    justify-content: center;
    margin-left:212px;

 `
const Title=styled.h1`
    font-size:48px;
    margin-bottom:15px;
 
`
const Explanation = styled.h3`
    font-size:24px;
    font-weight: 500;
    margin-bottom:34px;

`

const ButtonFrame =styled.div`
    margin-top:30px;
    display:flex;
    flex-direction: row;
    justify-content:flex-start;

`
const ImagesFrame = styled.div`

    width:60%;
    height:570px;
`
const Img1 = styled.img`
    width:400px;
    height:440px;
    padding-top:45px;
    position: relative;
    left: 63px;
    filter: drop-shadow(0px 10px 30px rgba(0, 0, 0, 0.25));
    border-radius:5px;
`
const Img2 = styled.img`
    width:400px;
    height:300px;
    margin-right:212px;
    position: absolute;
    top:400px;
    filter: drop-shadow(0px 10px 30px rgba(0, 0, 0, 0.25));
`
const Img3 = styled.img`
    width:400px;
    height:250px;
    padding-top:80px;
    position: absolute;
    left: 1013px;
    top: 101px;
    filter: drop-shadow(0px 10px 30px rgba(0, 0, 0, 0.25));
    border-radius: 5px;
`