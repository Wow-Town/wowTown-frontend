/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import InputInfo from '../atoms/InputInfo';
import Button from '../atoms/Button';
import InterestList from './InterestList';
import { useState , useEffect} from 'react';
import {useMutation} from 'react-query';
import { getAvatar, updateAvatar } from '../../apis/avatar.api';
import styled from 'styled-components';
import AvatarCostumeModal from './AvatarCostumeModal';

export default function AvatarUpdateModal({closeModal, avatar, setIsAvatarUpdate}) {
    const [nickname,setNickname]=useState(avatar.nickName);
    const [introduction,setIntroduction]=useState(avatar.description);
    const [costumeIdx, setCostumeIdx]=useState(avatar.costumeIdx);
    const [nicknameError,setNicknameError]=useState(false);
    const [introductionError,setIntroductionError]=useState(false);
    const [interestList,setInterestList]=useState([]);
    const [openCostumeModal,setOpenCostumeModal] =  useState(false);

    const handleClose = () => {
      closeModal(false);
    }

    const onClickCostumeChange = () => {
        setOpenCostumeModal(true);
    }

    const{ mutateAsync: handleUpdateAvatar } = useMutation(updateAvatar,{
        onSuccess: ({success, error }) => {
            if(success){
                setIsAvatarUpdate(true); 
                handleClose();       
            }else{
                console.log(error);
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

    function onSubmit(e){
        console.log(1);
        e.preventDefault(); 
        handleUpdateAvatar({
            "nickName" : nickname,
            "description" : introduction,
            "interestList" : interestList,
            "costumeIdx" : costumeIdx 
        });       
    }

    return (
        <>
        {openCostumeModal && <AvatarCostumeModal closeModal={setOpenCostumeModal} costumeIdx={avatar.costumeIdx} setCostumeIdx={setCostumeIdx}/>}
        <ModalBackgroud>
            <ModalContainer>
                <AvaterForm>
                    <InputInfo label="닉네임"
                    inputType="text" 
                    placeholder="10자 이내"
                    onChange={onNicknameHandler} 
                    maxLength='10' 
                    width={'100%'}
                    value={avatar.nickName}
                    />
                    {
                    nicknameError && nickname.length ===0 ? <ErrorMessage>닉네임을 입력해주세요.</ErrorMessage> : <ErrorMessage/>    
                    }
                    <IntroductionFrame>
                        <Label>소개</Label>
                        <Textarea onChange={onIntroductionHandler} defaultValue={avatar.description}></Textarea>
                    </IntroductionFrame>
                    {
                    introductionError && introduction.length ===0 ? <ErrorMessage>소개를 입력해주세요.</ErrorMessage> : <ErrorMessage/>    
                    }   
                    <AllAreaFrame>
                        <Label>관심사(3개)</Label>
                        <InterestList setInterestList={setInterestList}/>
                    </AllAreaFrame>
                    {
                    interestList.length !==3 && interestList.length >= 0 ? <ErrorMessage>관심사 3개를 선택해주세요.</ErrorMessage> : <ErrorMessage/>    
                    }
                    <ButtonLogin>
                        <Button  onClick={onClickCostumeChange} marginRight={"10px"} buttonText="의상 변경"/>
                        <Button  onClick={onSubmit} marginRight={"10px"} buttonText="적용"/>
                        <Button  onClick={handleClose} buttonText="닫기"/>
                    </ButtonLogin>
                </AvaterForm>
            </ModalContainer>
      </ModalBackgroud>
      </>
    );
}

const ModalBackgroud =styled.div`
  // width: 30vw;
  height: auto;
  // background-color: rgba(200, 200, 200);
  position: fixed;
  top: 400px;
  left: 50%;
  transform: translate(-50%, -50%);
//   margin-top : 200px;
//   padding-left: 89px;
//    display: flex;
//   //justify-content: center;
//   align-items: center;
`
const ModalContainer =styled.div`
  width: 440px;
  height: 500px;
  border-radius: 12px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  flex-direction: column;
  padding: 25px;
`

const AvaterForm=styled.div`
    display:flex;
    width:100%;
    height: 100%;
    flex-direction: column; 
    justify-content: center;
    position: relative;
`

const ErrorMessage =styled.div`
    
    height: 35px;
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
    justify-content: center;
`