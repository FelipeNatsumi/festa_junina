import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function EscolhaComidas() {
  const docesBase = [
    'Brigadeiro de milho', 'Pipoca doce', 'Bolo de aipim', 'Bolo de fubá',
    'Bolo de milho', 'Cocada', 'Canjica', 'Pé de moleque', 'Paçoca',
    'Pé de moça', 'Queijadinha', 'Quindin', 'Doce de abóbora',
    'Quebra queixo', 'Pamonha'
  ].sort();

  const salgadosBase = [
    'Pastel', 'Hot dog', 'Mini pizza', 'Pipoca', 'Torta',
    'Milho na manteiga', 'Carne louca', 'Empada'
  ].sort();

  const doces = [...docesBase, 'Outros (especifique)'];
  const salgados = [...salgadosBase, 'Outros (especifique)'];

  const location = useLocation();
  const navigate = useNavigate();
  const nomeInicial = location.state?.nome || ''; // nome vindo da página anterior

  const [nome, setNome] = useState(nomeInicial);
  const [selecionadosDoces, setSelecionadosDoces] = useState([]);
  const [selecionadosSalgados, setSelecionadosSalgados] = useState([]);
  const [outroDoce, setOutroDoce] = useState('');
  const [outroSalgado, setOutroSalgado] = useState('');
  const [enviado, setEnviado] = useState(false);

  useEffect(() => {
    if (!nomeInicial) {
      // Se não recebeu nome, redireciona para a Home
      navigate('/');
    }
  }, [nomeInicial, navigate]);

  const handleSelecao = (item, categoria) => {
    const selecionados = categoria === 'doce' ? selecionadosDoces : selecionadosSalgados;
    const setSelecionados = categoria === 'doce' ? setSelecionadosDoces : setSelecionadosSalgados;

    if (selecionados.includes(item)) {
      setSelecionados(selecionados.filter((i) => i !== item));
    } else if (selecionados.length < 5) {
      setSelecionados([...selecionados, item]);
    } else {
      alert('Você só pode escolher até 5 itens por categoria.');
    }
  };

  const handleSubmit = () => {
    const docesFinal = selecionadosDoces.includes('Outros (especifique)')
      ? [...selecionadosDoces.filter((d) => d !== 'Outros (especifique)'), outroDoce]
      : selecionadosDoces;

    const salgadosFinal = selecionadosSalgados.includes('Outros (especifique)')
      ? [...selecionadosSalgados.filter((s) => s !== 'Outros (especifique)'), outroSalgado]
      : selecionadosSalgados;

    const payload = {
      data: {
        Nome: nome,
        Confirmado: 'Sim',
        Doces: docesFinal.join(', '),
        Salgados: salgadosFinal.join(', ')
      }
    };

    fetch('https://sheetdb.io/api/v1/rs0tsfzsmxbdp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => {
        console.log('Enviado com sucesso:', data);
        setEnviado(true);
      })
      .catch(err => {
        console.error('Erro ao enviar:', err);
        alert('Erro ao enviar suas escolhas. Tente novamente.');
      });
  };

  if (enviado) {
    return <div className="container"><h3>🎉 Obrigado {nome}, Juleba agradece 🙏🏻🐈‍⬛ !</h3></div>;
  }

  return (
    <div className="container">
      <h2>Escolha seus doces e salgados</h2>
      <p>Você poderá selecionar até 5 de cada categoria.</p>

      {/* Só mostra o campo de nome se ele não veio da tela anterior */}
      {!nomeInicial && (
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
              onChange={() => handleSelecao(doce, 'doce')}
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

      <h3>Salgados</h3>
        <div className="opcoes-lista">
        {salgados.map((salgado) => (
            <label key={salgado} className="opcao-item">
            <input
                type="checkbox"
                checked={selecionadosSalgados.includes(salgado)}
                onChange={() => handleSelecao(salgado, 'salgado')}
            />
            <span>{salgado}</span>
            </label>
        ))}
        </div>
      {selecionadosSalgados.includes('Outros (especifique)') && (
        <input
          type="text"
          placeholder="Digite outro salgado"
          value={outroSalgado}
          onChange={(e) => setOutroSalgado(e.target.value)}
        />
      )}

      <button onClick={handleSubmit}>Enviar escolhas</button>
    </div>
  );
}

export default EscolhaComidas;