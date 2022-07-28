import styled from 'styled-components';
import Button from './Button';
import { useRecoilState } from 'recoil';
import { LoginState } from '../utils/LoginState';
import {useNavigate} from 'react-router-dom';
export default function Navbar(){
    
    const [,setIsLoggedIn] = useRecoilState(LoginState);
    const navigate=useNavigate();

    function onClick(){
        setIsLoggedIn(false);
        navigate('../login');

    }
    
    return(
            <NavContainer>
                <LogoHeader>WowTown</LogoHeader>
                <DivShowIdImg></DivShowIdImg>
                <DivShowId> 유저 아이디 </DivShowId>
                <Button height ='41px' callback={() => {onClick()}}  buttonText="로그아웃"/>

            </NavContainer>
    );
}
const LogoHeader = styled.h1`
    padding-right:10px;
    margin-top: 15px;
    margin-left:30px;
    margin-right:1470px;
    color:#F98B00;
`;

const NavContainer =styled.nav`
    // position: fixed;
    // top:0;
    // right:0;
    // left:0;
    height:60px;
    background-color: #ffc947;
    display:flex;
    flex-direction:row;
    align-items:center;
`;
const DivShowIdImg = styled.div`
    background-color: #F8FB89;
    width:35px;
    height:35px;
    border-radius:100px;
    margin-right:10px;
`
const DivShowId = styled.div`
    margin-right:30px;
    color:white;
`
// const NavUl = styled.ul`
//     display:flex;
//     flex-direction:row;
//     display: flex;
//     flex-direction: row;
//     align-items: center;
//     justify-content:space-evenly;
//     margin: 0px;
    
// `;
// const Nav =styled.li` 
//     font-weight: 600;
//     font-size: 25px; 
//     color: #000000;
//     list-style:none;
//     padding: 18px 7px 10px ;
//     cursor:pointer;
//     border-radius: 15px;
//     line-height: 25px;
//     text-align: center;
//     margin-left : 5px;
//     margin-right : 5px;
//     height:50%;

//     &:hover{
//         background-color: #FFBC45;
//     }

// `;

// const A =styled.a`
//     text-decoration: none;
//     font-weight: 00;
//     font-size: 22px;
//     color: #FFFFFF;
//     text-align:center;
   
// `;