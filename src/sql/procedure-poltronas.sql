DELIMITER //

CREATE PROCEDURE criar_poltronas_para_salas()
BEGIN
    DECLARE i INT DEFAULT 1;
    DECLARE sala_id INT DEFAULT 1;
    DECLARE total_poltronas INT DEFAULT 5;  -- Define um total fixo de 5 poltronas por sala
    DECLARE letra CHAR(1);
    DECLARE num INT;

    -- Loop para cada sala
    WHILE sala_id <= 4 DO   -- Supondo que você tem 4 salas
        -- Iniciar as poltronas com 'A1' para cada sala
        SET letra = 'A';
        SET num = 1;
        SET i = 1;

        -- Loop para inserir as 5 poltronas de acordo com o total para aquela sala
        WHILE i <= total_poltronas DO
            INSERT INTO poltronas (sala_id, numero_poltrona)
            VALUES (sala_id, CONCAT(letra, num));

            -- Incrementar número da poltrona
            SET num = num + 1;

            -- Quando atingir 10, mudar de letra e resetar número
            IF num > 10 THEN
                SET num = 1;
                SET letra = CHAR(ASCII(letra) + 1);
            END IF;

            -- Incrementar contador
            SET i = i + 1;
        END WHILE;

        -- Passar para a próxima sala
        SET sala_id = sala_id + 1;
    END WHILE;
END //

DELIMITER ;
