import Logo from '../components/Logo';
import Button from '../components/Button';
import './Home.css';
import {Link} from 'react-router-dom';

export default function Home(){

    
    return(
        <div className="contentsFrame">
            <div className="logoDiv"/>
            <Logo/>
            <h1> 아직 안함</h1>
            <h1 className="h1"> 와우타운 시작하기 </h1>
            <div className="buttonDiv">
                <Link to='/users/signup'>
                 <Button  buttonText="시작하기"/>
                </Link>
            </div>
        </div>
    )
}