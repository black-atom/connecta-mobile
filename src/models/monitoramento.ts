export interface Monitoramento {
  uuid?: String,
  _id?: String,
  km_inicial?: Number,
  km_final?: Number,
  data_hora_inicial_km?: Date,
  data_hora_final_km?: Date,
  data_hora_inicial_virgente_local?: Date,
  data_hora_final_virgente_local?: Date,
  tipo_quilometragem?: String,
  isUploaded?: Boolean,
}
