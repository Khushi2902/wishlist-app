import { useNavigate } from "react-router-dom";

const GoToFetch = () => {

    const navigate = useNavigate();
    return <div className="btnGrp center">
        <button onClick={() => {
            navigate("/main")
        }}>
            START BROWSING !!!
        </button>
    </div>
}
export default GoToFetch;