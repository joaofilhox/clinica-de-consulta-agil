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
  