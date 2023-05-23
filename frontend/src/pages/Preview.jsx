import Tile from "./Tile";
import categories from "../categories";
import { Navigate, useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

const addProduct = async ({ jsonResult, uid, category }) => {
    const docRef = await addDoc(collection(db, "products"), {
        ...jsonResult,
        uid,
        category
    });
}

const Preview = ({ jsonResult, user }) => {
    if (!jsonResult) {
        return <Navigate to="/main" />
    }
    console.log(categories);
    const navigate = useNavigate();
    return <div className="side2side">
        <Tile jsonResult={jsonResult} inPreview={true} />

        <div className="btnGrp">
            {categories.map((ele) => {
                console.log("loop running")
                return <button key={ele} onClick={async () => {
                    await addProduct({ jsonResult, uid: user.uid, category: ele });
                    navigate("/main");
                }}>{ele}</button>;
            })}
        </div>
    </div>
}

export default Preview;