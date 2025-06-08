import { Link } from "react-router-dom";
function RightSection({imageURL,productName,productDescription,label}) {
    return (
        <div className="container">
            <div className="row">
                <div className="col mt-5">
                    <h1>{productName}</h1>
                    <p className="mt-4" style={{lineHeight:"1.8rem"}}>{productDescription}</p>
                    <p><i class="fas fa-info-circle"></i> Available on</p>  
                    <div onClick={() => window.location.href = "http://localhost:3001/"}>
                        <Link style={{color:"black",textDecoration:"none"}}>{label} <i className="fa-solid fa-long-arrow-right" style={{color:"blue"}}></i></Link>
                    </div>
                </div>
                <div className="col mt-5 mb-5">
                    <img src={imageURL} alt={productName} style={{width:"85%",marginLeft:"40px"}}/>
                </div>
            </div>
        </div>
    );
}
export default RightSection;