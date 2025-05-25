import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
function Orders() {
    const [allOrders, setAllOrders] = useState([]);
    useEffect(() => {
        const fetchOrders=()=>{
            axios.get("https://backend-a4bn.onrender.com/allOrders")
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
            <div className="orders">
                <div className="no-orders">
                    <p>You haven't placed any orders today</p>
                    <Link to={"/"} className="btn">
                        Get started
                    </Link>
                </div>
            </div>)
            : (
                <>
                    <h3 className="title">Open orders ({allOrders.length})</h3>
                    <div className="order-table">
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
                                const typeClass=isBuy?"profit":"loss";
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