/* eslint-disable react/prop-types */
import Logo from '../components/Logo';

export default function Header({text}){
    return(
        <div className="contentsHeader">
            <Logo classname="logo"/>
            <h2>{text}</h2>
        </div>

    );
}