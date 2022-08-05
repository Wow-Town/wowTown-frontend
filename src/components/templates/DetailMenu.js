import styled from "styled-components";

export default function DetailMenu(){
    return(
        <MenuFrame>
            <Menu1>내 관심사로 검색</Menu1>
            <Menu2>제목으로 검색</Menu2>
            <Menu3></Menu3>
        </MenuFrame>
    )

}
const MenuFrame =styled.div`
    display:flex;
    border-bottom:1px solid black;
    
`
const Menu1 =styled.span`
    padding: 4px 10px 4px 10px;
    margin-left:20px;
    font-size:12px;
    color: #A4A4A4;
    border-bottom:1px solid white;
    &:hover{
        color: black;
        border-bottom:1px solid;
    }
   
`
const Menu2 = styled.span`
    padding: 4px 10px 4px 10px;
    font-size:12px;
    color: #A4A4A4;
    border-bottom:1px solid white;
    &:hover{
        color: black;
        border-bottom:1px solid;
    }
`

const Menu3 = styled.span`

`