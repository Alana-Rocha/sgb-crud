export class Sessao {
  horario;
  valor_bilhete;
  quant_assentos;
  sala;

  constructor(horario, valor_bilhete, quant_assentos, sala) {
    this.horario = horario;
    this.valor_bilhete = valor_bilhete;
    this.quant_assentos = quant_assentos;
    this.sala = sala;
  }

  getHorario() {
    return this.horario;
  }

  getValorBilhete() {
    return this.valor_bilhete;
  }

  getAssentos() {
    return this.assentos;
  }

  getSala() {
    return this.sala;
  }

  toString() {
    return `Horario: ${this.horario} \n Valor Bilhete: ${this.valor_bilhete} \n Quantidade Assentos: ${this.quant_assentos} \n Sala: ${this.sala}`;
  }
}
