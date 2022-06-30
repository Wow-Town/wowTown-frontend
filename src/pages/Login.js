/* eslint-disable no-unused-vars */
import InputInfo from '../components/InputInfo';
import Button from '../components/Button';
import Header from '../components/Header';
import {useNavigate, Link} from 'react-router-dom';
import React, {useState} from 'react';
import Modal from '../components/Modal';
import './Login.css';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { LoginState } from '../utils/LoginState';

export default function Login(){
    const[email,setEmail] =useState();
    const[password,setPassword]= useState();
    const[emailError,setEmailError]=useState(false);
    const[passwordError,setPasswordError]=useState(false);
    const[openModal,setOpenModal] =  useState(false);
    const navigate=useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);
    
    const[modalMessage, setModalMessage]=useState({
        titleText: "",
        contentsText : "",
        callback: function(){
        }
    })
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
            axios.post('http://13.209.5.41:81/login',{
                "email" : email,
                "password" : password,
            })
            .then( (response) => {
                const { accessToken } = response.data;

                console.log(response);
                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                if (accessToken) localStorage.setItem('accessToken',  accessToken );
                if (localStorage.getItem('accessToken')) setIsLoggedIn(true);
                

                navigate("/channels");

            }).catch(function(error){
                console.log(error);
                setOpenModal(true);
                setModalMessage({
                    "titleText": "해당 이메일,비밀번호가 존재하지 않습니다",
                    "contentsText" : "다시 시도해주세요",
                })
            });
        }else{
            setOpenModal(true);
            setModalMessage({
                "titleText": "조건에 맞게 입력해주세요",
                "contentsText" : "",
                
            });
        }

    }
    return(
        <div className="contentsFrame">
             {openModal && <Modal closeModal={setOpenModal} modalMessage={modalMessage}/>}
         
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
               :  ( passwordError && password.length<8
                ?<div className="errorMessage">비밀번호를 8~15자로 입력해주세요.</div>
                :<div className="errorMessage"/>
               )  
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

