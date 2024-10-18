INSERT IGNORE INTO mydb.cliente (cpf, nome_cliente, idade) VALUES ('12345678901', 'José Curió', 25);
INSERT IGNORE INTO mydb.cliente (cpf, nome_cliente, idade) VALUES ('12345678902', 'Cleiton Rasta', 30);
INSERT IGNORE INTO mydb.cliente (cpf, nome_cliente, idade) VALUES ('12345678903', 'Marcelo Caipora', 22);
INSERT IGNORE INTO mydb.cliente (cpf, nome_cliente, idade) VALUES ('12345678904', 'Julia Candida', 35);
INSERT IGNORE INTO mydb.cliente (cpf, nome_cliente, idade) VALUES ('12345678905', 'Marcos Antunes', 28);

INSERT IGNORE INTO mydb.filmes (titulo, duracao, genero) VALUES ('A Volta dos que não foram', 120, 'Animação');
INSERT IGNORE INTO mydb.filmes (titulo, duracao, genero) VALUES ('Candelabro, a história não contada', 150, 'Drama');
INSERT IGNORE INTO mydb.filmes (titulo, duracao, genero) VALUES ('Matador de Manuel', 90, 'Comédia');
INSERT IGNORE INTO mydb.filmes (titulo, duracao, genero) VALUES ('Morte Certa 2', 110, 'Terror');
INSERT IGNORE INTO mydb.filmes (titulo, duracao, genero) VALUES ('Vingadoras', 100, 'Ação');

INSERT IGNORE INTO mydb.salas (nome, total_assentos) VALUES ('sala 1', 5);
INSERT IGNORE INTO mydb.salas (nome, total_assentos) VALUES ('sala 2', 5);
INSERT IGNORE INTO mydb.salas (nome, total_assentos) VALUES ('sala 3', 5);
INSERT IGNORE INTO mydb.salas (nome, total_assentos) VALUES ('sala 4', 5);
INSERT IGNORE INTO mydb.salas (nome, total_assentos) VALUES ('sala 5', 5);

INSERT IGNORE INTO mydb.poltronas (sala_id, numero_poltrona) VALUES (1, 'A1'), (1, 'A2'), (1, 'A3'), (1, 'A4'), (1, 'A5');
INSERT IGNORE INTO mydb.poltronas (sala_id, numero_poltrona) VALUES (2, 'B1'), (2, 'B2'), (2, 'B3'), (2, 'B4'), (2, 'B5');
INSERT IGNORE INTO mydb.poltronas (sala_id, numero_poltrona) VALUES (3, 'C1'), (3, 'C2'), (3, 'C3'), (3, 'C4'), (3, 'C5');
INSERT IGNORE INTO mydb.poltronas (sala_id, numero_poltrona) VALUES (4, 'D1'), (4, 'D2'), (4, 'D3'), (4, 'D4'), (4, 'D5');
INSERT IGNORE INTO mydb.poltronas (sala_id, numero_poltrona) VALUES (5, 'E1'), (5, 'E2'), (5, 'E3'), (5, 'E4'), (5, 'E5');

INSERT IGNORE INTO mydb.sessoes (filme_id, sala_id, horario_inicio) VALUES (1, 1, '2024-10-16 10:00:00');
INSERT IGNORE INTO mydb.sessoes (filme_id, sala_id, horario_inicio) VALUES (2, 2, '2024-10-16 13:00:00');
INSERT IGNORE INTO mydb.sessoes (filme_id, sala_id, horario_inicio) VALUES (3, 3, '2024-10-16 16:00:00');
INSERT IGNORE INTO mydb.sessoes (filme_id, sala_id, horario_inicio) VALUES (4, 4, '2024-10-16 19:00:00');
INSERT IGNORE INTO mydb.sessoes (filme_id, sala_id, horario_inicio) VALUES (5, 5, '2024-10-16 21:00:00');

INSERT IGNORE INTO mydb.ingressos (sessao_id, poltrona_id, cpf_cliente) VALUES (1, 1, '12345678901');
INSERT IGNORE INTO mydb.ingressos (sessao_id, poltrona_id, cpf_cliente) VALUES (2, 2, '12345678902');
INSERT IGNORE INTO mydb.ingressos (sessao_id, poltrona_id, cpf_cliente) VALUES (3, 3, '12345678903');
INSERT IGNORE INTO mydb.ingressos (sessao_id, poltrona_id, cpf_cliente) VALUES (4, 4, '12345678904');
INSERT IGNORE INTO mydb.ingressos (sessao_id, poltrona_id, cpf_cliente) VALUES (5, 5, '12345678905');
