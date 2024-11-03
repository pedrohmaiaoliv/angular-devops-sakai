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
    dataNascimento?: Date | String;
    especie?: string;
    peso?: number;
    cor?: string;
    sexo?: 'Masculino' | 'Feminino' | 'Outro';
}

