import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import AdminDashboard from './pages/AdminDashboard';
import Patients from './pages/Patients';
import Incidents from './pages/Incidents';
import PatientDashboard from './pages/PatientDashboard';
import CalendarView from './pages/CalendarView';


import Login from './pages/Login';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />


          <Route
            path="/dashboard"
            element={
              <ProtectedRoute role="Admin">
                <AdminDashboard />
              </ProtectedRoute>
            } />


          <Route
            path="/patient"
            element={
              <ProtectedRoute role="Patient">
                <PatientDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patients"
            element={
              <ProtectedRoute role="Admin">
                <Patients />
              </ProtectedRoute>
            }
          />

          <Route
            path="/calendar"
            element={
              <ProtectedRoute role="Admin">
                <CalendarView />
              </ProtectedRoute>
            }
          />


          <Route
            path="/incidents/:patientId"
            element={
              <ProtectedRoute role="Admin">
                <Incidents />
              </ProtectedRoute>
            }
          />


          
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

