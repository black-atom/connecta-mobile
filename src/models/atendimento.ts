export interface Atendimento {
  createdAt: string;
  updatedAt: string;
  endereco: Endereco;
  contato: Contato;
  createdBy: string;
  updatedBy: string;
  _id: string;
  inativo: Inativo;
  encaixe: boolean;
  estado: string;
  km_inicio: KM;
  km_final: KM;
  inicio: Date;
  fim: Date;
  observacao: string;
  avaliacao: Avaliacao[];
  valor: number;
  tipo: string;
  tecnico: Tecnico;
  estacionamento: string;
  numero_equipamento: string;
  modelo_equipamento: string;
  testes_efetuados: string;
  descricao: string;
  data_atendimento: string;
  imagens: any[];
  cliente: Cliente;
  synced?: boolean;
  retorno: Retorno;
  relatorio_tecnico: RelatorioTecnico;
  treinamento: Treinamento;
  remocao_relogio: RemocaoRelogio;
}

interface Cliente {
  cnpj_cpf: string;
  nome_razao_social: string;
  inscricao_estadual: string;
  nome_fantasia: string;
}

interface Tecnico {
  nome: string;
}

export interface Avaliacao {
  pergunta: string;
  _id?: string;
  valor: number;
}

export interface KM {
  data?: any;
  km?: any;
}

interface Inativo {
  motivo: string;
  statos: boolean;
}

interface Contato {
  telefone: string;
  nome: string;
  _id: string;
  observacao: string;
  celular: string;
  email: string;
}

export interface Endereco {
  rua: string;
  numero: string;
  bairro: string;
  uf: string;
  cidade: string;
  cep: string;
  _id: string;
  ponto_referencia: string;
  complemento: string;
}

interface Retorno {
  retornar: boolean;
  motivo: string;
}

interface RelatorioTecnico {
  relatorio: string
}

interface Treinamento {
  interrupcoes: boolean;
  cadastros: boolean;
  relatorios: boolean;
  importacao_dados: boolean;
  parametros_gerais: boolean;
  abonos_justificativas: boolean;
  backup_sistema: boolean;
  software: boolean;
  caminho: string
}

interface RemocaoRelogio {
  retirado: boolean;
  chave: boolean;
  bateria: boolean;
  bobina: boolean;
  fonte: boolean;
  pino: boolean;
  impressora: boolean;
}