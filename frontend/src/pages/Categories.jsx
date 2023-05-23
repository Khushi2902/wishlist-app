import { useNavigate } from "react-router-dom";
import categories from "../categories";

const Categories = () => {
    //updates on 24-05-23
    const navigate = useNavigate();
    return <div className="categories">
        {categories.map((ele) => {
            return <button key={ele} onClick={() => {
                navigate(`/category/${ele.toLowerCase()}`);
            }}>{ele}</button>;
        })}
        <button className="backbtn" onClick={()=>{
            navigate(`/main`);
        }}>
            BACK
        </button>
    </div>

}

export default Categories;