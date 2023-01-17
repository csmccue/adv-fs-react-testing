import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard.jsx';
import Layout from './Page/Layout.jsx';
import Users from './Users/Users.jsx';
import Auth from './Auth/Auth.jsx';
import AuthForm from './Auth/AuthForm.jsx';
import ProtectedRoute from './Auth/ProtectedRoute.jsx';
import UserProvider from '../state/UserContext.jsx';
import './Design.css';
import ShoppingListPage from './Page/ShoppingListPage.jsx';

export default function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route element={<ProtectedRoute />}>
              <Route path="users" element={<Users />} />
              <Route path="shopping-lists" element={<ShoppingListPage />} />
            </Route>
          </Route>

          <Route path="auth" element={<Auth />}>
            <Route index element={<AuthForm mode="signin" />} />
            <Route path="signup" element={<AuthForm mode="signup" />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}
