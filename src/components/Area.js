/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, {useState} from 'react';


export default function Area({area, setData,setDataRemove,index}){
    const[isSelected,setIsSelected]=useState(false);
    

    function onAreaHandler(){
        if( isSelected ===false){
            setIsSelected(true);
            console.log(area, isSelected, index, "선택됨");
            setData(index);
            
            
            
        }else{
            setIsSelected(false);
            console.log(area, isSelected, "취소함");
            setDataRemove(index);
        }
        
        
    }


    return(
           
        <li  key={area}
        onClick={onAreaHandler}
        ><span>{area}</span></li>
                
    );
}