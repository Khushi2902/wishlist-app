import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from '@mui/material';


const Fetch = ({ setJsonResult }) => {
    const [url, setUrl] = useState('');
    const [showAlert, setshowAlert] = useState(false);
    const navigate = useNavigate();
    const handleChange = event => {
        setUrl(event.target.value);
        //console.log('value is:', event.target.value);
    };

    const fetchData = async () => {

        let result = await fetch('http://localhost:3000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url }),
        })
        const jsonResult = await result.json();
        setJsonResult(jsonResult);
        if (jsonResult) {
            console.log(jsonResult);
            navigate("/preview");
        }

    }

    return <div className="aligner " >
        <Alert severity="warning" style={{ display: !showAlert ? 'none' : 'flex' }} onClose={() => { setshowAlert(false) }}> ENTER A VALID URL</Alert>
        <h2 className="fetchheading">
            MY WISHLIST APP
        </h2>
        <input type="url"
            onChange={handleChange}
            value={url}
            className="input" />
        <div className="btnGrp center">
            <button onClick={() => {
                if (url == '') {
                    setshowAlert(true);
                }
                else
                    fetchData();
            }}>
                Fetch !
            </button>
            <button onClick={() => {
                navigate("/categories");
            }}>
                Go to my Wishlist !
            </button>
        </div>

    </div>
}

export default Fetch;