import { Injectable } from '@angular/core'; // Decorador para criar um serviço Angular
import { AngularFireDatabase } from '@angular/fire/compat/database'; // Módulo para interagir com o Firebase Realtime Database
import { Observable } from 'rxjs'; // Utilizado para retornar dados como observáveis
import { map } from 'rxjs/operators'; // Operador para transformar os dados retornados
import { Pet } from '../api/pet.model'; // Modelo do pet usado para tipar os dados

@Injectable({
    providedIn: 'root' // Indica que este serviço será injetado na raiz do aplicativo
})
export class PetService {
    private basePath = 'pets'; // Caminho base no Firebase onde os dados de pets são armazenados

    constructor(private db: AngularFireDatabase) { } // Injeta o AngularFireDatabase para manipular o banco

    // Método para criar um novo pet
    createPet(pet: Pet): void {
        const petToSave = { ...pet }; // Clona o objeto do pet para evitar alterações indesejadas
        // Converte a data de nascimento para o formato yyyy-MM-dd, se for um objeto Date
        if (petToSave.dataNascimento instanceof Date) {
            petToSave.dataNascimento = petToSave.dataNascimento.toISOString().split('T')[0];
        }
        this.db.list<Pet>(this.basePath).push(petToSave); // Adiciona o pet ao Firebase
    }

    // Método para obter todos os pets com as chaves associadas
    getPets(): Observable<Pet[]> {
        return this.db.list<Pet>(this.basePath).snapshotChanges().pipe(
            map(changes => 
                changes.map(c => ({ key: c.payload.key, ...c.payload.val() } as Pet)) // Adiciona a chave do Firebase ao objeto
            )
        );
    }

    // Método alternativo para obter todos os pets (sem necessidade de diferença prática com getPets)
    getAllPets(): Observable<Pet[]> {
        return this.db.list<Pet>(this.basePath).snapshotChanges().pipe(
            map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() } as Pet)))
        );
    }

    // Método para obter um pet específico pelo ID (chave do Firebase)
    getPetId(key: string): Observable<Pet> {
        return this.db.object<Pet>(`${this.basePath}/${key}`).valueChanges(); 
        // Retorna um observable com os dados do pet associado à chave
    }

    // Método para atualizar os dados de um pet existente
    updatePet(key: string, pet: Pet): Promise<void> {
        const petToUpdate = { ...pet }; // Clona o objeto do pet para evitar alterações no original
        // Converte a data de nascimento para o formato yyyy-MM-dd, se for um objeto Date
        if (petToUpdate.dataNascimento instanceof Date) {
            petToUpdate.dataNascimento = petToUpdate.dataNascimento.toISOString().split('T')[0];
        }
        return this.db.object<Pet>(`${this.basePath}/${key}`).update(petToUpdate); // Atualiza os dados no Firebase
    }

    // Método para deletar um pet pelo ID (chave do Firebase)
    deletePet(key: string): Promise<void> {
        return this.db.object<Pet>(`${this.basePath}/${key}`).remove(); 
        // Remove o pet do banco de dados
    }
}
