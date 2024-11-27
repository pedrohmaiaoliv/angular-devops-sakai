// Definição da interface para o modelo de serviço
export interface Service {
  id?: string; // Identificador único do serviço 
  key?: string; // Chave única gerada pelo Firebase para identificar o serviço
  nome?: string; // Nome do serviço
  descricao?: string; // Descrição detalhada do serviço 
  preco?: number; // Preço do serviço
  duracao?: number; // Duração do serviço em minutos
}
