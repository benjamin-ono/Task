import { useState } from "react";
import "./Item.css";

export default function Item({ mission, changeStatus, deleteMission, editMission }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(mission.text);

  function handleSave() {
    if (editText.trim()) {
      editMission(mission.id, editText);
      setIsEditing(false);
    }
  }

  function handleCancel() {
    setEditText(mission.text);
    setIsEditing(false);
  }

  return (
    <li className={`mission-item ${mission.finish ? 'finished' : ''}`}>
      <div className="mission-main">
        <button
          className={`checkbox ${mission.finish ? 'checked' : ''}`}
          onClick={() => changeStatus(mission.id)}
          aria-label={mission.finish ? "Mark as unfinished" : "Mark as finished"}
        >
          {mission.finish && "✓"}
        </button>

        {isEditing ? (
          <input
            type="text"
            className="edit-input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            onBlur={(e) => {
              if (e.relatedTarget?.innerText !== 'Cancel') {
                handleSave();
              }
            }}
            autoFocus
          />
        ) : (
          <span
            className="mission-text"
            onClick={() => changeStatus(mission.id)}
          >
            {mission.text}
          </span>
        )}
      </div>

      <div className="mission-actions">
        {isEditing ? (
          <>
            <button className="action-btn" onClick={handleSave}>Save</button>
            <button className="action-btn" onClick={handleCancel}>Cancel</button>
          </>
        ) : (
          <>
            <button className="action-btn" onClick={() => setIsEditing(true)}>Edit</button>
            <button className="action-btn delete" onClick={() => deleteMission(mission.id)}>Delete</button>
          </>
        )}
      </div>
    </li>
  );
}

