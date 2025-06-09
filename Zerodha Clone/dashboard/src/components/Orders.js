import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../index.module.css";
function Orders() {
    const [allOrders, setAllOrders] = useState([]);
    useEffect(() => {
        const fetchOrders=()=>{
            axios.get("https://backend-9mwf.onrender.com/allOrders", { withCredentials: true })
            .then((res) => {
                setAllOrders(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        };
        fetchOrders();
        const intervalId = setInterval(fetchOrders, 1000);
        return () => clearInterval(intervalId);
    }, []);
    return (
        allOrders.length === 0 ? (
            <div className={styles["orders"]}>
                <div className={styles["no-orders"]}>
                    <p>You haven't placed any orders today</p>
                    <Link to={"/"} className={styles["btn"]}>
                        Get started
                    </Link>
                </div>
            </div>)
            : (
                <>
                    <h3 className={styles["title"]}>Open orders ({allOrders.length})</h3>
                    <div className={styles["order-table"]}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Instrument</th>
                                    <th>Type</th>
                                    <th>Qty.</th>
                                    <th>Price</th>
                                    <th>Time</th>
                                </tr>
                            </thead>
                            <tbody>
                            {allOrders.map((stock, index) => {
                                const isBuy=stock.mode==="BUY";
                                const typeClass=isBuy? styles.profit : styles.loss;
                                return (
                                    <tr key={index}>
                                        <td>{stock.name}</td>
                                        <td className={typeClass}>{stock.mode}</td>
                                        <td>{stock.qty}</td>
                                        <td>{stock.price.toFixed(2)}</td>
                                        <td>{new Date(stock.createdAt).toLocaleString()}</td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                </>
            )
    )
}
export default Orders;