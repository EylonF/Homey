
import React from 'react'
import queryString from 'query-string'
import { withRouter } from 'react-router-dom';
import { reviewService } from '../services/review.service.js'
import { StayGallery } from './StayGallery.jsx'


class _StayPreview extends React.Component{

    
    render(){
        const{stay}= this.props
        const {location,checkIn,checkOut,guests} = queryString.parse(this.props.location.search)
        const rate = reviewService.getReviewsAvg(stay.reviews)
        return (
            <article className=" stay-preview-container" onClick={(ev) => {
                if (ev.target.className === 'control-arrow control-next' || ev.target.className === 'control-arrow control-prev') return
                this.props.history.push(`/stay/${this.props.stay._id}?location=${location}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`)}}>
                <div className="stay-preview-card">
                    <StayGallery stay={stay}/>
                    <div className="stay-preview-info">
                        <span className="stay-preview-rate">
                            <i className="fas fa-star"></i>
                            <p className="rate">{rate.total}</p>
                            <p className="rate-length">({stay.reviews.length})</p>
                        </span>
                        <p>
                            <span className="stay-type">{stay.type}</span>
                            <span className="dot">•</span>
                            <span className="stay-loc">{stay.loc.address.substring(0, stay.loc.address.indexOf(','))}</span>
                        </p>
                        <p className="stay-name">{stay.name}</p>
                        <p className="stay-price"><span>${stay.price}</span> / night</p>
                    </div>
                </div>
            </article>
        )
    }
}

export const StayPreview = withRouter(_StayPreview)
