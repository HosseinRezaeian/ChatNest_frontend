import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { ChatAppShell } from './pages/Chatpage';
import { SimpleLogin } from './pages/LoginPage';
import { SimpleSignUp } from './pages/SignUp';
// import { ChatPage } from './pages/Chat.page';
// import { NotFoundPage } from './pages/NotFound.page';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatAppShell ></ChatAppShell>} />
        <Route path="/login" element={<SimpleLogin/>} />
        <Route path="/signup" element={<SimpleSignUp/>} />
        {/* <Route path="/chat/:id" element={<ChatPage />} />
        <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
