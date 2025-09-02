import { Routes, Route } from 'react-router-dom'

import Header from './shared/layout/Header'
import Layout from './shared/layout/Layout'
import Navigator from './shared/layout/Navigator'

// ─── 페이지 컴포넌트 import ─────────────────────────────

// home
import HomePage from './pages/home/page'

// auth
import LoginPage from './pages/auth/login/page'
import SignupPage from './pages/auth/signup/page'

// account
import AccountRegisterPage from './pages/account-register/page'

// couple
import CoupleDashboardPage from './pages/couple/dashboard/page'
import CoupleRegisterPage from './pages/couple/register/page'
import GoalDetailPage from './pages/couple/goal-detail/page'
import GoalSimulationInputPage from './pages/couple/goal-simulation-input/page'
import GoalSimulationResultPage from './pages/couple/goal-simulation-result/page'

// AI
import AiEstimationPage from './pages/ai-estimation/page'

// community
import PostDashboardPage from './pages/community/dashboard/page'
import PostDetailPage from './pages/community/post-detail/page'
import PostListPage from './pages/community/post-list/page'
import PostWritePage from './pages/community/post-write/page'

// consumption
import SpendingAnalysisPage from './pages/spending-analysis/page'

// notification
import NotificationPage from './pages/notification/page'

// product recommendation
import ProductRecommendationDashboardPage from './pages/product-recommendation/dashboard/page'
import ProductRecommendationDetailPage from './pages/product-recommendation/detail/page'

// user
import UserPage from './pages/user/page'

// wedding-guied
import WeddingDetailPage from './pages/wedding-guide/wedding-detail/page'
import WeddingGuideDashboardPage from './pages/wedding-guide/dashboard/page'
import WeddingTipPage from './pages/wedding-guide/wedding-tip/page'

// test
import TestPage from './pages/_test/page'

function App() {
  return (
    <div className="mx-auto max-w-[412px] min-h-screen bg-white overflow-x-hidden">
      <Header/>
      <Layout>
        <Routes>
          {/* ───── Home ───── */}
          <Route path="/" element={<HomePage />} />

          {/* ───── Auth ───── */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* ───── Account ───── */}
          <Route path="/account-register" element={<AccountRegisterPage />} />

          {/* ───── Couple ───── */}
          <Route path="/couple/dashboard" element={<CoupleDashboardPage />} />
          <Route path="/couple/register" element={<CoupleRegisterPage />} />
          <Route path="/couple/goal-detail/:id" element={<GoalDetailPage />} />
          <Route path="/couple/goal-simulation-input" element={<GoalSimulationInputPage />} />
          <Route path="/couple/goal-simulation-result" element={<GoalSimulationResultPage />} />

          {/* ───── AI Estimation ───── */}
          <Route path="/ai-estimation" element={<AiEstimationPage />} />

          {/* ───── Community ───── */}
          <Route path="/community/dashboard" element={<PostDashboardPage />} />
          <Route path="/community/list/:category" element={<PostListPage />} />
          <Route path="/community/write/:category" element={<PostWritePage />} />
          <Route path="/community/detail/:id" element={<PostDetailPage />} />

          {/* ───── Consumption Analysis ───── */}
          <Route path="/spending-analysis" element={<SpendingAnalysisPage />} />

          {/* ───── NotificationPage  ───── */}
          <Route path="/notification" element={<NotificationPage />} />
          {/* ───── Product Recommendation ───── */}
          <Route path="/product-recommendation" element={<ProductRecommendationDashboardPage />} />
          <Route path="/product-recommendation/detail/:id" element={<ProductRecommendationDetailPage />} />

          {/* ───── User ───── */}
          <Route path="/user" element={<UserPage />} />
          
          {/* ───── Wedding Guide ───── */}
          <Route path="/wedding/dashboard" element={<WeddingGuideDashboardPage />} />
          <Route path="/wedding/detail/:id" element={<WeddingDetailPage />} />
          <Route path="/wedding/tip" element={<WeddingTipPage />} />

          {/* ───── Wedding Guide ───── */}
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </Layout>
      <Navigator />
    </div>
  )
}

export default App