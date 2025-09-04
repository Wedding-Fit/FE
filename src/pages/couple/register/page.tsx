import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from "../../../shared/components/Button"
import DatePicker from "../../../shared/components/DatePicker"
import { Input } from "../../../shared/components/Input"
import MiniButton from "../../../shared/components/MiniButton"
import { RadioGroup } from "../../../shared/components/RadioGroup"
import Dropdown from "../../../shared/components/Dropdown"
import { regions, weddingTypes } from "../../../shared/constants/constants"
import { checkCoupleId, fixCoupleInfo, getCoupleInfo, registerCouple} from "../_features/service/couple-register.service"
import StatusModal from "../../../shared/components/StatusModal"
import { useAuthStore } from "../../auth/_entities/auth.store"

const CoupleRegisterPage = () => {
  const navigate = useNavigate()

  const [loginId, setLoginId] = useState("")
  const [loginIdError, setLoginIdError] = useState("")
  const [region, setRegion] = useState("")
  const [weddingType, setWeddingType] = useState("")
  const [honeymoonBudget, setHoneymoonBudget] = useState("true")
  const [photoPackage, setPhotoPackage] = useState("true")
  const [dressMakeup, setDressMakeup] = useState("true")
  const [weddingDate, setWeddingDate] = useState("")

  const [modalOpen, setModalOpen] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const { coupleId, setCoupleId } = useAuthStore()
  const isEditMode = !!coupleId
  const handleCheckId = async () => {
    try {
      const res = await checkCoupleId(loginId)
      setCoupleId(res.data.coupleId)
      setLoginIdError(res.message)
    } catch (err: any) {
      setLoginIdError("유저 찾기 실패")
    }
  }

  const handleSubmit = async () => {
    const basePayload = {
      region,
      weddingType,
      honeymoonBudget: honeymoonBudget === "true",
      photoPackage: photoPackage === "true",
      dressMakeup: dressMakeup === "true",
      weddingDate,
    }
  
    try {
      if (isEditMode) {
        await fixCoupleInfo({
          ...basePayload,
        }) 
      } else {
        await registerCouple({
          ...basePayload,
          loginId, 
        })
      }
      setModalOpen(true)
    } catch (err) {
      setSubmitError("요청 처리에 실패했습니다.")
    }
  }

  useEffect(() => {
    const fetchCoupleInfo = async () => {
      if (!coupleId) return
      try {
        const res = await getCoupleInfo(coupleId)
        const data = res.data
        setLoginId(data.loginId)
        setRegion(data.region)
        setWeddingType(data.weddingType)
        setHoneymoonBudget(data.honeymoonBudget ? "true" : "false")
        setPhotoPackage(data.photoPackage ? "true" : "false")
        setDressMakeup(data.dressMakeup ? "true" : "false")
        setWeddingDate(data.weddingDate)
      } catch (err) {
        console.error("커플 정보 조회 실패", err)
      }
    }
  
    fetchCoupleInfo()
  }, [coupleId])
  
  return (
    <main className="flex flex-col gap-5">
      <div className="flex flex-col items-center justify-center">
        <p className="text-title">커플 등록</p>
        <p className="text-description">커플의 정보를 입력해주세요.</p>
      </div>

      <div className="flex flex-row gap-2.5 items-center">
      <Input
        label="커플 ID 입력"
        placeholder="example@email.com"
        value={loginId}
        onChange={(e) => setLoginId(e.target.value)}
        error={loginIdError}
        disabled={isEditMode}
      />
        <MiniButton className="mt-8" onClick={handleCheckId}>중복 확인</MiniButton>
      </div>

      <p className="text-subTitle">지역 선택</p>
      <Dropdown
        options={regions.map((r) => ({ value: r, label: r }))}
        value={region}
        onChange={setRegion}
      />

      <p className="text-subTitle">웨딩 종류 선택</p>     
      <Dropdown
        options={weddingTypes.map((w) => ({ value: w, label: w }))}
        value={weddingType}
        onChange={setWeddingType}
      />

      <RadioGroup
        name="honeymoonBudget"
        label="혼수 여부"
        options={[
          { value: "true", label: "예" },
          { value: "false", label: "아니오" },
        ]}
        value={honeymoonBudget}
        onChange={setHoneymoonBudget}
      />

      <RadioGroup
        name="photoPackage"
        label="사진/영상 패키지"
        options={[
          { value: "true", label: "예" },
          { value: "false", label: "아니오" },
        ]}
        value={photoPackage}
        onChange={setPhotoPackage}
      />

      <RadioGroup
        name="dressMakeup"
        label="드레스/메이크업"
        options={[
          { value: "true", label: "예" },
          { value: "false", label: "아니오" },
        ]}
        value={dressMakeup}
        onChange={setDressMakeup}
      />
      <div>
      <p className="text-subTitle mb-2.5">결혼식 날짜</p>
      <DatePicker
        value={weddingDate}
        onChange={setWeddingDate}
        placeholder="YYYY-MM-DD"
      /></div>

      {submitError && <p className="text-red-500">{submitError}</p>}
      <Button onClick={handleSubmit}>커플 등록</Button>

      <StatusModal
        isOpen={modalOpen}
        statusCode={200}
        message="커플 등록이 완료되었습니다!"
        onClose={() => setModalOpen(false)}
        onStart={() => navigate("/")}
      />
    </main>
  )
}

export default CoupleRegisterPage