import { useEffect, useState } from "react";
import Filter from "./components/filter/Filter";
import List from "./components/list/List";
import Add from "./components/add/Add";
import Counter from "./components/counter/Counter";
import Bonus from "./components/Bonus/Bonus";
import "./App.css";

export default function App() {
  // Lazy state initialization
  const [missions, setMissions] = useState(() => {
    const saved = localStorage.getItem("missions");
    return saved ? JSON.parse(saved) : [];
  });

  const [filterStatus, setFilterStatus] = useState(null); // null, true, or false

  // Automatic sync to localStorage
  useEffect(() => {
    localStorage.setItem("missions", JSON.stringify(missions));
  }, [missions]);

  // Derived state: visible missions (Compiler handles memoization)
  const visibleMissions =
    filterStatus === null
      ? missions
      : missions.filter((m) => m.finish === filterStatus);

  // Modern functional updates
  const addMission = (missionText) => {
    if (!missionText.trim()) return;
    const newMission = {
      id: Date.now(),
      text: missionText,
      finish: false,
    };
    setMissions((prev) => [...prev, newMission]);
  };

  const changeStatus = (id) => {
    setMissions((prev) =>
      prev.map((m) => (m.id === id ? { ...m, finish: !m.finish } : m)),
    );
  };

  const deleteMission = (id) => {
    setMissions((prev) => prev.filter((m) => m.id !== id));
  };

  const editMission = (id, newText) => {
    setMissions((prev) =>
      prev.map((m) => (m.id === id ? { ...m, text: newText } : m)),
    );
  };

  const deleteFinishMission = () => {
    setMissions((prev) => prev.filter((m) => !m.finish));
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Tasks</h1>
      </header>

      <main>
        <Add addMission={addMission} />
        <Filter filterMissions={setFilterStatus} currentStatus={filterStatus} />
        <List
          missions={visibleMissions}
          changeStatus={changeStatus}
          deleteMission={deleteMission}
          editMission={editMission}
        />
      </main>

      <footer className="app-footer">
        <Counter missions={missions} />
        <Bonus deleteFinishMission={deleteFinishMission} />
      </footer>
    </div>
  );
}
