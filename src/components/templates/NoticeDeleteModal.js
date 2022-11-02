/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Button from '../atoms/Button';
import { useState } from 'react';
import styled from 'styled-components';

export default function NoticeDeleteModal({closeModal, setVerifyDelete}) {
    const [verify,setVerify]=useState("");    
    const [verifyError,setVerifyError]=useState(false);

    const handleClose = () => {
        closeModal(false);
      }

    function onVerifyHandler(e){
        if(!e.target.value){setVerifyError(true);}
        else{ setVerifyError(false); }
        setVerify(e.target.value);
    }

    function onSubmit(e){
        console.log(1);
        e.preventDefault(); 

        if(verify === "확인"){
            setVerifyDelete(true);
            closeModal(false);
        }    
    }

    return (
        <ModalBackgroud>
            <ModalContainer>
                <DeleteForm>
                    <div>
                        <p>공고를 삭제하려면 <Span>{'"확인"'}</Span>을 입력하세요.<br/> (해당 공고가 생성한 <Span>채팅방 및 스터디룸 또한 삭제되며, 참여 중인 아바타의 채팅 목록과 스터디룸에서도 삭제됩니다.</Span>)</p>
                    </div>
                    <Input onChange={onVerifyHandler} placeholder="확인"></Input>
                    {
                    <ErrorMessage/>    
                    }
                    <ButtonLogin>
                        <Button  onClick={onSubmit} marginRight={"10px"} buttonText="삭제"/>
                        <Button  onClick={handleClose} marginRight={"10px"} buttonText="취소"/>
                    </ButtonLogin>
                </DeleteForm>
            </ModalContainer>
        </ModalBackgroud>
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
  height: 200px;
  border-radius: 12px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  flex-direction: column;
  padding: 25px;
`

const DeleteForm=styled.div`
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

const Input =styled.input`
    max-height: 250px;
    height: 50px;
    background: #FFFFFF;
    border: 1px solid #A4A4A4;
    box-sizing: border-box;
    border-radius: 10px;
    padding: 10px 15px 10px 15px;
`

const Span =styled.span`
font-weight: bold;
`
const ButtonLogin =styled.div`
    display:flex;
    flex-direction: row; 
    justify-content: center;
`