export default function TimelineLoading() {
  const shimmer = {
    background: 'linear-gradient(90deg, #1a1a2e 25%, #2a2a4e 50%, #1a1a2e 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s ease-in-out infinite',
    borderRadius: '6px',
  };

  const containerStyle = {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '2rem 1.5rem 4rem',
    opacity: 0.6,
  };

  const heroStyle = {
    textAlign: 'center',
    marginBottom: '3rem',
  };

  const labelStyle = {
    ...shimmer,
    width: '140px',
    height: '14px',
    margin: '0 auto 1rem',
  };

  const titleStyle = {
    ...shimmer,
    width: '260px',
    height: '32px',
    margin: '0 auto 1rem',
  };

  const subtitleStyle = {
    ...shimmer,
    width: '420px',
    maxWidth: '90%',
    height: '16px',
    margin: '0 auto',
  };

  const filtersStyle = {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: '3rem',
  };

  const filterStyle = {
    ...shimmer,
    width: '80px',
    height: '36px',
    borderRadius: '999px',
  };

  const timelineStyle = {
    position: 'relative',
    paddingLeft: '2rem',
  };

  const eventStyle = {
    display: 'flex',
    gap: '1.5rem',
    marginBottom: '2.5rem',
    alignItems: 'flex-start',
  };

  const yearStyle = {
    ...shimmer,
    width: '100px',
    height: '18px',
    flexShrink: 0,
    marginTop: '2px',
  };

  const contentStyle = {
    flex: 1,
  };

  const eventTitleStyle = {
    ...shimmer,
    width: '60%',
    height: '22px',
    marginBottom: '0.75rem',
  };

  const descLine = {
    ...shimmer,
    width: '100%',
    height: '14px',
    marginBottom: '0.5rem',
  };

  const descLineShort = {
    ...shimmer,
    width: '45%',
    height: '14px',
  };

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
      <div style={containerStyle}>
        <div style={heroStyle}>
          <div style={labelStyle} />
          <div style={titleStyle} />
          <div style={subtitleStyle} />
        </div>

        <div style={filtersStyle}>
          {[...Array(7)].map((_, i) => (
            <div key={i} style={filterStyle} />
          ))}
        </div>

        <div style={timelineStyle}>
          {[...Array(5)].map((_, i) => (
            <div key={i} style={eventStyle}>
              <div style={yearStyle} />
              <div style={contentStyle}>
                <div style={eventTitleStyle} />
                <div style={descLine} />
                <div style={descLine} />
                <div style={descLineShort} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
