
import Button from '../components/Button';
import Header from '../components/Header';
import './Home.css';
import {Link} from 'react-router-dom';

export default function Home(){

    
    return(
        <div className="contentsFrame">
            <Header text="와우타운 시작하기 "/>
            <div className="buttonFrame">
                <Link to='/users/signup'>
                 <Button  buttonText="시작하기"/>
                </Link>
            </div>
        </div>
        
    )
}