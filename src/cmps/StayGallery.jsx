import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import {FiHeart} from 'react-icons/fi'

// || ev.target.className.baseVal === 'MuiSvgIcon-root'
export class StayGallery extends Component {
    
    
    render() {
        return (
            <div>
                <Carousel showThumbs={false} showIndicators={false} showStatus={false} infiniteLoop={true}>
                    {this.props.stay.imgUrls.map((imgUrl,idx) => {
                        return (
                            <div key={idx}>
                                <img src={imgUrl}/>
                                {/* <FiHeart/>   */}
                            </div>
                        )
                    })}
                </Carousel>
            </div>
        );
    }
};


// import ImageGallery from 'react-image-gallery';


// export class StayGallery extends React.Component {

//     render() {
//         const images = []
//         let item
//         this.props.stay.imgUrls.forEach((imgUrl,idx)=>{
//             item = {origin:imgUrl}
//             images[idx] = item
//         })
//         console.log(images)
//         return <ImageGallery showThumbnails={false} showBullets={false} stopPropagation={true} items={images} />;
//     }
// }




// classNames="date-picker-2"
//                 rangeColors={"black"}
//                 color={"black"}
//                 className="date-pick"
//                 ranges={[selectionRange]}
//                 onChange={this.handleSelect}






