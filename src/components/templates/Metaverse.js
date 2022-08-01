/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import Button from "../atoms/Button/Button.js";
import {useNavigate} from 'react-router-dom';
import {useMutation} from 'react-query';
import { useRecoilState } from 'recoil';
import { ChannelState } from "../../utils/ChannelState.js";
import { enterChannel } from '../../apis/channel.api';
import { getAvatar } from "../../apis/avatar.api.js";
import { AvatarState } from "../../utils/AvatarState.js";

export default function Metaverse(){
    return (
        <Div>
            ffffaa
            {/* <iframe src="http://metaverse.wowtown.co.kr/WowProCpp-HTML5-Shipping.html"
    name="프레임 이름"
    width="100%"
    height="100%"
    sandbox="allow-scripts allow-popups"> </iframe> */}
        </Div>
    )

}
const Div = styled.div`
    top: 0;
    border: 1px solid  #bcbcbc;
    width:1067px;
    min-width:500px;
    height:662px;
`