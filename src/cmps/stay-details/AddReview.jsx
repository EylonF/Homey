import { Component } from 'react'
import Avatar from '@mui/material/Avatar';

import { userService } from '../../services/user.service.js'


export class AddReview extends Component {

    state = {
        // loggedInUser: null,
        review: {
            txt: '',
            rate: {
                Cleanliness: null,
                Communication: null,
                "Check-in": null,
                Accuracy: null,
                Location: null,
                Value: null
            }
        }
    }

    // componentDidMount(){
    //     const {loggedinUser} = this.props
    //     this.setState({ loggedInUser});
    // }

    handleChange = ({ target }) => {
        const { value } = target;
        this.setState({ review: { ...this.state.review, txt: value } }, () => console.log('this.state.review.txt', this.state.review.txt));
    };
    sendReview = () => {
        let { review } = this.state;
        let { loggedinUser } = this.props;
        review.by = {
            _id: loggedinUser._id,
            fullname: loggedinUser.fullname,
            imgUrl: loggedinUser.imgUrl
        }
        this.props.addGuestReview(review)

    };

    render() {
        const { review } = this.state
        const { loggedinUser } = this.props
        const imgUrl = (loggedinUser)? loggedinUser.imgUrl:'/broken-image.jpg'
        const fullname = (loggedinUser) ? loggedinUser.fullname : 'Guest'

        return (
            <section className="add-review">
                <h2>Add Review</h2>
                <div className="loggedin-user">

                <Avatar src={imgUrl} />

                <h3>{fullname}</h3>
                </div>


                <textarea
                    type="text"
                    name="txt"
                    autoComplete="off"
                    onChange={this.handleChange}
                    value={review.txt}
                    placeholder="Write your opinion about this stay..."

                />

                <button onClick={this.sendReview}> send </button>
            </section>
        )
    }

}
