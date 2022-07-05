/* eslint-disable no-unused-vars */

import './CharacterSettings.css';
import InputInfo from '../components/InputInfo';
import Button from '../components/Button';
import Header from '../components/Header';
import Area from '../components/Area';
import React, {useState} from 'react';

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
        else if(interestList.length>=3){
            console.log("3개까지만 선택 가능");
            console.log(interestList);
            

        }
        

    }

    function setData(areaName){
        console.log(areaName);
        handleInterestList(areaName);

        
    }
    function setDataRemove(areaIndex){
      
        if(interestList.includes(areas[areaIndex])){
            setInterestList(interestList.filter( (item)=>{
                return item !==areas[areaIndex];
            }))
        }
        console.log(areaIndex);


    }
    
    function checkJoinFormValidation(){
        //error false이고 agreeing 은 true면 true 리턴 
       return false;
    }

    function onSubmit(e){
        e.preventDefault(); 
        if(checkJoinFormValidation()){
        // vali 조건에 맞으면 
        // 이메일 조건에 맞으면 
        // 유저정보 저장
            console.log("제출조건 맞음")
        }else{
            alert("형식에 맞게 입력해주세요");
        }
       
        
    }

    
    return (
        <div className="contentsFrame">
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
                        return <Area key={index} index={index} setData={setData} setDataRemove= {setDataRemove} area={area}/>;
                    })}
                </ul>
                </div>
                <div className="buttonLogin">
                <Button  buttonText="설정"/>
                
                </div>
            </form>
    </div>
    )
}