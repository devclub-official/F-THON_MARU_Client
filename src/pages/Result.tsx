import { Button, Card, Progress, Space, Typography } from "antd";
import {
  DownloadOutlined,
  HomeOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;

interface SkillAssessment {
  skill: string;
  score: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

const ResultPage = () => {
  const navigate = useNavigate();

  // TODO: API에서 받아올 결과 데이터
  const assessments: SkillAssessment[] = [
    {
      skill: "React",
      score: 85,
      strengths: ["Virtual DOM에 대한 이해도가 높음", "컴포넌트 설계 능력이 우수함"],
      weaknesses: ["성능 최적화에 대한 이해가 부족", "상태 관리에 대한 경험이 제한적"],
      recommendations: [
        "React.memo와 useMemo 사용법 학습",
        "Redux 또는 Context API 활용 경험 쌓기",
      ],
    },
    {
      skill: "TypeScript",
      score: 75,
      strengths: ["기본적인 타입 시스템 이해", "인터페이스 활용 능력"],
      weaknesses: ["제네릭 활용이 미흡", "유틸리티 타입 사용 경험 부족"],
      recommendations: ["TypeScript 공식 문서의 제네릭 섹션 학습", "유틸리티 타입 활용 예제 실습"],
    },
  ];

  const handleDownload = () => {
    // TODO: PDF 생성 및 다운로드 기능 구현
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="mb-12 text-center">
          <Title level={2} className="mb-4 text-3xl font-bold">
            면접 결과 분석
          </Title>
          <Paragraph className="text-lg text-gray-600">
            AI 면접관이 분석한 기술 스택별 평가 결과입니다.
          </Paragraph>
        </div>

        <div className="space-y-6">
          {assessments.map((assessment) => (
            <Card key={assessment.skill} className="rounded-xl bg-white shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <Title level={3} className="mb-0">
                  {assessment.skill}
                </Title>
                <Progress
                  type="circle"
                  percent={assessment.score}
                  width={80}
                  strokeColor="#4f46e6"
                />
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div>
                  <div className="mb-4 flex items-center">
                    <CheckCircleOutlined className="mr-2 text-xl text-green-500" />
                    <Title level={4} className="mb-0">
                      강점
                    </Title>
                  </div>
                  <ul className="space-y-2">
                    {assessment.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mt-2 mr-2 h-1.5 w-1.5 rounded-full bg-green-500" />
                        <span className="text-gray-700">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="mb-4 flex items-center">
                    <WarningOutlined className="mr-2 text-xl text-yellow-500" />
                    <Title level={4} className="mb-0">
                      개선 필요 사항
                    </Title>
                  </div>
                  <ul className="space-y-2">
                    {assessment.weaknesses.map((weakness, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mt-2 mr-2 h-1.5 w-1.5 rounded-full bg-yellow-500" />
                        <span className="text-gray-700">{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8">
                <div className="mb-4 flex items-center">
                  <BookOutlined className="mr-2 text-xl text-indigo-500" />
                  <Title level={4} className="mb-0">
                    학습 추천
                  </Title>
                </div>
                <ul className="space-y-2">
                  {assessment.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mt-2 mr-2 h-1.5 w-1.5 rounded-full bg-indigo-500" />
                      <span className="text-gray-700">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 flex justify-center space-x-4">
          <Button icon={<HomeOutlined />} onClick={() => navigate("/")} className="h-10 px-6">
            홈으로
          </Button>
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={handleDownload}
            className="h-10 px-6"
          >
            결과 PDF 다운로드
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
