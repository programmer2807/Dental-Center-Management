import { useState, useEffect } from 'react';

const IncidentForm = ({ incident, onClose, onSave }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    appointmentDate: '',
    comments: '',
    cost: '',
    status: '',
    files: [],
  });

  useEffect(() => {
    if (incident) setForm(incident);
  }, [incident]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const readers = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve({ name: file.name, url: reader.result });
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then(result => {
      setForm({ ...form, files: [...(form.files || []), ...result] });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-xl shadow-lg overflow-y-auto max-h-[90vh]">
        <h3 className="text-lg font-bold mb-4">{incident ? 'Edit' : 'Add'} Incident</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="title" type="text" placeholder="Title" value={form.title} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
          <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          <input name="appointmentDate" type="datetime-local" value={form.appointmentDate} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
          <input name="comments" type="text" placeholder="Comments" value={form.comments} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          <input name="cost" type="number" placeholder="Cost" value={form.cost} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          <select name="status" value={form.status} onChange={handleChange} className="w-full border px-3 py-2 rounded">
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
          <input type="file" multiple onChange={handleFileChange} className="w-full border px-3 py-2 rounded" />
          {form.files?.length > 0 && (
            <div className="space-y-2">
              {form.files.map((f, idx) => (
                <div key={idx} className="text-sm text-blue-700 underline truncate">{f.name}</div>
              ))}
            </div>
          )}
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="text-gray-600 hover:underline">Cancel</button>
            <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IncidentForm;
