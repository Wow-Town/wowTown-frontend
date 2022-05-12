import Header from '../components/Header';
import InputInfo from '../components/InputInfo';
import Button from '../components/Button';
import './Join.css';
import React, {useState} from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import {Link} from 'react-router-dom';
export default function Join(){
    const[email,setEmail]=useState("");
    const[name,setName]=useState("");
    const[password,setPassword]=useState("");
    const[checkpassword,setCheckPassword]=useState("");
    const[agreeing,setAgreeing]=useState(false);
    const[emailError,setEmailError]=useState(false);
    const[nameError,setNameError]=useState(false);
    const[passwordError,setPasswordError]=useState(false);
    const[checkPasswordError,setCheckPasswordError]=useState(false);

    function onEmailHandler(e){
        if( !e.target.value){ setEmailError(true);
        }else{ setEmailError(true); }
        setEmail(e.target.value); 
        console.log(email);
    }

    function onNameHandler(e){
        setName(e.target.value);
        if(name ===""){setNameError(true);}
    }

    function onPasswordHandler(e){
        setPassword(e.target.value);
        if(8>password.length && password.length > 15){
            setPasswordError(true);
        }
    }

    function onCheckPasswordHandler(e){
        setCheckPassword(e.target.value);
        if(password !== checkpassword){ setCheckPasswordError(true); }
    }

    function onAgreeingHandler(e){
        setAgreeing(e.target.checked); 
    }

    function checkJoinFormValidation(){
        //error false이고 agreeing 은 true면 true 리턴 
  
    }

    function onSubmit(e){
        e.preventDefault(); 
       
        // vali 조건에 맞으면 
        // 이메일 조건에 맞으면 
        // 유저정보 저장
    }
    

    return(
        <div className="contentsFrame">
        <Header text="와우타운에 오신 것을 환영합니다."/>
        <form className="loginForm" onSubmit={onSubmit}>
            <InputInfo label="이메일 주소" inputType="email" value={email} onChange={onEmailHandler}/>
            {
                emailError && email===""? <div className="errorMessage">이메일을 입력해주세요.</div> : <div className="errorMessage"/>    
            }
            <InputInfo label="이름" inputType="text" value={name} onChange={onNameHandler} maxLength='10' />
            {
                nameError && name===""? <div className="errorMessage">이름을 입력해주세요.</div> : <div className="errorMessage"/>    
            }
            
            <InputInfo label="비밀번호(8~15자)" inputType="password" value={password} onChange={onPasswordHandler} maxLength='15' />
            {
               passwordError && password !== ""
               ? <div className="errorMessage">비밀번호를 입력하세요</div>
               : ( passwordError && password.length<8
                ?<div className="errorMessage">비밀번호를 8~15자로 입력해주세요.</div>
                :<div className="errorMessage"/>
               )   
            }
            <InputInfo label="비밀번호 확인" inputType="password" value={checkpassword} onChange={onCheckPasswordHandler} maxLength='15'/>
            {
                checkPasswordError && checkpassword =="" && password !==""? <div className="errorMessage">비밀번호 확인을 입력해주세요.</div> 
                : ( password !== checkpassword && checkpassword !==""
                    ?<div className="errorMessage">비밀번호와 비밀번호 확인이 일치하지 않습니다.</div>
                    :<div className="errorMessage"/>
                     )    
            }
            <div className='agreeCheckBox'>
            <input type='checkbox' name='agreeing' onChange={onAgreeingHandler} value={agreeing} />[필수] 개인정보 수집 및 이용동의
            </div>
            <div className="noAccount">
                <div className="questionNoAccount"> 이미 계정이 있으신가요?</div>
                <Link to='/users/login'>
                <h3 className="a">로그인</h3>
                </Link>
            </div>
            <div className="buttonLogin">
            <Button  buttonText="계정 생성"/>
            </div>
    </form>
        </div> 
    );
}

