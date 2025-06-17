import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleConfirmarClick = () => {
    navigate('/confirmacao');
  };

  return (
    <div className="container" style={{ textAlign: 'center' }}>
      {showContent ? (
        <>
          <h1>🎉 Bem-vindo à Festa Junina!</h1>
          <p>Confirme sua presença para continuar</p>
          <button onClick={handleConfirmarClick}>Confirmar Presença</button>
        </>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}

export default Home;
