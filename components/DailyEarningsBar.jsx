/**
 * DailyEarningsBar - Visual earnings progress bar
 */
export default function DailyEarningsBar({ current = 247, goal = 500, label = 'Daily Target' }) {
  const percentage = Math.min((current / goal) * 100, 100);

  return (
    <div style={{
      padding: '1rem',
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '8px',
      color: '#fff'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '0.5rem'
      }}>
        <span style={{ fontSize: '0.875rem', opacity: 0.8 }}>{label}</span>
        <span style={{ fontWeight: 'bold', color: '#00ff88' }}>
          ${current.toFixed(2)} / ${goal.toFixed(2)}
        </span>
      </div>

      <div style={{
        width: '100%',
        height: 24,
        background: 'rgba(0, 0, 0, 0.3)',
        borderRadius: '12px',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <div style={{
          width: `${percentage}%`,
          height: '100%',
          background: 'linear-gradient(90deg, #00ff88 0%, #00aaff 100%)',
          transition: 'width 0.5s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingRight: '0.5rem'
        }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#000' }}>
            {percentage.toFixed(0)}%
          </span>
        </div>
      </div>
    </div>
  );
}
