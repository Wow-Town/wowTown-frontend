import './Button.css';
export default function Button({buttonText}){
    return(
        <div>
            <button className="button">{buttonText}</button>
        </div>
    );

}