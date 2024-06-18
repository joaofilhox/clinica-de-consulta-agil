# 🏥 Clínica de Consultas Ágil

Bem-vindo ao sistema de agendamento de consultas da **Clínica de Consultas Ágil**! Este projeto foi desenvolvido para ajudar a gerenciar os pacientes e suas consultas de forma eficiente.

## 📋 Funcionalidades

- **Cadastrar Paciente**: Adicione novos pacientes ao sistema.
- **Marcar Consulta**: Agende consultas para os pacientes.
- **Cancelar Consulta**: Cancele consultas previamente agendadas.
- **Persistência de Dados**: Os dados são salvos e carregados automaticamente de um arquivo JSON.

## 🛠️ Pré-requisitos

- [Node.js](https://nodejs.org/) instalado

## 🚀 Como Rodar o Projeto

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/joaofilhox/clinica-de-consulta-agil.git
   cd clinica-de-consulta-agil
   ```
   
2. **Execute o projeto**:
    ```bash
   node clinica.js
   ```
## 📂 Estrutura de Arquivos

- `clinica.js`: Arquivo principal contendo a lógica do programa.
- `dados.json`: Arquivo utilizado para armazenar os dados dos pacientes e consultas.

## 📝 Notas Adicionais

- As consultas não podem ser marcadas para datas e horas retroativas.
- O sistema impede a duplicidade de cadastros de pacientes pelo número de telefone.
- Os dados são salvos automaticamente no arquivo `dados.json` após cada operação.