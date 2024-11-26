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

    constructor(private db: AngularFireDatabase) { }

    createTutor(tutor: Tutor): void {
        this.db.list<Tutor>(this.basePath).push(tutor);
    }

    getTutors(): Observable<Tutor[]> {
        return this.db.list<Tutor>(this.basePath).snapshotChanges().pipe(
            map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() } as Tutor)))
        );
    }

    getAllTutors(): Observable<Tutor[]> {
        return this.db.list<Tutor>(this.basePath).snapshotChanges().pipe(
            map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() } as Tutor)))
        );
    }

    getTutorId(key: string): Observable<Tutor> {
        return this.db.object<Tutor>(`${this.basePath}/${key}`).valueChanges();
    }

    updateTutor(key: string, value: any): Promise<void> {
        return this.db.object<Tutor>(`${this.basePath}/${key}`).update(value);
    }

    deleteTutor(key: string): Promise<void> {
        return this.db.object<Tutor>(`${this.basePath}/${key}`).remove();
    }
}