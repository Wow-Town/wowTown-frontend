import styled from 'styled-components';

 function Logo(){
    return(
        <LogoDiv>
        <LogoName> WowTown </LogoName>
        </LogoDiv>
    );
}
export default Logo;


const LogoDiv = styled.div`
    padding: 0px 0px 0px 83px;
    margin: 0px 0px 0px 0px;
    width:250px;
    line-height:30px;
    font-size:16px;
    height: 60px;
    color:#BCBCBC;
`

const LogoName = styled.h1`
    margin-top:15px;
    margin-bottom: 15px;
`

