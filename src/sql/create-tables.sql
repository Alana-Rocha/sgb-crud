CREATE TABLE cliente (
  cpf VARCHAR(14) PRIMARY KEY,
  nome_cliente VARCHAR(100) NOT NULL,
  dt_nascimento DATE
);

CREATE TABLE filmes (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    duracao INTEGER NOT NULL,
    genero VARCHAR(255)
);

CREATE TABLE salas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    total_assentos INTEGER NOT NULL
);

CREATE TABLE sessoes (
    id SERIAL PRIMARY KEY,
    filme_id INTEGER REFERENCES filmes(id) ON DELETE CASCADE,
    sala_id INTEGER REFERENCES salas(id) ON DELETE CASCADE,
    horario_inicio TIMESTAMP NOT NULL
);

CREATE TABLE poltronas (
    id SERIAL PRIMARY KEY,
    sala_id INTEGER REFERENCES salas(id) ON DELETE CASCADE,
    numero_poltrona VARCHAR(10) NOT NULL
);

CREATE TABLE ingressos (
    id SERIAL PRIMARY KEY,
    sessao_id INTEGER REFERENCES sessoes(id) ON DELETE CASCADE,
    poltrona_id INTEGER REFERENCES poltronas(id) ON DELETE CASCADE,
    cpf_cliente VARCHAR(14) NOT NULL REFERENCES cliente(cpf)
);

