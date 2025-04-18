import {
  Button,
  Typography,
  Layout,
  Space,
  Row,
  Col,
  Card,
  Divider,
  Avatar,
  Rate,
  List,
  Statistic,
} from "antd";
import {
  FileTextOutlined,
  RobotOutlined,
  BarChartOutlined,
  CheckCircleOutlined,
  RightOutlined,
  UserOutlined,
  UploadOutlined,
  TeamOutlined,
  BulbOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";

const { Title, Paragraph, Text } = Typography;
const { Header, Content, Footer } = Layout;

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const features = [
    {
      icon: <FileTextOutlined style={{ fontSize: 40, color: "#4f46e5" }} />,
      title: "이력서 분석",
      desc: "AI가 이력서를 분석해 맞춤형 질문을 생성합니다.",
    },
    {
      icon: <RobotOutlined style={{ fontSize: 40, color: "#9333ea" }} />,
      title: "AI 면접",
      desc: "대화형 인터뷰로 실전처럼 연습할 수 있습니다.",
    },
    {
      icon: <BarChartOutlined style={{ fontSize: 40, color: "#db2777" }} />,
      title: "피드백 제공",
      desc: "답변에 따른 분석 및 개선 포인트를 알려줍니다.",
    },
  ];

  const benefits = [
    "실제 면접 분위기와 유사",
    "이력서 기반 질문 생성",
    "즉각적인 피드백",
    "자신감 향상",
  ];

  const testimonials = [
    {
      name: "김지은",
      position: "SW 개발자",
      text: "AI 면접 연습 덕분에 실제 면접에서 자신감 있게 대답할 수 있었어요. 정말 추천합니다!",
    },
    {
      name: "이민수",
      position: "UX 디자이너",
      text: "이력서 기반 질문이 실제 면접과 너무 유사해서 놀랐어요. 완벽한 연습이 되었습니다.",
    },
    {
      name: "박소영",
      position: "마케팅 매니저",
      text: "피드백이 구체적이고 도움이 많이 되었어요. 덕분에 취업에 성공했습니다!",
    },
  ];

  const howItWorks = [
    {
      icon: <UploadOutlined style={{ fontSize: 24, color: "white" }} />,
      title: "이력서 업로드",
      desc: "경력, 기술 스택, 자기소개서를 포함한 이력서를 업로드합니다.",
    },
    {
      icon: <TeamOutlined style={{ fontSize: 24, color: "white" }} />,
      title: "AI 면접 진행",
      desc: "이력서 기반 맞춤형 질문에 답변하며 실전처럼 면접을 진행합니다.",
    },
    {
      icon: <BulbOutlined style={{ fontSize: 24, color: "white" }} />,
      title: "피드백 받기",
      desc: "답변에 대한 분석과 개선점을 확인하고 실력을 향상시킵니다.",
    },
  ];

  // 커스텀 스타일 정의
  const styles = {
    headerTitle: {
      color: "#4f46e5",
      margin: 0,
      fontSize: "1.6rem",
      fontWeight: "bold",
    },
    gradientTitle: {
      background: "linear-gradient(to right, #4f46e5, #9333ea, #db2777)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      textFillColor: "transparent",
      fontWeight: "bold",
    },
    container: {
      width: "100%",
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 16px",
      boxSizing: "border-box",
    },
    gradientBg: {
      background: "linear-gradient(to right, #4f46e5, #9333ea)",
      color: "white",
      width: "100%",
      overflow: "hidden",
    },
    indigo50: {
      backgroundColor: "#eef2ff",
      width: "100%",
      overflow: "hidden",
    },
    numberCircle: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: "#4f46e5",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      fontWeight: "bold",
      margin: "0 auto 24px auto",
    },
    chatBubbleUser: {
      backgroundColor: "#f3f4f6",
      padding: 16,
      borderRadius: 8,
    },
    chatBubbleAI: {
      backgroundColor: "#eef2ff",
      padding: 16,
      borderRadius: 8,
      color: "#4338ca",
    },
  };

  return (
    <Layout style={{ width: "100%", overflow: "hidden" }}>
      {/* Navigation */}
      <Header
        style={{
          background: "white",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          width: "100%",
          padding: "0 16px",
        }}
      >
        <div style={styles.container}>
          <Row justify="space-between" align="middle">
            <Col>
              <Title level={3} style={styles.headerTitle}>
                AI 면접관
              </Title>
            </Col>
            <Col>
              <Button type="primary" size="large">
                시작하기
              </Button>
            </Col>
          </Row>
        </div>
      </Header>

      <Content style={{ width: "100%", margin: 0, padding: 0, overflow: "hidden" }}>
        {/* Hero Section */}
        <div style={{ width: "100%", padding: "80px 0 64px", overflow: "hidden" }}>
          <div style={styles.container}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ width: "100%", textAlign: "center", maxWidth: "800px" }}>
                <div
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(20px)",
                    transition: "all 0.7s ease",
                  }}
                >
                  <Title
                    level={1}
                    style={{ ...styles.gradientTitle, fontSize: "2.5rem", marginBottom: 24 }}
                  >
                    AI 기술 면접관으로
                    <br />
                    면접 준비를 완벽하게
                  </Title>
                  <Paragraph style={{ fontSize: "1.125rem", color: "#4b5563", marginBottom: 32 }}>
                    이력서를 업로드하고 실전처럼 AI 면접을 경험해보세요. 맞춤형 질문과 즉각적인
                    피드백으로 면접 성공률을 높여드립니다.
                  </Paragraph>
                  <Space size="middle" style={{ display: "flex", justifyContent: "center" }}>
                    <Button type="primary" size="large" style={{ height: 48, padding: "0 24px" }}>
                      면접 시작하기
                    </Button>
                    <Button size="large" style={{ height: 48, padding: "0 24px" }}>
                      더 알아보기
                    </Button>
                  </Space>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div style={{ padding: "64px 0", background: "white", width: "100%", overflow: "hidden" }}>
          <div style={styles.container}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <Title level={2} style={{ fontSize: "2rem", marginBottom: 16 }}>
                핵심 기능
              </Title>
              <Paragraph
                style={{ fontSize: "1.125rem", color: "#4b5563", maxWidth: 768, margin: "0 auto" }}
              >
                AI 면접관은 최신 인공지능 기술을 활용하여 실전과 같은 면접 환경을 제공합니다.
              </Paragraph>
            </div>

            <Row gutter={[24, 24]}>
              {features.map((feature, index) => (
                <Col xs={24} md={8} key={index}>
                  <Card
                    hoverable
                    style={{
                      height: "100%",
                      textAlign: "center",
                      borderRadius: 12,
                      transition: "all 0.3s ease",
                    }}
                    bodyStyle={{ padding: 32 }}
                  >
                    <div style={{ marginBottom: 24 }}>{feature.icon}</div>
                    <Title level={4}>{feature.title}</Title>
                    <Paragraph style={{ color: "#4b5563" }}>{feature.desc}</Paragraph>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>

        {/* How It Works */}
        <div style={{ ...styles.indigo50, padding: "64px 0" }}>
          <div style={styles.container}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <Title level={2} style={{ fontSize: "2rem", marginBottom: 16 }}>
                어떻게 작동하나요?
              </Title>
              <Paragraph
                style={{ fontSize: "1.125rem", color: "#4b5563", maxWidth: 768, margin: "0 auto" }}
              >
                간단한 3단계로 AI 면접 준비를 시작하세요
              </Paragraph>
            </div>

            <Row gutter={[24, 24]}>
              {howItWorks.map((step, index) => (
                <Col xs={24} md={8} key={index}>
                  <Card
                    bordered={false}
                    style={{
                      height: "100%",
                      textAlign: "center",
                      borderRadius: 12,
                      boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
                    }}
                  >
                    <div style={styles.numberCircle}>{index + 1}</div>
                    <Title level={4}>{step.title}</Title>
                    <Paragraph style={{ color: "#4b5563" }}>{step.desc}</Paragraph>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>

        {/* Benefits */}
        <div style={{ padding: "64px 0", background: "white", width: "100%", overflow: "hidden" }}>
          <div style={styles.container}>
            <Row gutter={[48, 48]} align="middle">
              <Col xs={24} md={12}>
                <Title level={2} style={{ fontSize: "2rem", marginBottom: 16 }}>
                  AI 면접 연습의 장점
                </Title>
                <Paragraph style={{ fontSize: "1.125rem", color: "#4b5563", marginBottom: 32 }}>
                  AI 면접관을 통해 얻을 수 있는 다양한 이점들을 확인해보세요. 실전과 같은 환경에서
                  부담 없이 연습할 수 있습니다.
                </Paragraph>

                <List
                  itemLayout="horizontal"
                  dataSource={benefits}
                  renderItem={(item) => (
                    <List.Item>
                      <Space>
                        <CheckCircleOutlined style={{ color: "#22c55e", fontSize: 20 }} />
                        <Text style={{ fontSize: "1.125rem" }}>{item}</Text>
                      </Space>
                    </List.Item>
                  )}
                />
              </Col>

              <Col xs={24} md={12}>
                <Card
                  bordered={false}
                  style={{
                    borderRadius: 12,
                    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
                    overflow: "hidden",
                  }}
                >
                  <Card.Meta
                    title={
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "8px 0",
                        }}
                      >
                        <div style={{ display: "flex", gap: 8 }}>
                          <div
                            style={{
                              width: 12,
                              height: 12,
                              borderRadius: 6,
                              backgroundColor: "#f87171",
                            }}
                          ></div>
                          <div
                            style={{
                              width: 12,
                              height: 12,
                              borderRadius: 6,
                              backgroundColor: "#fbbf24",
                            }}
                          ></div>
                          <div
                            style={{
                              width: 12,
                              height: 12,
                              borderRadius: 6,
                              backgroundColor: "#34d399",
                            }}
                          ></div>
                        </div>
                        <Text style={{ fontSize: 14, color: "#6b7280" }}>AI 면접관</Text>
                      </div>
                    }
                    style={{ marginBottom: 16 }}
                  />

                  <Space direction="vertical" style={{ width: "100%" }} size="middle">
                    <div style={styles.chatBubbleAI}>
                      <Text>자기소개 부탁드립니다.</Text>
                    </div>

                    <div style={styles.chatBubbleUser}>
                      <Text>
                        안녕하세요, 저는 5년 경력의 프론트엔드 개발자입니다. React와 TypeScript를
                        주로 사용하며...
                      </Text>
                    </div>

                    <div style={styles.chatBubbleAI}>
                      <Text>가장 도전적이었던 프로젝트에 대해 말씀해주세요.</Text>
                    </div>

                    <div style={{ height: 28, backgroundColor: "#e5e7eb", borderRadius: 4 }}></div>
                  </Space>
                </Card>
              </Col>
            </Row>
          </div>
        </div>

        {/* Testimonials */}
        <div style={{ ...styles.indigo50, padding: "64px 0" }}>
          <div style={styles.container}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <Title level={2} style={{ fontSize: "2rem", marginBottom: 16 }}>
                사용자 후기
              </Title>
              <Paragraph
                style={{ fontSize: "1.125rem", color: "#4b5563", maxWidth: 768, margin: "0 auto" }}
              >
                AI 면접관을 통해 취업에 성공한 사용자들의 이야기를 들어보세요.
              </Paragraph>
            </div>

            <Row gutter={[24, 24]}>
              {testimonials.map((testimonial, index) => (
                <Col xs={24} md={8} key={index}>
                  <Card
                    bordered={false}
                    style={{
                      height: "100%",
                      borderRadius: 12,
                      boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
                    }}
                  >
                    <Rate
                      disabled
                      defaultValue={5}
                      style={{ marginBottom: 16, color: "#facc15" }}
                    />
                    <Paragraph
                      style={{
                        fontSize: "1rem",
                        color: "#4b5563",
                        fontStyle: "italic",
                        marginBottom: 24,
                      }}
                    >
                      "{testimonial.text}"
                    </Paragraph>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        size={48}
                        icon={<UserOutlined />}
                        style={{ marginRight: 16, backgroundColor: "#818cf8" }}
                      />
                      <div>
                        <Text strong>{testimonial.name}</Text>
                        <div>
                          <Text type="secondary">{testimonial.position}</Text>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>

        {/* Statistics */}
        <div style={{ padding: "64px 0", background: "white", width: "100%", overflow: "hidden" }}>
          <div style={styles.container}>
            <Row gutter={[32, 32]}>
              <Col xs={24} sm={12} md={6}>
                <Statistic
                  title="사용자 만족도"
                  value={98}
                  suffix="%"
                  valueStyle={{ color: "#4f46e5" }}
                />
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Statistic
                  title="면접 진행 수"
                  value={15000}
                  suffix="+"
                  valueStyle={{ color: "#4f46e5" }}
                />
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Statistic
                  title="취업 성공률"
                  value={85}
                  suffix="%"
                  valueStyle={{ color: "#4f46e5" }}
                />
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Statistic
                  title="기업 채용 질문"
                  value={500}
                  suffix="+"
                  valueStyle={{ color: "#4f46e5" }}
                />
              </Col>
            </Row>
          </div>
        </div>

        {/* CTA */}
        <div style={styles.gradientBg}>
          <div style={{ ...styles.container, padding: "64px 0", textAlign: "center" }}>
            <Title level={2} style={{ color: "white", marginBottom: 16 }}>
              지금 바로 면접 연습을 시작하세요
            </Title>
            <Paragraph
              style={{
                color: "rgba(255, 255, 255, 0.9)",
                fontSize: "1.125rem",
                maxWidth: 768,
                margin: "0 auto 32px",
              }}
            >
              AI 면접관과 함께 자신감을 키우고 취업 성공률을 높이세요. 이력서 분석부터 맞춤형
              피드백까지 단 몇 분이면 시작할 수 있습니다.
            </Paragraph>
            <Button
              size="large"
              style={{
                backgroundColor: "white",
                color: "#4f46e5",
                height: 48,
                padding: "0 32px",
                fontSize: "1rem",
                fontWeight: 500,
              }}
            >
              무료로 시작하기 <RightOutlined />
            </Button>
          </div>
        </div>
      </Content>

      {/* Footer */}
      <Footer
        style={{
          background: "#111827",
          padding: "48px 0 24px",
          width: "100%",
          margin: 0,
          overflow: "hidden",
        }}
      >
        <div style={styles.container}>
          <Row gutter={[48, 32]}>
            <Col xs={24} md={8}>
              <Title level={3} style={{ color: "white", marginBottom: 16 }}>
                AI 면접관
              </Title>
              <Paragraph style={{ color: "rgba(255, 255, 255, 0.6)" }}>
                AI 기술을 활용한 혁신적인 면접 준비 플랫폼. 맞춤형 질문과 피드백으로 취업 성공을
                도와드립니다.
              </Paragraph>
            </Col>

            <Col xs={24} md={16}>
              <Row gutter={[24, 24]}>
                <Col xs={12} sm={8}>
                  <Title level={5} style={{ color: "white", marginBottom: 16 }}>
                    서비스
                  </Title>
                  <Space direction="vertical">
                    <Button type="link" style={{ color: "rgba(255, 255, 255, 0.6)", padding: 0 }}>
                      이력서 분석
                    </Button>
                    <Button type="link" style={{ color: "rgba(255, 255, 255, 0.6)", padding: 0 }}>
                      AI 면접
                    </Button>
                    <Button type="link" style={{ color: "rgba(255, 255, 255, 0.6)", padding: 0 }}>
                      피드백
                    </Button>
                  </Space>
                </Col>

                <Col xs={12} sm={8}>
                  <Title level={5} style={{ color: "white", marginBottom: 16 }}>
                    회사
                  </Title>
                  <Space direction="vertical">
                    <Button type="link" style={{ color: "rgba(255, 255, 255, 0.6)", padding: 0 }}>
                      소개
                    </Button>
                    <Button type="link" style={{ color: "rgba(255, 255, 255, 0.6)", padding: 0 }}>
                      블로그
                    </Button>
                    <Button type="link" style={{ color: "rgba(255, 255, 255, 0.6)", padding: 0 }}>
                      연락처
                    </Button>
                  </Space>
                </Col>

                <Col xs={12} sm={8}>
                  <Title level={5} style={{ color: "white", marginBottom: 16 }}>
                    법적 정보
                  </Title>
                  <Space direction="vertical">
                    <Button type="link" style={{ color: "rgba(255, 255, 255, 0.6)", padding: 0 }}>
                      이용약관
                    </Button>
                    <Button type="link" style={{ color: "rgba(255, 255, 255, 0.6)", padding: 0 }}>
                      개인정보처리방침
                    </Button>
                  </Space>
                </Col>
              </Row>
            </Col>
          </Row>

          <Divider style={{ borderColor: "rgba(255, 255, 255, 0.1)", margin: "48px 0 24px" }} />

          <div style={{ textAlign: "center" }}>
            <Text style={{ color: "rgba(255, 255, 255, 0.5)" }}>
              &copy; 2025 AI 면접관. All rights reserved.
            </Text>
          </div>
        </div>
      </Footer>
    </Layout>
  );
};

export default Home;
