/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from 'styled-components';

export default function Button({color,height,fontSize,marginLeft,buttonText, callback}){
    const onClick = () => {
        if(callback){
          callback();
        }
      }
    return(
        <div>
            <BUTTON fontSize={fontSize} color={color} height={height} marginLeft={marginLeft} onClick={onClick} className="button">{buttonText}</BUTTON>
        </div>
    );

}

const BUTTON = styled.button`
  background-color: ${(props) =>props.color ||"#F98B00"};
  border: #F98B00;
  border-radius: 10px;
  width: 95px;
  height: ${(props) =>props.height ||"51px"};
  align-items: center;
  padding: 16px 25px;
  font-style:normal;
  font-weight: 600;
  font-size: ${(props) =>props.fontSize ||"16px"};
  line-height: 19px;
  color: #FFFFFF;
  padding: 0px 0px 0px 0px;
  margin-left: ${(props) =>props.marginLeft ||"0px"};
  cursor: pointer;


`