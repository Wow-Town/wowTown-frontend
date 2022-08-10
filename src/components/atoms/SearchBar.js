import styled from "styled-components";

export default function searchBar(){
    return(
        <SearchForm>
            <SearchInput 
                type = "text"
                value= "search"
                placeholder="제목을 입력하세요">

                </SearchInput>
               
            <SearchButton>검색</SearchButton>
        </SearchForm>
    );
}

const SearchForm = styled.form`
    border: 1px solid;
`

const SearchInput = styled.input`
    
`
const SearchButton =styled.button`

`