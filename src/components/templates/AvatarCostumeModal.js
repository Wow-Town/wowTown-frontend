/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Button from '../atoms/Button';
import FrameHeader from "./FrameHeader";
import { useState , useEffect} from 'react';
import styled from 'styled-components';
import avatarImg1 from '../../img/avatar1.png';
import avatarImg2 from '../../img/avatar2.png';
import avatarImg3 from '../../img/avatar3.png';
import avatarImg4 from '../../img/avatar4.png';

export default function AvatarCostumeModal({closeModal, costumeIdx, setCostumeIdx}) {
    const[idx, setIdx] = useState(costumeIdx);
    const[selectedElement, setSelectedElement] = useState(<></>);


    const handleClose = () => {
        setCostumeIdx(idx);
        closeModal(false);
    }

    function onClickIdx(e){
        setIdx(e.currentTarget.getAttribute("value"));
        if(selectedElement.key !== null){
            selectedElement.setAttribute("style","1px solid #A4A4A4;");
        }    
        setSelectedElement(e.currentTarget);
    }

    function onClickClose(){
        closeModal(false);
    }

    useEffect(()=>{
        if(selectedElement.key !== null){
            selectedElement.setAttribute("style","border: 6px solid;");
        }    
    },[selectedElement])

    return (
        <ModalBackgroud>
            <ModalContainer>
                <CostumeFrame>
                    <FrameHeader frameTitle={"아바타 의상 설정"} width={"100%"} position={"absolute"} top={"0px"} fontSize={"40px"} icon={"highlight_off"} onClickClose={onClickClose}></FrameHeader>
                    <CostumeContent>
                        <ContentLabel>아바타를 골라주세요.</ContentLabel>
                        <ContentBody>
                            <CostumeImgFrame value={0} onClick={onClickIdx}>
                                <Image src={avatarImg1}></Image>
                            </CostumeImgFrame>
                            <CostumeImgFrame value={1} onClick={onClickIdx}>
                                <Image src={avatarImg2}></Image>
                            </CostumeImgFrame>
                            <CostumeImgFrame value={2} onClick={onClickIdx}>
                                <Image src={avatarImg3}></Image>
                            </CostumeImgFrame>
                            <CostumeImgFrame value={3} onClick={onClickIdx}>
                                <Image src={avatarImg4}></Image>
                            </CostumeImgFrame>
                        </ContentBody>
                        <ContentButton>
                            <Button onClick={handleClose} buttonText="적용"/>
                        </ContentButton>
                    </CostumeContent>
                </CostumeFrame>
            </ModalContainer>
      </ModalBackgroud>
    );
}

const ModalBackgroud =styled.div`
z-index:1;
height: auto;
position: fixed;
top: 450px;
left: 50%;
transform: translate(-50%, -50%);
//   margin-top : 200px;
//   padding-left: 89px;
//    display: flex;
//   //justify-content: center;
//   align-items: center;
`
const ModalContainer =styled.div`
  width: 900px;
  height: 600px;
  border-radius: 12px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  flex-direction: column;
  padding: 20px 35px 20px 35px;
`

const CostumeFrame=styled.div`
    display:flex;
    width:100%;
    height: 100%;
    flex-direction: column; 
    justify-content: center;
    position: relative;
`

const CostumeContent =styled.div`
    display:block;
    width:100%;
    height: 60%;
    flex-direction: column; 
    justify-content: center;
    position: absolute;
    top:20%;
`

const ContentLabel =styled.label`
    font-size: 16px;
    font-weight: 700;
    padding:10px;
    display:flex;
`

const ContentBody =styled.div`
    width: 100%; 
    height: 95%;
    display:table;  
`

const CostumeImgFrame =styled.div`
    display:table-cell;
    background: #FFFFFF;
    border: 1px solid #A4A4A4;
    box-sizing: border-box;
    border-radius: 10px;
    padding: 10px 15px 10px 15px;
    position:relative;
    width: 25%;
`

const Image =styled.img`
    position: absolute;
    top:0;
    left:20%;
    width: 60%; 
    height: 100%;
`

const ContentButton =styled.div`
    padding:30px;
    display:flex;
    flex-direction: row; 
    justify-content: center;
`