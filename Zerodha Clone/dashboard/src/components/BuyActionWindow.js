import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import FundsDataContext from "./FundsDataContext";
import "./BuyActionWindow.css";
const BuyActionWindow = ({ uid, ltp }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [marginRequired, setMarginRequired] = useState(0.0); 
  const { closeBuyWindow } = useContext(GeneralContext);
  const { funds } = useContext(FundsDataContext);
  const safeToFixed = (num) => (typeof num === 'number' && !isNaN(num) ? num.toFixed(2) : '0.00');
  useEffect(() => {
    const ltpNum = safeToFixed(ltp);
    const grossAmount = ltpNum * stockQuantity;
    const brokerageFee = Math.min(0.0003 * grossAmount, 20);
    const totalMargin = grossAmount + brokerageFee;
    setMarginRequired(totalMargin.toFixed(2));
  }, [stockQuantity, ltp]);
  const handleBuyClick = () => {
    axios.post("https://backend-9mwf.onrender.com/newOrders", {
      user:funds.user,
      name: uid,
      qty: stockQuantity,
      price: parseFloat(ltp).toFixed(2),
      mode: "BUY",
    })
      .then(() => {
        closeBuyWindow();
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          alert("Insufficient funds to place order!");
        } else {
          alert("Something went wrong while placing the sell order.");
          console.error(err);
        }
      });
  };
  const handleCancelClick = () => {
    closeBuyWindow();
  };
  return (
    <div className={"buy-container"} id="buy-window">
      <div className={"regular-order"}>
        <div className={"inputs"}>
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              min="1"
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
      <div className={"buttons"}>
        <span>Margin required ₹{marginRequired}</span>
        <div>
          <Link className="btns btn-blue" onClick={handleBuyClick}>
            Buy
          </Link>
          <Link to="" className="btns btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};
export default BuyActionWindow;