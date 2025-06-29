import { useEffect, useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth } from 'date-fns';

const CalendarView = () => {
  const [incidents, setIncidents] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const storedIncidents = JSON.parse(localStorage.getItem('incidents')) || [];
    const storedPatients = JSON.parse(localStorage.getItem('patients')) || [];
    setIncidents(storedIncidents);
    setPatients(storedPatients);
  }, []);

  const start = startOfMonth(selectedDate);
  const end = endOfMonth(selectedDate);
  const daysInMonth = eachDayOfInterval({ start, end });

  const getAppointments = (date) =>
    incidents.filter((i) =>
      isSameDay(new Date(i.appointmentDate), date)
    );

  const getPatientName = (id) =>
    patients.find((p) => p.id === id)?.name || 'Unknown';

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">📆 Calendar View</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {daysInMonth.map((day) => {
          const dailyAppointments = getAppointments(day);
          return (
            <div key={day} className="bg-white shadow p-3 rounded border">
              <h2 className="font-semibold text-gray-800 mb-2">
                {format(day, 'dd MMM yyyy')}
              </h2>

              {dailyAppointments.length === 0 ? (
                <p className="text-sm text-gray-500 italic">No Appointments</p>
              ) : (
                <ul className="text-sm text-gray-700 space-y-1">
                  {dailyAppointments.map((i) => (
                    <li key={i.id} className="border-l-4 pl-2 border-indigo-500">
                      {i.title} — {getPatientName(i.patientId)}
                      <div className="text-xs text-gray-500">
                        {format(new Date(i.appointmentDate), 'hh:mm a')} | {i.status}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;
