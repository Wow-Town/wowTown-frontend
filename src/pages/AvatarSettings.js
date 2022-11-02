/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from 'styled-components';
import InputInfo from '../components/atoms/InputInfo';
import Button from '../components/atoms/Button';
import Header from '../components/templates/Header';
import Modal from '../components/templates/Modal';
import InterestList from '../components/templates/InterestList';
import {useState} from 'react';
import {useMutation} from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getAvatar, createAvatar } from '../apis/avatar.api';
import { useRecoilState } from 'recoil';
import { AvatarState } from "../utils/AvatarState";
import { DoubleSubmitCheck } from '../utils/DoubleSubmmitCheck';
import AvatarCostumeModal from '../components/templates/AvatarCostumeModal';

export default function  AvatarSettings(){
    const[nickname,setNickname]=useState("");
    const[introduction,setIntroduction]=useState("");
    const[costumeIdx, setCostumeIdx]=useState(0);
    const[nicknameError,setNicknameError]=useState(false);
    const[introductionError,setIntroductionError]=useState(false);
    const[interestList,setInterestList]=useState([]);
    const[openModal,setOpenModal] =  useState(false);
    const[openCostumeModal,setOpenCostumeModal] =  useState(true);
    const[avatar, setAvatar] = useRecoilState(AvatarState);
    const navigate=useNavigate();
    const[doubleSubmitFlag, setDoubleSubmitFlag] = useState(false);
    
    const[modalMessage, setModalMessage]=useState({
        titleText: "",
        contentsText : "",
        callback: function(){
        }
    })

    const{ mutateAsync: handleCreateAvater } = useMutation(createAvatar,{
        onSuccess: ({success, error }) => {
            if(success){
                handleGetAvatar();
                setOpenModal(true);
                setModalMessage({
                    "titleText": "캐릭터 설정 성공",
                    "contentsText" : "",
                    callback: function(){
                        navigate("/connectMetaverse");
                    }
                });        
            }else{
                console.log(error);
                setOpenModal(true);
                setModalMessage({
                    "titleText": "오류 발생",
                    "contentsText" : error.response.data.error.message,
                });
                setDoubleSubmitFlag(false);
            }
        }
        });

    const{ mutateAsync: handleGetAvatar } = useMutation(getAvatar,{
        onSuccess: ({response, success, error }) => {
            if(success){
                setAvatar(response);                        
            }else{
                //error 발생한 이유는 해당 채널에 아바타가 없기 때문이다. -> 아바타 생성 페이지로 이동
                console.log('getAvatar failed: ', error);
                navigate('/avatars');   
            }
        }
        });

    function onNicknameHandler(e){
        if(!e.target.value){setNicknameError(true);}
        else{ setNicknameError(false); }
        setNickname(e.target.value);
    }
    
    function onIntroductionHandler(e){
        if(!e.target.value){setIntroductionError(true);}
        else{ setIntroductionError(false); }
        setIntroduction(e.target.value);
    }
    
    function checkJoinFormValidation(){
        console.log(interestList.length);
        //error false이고 agreeing 은 true면 true 리턴 
       if(!nicknameError && !introductionError
         && nickname.length !==0 && introduction.length !==0
         && interestList.length ===3
         ){
        return true;
       }else {
        return false;
       }
    }

    function onSubmit(e){
        e.preventDefault(); 
        if(checkJoinFormValidation()){
            console.log(costumeIdx);
            if(!DoubleSubmitCheck(doubleSubmitFlag,setDoubleSubmitFlag)){
                    handleCreateAvater({
                        "nickName" : nickname,
                        "description" : introduction,
                        "interestList" : interestList, 
                        "costumeIdx" : costumeIdx 
                });
            }
        }else{
            setOpenModal(true);
            setModalMessage({
                "titleText": "조건에 맞게 입력해주세요",
                "contentsText" : " "
            });
        }
       
        
    }

    
    return (
        <ContentsFrame>
             {openModal && <Modal closeModal={setOpenModal} modalMessage={modalMessage}/>}
             {openCostumeModal && <AvatarCostumeModal closeModal={setOpenCostumeModal} costumeIdx={costumeIdx} setCostumeIdx={setCostumeIdx}/>}
            <Header text="캐릭터 설정"/>
            <AvaterForm onSubmit={onSubmit} >
                <InputInfo label="닉네임"
                inputType="text" 
                placeholder="10자 이내"
                onChange={onNicknameHandler} 
                maxLength='10' 
                />
                {
                nicknameError && nickname.length ===0 ? <ErrorMessage>닉네임을 입력해주세요.</ErrorMessage> : <ErrorMessage/>    
                }
                <IntroductionFrame>
                    <Label>소개</Label>
                    <Textarea onChange={onIntroductionHandler}/>
                </IntroductionFrame>
                {
                introductionError && introduction.length ===0 ? <ErrorMessage>소개를 입력해주세요.</ErrorMessage> : <ErrorMessage/>    
                }   
                <AllAreaFrame>
                    <Label>관심사(3개)</Label>
                    <InterestList setInterestList={setInterestList}/>
                </AllAreaFrame>
                {
                interestList.length !==3 && interestList.length >0 ? <ErrorMessage>관심사 3개를 선택해주세요.</ErrorMessage> : <ErrorMessage/>    
                }
                <ButtonLogin>
                    <Button  buttonText="설정"/>
                </ButtonLogin>
            </AvaterForm>
    </ContentsFrame>
    )
}

const ContentsFrame=styled.div`
    display:flex;
    flex-direction: column;
    height:90%;
    width:670px;
`

const AvaterForm=styled.form`
    display:flex;
    width:520px;
    flex-direction: column; 
    justify-content: center;
    padding-left: 83px;
`

const ErrorMessage =styled.div`
    
    height: 32px;
    font-size: 16px;
    font-weight: 700;
    width: 500px;
    line-height:20px; 
    color: red;
`

const IntroductionFrame =styled.div`
    display: contents;
    position: absolute;
    top:500px;
`

const Label =styled.label`
    font-size: 16px;
    font-weight: 700;
    width: 140px;
    line-height:20px; 
    padding: 0px 0px 10px 83px;
    display:flex;
    flex-direction: column;
    padding: 0px 83px 15px 0px;
    width: 502px;
`

const Textarea =styled.textarea`
    max-width: 502px;
    min-width: 502px;
    max-height: 250px;
    height: 170px;
    background: #FFFFFF;
    border: 1px solid #A4A4A4;
    box-sizing: border-box;
    border-radius: 10px;
    padding: 10px 15px 10px 15px;
`

const AllAreaFrame =styled.div`
display: contents;
width:100%;

`


const ButtonLogin =styled.div`
    display:flex;
    flex-direction: row; 
    justify-content: flex-end;
    padding-right: 83px;
    padding-top: 30px;
`