import { useState } from 'react';

function Confirmacao() {
  const [nome, setNome] = useState('');
  const [confirmado, setConfirmado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (nome.trim() === '') {
      alert('Por favor, insira seu nome.');
      return;
    }

    // Aqui no futuro vamos salvar no banco de dados ou enviar para backend
    setConfirmado(true);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>✅ Confirmação de Presença</h2>
      {!confirmado ? (
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite seu nome"
              style={{ marginLeft: '10px' }}
            />
          </label>
          <br /><br />
          <button type="submit">Confirmar Presença</button>
        </form>
      ) : (
        <h3>Obrigado, {nome}! Sua presença foi confirmada 🎉</h3>
      )}
    </div>
  );
}

export default Confirmacao;