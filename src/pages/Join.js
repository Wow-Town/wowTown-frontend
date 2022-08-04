/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from 'styled-components';
import Header from '../components/templates/Header';
import InputInfo from '../components/atoms/InputInfo';
import Button from '../components/atoms/Button';
import Modal from '../components/templates/Modal';
import React, {useState} from 'react';
import {useMutation} from 'react-query';
import {useNavigate, Link} from 'react-router-dom';
import { signUp } from '../apis/user.api';

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
    const[openModal,setOpenModal] =  useState(false);
    const navigate=useNavigate();
    const[modalMessage, setModalMessage]=useState({
        titleText: "",
        contentsText : "",
        callback: function(){
        }
    })

    const{ mutateAsync: handleSignUp } = useMutation(signUp,{
        onSuccess: ({success, error }) => {
            if(success){
                setOpenModal(true);
               
                setModalMessage({
                    "titleText": "회원가입 성공",
                    "contentsText" : "로그인창으로 이동합니다",
                    callback: function(){
                        navigate("/login");
                    }});            
            }else{
                console.log('login failed: ', error);
                setOpenModal(true);
                setModalMessage({
                    "titleText": "오류 발생",
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

    function onNameHandler(e){
        
        if(!e.target.value){setNameError(true);}
        else{ setNameError(false); }
        setName(e.target.value);
    }

    function onPasswordHandler(e){
        
        if(8 > e.target.value.length || e.target.value.length > 15){
            setPasswordError(true);
        }else{
            setPasswordError(false);
        }
        setPassword(e.target.value);
    }

    function onCheckPasswordHandler(e){
        
        if(password.length !==0 && e.target.value !== password ){ setCheckPasswordError(true); }
        else{ setCheckPasswordError(false);}
        setCheckPassword(e.target.value);
    }

    function onAgreeingHandler(e){
        setAgreeing(e.target.checked); 
    }

    function checkJoinFormValidation(){
        //error false이고 agreeing 은 true면 true 리턴 
        if(!emailError && !nameError && !passwordError && !checkPasswordError && agreeing
            && email.length !==0 && name.length !==0 && passwordError.length !==0 && checkPasswordError.length !==0){
            
            return true;
        }else{
            return false;
        }
    }



    function onSubmit(e){
        e.preventDefault(); 
        if(checkJoinFormValidation()){
        // vali 조건에 맞으면 
        // 이메일 조건에 맞으면 
        // 유저정보 저장
            console.log("제출조건 맞음")
            handleSignUp({
                "email": email,
                "userName": name,
                "password": password,
            })
        }else{
            setOpenModal(true);
            setModalMessage({
                "titleText": "조건에 맞게 입력해주세요",
                "contentsText" : " "
            })
           
        }        
    }
    

    return(
        <ContentsFrame>
            {openModal && <Modal closeModal={setOpenModal} modalMessage={modalMessage}/>}
            <Header text="와우타운에 회원가입합니다."/>
            <LoginForm onSubmit={onSubmit}>
                <InputInfo label="이메일 주소" inputType="email" value={email} onChange={onEmailHandler}/>
                {
                    emailError && email.length===0? <ErrorMessage>이메일을 입력해주세요.</ErrorMessage> : <ErrorMessage/>    
                }
                <InputInfo label="이름" inputType="text" value={name} onChange={onNameHandler} maxLength='10' />
                {
                    nameError &&name.length ===0 ? <ErrorMessage>이름을 입력해주세요.</ErrorMessage> : <ErrorMessage/>    
                }
                
                <InputInfo label="비밀번호(8~15자)" inputType="password" value={password} onChange={onPasswordHandler} maxLength='15' />
                {
                passwordError && password.length===0
                ? <ErrorMessage>비밀번호를 입력하세요.</ErrorMessage>
                : ( passwordError && password.length<8
                    ?<ErrorMessage>비밀번호를 8~15자로 입력해주세요.</ErrorMessage>
                    :<ErrorMessage/>
                )   
                }
                <InputInfo label="비밀번호 확인" inputType="password" value={checkpassword} onChange={onCheckPasswordHandler} maxLength='15'/>
                {
                    checkPasswordError && checkpassword ==="" && password !==""? <ErrorMessage>비밀번호 확인을 입력해주세요.</ErrorMessage> 
                    : ( password !== checkpassword && checkpassword !==""
                        ?<ErrorMessage>비밀번호와 비밀번호 확인이 일치하지 않습니다.</ErrorMessage>
                        :<ErrorMessage/>
                        )    
                }
                <AgreeCheckBox>
                <Input onChange={onAgreeingHandler} value={agreeing} />[필수] 개인정보 수집 및 이용동의
                </AgreeCheckBox>
                <NoAccount>
                    <QuestionNoAccount> 이미 계정이 있으신가요?</QuestionNoAccount>
                    <Link to='/login'>
                    <H3 className="a">로그인</H3>
                    </Link>
                </NoAccount>
                <ButtonLogin>
                    <Button  buttonText="계정 생성"/>
                </ButtonLogin>
            </LoginForm>
        </ContentsFrame> 
    );
}

const ContentsFrame=styled.div`
    display:flex;
    flex-direction: column;
    height:90%;
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
height: 32px;
font-size: 16px;
font-weight: 700;
width: 500px;
line-height:20px; 
color: red;
`

const AgreeCheckBox=styled.div`
font-size: 16px;
font-weight: 600;
line-height: 18.75px;
width:400px;
//padding-left: 83px;
padding-bottom:50px;
accent-color: black;
`

const Input =styled.input.attrs(props=>({type: "checkbox"}))`
-webkit-transform: scale(2); /* Safari and Chrome */
padding: 10px;
margin-right: 10px;
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
width:200px;
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