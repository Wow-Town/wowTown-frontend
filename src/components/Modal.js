import styled from 'styled-components';


export default function Modal({closeModal, modalMessage}) {
    const handleClose = () => {
      closeModal(false);
      if(modalMessage.callback){
        modalMessage.callback();
      }
    }

    return (
      <ModalBackgroud>
        <ModalContainer>
          <DivCloseBtn>
            <Title>
              <TitleText>{modalMessage.titleText}</TitleText>
            </Title>
            <CloseBtn onClick={handleClose}>x</CloseBtn>
           
          </DivCloseBtn>
          <ModalContents>
            <p> {modalMessage.contentsText}
            </p>
          </ModalContents>
          <ModalFooter>
            <FooterBtn onClick={handleClose} >확인</FooterBtn>
          </ModalFooter>
        </ModalContainer>
      </ModalBackgroud>
    );
}

const ModalBackgroud =styled.div`
  // width: 30vw;
  // height: 100vh;
  // background-color: rgba(200, 200, 200);
  position: fixed;
  margin-top : 200px;
  padding-left: 89px;
   display: flex;
  //justify-content: center;
  align-items: center;
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

const DivCloseBtn =styled.div`
  display: flex;
  justify-content : space-between;

`

const CloseBtn =styled.div`
  background-color: transparent;
  border: none;
  font-size: 25px;
  cursor: pointer;
  line-height:25px;
`

const Title =styled.div`
  display: inline-block;
  text-align: center;
  margin-top: 0px;
  line-height:10px;
  display: flex;
  justify-content : flex-start;
  
`
const TitleText=styled.h1`
  font-size:20px;
  text-align: top;
`
const ModalContents =styled.div`
  flex: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  text-align: center;
  justify-content : flex-start;
`
const ModalFooter =styled.div`
  flex: 20%;
  display: flex;
  align-items: center;
  justify-content : flex-end;
`

const FooterBtn =styled.div`
  display:flex;
  background-color: #FFBC45;
  border-radius: 10px;
  width: 95px;
  height: 51px;
  align-items: center;
  justify-content: center;
  font-style:normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  padding: 0px 0px 0px 0px;
  margin: 10px;
  border: none;
  color: white;
  cursor: pointer;
`