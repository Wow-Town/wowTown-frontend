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

export default function ChatRoom({channelList}){

}