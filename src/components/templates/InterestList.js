/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import { useEffect } from "react";
import { useState } from "react";
import Area from "../atoms/Area";

export default function InterestList({setInterestList}){
    const [selectedInterests,setSelectedInterests] = useState([]);

    const areas=[
        "BACKEND", "FRONTEND","PYTHON",
        "CPP",
        "REACT","SPRING",
        "JAVA","ALGORITHM" 
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

export const AreasFrame =styled.ul`
padding-left: 0px;
cursor: pointer;
`