import { useState, useRef } from "react";
import {
  Button,
  Input,
  Space,
  Spin,
  Typography,
  Layout,
  Card,
  Avatar,
  Row,
  Col,
  Steps,
  theme,
  Tooltip,
} from "antd";
import usePromptStore from "../store/promptStore";
import { Message } from "../types/interview";
import { sendMessage } from "../api/interview";
import { useNavigate } from "react-router-dom";
import {
  RobotOutlined,
  SendOutlined,
  StopOutlined,
  RightOutlined,
  LoadingOutlined,
  BulbOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import type { TextAreaRef } from "antd/es/input/TextArea";

const { TextArea } = Input;
const { Title, Text, Paragraph } = Typography;
const { Content } = Layout;
const { useToken } = theme;

const COMMAND = {
  NEXT: "다음",
  STOP: "멈춰",
} as const;

const GuideSteps = [
  {
    title: "맞춤형 코칭",
    description: "AI 코치가 이력서를 기반으로 맞춤형 질문과 피드백을 제공합니다.",
  },
  {
    title: "심층 대화",
    description: "답변 후 Enter를 누르면 현재 주제에 대해 더 깊이 있는 대화를 이어갑니다.",
  },
  {
    title: "주제 전환",
    description: "'다음 주제' 버튼으로 다른 역량이나 경험에 대해 이야기할 수 있습니다.",
  },
  {
    title: "성장 분석",
    description: "코칭이 끝나면 종합적인 역량 분석과 개선 방향을 제시합니다.",
  },
];

const MessageDisplay = ({ content }: { content: string }) => {
  const { token } = useToken();

  return (
    <Row gutter={16} align="top">
      <Col>
        <Avatar
          size={48}
          icon={<RobotOutlined />}
          style={{
            backgroundColor: token.colorPrimary,
            boxShadow: token.boxShadowTertiary,
            transition: "none",
          }}
        />
      </Col>
      <Col flex="1">
        <Card
          bordered={false}
          style={{
            backgroundColor: token.colorBgLayout,
            borderRadius: token.borderRadiusLG,
            transition: "none",
          }}
        >
          <Space direction="vertical" size="small">
            <Text type="secondary">AI 커리어 코치</Text>
            <Paragraph style={{ fontSize: 16, lineHeight: 1.6, margin: 0 }}>{content}</Paragraph>
          </Space>
        </Card>
      </Col>
    </Row>
  );
};

const LoadingIndicator = () => (
  <Space>
    <Spin indicator={<LoadingOutlined style={{ fontSize: 16 }} spin />} />
    <Text type="secondary">AI 코치가 답변을 분석하고 있습니다...</Text>
  </Space>
);

const Interview = () => {
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { messages, setMessages, fileName, pdfBase64 } = usePromptStore();
  const navigate = useNavigate();
  const { token } = useToken();
  const textAreaRef = useRef<TextAreaRef>(null);

  const handleMessageSend = async (content: string) => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      const response = await sendMessage({
        messages: [...messages, { role: "user" as const, content }],
        pdfFileData: {
          name: fileName,
          content: pdfBase64,
        },
      });

      setAnswer("");
      setMessages(response.messages);

      if (content !== COMMAND.STOP) {
        setTimeout(() => {
          textAreaRef.current?.focus();
        }, 0);
      }
      if (content === COMMAND.STOP) navigate("/result");
    } catch (error) {
      console.error("메시지 전송 중 에러 발생:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!answer.trim()) return;
      await handleMessageSend(answer);
    }
  };

  const lastAssistantMessage =
    messages.filter((message: Message) => message.role === "assistant").at(-1)?.content ||
    "AI 코치가 이력서를 분석하고 있습니다...";

  return (
    <Layout>
      <Content
        style={{
          minHeight: "100vh",
          background: token.colorBgContainer,
          padding: "24px",
        }}
      >
        <Row justify="center">
          <Col xs={24} sm={24} md={20} lg={16} xl={14}>
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <Title
                level={2}
                style={{
                  fontSize: "2.5rem",
                  marginBottom: "16px",
                  background: "linear-gradient(to right, #4f46e5, #9333ea)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                MARU와 함께하는 성장 대화
              </Title>
              <Paragraph
                style={{
                  fontSize: "1.25rem",
                  color: token.colorTextSecondary,
                  maxWidth: "800px",
                  margin: "0 auto",
                }}
              >
                실무 경험과 기술 역량에 대해 이야기하며
                <br />
                구체적인 성장 방향을 찾아보세요
              </Paragraph>
            </div>

            <Card
              style={{
                marginBottom: "24px",
                borderRadius: token.borderRadiusLG,
                boxShadow: token.boxShadowTertiary,
                transition: "none",
              }}
              title={
                <Space>
                  <BulbOutlined style={{ color: token.colorPrimary }} />
                  <Text strong>코칭 가이드</Text>
                </Space>
              }
            >
              <Steps
                direction="vertical"
                size="small"
                items={GuideSteps.map((step) => ({
                  title: step.title,
                  description: step.description,
                  status: "process",
                }))}
              />
            </Card>

            <Card
              bordered={false}
              style={{
                borderRadius: token.borderRadiusLG,
                boxShadow: token.boxShadowTertiary,
                transition: "none",
              }}
              bodyStyle={{ padding: "24px" }}
            >
              <Space direction="vertical" size="large" style={{ width: "100%" }}>
                <Card
                  style={{
                    backgroundColor: token.colorBgLayout,
                    borderRadius: token.borderRadiusLG,
                    transition: "none",
                  }}
                >
                  <MessageDisplay content={lastAssistantMessage} />
                </Card>

                <div>
                  <div style={{ position: "relative" }}>
                    <TextArea
                      ref={textAreaRef}
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      placeholder="답변을 입력하고 Enter를 누르면 AI 코치와 심층 대화를 이어갑니다."
                      autoSize={{ minRows: 3, maxRows: 6 }}
                      onKeyDown={handleKeyDown}
                      disabled={isLoading}
                      style={{
                        marginBottom: 16,
                        fontSize: 16,
                        paddingRight: "30px",
                        borderRadius: token.borderRadiusLG,
                        borderColor: token.colorBorder,
                      }}
                    />
                    <Tooltip title="Enter를 눌러 답변하면 현재 주제에 대해 더 깊이 있는 대화를 나눕니다">
                      <InfoCircleOutlined
                        style={{
                          position: "absolute",
                          right: "10px",
                          top: "10px",
                          color: token.colorTextSecondary,
                        }}
                      />
                    </Tooltip>
                  </div>

                  <Row justify="space-between" align="middle">
                    <Col>{isLoading ? <LoadingIndicator /> : null}</Col>
                    <Col>
                      <Space>
                        <Tooltip title="코칭을 종료하고 종합 피드백을 확인합니다">
                          <Button
                            danger
                            icon={<StopOutlined />}
                            onClick={() => handleMessageSend(COMMAND.STOP)}
                            disabled={isLoading}
                            style={{
                              borderRadius: token.borderRadiusLG,
                              height: "40px",
                              transition: "none",
                            }}
                          >
                            코칭 종료
                          </Button>
                        </Tooltip>
                        <Tooltip title={answer.trim() ? "답변 제출하기" : "다음 주제로 넘어가기"}>
                          <Button
                            type="primary"
                            icon={answer.trim() ? <SendOutlined /> : <RightOutlined />}
                            onClick={() => handleMessageSend(answer.trim() ? answer : COMMAND.NEXT)}
                            disabled={isLoading}
                            style={{
                              background: "linear-gradient(to right, #4f46e5, #9333ea)",
                              borderRadius: token.borderRadiusLG,
                              height: "40px",
                              transition: "none",
                            }}
                          >
                            {answer.trim() ? "답변 제출" : "다음 주제"}
                          </Button>
                        </Tooltip>
                      </Space>
                    </Col>
                  </Row>
                </div>
              </Space>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Interview;
