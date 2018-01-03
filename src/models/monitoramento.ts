export interface Monitoramento {
  uuid?: string,
  _id?: string,
  km_inicial?: number,
  km_final?: number,
  data_hora_inicial_km?: Date,
  data_hora_final_km?: Date,
  data_hora_inicial_virgente_local?: Date,
  data_hora_final_virgente_local?: Date,
  tipo_quilometragem?: string,
  isUploaded?: boolean,
}
