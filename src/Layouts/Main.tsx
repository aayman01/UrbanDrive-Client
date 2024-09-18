import { Outlet } from 'react-router-dom'

const Main = () => {
  return (
    <div>
      <div>
        <Outlet />
        {/*footer*/}
      </div>
    </div>
  )
}

export default Main