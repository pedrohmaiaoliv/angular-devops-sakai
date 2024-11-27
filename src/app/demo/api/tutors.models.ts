// Interface que representa os dados de um tutor (proprietário do pet)
export interface Tutor {
    id?: string; // Identificador único do tutor, usado para lógica ou integração com sistemas externos (opcional)
    key?: string; // Chave gerada automaticamente pelo Firebase para identificar o tutor no banco de dados (opcional)
    nome?: string; // Nome do tutor (opcional, mas geralmente obrigatório em validações)
    rua?: string; // Nome da rua do endereço do tutor (opcional)
    bairro?: string; // Nome do bairro do endereço do tutor (opcional)
    numero?: number; // Número do endereço do tutor (opcional)
    cidade?: string; // Cidade onde o tutor reside (opcional)
    cep?: string; // Código postal (CEP) do endereço do tutor (opcional)
    estado?: string; // Estado onde o tutor reside (opcional)
    telefone?: string; // Número de telefone do tutor (opcional, pode incluir validações para formato correto)
    cpf?: string; // CPF do tutor (opcional, pode incluir validações de formato e unicidade)
    sexo?: 'Masculino' | 'Feminino' | 'Outro'; 
    // Sexo do tutor, com valores restritos para garantir consistência (opcional)
}
