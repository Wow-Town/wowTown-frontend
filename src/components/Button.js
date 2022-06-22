/* eslint-disable react/prop-types */
import './Button.css';
export default function Button({buttonText, callback}){
    const onClick = () => {
        if(callback){
          callback();
        }
      }
    return(
        <div>
            <button onClick={onClick} className="button">{buttonText}</button>
        </div>
    );

}