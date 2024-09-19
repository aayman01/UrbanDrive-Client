import { Outlet } from 'react-router-dom'
import Footer from '../Shared/Footer'

const Main = () => {
  return (
    <div>
      <div>
        <Outlet />
      </div>
      {/* footer */}
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default Main