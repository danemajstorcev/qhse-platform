import { recentActivity } from "../../data/mockData";

export default function ActivityFeed() {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">Recent Activity</div>
      </div>
      <div className="activity-feed">
        {recentActivity.map((a) => (
          <div key={a.id} className="activity-item">
            <div className={`activity-dot ${a.level}`} />
            <div className="activity-text">{a.text}</div>
            <div className="activity-time">{a.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
