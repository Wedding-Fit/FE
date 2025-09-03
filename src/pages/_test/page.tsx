import Button from "../../shared/components/Button"
import MiniButton from "../../shared/components/MiniButton"
import Card from "../../shared/components/Card"
import SimpleDropdown from "../../shared/components/SimpleDropdown"
import SelectMenu from "../../shared/components/SelectMenu"
import DatePicker from "../../shared/components/DatePicker"
import StatusModal from "../../shared/components/StatusModal"
import Dropdown from "../../shared/components/Dropdown"
import { Input } from "../../shared/components/Input"
import { RadioGroup } from "../../shared/components/RadioGroup"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import SemiButton from "../../shared/components/SemiButton"

const statusOptions = [
  { value: "progress", label: "진행 중" },
  { value: "done", label: "완료" },
]

const regions = [
  "서울특별시", "경기도", "인천광역시", "강원도", "충청도", "전라도",
  "경상도", "세종특별시", "광주광역시", "대구광역시", "부산광역시",
  "대전광역시", "울산광역시", "제주도"
]

const TestPage = () => {
  const navigate = useNavigate()

  const [status, setStatus] = useState("progress")
  const [selectedRegion, setSelectedRegion] = useState("서울특별시")
  const [selectedDate, setSelectedDate] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [response, setResponse] = useState<{ status: number, message: string } | null>(null)

  const [fruit, setFruit] = useState("apple")
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [selectedGender, setSelectedGender] = useState("male")

  const validateEmail = () => {
    if (!email) {
      setEmailError("이메일을 입력해주세요.")
      return false
    }
    if (!email.includes("@")) {
      setEmailError("유효한 이메일 주소를 입력해주세요.")
      return false
    }
  
    setEmailError("")
    console.log("[이메일 확인 완료]", email)
    return true
  }


  useEffect(() => console.log("[상태 선택]", status), [status])
  useEffect(() => console.log("[지역 선택]", selectedRegion), [selectedRegion])
  useEffect(() => console.log("[날짜 선택]", selectedDate), [selectedDate])
  useEffect(() => console.log("[과일 선택]", fruit), [fruit])
  useEffect(() => console.log("[성별 선택]", selectedGender), [selectedGender])

  const handleShowModal = () => {
    setResponse({ status: 200, message: "커플 등록이 완료되었습니다!" })
    setModalOpen(true)
  }

  return (
    <main className="p-4 space-y-6">
      <p className="text-title">안녕하세요 테스트 카드</p>
      <p className="text-buttonTitle">안녕하세요 테스트 카드</p>
      <p className="text-subTitle">안녕하세요 테스트 카드</p>
      <p className="text-bodyBold">안녕하세요 테스트 카드</p>
      <p className="text-body">안녕하세요 테스트 카드</p>
      <p className="text-caption">안녕하세요 테스트 카드</p>

      <Button onClick={handleShowModal}>모달 열어보기</Button>
      <SemiButton>중간버튼</SemiButton>
      

      <Card>
        <div className="flex text-align">
          <p>안녕하세요 테스트 카드</p>
        </div>
      </Card>

      <SimpleDropdown
        options={statusOptions}
        selectedValue={status}
        onSelect={setStatus}
      />

      <SelectMenu
        options={regions}
        selected={selectedRegion}
        onSelect={setSelectedRegion}
      />

      <DatePicker
        value={selectedDate}
        onChange={setSelectedDate}
        placeholder="YYYY-MM-DD"
      />

      <Dropdown
        options={[
          { value: "apple", label: "사과" },
          { value: "banana", label: "바나나" },
        ]}
        value={fruit}
        onChange={setFruit}
      />

      <Input
        label="이메일"
        placeholder="example@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
       
      />
      <MiniButton onClick={validateEmail}>중복 확인</MiniButton>

      <RadioGroup
        name="gender"
        label="성별"
        options={[
          { value: "male", label: "남자" },
          { value: "female", label: "여자" },
        ]}
        value={selectedGender}
        onChange={setSelectedGender}
      />

      <StatusModal
        isOpen={modalOpen}
        statusCode={response?.status}
        message={response?.message || "알 수 없는 오류가 발생했어요."}
        onClose={() => setModalOpen(false)}
        onStart={() => navigate("/")}
      />
    </main>
  )
}

export default TestPage