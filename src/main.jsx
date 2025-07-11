import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { LoginForm } from '@/components/login-form.jsx';
import { SectionCards } from '@/components/section-cards.jsx';
import { EmployeeTable } from '@/components/Employee/EmployeeTable.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import CreateCatlog from './components/Catlog/create_catlog.jsx';
import AnalyticsPage from "@/components/Analytics/charts.jsx";
import Report from './components/Reports/report.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Login page at root */}
        <Route path="/" element={<LoginForm />} />
        {/* Protected routes */}
        <Route
          element={
            <ProtectedRoute>
              <App />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<SectionCards />} />
          <Route path="/employees" element={<EmployeeTable />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/catlog" element={<CreateCatlog />} />
          <Route path="/reports" element={<Report/>} />
        </Route>
        {/* Redirect unknown routes to root (login) */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);