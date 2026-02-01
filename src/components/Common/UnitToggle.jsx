import { useDispatch, useSelector } from "react-redux";
import { toggleUnit } from "../../features/settings/settingsSlice";

const UnitToggle = () => {
  const unit = useSelector((state) => state.settings.unit);
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(toggleUnit())}
      className="border px-4 py-2 rounded text-sm hover:bg-gray-100"
    >
      {unit === "metric" ? "°C → °F" : "°F → °C"}
    </button>
  );
};

export default UnitToggle;