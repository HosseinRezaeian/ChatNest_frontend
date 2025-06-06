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
  import { IconAt, IconLock, IconUser, IconPhone } from '@tabler/icons-react';
  
  export function SimpleSignUp() {
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
          <Stack gap="md">
            {/* عنوان */}
            <Center>
              <Text 
                size="xl" 
                fw={700} 
                style={{ 
                  color: '#75e6da', 
                  fontSize: rem(28),
                  marginBottom: rem(4),
                }}
              >
                ثبت نام در ChatNest
              </Text>
            </Center>
  
            {/* فیلد نام کامل */}
            <TextInput
              label="نام کامل"
              placeholder="نام و نام خانوادگی"
              leftSection={<IconUser size={16} />}
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
  
            {/* فیلد شماره تلفن */}
            <TextInput
              label="شماره تلفن"
              placeholder="09xxxxxxxxx"
              leftSection={<IconPhone size={16} />}
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
              placeholder="حداقل 8 کاراکتر"
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
  
            {/* دکمه ثبت نام */}
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
              ایجاد حساب کاربری
            </Button>
  
            {/* لینک ورود */}
            <Center mt="sm">
              <Text size="sm" style={{ color: '#b8c2cc' }}>
                قبلاً حساب دارید؟{' '}
                <Anchor
                  href="#"
                  style={{
                    color: '#75e6da',
                    '&:hover': {
                      textDecoration: 'none',
                      color: '#bbe1fa',
                    },
                  }}
                >
                  وارد شوید
                </Anchor>
              </Text>
            </Center>
          </Stack>
        </Box>
      </Box>
    );
  }