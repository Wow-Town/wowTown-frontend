
import InputInfo from '../components/InputInfo';
import Button from '../components/Button';
import Header from '../components/Header';
import {Link} from 'react-router-dom';
import React, {useState} from 'react';
import './Login.css';
import axios from 'axios';
function Login(){
    const[email,setEmail] =useState();
    const[password,setPassword]= useState();
    const[emailError,setEmailError]=useState(false);
    const[passwordError,setPasswordError]=useState(false);
    const[popup,setPopup] =  useState({open: false, title: "", message: "", callback: false});
   
    function onEmailHandler(e){
        if( e.target.value.length ===0 ){ setEmailError(true);
        }else{ setEmailError(false); }
        setEmail(e.target.value); 
        console.log(email);
    }

    function onPasswordHandler(e){
        
        if( e.target.value.length ===0){
            setPasswordError(true);
        }else{
            setPasswordError(false);
        }
        setPassword(e.target.value);
    }

    function checkLoginFormValidation(){
        //error false이고 agreeing 은 true면 true 리턴 
        if(!emailError && !passwordError && email.length !==0 && password.length !==0 ){
            
            return true;
        }else{
            return false;
        }
    }
    function onSubmit(e){
        e.preventDefault(); 
        if(checkLoginFormValidation()){
        //해당 이메일 비번이 존재하면
        //다음 페이지로
            console.log("제출조건 맞음")
            axios.post('http://13.209.5.41:81/signUp/check',{
                "email" : email,
                "password" : password,
            })
            .then( (response) => {
                console.log(response)
                localStorage.setItem('token',response.data.jwt);
                setPopup({
                    open: true,
                    title: "로그인 완료",
                    message: "설정 창으로 이동합니다"
                });
            }

            )
        }else{
            alert("정확한 로그인 정보를 입력해주세요.");
        }

    }
    return(
        <div className="contentsFrame">
            <Header text="와우타운 계정에 로그인합니다."/>
            <form className="loginForm" onSubmit={onSubmit} >
                <InputInfo label="이메일 주소"inputType="email" onChange={onEmailHandler} />
                {
                emailError && email.length===0? <div className="errorMessage">이메일을 입력해주세요.</div> : <div className="errorMessage"/>    
                }
                <InputInfo label="비밀번호" inputType="password" onChange={onPasswordHandler}/>
                {
               passwordError && password.length===0
               ? <div className="errorMessage">비밀번호를 입력하세요.</div>
               : <div className="errorMessage"/>
                 
               }
                <div className="noAccount">
                    <div className="questionNoAccount"> 아직 계정이 없으신가요?</div>
                    <Link to='/signup'>
                        <h3 className="a">회원가입</h3>
                    </Link>    
                </div>
                <div className="buttonLogin">
                <Button  buttonText="로그인"/>
                </div>
            </form>
    </div>);
}

export default Login;