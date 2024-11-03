import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pet } from '../api/pet.model';

@Injectable({
    providedIn: 'root'
})
export class PetService {
    private basePath = 'pets';

    constructor(private db: AngularFireDatabase) { }

    createPet(pet: Pet): void {
        const petToSave = { ...pet };
        // Converte dataNascimento para string no formato yyyy-MM-dd, se existir
        if (petToSave.dataNascimento instanceof Date) {
            petToSave.dataNascimento = petToSave.dataNascimento.toISOString().split('T')[0];
        }
        this.db.list<Pet>(this.basePath).push(petToSave);
    }

    getPets(): Observable<Pet[]> {
        return this.db.list<Pet>(this.basePath).snapshotChanges().pipe(
            map(changes => 
                changes.map(c => ({ key: c.payload.key, ...c.payload.val() } as Pet))
            )
        );
    }

    getPetId(key: string): Observable<Pet> {
        return this.db.object<Pet>(`${this.basePath}/${key}`).valueChanges();
    }

    updatePet(key: string, pet: Pet): Promise<void> {
        const petToUpdate = { ...pet };
        // Converte dataNascimento para string no formato yyyy-MM-dd, se existir
        if (petToUpdate.dataNascimento instanceof Date) {
            petToUpdate.dataNascimento = petToUpdate.dataNascimento.toISOString().split('T')[0];
        }
        return this.db.object<Pet>(`${this.basePath}/${key}`).update(petToUpdate);
    }

    deletePet(key: string): Promise<void> {
        return this.db.object<Pet>(`${this.basePath}/${key}`).remove();
    }
}
