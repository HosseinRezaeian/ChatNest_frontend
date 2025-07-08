import { useProfileQuery } from '@/api/api';
import { useGetListContacts } from '@/api/Contact';
import Contents from '@/components/ChatPageComponents/contents';
import { Icontact } from '@/models/contactModel';
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
import { useState } from 'react';


function formatTime(date: Date) {
  // قالب زمان: ساعت:دقیقه (24 ساعته)
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}

export function ChatAppShell() {
  const { data: userProfile, isLoading, error } = useProfileQuery();
  const { data: contacts } = useGetListContacts()
  const [opened, { toggle }] = useDisclosure();
  const theme = useMantineTheme();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [message, setMessage] = useState('');
  const [currentContact, setCurrentContact] = useState<Icontact | null>(null);







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
        {currentContact ? currentContact.target.username : ""}
        {/* {JSON.stringify(currentContact)} */}
        </Text>
      </AppShell.Header>

      <AppShell.Navbar
        p="md"
        hidden={opened}
        component={ScrollArea}
        style={{ backgroundColor: '#2c2c3e', color: 'white' }}
      >
        <Contents navbarOpened={opened} toggleNavbar={toggle} contacts={contacts as Icontact[]} currentContact={currentContact as Icontact} setCurrentContact={setCurrentContact}  />
      </AppShell.Navbar>

      <AppShell.Main>
        {/* {JSON.stringify(contactss)} */}
        {/* بخش پیام‌ها */}
        <ScrollArea style={{ flex: 1, padding: rem(16) }}>
          <Stack gap={8}>
            {userProfile ? userProfile.username : 'در حال بارگذاری...'}
            {/* {messages.map(({ text, fromMe, time }, i) => (
              <Box
                key={i}
                style={{
                  alignSelf: fromMe ? 'flex-end' : 'flex-start',
                  maxWidth: '70%',
                }}
              >
                <Paper
                  shadow="xs"
                  p="sm"
                  radius="md"
                  style={{
                    backgroundColor: fromMe ? '#189ab4' : '#d4f1f4',
                    color: fromMe ? 'white' : '#05445e',
                    position: 'relative',
                  }}
                >
                  {text}
                  <Text
                    size="xs"
                    color={fromMe ? '#bbe1fa' : '#4a6572'}
                    style={{ marginTop: rem(4), textAlign: 'right', fontWeight: 'bold' }}
                  >
                    {time}
                  </Text>
                </Paper>
              </Box>
            ))} */}
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
                handleSend();
              }
            }}
          />
          <ActionIcon color="blue" size={36} onClick={handleSend}>
            <IconSend size={20} />
          </ActionIcon>
        </Group>
      </AppShell.Main>
    </AppShell>
  );
}
