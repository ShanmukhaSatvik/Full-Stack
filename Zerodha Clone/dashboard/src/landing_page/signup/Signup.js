import { useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import OpenAccount from "../OpenAccount";
function Signup() {
    const [inputValue, setInputValue] = useState({
        email: "",
        password: "",
        username: "",
    });
    const { email, password, username } = inputValue;
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
    };
    const handleError = (err) =>
        toast.error(err, {
            position: "bottom-left",
        });
    const handleSuccess = (msg) =>
        toast.success(msg, {
            position: "bottom-right",
        });
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                "http://localhost:8080/signup",
                {
                    ...inputValue,
                },
                { withCredentials: true }
            );
            const { success, message } = data;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    window.location.href = "http://localhost:3000/dashboard";
                }, 1000);
            } else {
                handleError(message);
            }
        } catch (error) {
            console.log(error);
        }
        setInputValue({
            ...inputValue,
            email: "",
            password: "",
            username: "",
        });
    };
    return (
        <div className="container">
            <div className="text-center mt-5 mb-5">
                <h1>Open a free demat and trading account online</h1>
                <h5 className="text-muted mt-3">Start investing brokerage free and join a community of 1.6+ crore investors and traders</h5>
            </div>
            <div className="row">
                <div className="col-7 mt-5 mb-5">
                    <img src="assets/account_open.svg" alt="Account_open-Image"></img>
                </div>
                <div className="col-5 mt-5 mb-5">
                    <h1>Signup now</h1>
                    <p className="text-muted">Or track your existing application</p>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username</label>&nbsp;&nbsp;
                        <input type="text" name="username" value={username} placeholder="username" className="mb-3" onChange={handleOnChange} id="username"></input><br />
                        <label htmlFor="email">Email</label>&nbsp;&nbsp;
                        <input type="email" name="email" value={email} placeholder="email" className="mb-3" onChange={handleOnChange}></input><br />
                        <label htmlFor="password">Password</label>&nbsp;&nbsp;
                        <input type="password" name="password" value={password} placeholder="password" className="mb-3" onChange={handleOnChange}></input><br />
                        <button style={{ width: "50%", margin: '0 auto' }} className='p-2 btn btn-primary fs-5 mb-3' type="submit">Sign Up</button><br />
                        <div>
                            Already have an account?&nbsp;
                            <Link to={"/login"} style={{textDecoration:"none"}}>Login</Link>
                        </div>
                    </form>
                    <ToastContainer />
                    <p className="text-muted mt-2">By proceeding, you agree to the Zerodha <a href="#">terms</a> & <a href="#">privacy policy</a></p>
                </div>
            </div>
            <h2 className="mt-5 mb-5 text-center">Investment options with Zerodha demat account</h2>
            <div className="row">
                <div className="col">
                    <div className="Inv-Opt mt-3">
                        <img src="assets/stocks-acop.svg" alt="Stocks-Image"></img>
                        <div className="Inv-Opt-text">
                            <h3>Stocks</h3>
                            <p className="text-muted">Invest in all exchange-listed securities</p>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="MFO mt-3">
                        <img src="assets/mf-acop.svg" alt="Mutual Funds-Image"></img>
                        <div className="MFO-text">
                            <h3>Mutual funds</h3>
                            <p className="text-muted">Invest in commission-free direct mutual funds</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="Inv-Opt mt-5 mb-4">
                        <img src="assets/ipo-acop.svg" alt="IPO-Image"></img>
                        <div className="Inv-Opt-text">
                            <h3>IPO</h3>
                            <p className="text-muted">Apply to the latest IPOs instantly via UPI</p>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="Inv-Opt mt-5 mb-4">
                        <img src="assets/fo-acop.svg" alt="Features & Options-Image"></img>
                        <div className="Inv-Opt-text">
                            <h3>Futures & options</h3>
                            <p className="text-muted">Hedge and mitigate market risk through simplified F&O trading</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center mb-5">
                <Link to="/investments">
                    <button style={{ width: "20%", margin: '0 auto' }} className='p-2 btn btn-primary fs-5 mb-5 mt-5'>Explore Investments</button>
                </Link>
            </div>
            <h2 className="text-center mb-5">Steps to open a demat account with Zerodha</h2>
            <div className="row">
                <div className="col mb-5"><img src="assets/steps-acop.svg" alt="Features & Options-Image" style={{ width: "90%" }}></img></div>
                <div className="col mb-5">
                    <ol style={{ lineHeight: "4rem", fontSize: "1.2rem" }}>
                        <li>Enter the requested details</li>
                        <li>Complete e-sign & verification</li>
                        <li>Start investing!</li>
                    </ol>
                </div>
            </div>
            <div className="row">
                <div className="col mt-5">
                    <img src="assets/acop-benefits.svg" alt="Benefits-Image" style={{ width: "90%" }}></img>
                    <h2>Benefits of opening a Zerodha demat account</h2>
                </div>
                <div className="col mt-5">
                    <h5 className="mb-3">Unbeatable pricing</h5>
                    <p className="text-muted mb-5">Zero charges for equity & mutual fund investments. Flat ₹20 fees for intraday and F&O trades.</p>
                    <h5 className="mb-3">Best investing experience</h5>
                    <p className="text-muted mb-5">Simple and intuitive trading platform with an easy-to-understand user interface.</p>
                    <h5 className="mb-3">No spam or gimmicks</h5>
                    <p className="text-muted mb-5">Committed to transparency — no gimmicks, spam, "gamification", or intrusive push notifications.</p>
                    <h5 className="mb-3">The Zerodha universe</h5>
                    <p className="text-muted mb-5">More than just an app — gain free access to the entire ecosystem of our partner products.</p>
                </div>
            </div>
            <OpenAccount />
        </div>
    );
}
export default Signup;