import { useState,useEffect,useRef } from "react";
import { Link,useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
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
          window.location.href = "https://frontend-idk2.onrender.com/login";
          return;
        }
        const { data } = await axios.post(
          "https://backend-a4bn.onrender.com",
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
            window.location.href = "https://frontend-idk2.onrender.com/login";
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
      window.location.href = "https://frontend-idk2.onrender.com";
    };
    const menuClass="menu";
    const activeMenuClass="menu selected";
    return (
        <div className="menus-container">
            <img src="/assets/logo.png" style={{ width: "50px" }} alt="Logo-Image"/>
            <div className="menus">
                <ul>
                    <li>
                        <Link style={{textDecoration:"none"}} to="/" onClick={()=>handleMenuClick(0)}>
                            <p className={selectedMenu===0?activeMenuClass:menuClass}>Dashboard</p>
                        </Link>
                    </li>
                    <li>
                        <Link style={{textDecoration:"none"}} to="/orders" onClick={()=>handleMenuClick(1)}>
                            <p className={selectedMenu===1?activeMenuClass:menuClass}>Orders</p>
                        </Link>
                    </li>
                    <li>
                        <Link style={{textDecoration:"none"}} to="/holdings" onClick={()=>handleMenuClick(2)}>
                            <p className={selectedMenu===2?activeMenuClass:menuClass}>Holdings</p>
                        </Link>
                    </li>
                    <li>
                        <Link style={{textDecoration:"none"}} to="/positions" onClick={()=>handleMenuClick(3)}>
                            <p className={selectedMenu===3?activeMenuClass:menuClass}>Positions</p>
                        </Link>
                    </li>
                    <li>
                        <Link style={{textDecoration:"none"}} to="/funds" onClick={()=>handleMenuClick(4)}>
                            <p className={selectedMenu===4?activeMenuClass:menuClass}>Funds</p>
                        </Link>
                    </li>
                </ul>
                <hr />
                <div className="profile" onClick={handleProfileClick} ref={profileRef}>
                    <div className="avatar">ZU</div>
                    <p className="username mt-3">{username}</p>
                </div>
                {isProfileDropdownOpen && (
                    <div className="profile-dropdown">
                        <button onClick={Logout}>Logout</button>
                    </div>
                )}
                <ToastContainer />
            </div>
        </div>
    );
}
export default Menu;