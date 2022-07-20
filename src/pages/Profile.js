import styled from "styled-components";
//import Button from "../components/Button";

export default function Profile(){
    return(
        <Div>
            <CloseButton><P>x</P></CloseButton>
            <SimpleProfile>
                <ProfileImg>이</ProfileImg>
                <Name>이나연</Name>
            </SimpleProfile>
            <H3>관심 분야</H3>
            <InterestListDiv>
                <Interest>
                    <Img></Img>
                    <H4>REACT</H4>
                </Interest>
                <Interest>
                    <Img></Img>
                    <H4>FRONTEND</H4>
                </Interest>
                <Interest>
                    <Img></Img>
                    <H4>PYTHON</H4>
                </Interest>
            </InterestListDiv>
            <H3>소개</H3>
            <IntroductionDiv>
                안녕~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            </IntroductionDiv>
            {/* <Button buttonText="채팅하기"/> */}
        </Div>
    );
}

const Div = styled.div`
    background-color:#FEFFFF;
    width:450px;
    height:100%;
    padding : 30px 50px 30px 50px;

`
const CloseButton = styled.div`
    padding:10px; 
    width:30px;
    height:30px;
    text-align:30px;
    margin-left: auto;
    
    &:hover {
        border: 0;
        cursor:pointer;
        opacity: .75;
      }
          

`
const P = styled.p`
    text-color:#A4A4A4;
    font-size:35px;
    text-align:center; 
    display:table-cell;
    vertical-align:middle;
    width:30px;
    height:30px;
    line-height:30px;
    border-radius:100px;
    margin: auto;
`

const SimpleProfile = styled.div`
    display:flex;
    flex-direction: row;
    align-items:center;
    margin-bottom:60px;
`
const ProfileImg=styled.div`
    background-color:pink;
    width:60px;
    height:60px;
    line-height:60px;
    border-radius:100px;
    text-align: center;
    display:table-cell;
    vertical-align:middle;

    `

const Name= styled.h1`
    padding-left:25px;
    font-size:24px;

`

const InterestListDiv = styled.div`
    display:flex;
    flex-direction: row;
    justify-content: space-between;
`

const Interest = styled.div`
    height:200px;
    max-height:350px;
    width:100px;
    padding-left:10px;
    display:flex;
    flex-direction:column;
    align-items:center;

`
const Img=styled.div`
    width:80px;
    height:80px;
    background-color:grey;
    border-radius:100px;

`
const IntroductionDiv = styled.div`
    width:450px;
    word-break:break-all;
    font-size:20px;
    font-weight: 400;

`
const H3= styled.h3`
    font-size:16px;
    font-weight: 600;
    padding-bottom:13px;
    font-style:normal;
    width: 100px;
    line-height:20px; 
    padding: 0px 0px 10px 0px;

`
const H4 =styled.h4`
      font-size:20px;
      font-weight: 400;
`