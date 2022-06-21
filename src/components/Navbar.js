import styled from 'styled-components';

export default function Navbar(){

    return(
            <NavContainer>
                <NavUl>
                    <LogoHeader>WowTown</LogoHeader>
                    <Nav><A>내 프로필</A></Nav>
                    <Nav><A>유저 검색</A></Nav>
                    <Nav><A>채팅 목록</A></Nav>
                    <Nav><A>채널 나가기</A></Nav>
                </NavUl>
            </NavContainer>
    );
}
const LogoHeader = styled.h1`
    padding-right:10px;
    margin-top: 11px;
    
`;

const NavContainer =styled.nav`
    position: fixed;
    top:0;
    right:0;
    left:0;
    height:60px;
    background-color: #A4A4A4;
    display:flex;
    flex-direction:row;
`;

const NavUl = styled.ul`
    display:flex;
    flex-direction:row;
    display: flex;
    flex-direction: row;
    // align-items: ;
    justify-content:space-evenly;
    margin: 0px;
    
`;
const Nav =styled.li` 
    font-weight: 600;
    font-size: 25px; 
    color: #000000;
    list-style:none;
    padding: 12px 7px 10px ;
    cursor:pointer;
    border-radius: 5px;
    line-height: 25px;
    text-align: center;
    margin-left : 5px;
    margin-right : 5px;
    &:hover{
        background-color: #777777;
    }
`;

const A =styled.a`
    text-decoration: none;
    font-weight: 500;
    font-size: 16px;
    color: #FFFFFF;
    text-align:center;
   
`;