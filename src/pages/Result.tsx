import { Button, Card, Progress, Space, Typography } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { useEffect } from "react";

const { Title, Text } = Typography;

interface SkillAnalysis {
  skill: string;
  score: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

const Result = () => {
  // 임시 데이터
  const analysis: SkillAnalysis[] = [
    {
      skill: "React",
      score: 85,
      strengths: ["Virtual DOM에 대한 깊은 이해", "Hooks 활용 능력이 뛰어남"],
      weaknesses: ["성능 최적화에 대한 이해가 부족", "상태 관리 라이브러리 경험이 제한적"],
      recommendations: [
        "React Query나 SWR 같은 데이터 페칭 라이브러리 학습",
        "React.memo와 useMemo, useCallback의 적절한 사용법 학습",
      ],
    },
    {
      skill: "TypeScript",
      score: 75,
      strengths: ["기본적인 타입 시스템 이해", "인터페이스 활용 능력"],
      weaknesses: ["제네릭 활용이 미흡", "유틸리티 타입에 대한 이해가 부족"],
      recommendations: ["TypeScript의 고급 기능 학습", "실제 프로젝트에서 타입 시스템 적극 활용"],
    },
  ];

  const handleDownload = () => {
    window.print();
    console.log("PDF 다운로드");
  };

  // 인쇄 시 버튼 숨김을 위한 스타일 추가
  useEffect(() => {
    // 인쇄 관련 스타일을 동적으로 추가
    const style = document.createElement("style");
    style.innerHTML = `
      @media print {
        .no-print {
          display: none !important;
        }
        
        /* 인쇄 시 배경색과 그림자 표시를 위한 설정 */
        * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        
        /* 페이지 여백 조정 */
        @page {
          size: A4;
          margin: 15mm;
        }
        
        /* 인쇄 시 전체 너비 활용 */
        .ant-card {
          width: 100% !important;
          break-inside: avoid;
        }
        
        /* 인쇄 시 배경색 설정 */
        body {
          background-color: white !important;
        }
      }
    `;
    document.head.appendChild(style);

    // 컴포넌트 언마운트 시 스타일 제거
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-[16px]">
      <div className="mx-auto max-w-4xl">
        <Title level={2} className="mt-[0px] text-center">
          기술 면접 결과 분석
        </Title>

        <Space direction="vertical" size="large" className="w-full">
          {analysis.map((item) => (
            <Card key={item.skill} className="w-full">
              <div className="mb-[16px] flex items-center justify-between">
                <h2 className="my-[0px]">{item.skill}</h2>
              </div>
              <div className="flex justify-between">
                <div className="flex flex-col space-y-4 text-left">
                  <div>
                    <Text strong>강점:</Text>
                    <ul className="list-inside list-disc">
                      {item.strengths.map((strength, index) => (
                        <li key={index}>{strength}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <Text strong>개선 필요 사항:</Text>
                    <ul className="list-inside list-disc">
                      {item.weaknesses.map((weakness, index) => (
                        <li key={index}>{weakness}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <Text strong>추천 사항:</Text>
                    <ul className="list-inside list-disc">
                      {item.recommendations.map((rec, index) => (
                        <li key={index}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <Progress type="circle" percent={item.score} width={200} />
              </div>
            </Card>
          ))}

          {/* no-print 클래스 추가로 인쇄 시 버튼이 표시되지 않음 */}
          <div className="no-print mt-6 flex justify-center">
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              size="large"
              onClick={handleDownload}
            >
              결과 PDF 다운로드
            </Button>
          </div>
        </Space>
      </div>
    </div>
  );
};

export default Result;
