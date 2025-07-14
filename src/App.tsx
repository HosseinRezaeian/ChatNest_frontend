import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css'; 

import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { Notifications } from '@mantine/notifications';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Provider store={store}>
        <Notifications  /> 

        <Router />
      </Provider>

    </MantineProvider>
  );
}
