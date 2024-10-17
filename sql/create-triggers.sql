CREATE TRIGGER atualizar_poltronas_apos_excluir_sessao
AFTER DELETE ON sessoes
FOR EACH ROW
BEGIN
  -- Atualiza as poltronas relacionadas à sessão excluída para 'DESOCUPADA' (ou true)
  UPDATE poltronas
  SET status_poltrona = 'DESOCUPADA'  -- Ou SET status_poltrona = TRUE, dependendo do tipo de dado
  WHERE sala_id = OLD.sala_id;  -- Atualiza todas as poltronas da sala da sessão excluída
END;