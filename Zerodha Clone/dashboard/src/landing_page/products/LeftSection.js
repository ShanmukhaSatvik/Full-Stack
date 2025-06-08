import { Link } from "react-router-dom";
function LeftSection({imageURL,productName,productDescription,tryDemo,learnMore,googlePlay,appStore}) {
    return (
        <div className="container">
            <div className="row">
                <div className="col-6 mt-5 mb-5">
                    <img src={imageURL} alt={productName}/>
                </div>
                <div className="col-2"></div>
                <div className="col-4 mt-5">
                    <h1>{productName}</h1>
                    <p className="mt-4" style={{lineHeight:"1.8rem"}}>{productDescription}</p>
                    {(tryDemo || learnMore) && (
                        <div>
                            {tryDemo && (
                                <a href={tryDemo} style={{textDecoration:"none",marginRight:"2rem"}}>Try demo <i class="fa-solid fa-long-arrow-right"></i></a>
                            )}
                            {learnMore && (
                                <a href={learnMore} style={{textDecoration:"none"}}>{productName === "Coin" ? "Coin" : "Learn more"} <i class="fa-solid fa-long-arrow-right"></i></a>
                            )}
                        </div>
                    )}
                    <div className="mt-3">
                        <Link to={googlePlay} target="_blank">
                        <img src="assets/googlePlayBadge.svg" alt="Google Play-Image"/>
                        </Link>
                        <Link to={appStore} target="_blank" className="mx-3">
                            <img src="assets/appstoreBadge.svg" alt="App Store-Image"/>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default LeftSection;