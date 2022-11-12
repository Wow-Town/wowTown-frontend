/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";

export default function Metaverse(){
    return (
        <Div src="https://metaverse.wowtown.co.kr"
        name="프레임 이름"
        width="100%"
        height="100%"
        sandbox="allow-same-origin allow-scripts">
        </Div>
    )

}
const Div = styled.iframe`
    top: 0;
    border: 1px solid  #bcbcbc;
    width:100%;
    min-width:500px;
    height:621px;
`
