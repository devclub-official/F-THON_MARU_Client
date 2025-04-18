import { Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import {
  ArrowRightOutlined,
  RobotOutlined,
  FileTextOutlined,
  BarChartOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-pattern min-h-screen bg-gradient-to-b from-white via-indigo-50 to-white">
      <div className="container-padding section-padding mx-auto max-w-7xl">
        <div className="mb-20 text-center">
          <Title level={1} className="text-gradient mb-6 text-4xl font-bold sm:text-5xl">
            AI 기술 면접관
          </Title>
          <Paragraph className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600 sm:text-xl">
            이력서를 업로드하고 AI 면접관과 함께 기술 면접을 연습해보세요. 실제 면접과 같은 심층적인
            기술 질문을 받고, 피드백을 통해 면접 준비를 완벽하게 할 수 있습니다.
          </Paragraph>
        </div>

        <div className="mb-20 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="glass-effect hover-lift rounded-xl p-6 sm:p-8">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 sm:h-14 sm:w-14">
              <FileTextOutlined className="text-xl text-indigo-600 sm:text-2xl" />
            </div>
            <Title level={4} className="mb-4 text-lg sm:text-xl">
              이력서 분석
            </Title>
            <Paragraph className="text-base leading-relaxed text-gray-600 sm:text-lg">
              PDF 이력서를 업로드하면 AI가 기술 스택과 경험을 분석하여 맞춤형 질문을 생성합니다.
            </Paragraph>
          </div>

          <div className="glass-effect hover-lift rounded-xl p-6 sm:p-8">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 sm:h-14 sm:w-14">
              <RobotOutlined className="text-xl text-indigo-600 sm:text-2xl" />
            </div>
            <Title level={4} className="mb-4 text-lg sm:text-xl">
              AI 면접
            </Title>
            <Paragraph className="text-base leading-relaxed text-gray-600 sm:text-lg">
              실제 면접과 같은 대화형 인터뷰를 진행하며, 답변에 따라 심층적인 꼬리 질문을 받습니다.
            </Paragraph>
          </div>

          <div className="glass-effect hover-lift rounded-xl p-6 sm:p-8">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 sm:h-14 sm:w-14">
              <BarChartOutlined className="text-xl text-indigo-600 sm:text-2xl" />
            </div>
            <Title level={4} className="mb-4 text-lg sm:text-xl">
              상세 피드백
            </Title>
            <Paragraph className="text-base leading-relaxed text-gray-600 sm:text-lg">
              면접 결과를 바탕으로 기술별 강점과 약점을 분석하고 개선을 위한 학습 리소스를
              추천합니다.
            </Paragraph>
          </div>
        </div>

        <div className="text-center">
          <Button
            type="primary"
            size="large"
            icon={<ArrowRightOutlined />}
            onClick={() => navigate("/upload")}
            className="hover-lift h-12 px-6 text-base font-medium sm:h-14 sm:px-8 sm:text-lg"
          >
            시작하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
