export const seedLocalStorage = () => {
  // 1. Users
  const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
  const newUsers = [
    { id: "1", role: "Admin", email: "admin@entnt.in", password: "admin123" },
    { id: "2", role: "Patient", email: "john@entnt.in", password: "patient123", patientId: "p1" }
  ];
  const mergedUsers = [
    ...existingUsers.filter(user => !newUsers.some(nu => nu.email === user.email)),
    ...newUsers
  ];
  localStorage.setItem('users', JSON.stringify(mergedUsers));

  // 2. Patients
  const existingPatients = JSON.parse(localStorage.getItem('patients')) || [];
  const newPatients = [
    {
      id: "p1",
      name: "John Doe",
      dob: "1990-05-10",
      contact: "1234567890",
      healthInfo: "No allergies"
    }
  ];
  const mergedPatients = [
    ...existingPatients.filter(p => !newPatients.some(np => np.id === p.id)),
    ...newPatients
  ];
  localStorage.setItem('patients', JSON.stringify(mergedPatients));

  // 3. Incidents
  const existingIncidents = JSON.parse(localStorage.getItem('incidents')) || [];
  const newIncidents = [
    {
      id: "i1",
      patientId: "p1",
      title: "Toothache",
      description: "Upper molar pain",
      comments: "Sensitive to cold",
      appointmentDate: "2025-07-01T10:00:00",
      cost: 80,
      status: "Completed",
      treatment: "Cavity filling",
      files: [
        { name: "invoice.pdf", url: "data:application/pdf;base64,..." },
        { name: "xray.png", url: "data:image/png;base64,..." }
      ]
    }
  ];
  const mergedIncidents = [
    ...existingIncidents.filter(i => !newIncidents.some(ni => ni.id === i.id)),
    ...newIncidents
  ];
  localStorage.setItem('incidents', JSON.stringify(mergedIncidents));
};
