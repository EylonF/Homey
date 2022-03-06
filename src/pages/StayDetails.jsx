

import React from 'react'
import { connect } from 'react-redux'
import { setAppState } from '../store/app.action.js'
import { userUpdate } from '../store/user.action.js'
import { addOrder } from '../store/order.action.js'

import BeatLoader from "react-spinners/BeatLoader";
import LinearProgress from '@mui/material/LinearProgress';
import { AiFillStar } from 'react-icons/ai';


import { stayService } from '../services/stay.service.js'
import { reviewService } from '../services/review.service.js'
import { StayOrder } from '../cmps/stay-details/StayOrder.jsx'
import { StayInfo } from '../cmps/stay-details/StayInfo.jsx'
import { ReviewList } from '../cmps/stay-details/ReviewList.jsx'
import { AddReview } from '../cmps/stay-details/AddReview.jsx'

class _StayDetails extends React.Component {
    state = {
        stay: null,
        // reviews: [],

    }


    componentDidMount() {
        this.loadStay()
    
        this.props.setAppState({ isFullHeader: false, isHomePageTop: false, currPage: 'stay' })

    }

    loadStay = () => {
        const { stayId } = this.props.match.params
        console.log('stayId',stayId)
        stayService.getById(stayId).then((stay) => {

            this.setState({ stay })
        })
        // , () => { console.log('the state after stay', this.state) }
    }

    addGuestReview = (review) => {
        let reviews = [...this.state.stay.reviews, review]
        // reviews.push(review)
        review.createdAt = Date.now() / 1000
        this.setState((prevState) => {
            return { stay: { ...prevState.stay, reviews } }
        })


    }

    render() {
        const { stay } = this.state
        const { loggedinUser,userUpdate,addOrder } = this.props

        // return <div className='loader'> <BeatLoader size={30} color={'#ff385c'}/></div>
        if (!stay) return <div className='loader'> <BeatLoader size={30} color={'#ff385c'}/></div>
        const reviewsAvg = reviewService.getReviewsAvg(stay.reviews)

        return (
            <div className="stay-details">

                <section className="title">
                    <h1>{stay.name}</h1>
                    <div className="subtitle">

                        <AiFillStar />
                        <p> {reviewsAvg.total} ({stay.reviews.length} reviews)</p>
                        <p>∙</p>
                        <p>{stay.loc.address}</p>
                    </div>
                </section>

                <section className="gallery">
                    {stay.imgUrls.map((imgUrl, idx) => <img src={imgUrl} alt="" key={idx} />)}
                </section>

                <div className="info-order-container">
                    <StayInfo stay={stay} />
                    <StayOrder stay={stay} reviewsAvg={reviewsAvg.total} loggedinUser={loggedinUser} addOrder={addOrder} />
                </div>

                <section className="reviews">
                    <h2><AiFillStar /> {reviewsAvg.total} ({stay.reviews.length} reviews)</h2>
                    <div className="review-statistics">
                        <div className="statistic-container">
                            <p>Cleanliness</p>
                            {/* <div className="statistic-rate">{reviewsAvg.cleanliness}</div> */}
                            <div className="statistic-rate"><LinearProgress color="inherit" variant="determinate" value={reviewsAvg.cleanliness*20} /><p>{reviewsAvg.cleanliness}</p></div>
                        </div>
                        <div className="statistic-container">
                            <p>Accuracy</p>
                            {/* <div className="statistic-rate">{reviewsAvg.accuracy}</div> */}
                            <div className="statistic-rate"><LinearProgress color="inherit" variant="determinate" value={reviewsAvg.accuracy*20} /><p>{reviewsAvg.accuracy}</p></div>
                        </div>
                        <div className="statistic-container">
                            <p>Communication</p>

                            {/* <div className="statistic-rate">{reviewsAvg.communication}</div> */}
                            <div className="statistic-rate"><LinearProgress color="inherit" variant="determinate" value={reviewsAvg.communication*20} /><p>{reviewsAvg.communication}</p></div>
                        </div>
                        <div className="statistic-container">
                            <p>Location</p>

                            {/* <div className="statistic-rate">{reviewsAvg.location}</div> */}
                            <div className="statistic-rate"><LinearProgress color="inherit" variant="determinate" value={reviewsAvg.location*20} /><p>{reviewsAvg.location}</p></div>
                        </div>
                        <div className="statistic-container">
                            <p>Check-in</p>
                            
                            {/* <p className="statistic-bar"></p> */}
                            <div className="statistic-rate"><LinearProgress color="inherit" variant="determinate" value={reviewsAvg["check-in"]*20} /><p>{reviewsAvg["check-in"]}</p></div>
                        </div>
                        <div className="statistic-container">
                            <p>Value</p>

                            {/* <div className="statistic-rate">{reviewsAvg.value}</div> */}
                            <div className="statistic-rate"><LinearProgress variant="determinate" color="inherit" value={reviewsAvg.value*20} /><p>{reviewsAvg.value}</p></div>
                        </div>
                    </div>

                    <ReviewList stay={stay} />

                </section>

                <AddReview addGuestReview={this.addGuestReview} loggedinUser={loggedinUser}/>



            </div>

        )
    }

}

function mapStateToProps({ appModule,userModule }) {
    return {
        isFullHeader: appModule.isFullHeader,
        currPage: appModule.currPage,
        loggedinUser: userModule.loggedinUser,

    }
}

const mapDispatchToProps = {
    setAppState,
    userUpdate,
    addOrder
}


export const StayDetails = connect(mapStateToProps, mapDispatchToProps)(_StayDetails)
