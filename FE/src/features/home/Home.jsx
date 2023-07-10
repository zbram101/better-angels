
import { useSelector } from 'react-redux';

export { Home };

function Home() {
    const auth = useSelector(x => x.auth.value);
    return (
        <div>
            <h1>Hi {auth?.name}!</h1>
            <p>You're logged in! Welcome to the Library/Bookstore check out our books!</p>
        </div>
    );
}
