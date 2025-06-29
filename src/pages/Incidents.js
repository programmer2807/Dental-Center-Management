import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IncidentForm from '../components/IncidentForm';

const Incidents = () => {
  const { patientId } = useParams();
  const [patient, setPatient] = useState(null);
  const [incidents, setIncidents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editIncident, setEditIncident] = useState(null);

  useEffect(() => {
    const allPatients = JSON.parse(localStorage.getItem('patients')) || [];
    const allIncidents = JSON.parse(localStorage.getItem('incidents')) || [];
    const selectedPatient = allPatients.find(p => p.id === patientId);

    setPatient(selectedPatient);
    setIncidents(allIncidents.filter(i => i.patientId === patientId));
  }, [patientId]);

  const saveToStorage = (updated) => {
    const allIncidents = JSON.parse(localStorage.getItem('incidents')) || [];
    const others = allIncidents.filter(i => i.patientId !== patientId);
    const newAll = [...others, ...updated];
    localStorage.setItem('incidents', JSON.stringify(newAll));
    setIncidents(updated);
  };

  const handleSave = (incident) => {
    let updated = [...incidents];
    if (incident.id) {
      updated = updated.map(i => (i.id === incident.id ? incident : i));
    } else {
      incident.id = crypto.randomUUID();
      incident.patientId = patientId;
      updated.push(incident);
    }
    saveToStorage(updated);
    setShowForm(false);
    setEditIncident(null);
  };

  const handleDelete = (id) => {
   if (window.confirm("Delete this incident?")) {
  const updated = incidents.filter(i => i.id !== id);
  saveToStorage(updated);
}
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-xl font-bold mb-4">Appointments for {patient?.name}</h1>

      <button
        onClick={() => setShowForm(true)}
        className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        ➕ Add Incident
      </button>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              <th className="p-3">Cost</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map(i => (
              <tr key={i.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{i.title}</td>
                <td className="p-3">{new Date(i.appointmentDate).toLocaleString()}</td>
                <td className="p-3">{i.status || 'Pending'}</td>
                <td className="p-3">₹{i.cost || '-'}</td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => { setEditIncident(i); setShowForm(true); }}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(i.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <IncidentForm
          incident={editIncident}
          onClose={() => { setShowForm(false); setEditIncident(null); }}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Incidents;
