import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const PrivateRouter = () => {
  const { userId } = useSelector((state) => state.auth)

  return !!userId ? <Outlet /> : <Navigate to="/" />
}

export default PrivateRouter
