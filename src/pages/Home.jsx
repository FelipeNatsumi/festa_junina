import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container">
      <h1>🎉 Bem-vindo à Festa Junina!</h1>
      <p>Confirme sua presença e escolha seus quitutes favoritos!</p>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Link to="/confirmacao">
          <button>Confirmar Presença</button>
        </Link>

        <Link to="/comidas">
          <button>Escolher Comidas</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
