import { useState,useEffect,useRef } from "react";
import { Link,useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import styles from "../index.module.css";
function Menu() {
    const [selectedMenu,setSelectedMenu]=useState(0);
    const [isProfileDropdownOpen,setIsProfileDropdownOpen]=useState(false);
    const profileRef = useRef(null);
    const [hasShownToast, setHasShownToast] = useState(false);
    function handleMenuClick(uid) {
        setSelectedMenu(uid);
    };
    function handleProfileClick() {
        setIsProfileDropdownOpen((prev) => !prev);
    };
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [username, setUsername] = useState("");
    useEffect(() => {
      const verifyCookie = async () => {
        if (!cookies.token) {
          window.location.href = "https://dashboard-j0s7.onrender.com/login";
          return;
        }
        const { data } = await axios.post(
          "https://backend-9mwf.onrender.com",
          {},
          { withCredentials: true }
        );
        const { status, user } = data;
        setUsername(user);
        if (status) {
            if (!hasShownToast) {
                toast(`Hello ${user}`, { position: "top-right" });
                setHasShownToast(true);
            }
        } else {
            removeCookie("token");
            window.location.href = "https://dashboard-j0s7.onrender.com/login";
        }
      };
      verifyCookie();
      const handleClickOutside = (event) => {
        if (
            profileRef.current &&
            !profileRef.current.contains(event.target)
        ) {
            setIsProfileDropdownOpen(false);
        }
      };
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, [cookies, navigate, removeCookie,hasShownToast,username]);
    const Logout = () => {
      removeCookie("token");
      window.location.href = "https://dashboard-j0s7.onrender.com";
    };
    return (
        <div className={styles["menus-container"]}>
            <img src="/assets/logo.png" style={{ width: "50px" }} alt="Logo-Image"/>
            <div className={styles["menus"]}>
                <ul>
                    <li>
                        <Link style={{textDecoration:"none"}} to="/dashboard/" onClick={()=>handleMenuClick(0)}>
                            <p className={`${styles.menu} ${selectedMenu === 0 ? styles.selected : ""}`}>Dashboard</p>
                        </Link>
                    </li>
                    <li>
                        <Link style={{textDecoration:"none"}} to="/dashboard/orders" onClick={()=>handleMenuClick(1)}>
                            <p className={`${styles.menu} ${selectedMenu === 1 ? styles.selected : ""}`}>Orders</p>
                        </Link>
                    </li>
                    <li>
                        <Link style={{textDecoration:"none"}} to="/dashboard/holdings" onClick={()=>handleMenuClick(2)}>
                            <p className={`${styles.menu} ${selectedMenu === 2 ? styles.selected : ""}`}>Holdings</p>
                        </Link>
                    </li>
                    <li>
                        <Link style={{textDecoration:"none"}} to="/dashboard/positions" onClick={()=>handleMenuClick(3)}>
                            <p className={`${styles.menu} ${selectedMenu === 3 ? styles.selected : ""}`}>Positions</p>
                        </Link>
                    </li>
                    <li>
                        <Link style={{textDecoration:"none"}} to="/dashboard/funds" onClick={()=>handleMenuClick(4)}>
                            <p className={`${styles.menu} ${selectedMenu === 4 ? styles.selected : ""}`}>Funds</p>
                        </Link>
                    </li>
                </ul>
                <hr />
                <div className={styles["profile"]} onClick={handleProfileClick} ref={profileRef}>
                    <div className={styles["avatar"]}>ZU</div>
                    <p className={`${styles.username} mt-3`}>{username}</p>
                </div>
                {isProfileDropdownOpen && (
                    <div className={styles["profile-dropdown"]}>
                        <button onClick={Logout}>Logout</button>
                    </div>
                )}
                <ToastContainer />
            </div>
        </div>
    );
}
export default Menu;