/* eslint-disable no-unused-vars */
import './CharacterSettings.css';
import InputInfo from '../components/InputInfo';
import Button from '../components/Button';
import Header from '../components/Header';
import Area from '../components/Area';
import Modal from '../components/Modal';
import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';
export default function CharacterSettings(){
    const areas=[
        "Backend", "Frontend",
        "React","Spring",
        "Algorithm",
        "Java", "Python", "CPP"
    ]
    const[nickname,setNickname]=useState("");
    const[introduction,setIntroduction]=useState("");
    const[nicknameError,setNicknameError]=useState(false);
    const[introductionError,setIntroductionError]=useState(false);
    const[interestList,setInterestList]=useState([]);
    const[openModal,setOpenModal] =  useState(false);
    const navigate=useNavigate();
    let {channelId} = useParams();
    
    const[modalMessage, setModalMessage]=useState({
        titleText: "",
        contentsText : "",
        callback: function(){
        }
    })
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
    function handleInterestList(areaIndex){
        if(interestList.length <3){
            if(!interestList.includes(areas[areaIndex])){
            setInterestList([...interestList,areas[areaIndex]]);
            console.log(interestList);
            }
        }
    }

    function setData(areaName){
        handleInterestList(areaName);
    }
    
    function setDataRemove(areaIndex){
        if(interestList.includes(areas[areaIndex])){
            setInterestList(interestList.filter( (item)=>{
                return item !==areas[areaIndex];
            }))
            console.log(interestList);
        }
    }
    
    function checkJoinFormValidation(){
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
            console.log("제출조건 맞음");
            axios.post('http://13.209.5.41:81/avatars',{
                
                    "nickName" : nickname,
                    "description" : introduction,
                    "interestList" : interestList,
                  
            })
            .then( (response) => {
                
                console.log(response);

            }).catch(function(error){
                console.log(channelId);
                console.log(error);
                setOpenModal(true);
                setModalMessage({
                    "titleText": "다시 시도해주세요",
                    "contentsText" : "",
                })
            });
        }else{
            setOpenModal(true);
            setModalMessage({
                "titleText": "조건에 맞게 입력해주세요",
                "contentsText" : " "
            });
        }
       
        
    }

    
    return (
        <div className="contentsFrame">
             {openModal && <Modal closeModal={setOpenModal} modalMessage={modalMessage}/>}
         
            <Header text="캐릭터 설정"/>
            <form onSubmit={onSubmit} >
                <InputInfo label="닉네임"
                inputType="text" 
                placeholder="10자 이내"
                onChange={onNicknameHandler} 
                maxLength='10' />
                {
                nicknameError && nickname.length ===0 ? <div className="errorMessage">닉네임을 입력해주세요.</div> : <div className="errorMessage"/>    
            }
                <div className="introductionFrame">
                    <label >소개</label>
                    <textarea
                     id="inputAboutIntroduction"
                     onChange={onIntroductionHandler} 
                     />
                </div>
                {
                introductionError && introduction.length ===0 ? <div className="errorMessage">소개를 입력해주세요.</div> : <div className="errorMessage"/>    
            }
                <div className="allAreaFrame">
                    <label>관심사(3개)</label>
                
                <ul className="areasFrame">
                    {areas.map((area,index) =>{
                        return <Area 
                        key={index} 
                        index={index} 
                        setData={setData} 
                        setDataRemove= {setDataRemove} 
                        area={area}
                        interestList = {interestList}
                        />;
                    })}
                </ul>
                </div>
                {
                interestList.length !==3 && interestList.length >0 ? <div className="errorMessage">관심사 3개를 선택해주세요.</div> : <div className="errorMessage"/>    
                }
                <div className="buttonLogin">
                <Button  buttonText="설정"/>
                
                </div>
            </form>
    </div>
    )
}