import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>🎉 Bem-vindo à Festa Junina da Família!</h1>
      <p>Confirme sua presença e escolha seus quitutes favoritos!</p>

      <div style={{ marginTop: '2rem' }}>
        <Link to="/confirmacao">
          <button style={{ marginRight: '10px' }}>✅ Confirmar Presença</button>
        </Link>

        <Link to="/comidas">
          <button>🍡 Escolher Comidas</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
