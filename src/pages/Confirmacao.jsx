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
    setConfirmado(true);
  };

  return (
    <div className="container">
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
            />
          </label>
          <button type="submit">Confirmar Presença</button>
        </form>
      ) : (
        <h3>Obrigado, {nome}! Sua presença foi confirmada 🎉</h3>
      )}
    </div>
  );
}

export default Confirmacao;
