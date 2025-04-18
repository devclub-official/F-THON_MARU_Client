import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Input, Progress, Space, Typography } from "antd";
import { ArrowRightOutlined, StopOutlined, RobotOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Title, Paragraph } = Typography;

interface Question {
  id: number;
  text: string;
  followUpQuestions: string[];
}

const InterviewPage = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  // TODO: API에서 받아올 질문 데이터
  const questions: Question[] = [
    {
      id: 1,
      text: "React의 주요 특징과 장점에 대해 설명해주세요.",
      followUpQuestions: [
        "Virtual DOM이 실제 DOM보다 빠른 이유는 무엇인가요?",
        "React의 단방향 데이터 흐름이 어떤 이점을 가져오나요?",
      ],
    },
    {
      id: 2,
      text: "TypeScript를 사용하는 이유와 장점에 대해 설명해주세요.",
      followUpQuestions: [
        "TypeScript의 타입 시스템이 개발 생산성에 어떤 도움을 주나요?",
        "JavaScript와 TypeScript의 주요 차이점은 무엇인가요?",
      ],
    },
  ];

  const handleNext = async () => {
    setLoading(true);
    try {
      // TODO: API 연동
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setAnswer("");
      } else {
        navigate("/result");
      }
    } catch (error) {
      // 에러 처리
    } finally {
      setLoading(false);
    }
  };

  const handleEnd = () => {
    navigate("/result");
  };

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="mb-8 flex items-center justify-center">
          <div className="w-full max-w-2xl">
            <Progress percent={progress} showInfo={false} strokeColor="#4f46e6" className="mb-4" />
            <div className="flex justify-between text-sm text-gray-500">
              <span>질문 {currentQuestionIndex + 1}</span>
              <span>{questions.length}개 중</span>
            </div>
          </div>
        </div>

        <Card className="rounded-xl bg-white shadow-sm">
          <div className="mb-6 flex items-center">
            <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100">
              <RobotOutlined className="text-xl text-indigo-600" />
            </div>
            <Title level={3} className="mb-0">
              질문 {currentQuestionIndex + 1}
            </Title>
          </div>

          <Paragraph className="mb-8 text-lg text-gray-800">
            {questions[currentQuestionIndex].text}
          </Paragraph>

          <TextArea
            rows={8}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="답변을 입력해주세요..."
            className="mb-8 text-lg"
          />

          <Space className="w-full justify-end">
            <Button icon={<StopOutlined />} onClick={handleEnd} danger className="h-10 px-6">
              종료하기
            </Button>
            <Button
              type="primary"
              icon={<ArrowRightOutlined />}
              onClick={handleNext}
              loading={loading}
              className="h-10 px-6"
            >
              다음 질문
            </Button>
          </Space>
        </Card>
      </div>
    </div>
  );
};

export default InterviewPage;
