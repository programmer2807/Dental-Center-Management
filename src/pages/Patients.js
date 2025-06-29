import { useEffect, useState } from 'react';
import PatientForm from '../components/PatientForm';
import { useNavigate } from 'react-router-dom';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('patients')) || [];
    setPatients(stored);
  }, []);

  const handleSave = (data) => {
    let updated = [...patients];

    if (data.id) {
      updated = updated.map(p => (p.id === data.id ? data : p));
    } else {
      data.id = crypto.randomUUID();
      updated.push(data);
    }

    setPatients(updated);
    localStorage.setItem('patients', JSON.stringify(updated));
    setShowForm(false);
    setEditingPatient(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this patient?')) {
      const updated = patients.filter(p => p.id !== id);
      setPatients(updated);
      localStorage.setItem('patients', JSON.stringify(updated));
    }
  };

  const handleEdit = (patient) => {
    setEditingPatient(patient);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manage Patients</h1>
        <button
          onClick={() => { setShowForm(true); setEditingPatient(null); }}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          ➕ Add Patient
        </button>
      </div>

      <div className="bg-white shadow rounded overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">DOB</th>
              <th className="p-3">Contact</th>
              <th className="p-3">Health Info</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{p.name}</td>
                <td className="p-3">{p.dob}</td>
                <td className="p-3">{p.contact}</td>
                <td className="p-3">{p.healthInfo}</td>
                <td className="p-3 space-x-3">
                  <button
                    onClick={() => handleEdit(p)}
                    className="text-blue-600 hover:underline"
                  >
                     Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-red-600 hover:underline"
                  >
                     Delete
                  </button>
                  <button
                    onClick={() => navigate(`/incidents/${p.id}`)}
                    className="text-indigo-600 hover:underline"
                  >
                    Manage Incidents
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <PatientForm
          patient={editingPatient}
          onClose={() => { setShowForm(false); setEditingPatient(null); }}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Patients;
