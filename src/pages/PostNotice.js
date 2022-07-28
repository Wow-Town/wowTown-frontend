/* eslint-disable no-unused-vars */
import styled from "styled-components";
import Area from "../components/Area";
import FrameHeader from "../components/FrameHeader";

export default function PostNotice(){
    const areas=[
        "BACKEND", "FRONTEND",
        "CPP",
        "REACT","SPRING",
        "ALGORITHM",
        "JAVA", "PYTHON"
    ]
    

    return(
        <Frame >
            <FrameHeader frameTitle='공고 올리기'/>
            <Div>
                <div>
                <label>공고 제목</label>
                <input></input>
                </div>
                <div>
                    <label>모집 분야</label>
                    <ul className="areasFrame">
                    {areas.map((area,index) =>{
                        return <Area 
                         key={index} 
                        // index={index} 
                        // setData={setData} 
                        // setDataRemove= {setDataRemove} 
                         area={area}
                        //interestList = {interestList}
                        />;
                    })}
                </ul>
                </div>
                <div>
                    <label>공고 내용</label>
                    <textarea
                        id="inputAboutIntroduction"
                        //onChange={onIntroductionHandler} 
                     />
                </div>

            </Div>
        </Frame>
    );
}

const Frame= styled.div`
    padding : 20px 30px 20px 30px;
    border: 1px solid #A4A4A4 ;
    width:490px;

`

const Div = styled.div`

`