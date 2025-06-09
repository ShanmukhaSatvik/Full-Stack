import { useState } from "react";
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Login.css";
function Login() {
    const [inputValue, setInputValue] = useState({
        email: "",
        password: "",
    });
    const { email, password } = inputValue;
    const navigate = useNavigate();
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
    }
    const handleError = (err) =>
        toast.error(err, {
            position: "bottom-left",
        });
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                "https://backend-9mwf.onrender.com/login",
                {
                    ...inputValue,
                },
                { withCredentials: true }
            );
            console.log(data);
            const { success, message} = data;
            if (success) {
               setTimeout(() => {
                navigate("/dashboard");
               }, 500);
            } else {
                handleError(message);
                setInputValue({
                    email: "",
                    password: "",
                });
            }
        } catch (error) {
            console.log(error);
            handleError("Something went wrong. Please try again.");
            setInputValue({
                email: "",
                password: "",
            });
        }
    };
    return (
        <div className="body">
            <div className="login">
                <img src="/assets/kite-logo.png" style={{ width: "18%" }} alt="Logo-Image" />
                <h5 style={{ fontWeight: "400" }} className="mt-4">
                    Login to Kite
                </h5>
                <form onSubmit={handleSubmit}>
                    <input type="email" name="email" value={email} placeholder="Email" onChange={handleOnChange} className="mt-2 mb-4"></input> <br />
                    <input type="password" name="password" value={password} placeholder="Password" onChange={handleOnChange}></input> <br />
                    <button type="submit" className="mt-4 subButton">Login</button>
                </form>
                <div className="text-muted mt-4">
                    Don't have an account?&nbsp;
                    <span onClick={() => window.location.href = "https://finverse-dashboard.netlify.app/signup"} style={{ color: 'blue', cursor: 'pointer' }}>
                        Signup
                    </span>
                </div>
            </div>
            <p className="text-muted text-center mt-4" style={{ fontSize: "0.7rem" }}>
                Zerodha Broking Limited: Member of NSE, BSE ‐ SEBI Reg. no.<br /> INZ000031633, CDSL ‐ SEBI Reg. no. IN-DP-431-2019 | Zerodha<br /> Commodities Pvt. Ltd.: MCX ‐ SEBI Reg. no. INZ000038238 | Smart<br /> Online Dispute Resolution | SEBI SCORES
            </p>
            <ToastContainer/>
        </div>
    );
}
export default Login;