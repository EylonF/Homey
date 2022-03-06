import { HomePage } from './pages/HomePage.jsx'
import { Explore } from './pages/Explore.jsx'
import { LoginSignup } from './pages/LoginSignup.jsx'
import { StayDetails } from './pages/StayDetails.jsx'
import { Dashboard } from './pages/Dashboard.jsx'

import { StayPreview } from './cmps/StayPreview.jsx'

const routes = [
  {
    path:'/stay/:stayId',
    component: StayDetails,
  },
  {
    path: '/dashboard',
    component: Dashboard,
  },
  {
    path: '/explore',
    component: Explore,
  },
  {
    path: '/login',
    component: LoginSignup,
  },
  {
    path: '/',
    component: HomePage,
  },
]

export default routes
