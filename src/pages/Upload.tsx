import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, Button, message, Typography, Layout, theme } from "antd";
import { CloudUploadOutlined, RocketOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd/es/upload/interface";
import usePdfStore from "../store/promptStore";
import axios from "axios";
import { Message } from "../types/interview";

const { Dragger } = Upload;
const { Title, Paragraph } = Typography;
const { Content } = Layout;
const { useToken } = theme;

// 상수 정의
const FILE_SIZE_LIMIT = 10; // MB
const API_ENDPOINT = "http://10.10.98.81:8080/api/gemini/chat-with-pdf-json";

// 타입 정의
interface FileUploadResponse {
  messages: Message[];
}

interface PdfFileData {
  name: string;
  content: string;
}

const UploadPage = () => {
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [encodedFile, setEncodedFile] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setPdfBase64, setMessages, setFileName } = usePdfStore();
  const { token } = useToken();

  // PDF 파일을 Base64로 인코딩하는 함수
  const encodeFileToBase64 = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result as string;
        const base64Content = base64String.split(",")[1];
        resolve(base64Content);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  // 파일 유효성 검사
  const validateFile = (file: File): boolean => {
    const isPDF = file.type === "application/pdf";
    if (!isPDF) {
      message.error("PDF 파일만 업로드 가능합니다.");
      return false;
    }

    const isLt10M = file.size / 1024 / 1024 < FILE_SIZE_LIMIT;
    if (!isLt10M) {
      message.error(`파일 크기는 ${FILE_SIZE_LIMIT}MB를 초과할 수 없습니다.`);
      return false;
    }

    return true;
  };

  // API 호출 함수
  const uploadToServer = async (fileData: PdfFileData): Promise<void> => {
    try {
      const response = await axios.post<FileUploadResponse>(API_ENDPOINT, {
        messages: [],
        pdfFileData: fileData,
      });

      setMessages(response.data.messages);
      setFileName(fileData.name);
      navigate("/interview");
    } catch (error) {
      console.error("API 호출 중 오류가 발생했습니다:", error);
      message.error("파일 업로드 중 오류가 발생했습니다.");
      throw error;
    }
  };

  const handleUpload = async () => {
    if (fileList.length === 0) {
      message.error("파일을 선택해주세요.");
      return;
    }

    if (!encodedFile) {
      message.error("파일 인코딩에 실패했습니다.");
      return;
    }

    setLoading(true);
    try {
      await uploadToServer({
        name: fileList[0].name,
        content: encodedFile,
      });
    } finally {
      setLoading(false);
    }
  };

  const uploadProps: UploadProps = {
    name: "file",
    multiple: false,
    accept: ".pdf",
    fileList,
    beforeUpload: async (file: File) => {
      if (!validateFile(file)) {
        return Upload.LIST_IGNORE;
      }

      try {
        const encoded = await encodeFileToBase64(file);
        setEncodedFile(encoded);
        setPdfBase64(encoded);
        message.success("이력서가 성공적으로 업로드되었습니다.");
      } catch (error) {
        console.error("Base64 인코딩 실패:", error);
        message.error("파일 인코딩에 실패했습니다.");
      }

      return false;
    },
    onChange: (info) => {
      setFileList([info.fileList[0]]);
    },
  };

  return (
    <Layout>
      <Content style={{ minHeight: "100vh", background: token.colorBgContainer, padding: "24px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 20px" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <Title
              level={1}
              style={{
                fontSize: "2.5rem",
                marginBottom: "16px",
                background: "linear-gradient(to right, #4f46e5, #9333ea)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              MARU와 함께하는 첫걸음
            </Title>
            <Paragraph
              style={{
                fontSize: "1.25rem",
                color: token.colorTextSecondary,
                maxWidth: "800px",
                margin: "0 auto",
              }}
            >
              이력서를 업로드하면 AI 코치가 맞춤형 성장 가이드를 제공합니다.
              <br />
              실무 역량 향상을 위한 전문적인 코칭을 시작하세요.
            </Paragraph>
          </div>

          <div
            style={{
              background: token.colorBgContainer,
              borderRadius: token.borderRadiusLG,
              boxShadow: token.boxShadowTertiary,
              padding: "32px",
              marginBottom: "24px",
            }}
          >
            <Dragger {...uploadProps} style={{ padding: "40px 20px" }}>
              <p style={{ marginBottom: "24px" }}>
                <CloudUploadOutlined style={{ fontSize: "48px", color: token.colorPrimary }} />
              </p>
              <p
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "500",
                  marginBottom: "16px",
                  color: token.colorTextHeading,
                }}
              >
                이력서를 업로드하세요
              </p>
              <p
                style={{
                  fontSize: "1rem",
                  color: token.colorTextSecondary,
                }}
              >
                AI 코치가 이력서를 분석하여 맞춤형 성장 전략을 제시합니다
              </p>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: token.colorTextDescription,
                  marginTop: "8px",
                }}
              >
                PDF 파일만 가능 • 최대 {FILE_SIZE_LIMIT}MB
              </p>
            </Dragger>
          </div>

          <Button
            type="primary"
            size="large"
            onClick={handleUpload}
            loading={loading}
            disabled={fileList.length === 0}
            icon={<RocketOutlined />}
            style={{
              width: "100%",
              height: "50px",
              fontSize: "1.125rem",
              background: "linear-gradient(to right, #4f46e5, #9333ea)",
              borderRadius: token.borderRadiusLG,
            }}
          >
            {loading ? "분석 중..." : "AI 코칭 시작하기"}
          </Button>
        </div>
      </Content>
    </Layout>
  );
};

export default UploadPage;
