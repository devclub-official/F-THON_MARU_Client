import { useState } from "react";
import { Button, Input, Space, Spin } from "antd";
import usePromptStore from "../store/promptStore";
import { Message } from "../types/interview";
import { sendMessage } from "../api/interview";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;

const COMMAND = {
  NEXT: "다음",
  STOP: "멈춰",
} as const;

const MessageDisplay = ({ content }: { content: string }) => (
  <div className="rounded-lg bg-gray-50 p-4">
    <h2 className="text-lg leading-relaxed font-medium text-gray-700">{content}</h2>
  </div>
);

const LoadingIndicator = () => (
  <div className="flex items-center space-x-2 text-blue-600">
    <Spin size="small" />
    <span className="text-sm">처리중...</span>
  </div>
);

const Interview = () => {
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { messages, setMessages, fileName, pdfBase64 } = usePromptStore();
  const navigate = useNavigate();

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

      if (content === COMMAND.STOP) navigate("/result");
    } catch (error) {
      console.error("메시지 전송 중 에러 발생:", error);
      // TODO: 에러 처리 UI 추가
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
    "답변을 기다리는 중...";

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
          <div className="mb-6 space-y-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-800">면접 진행중</h1>
              {isLoading && <LoadingIndicator />}
            </div>
            <MessageDisplay content={lastAssistantMessage} />
          </div>

          <div className="space-y-4">
            <TextArea
              rows={6}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="답변을 입력해주세요. Enter 키를 눌러 제출하세요."
              className="w-full rounded-lg border-2 border-gray-200 p-4 transition-all duration-200 focus:border-blue-500 focus:shadow-md"
              style={{
                resize: "none",
                fontSize: "1rem",
                backgroundColor: isLoading ? "#f5f5f5" : "white",
              }}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                {isLoading ? "답변 처리중..." : "답변을 입력하거나 다음 질문으로 넘어가세요."}
              </div>
              <Space size="middle">
                <Button
                  onClick={() => handleMessageSend(COMMAND.STOP)}
                  disabled={isLoading}
                  className="hover:bg-red-50"
                  danger
                >
                  종료
                </Button>
                <Button
                  type="primary"
                  onClick={() => handleMessageSend(COMMAND.NEXT)}
                  disabled={isLoading}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  다음
                </Button>
              </Space>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interview;
