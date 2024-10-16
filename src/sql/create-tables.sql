DROP TABLE sessoes;
DROP TABLE poltronas;
DROP TABLE ingressos;
DROP TABLE salas;
DROP TABLE filmes;
DROP TABLE cliente;

CREATE TABLE IF NOT EXISTS cliente (
  cpf VARCHAR(14) PRIMARY KEY,
  nome_cliente VARCHAR(100) NOT NULL,
  idade int NOT NULL
);

CREATE TABLE IF NOT EXISTS filmes (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    duracao DOUBLE  NOT NULL,
    genero VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS salas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    total_assentos int NOT NULL
);

CREATE TABLE IF NOT EXISTS sessoes (
    id SERIAL PRIMARY KEY,
    filme_id int REFERENCES filmes(id) ON DELETE CASCADE,
    sala_id int REFERENCES salas(id) ON DELETE CASCADE,
    horario_inicio VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS poltronas (
    id SERIAL PRIMARY KEY,
    sala_id int REFERENCES salas(id) ON DELETE CASCADE,
    numero_poltrona VARCHAR(10) NOT NULL,
    status_poltrona ENUM('OCUPADA', 'DESOCUPADA') NOT NULL DEFAULT 'DESOCUPADA'
);

CREATE TABLE IF NOT EXISTS ingressos (
    id SERIAL PRIMARY KEY,
    sessao_id int REFERENCES sessoes(id) ON DELETE CASCADE,
    poltrona_id int REFERENCES poltronas(id) ON DELETE CASCADE,
    cpf_cliente VARCHAR(14) NOT NULL REFERENCES cliente(cpf)
);

