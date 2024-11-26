import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tutor } from '../api/tutors.models';

@Injectable({
    providedIn: 'root'
})
export class TutorService {
    private basePath = 'tutors';

    constructor(private db: AngularFireDatabase) {}

    // Cria um tutor e retorna uma Promise
    createTutor(tutor: Tutor): Promise<void> {
        const tutorRef = this.db.list<Tutor>(this.basePath).push(tutor);
        return tutorRef.then(() => {}); // Retorna uma Promise explicitamente
    }

    // Obtém todos os tutores
    getTutors(): Observable<Tutor[]> {
        return this.db.list<Tutor>(this.basePath).snapshotChanges().pipe(
            map((changes) =>
                changes.map((c) => ({ key: c.payload.key, ...c.payload.val() } as Tutor))
            )
        );
    }

    // Obtém um tutor pelo ID
    getTutorId(key: string): Observable<Tutor> {
        return this.db.object<Tutor>(`${this.basePath}/${key}`).valueChanges();
    }

    // Atualiza um tutor pelo ID e retorna uma Promise
    updateTutor(key: string, value: any): Promise<void> {
        return this.db.object<Tutor>(`${this.basePath}/${key}`).update(value);
    }

    // Deleta um tutor pelo ID e retorna uma Promise
    deleteTutor(key: string): Promise<void> {
        return this.db.object<Tutor>(`${this.basePath}/${key}`).remove();
    }
}
