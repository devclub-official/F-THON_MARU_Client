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
import { useNavigate } from "react-router-dom";

const { Title, Paragraph, Text } = Typography;
const { Header, Content, Footer } = Layout;

const Home = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const features = [
    {
      icon: <FileTextOutlined style={{ fontSize: 40, color: "#4f46e5" }} />,
      title: "이력서 분석",
      desc: "AI가 이력서를 분석해 맞춤형 학습 계획을 제시합니다.",
    },
    {
      icon: <RobotOutlined style={{ fontSize: 40, color: "#9333ea" }} />,
      title: "AI 코칭",
      desc: "대화형 학습으로 실무 역량을 키울 수 있습니다.",
    },
    {
      icon: <BarChartOutlined style={{ fontSize: 40, color: "#db2777" }} />,
      title: "성장 분석",
      desc: "학습 과정에 따른 역량 분석 및 개선 방향을 제시합니다.",
    },
  ];

  const benefits = ["실무 중심 학습", "맞춤형 커리큘럼", "즉각적인 피드백", "역량 향상"];

  const testimonials = [
    {
      name: "김지은",
      position: "SW 개발자",
      text: "AI 코칭 덕분에 실무에서 필요한 역량을 효과적으로 키울 수 있었어요. 정말 추천합니다!",
    },
    {
      name: "이민수",
      position: "UX 디자이너",
      text: "맞춤형 학습 계획이 실무와 너무 잘 맞아서 놀랐어요. 체계적인 성장이 가능했습니다.",
    },
    {
      name: "박소영",
      position: "마케팅 매니저",
      text: "구체적인 피드백으로 부족한 부분을 명확히 알 수 있었어요. 덕분에 실력이 많이 늘었습니다!",
    },
  ];

  const howItWorks = [
    {
      icon: <UploadOutlined style={{ fontSize: 24, color: "white" }} />,
      title: "이력서 업로드",
      desc: "경력, 기술 스택, 목표를 포함한 이력서를 업로드합니다.",
    },
    {
      icon: <TeamOutlined style={{ fontSize: 24, color: "white" }} />,
      title: "AI 코칭 시작",
      desc: "맞춤형 학습과 실전 연습을 통해 실무 역량을 키웁니다.",
    },
    {
      icon: <BulbOutlined style={{ fontSize: 24, color: "white" }} />,
      title: "성장 분석",
      desc: "학습 과정에 대한 분석과 개선점을 확인하고 지속적으로 발전합니다.",
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
      margin: "0 auto",
      padding: "0",
    },
    gradientBg: {
      background: "linear-gradient(to right, #4f46e5, #9333ea)",
      color: "white",
    },
    indigo50: {
      backgroundColor: "#eef2ff",
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
    <Layout>
      {/* Navigation */}
      <Header
        style={{
          background: "white",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          width: "100%",
        }}
      >
        <div style={styles.container}>
          <Row justify="space-between" align="middle">
            <Col>
              <Title level={3} style={styles.headerTitle}>
                MARU
              </Title>
            </Col>
            <Col>
              <Button type="primary" size="large" onClick={() => navigate("/upload")}>
                시작하기
              </Button>
            </Col>
          </Row>
        </div>
      </Header>

      <Content style={{ width: "100%", margin: 0, padding: 0 }}>
        {/* Hero Section */}
        <div className="py-20" style={{ width: "100%" }}>
          <div className="container mx-auto px-0" style={{ width: "100%" }}>
            <div className="flex justify-center">
              <div className="w-full text-center md:w-2/3 lg:w-1/2">
                <div
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(20px)",
                    transition: "all 0.7s ease",
                    padding: "80px 0 64px",
                  }}
                >
                  <Title
                    level={1}
                    style={{ ...styles.gradientTitle, fontSize: "2.5rem", marginBottom: 24 }}
                  >
                    MARU로
                    <br />
                    커리어 성장을 가속화하세요
                  </Title>
                  <Paragraph style={{ fontSize: "1.125rem", color: "#4b5563", marginBottom: 32 }}>
                    이력서를 업로드하고 AI 코칭을 경험해보세요. 맞춤형 학습과 즉각적인 피드백으로
                    실무 역량을 키워드립니다.
                  </Paragraph>
                  <Space size="middle" className="justify-center">
                    <Button
                      type="primary"
                      size="large"
                      style={{ height: 48, padding: "0 24px" }}
                      onClick={() => navigate("/upload")}
                    >
                      학습 시작하기
                    </Button>
                    <Button
                      size="large"
                      style={{ height: 48, padding: "0 24px" }}
                      onClick={() => navigate("/upload")}
                    >
                      더 알아보기
                    </Button>
                  </Space>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div style={{ padding: "64px 0", background: "white" }}>
          <div style={styles.container}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <Title level={2} style={{ fontSize: "2rem", marginBottom: 16 }}>
                핵심 기능
              </Title>
              <Paragraph
                style={{ fontSize: "1.125rem", color: "#4b5563", maxWidth: 768, margin: "0 auto" }}
              >
                MARU는 최신 인공지능 기술을 활용하여 효과적인 실무 역량 향상을 지원합니다.
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
        <div style={{ ...styles.indigo50, padding: "64px 24px" }}>
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
        <div style={{ padding: "64px 24px", background: "white" }}>
          <div style={styles.container}>
            <Row gutter={[48, 48]} align="middle">
              <Col xs={24} md={12}>
                <Title level={2} style={{ fontSize: "2rem", marginBottom: 16 }}>
                  실무 역량 향상의 장점
                </Title>
                <Paragraph style={{ fontSize: "1.125rem", color: "#4b5563", marginBottom: 32 }}>
                  MARU를 통해 얻을 수 있는 다양한 이점들을 확인해보세요. 체계적인 학습과 실전 경험을
                  통해 실무 역량을 키울 수 있습니다.
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
                        <Text style={{ fontSize: 14, color: "#6b7280" }}>AI 코치</Text>
                      </div>
                    }
                    style={{ marginBottom: 16 }}
                  />

                  <Space direction="vertical" style={{ width: "100%" }} size="middle">
                    <div style={styles.chatBubbleAI}>
                      <Text>현재 담당하고 계신 업무에 대해 설명해주세요.</Text>
                    </div>

                    <div style={styles.chatBubbleUser}>
                      <Text>
                        프론트엔드 개발자로서 React와 TypeScript를 활용한 웹 애플리케이션 개발을
                        담당하고 있습니다...
                      </Text>
                    </div>

                    <div style={styles.chatBubbleAI}>
                      <Text>프론트엔드 성능 최적화 경험에 대해 이야기해볼까요?</Text>
                    </div>

                    <div style={{ height: 28, backgroundColor: "#e5e7eb", borderRadius: 4 }}></div>
                  </Space>
                </Card>
              </Col>
            </Row>
          </div>
        </div>

        {/* Testimonials */}
        <div style={{ ...styles.indigo50, padding: "64px 24px" }}>
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
        <div style={{ padding: "64px 0", background: "white", width: "100%" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", width: "100%" }}>
            <Row gutter={[32, 32]} justify="center" align="middle">
              <Col xs={24} sm={12} md={6} style={{ textAlign: "center" }}>
                <Statistic
                  title={<div style={{ fontSize: "1.1rem", color: "#6b7280" }}>사용자 만족도</div>}
                  value={98}
                  suffix="%"
                  valueStyle={{ color: "#4f46e5", fontSize: "2rem", fontWeight: "bold" }}
                />
              </Col>
              <Col xs={24} sm={12} md={6} style={{ textAlign: "center" }}>
                <Statistic
                  title={<div style={{ fontSize: "1.1rem", color: "#6b7280" }}>면접 진행 수</div>}
                  value={15000}
                  suffix="+"
                  valueStyle={{ color: "#4f46e5", fontSize: "2rem", fontWeight: "bold" }}
                />
              </Col>
              <Col xs={24} sm={12} md={6} style={{ textAlign: "center" }}>
                <Statistic
                  title={<div style={{ fontSize: "1.1rem", color: "#6b7280" }}>취업 성공률</div>}
                  value={85}
                  suffix="%"
                  valueStyle={{ color: "#4f46e5", fontSize: "2rem", fontWeight: "bold" }}
                />
              </Col>
              <Col xs={24} sm={12} md={6} style={{ textAlign: "center" }}>
                <Statistic
                  title={<div style={{ fontSize: "1.1rem", color: "#6b7280" }}>기업 채용 질문</div>}
                  value={500}
                  suffix="+"
                  valueStyle={{ color: "#4f46e5", fontSize: "2rem", fontWeight: "bold" }}
                />
              </Col>
            </Row>
          </div>
        </div>

        {/* CTA */}
        <div style={styles.gradientBg}>
          <div style={{ ...styles.container, padding: "64px 24px", textAlign: "center" }}>
            <Title level={2} style={{ color: "white", marginBottom: 16 }}>
              지금 바로 성장을 시작하세요
            </Title>
            <Paragraph
              style={{
                color: "rgba(255, 255, 255, 0.9)",
                fontSize: "1.125rem",
                maxWidth: 768,
                margin: "0 auto 32px",
              }}
            >
              MARU와 함께 실무 역량을 키우고 커리어를 발전시키세요. 이력서 분석부터 맞춤형
              피드백까지 단 몇 분이면 시작할 수 있습니다.
            </Paragraph>
            <Button
              size="large"
              onClick={() => navigate("/upload")}
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
      <Footer style={{ background: "#111827", padding: "48px 0 24px", width: "100%", margin: 0 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", width: "100%" }}>
          <Row gutter={[48, 32]}>
            <Col xs={24} md={8}>
              <Title level={3} style={{ color: "white", marginBottom: 16 }}>
                MARU
              </Title>
              <Paragraph style={{ color: "rgba(255, 255, 255, 0.6)" }}>
                AI 기술을 활용한 혁신적인 커리어 성장 플랫폼. 맞춤형 학습과 피드백으로 실무 역량
                향상을 도와드립니다.
              </Paragraph>
            </Col>

            <Col xs={24} md={16}>
              <Row gutter={[24, 24]} justify="end">
                <Col xs={12} sm={8}>
                  <Title level={5} style={{ color: "white", marginBottom: 16 }}>
                    서비스
                  </Title>
                  <Space direction="vertical">
                    <Button type="link" style={{ color: "rgba(255, 255, 255, 0.6)", padding: 0 }}>
                      이력서 분석
                    </Button>
                    <Button type="link" style={{ color: "rgba(255, 255, 255, 0.6)", padding: 0 }}>
                      AI 코칭
                    </Button>
                    <Button type="link" style={{ color: "rgba(255, 255, 255, 0.6)", padding: 0 }}>
                      성장 분석
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
              &copy; 2025 MARU. All rights reserved.
            </Text>
          </div>
        </div>
      </Footer>
    </Layout>
  );
};

export default Home;
