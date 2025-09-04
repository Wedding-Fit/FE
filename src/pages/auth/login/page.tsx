import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Input } from "../../../shared/components/Input"
import Button from "../../../shared/components/Button"
import type { SignInRequest } from "../_entities/auth.entity"
import { signIn } from "../_features/service/login.service"
import StatusModal from "../../../shared/components/StatusModal"
import { useAuthStore } from "../_entities/auth.store"

const LoginPage = () => {
  const navigate = useNavigate()
  const { setAuth } = useAuthStore()

  const [loginId, setLoginId] = useState("")
  const [password, setPassword] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const handleSubmit = async () => {
      const data: SignInRequest = {
        loginId,
        password,
      }
      try {
        const res = await signIn(data)
        if (res.code === 200 && res.data) {
          setAuth(res.data) 
          setModalOpen(true) 
        }
      } catch (err: any) {
        setSubmitError("로그인에 실패했습니다.")
      }
    }

  return (
    <main className="flex flex-col items-center justify-center h-[640px] gap-5">
      <div className="flex flex-col items-center justify-center mb-20">
        <p className="text-title">로그인</p>
        <p className="text-description">결혼 준비를 하는 당신을 위한 딱 맞춘 금융 서비스</p>
      </div>

      <Input
          placeholder="example@email.com"
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
        />
        <Input
          type="password"
          placeholder="비밀번호 입력"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="w-3/5 flex justify-between items-center gap-4 text-gray-700 text-body ml-5">
          <button className="underline cursor-pointer">회원가입</button>
          <span className="text-gray-300">|</span>
          <button className="underline cursor-pointer">비밀번호 찾기</button>
        </div>
        
        {submitError && <p className="text-red-500">{submitError}</p>}
        <Button onClick={handleSubmit}>로그인</Button>

        <StatusModal
          isOpen={modalOpen}
          statusCode={200}
          message="로그인이 완료되었습니다!"
          onClose={() => setModalOpen(false)}
          onStart={() => {
            const { coupleId } = useAuthStore.getState()
            navigate(coupleId ? "/" : "/couple") 
          }}
        />
    </main>
  )
}

export default LoginPage