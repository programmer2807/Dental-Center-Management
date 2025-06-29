const KpiCard = ({ label, value }) => {
  return (
    <div className="bg-white rounded shadow p-4 text-center">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-xl font-bold text-indigo-600">{value}</p>
    </div>
  );
};

export default KpiCard;
