import './CharacterSettings.css';
import InputInfo from '../components/InputInfo';
import Button from '../components/Button';
import Header from '../components/Header';
import Area from '../components/Area';
import React, {useState} from 'react';

export default function CharacterSettings(){
    const areas=[
         "React","TypeScript", "JavaScript", "Vue",
        "Spring", "Node.js", "Django", "Express",
        "Swift", "ReactNative",
        "UnrealEngine", "Unity", "Kubernetes", "Docker"
    ]
    const[nickname,setNickname]=useState("");
    const[introduction,setIntroduction]=useState("");
    const[nicknameError,setNicknameError]=useState(false);
    const[introductionError,setIntroductionError]=useState(false);
    const[interestAreas,setInterestAreas]=useState();
    function onNicknameHandler(e){
        if(!e.target.value){setNicknameError(true);}
        else{ setNicknameError(false); }
        setNickname(e.target.value);
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
                onChange={onNicknameHandler}  />
                {
                nicknameError && nickname.length ===0 ? <div className="errorMessage">닉네임을 입력해주세요.</div> : <div className="errorMessage"/>    
            }
                <div className="introductionFrame">
                    <label >소개</label>
                    <textarea
                     id="inputAboutIntroduction"
                     />
                </div>
                <div className="errorMessage"/> 
                
                <div className="allAreaFrame">
                    <label>관심사(3개)</label>
                
                <ul className="areasFrame">
                    {areas.map(area =>{
                        return <Area key={area} area={area}/>;
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