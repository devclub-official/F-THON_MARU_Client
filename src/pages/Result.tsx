import React, { useState } from "react";
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
  Collapse,
  Badge,
} from "antd";
import {
  CheckCircleOutlined,
  WarningOutlined,
  BookOutlined,
  CodeOutlined,
  HomeOutlined,
  DownloadOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

const { Header, Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Panel } = Collapse;

// 예시 데이터
const sampleFeedbackData = {
  candidateInfo: {
    name: "홍길동",
    position: "프론트엔드 개발자",
    interviewDate: "2025-04-15",
    overallRating: 78,
  },
  technicalAssessments: [
    {
      skill: "React",
      level: "중급",
      score: 85,
      strengths: [
        "컴포넌트 설계 패턴에 대한 이해가 우수함",
        "React Hooks 활용 능력이 뛰어남",
        "상태 관리 개념에 대한 이해도가 높음",
      ],
      areasForImprovement: [
        "성능 최적화 기법에 대한 지식 부족",
        "대규모 애플리케이션 아키텍처 경험 제한적",
      ],
      recommendations: [
        "React.memo, useMemo, useCallback을 활용한 성능 최적화 학습",
        "코드 스플리팅 및 지연 로딩 기술 학습",
        "상태 관리 라이브러리(Redux, Recoil) 심화 학습",
      ],
      codeExamples: [
        {
          problem: "무거운 계산을 최적화하는 방법",
          candidateSolution:
            "function Component() {\n  const result = heavyCalculation(props);\n  return <div>{result}</div>;\n}",
          improvedSolution:
            "function Component(props) {\n  const result = useMemo(() => {\n    return heavyCalculation(props);\n  }, [props.dependencyValue]);\n  return <div>{result}</div>;\n}",
          explanation: "useMemo를 사용하여 의존성이 변경될 때만 계산을 수행하도록 최적화했습니다.",
        },
      ],
    },
    {
      skill: "TypeScript",
      level: "초급-중급",
      score: 72,
      strengths: ["기본적인 타입 정의 능력이 좋음", "인터페이스와 타입 활용 능력이 적절함"],
      areasForImprovement: [
        "제네릭 타입 활용 능력 부족",
        "고급 타입 기능(유틸리티 타입, 조건부 타입 등) 이해 미흡",
      ],
      recommendations: [
        "TypeScript 공식 문서의 제네릭 섹션 학습",
        "타입스크립트 핸드북 고급 타입 부분 학습",
        "실제 프로젝트에서 유틸리티 타입 활용해보기",
      ],
    },
    {
      skill: "JavaScript",
      level: "중급",
      score: 80,
      strengths: ["ES6+ 기능에 대한 이해도가 높음", "비동기 프로그래밍 개념 이해가 우수함"],
      areasForImprovement: ["클로저와 스코프에 대한 이해 부족", "프로토타입 상속 개념 이해가 미흡"],
      recommendations: [
        "JavaScript: The Good Parts 도서 학습",
        "MDN의 클로저 및 프로토타입 문서 학습",
        "함수형 프로그래밍 패턴 연습",
      ],
    },
  ],
  softSkills: [
    {
      category: "의사소통 능력",
      score: 85,
      feedback:
        "질문을 명확하게 이해하고 논리적으로 답변하는 능력이 좋습니다. 기술적 개념을 쉽게 설명할 수 있는 능력이 있으나, 간혹 너무 자세한 설명으로 핵심을 놓치는 경우가 있습니다.",
      recommendations: [
        "STAR 방법론을 활용한 구체적 예시 제시 연습",
        "핵심을 먼저 제시하고 세부 사항을 나중에 설명하는 방식 연습",
      ],
    },
    {
      category: "문제 해결 능력",
      score: 75,
      feedback:
        "문제를 분석하고 해결책을 찾는 접근 방식이 체계적입니다. 다만, 시간 제약 하에서 압박감을 느끼는 모습이 보였습니다.",
      recommendations: [
        "알고리즘 문제 풀이 시 시간을 측정하며 연습",
        "화이트보드 코딩 연습을 통한 압박 상황 적응력 향상",
      ],
    },
    {
      category: "팀워크 및 협업",
      score: 80,
      feedback:
        "과거 프로젝트에서 협업 경험을 잘 설명했으며, 팀 내 역할과 기여도가 분명했습니다. 갈등 해결 경험에 대한 구체적 사례가 부족했습니다.",
      recommendations: [
        "갈등 해결 시나리오 준비 및 연습",
        "코드 리뷰 경험 및 피드백 수용 사례 준비",
      ],
    },
  ],
  overallFeedback:
    "전반적으로 기술적 역량이 우수하며 특히 React와 JavaScript에 대한 이해도가 높습니다. 성능 최적화와 고급 TypeScript 기능에 대한 학습이 필요합니다. 소통 능력이 좋으나 압박 상황에서의 문제 해결 능력을 향상시키면 더 좋은 결과를 얻을 수 있을 것입니다.",
  nextSteps: [
    "2주 내 기술 과제 제출",
    "1개월 내 팀 리더와의 2차 면접",
    "포트폴리오 추가 제출 (성능 최적화 사례 포함)",
  ],
};

const Result = () => {
  const [feedbackData, setFeedbackData] = useState(sampleFeedbackData);
  const [activeSkill, setActiveSkill] = useState(feedbackData.technicalAssessments[0]?.skill);

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

  const renderTechnicalAssessment = (assessment) => {
    return (
      <Card style={{ marginBottom: 16 }}>
        <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
          <Col>
            <Space>
              <Title level={4} style={{ margin: 0 }}>
                {assessment.skill}
              </Title>
              <Tag color="blue">{assessment.level}</Tag>
            </Space>
            <Text type="secondary">상세 기술 역량 평가 및 개선 방향</Text>
          </Col>
          <Col>
            <Space align="center">
              <Progress
                type="circle"
                percent={assessment.score}
                width={60}
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

        <Row gutter={24}>
          <Col span={12}>
            <Title level={5} style={{ display: "flex", alignItems: "center" }}>
              <CheckCircleOutlined style={{ color: "#52c41a", marginRight: 8 }} /> 강점
            </Title>
            <List
              itemLayout="horizontal"
              dataSource={assessment.strengths}
              renderItem={(item) => (
                <List.Item>
                  <Text>{item}</Text>
                </List.Item>
              )}
            />
          </Col>
          <Col span={12}>
            <Title level={5} style={{ display: "flex", alignItems: "center" }}>
              <ExclamationCircleOutlined style={{ color: "#faad14", marginRight: 8 }} /> 개선 필요
              영역
            </Title>
            <List
              itemLayout="horizontal"
              dataSource={assessment.areasForImprovement}
              renderItem={(item) => (
                <List.Item>
                  <Text>{item}</Text>
                </List.Item>
              )}
            />
          </Col>
        </Row>

        <Divider style={{ margin: "16px 0" }} />

        <Title level={5} style={{ display: "flex", alignItems: "center" }}>
          <BookOutlined style={{ color: "#1890ff", marginRight: 8 }} /> 학습 추천
        </Title>
        <Card style={{ backgroundColor: "#f0f5ff", marginBottom: 16 }}>
          <List
            itemLayout="horizontal"
            dataSource={assessment.recommendations}
            renderItem={(item) => (
              <List.Item>
                <Text>{item}</Text>
              </List.Item>
            )}
          />
        </Card>

        {assessment.codeExamples && assessment.codeExamples.length > 0 && (
          <>
            <Title level={5} style={{ display: "flex", alignItems: "center" }}>
              <CodeOutlined style={{ color: "#722ed1", marginRight: 8 }} /> 코드 예제
            </Title>
            <Collapse>
              {assessment.codeExamples.map((example, index) => (
                <Panel key={index} header={example.problem}>
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <div>
                      <Text type="secondary">응시자 코드:</Text>
                      <Card
                        style={{ backgroundColor: "#000", color: "#fff", marginTop: 8 }}
                        bodyStyle={{ padding: 12 }}
                      >
                        <pre style={{ margin: 0, color: "#fff" }}>{example.candidateSolution}</pre>
                      </Card>
                    </div>

                    <div>
                      <Text type="secondary">개선된 코드:</Text>
                      <Card
                        style={{ backgroundColor: "#000", color: "#52c41a", marginTop: 8 }}
                        bodyStyle={{ padding: 12 }}
                      >
                        <pre style={{ margin: 0, color: "#52c41a" }}>
                          {example.improvedSolution}
                        </pre>
                      </Card>
                    </div>

                    <div>
                      <Text type="secondary">설명:</Text>
                      <Paragraph style={{ marginTop: 8 }}>{example.explanation}</Paragraph>
                    </div>
                  </Space>
                </Panel>
              ))}
            </Collapse>
          </>
        )}
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
              면접 결과 피드백
            </Title>
            <Text style={{ color: "rgba(255, 255, 255, 0.85)" }}>AI 기반 분석 및 개선 제안</Text>
          </Col>
          <Col>
            <Card style={{ width: "auto" }}>
              <Row gutter={16} align="middle">
                <Col>
                  <div>
                    <Text type="secondary">지원자</Text>
                    <Title level={4} style={{ margin: "4px 0" }}>
                      {feedbackData.candidateInfo.name}
                    </Title>
                    <Text>{feedbackData.candidateInfo.position}</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: "12px" }}>
                      면접일: {feedbackData.candidateInfo.interviewDate}
                    </Text>
                  </div>
                </Col>
                <Col>
                  <Card
                    style={{
                      width: 80,
                      height: 80,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      background: "#f0f2f5",
                      borderRadius: "50%",
                      padding: 0,
                    }}
                    bodyStyle={{
                      padding: 0,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Title level={3} style={{ margin: 0, color: "#2f54eb" }}>
                      {feedbackData.candidateInfo.overallRating}
                    </Title>
                    <Text type="secondary" style={{ fontSize: "12px" }}>
                      종합 점수
                    </Text>
                  </Card>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Header>

      <Content style={{ padding: "24px 50px", maxWidth: 1200, margin: "0 auto" }}>
        <Title level={3}>기술 역량 평가</Title>
        <Tabs
          activeKey={activeSkill}
          onChange={setActiveSkill}
          tabPosition="top"
          style={{ marginBottom: 24 }}
        >
          {feedbackData.technicalAssessments.map((assessment) => (
            <TabPane
              tab={
                <span>
                  {assessment.skill}
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
                      marginLeft: 8,
                    }}
                  />
                </span>
              }
              key={assessment.skill}
            >
              {renderTechnicalAssessment(assessment)}
            </TabPane>
          ))}
        </Tabs>

        <Title level={3}>커뮤니케이션 및 소프트 스킬</Title>
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          {feedbackData.softSkills.map((skill) => (
            <Col span={8} key={skill.category}>
              <Card
                title={
                  <Space>
                    {skill.category}
                    <Badge
                      count={skill.score}
                      style={{
                        backgroundColor:
                          skill.score >= 85
                            ? "#52c41a"
                            : skill.score >= 70
                              ? "#1890ff"
                              : skill.score >= 50
                                ? "#faad14"
                                : "#f5222d",
                      }}
                    />
                  </Space>
                }
                bordered={true}
              >
                <Paragraph>{skill.feedback}</Paragraph>
                <Divider plain>추천 사항</Divider>
                <List
                  size="small"
                  dataSource={skill.recommendations}
                  renderItem={(item) => <List.Item>{item}</List.Item>}
                />
              </Card>
            </Col>
          ))}
        </Row>

        <Row gutter={16}>
          <Col span={16}>
            <Card title="종합 평가">
              <Paragraph>{feedbackData.overallFeedback}</Paragraph>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="다음 단계">
              <List
                dataSource={feedbackData.nextSteps}
                renderItem={(item, index) => (
                  <List.Item>
                    <Badge count={index + 1} style={{ backgroundColor: "#2f54eb" }} />
                    <span style={{ marginLeft: 12 }}>{item}</span>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>

        <Row justify="center" style={{ marginTop: 24 }}>
          <Space size="large">
            <Button icon={<HomeOutlined />} size="large">
              대시보드
            </Button>
            <Button type="primary" icon={<DownloadOutlined />} size="large">
              피드백 PDF 저장
            </Button>
          </Space>
        </Row>
      </Content>
    </Layout>
  );
};

export default Result;
