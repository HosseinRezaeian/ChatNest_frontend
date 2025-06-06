import {
    Box,
    Text,
    TextInput,
    PasswordInput,
    Button,
    Stack,
    Anchor,
    Center,
    rem,
  } from '@mantine/core';
  import { IconAt, IconLock } from '@tabler/icons-react';
  
  export function SimpleLogin() {
    return (
      <Box
        style={{
          backgroundColor: '#1e1e2f',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: rem(16),
        }}
      >
        <Box
          style={{
            width: '100%',
            maxWidth: rem(400),
            backgroundColor: '#2c2c3e',
            padding: rem(32),
            borderRadius: rem(12),
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
          }}
        >
          <Stack gap="xl">
            {/* عنوان */}
            <Center>
              <Text 
                size="xl" 
                fw={700} 
                style={{ 
                  color: '#75e6da', 
                  fontSize: rem(28),
                  marginBottom: rem(8),
                }}
              >
                ChatNest
              </Text>
            </Center>
  
            {/* فیلد ایمیل */}
            <TextInput
              label="ایمیل"
              placeholder="example@mail.com"
              leftSection={<IconAt size={16} />}
              styles={{
                input: {
                  backgroundColor: '#3e3e4e',
                  border: 'none',
                  color: 'white',
                },
                label: {
                  color: '#bbe1fa',
                  marginBottom: rem(6),
                },
              }}
            />
  
            {/* فیلد رمز عبور */}
            <PasswordInput
              label="رمز عبور"
              placeholder="رمز عبور خود را وارد کنید"
              leftSection={<IconLock size={16} />}
              styles={{
                input: {
                  backgroundColor: '#3e3e4e',
                  border: 'none',
                  color: 'white',
                },
                label: {
                  color: '#bbe1fa',
                  marginBottom: rem(6),
                },
                innerInput: {
                  color: 'white',
                },
              }}
            />
  
            {/* دکمه ورود */}
            <Button
              fullWidth
              mt="md"
              style={{
                backgroundColor: '#189ab4',
                color: 'white',
                fontWeight: 600,
                height: rem(42),
                '&:hover': {
                  backgroundColor: '#75e6da',
                },
              }}
            >
              ورود به حساب
            </Button>
  
            {/* لینک ثبت نام */}
            <Center mt="sm">
              <Anchor
                href="#"
                style={{
                  color: '#75e6da',
                  fontSize: rem(14),
                  '&:hover': {
                    textDecoration: 'none',
                    color: '#bbe1fa',
                  },
                }}
              >
                حساب کاربری ندارید؟ ثبت نام کنید
              </Anchor>
            </Center>
          </Stack>
        </Box>
      </Box>
    );
  }