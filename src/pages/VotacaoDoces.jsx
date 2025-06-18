import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function VotacaoDoces() {
  const docesBase = [
    'Brigadeiro de milho','Bolo de aipim', 'Bolo de milho', 'Cocada', 'Pé de moleque', 'Queijadinha', 'Quindim',
  ].sort();

  const doces = [...docesBase];

  const location = useLocation();
  const navigate = useNavigate();
  const nomeDoState = location.state?.nome || '';

  const [nome, setNome] = useState(nomeDoState);
  const [selecionadosDoces, setSelecionadosDoces] = useState([]);
  const [outroDoce, setOutroDoce] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleSelecao = (item) => {
    if (selecionadosDoces.includes(item)) {
      setSelecionadosDoces(selecionadosDoces.filter((i) => i !== item));
    } else if (selecionadosDoces.length < 2) {
      setSelecionadosDoces([...selecionadosDoces, item]);
    } else {
      alert('Você só pode escolher até 2 doces.');
    }
  };

  const handleSubmit = () => {
    if (nome.trim() === '') {
      alert('Por favor, digite seu nome.');
      return;
    }

    const docesFinal = selecionadosDoces.includes('Outros (especifique)')
      ? [...selecionadosDoces.filter((d) => d !== 'Outros (especifique)'), outroDoce]
      : selecionadosDoces;

    const payload = {
      data: {
        Nome: nome,
        Confirmado: 'Sim (2ª votação)',
        Doces: docesFinal.join(', ')
      }
    };

    fetch('https://sheetdb.io/api/v1/rs0tsfzsmxbdp?sheet=Doce%202', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => {
        console.log('Votação enviada com sucesso:', data);
        setEnviado(true);
      })
      .catch(err => {
        console.error('Erro ao enviar:', err);
        alert('Erro ao enviar. Tente novamente.');
      });
  };

  if (enviado) {
    return <div className="container"><h3>🎉 Obrigado por votar nos doces novamente, {nome}!</h3></div>;
  }

  return (
    <div className="container">
      <h2>🍬 Segunda Votação de Doces</h2>
      <p>Escolha até 2 doces.</p>

      {/* Campo de nome se não vier via state */}
      {nomeDoState === '' && (
        <label>
          Nome:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite seu nome"
          />
        </label>
      )}

      <h3>Doces</h3>
      <div className="opcoes-lista">
        {doces.map((doce) => (
          <label key={doce} className="opcao-item">
            <input
              type="checkbox"
              checked={selecionadosDoces.includes(doce)}
              onChange={() => handleSelecao(doce)}
            />
            <span>{doce}</span>
          </label>
        ))}
      </div>

      {selecionadosDoces.includes('Outros (especifique)') && (
        <input
          type="text"
          placeholder="Digite outro doce"
          value={outroDoce}
          onChange={(e) => setOutroDoce(e.target.value)}
        />
      )}

      <button onClick={handleSubmit}>Enviar escolhas</button>
    </div>
  );
}

export default VotacaoDoces;
