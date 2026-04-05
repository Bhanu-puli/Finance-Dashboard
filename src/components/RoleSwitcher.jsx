import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function RoleSwitcher() {
  const { role, setRole } = useContext(AppContext);

  return (
    <div className="role-container">
      <label className="role-label">You Are:</label>

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="role-dropdown"
      >
        <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
      </select>
    </div>
  );
}