import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, Button, message, Typography } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import usePdfStore from "../store/promptStore";
import axios from "axios";

const { Dragger } = Upload;
const { Title, Paragraph } = Typography;

const UploadPage = () => {
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [encodedFile, setEncodedFile] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setPdfBase64, setMessages, setFileName } = usePdfStore(); // Zustand 스토어 사용

  // PDF 파일을 Base64로 인코딩하는 함수
  const encodeFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // readAsDataURL은 "data:application/pdf;base64," 형식의 접두사를 포함합니다.
        // 순수 Base64 문자열만 필요한 경우 접두사를 제거합니다.
        const base64String = reader.result as string;
        const base64Content = base64String.split(",")[1];
        resolve(base64Content);
      };
      reader.onerror = (error) => reject(error);
    });
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
      const response = await axios.post("http://10.10.98.81:8080/api/gemini/chat-with-pdf-json", {
        messages: [],
        pdfFileData: {
          name: fileList[0].name,
          content: encodedFile,
        },
      });

      setMessages(response.data.messages);
      setFileName(fileList[0].name);

      navigate("/interview");
    } catch (err) {
      console.error("API 호출 중 오류가 발생했습니다:", err);
    } finally {
      setLoading(false);
    }
  };

  const uploadProps = {
    name: "file",
    multiple: false,
    accept: ".pdf",
    fileList,
    beforeUpload: (file: File) => {
      const isPDF = file.type === "application/pdf";
      if (!isPDF) {
        message.error("PDF 파일만 업로드 가능합니다.");
        return Upload.LIST_IGNORE;
      }
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        message.error("파일 크기는 10MB를 초과할 수 없습니다.");
        return Upload.LIST_IGNORE;
      }

      // 파일이 유효하면 Base64로 인코딩
      encodeFileToBase64(file)
        .then((encoded) => {
          setEncodedFile(encoded);
          setPdfBase64(encoded);
          console.log("PDF가 Base64로 인코딩되었습니다.");
        })
        .catch((error) => {
          console.error("Base64 인코딩 실패:", error);
          message.error("파일 인코딩에 실패했습니다.");
        });

      return false;
    },
    onChange: (info: any) => {
      setFileList([info.file]);
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="mx-auto flex max-w-3xl max-w-[400px] flex-col items-center justify-center gap-[16px] py-[64px]">
        <div className="mb-12 text-center">
          <Title level={2} className="mb-4 text-3xl font-bold" style={{ fontWeight: 600 }}>
            이력서 업로드
          </Title>
          <Paragraph className="text-lg text-gray-600">
            PDF 형식의 이력서를 업로드하여 AI 면접을 시작하세요.
          </Paragraph>
        </div>

        <div className="w-full rounded-xl bg-white p-8 shadow-sm">
          <Dragger {...uploadProps} className="mb-6">
            <div className="p-8">
              <p className="ant-upload-drag-icon mb-4 text-4xl">
                <CloudUploadOutlined className="text-indigo-600" />
              </p>
              <p className="ant-upload-text mb-2 text-xl font-medium">
                PDF 파일을 여기에 드래그하거나 클릭하여 업로드하세요
              </p>
              <p className="ant-upload-hint text-gray-500">
                파일 크기는 10MB를 초과할 수 없습니다.
              </p>
            </div>
          </Dragger>
        </div>
        <Button
          type="primary"
          size="large"
          onClick={handleUpload}
          loading={loading}
          style={{ color: "white" }}
          disabled={fileList.length === 0}
          className="h-12 w-full"
          icon={<CloudUploadOutlined />}
        >
          업로드 및 분석 시작
        </Button>
      </div>
    </div>
  );
};

export default UploadPage;
