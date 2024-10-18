ALTER TABLE mydb.sessoes
ADD CONSTRAINT FK_sessoes_filmes FOREIGN KEY (filme_id)
REFERENCES mydb.filmes (id) ON DELETE NO ACTION;

ALTER TABLE mydb.sessoes
ADD CONSTRAINT FK_sessoes_salas FOREIGN KEY (sala_id)
REFERENCES mydb.salas (id) ON DELETE NO ACTION;

ALTER TABLE mydb.poltronas
ADD CONSTRAINT FK_poltronas_salas FOREIGN KEY (sala_id)
REFERENCES mydb.salas (id) ON DELETE NO ACTION;

ALTER TABLE mydb.ingressos
ADD CONSTRAINT FK_ingressos_sessao FOREIGN KEY (sessao_id)
REFERENCES mydb.sessoes (id) ON DELETE NO ACTION;

ALTER TABLE mydb.ingressos
ADD CONSTRAINT FK_ingressos_poltrona FOREIGN KEY (poltrona_id)
REFERENCES mydb.poltronas (id) ON DELETE NO ACTION;

ALTER TABLE mydb.ingressos
ADD CONSTRAINT FK_ingressos_cliente FOREIGN KEY (cpf_cliente)
REFERENCES mydb.cliente (cpf) ON DELETE NO ACTION;