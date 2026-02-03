import { useState } from "react";
import "./Add.css";

export default function Add({ addMission }) {
    const [mission, setMission] = useState("")

    function handleAdd() {
        if (!mission.trim()) return;
        addMission(mission)
        setMission("")
    }

    return (
        <div className="add-container">
            <input
                type="text"
                placeholder="What is the next task?"
                value={mission}
                onChange={(e) => setMission(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            />
            <button className="add-btn" onClick={handleAdd} aria-label="Add Mission">
                Add
            </button>
        </div>
    )
}