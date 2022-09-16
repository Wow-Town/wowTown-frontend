import styled from 'styled-components';
import Button from '../atoms/Button';
import { useRecoilState } from 'recoil';
import { LoginState } from '../../utils/LoginState';
import { Link } from 'react-router-dom';
import { LoginEmail } from '../../utils/LoginState';
export default function Navbar(){
    
    const [isloggedIn,setIsLoggedIn] = useRecoilState(LoginState);
    const[ loggedEmail,setLoggedEmail] = useRecoilState(LoginEmail);

    

    function onClickButton(){
        setIsLoggedIn(false);
        setLoggedEmail("");
        

    }
    
    return(
            <NavContainer>
                <LogoHeader>
                <LogoImg className="material-icons">school</LogoImg>
                    WowTown
                </LogoHeader>
                {isloggedIn ?
                <PersonalInformationFrame>
                    <DivShowIdImg className="material-icons">account_circle</DivShowIdImg>
                    <DivShowId> {loggedEmail} </DivShowId>
                    <Link to="/">
                        <Button height ='31px' onClick={() => {onClickButton()}}  buttonText="로그아웃"/>
                    </Link>
                </PersonalInformationFrame> :<Empty/>
                }
            </NavContainer>
    );
}


const NavContainer =styled.nav`
    // position: fixed;
    // top:0;
    // right:0;
    // left:0;
    height:60px;
    wudth:100%;
    background-color: #ffc947;
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content: space-between;
`;
const LogoHeader = styled.h1`
    padding-right:10px;
    margin-top: 15px;
    margin-left:30px;
    color:#F98B00;
    display:flex;
    align-items:center;
`;
const LogoImg = styled.span`
    font-size:40px;
    padding-right:10px;
`
const PersonalInformationFrame = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    margin-right:30px;
`
const DivShowIdImg = styled.div`
    color: #F8FB89;
    font-size:40px;
    border-radius:100px;
    margin-right:5px;
`

const DivShowId = styled.div`
    margin-right:20px;
    color:white;
`
const Empty =styled.div`
`