/**
 * UserHead - User avatar/profile component
 */
export default function UserHead({ username = 'Sovereign', avatar = null, status = 'online' }) {
  const statusColors = {
    online: '#00ff88',
    away: '#ffaa00',
    offline: '#888'
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '0.75rem',
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '12px',
      color: '#fff'
    }}>
      <div style={{ position: 'relative' }}>
        <div style={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          background: avatar ? `url(${avatar})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          backgroundSize: 'cover',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          fontSize: '1.25rem'
        }}>
          {!avatar && username.charAt(0).toUpperCase()}
        </div>
        <div style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: 14,
          height: 14,
          background: statusColors[status],
          border: '2px solid #000',
          borderRadius: '50%'
        }} />
      </div>

      <div>
        <div style={{ fontWeight: 'bold' }}>{username}</div>
        <div style={{ fontSize: '0.875rem', opacity: 0.6, textTransform: 'capitalize' }}>
          {status}
        </div>
      </div>
    </div>
  );
}
