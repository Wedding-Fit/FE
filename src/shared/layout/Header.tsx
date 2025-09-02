import { useLocation, useNavigate } from 'react-router-dom'
import { Bell, User } from 'lucide-react'

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const isMinimal = ['/login', '/signup', '/couple/register'].includes(location.pathname)

  const goUser = () =>{
    navigate("/user")
  }
  const goNotification = () =>{
    navigate("/notification")
  }
  return (
    <header className="w-full max-w-[412px] mx-auto h-20 px-4 flex items-center justify-between bg-white fixed top-0 left-0 right-0 z-10">
      <img src="/logo.png" alt="Logo" className="h-8 w-auto object-contain" />

      {!isMinimal && (
        <div className="flex gap-4">
          <Bell onClick={goNotification} className="w-6 h-6" />
          <User onClick={goUser} className="w-6 h-6" />
        </div>
      )}
    </header>
  )
}
export default Header