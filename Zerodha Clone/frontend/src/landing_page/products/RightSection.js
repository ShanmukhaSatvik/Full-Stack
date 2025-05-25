function RightSection({imageURL,productName,productDescription,learnMore}) {
    return (
        <div className="container">
            <div className="row">
                <div className="col-4 mt-5 mb-5">
                    <h1>{productName}</h1>
                    <p className="mt-4" style={{lineHeight:"1.8rem"}}>{productDescription}</p>
                    <div>
                        <a href={learnMore} style={{textDecoration:"none"}}>{productName === "Console" ? "Learn more" : "Kite Connect "}  <i className="fa-solid fa-long-arrow-right"></i></a>
                    </div>
                </div>
                <div className="col-2"></div>
                <div className="col-6 mb-5">
                    <img src={imageURL} alt={productName} style={{width:"100%"}}/>
                </div>
            </div>
        </div>
    );
}
export default RightSection;