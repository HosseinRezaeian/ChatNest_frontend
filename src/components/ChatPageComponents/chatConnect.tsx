import { useGetListContacts } from "@/api/Contact";
import { Icontact } from "@/models/contactModel";
import { ActionIcon, Avatar, Box, Button, Divider, Drawer, Flex, Group, Paper, rem, ScrollArea, Stack, Text, Textarea, TextInput } from "@mantine/core"
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconArrowLeft, IconHeart, IconMenu2, IconSend } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { LeftDrawer } from "./leftDrawer";
import { IPrivateRoom } from "@/models/PrivateRoomModel";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { privateRoomName } from "../utils/RoomNameRemoveEmail";
// import useWebSocket from "@/api/webSocketChat";

import useWebSocket from 'react-use-websocket';

const baseWsUrl = import.meta.env.VITE_WS_URL;



interface ContentsProps {
  chatId: string
}


const ChatConnect = ({ chatId }: ContentsProps) => {
  const access = localStorage.getItem('access');

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    `${baseWsUrl}/ws/chat/${chatId}/?token=${access}`,
    {
      shouldReconnect: () => true,
    }
  );

  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState('');
  const handleSend = (text: string) => {
    if (readyState === WebSocket.OPEN) {
      sendMessage(JSON.stringify({ message: text }));
    }
  };


  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data);
      setMessages(prev => [...prev, data]);
    }
  }, [lastMessage]);
  return (
    <>
      <ScrollArea style={{ flex: 1, padding: rem(16) }}>

        <Stack gap={8}>

          {/* {messages.map((e)=>(
<Box bg={"blue"}>
  {e.message}
</Box>
      ))} */}


          {messages.map(({ message, user, time }, i) => (
            <Box
              key={i}
              style={{
                alignSelf: user ? 'flex-end' : 'flex-start',
                maxWidth: '70%',
              }}
            >
              <Paper
                shadow="xs"
                p="sm"
                radius="md"
                style={{
                  backgroundColor: user ? '#189ab4' : '#d4f1f4',
                  color: user ? 'white' : '#05445e',
                  position: 'relative',
                }}
              >
                {message}
                <Text
                  size="xs"
                  color={user ? '#bbe1fa' : '#4a6572'}
                  style={{ marginTop: rem(4), textAlign: 'right', fontWeight: 'bold' }}
                >
                  {time}
                </Text>
              </Paper>
            </Box>
          ))}
        </Stack>
      </ScrollArea>








      <Divider />

      {/* بخش ورودی پیام */}
      <Group
        style={{
          width: '100%',
          padding: rem(10),
          backgroundColor: 'white',
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
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend(message);
            }
          }}
        />
        <ActionIcon color="blue" size={36} onClick={() => handleSend(message)}>
          <IconSend size={20} />
        </ActionIcon>
      </Group>
    </>
  );

}
export default ChatConnect