/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, {useState} from 'react';


export default function Area({area, setData,setDataRemove,index,interestList}){
    const[isSelected,setIsSelected]=useState(false);
    

    function onAreaHandler(){
        if( isSelected ===false && interestList.length <3){
            setIsSelected(true);
            console.log(area, isSelected, index, "선택됨");
            setData(index);
            
            
            
        }else if(isSelected ===true ){
            setIsSelected(false);
            console.log(area, isSelected, "취소함");
            setDataRemove(index);
        }
        
        
    }


    return(
           
        <li  key={area}
        onClick={onAreaHandler}
        className={ isSelected && interestList.includes(area) ? "li_clicked" : "li_default"}
        ><span>{area}</span></li>
                
    );
}