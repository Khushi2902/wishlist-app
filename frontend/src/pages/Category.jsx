import { collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import Tile from "./Tile";

const getProd = async ({ category, uid }) => {
    const prodRef = collection(db, "products");
    const q = query(prodRef, where("uid", "==", uid), where("category", "==", category));
    const querySnapshot = await getDocs(q);
    const prods = [];
    querySnapshot.forEach((doc) => {
        prods.push({ ...doc.data(), prodid: doc.id });
    });
    return prods;
}

const Category = ({ category, user }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {

        getProd({ category, uid: user.uid }).then((prods) => {
            setProducts(prods);
            console.log(prods);
            setLoading(false);
        })
    }, [])


    if (loading) {
        return <div>
            LOADING...
        </div>
    }

    if (products.length == 0) {
        //console.log("empty page");
        
        return <div className="fetchheading">
            NO ITEMS IN {category} !!!
            <button className="backbtn" onClick={()=>{
                navigate(`/categories`);
            }}>
                BACK
            </button>
        </div>
    }

    return <div>
        {products && products.map((ele) => {
            return (
                <div className="delfromwishlist" key={ele.prodid}>
                    <div>
                        <Tile key={ele.url} jsonResult={ele} inPreview={false} />
                    </div>
                </div>
            )
        })}

    </div>

}
export default Category;