import React, { useState,  useEffect } from 'react';
import './acao.css';

function Acao() {
    const [mostrarFormularioGasto, setMostrarFormularioGasto] = useState(false);
    const [mostrarFormularioRenda, setMostrarFormularioRenda] = useState(false);
    const [gastos, setGastos] = useState([]);
    const [rendas, setRendas] = useState([]);
    

    // script da tela do editor
    const [telaEditor, setTelaEditor] = useState(false);
    const [telaEditorRenda, setTelaEditorRenda] = useState(false);

    //codigo para função de apagar coisas da lista

    const [gastoParaApagar, setGastoParaApagar] = useState(null); 
    const [rendaParaApagar, setRendaParaApagar] = useState(null);
    
// parte do codigo para abrir e fechar o editor de excluir coisas da lista 
    const closeeditor = () =>{
        setTelaEditor(false);
    }
    const openEditor = () =>{
        setTelaEditor(true);
    }

    const closeeditorRenda = () =>{
        setTelaEditorRenda(false);
    }
    const openEditorRenda = () =>{
        setTelaEditorRenda(true);
    }

    const toggleFormularioGasto = () => {
        setMostrarFormularioGasto(!mostrarFormularioGasto);
    };
    const toggleFormularioRenda = () => {
        setMostrarFormularioRenda(!mostrarFormularioRenda);
    };

    const closeFormularioGasto = () => {
        setMostrarFormularioGasto(false);
    };

    const closeFormularioRenda = () => { 
        setMostrarFormularioRenda(false);
    };

    const handleSubmitGasto = (event) => {
        event.preventDefault();
        const nomeGasto = event.target.elements['gasto-text'].value.trim();
        const valorGasto = parseFloat(event.target.elements['gasto-valor'].value);
        
        // hora e data no registrado no item da lista
        const options = {
            hour: 'numeric', minute: 'numeric',
            year: 'numeric', month: 'numeric', day: 'numeric'
        };
        const time = new Date().toLocaleString('pt-BR', options);
    
        if (nomeGasto && !isNaN(valorGasto) && valorGasto > 0) {
            setGastos([...gastos, { nome: nomeGasto, valor: valorGasto, time: time }]);
            setMostrarFormularioGasto(false);
        } else {
            alert('Por favor, preencha todos os campos corretamente.');
        }
    };
    
    const handleSubmitRenda = (event) => {
        event.preventDefault();
        const nomeRenda = event.target.elements['renda-text'].value.trim();
        const valorRenda = parseFloat(event.target.elements['renda-valor'].value);
        
        const options = {
            hour: 'numeric', minute: 'numeric',
            year: 'numeric', month: 'numeric', day: 'numeric'
        };
        const time = new Date().toLocaleString('pt-BR', options);
    
        if (nomeRenda && !isNaN(valorRenda) && valorRenda > 0) {
            setRendas([...rendas, { nome: nomeRenda, valor: valorRenda, time: time }]);
            setMostrarFormularioRenda(false);
        } else {
            alert('Por favor, preencha todos os campos corretamente.');
        }
    };



    // segunda parte codigo para função de apagar coisas da lista

    const apagarGasto = () => {
        if (gastoParaApagar !== null) {
            const updatedGastos = [...gastos];
            updatedGastos.splice(gastoParaApagar, 1);
            setGastos(updatedGastos);
            closeeditor(); // Fechando o editor após a exclusão
        }
    };

    const apagarRenda = () => {
        if(rendaParaApagar !== null){
            const updatedRenda = [...rendas];
            updatedRenda.splice(rendaParaApagar, 1);
            setRendas(updatedRenda);
            closeeditorRenda();
        }
    }

    // codigo de calculo  das caixas 

    const totalGastos = gastos.reduce((total, gasto) => total + gasto.valor, 0);
    const totalRendas = rendas.reduce((total, renda) => total + renda.valor, 0);
    const totalPoupado = totalRendas - totalGastos;
    
// código para o hora data no top do aplicativo
    const [dateTime, setDateTime] = useState(new Date());

    useEffect(() => {
        const timerID = setInterval(() => tick(), 1000);

        return () => {
            clearInterval(timerID);
        };
    }, []);

    function tick() {
        setDateTime(new Date());
    }
    
    return (

        <div>
           

          <div className="home-clock">
            <p>Bem-vindo à Home</p>
            <p className="clock-style">
                {dateTime.toLocaleString()}
              </p>

            </div>

    

           <div className="tagdiv">
              <h1 id="gasto">Gastos</h1>
              <h1 id="rendas">Renda</h1>
           </div>
         

            <div className="caixas">   
                <output className="caixa1" type="text" id="caixaRenda">Renda 
                <div class="resultadoCaixa1">R${totalRendas}</div>
                </output>

                <output className="caixa2" type="text" id="caixaGasto">Gastos 
                <div class="resultadoCaixa2">R${totalGastos}</div>
                </output>

                <output className="caixa3" type="text" id="caixaPoupado">Poupado <div class="resultadoCaixa3">R${totalPoupado}</div>
                </output>

            </div>

            <div className="divbotao">
                <div className="divbotao1">
                    {gastos.map((gasto, index) => (
                        <div key={index} className="div-print-gasto">
                            <p>{gasto.nome}</p>
                            <p>R${gasto.valor}</p>
                            <p>{gasto.time}</p>
                            <p className="editor" onClick={() => {setGastoParaApagar(index); openEditor();}}>x</p>
                        </div>
                    ))}
                    {!mostrarFormularioGasto && (
                        <button id="botaoAddGasto" onClick={toggleFormularioGasto}>+</button>
                    )}
                </div>
                <div className="divbotao2">
                    {rendas.map((renda, index) => (
                        <div key={index} className="div-print-renda">
                            <p>{renda.nome}</p>
                            <p>R${renda.valor}</p>
                            <p>{renda.time}</p>
                            <p className="editorRenda" onClick={() =>{setRendaParaApagar(index); openEditorRenda();}}>x</p>
                        </div>
                    ))}
                    {!mostrarFormularioRenda && (
                        <button id="botaoAddRenda" onClick={toggleFormularioRenda}>+</button>
                    )}
                </div>
                {telaEditor && (
                    <div className="tela-editor">
                        <p className="titulo-apagar">Tem certeza que quer apagar?</p>
                        <button className="bteditor" onClick={apagarGasto}>Apagar</button>
                        <button className="bteditor" onClick={closeeditor}>Fechar</button>
                    </div>
                )}
                {telaEditorRenda && (
                    <div className="tela-editor">

                        <p className="titulo-apagar">Tem certeza que quer apagar? </p>
                        <button className="bteditor"onClick={apagarRenda}>Apagar</button>
                        <button className="bteditor" onClick={closeeditorRenda}>Fechar</button>

                    </div>
                )}
                {mostrarFormularioGasto && (
                    <div className="mini-tela1">
                        <form onSubmit={handleSubmitGasto}>
                        <span className="close-mini-tela" onClick={closeFormularioGasto}>&times;</span>
                            <h2 className="h2spam">Adicionar Gasto</h2>
                            <label className="labeladd">
                                Nome do Gasto:
                                <input className="inputStyle" id="gasto-text" type="text" />
                            </label>
                            <label className="labeladd">
                                Valor do Gasto:
                                <input className="inputStyle" id="gasto-valor" type="number" />
                            </label>
                            <button className="btadicionar" type="submit">Adicionar</button>
                        </form>
                    </div>
                )}
                {mostrarFormularioRenda && (
                    <div className="mini-tela2">
                        <form onSubmit={handleSubmitRenda}>
                        <span className="close-mini-tela" onClick={closeFormularioRenda}>&times;</span>
                            <h2 className="h2spam">Adicionar Renda</h2>
                            <label className="labeladd">
                                Nome da Renda:
                                <input className="inputStyle" id="renda-text" type="text" />
                            </label>
                            <label className="labeladd">
                                Valor da Renda:
                                <input className="inputStyle" id="renda-valor" type="number" />
                            </label>
                            <button className="btadicionar" type="submit">Adicionar</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Acao;
