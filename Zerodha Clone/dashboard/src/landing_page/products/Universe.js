import {Link} from 'react-router-dom';
function Universe() {
    return (
        <div className="container mt-5 mb-5 border-top">
            <div className="row mt-5 text-center">
                <h1>The Zerodha Universe</h1>
                <p className='mt-3'>Extend your trading and investment experience even further with our partner platforms</p>
            </div>
            <div className='row text-center text-muted mt-5' style={{fontSize:"0.8rem"}}>
                <div className='col'>
                    <Link to="https://www.zerodhafundhouse.com/" target="_blank">
                        <img src='assets/zerodhaFundhouse.png' alt='Zerodha Fund House-Image' style={{ width: "50%" }} />
                    </Link>
                    <p className='mt-5'>Our asset management venture <br/>that is creating simple and transparent index <br/>funds to help you save for your goals.</p>
                </div>
                <div className='col'>
                    <Link to="https://sensibull.com/" target="_blank">
                        <img src='assets/sensibullLogo.svg' alt='SensiBull-Image' style={{ width: "75%" }} />
                    </Link>
                    <p className='mt-5'>Options trading platform that lets you <br/>create strategies, analyze positions, and examine <br/>data points like open interest, FII/DII, and more.</p>
                </div>
                <div className='col'>
                    <Link to="https://www.tijorifinance.com/ideas-dashboard/" target="_blank">
                        <img src='assets/tijori.svg' alt='Tijori-Image' style={{ width: "55%" }} />
                    </Link>
                    <p className='mt-4'>Investment research platform <br/>that offers detailed insights on stocks,<br/> sectors, supply chains, and more.</p>
                </div>
            </div>
            <div className='row text-center text-muted mt-5 mb-5' style={{fontSize:"0.8rem"}}>
                <div className='col'>
                    <Link to="https://www.streak.tech/home" target="_blank">
                        <img src='assets/streakLogo.png' alt='Streak-Image' style={{ width: "50%" }} />
                    </Link>
                    <p className='mt-5'>Systematic trading platform<br/> that allows you to create and backtest<br/> strategies without coding.</p>
                </div>
                <div className='col'>
                    <Link to="https://smallcase.zerodha.com/" target="_blank">
                        <img src='assets/smallcaseLogo.png' alt='Smallcase-Image' style={{ width: "65%" }} />
                    </Link>
                    <p className='mt-5'>Thematic investing platform<br/> that helps you invest in diversified<br/> basktets of stocks on ETFs.</p>
                </div>
                <div className='col'>
                    <Link to="https://joinditto.in/" target="_blank">
                        <img src='assets/dittoLogo.png' alt='Ditto-Image' style={{ width: "45%" }} />
                    </Link>
                    <p className='mt-5'>Personalized advice on life<br/> and health insurance. No spam<br/> and no mis-selling.</p>
                </div>
            </div>
            <div style={{display:"flex",alignItems:"center"}} onClick={() => window.location.href = "http://localhost:3000/signup"}>
                <button style={{width:"20%",margin:'0 auto'}} className='p-2 btn btn-primary fs-5 mb-5'>Sign up for free</button>
            </div>
        </div>
    );
}
export default Universe;