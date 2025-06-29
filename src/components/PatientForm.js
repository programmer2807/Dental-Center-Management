import { useState, useEffect } from 'react';

const PatientForm = ({ patient, onClose, onSave }) => {
  const [form, setForm] = useState({
    name: '',
    dob: '',
    contact: '',
    healthInfo: '',
  });

  useEffect(() => {
    if (patient) setForm(patient);
  }, [patient]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.dob || !form.contact) {
      alert('Name, DOB, and Contact are required!');
      return;
    }
    onSave({ ...patient, ...form });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-xl">
        <h3 className="text-lg font-bold mb-4">{patient ? 'Edit' : 'Add'} Patient</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="text"
            name="contact"
            placeholder="Contact"
            value={form.contact}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <textarea
            name="healthInfo"
            placeholder="Health Info"
            value={form.healthInfo}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:underline">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientForm;
