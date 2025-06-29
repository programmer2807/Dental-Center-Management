import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import KpiCard from '../components/KpiCard';
import PatientForm from '../components/PatientForm';
import { v4 as uuidv4 } from 'uuid';
import { seedLocalStorage } from '../utils/seedData';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [patients, setPatients] = useState([]);
    const [incidents, setIncidents] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const patientsData = JSON.parse(localStorage.getItem('patients')) || [];
        const incidentsData = JSON.parse(localStorage.getItem('incidents')) || [];
        setPatients(patientsData);
        setIncidents(incidentsData);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('authUser');
        navigate('/');
    };

    const handleAddPatient = (newPatient) => {
        const updated = [...patients, { ...newPatient, id: uuidv4() }];
        setPatients(updated);
        localStorage.setItem('patients', JSON.stringify(updated));
        setShowForm(false);
    };

    const handleResetLocalStorage = () => {
        localStorage.clear();        
        seedLocalStorage();           
        window.location.reload();     
    };

    const revenue = incidents.reduce((sum, item) => sum + (item.cost || 0), 0);
    const completed = incidents.filter(i => i.status === 'Completed').length;
    const upcoming = incidents
        .filter(i => new Date(i.appointmentDate) >= new Date())
        .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate))
        .slice(0, 10);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>

                <div className="flex gap-3">
                    <button
                        onClick={() => navigate('/calendar')}
                        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
                    >
                         View Calendar
                    </button>
                    <button
                        onClick={handleResetLocalStorage}
                        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                    >
                        Reset Data
                    </button>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                    >
                         Logout
                    </button>
                </div>
            </div>

           
            <div className="flex gap-4 mb-6">
                <button
                    onClick={() => setShowForm(true)}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                     Create Patient
                </button>
                <button
                    onClick={() => navigate('/patients')}
                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                     Manage Patients
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                <KpiCard label="Total Patients" value={patients.length} />
                <KpiCard label="Completed Treatments" value={completed} />
                <KpiCard label="Upcoming Appointments" value={upcoming.length} />
                <KpiCard label="Total Revenue" value={`₹${revenue}`} />
            </div>

     
            <h2 className="text-lg font-semibold mb-3 text-gray-700">Next 10 Appointments</h2>
            <div className="bg-white shadow rounded p-4 overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-gray-600 border-b">
                        <tr>
                            <th className="py-2">Patient</th>
                            <th className="py-2">Title</th>
                            <th className="py-2">Date</th>
                            <th className="py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {upcoming.map((item) => {
                            const patient = patients.find(p => p.id === item.patientId);
                            return (
                                <tr key={item.id} className="border-b hover:bg-gray-50">
                                    <td className="py-2">{patient?.name || 'Unknown'}</td>
                                    <td className="py-2">{item.title}</td>
                                    <td className="py-2">{new Date(item.appointmentDate).toLocaleString()}</td>
                                    <td className="py-2">
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${item.status === 'Completed'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {item.status}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Add Patient Modal */}
            {showForm && (
                <PatientForm
                    patient={null}
                    onClose={() => setShowForm(false)}
                    onSave={handleAddPatient}
                />
            )}
        </div>
    );
};

export default AdminDashboard;
