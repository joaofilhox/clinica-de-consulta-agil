const fs = require('fs');
const readline = require('readline');

const DATA_FILE = 'dados.json';

let pacientes = [];
let consultas = [];

function carregarDados() {
    try {
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      const parsedData = JSON.parse(data);
      pacientes = parsedData.pacientes || [];
      consultas = parsedData.consultas || [];
      console.log('Dados carregados com sucesso.');
    } catch (err) {
      console.log('Nenhum dado salvo encontrado. Iniciando com dados vazios.');
    }
  }
  
  function salvarDados() {
    const data = { pacientes, consultas };
    fs.writeFileSync(DATA_FILE, JSON.stringify(data), 'utf8');
  }
  
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  function cadastrarPaciente() {
    rl.question('Digite o nome do paciente: ', (nome) => {
      rl.question('Digite o telefone do paciente: ', (telefone) => {
        if (pacientes.find(paciente => paciente.telefone === telefone)) {
          console.log('Paciente já cadastrado!');
        } else {
          pacientes.push({ nome, telefone });
          console.log('Paciente cadastrado com sucesso');
        }
        mostrarMenu();
      });
    });
  }
  
  function listarPacientes() {
    pacientes.forEach((paciente, idx) => {
      console.log(`${idx + 1}. ${paciente.nome} - ${paciente.telefone}`);
    });
  }
  