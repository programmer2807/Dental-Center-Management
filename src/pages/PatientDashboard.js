import { useEffect, useState } from 'react';

const PatientDashboard = () => {
  const [patient, setPatient] = useState(null);
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    const authUser = JSON.parse(localStorage.getItem('authUser'));
    const allPatients = JSON.parse(localStorage.getItem('patients')) || [];
    const allIncidents = JSON.parse(localStorage.getItem('incidents')) || [];

    const loggedInPatient = allPatients.find(p => p.id === authUser?.patientId);
    setPatient(loggedInPatient);

    const patientIncidents = allIncidents.filter(i => i.patientId === loggedInPatient?.id);
    setIncidents(patientIncidents);
  }, []);

  const upcoming = incidents
    .filter(i => new Date(i.appointmentDate) > new Date())
    .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate));

  const history = incidents
    .filter(i => i.status === 'Completed')
    .sort((a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate));

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome, {patient?.name}</h1>

      {/* Profile Info */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-lg font-semibold mb-2 text-gray-700">Your Profile</h2>
        <p><strong>DOB:</strong> {patient?.dob}</p>
        <p><strong>Contact:</strong> {patient?.contact}</p>
        <p><strong>Health Info:</strong> {patient?.healthInfo}</p>
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-lg font-semibold mb-2 text-indigo-700">Upcoming Appointments</h2>
        {upcoming.length === 0 ? (
          <p className="text-sm text-gray-500 italic">No upcoming appointments.</p>
        ) : (
          <ul className="space-y-3 text-sm">
            {upcoming.map((a) => (
              <li key={a.id} className="border-l-4 pl-3 border-blue-500">
                <div className="font-medium">{a.title}</div>
                <div className="text-gray-600">{new Date(a.appointmentDate).toLocaleString()}</div>
                {a.comments && <div className="text-xs text-gray-500 italic">Note: {a.comments}</div>}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Treatment History */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2 text-green-700">Treatment History</h2>
        {history.length === 0 ? (
          <p className="text-sm text-gray-500 italic">No treatments completed yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="p-2">Title</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Cost</th>
                  <th className="p-2">Treatment</th>
                  <th className="p-2">Files</th>
                </tr>
              </thead>
              <tbody>
                {history.map((i) => (
                  <tr key={i.id} className="border-t">
                    <td className="p-2">{i.title}</td>
                    <td className="p-2">{new Date(i.appointmentDate).toLocaleString()}</td>
                    <td className="p-2">₹{i.cost}</td>
                    <td className="p-2">{i.treatment || '-'}</td>
                    <td className="p-2 space-x-2">
                      {i.files?.map((f, idx) => (
                        <a
                          key={idx}
                          href={f.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 underline"
                        >
                          {f.name}
                        </a>
                      )) || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;
