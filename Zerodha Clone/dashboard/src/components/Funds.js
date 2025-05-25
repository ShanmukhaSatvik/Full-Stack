import { useState, useContext } from "react";
import axios from "axios";
import FundsDataContext from './FundsDataContext';
import { toast } from "react-toastify";
function Funds() {
  const { funds } = useContext(FundsDataContext);
  const [inputValue, setInputValue] = useState({ password: "", username: "" });
  const [isVerified, setIsVerified] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [fundAmount, setFundAmount] = useState("");
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const { password, username } = inputValue;
  const safeFixed = (value, digits = 2) =>
    typeof value === 'number' && !isNaN(value) ? value.toFixed(digits) : '0.00';
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };
  const handleError = (err) =>
    toast.error(err, { position: "bottom-left" });
  const handleSuccess = (msg) =>
    toast.success(msg, { position: "bottom-right" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("https://backend-a4bn.onrender.com/userVerification", {
        ...inputValue,
      });
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setIsVerified(true);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
      handleError("Verification failed");
    }
    setInputValue({ password: "", username: "" });
  };
  const handleFundChange = (e) => setFundAmount(e.target.value);
  const handleAddFunds = async () => {
    if (!fundAmount || isNaN(fundAmount) || fundAmount <= 0) {
      return handleError("Enter a valid amount");
    }
    const user = funds.user;
    try {
      const response = await axios.post("https://backend-a4bn.onrender.com/depositfunds", {
        user,
        amount: parseFloat(fundAmount),
      });
      handleSuccess(response.data.message);
      resetVerification();
    } catch (error) {
      handleError("Failed to deposit funds");
      console.error(error);
    }
  };
  const handleWithdrawFunds = async () => {
    if (!fundAmount || isNaN(fundAmount) || fundAmount <= 0) {
      return handleError("Enter a valid amount");
    }
    const user = funds.user;
    try {
      const response = await axios.post("https://backend-a4bn.onrender.com/withdrawfunds", {
        user,
        amount: parseFloat(fundAmount),
      });
      handleSuccess(response.data.message);
      resetVerification();
    } catch (error) {
      handleError(error.response.data.error);
      console.error(error);
    }
  };
  const toggleVerification = (withdraw = false) => {
    setShowVerification(prev => !prev);
    setIsWithdrawing(withdraw);
    setIsVerified(false);
    setInputValue({ password: "", username: "" });
    setFundAmount("");
  };
  const resetVerification = () => {
    setFundAmount("");
    setIsVerified(false);
    setShowVerification(false);
    setIsWithdrawing(false);
  };
  return (
    <>
      <div className="funds">
        <p>Instant, zero-cost fund transfers with UPI </p>
        <button
          className={`btns ${showVerification && !isWithdrawing ? 'btns-danger' : 'btns-success'} mx-2`}
          onClick={() => toggleVerification(false)}
        >
          {showVerification && !isWithdrawing ? "Cancel" : "Add Funds"}
        </button>
        <button
          className={`btns ${showVerification && isWithdrawing ? 'btns-danger' : 'btns-primary'}`}
          onClick={() => toggleVerification(true)}
        >
          {showVerification && isWithdrawing ? "Cancel" : "Withdraw"}
        </button>
      </div>
      {showVerification && (
        <div className="text-center">
          <img src="assets/upi.png" alt="UPI-Image" />
          {!isVerified ? (
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">Username</label>&nbsp;&nbsp;
              <input
                type="text"
                name="username"
                value={username}
                placeholder="username"
                className="mb-3"
                onChange={handleChange}
                id="username"
              /><br />
              <label htmlFor="password">Password</label>&nbsp;&nbsp;
              <input
                type="password"
                name="password"
                value={password}
                placeholder="password"
                className="mb-3"
                onChange={handleChange}
              /><br />
              <button className='p-2 btns btns-primary fs-5 mb-3' type="submit">Verify</button>
            </form>
          ) : (
            <div className="mt-4 p-3 border rounded shadow-sm">
              <h5>{isWithdrawing ? "Withdraw Funds" : "Add Funds"}</h5>
              <input
                type="number"
                placeholder="Enter amount"
                value={fundAmount}
                onChange={handleFundChange}
                className="form-control mb-2"
                style={{ maxWidth: "200px", margin: "0 auto" }}
              />
              <div className="d-flex justify-content-center gap-3">
                <button
                  className="btns btns-success"
                  onClick={isWithdrawing ? handleWithdrawFunds : handleAddFunds}
                >
                  {isWithdrawing ? "Withdraw" : "Add Funds"}
                </button>
                <button className="btns btns-danger" onClick={() => toggleVerification(isWithdrawing)}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="row">
        <div className="col">
          <span>
            <p>Equity</p>
          </span>
          <div className="table">
            <div className="data">
              <p>Available margin</p>
              <p className="imp colored">{safeFixed(funds?.availableMargin)}</p>
            </div>
            <div className="data">
              <p>Used margin</p>
              <p className="imp">{safeFixed(funds?.usedMargin)}</p>
            </div>
            <div className="data">
              <p>Available cash</p>
              <p className="imp">{safeFixed(funds?.availableCash)}</p>
            </div>
            <hr />
            <div className="data">
              <p>Opening Balance</p>
              <p>{safeFixed(funds?.openingBalance)}</p>
            </div>
            <div className="data">
              <p>Payin</p>
              <p>{safeFixed(funds?.payin)}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Funds;
