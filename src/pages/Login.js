/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from 'styled-components';
import InputInfo from '../components/atoms/InputInfo';
import Button from '../components/atoms/Button';
import Header from '../components/templates/Header';
import Modal from '../components/templates/Modal';
import { useRecoilState } from 'recoil';
import { LoginState } from '../utils/LoginState';
import {useNavigate, Link} from 'react-router-dom';
import React, {useState} from 'react';
import {useMutation} from 'react-query';
import { login } from '../apis/user.api';
import instance from '../apis/axios';

export default function Login(){
    const[email,setEmail] =useState();
    const[password,setPassword]= useState();
    const[emailError,setEmailError]=useState(false);
    const[passwordError,setPasswordError]=useState(false);
    const[openModal,setOpenModal] =  useState(false);
    const navigate=useNavigate();
    const[ ,setIsLoggedIn] = useRecoilState(LoginState);
    
    const[modalMessage, setModalMessage]=useState({
        titleText: "",
        contentsText : "",
        callback: function(){
        }
    })

    const{ mutateAsync: handleLogin } = useMutation(login,{
        onSuccess: ({response, success, error }) => {
            if(success){
                const { accessToken } = response;
                instance.defaults.headers.common['Authorization'] = ` ${accessToken}`;
                if (accessToken) localStorage.setItem('accessToken',  accessToken );
                if (localStorage.getItem('accessToken')) setIsLoggedIn(true); 
                navigate("/channels");             
            }else{
                console.log('login failed: ', error);
                setOpenModal(true);
                setModalMessage({
                    "titleText": "해당 이메일,비밀번호가 존재하지 않습니다",
                    "contentsText" : "다시 시도해주세요",
                })
            }
        }
        });

    function onEmailHandler(e){
        if( e.target.value.length ===0 ){ setEmailError(true);
        }else{ setEmailError(false); }
        setEmail(e.target.value); 
    }

    function onPasswordHandler(e){
        
        if(8 > e.target.value.length ){
            setPasswordError(true);
        }else{
            setPasswordError(false);
        }
        setPassword(e.target.value);
    }

    function checkLoginFormValidation(){
        //error false이고 agreeing 은 true면 true 리턴 
        if(!emailError && !passwordError && email && password){
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
            handleLogin({
                "email" : email,
                "password" : password,
            })
            setEmail("");
            setPassword("");  
        }else{
            setOpenModal(true);
            setModalMessage({
                "titleText": "조건에 맞게 입력해주세요",
                "contentsText" : "",
                
            });
        }

    }
    return(
        <ContentsFrame>
             {openModal && <Modal closeModal={setOpenModal} modalMessage={modalMessage}/>}
         
            <Header text="와우타운 계정에 로그인합니다."/>
            <LoginForm rect onSubmit={onSubmit} >
                <InputInfo label="이메일 주소"inputType="email" onChange={onEmailHandler} />
                {
                emailError && email.length===0? <ErrorMessage>이메일을 입력해주세요.</ErrorMessage> : <ErrorMessage/>    
                }
                <InputInfo label="비밀번호" inputType="password" onChange={onPasswordHandler}/>
                {
               passwordError && password.length===0
               ? <ErrorMessage>비밀번호를 입력하세요.</ErrorMessage>
               :  ( passwordError && password.length<8
                ?<ErrorMessage>비밀번호를 8~15자로 입력해주세요.</ErrorMessage>
                :<ErrorMessage/>
               )  
               }
                <NoAccount>
                    <QuestionNoAccount> 아직 계정이 없으신가요?</QuestionNoAccount>
                    <Link to='/join'>
                        <H3 className="a">회원가입</H3>
                    </Link>    
                </NoAccount>
                <ButtonLogin>
                    <Button  buttonText="로그인"/>
                </ButtonLogin>
            </LoginForm>
        </ContentsFrame>
    );
}

const ContentsFrame=styled.div`
display:flex;
flex-direction: column;
height:100vh;
width:670px;

`

const LoginForm=styled.form`
display:flex;
flex-direction: column; 
justify-content: center; 
padding-left:83px;
`
const ErrorMessage =styled.div`
//padding-left: 83px;
height: 42px;
font-size: 16px;
font-weight: 700;
width: 500px;
line-height:20px; 
color: red;
`

const NoAccount =styled.div`
display:flex;
flex-direction: row;  
text-align: left;
//padding-left: 83px;
`

const QuestionNoAccount =styled.div`
font-size: 16px;
font-weight: 600;
line-height: 18.75px;
width:180px;
padding-right: 13px;
`

const H3 = styled.h3`
font-size: 16px;
font-weight: 600;
line-height: 18.75px;
width:70px;
color:#F98B00;
text-decoration: none;
margin: 0px 0px 0px 0px;
`

const ButtonLogin =styled.div`
display:flex;
flex-direction: row; 
justify-content: flex-end;
padding-right: 83px;
padding-top: 30px;
`

