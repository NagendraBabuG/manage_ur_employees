import {Routes, Route} from 'react-router-dom'
import { redirect } from 'react-router-dom'
import Home from './components/home/home'
import Navigation from './components/navBar/navi'
//import Navigation from './components/navBar/navigate'
import About from './components/about'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Profile from './components/profile/profile'

import { useCookies } from 'react-cookie'
import Dashboard from './components/dashboard/dashboard'
//import Dashboard from './components/aDashboard/aDashboard'
//import Dashboard from './components/dashboard/dashboard'
import Signin from './components/sign-in-form/signIn'

import Signup from './components/sign-up-form/signup'
import './components/styleSheets/App.css'

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["nbk"]);
  return (
    <div className='App'>

      <Routes>
        <Route path='/' element = {<Navigation/>}>
              <Route index element = {<Home />} />
              <Route path='about' element = {<About/>} />
              <Route path='signin' element = {<Signin/>} />
                           <Route path='signup' element = {<Signup/>} />
              <Route path='dashboard' element={<Dashboard/>}/>
              <Route path='profile' element={<Profile/>}/>
        </Route>
      </Routes>
    </div>
     
  );
}
// <protectedRoute path='/dashboard' auth= {cookies.nbk} component={Dashboard}/>

const protectedRoute = ({auth, component: Component, ...rest})=> {
      return (<Route {...rest} render = {()=>auth? (<Component/>):
    (<redirect to='/signin'/>)
    }
    />)

}
export default App;
