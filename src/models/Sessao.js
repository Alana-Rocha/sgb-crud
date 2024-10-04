export class Sessao {
  horario;
  quant_assentos;
  sala;

  constructor() {
    this.horario = "";
    this.quant_assentos = 0;
    this.sala = 0;
    this.scan = PromptSync();
  }

  inputDados() {
    this.horario = this.scan("Digite o Horario de inicio do filme (AAAA/MM/DD HH/MM): ");
    this.quant_assentos = this.scan("Digite a quantidade de assentos da sala: ");
    this.idade = +this.scan("Digite a idade: "); 
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
