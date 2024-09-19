import { Outlet } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'



const Main = () => {
  return (
    <div>
      <div>
      <Navbar></Navbar>
      </div>
      <div className=' mx-auto min-h-[calc(100vh-68px)]'>
        <Outlet />
      </div>
      {/* footer */}
      <div>
        <Footer/>
      </div>
    </div>
  )
}

export default Main