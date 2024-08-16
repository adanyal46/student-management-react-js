import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './layouts/MainLayout.js';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import StudentsPage from './pages/StudentsPage';
import TeachersPage from './pages/TeachersPage';
import ParentsPage from './pages/ParentsPage';
import PaymentsPage from './pages/PaymentsPage';
import ClassesPage from './pages/ClassesPage';
import MyClassesPage from './pages/MyClassesPage';
import MyChildrenPage from './pages/MyChildrenPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage'; // Import the LoginPage component
import ProtectedRoute from './ProtectedRoute'; // Import the ProtectedRoute component

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '', element: <LoginPage /> }, // Default route
      { path: 'login', element: <LoginPage /> }, // Login route
      { path: 'dashboard', element: <ProtectedRoute element={<DashboardPage />} /> },
      { path: 'students', element: <ProtectedRoute element={<StudentsPage />} /> },
      { path: 'teachers', element: <ProtectedRoute element={<TeachersPage />} /> },
      { path: 'parents', element: <ProtectedRoute element={<ParentsPage />} /> },
      { path: 'payments', element: <ProtectedRoute element={<PaymentsPage />} /> },
      { path: 'classes', element: <ProtectedRoute element={<ClassesPage />} /> },
      { path: 'my-classes', element: <ProtectedRoute element={<MyClassesPage />} /> },
      { path: 'my-children', element: <ProtectedRoute element={<MyChildrenPage />} /> },
      { path: '*', element: <NotFoundPage /> }, // Catch-all for 404
    ],
  },
]);

export default router;
