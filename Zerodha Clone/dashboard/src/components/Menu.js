import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import styles from "../index.module.css";

function Menu() {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const profileRef = useRef(null);
  const [hasShownToast, setHasShownToast] = useState(false);
  const [cookies, removeCookie] = useCookies(["token"]);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleMenuClick = (uid) => setSelectedMenu(uid);
  const handleProfileClick = () => setIsProfileDropdownOpen(prev => !prev);

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
        return;
      }

      try {
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
          navigate("/login");
        }
      } catch (error) {
        console.error("Verification failed", error);
        removeCookie("token");
        navigate("/login");
      }
    };

    verifyCookie();

    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [cookies, navigate, removeCookie, hasShownToast]);

  const Logout = () => {
    removeCookie("token");
    navigate("/");
  };

  return (
    <div className={styles["menus-container"]}>
      <img src="/assets/logo.png" style={{ width: "50px" }} alt="Logo-Image" />
      <div className={styles["menus"]}>
        <ul>
          <li>
            <Link to="/dashboard/" onClick={() => handleMenuClick(0)} style={{ textDecoration: "none" }}>
              <p className={`${styles.menu} ${selectedMenu === 0 ? styles.selected : ""}`}>Dashboard</p>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/orders" onClick={() => handleMenuClick(1)} style={{ textDecoration: "none" }}>
              <p className={`${styles.menu} ${selectedMenu === 1 ? styles.selected : ""}`}>Orders</p>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/holdings" onClick={() => handleMenuClick(2)} style={{ textDecoration: "none" }}>
              <p className={`${styles.menu} ${selectedMenu === 2 ? styles.selected : ""}`}>Holdings</p>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/positions" onClick={() => handleMenuClick(3)} style={{ textDecoration: "none" }}>
              <p className={`${styles.menu} ${selectedMenu === 3 ? styles.selected : ""}`}>Positions</p>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/funds" onClick={() => handleMenuClick(4)} style={{ textDecoration: "none" }}>
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
