import "./Filter.css";

export default function Filter({ filterMissions, currentStatus }) {
    return (
        <div className="filter-container">
            <div className="filter-buttons">
                <button
                    className={`filter-btn ${currentStatus === null ? 'active' : ''}`}
                    onClick={() => filterMissions(null)}
                >
                    All
                </button>
                <button
                    className={`filter-btn ${currentStatus === false ? 'active' : ''}`}
                    onClick={() => filterMissions(false)}
                >
                    Active
                </button>
                <button
                    className={`filter-btn ${currentStatus === true ? 'active' : ''}`}
                    onClick={() => filterMissions(true)}
                >
                    Done
                </button>
            </div>
        </div>
    )
}