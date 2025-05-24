function Education() {
    return ( 
        <div className='container mt-5'>
            <div className='row'>
                <div className='col'>
                    <img src='assets/education.svg' alt='Education-Image' style={{width:"70%"}}></img>
                </div>
                <div className='col'>
                    <h1 className='mb-3 fs-2'>Free and open market education</h1>
                    <p>Varsity,the largest online stock market education book in the world covering everything from basics to advanced trading.</p>
                    <a href='#'style={{textDecoration:"none"}}>Versity <i class="fa-solid fa-long-arrow-right"></i></a>
                    <p className='mt-5'>Trading Q&A,the most active trading and investment community in India for all your market related queries.</p>
                    <a href='#'style={{textDecoration:"none"}}>TradingQ&A <i class="fa-solid fa-long-arrow-right"></i></a>
                </div>
            </div>
        </div>
    );
}
export default Education;