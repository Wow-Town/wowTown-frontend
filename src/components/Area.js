/* eslint-disable react/prop-types */
import React, {useState} from 'react';


export default function Area({area}){
    const[isSelected,setIsSelected]=useState(false);

    function onAreaHandler(){
        if( isSelected ===true){
            setIsSelected(false);
            console.log(area, isSelected);
            
        }else{
            setIsSelected(true);
            console.log(area, isSelected);
        }

        
    }


    return(
           
        <li  key={area}
        onClick={onAreaHandler}
        ><span>{area}</span></li>
                
    );
}