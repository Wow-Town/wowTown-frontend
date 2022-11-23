/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { AvatarState } from "../../utils/AvatarState";
import { useEffect,useState } from "react";
import {useMutation} from 'react-query';
import { getMyInterestsNoticeList } from "../../apis/notice.api";

export default function SelectedInterestList( {setMyInterestNoticeData} ){
    const[avatarstate,setAvatarState]=useRecoilState(AvatarState);
    const[myInterests,setMyInterests]=useState(avatarstate.interests)
    const[searchedNotice,setSearchedNotice]=useState([]);
    
    const{ mutateAsync: handlegetMyInterestsNoticeList } = useMutation(getMyInterestsNoticeList,{
        onSuccess: ({response, success, error }) => {
            if(success){
                console.log("관심사 검색해서 나온 결과",response);
                setMyInterestNoticeData(response);
               
            }else{
                console.log('notice loading failed: ', error);
            }
        }
        });

    useEffect(
        ()=>{
            console.log(myInterests);
            handlegetMyInterestsNoticeList(myInterests);
        }
    ,[]);
    return(
        <SelectedInterestListFrame >
            <Label> 내 관심사</Label>
            {
                myInterests.map(
                    (interest) =>{
                        return(
                            <Interest key={interest}>{interest}</Interest>
                        )
                    }
                )
            }
        </SelectedInterestListFrame>
    )
}

const SelectedInterestListFrame = styled.div` 
    margin: 14px 10px 14px 40px;
`

const Interest =styled.li`
    display:inline-block;
    font-size:16px;
    font-weight: 500;
    background-color:#BCBCBC;
    margin-right: 10px;
    padding: 5px 10px;
    border-radius:10px;

`
const Label = styled.label`
font-style:normal;
font-size: 16px;
font-weight: 700;
width: 80px;
line-height:20px;
margin-right:15px;
display:block;
`
