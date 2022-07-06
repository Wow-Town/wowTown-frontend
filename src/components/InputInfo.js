/* eslint-disable react/prop-types */
import './InputInfo.css';

export default function InputInfo({maxLength, label, inputType,value,onChange}){
   //label="이메일 주소"inputType="email" value onChange
    return(
        <div className="inputInfo">
            <label className="inputLabel">{label}</label>
            <input className="inputFrame" 
            type={inputType} 
            defaultValue={value} 
            onChange={onChange} 
            maxLength={maxLength}></input>
        </div>
    );
}
