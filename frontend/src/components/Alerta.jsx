function Alerta({ tipo = 'error', children }) {
  if (!children) return null;

  return (
    <div className={`alerta alerta--${tipo}`} role="alert">
      {children}
    </div>
  );
}

export default Alerta;
