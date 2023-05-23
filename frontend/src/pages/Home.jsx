import GoToFetch from "./GoToFetch";
import Login from "./Login";
import Logout from "./Logout";

const Home = ({ user }) => {
    return <div>
        <h1 className="homeHeading" >
            WELCOME TO MY WISHLIST APPLICATION
        </h1>
        {!user && <Login />}
        {user && <GoToFetch />}
        {user && <Logout />}
    </div>
}

export default Home;