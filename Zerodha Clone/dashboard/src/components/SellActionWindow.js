import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import FundsDataContext from "./FundsDataContext";
import "./BuyActionWindow.css";
const SellActionWindow = ({ uid, ltp }) => {
    const [stockQuantity, setStockQuantity] = useState(1);
    const [expectedCredit, setexpectedCredit] = useState(0.0);
    const { closeSellWindow } = useContext(GeneralContext);
    const { funds } = useContext(FundsDataContext);
    useEffect(() => {
        const ltpNum = ltp.toFixed(2);
        const grossCredit = ltpNum * stockQuantity;
        const brokerageFee = Math.min(0.0003 * grossCredit, 20);
        const totalCredit = grossCredit-brokerageFee;
        setexpectedCredit(totalCredit.toFixed(2));
    }, [stockQuantity, ltp]);
    const handleSellClick = () => {
        axios.post("https://backend-9mwf.onrender.com/newOrders", {
            user:funds.user,
            name: uid,
            qty: stockQuantity,
            price: parseFloat(ltp).toFixed(2),
            mode: "SELL",
        })
          .then(() => {
            closeSellWindow();
          })
          .catch((err) => {
            if (err.response && err.response.status === 400) {
                alert("Not enough stock to sell!");
            } else {
                alert("Something went wrong while placing the sell order.");
                console.error(err);
            }
          });
    };
    const handleCancelClick = () => {
        closeSellWindow();
    };
    return (
        <div className="buy-container" id="buy-window" draggable="true">
            <div className="regular-order">
                <div className="inputs">
                    <fieldset>
                        <legend>Qty.</legend>
                        <input
                            type="number"
                            name="qty"
                            id="qty"
                            onChange={(e) => setStockQuantity(e.target.value)}
                            value={stockQuantity}
                        />
                    </fieldset>
                    <fieldset>
                        <legend>Price</legend>
                        <input
                            type="number"
                            name="price"
                            id="price"
                            value={parseFloat(ltp).toFixed(2)}
                            readOnly
                        />
                    </fieldset>
                </div>
            </div>
            <div className="buttons">
                <span>Net Expected credit ₹{expectedCredit}</span>
                <div>
                    <Link className="btns btn-red" onClick={handleSellClick}>
                        Sell
                    </Link>
                    <Link to="" className="btns btn-grey" onClick={handleCancelClick}>
                        Cancel
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default SellActionWindow;
