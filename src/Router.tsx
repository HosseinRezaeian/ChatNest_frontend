import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ChatAppShell } from './pages/Chatpage';
import { SimpleLogin } from './pages/LoginPage';
import { SimpleSignUp } from './pages/SignUp';
import { ProtectedLayout } from './Auth/ProtectedRoute';
// import { ChatPage } from './pages/Chat.page';
// import { NotFoundPage } from './pages/NotFound.page';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/" element={<Navigate to="/chat" replace />} />
        <Route element={<ProtectedLayout />}>
          <Route path="/chat" element={<ChatAppShell ></ChatAppShell>} />

        </Route>
        <Route path="/login" element={<SimpleLogin />} />
        <Route path="/signup" element={<SimpleSignUp />} />

      </Routes>
    </BrowserRouter>
  );
}
