import {Link} from 'react-router-dom';
function Team() {
    return (
        <div className='container border-top mb-5'>
            <div className='row'>
                <h1 className='text-center mt-5 mb-5 fs-2'>People</h1>
            </div>
            <div className='row' style={{lineHeight:"1.8"}}>
                <div className='col-1'></div>
                <div className='col-4 text-center text-muted mt-3'>
                    <img src='assets/nithinKamath.jpg' alt='People-Image' style={{borderRadius:"100%",width:"80%"}}></img>
                    <h5 className='mt-3'>Nithin Kamath</h5>
                    <h6>Founder, CEO</h6>
                </div>
                <div className='col-6 mt-3 fs-6'>
                    <p>
                        Nithin bootstrapped and founded Zerodha in 2010 to overcome the hurdles he faced during his decade long stint as a trader. Today, Zerodha has changed the landscape of the Indian broking industry.
                    </p>
                    <p>
                        He is a member of the SEBI Secondary Market Advisory Committee (SMAC) and the Market Data Advisory Committee (MDAC).
                    </p>
                    <p>
                        Playing basketball is his zen.
                    </p>
                    <p>
                        Connect on <Link to='https://nithinkamath.me/' style={{textDecoration:"none"}}>  Homepage</Link>  /  <Link to='https://tradingqna.com/u/nithin/summary' style={{textDecoration:"none"}}>TradingQnA</Link>  /  <Link to='https://x.com/Nithin0dha' style={{textDecoration:"none"}}>Twitter</Link>
                    </p>
                </div>
                <div className='col-1'></div>
            </div>
        </div>
    );
}
export default Team;