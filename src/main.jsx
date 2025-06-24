// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
// import { LoginForm } from "@/components/login-form.jsx";
// import { SectionCards } from "@/components/section-cards.jsx";
// import { EmployeeTable } from "@/components/Employee/EmployeeTable.jsx";
// import ReportsPage from "@/components/Report/charts.jsx";
// import ProtectedRoute from './components/ProtectedRoute.jsx';
// import CreateCatlog from './components/Catlog/create_catlog.jsx';

// createRoot(document.getElementById('root')).render(
//     <StrictMode>
//         <BrowserRouter>
//             <Routes>
//                 {/* Login page at root */}
//                 <Route path="/" element={<LoginForm />} />
//                 {/* Dashboard and nested routes under /dashboard */}
//                 <Route
//                     path="/dashboard"
//                     element={
//                         <ProtectedRoute>
//                             <App />
//                         </ProtectedRoute>
//                     }
//                 >
//                     <Route index element={<SectionCards />} />
//                     <Route path="employees" element={<EmployeeTable />} />
//                     <Route path="reports" element={<ReportsPage />} />
//                     <Route path="catlog" element={<CreateCatlog />} />
//                 </Route>
//                 {/* Redirect unknown routes to root (login) */}
//                 <Route path="*" element={<Navigate to="/" replace />} />
//             </Routes>
//         </BrowserRouter>
//     </StrictMode>
// )


import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { LoginForm } from '@/components/login-form.jsx';
import { SectionCards } from '@/components/section-cards.jsx';
import { EmployeeTable } from '@/components/Employee/EmployeeTable.jsx';
import ReportsPage from '@/components/Report/charts.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import CreateCatlog from './components/Catlog/create_catlog.jsx';

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
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/catlog" element={<CreateCatlog />} />
        </Route>
        {/* Redirect unknown routes to root (login) */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);