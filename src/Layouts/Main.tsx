import { Outlet } from 'react-router-dom'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'


const Main = () => {
  return (
    <div>
      <div>
      <Navbar></Navbar>
      </div>
      <div className='mx-auto min-h-[calc(100vh-68px)]'>
        <Outlet />
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  )
}

export default Main