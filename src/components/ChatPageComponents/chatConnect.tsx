import {
  ActionIcon,
  Box,
  Divider,
  Group,
  Paper,
  rem,
  ScrollArea,
  Stack,
  Text,
  Textarea,
} from "@mantine/core";
import { IconSend } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import useWebSocket from "react-use-websocket";
import { GetTocken } from "@/api/TockenSocket";
import { useGetListMessages } from "@/api/messages";
import { toJalali } from "../utils/DatetimeToJalali";

const baseWsUrl = import.meta.env.VITE_WS_URL;

interface ContentsProps {
  chatId: string;
}


const ChatConnect = ({ chatId }: ContentsProps) => {
  const { data: tokenSocket, isSuccess } = GetTocken();
  const [socketUrl, setSocketUrl] = useState<string | null>(null);
  const User = useSelector((state: RootState) => state?.user.user);

  const { data: lastmessages = [] } = useGetListMessages({ room_id: chatId });

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
    shouldReconnect: () => true,
  });

  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // اتصال WebSocket
  useEffect(() => {
    if (isSuccess && tokenSocket?.token) {
      setSocketUrl(
        `${baseWsUrl}/ws/chat/${chatId}/?token=${tokenSocket.token}`
      );
    }
  }, [isSuccess, tokenSocket, chatId]);

  // پیام جدید از WebSocket
  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data);
      setMessages((prev) => [...prev, data]);
    }
  }, [lastMessage]);

  // اسکرول خودکار به پایین
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lastmessages, messages]);

  const handleSend = (text: string) => {
    if (readyState === WebSocket.OPEN && text.trim()) {
      sendMessage(JSON.stringify({ message: text.trim() }));
      setMessage("");
    }
  };

  // ترکیب پیام‌های اولیه و پیام‌های WebSocket
  const allMessages = [...lastmessages, ...messages];

  return (
    <>
      <ScrollArea style={{ flex: 1, padding: rem(16) }} viewportRef={scrollRef}>
        <Stack gap={8}>
          {allMessages.map((msg, i) => {
            const isMine =
              msg.sender?.email === User?.email ||
              msg.user_email === User?.email;

            const text = msg.text || msg.message;
            const time = msg.created || msg.time;

            return (
              <Box
                key={i}
                style={{
                  alignSelf: isMine ? "flex-end" : "flex-start",
                  maxWidth: "70%",
                }}
              >
                <Paper
                  shadow="sm"
                  p="sm"
                  radius="md"
                  style={{
                    backgroundColor: isMine ? "#d4f1f4" : "#189ab4",
                    color: isMine ? "#05445e" : "white",
                    border: isMine ? "1px solid #75e6da" : "none",
                    fontSize: rem(14),
                    lineHeight: 1.4,
                  }}
                >
                  {text}
                  <Text
                    size="xs"
                    color={isMine ? "#4a6572" : "#bbe1fa"}
                    style={{
                      marginTop: rem(4),
                      textAlign: "right",
                      fontWeight: 500,
                    }}
                  >
                     {toJalali(time)}
                    {/* {time} */}
                  </Text>
                </Paper>
              </Box>
            );
          })}
        </Stack>
      </ScrollArea>

      <Divider />

      {/* بخش ورودی پیام */}
      <Group
        style={{
          width: "100%",
          padding: rem(10),
          backgroundColor: "white",
        }}
      >
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.currentTarget.value)}
          placeholder="پیام بنویس..."
          minRows={1}
          autosize
          style={{ flexGrow: 1 }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend(message);
            }
          }}
        />
        <ActionIcon
          color="blue"
          size={36}
          onClick={() => handleSend(message)}
        >
          <IconSend size={20} />
        </ActionIcon>
      </Group>
    </>
  );
};

export default ChatConnect;
