import { useState } from "react";
import { Button, Input, Space } from "antd";
import { useNavigate } from "react-router-dom";
import usePdfStore from "../store/pdfStore.ts";

const { TextArea } = Input;

interface Question {
  id: number;
  text: string;
  category: string;
}

const Interview = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const { pdfBase64, addAnswer } = usePdfStore();
  console.log(pdfBase64);
  // 임시 데이터
  const questions: Question[] = [
    {
      id: 1,
      text: "React의 Virtual DOM에 대해 설명해주세요.React의 Virtual DOM에 대해 설명해주세요.React의 Virtual DOM에 대해 설명해주세요.React의 Virtual DOM에 대해 설명해주세요.React의 Virtual DOM에 대해 설명해주세요.React의 Virtual DOM에 대해 설명해주세요.React의 Virtual DOM에 대해 설명해주세요.",
      category: "React",
    },
    { id: 2, text: "React Hooks의 장점과 단점에 대해 설명해주세요.", category: "React" },
    {
      id: 3,
      text: "TypeScript를 사용하는 이유와 장점에 대해 설명해주세요.",
      category: "TypeScript",
    },
  ];

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      // 이거 인덱스로 되어있는데 실시간으로 주고받는거라 수정해야함
      addAnswer("답변");
      setCurrentQuestionIndex((prev) => prev + 1);
      setAnswer("");
    } else {
      navigate("/result");
    }
  };

  const handleFinish = () => {
    navigate("/result");
  };

  const questionNumber = `${currentQuestionIndex + 1}.`;
  const questionText = `${questionNumber} ${questions[currentQuestionIndex].text}`;

  return (
    <div className="min-h-screen bg-gray-50 p-[16px]">
      <div className="mx-auto max-w-3xl">
        <div className="mt-[0px] rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mt-[0px] text-xl font-semibold">
            {questions[currentQuestionIndex].category}
          </h2>
          <p className="mt-[0px] text-lg">{questionText}</p>
          <TextArea
            rows={6}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="답변을 입력해주세요."
            className="mb-4"
            style={{ resize: "none" }}
          />
          <Space className="mt-[8px] flex justify-end">
            <Button onClick={handleFinish}>종료하기</Button>
            <Button type="primary" onClick={handleNext}>
              {currentQuestionIndex === questions.length - 1 ? "완료" : "다음"}
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default Interview;
