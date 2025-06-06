import { useLoginMutation } from '@/api/Login';
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
import { useForm } from '@mantine/form';
import { IconAt, IconLock } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export function SimpleLogin() {
  const [login, { isLoading, isSuccess }] = useLoginMutation();
  const navigate = useNavigate();
  const handleLogin = async (credentials: { username: string; password: string }) => {
    try {
      const result = await login(credentials).unwrap();
      console.log(result.access, isSuccess)
      localStorage.setItem('access', result.access);
      localStorage.setItem('refresh', result.refresh);

      navigate("/chat")

    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      username: '',
      password: "",
    },

    // validate: {
    //   email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    // },
  });

  return (
    <form onSubmit={form.onSubmit((values) => handleLogin(values))}>
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
              label="نام کاربری"
              placeholder="example@mail.com"
              leftSection={<IconAt size={16} />}

              key={form.key('username')}
              {...form.getInputProps('username')}

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

            <PasswordInput
              label="رمز عبور"
              placeholder="رمز عبور خود را وارد کنید"
              leftSection={<IconLock size={16} />}

              key={form.key('password')}
              {...form.getInputProps('password')}


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
            <Button
              type="submit"
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
    </form>
  );
}