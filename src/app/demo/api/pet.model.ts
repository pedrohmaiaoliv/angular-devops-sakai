// Interface que representa o status de inventário
interface InventoryStatus {
    label: string; // Nome ou rótulo amigável para exibição (ex.: "Disponível")
    value: string; // Valor associado ao rótulo, geralmente usado para lógica (ex.: "available")
}

// Interface que representa os dados de um pet no sistema
export interface Pet {
    id?: string; // Identificador único do pet (opcional, pode ser usado para sistemas externos ou lógica interna)
    code?: string; // Código único para o pet, como um registro ou número de identificação
    key?: string; // Chave gerada pelo Firebase para identificar o pet no banco de dados (opcional)
    nome?: string; // Nome do pet (opcional)
    idade?: number; // Idade do pet, representada como um número (opcional)
    dataNascimento?: Date | string; // Data de nascimento do pet, aceita tanto objeto Date quanto string (opcional)
    especie?: string; // Espécie do pet, como "Cachorro", "Gato", etc. (opcional)
    peso?: number; // Peso do pet, representado como um número, geralmente em quilos (opcional)
    cor?: 'Branco' | 'Preto' | 'Marrom' | 'Cinza' | 'Caramelo' | 'Outro'; 
    // Cor do pet, restrita a valores pré-definidos para garantir consistência (opcional)
    sexo?: 'Macho' | 'Femea' | 'Outro'; 
    // Sexo do pet, restrito a valores pré-definidos (opcional)
}
