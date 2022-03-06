import { stayService } from '../services/stay.service.js'

export function loadStays(filterBy) {
  return async (dispatch) => {
    try {
      // console.log('filter in action',filterBy)
      const stays = await stayService.query(filterBy)
      dispatch({ type: 'SET_STAYS', stays })
    } catch (err) {
      console.dir(err)
    }
  }
}

// export function setSort(sort) {
//   return (dispatch) => {
//     dispatch({ type: 'SET_SORT', sort })
//   }
// }
