import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Input } from "../../../shared/components/Input"
import MiniButton from "../../../shared/components/MiniButton"
import DatePicker from "../../../shared/components/DatePicker"
import { RadioGroup } from "../../../shared/components/RadioGroup"
import Button from "../../../shared/components/Button"
import StatusModal from "../../../shared/components/StatusModal"
import { signUp, checkIdDuplicate, checkNicknameDuplicate } from "../_features/service/signup.service"
import type { SignUpRequest } from "../_entities/auth.entity"

const SignupPage = () => {
  const navigate = useNavigate()

  const [loginId, setLoginId] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [nickname, setNickname] = useState("")
  const [birth, setBirth] = useState("")
  const [gender, setGender] = useState<"MALE" | "FEMALE">("MALE")
  const [phoneNumber, setPhoneNumber] = useState("")

  const [loginIdError, setLoginIdError] = useState("")
  const [nicknameError, setNicknameError] = useState("")

  const [modalOpen, setModalOpen] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const handleCheckId = async () => {
    try {
      await checkIdDuplicate(loginId)
      alert("사용 가능한 ID입니다.")
      setLoginIdError("")
    } catch (err: any) {
      setLoginIdError("이미 존재하는 아이디입니다")
    }
  }

  const handleCheckNickname = async () => {
    try {
      await checkNicknameDuplicate(nickname)
      alert("사용 가능한 닉네임입니다.")
      setNicknameError("")
    } catch (err: any) {
      setNicknameError("이미 존재하는 닉네임입니다")
    }
  }

  const handleSubmit = async () => {
    const data: SignUpRequest = {
      loginId,
      password,
      name,
      nickname,
      birth,
      gender,
      phoneNumber,
    }
    console.log(data)
    try {
      const res = await signUp(data)
      if(res.code === 201)setModalOpen(true)
    } catch (err: any) {
      setSubmitError("회원가입에 실패했습니다.")
    }
  }

  return (
    <main className="flex flex-col gap-5">
      <div className="flex flex-col items-center justify-center">
        <p className="text-title">회원가입</p>
        <p className="text-description">결혼 준비를 하는 당신을 위한 딱 맞춘 금융 서비스</p>
        <p className="text-description">지금부터 함께 해요!</p>
      </div>

      <div className="flex flex-row gap-2.5 items-center">
        <Input
          label="ID"
          placeholder="example@email.com"
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
          error={loginIdError}
        />
        <MiniButton className="mt-8" onClick={handleCheckId}>중복 확인</MiniButton>
      </div>

      <Input
        label="비밀번호"
        type="password"
        placeholder="비밀번호 입력"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Input
        label="휴대폰 번호"
        placeholder="010-0000-0000"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />

      <Input
        label="이름"
        placeholder="실명 입력"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <div className="flex flex-row gap-2 items-center">
        <Input
          label="닉네임"
          placeholder="사용할 닉네임 입력"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          error={nicknameError}
        />
        <MiniButton className="mt-8" onClick={handleCheckNickname}>중복 확인</MiniButton>
      </div>

      <RadioGroup
        name="gender"
        label="성별"
        options={[
          { value: "MALE", label: "남자" },
          { value: "FEMALE", label: "여자" },
        ]}
        value={gender}
        onChange={(value) => setGender(value as "MALE" | "FEMALE")}
      />
      <div>
        <p className="text-subTitle mb-2.5">생년월일</p>
        <DatePicker
          value={birth}
          onChange={setBirth}
          placeholder="YYYY-MM-DD"
        />
      </div>

      {submitError && <p className="text-red-500">{submitError}</p>}

      <Button onClick={handleSubmit} className="w-full mb-5">
        회원가입
      </Button> 

      <StatusModal
        isOpen={modalOpen}
        statusCode={200}
        message="회원가입이 완료되었습니다!"
        onClose={() => setModalOpen(false)}
        onStart={() => navigate("/login")}
      />
    </main>
  )
}

export default SignupPage