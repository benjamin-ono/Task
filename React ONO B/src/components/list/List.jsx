import Item from "../item/Item.jsx";
import "./List.css";

export default function List({ missions, changeStatus, deleteMission, editMission }) {

  if (missions.length === 0) {
    return <p className="empty-message">No missions found</p>;
  }

  return (
    <ul className="mission-list">
      {missions.map((mission) => (
        <Item
          key={mission.id}
          mission={mission}
          changeStatus={changeStatus}
          deleteMission={deleteMission}
          editMission={editMission}
        />
      ))}
    </ul>
  );
}
