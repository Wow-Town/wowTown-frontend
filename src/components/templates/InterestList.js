/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import { useEffect } from "react";
import { useState } from "react";
import Area from "../atoms/Area";

export default function InterestList({setInterestList}){
    const [selectedInterests,setSelectedInterests] = useState([]);

    const areas=[
        "BACKEND", "FRONTEND",
        "CPP",
        "REACT","SPRING",
        "JAVA","ALGORITHM" ,"PYTHON"
    ]

    useEffect(()=>{
        setInterestList(selectedInterests);
        console.log(selectedInterests);
    },[selectedInterests])

    return(
        <AreasFrame>
            {areas.map((area) =>{
                return <Area
                    key={area} 
                    area={area}
                    selectedInterests = {selectedInterests}
                    setSelectedInterests ={setSelectedInterests}
                    />;
            })
            }
        </AreasFrame>
    )
}

const AreasFrame =styled.ul`
    padding-left: 0px;
    width:100%;
    margin-bottom:0px;
`