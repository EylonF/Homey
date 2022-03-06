import Avatar from '@mui/material/Avatar';
import { utilService } from '../../services/util.service.js'


export function ReviewList({stay}) {
    console.log(stay)
    return (
        <div className="review-list">
            {stay.reviews.map(review => {
                return <div className="review-card" key={review.id}>
                    <div className="review-card-header">
                        <Avatar className="user-img" src={review.by.imgUrl} />
                        <div>
                            <h3>{review.by.fullname}</h3>
                            <small>{utilService.getDateFromTimeStemp(review.createdAt)}</small>
                        </div>
                    </div>
                    <p>{review.txt}</p>
                </div>
            })}
        </div>
    )
}