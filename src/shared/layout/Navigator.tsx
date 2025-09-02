import { useLocation, useNavigate } from 'react-router-dom'
import { House, ChartLine, NotepadText, ThumbsUp } from 'lucide-react'

const Navigator = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const isHome = location.pathname === '/'
  const isAnalysis = location.pathname === '/ai-estimation'
  const isSimulation = [
    '/couple',
    '/couple/register',
    '/couple/goal-detail',
    '/couple/goal-simulation-input',
    '/couple/goal-simulation-result',
  ].includes(location.pathname)
  const isRecommendation = location.pathname.startsWith('/product-recommendation')

  return (
    <nav className="w-full max-w-[412px] mx-auto h-20 flex justify-around border-t border-gray-800 fixed bottom-0 left-0 right-0 bg-white z-10 py-4">
      <div
        className="flex flex-col items-center cursor-pointer"
        onClick={() => navigate('/')}
      >
        <House className={`w-5 h-5 mb-2.5 ${isHome ? 'text-red-light' : 'text-gray-700 '}`} />
        <p className={`text-caption ${isHome ? 'text-red-light' : 'text-gray-700'}`}>홈</p>
      </div>

      <div
        className="flex flex-col items-center cursor-pointer"
        onClick={() => navigate('/ai-estimation')}
      >
        <ChartLine className={`w-5 h-5 mb-2.5 ${isAnalysis ? 'text-red-light' : 'text-gray-700 '}`} />
        <p className={`text-caption ${isAnalysis ? 'text-red-light' : 'text-gray-700'}`}>소비분석</p>
      </div>

      <div
        className="flex flex-col items-center cursor-pointer"
        onClick={() => navigate('/couple')}
      >
        <NotepadText className={`w-5 h-5 mb-2.5 ${isSimulation ? 'text-red-light' : 'text-gray-700'}`} />
        <p className={`text-caption ${isSimulation ? 'text-red-light' : 'text-gray-700'}`}>자산시뮬</p>
      </div>

      <div
        className="flex flex-col items-center cursor-pointer"
        onClick={() => navigate('/product-recommendation')}
      >
        <ThumbsUp className={`w-5 h-5 mb-2.5 ${isRecommendation ? 'text-red-light' : 'text-gray-700'}`} />
        <p className={`text-caption ${isRecommendation ? 'text-red-light' : 'text-gray-700'}`}>상품추천</p>
      </div>
    </nav>
  )
}

export default Navigator