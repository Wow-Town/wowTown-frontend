
import InputInfo from '../components/InputInfo';
import Button from '../components/Button';
import Header from '../components/Header';
import {Link} from 'react-router-dom';

import './Login.css';
function Login(){
    return(
        <div className="contentsFrame">
            <Header text="와우타운 계정에 로그인합니다."/>
            <form className="loginForm">
                <InputInfo label="이메일 주소"inputType="text"/>
                <InputInfo label="비밀번호" inputType="text"/>
                <div className="noAccount">
                    <div className="questionNoAccount"> 아직 계정이 없으신가요?</div>
                    <Link to='/users/signup'>
                        <a>회원가입</a>
                    </Link>    
                </div>
                <div className="buttonLogin">
                <Button  buttonText="로그인"/>
                </div>
            </form>
    </div>);
}

export default Login;