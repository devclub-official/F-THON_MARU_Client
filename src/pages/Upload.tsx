import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, Button, message, Typography } from "antd";
import { InboxOutlined, FilePdfOutlined, CloudUploadOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";

const { Dragger } = Upload;
const { Title, Paragraph } = Typography;

const UploadPage = () => {
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (fileList.length === 0) {
      message.error("파일을 선택해주세요.");
      return;
    }

    setLoading(true);
    try {
      // TODO: API 연동
      await new Promise((resolve) => setTimeout(resolve, 2000));
      message.success("파일이 성공적으로 업로드되었습니다.");
      navigate("/interview");
    } catch (error) {
      message.error("파일 업로드에 실패했습니다.");
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
      return false;
    },
    onChange: (info: any) => {
      setFileList(info.fileList);
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="mx-auto max-w-3xl px-4 py-16">
        <div className="mb-12 text-center">
          <Title level={2} className="mb-4 text-3xl font-bold">
            이력서 업로드
          </Title>
          <Paragraph className="text-lg text-gray-600">
            PDF 형식의 이력서를 업로드하여 AI 면접을 시작하세요.
          </Paragraph>
        </div>

        <div className="mb-8 rounded-xl bg-white p-8 shadow-sm">
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

          {fileList.length > 0 && (
            <div className="flex items-center justify-center rounded-lg bg-indigo-50 p-4">
              <FilePdfOutlined className="mr-3 text-2xl text-indigo-600" />
              <span className="font-medium text-indigo-600">{fileList[0].name}</span>
            </div>
          )}
        </div>

        <Button
          type="primary"
          size="large"
          onClick={handleUpload}
          loading={loading}
          disabled={fileList.length === 0}
          className="h-12 w-full text-lg"
          icon={<CloudUploadOutlined />}
        >
          업로드 및 분석 시작
        </Button>
      </div>
    </div>
  );
};

export default UploadPage;
