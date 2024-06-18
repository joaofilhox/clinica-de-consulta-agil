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

function marcarConsulta() {
    if (pacientes.length === 0) {
        console.log('Nenhum paciente cadastrado.');
        return mostrarMenu();
    }

    listarPacientes();
    rl.question('Escolha o número do paciente para marcar a consulta: ', (pacienteIdx) => {
        pacienteIdx = parseInt(pacienteIdx) - 1;

        if (pacienteIdx < 0 || pacienteIdx >= pacientes.length) {
            console.log('Paciente inválido.');
            return mostrarMenu();
        }

        const paciente = pacientes[pacienteIdx];
        rl.question('Digite o dia da consulta (formato DD-MM-YYYY): ', (dia) => {
            rl.question('Digite a hora da consulta (formato HH:MM): ', (hora) => {
                rl.question('Digite a especialidade da consulta: ', (especialidade) => {
                    const dataConsulta = new Date(`${dia}T${hora}:00`);
                    if (dataConsulta < new Date()) {
                        console.log('Não é possível marcar consultas retroativas.');
                        return mostrarMenu();
                    }

                    if (consultas.find(consulta => consulta.dia === dia && consulta.hora === hora)) {
                        console.log('Já existe uma consulta marcada nesse horário.');
                        return mostrarMenu();
                    }

                    consultas.push({ paciente, dia, hora, especialidade });
                    console.log('Consulta marcada com sucesso');
                    mostrarMenu();
                });
            });
        });
    });
}
