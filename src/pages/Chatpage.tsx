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
  
  const contacts = ["علی", "مریم", "سارا", "حسین","asghar","ahmad","mamad","andi","mandi","lossi","qp","ty","ali","lop","task","aslan"];
  
  function formatTime(date: Date) {
    // قالب زمان: ساعت:دقیقه (24 ساعته)
    return `${date.getHours().toString().padStart(2,'0')}:${date.getMinutes().toString().padStart(2,'0')}`;
  }
  
  export function ChatAppShell() {
    const [opened, { toggle }] = useDisclosure();
    const theme = useMantineTheme();
    const isMobile = useMediaQuery('(max-width: 768px)');
    const [message, setMessage] = useState('');
    const [currentContact, setCurrentContact] = useState(contacts[0]);
  
    // پیام‌ها برای هر مخاطب بصورت شیء با متن، فرستنده و زمان ذخیره شده
    const [allMessages, setAllMessages] = useState<Record<string, { text: string; fromMe: boolean; time: string }[]>>({
      علی: [
        { text: 'سلام! چطوری؟', fromMe: false, time: '09:00' },
        { text: 'خوبم، تو چطوری؟', fromMe: true, time: '09:01' },
      ],
      مریم: [
        { text: 'سلام مریم!', fromMe: true, time: '10:10' },
        { text: 'سلام! خوبی؟', fromMe: false, time: '10:12' },
      ],
      سارا: [
        { text: 'سلام سارا!', fromMe: true, time: '11:30' },
      ],
      حسین: [
        { text: 'سلام حسین!', fromMe: false, time: '08:45' },
      ],
    });
  
    const messages = allMessages[currentContact] || [];
  
    const handleSend = () => {
      if (message.trim() === '') return;
  
      const now = new Date();
      const newMessage = {
        text: message.trim(),
        fromMe: true,
        time: formatTime(now),
      };
  
      setAllMessages((prev) => ({
        ...prev,
        [currentContact]: [...(prev[currentContact] || []), newMessage],
      }));
  
      setMessage('');
    };
    const [searchTerm, setSearchTerm] = useState('');
    const filteredContacts = contacts.filter(contact =>
        contact.includes(searchTerm)
      );
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
            {currentContact}
          </Text>
        </AppShell.Header>
  
        <AppShell.Navbar
          p="md"
          component={ScrollArea}
          style={{ backgroundColor: '#2c2c3e', color: 'white' }}
        >
            <TextInput onChange={(e)=>{setSearchTerm(e.currentTarget.value.trim())}} placeholder='جستوجو...' pb={"20"}></TextInput>
          {filteredContacts.map((name) => (
            <Box
              key={name}
              mb="sm"
              onClick={() => {
                setCurrentContact(name);
                if (isMobile) toggle();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: rem(8),
                cursor: 'pointer',
                padding: rem(8),
                borderRadius: rem(6),
                transition: 'background 0.2s ease',
                backgroundColor: currentContact === name ? '#189ab4' : 'transparent',
                userSelect: 'none',
              }}
            >
              <Avatar size={30} radius="xl">{name[0]}</Avatar>
              <Text>{name}</Text>
            </Box>
          ))}
        </AppShell.Navbar>
  
        <AppShell.Main

        >
          {/* بخش پیام‌ها */}
          <ScrollArea style={{ flex: 1, padding: rem(16) }}>
            <Stack gap={8}>
              {messages.map(({ text, fromMe, time }, i) => (
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
  