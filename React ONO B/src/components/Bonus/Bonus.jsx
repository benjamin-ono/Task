import "./Bonus.css";

export default function Bonus({ deleteFinishMission }) {
    return (
        <div className="bonus-container">
            <button className="bonus-btn" onClick={deleteFinishMission}>
                Clear Completed
            </button>
        </div>
    )
}