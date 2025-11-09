/**
 * M6Emblem - MTI6-GTADWIY Emblem/Logo Component
 */
export default function M6Emblem({ size = 64 }) {
  return (
    <div style={{
      width: size,
      height: size,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #00ff88 0%, #00aaff 100%)',
      borderRadius: '50%',
      fontWeight: 'bold',
      fontSize: size * 0.4,
      color: '#000',
      boxShadow: '0 4px 12px rgba(0, 255, 136, 0.4)',
      position: 'relative'
    }}>
      <span style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}>
        M6
      </span>
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        animation: 'pulse 2s infinite'
      }} />
    </div>
  );
}
