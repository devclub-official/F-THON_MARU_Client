import { useState, useEffect } from "react";
import {
  Layout,
  Typography,
  Card,
  Row,
  Col,
  Tabs,
  Tag,
  Progress,
  List,
  Divider,
  Space,
  Button,
  Badge,
  Table,
  Empty,
} from "antd";
import {
  BookOutlined,
  HomeOutlined,
  DownloadOutlined,
  InfoCircleOutlined,
  LinkOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import usePromptStore from "../store/promptStore.ts";

const { Header, Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const Result = () => {
  const [feedbackData, setFeedbackData] = useState(null);
  const [isButtonsVisible, setIsButtonsVisible] = useState(true);
  const navigate = useNavigate();
  const { messages, parsedResult, setParsedResult, fileName } = usePromptStore();

  useEffect(() => {
    const defaultFileName = fileName
      ? `${fileName}_테스트결과_${new Date().toISOString().split("T")[0]}`
      : `테스트결과_${new Date().toISOString().split("T")[0]}`;

    document.title = defaultFileName;

    return () => {
      document.title = "테스트 결과";
    };
  }, [fileName]);

  useEffect(() => {
    if (parsedResult) {
      processResult(parsedResult);
    } else if (messages && messages.length > 0) {
      try {
        const content = messages[messages.length - 1].content;
        const jsonStartIndex = content.indexOf("{");
        const jsonEndIndex = content.lastIndexOf("}") + 1;

        if (jsonStartIndex !== -1 && jsonEndIndex !== -1) {
          const jsonString = content.substring(jsonStartIndex, jsonEndIndex);
          console.log("추출된 JSON 문자열:", jsonString);

          const newParsedResult = JSON.parse(jsonString);
          console.log("새로 파싱된 데이터:", newParsedResult);

          setParsedResult(newParsedResult);
          processResult(newParsedResult);
        } else {
          throw new Error("JSON 형식을 찾을 수 없습니다");
        }
      } catch (error) {
        console.error("JSON 파싱 오류:", error);
        const defaultResult = {
          summary: "데이터 파싱 오류가 발생했습니다.",
          feedback: "JSON 데이터를 파싱하는 중 오류가 발생했습니다.",
          teck_skills_analysis: [],
          correct_questions: [],
          incorrect_questions: [],
        };
        setParsedResult(defaultResult);
        processResult(defaultResult);
      }
    } else {
      console.warn("메시지가 없습니다. 홈으로 리다이렉트합니다.");
    }
  }, [messages, parsedResult, setParsedResult, navigate]);

  const processResult = (result) => {
    setFeedbackData({
      candidateInfo: {
        name: "홍길동",
        position: "프론트엔드 개발자",
        interviewDate: new Date().toISOString().split("T")[0],
      },
      summary: result.summary || "요약 정보가 없습니다.",
      overallFeedback: result.feedback || "피드백 정보가 없습니다.",
      technicalAssessments: (result.teck_skills_analysis || []).map((skill) => ({
        skill: skill.tech_skill,
        level: getSkillLevel(skill.tech_skill),
        score: getSkillScore(skill.tech_skill),
        currentState: skill.current_state || "현재 수준 정보가 없습니다.",
        improvementDirection:
          skill.imporovement_direction ||
          skill.improvement_direction ||
          "개선 방향 정보가 없습니다.",
        referenceLinks: skill.reference_links || [],
      })),
      quiz: {
        correct: result.correct_questions || [],
        incorrect: result.incorrect_questions || [],
      },
    });
  };

  useEffect(() => {
    const beforePrintHandler = () => setIsButtonsVisible(false);
    const afterPrintHandler = () => setIsButtonsVisible(true);

    window.addEventListener("beforeprint", beforePrintHandler);
    window.addEventListener("afterprint", afterPrintHandler);

    return () => {
      window.removeEventListener("beforeprint", beforePrintHandler);
      window.removeEventListener("afterprint", afterPrintHandler);
    };
  }, []);

  if (!feedbackData) {
    return <div>로딩 중...</div>;
  }

  function getSkillLevel(skillName) {
    switch (skillName) {
      case "HTML":
      case "HTML5":
        return "초급";
      case "CSS":
      case "CSS3":
        return "초급";
      case "JavaScript":
        return "초급";
      case "React":
        return "초급";
      default:
        return "초급";
    }
  }

  function getSkillScore(skillName) {
    switch (skillName) {
      case "HTML":
      case "HTML5":
        return 65;
      case "CSS":
      case "CSS3":
        return 70;
      case "JavaScript":
        return 60;
      case "React":
        return 55;
      default:
        return 65;
    }
  }

  const getScoreColor = (score) => {
    if (score >= 85) return "success";
    if (score >= 70) return "processing";
    if (score >= 50) return "warning";
    return "error";
  };

  const getScoreText = (score) => {
    if (score >= 85) return "우수";
    if (score >= 70) return "양호";
    if (score >= 50) return "보통";
    return "미흡";
  };

  const handleDashboardClick = () => navigate("/");

  const handlePrintPDF = () => {
    window.print();
  };

  const renderQuizResults = () => {
    const { correct, incorrect } = feedbackData.quiz;

    if ((correct?.length === 0 || !correct) && (incorrect?.length === 0 || !incorrect)) {
      return null;
    }

    const columns = [
      {
        title: "기술",
        dataIndex: "tech_skill",
        key: "tech_skill",
        width: "15%",
      },
      {
        title: "질문",
        dataIndex: "question",
        key: "question",
        width: "25%",
      },
      {
        title: "제출한 답변",
        dataIndex: "your_answer",
        key: "your_answer",
        width: "20%",
        render: (text) => (text === null ? "-" : text),
      },
      {
        title: "정답",
        dataIndex: "right_answer",
        key: "right_answer",
        width: "30%",
        render: (text) => (!text ? <CheckOutlined style={{ color: "#52c41a" }} /> : text),
      },
      {
        title: "결과",
        key: "result",
        width: "10%",
        render: (_, record) =>
          record.right_answer ? (
            <CloseOutlined style={{ color: "#f5222d" }} />
          ) : (
            <CheckOutlined style={{ color: "#52c41a" }} />
          ),
      },
    ];

    return (
      <Card title={<span>퀴즈 결과</span>} className="mb-6">
        <Tabs defaultActiveKey="2">
          <TabPane tab="정답" key="1">
            {correct && correct.length > 0 ? (
              <Table
                dataSource={correct.map((item, idx) => ({ ...item, key: `correct-${idx}` }))}
                columns={columns.filter((col) => col.key !== "right_answer")}
                pagination={false}
              />
            ) : (
              <Empty description="정답 기록이 없습니다" />
            )}
          </TabPane>
          <TabPane tab="오답" key="2">
            {incorrect && incorrect.length > 0 ? (
              <Table
                dataSource={incorrect.map((item, idx) => ({ ...item, key: `incorrect-${idx}` }))}
                columns={columns}
                pagination={false}
              />
            ) : (
              <Empty description="오답 기록이 없습니다" />
            )}
          </TabPane>
        </Tabs>
      </Card>
    );
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          background: "linear-gradient(90deg, #2f54eb 0%, #1890ff 100%)",
          padding: "16px 50px",
          height: "auto",
        }}
      >
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={2} style={{ color: "#fff", margin: 0 }}>
              시험 결과
            </Title>
            <Text style={{ color: "rgba(255, 255, 255, 0.85)" }}>AI 기반 분석 및 개선 제안</Text>
          </Col>
        </Row>
      </Header>
      <Content style={{ padding: "24px 50px", maxWidth: 1200, margin: "0 auto" }}>
        <Card className="mb-6">
          <Paragraph strong>{feedbackData.summary}</Paragraph>
        </Card>
        <Title level={3}>기술 역량 평가</Title>
        <div className="mb-6">
          {feedbackData.technicalAssessments.length > 0 ? (
            feedbackData.technicalAssessments.map((assessment) => (
              <div key={assessment.skill} className="mb-6">
                <Card
                  title={
                    <Space>
                      <span>{assessment.skill}</span>
                      <Tag color="blue">{assessment.level}</Tag>
                      <Badge
                        count={assessment.score}
                        style={{
                          backgroundColor:
                            assessment.score >= 85
                              ? "#52c41a"
                              : assessment.score >= 70
                                ? "#1890ff"
                                : assessment.score >= 50
                                  ? "#faad14"
                                  : "#f5222d",
                        }}
                      />
                    </Space>
                  }
                >
                  <Row align="middle" style={{ marginBottom: 16 }}>
                    <Col>
                      <Space align="center">
                        <Progress
                          type="circle"
                          percent={assessment.score}
                          size={60}
                          status={getScoreColor(assessment.score)}
                          format={() => assessment.score}
                        />
                        <div>
                          <Text
                            strong
                            style={{
                              color:
                                assessment.score >= 85
                                  ? "#52c41a"
                                  : assessment.score >= 70
                                    ? "#1890ff"
                                    : assessment.score >= 50
                                      ? "#faad14"
                                      : "#f5222d",
                            }}
                          >
                            {getScoreText(assessment.score)}
                          </Text>
                          <br />
                          <Text type="secondary" style={{ fontSize: "12px" }}>
                            평가 점수
                          </Text>
                        </div>
                      </Space>
                    </Col>
                  </Row>
                  <Divider style={{ margin: "12px 0" }} />
                  <Title level={5} style={{ display: "flex", alignItems: "center" }}>
                    <InfoCircleOutlined style={{ color: "#1890ff", marginRight: 8 }} /> 현재 수준
                  </Title>
                  <Paragraph>{assessment.currentState}</Paragraph>
                  <Divider style={{ margin: "12px 0" }} />
                  <Title level={5} style={{ display: "flex", alignItems: "center" }}>
                    <BookOutlined style={{ color: "#1890ff", marginRight: 8 }} /> 개선 방향
                  </Title>
                  <Paragraph>{assessment.improvementDirection}</Paragraph>
                  {assessment.referenceLinks && assessment.referenceLinks.length > 0 && (
                    <>
                      <Divider style={{ margin: "12px 0" }} />
                      <Title level={5} style={{ display: "flex", alignItems: "center" }}>
                        <LinkOutlined style={{ color: "#722ed1", marginRight: 8 }} /> 참고 자료
                      </Title>
                      <List
                        itemLayout="horizontal"
                        split={false}
                        dataSource={assessment.referenceLinks}
                        renderItem={(link) => (
                          <List.Item style={{ padding: "4px 0" }}>
                            <a href={link} target="_blank" rel="noopener noreferrer">
                              {link}
                            </a>
                          </List.Item>
                        )}
                      />
                    </>
                  )}
                </Card>
              </div>
            ))
          ) : (
            <Empty description="기술 역량 평가 데이터가 없습니다" />
          )}
        </div>
        {renderQuizResults()}
        <Row gutter={16}>
          <Col span={24}>
            <Card title="종합 평가 및 피드백">
              <Paragraph>{feedbackData.overallFeedback}</Paragraph>
            </Card>
          </Col>
        </Row>
        <Row
          justify="center"
          style={{
            marginTop: 24,
            display: isButtonsVisible ? "flex" : "none",
          }}
          className="no-print"
        >
          <Space size="large">
            <Button icon={<HomeOutlined />} size="large" onClick={handleDashboardClick}>
              홈으로 가기
            </Button>
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              size="large"
              onClick={handlePrintPDF}
            >
              결과 PDF 저장
            </Button>
          </Space>
        </Row>
      </Content>
      <style>{`
        @media print {
          .no-print {
            display: none !important;
          }
        }
        .mb-6 {
          margin-bottom: 24px;
        }
      `}</style>
    </Layout>
  );
};

export default Result;
