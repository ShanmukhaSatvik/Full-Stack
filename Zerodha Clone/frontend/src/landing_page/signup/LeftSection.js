import { Link } from "react-router-dom";
function LeftSection({imageURL,productName,productDescription,label}) {
    return (
        <div className="container">
            <div className="row">
                <div className="col mt-5 mb-5">
                    <img src={imageURL} alt={productName} style={{width:"75%",marginLeft:"90px"}}/>
                </div>
                <div className="col mt-5">
                    <h2 className="text-muted">{productName}</h2>
                    <p className="mt-4 text-muted" style={{lineHeight:"1.8rem"}}>{productDescription}</p>
                    <i class="fas fa-info-circle"></i><span className="text-muted"> Available on</span>  
                    <div className="mt-3" onClick={() => window.location.href = "http://localhost:3001/"}>
                        <Link style={{color:"black",textDecoration:"none"}}>{label} <i className="fa-solid fa-long-arrow-right" style={{color:"blue"}}></i></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default LeftSection;