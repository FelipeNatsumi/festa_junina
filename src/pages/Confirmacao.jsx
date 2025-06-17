import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Confirmacao() {
  const [nome, setNome] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nome.trim() === '') {
      alert('Por favor, insira seu nome.');
      return;
    }

    // Redireciona para a página de comidas e passa o nome
    navigate('/comidas', { state: { nome } });
  };

  return (
    <div className="container">
      <h2>✅ Confirmação de Presença</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite seu nome"
          />
        </label>
        <button type="submit">Confirmar Presença</button>
      </form>
    </div>
  );
}

export default Confirmacao;
