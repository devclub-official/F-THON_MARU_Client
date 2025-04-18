import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, Button, message, Typography } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd/es/upload/interface";
import usePdfStore from "../store/promptStore";
import axios from "axios";
import { Message } from "../types/interview";

const { Dragger } = Upload;
const { Title, Paragraph } = Typography;

// 상수 정의
const FILE_SIZE_LIMIT = 10; // MB
const API_ENDPOINT = "http://10.10.98.81:8080/api/gemini/chat-with-pdf-json";

// 타입 정의
interface FileUploadResponse {
  messages: Message[]; // TODO: 실제 메시지 타입 정의 필요
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
        console.log("PDF가 Base64로 인코딩되었습니다.");
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
    <div
      className="min-h-screen bg-gradient-to-b from-white to-gray-50 px-4 sm:px-6 md:px-8"
      style={{ backgroundColor: "#f5f5f5", padding: "24px 84px" }}
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-[24px] py-[80px]">
        <div className="mb-16 text-center">
          <Title level={1} className="mb-6 text-4xl font-bold" style={{ fontWeight: 700 }}>
            이력서 업로드
          </Title>
          <Paragraph className="text-xl text-gray-600">
            PDF 형식의 이력서를 업로드하여 AI 면접을 시작하세요.
          </Paragraph>
        </div>

        <div className="w-full max-w-2xl rounded-2xl bg-white p-10 shadow-lg">
          <Dragger {...uploadProps} className="mb-8">
            <div className="p-12">
              <p className="ant-upload-drag-icon mb-6">
                <CloudUploadOutlined className="text-6xl text-indigo-600" />
              </p>
              <p className="ant-upload-text mb-4 text-2xl font-medium">
                PDF 파일을 여기에 드래그하거나 클릭하여 업로드하세요
              </p>
              <p className="ant-upload-hint text-lg text-gray-500">
                파일 크기는 {FILE_SIZE_LIMIT}MB를 초과할 수 없습니다.
              </p>
            </div>
          </Dragger>
        </div>

        <Button
          type="primary"
          size="large"
          onClick={handleUpload}
          loading={loading}
          style={{ color: "white", fontSize: "1.125rem", height: "3.5rem" }}
          disabled={fileList.length === 0}
          className="mt-4 w-full max-w-2xl rounded-xl"
          icon={<CloudUploadOutlined style={{ fontSize: "1.25rem" }} />}
        >
          업로드 및 분석 시작
        </Button>
      </div>
    </div>
  );
};

export default UploadPage;
