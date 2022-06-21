import styled from "styled-components";
import Button from "./Button";


export default function Channel({channelList}){
    return(
        <DivChannelList>
           {channelList.map( channel =>{
            return(
                <ChannelFrame key={channel.channelId}>
                <DivChannel>
                <InfoChannel>
                    채널1
                    <div>00/20명</div>
                </InfoChannel>
                <Button buttonText="입장"/>
                </DivChannel>
                </ChannelFrame>
            )
            })}
        </DivChannelList>
    );

}

const DivChannelList=styled.div`
    display:flex;
    flex-direction: column; 
    justify-content: center; 
    padding-left:83px;
`

const ChannelFrame=styled.div`

    
`
const DivChannel=styled.div`
    display:flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    border: 1px solid #A4A4A4 ;
    border-radius: 10px;
    height:100px;
    width:510px;
    
    
`

const InfoChannel=styled.span`
    display:flex;
    flex-direction: column; 
    width: 100px;
    padding-right:170px;
    font-size:16px;
    
`



