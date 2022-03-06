import { httpService } from './http.service'
// import { storageService } from './async-storage.service'
// import {userService} from './user.service'
// import { socketService, SOCKET_EVENT_REVIEW_ADDED } from './socket.service'

export const reviewService = {
  add,
  query,
  remove,
  getReviewsAvg
}


// More ways to send query params:
// return axios.get('api/toy/?id=1223&balance=13')
// return axios.get('api/toy/?', {params: {id: 1223, balanse:13}})

function query(filterBy) {
  var queryStr = (!filterBy) ? '' : `?name=${filterBy.name}&sort=anaAref`
  return httpService.get(`review${queryStr}`)
  // return storageService.query('review')
}

function remove(reviewId) {
  return httpService.delete(`review/${reviewId}`)
  // return storageService.remove('review', reviewId)

}
async function add(review) {
  const addedReview = await httpService.post(`review`, review)

  // Only relevant when frontend-only
  // review.byUser = userService.getLoggedinUser()
  // review.aboutUser = await userService.getById(review.aboutUserId)
  // const addedReview = storageService.post('review', review)

  return addedReview
}

function getReviewsAvg(reviews){
  let reviewsAvg = {
      cleanliness: 0,
      communication: 0,
      "check-in": 0,
      accuracy: 0,
      location: 0,
      value: 0,
      total: 0
  }

  reviews.forEach(review => {
      reviewsAvg.cleanliness += review.rate.Cleanliness
      reviewsAvg.communication += review.rate.Communication
      reviewsAvg["check-in"] += review.rate["Check-in"]
      reviewsAvg.accuracy += review.rate.Accuracy
      reviewsAvg.location += review.rate.Location
      reviewsAvg.value += review.rate.Value
      reviewsAvg.total += (review.rate.Cleanliness + review.rate.Communication + review.rate["Check-in"] + review.rate.Accuracy + review.rate.Location + review.rate.Value) / 6
  });

  reviewsAvg.cleanliness = (reviewsAvg.cleanliness / reviews.length).toFixed(1)
  reviewsAvg.communication = (reviewsAvg.communication / reviews.length).toFixed(1)
  reviewsAvg["check-in"] = (reviewsAvg["check-in"] / reviews.length).toFixed(1)
  reviewsAvg.accuracy = (reviewsAvg.accuracy / reviews.length).toFixed(1)
  reviewsAvg.location = (reviewsAvg.location / reviews.length).toFixed(1)
  reviewsAvg.value = (reviewsAvg.value / reviews.length).toFixed(1)
  reviewsAvg.total = (reviewsAvg.total / reviews.length).toFixed(2)


  // console.log('reviewsAvg', reviewsAvg);

  return reviewsAvg
}

// This IIFE functions for Dev purposes 
// It allows testing of real time updates (such as sockets) by listening to storage events
// (async () => {
//   var reviews = await storageService.query('review')

//   // Dev Helper: Listens to when localStorage changes in OTHER browser
//   window.addEventListener('storage', async () => {
//     console.log('Storage updated');
//     const freshReviews = await storageService.query('review')
//     if (freshReviews.length === reviews.length + 1 ){
//       console.log('Review Added - localStorage updated from another browser')
//       socketService.emit(SOCKET_EVENT_REVIEW_ADDED, freshReviews[freshReviews.length-1])
//     }
//     reviews = freshReviews
//   });
// })()

