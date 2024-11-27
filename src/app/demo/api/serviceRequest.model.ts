// Interface que representa os dados de uma solicitação de serviço
export interface ServiceRequest {
    id?: string; // Identificador único da solicitação de serviço (opcional, usado para sistemas externos ou lógica interna)
    key?: string; // Chave gerada automaticamente pelo Firebase para identificar a solicitação no banco de dados
    pet?: string; // Identificador ou chave do pet associado à solicitação (opcional)
    petName?: string; // Nome do pet associado à solicitação (opcional, usado para exibição)
    tutor?: string; // Identificador ou chave do tutor (proprietário do pet) associado à solicitação (opcional)
    tutorName?: string; // Nome do tutor associado à solicitação (opcional, usado para exibição)
    service?: string; // Identificador ou chave do serviço solicitado (opcional)
    serviceName?: string; // Nome do serviço solicitado (opcional, usado para exibição)
    date?: Date | string; // Data da solicitação ou do agendamento do serviço (opcional, aceita Date ou string para flexibilidade)
}
