import {StayPreview} from './StayPreview.jsx'

export function StayList({stays}) {

    return (
        <section className="stay-list card-grid">
            {stays.map(stay => <StayPreview key={stay._id} stay={stay}/>)}
        </section>
    )
}