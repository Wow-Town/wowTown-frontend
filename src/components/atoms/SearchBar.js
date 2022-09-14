import { useState } from "react";
import styled from "styled-components";

export default function SearchBar(){
    const[enteredTitle,setEnteredTitle]=useState("");
    function onCheckEnter(e) {
        if(e.key === 'Enter') {
          onSearch();
        }
      }
    function onSearch(e){
        e.preventDefault(); 
        if(enteredTitle.length >0){
            console.log({enteredTitle});
            console.log("검색");
        }
        
    }
    return(
        <SearchForm onSubmit = {onSearch} onKeyPress={onCheckEnter}>
            <SearchInput 
                type= "text"
                value={enteredTitle}
                onChange= {(e)=>setEnteredTitle(e.target.value)}
                maxLength= "100"
                autoComplete="on"
                placeholder="제목을 입력하세요">
                </SearchInput>
                <SearchButton>
                    <span className="material-icons">search</span>
                </SearchButton>
        </SearchForm>
    );
}

const SearchForm = styled.form`
    padding: 15px 0px 15px 30px;
    display:flex;
    flex-direction: row;
    
    

`

const SearchInput = styled.input`
    
    width:80%;
    height70px;
    background: #FFFFFF;
    border: 1.5px solid #A4A4A4;
    box-sizing: border-box;
    border-radius: 10px;
    padding: 5px 15px 5px 15px;
    &:focus {
        
        border-color:black;
        outline: none;
    }

`
const SearchButton =styled.button`
    margin-left: 10px;
    border-radius:10px;
    border: none;
    cursor:pointer;
     &:hover{
        color: #F98B00;
     }

`