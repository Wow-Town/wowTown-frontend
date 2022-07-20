import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';

export default function Navbar(){
    const navigate=useNavigate();

    function onClick(){
        navigate("/channels");
    }
    return(
            <NavContainer>
                <NavUl>
                    <LogoHeader>WowTown</LogoHeader>
                    <Nav onClick={()=> onClick}><A>내 프로필</A></Nav>
                    <Nav><A>공고(임시 버튼)</A></Nav>
                    <Nav><A>채널 나가기</A></Nav>
                </NavUl>
            </NavContainer>
    );
}
const LogoHeader = styled.h1`
    padding-right:10px;
    margin-top: 11px;
    color:#F98B00;
`;

const NavContainer =styled.nav`
    position: fixed;
    top:0;
    right:0;
    left:0;
    height:60px;
    background-color: #ffc947;
    display:flex;
    flex-direction:row;
`;

const NavUl = styled.ul`
    display:flex;
    flex-direction:row;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content:space-evenly;
    margin: 0px;
    
`;
const Nav =styled.li` 
    font-weight: 600;
    font-size: 25px; 
    color: #000000;
    list-style:none;
    padding: 8px 7px 10px ;
    cursor:pointer;
    border-radius: 15px;
    line-height: 25px;
    text-align: center;
    margin-left : 5px;
    margin-right : 5px;
    height:50%;

    &:hover{
        background-color: #FFBC45;
    }

`;

const A =styled.a`
    text-decoration: none;
    font-weight: 00;
    font-size: 16px;
    color: #FFFFFF;
    text-align:center;
   
`;