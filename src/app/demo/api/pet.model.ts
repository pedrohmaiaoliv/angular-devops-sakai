interface InventoryStatus{
    label: string;
    value: string;
}

export interface Pet {
    id?: string;
    code?: string;
    key?: string;
    nome?: string;
    idade?: number;
    dataNascimento?: Date | string;
    especie?: string;
    peso?: number;
    cor?: 'Branco' | 'Preto' | 'Marrom' | 'Cinza' | 'Caramelo' | 'Outro';
    sexo?: 'Macho' | 'Femea' | 'Outro';
}

