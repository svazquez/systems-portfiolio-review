export function DiagBand() {
  return (
    <div style={{ width: '100%', height: 20, background: '#000', overflow: 'hidden', flexShrink: 0 }}>
      <svg width="100%" height="20" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <defs>
          <pattern id="diag-band-div" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="6" stroke="rgba(255,255,255,0.25)" strokeWidth="3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diag-band-div)" />
      </svg>
    </div>
  )
}
