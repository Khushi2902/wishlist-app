import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";


const delProd = async ({ prodid }) => {
    await deleteDoc(doc(db, "products", prodid));
    console.log("prod deleted");
    window.location.reload();
}

const Tile = ({ jsonResult: { imgurl, title, cost, url, prodid }, inPreview }) => {

    return <div className="card">
        <img src={imgurl} alt="img not available" height="350px" width="300px" />
        <p className="cardData">
            Product Name: {title}
        </p>
        <p className="cardData">
            Cost: {cost}
        </p>
        <div className="side2side center" >
            <button onClick={() => {
                window.open(url, "_blank")
            }}>
                GO TO WEBSITE
            </button>
            {!inPreview && <div>
                <button className="delfromwishlist" onClick={() => {
                    if (prodid) {
                        delProd({ prodid });
                    }
                }}>
                    REMOVE
                </button>
            </div>}
        </div>
    </div>
}

export default Tile;