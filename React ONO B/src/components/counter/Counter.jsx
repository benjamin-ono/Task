import './Counter.css'

export default function Counter({ missions }) {
    const notDone = missions.filter(mission => !mission.finish).length;
    const done = missions.filter(mission => mission.finish).length;

    return (
        <div className="counter-container">
            <div className="counter-item">
                <span className="counter-value">{missions.length}</span>
                <span className="counter-label">Total</span>
            </div>
            <div className="counter-item">
                <span className="counter-value">{notDone}</span>
                <span className="counter-label">Active</span>
            </div>
            <div className="counter-item">
                <span className="counter-value">{done}</span>
                <span className="counter-label">Done</span>
            </div>
        </div>
    )
}