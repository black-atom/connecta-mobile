export interface Atendimento {
  _id: string;
  cliente: Cliente;
  endereco: Endereco;
  contato: Contato;
  tecnico: Tecnico;
  avaliacao: Avaliacao[];
  data_atendimento: Date;
  estacionamento: string;
  modelo_equipamento: string;
  numero_equipamento: string;
  tipo: string;
  descricao: string;
  testes_efetuados: string;
  observacao: string;
  valor: string;
  autorizado: string;
  estado: string;
  interacao_tecnico: InteracaoTecnico;
  motivos: Motivo[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  updatedBy: string;
  imagens: any[];
  synced?: boolean;
}


export interface Motivo {
  estado: string;
  motivo: string;
}

export interface Cliente {
  _id: number;
  cnpj_cpf: string;
  nome_razao_social: string;
  nome_fantasia?: string;
  inscricao_estadual?: string;
}

export interface Endereco {
  cep: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
  ponto_referencia: string;
  complemento: string;
}

export interface Contato {
  nome: string;
  email: string;
  telefone: string;
  celular: string;
  observacao: string;
}

export interface Tecnico {
  _id: string;
  nome: string;
}

export interface Avaliacao {
  pergunta: string;
  valor: number;
}

export interface Imagens {
  tipo: string;
  url: string;
}

export interface InteracaoTecnico {
  estado: string;
  relatorio_tecnico: Treinamento;
  retornar: Retorno;
  treinamento: Treinamento;
  remocao_relogio: RemocaoRelogio;
}

export interface RelatorioRecnico {
  relatorio: string;
}

export interface Retorno {
  retornar: string;
}

export interface Treinamento {
  interrupcoes: boolean;
  cadastros: boolean;
  relatorios: boolean;
  importacao_dados: boolean;
  parametros_gerais: boolean;
  abonos_justificativas: boolean;
  backup_sistema: boolean;
  software: string;
  caminho: string;
}

export interface RemocaoRelogio {
  retirado: boolean;
  chave: boolean;
  bateria: boolean;
  bobina: boolean;
  fonte: boolean;
  pino: boolean;
  impresso: boolean;
}
