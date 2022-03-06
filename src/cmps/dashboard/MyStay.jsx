import { Link } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";

export function MyStays({ stays, onSelectedEditStay, onSelectAction }) {

    if (!stays) return <div className='loader'> <BeatLoader size={30} color={'#ff385c'} /></div>
    return (
        <section className="host-stay-container">
            <section className="host-stay-list">
                <div className="host-stay-list-table">
                    <div className="thead">
                        <div>
                            <span>{''}</span>
                            <span>Name</span>
                            <span>Address</span>
                            <span>Price</span>
                            <span className="stay-actions" >Actions</span>
                        </div>
                    </div>
                    <div className="tbody">
                        {!stays.length && <h1 className="empty-msg">No Stays to show yet, you can add new stay on the <button value='add stay' onClick={onSelectAction}>Add Stay </button> tab</h1>}
                        {(stays.length > 0) && stays.map(stay => {
                            return (
                                // <p>{stay.name}</p>
                                <div className="host-stay-preview">
                                <span><img src={stay.imgUrls[0]} alt="stay" /></span>
                                <span><Link to={`/stay/${stay._id}`}>{stay.name}</Link></span>
                                <span><Link to={`/stay/${stay._id}`}>{stay.loc.address}</Link></span>
                                <span><Link to={`/stay/${stay._id}`}>$ {stay.price}</Link></span>
                                <span className="stay-actions">
                                    <button onClick={() => onSelectedEditStay(stay)} ><i className="far fa-edit"></i>Edit</button>
                                </span>
                            </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </section>
    )
}
