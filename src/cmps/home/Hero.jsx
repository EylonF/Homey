import { Link } from "react-router-dom";


export function Hero({ loadStays, addTrip }) {

    async function explorAll() {
        const trip = {
            guests: { adults: 1, kids: 0 },
            loc: { address: '' },
            time: { checkIn: '', checkOut: '' }
        }
        await addTrip(trip)
        loadStays()
    }

    return (

        <section className="main-hero-container ">
            <div className="main-hero">

                <div className="hero-action">
                <h1>Not sure where to go? Perfect.</h1>
                <button className='hero-btn clean-link btn-outline-primary' ><Link to={`/explore?location=&minPrice=-Infinity&maxPrice=Infinity`}>I'm flexible</Link></button>
                </div>
            </div>
            
        </section>
        
    )
}