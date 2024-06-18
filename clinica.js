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
    try {
        const data = { pacientes, consultas };
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
        console.log('Dados salvos com sucesso.');
    } catch (err) {
        console.error('Erro ao salvar dados:', err);
    }
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
                salvarDados();
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
                    salvarDados();
                    mostrarMenu();
                });
            });
        });
    });
}

function cancelarConsulta() {
    if (consultas.length === 0) {
        console.log('Nenhuma consulta agendada.');
        return mostrarMenu();
    }

    consultas.forEach((consulta, idx) => {
        const paciente = consulta.paciente;
        console.log(`${idx + 1}. ${consulta.dia} ${consulta.hora} - ${consulta.especialidade} para ${paciente.nome}`);
    });

    rl.question('Escolha o número da consulta para cancelar: ', (consultaIdx) => {
        consultaIdx = parseInt(consultaIdx) - 1;

        if (consultaIdx < 0 || consultaIdx >= consultas.length) {
            console.log('Consulta inválida.');
            return mostrarMenu();
        }

        const consulta = consultas.splice(consultaIdx, 1);
        console.log(`Consulta de ${consulta[0].paciente.nome} em ${consulta[0].dia} ${consulta[0].hora} cancelada com sucesso`);
        salvarDados();
        mostrarMenu();
    });
}

function mostrarMenu() {
    console.log('\nMenu:');
    console.log('1. Cadastrar um paciente');
    console.log('2. Marcar consulta');
    console.log('3. Cancelar consulta');
    console.log('4. Sair');

    rl.question('Escolha uma opção: ', (opcao) => {
        switch (opcao) {
            case '1':
                cadastrarPaciente();
                break;
            case '2':
                marcarConsulta();
                break;
            case '3':
                cancelarConsulta();
                break;
            case '4':
                salvarDados();
                rl.close();
                break;
            default:
                console.log('Opção inválida, tente novamente.');
                mostrarMenu();
        }
    });
}

carregarDados();
mostrarMenu();
