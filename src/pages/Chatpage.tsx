import { ProfileApi } from '@/api/ profileApi';
import { useProfileQuery } from '@/api/api';
import { useGetListContacts } from '@/api/Contact';
import { useGetListPrivateRooms } from '@/api/room';
import ChatConnect from '@/components/ChatPageComponents/chatConnect';
import Rooms from '@/components/ChatPageComponents/rooms';
import { privateRoomName } from '@/components/utils/RoomNameRemoveEmail';
import { setUser } from '@/features/users/userSlice';
import { Icontact } from '@/models/contactModel';
import { IPrivateRoom } from '@/models/PrivateRoomModel';
import {
  AppShell,
  Burger,
  ScrollArea,
  Text,
  Box,
  rem,
  useMantineTheme,
  Textarea,
  ActionIcon,
  Stack,
  Avatar,
  Group,
  Divider,
  Paper,
  TextInput,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { IconSend } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";

function formatTime(date: Date) {
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}

export function ChatAppShell() {
  const { data: userProfile,isSuccess, isLoading, error } = useProfileQuery();
  const { data: contacts } = useGetListContacts()
  const { data: privateRoom } = useGetListPrivateRooms()
  const [opened, { toggle }] = useDisclosure();
  const theme = useMantineTheme();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [message, setMessage] = useState('');
  const [currentPrivate, setcurrentPrivate] = useState<IPrivateRoom | null>(null);
const dispatch = useDispatch();
useEffect(() => {
    if (isSuccess && userProfile) {
      dispatch(setUser(userProfile));
    }
  }, [isSuccess, userProfile]);

  const handleSend = () => {
    if (message.trim() === '') return;

    const now = new Date();
    const newMessage = {
      text: message.trim(),
      fromMe: true,
      time: formatTime(now),
    };


    setMessage('');
  };
  // const [searchTerm, setSearchTerm] = useState('');
  // const filteredContacts = contacts.filter(contact =>
  //   contact.includes(searchTerm)
  // );
  return (
    <AppShell
      layout="alt"
      header={{ height: 60 }}
      navbar={{
        width: 280,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
      styles={{
        main: {
          backgroundColor: '#f0f2f5',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          overflow: 'hidden',
        },
      }}
    >
      <AppShell.Header
        style={{
          backgroundColor: '#1e1e2f',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          paddingInline: rem(16),
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          justifyContent: 'space-between',
        }}
      >
        <Group>
          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="sm"
            size="sm"
            color="white"
          />
          <Text size="lg" fw={700}>
            ChatNest
          </Text>
        </Group>
        <Text size="md" fw={600} color="#75e6da">
        {currentPrivate ? privateRoomName({room:currentPrivate.name,email:userProfile?.email??""}) : ""}
        {/* {JSON.stringify(currentContact)} */}
        </Text>
      </AppShell.Header>

      <AppShell.Navbar
        p="md"
        hidden={opened}
        component={ScrollArea}
        style={{ backgroundColor: '#2c2c3e', color: 'white' }}
      >
        <Rooms navbarOpened={opened} toggleNavbar={toggle} privateroom={privateRoom as IPrivateRoom[]} currentRoom={currentPrivate as IPrivateRoom} setCurrentRoom={setcurrentPrivate}  />
      </AppShell.Navbar>

      <AppShell.Main>
                {currentPrivate ?  
                
                (
                  <ChatConnect chatId={currentPrivate.id}/>
                )
                
                : ""}



        
      </AppShell.Main>
    </AppShell>
  );
}








