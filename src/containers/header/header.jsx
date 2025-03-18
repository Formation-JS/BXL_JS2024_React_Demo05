import vlad from './header.module.scss';
import logo from './logo.jpg';

export default function Header() {

    return (
        <header className={vlad['header']}>
            <img src={logo} alt='Site logo' />
            <span>Demo 05 - Ajax</span>
        </header>
    )
}