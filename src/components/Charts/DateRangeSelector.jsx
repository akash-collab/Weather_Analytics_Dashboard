const ranges = [
  { label: "24H", value: 8 },
  { label: "3 Days", value: 24 },
  { label: "5 Days", value: 40 },
];

const DateRangeSelector = ({ selected, onChange }) => {
  return (
    <div className="flex gap-2 mb-3">
      {ranges.map((range) => (
        <button
          key={range.value}
          onClick={() => onChange(range.value)}
          className={`px-3 py-1 rounded text-sm border
            ${selected === range.value
              ? "bg-blue-600 text-white"
              : "bg-white"}
          `}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
};

export default DateRangeSelector;