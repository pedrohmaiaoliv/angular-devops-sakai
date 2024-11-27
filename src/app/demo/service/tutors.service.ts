import { Injectable } from '@angular/core'; // Decorador para criar um serviço Angular
import { AngularFireDatabase } from '@angular/fire/compat/database'; // Biblioteca para manipular o Firebase Realtime Database
import { Observable } from 'rxjs'; // Usado para lidar com dados assíncronos
import { map } from 'rxjs/operators'; // Operador para transformar os dados retornados
import { Tutor } from '../api/tutors.models'; // Modelo do Tutor para tipar os dados

@Injectable({
    providedIn: 'root' // Declara que este serviço estará disponível em toda a aplicação
})
export class TutorService {
    private basePath = 'tutors'; // Caminho base no Firebase onde os tutores são armazenados

    constructor(private db: AngularFireDatabase) { } // Injeta o serviço AngularFireDatabase

    // Método para criar um novo tutor
    createTutor(tutor: Tutor): void {
        this.db.list<Tutor>(this.basePath).push(tutor); 
        // Salva o tutor no Firebase com uma chave gerada automaticamente
    }

    // Método para obter todos os tutores com as chaves associadas
    getTutors(): Observable<Tutor[]> {
        return this.db.list<Tutor>(this.basePath).snapshotChanges().pipe(
            map(changes => 
                changes.map(c => ({ key: c.payload.key, ...c.payload.val() } as Tutor)) 
                // Inclui a chave gerada pelo Firebase nos objetos retornados
            )
        );
    }

    // Método alternativo para obter todos os tutores (igual ao anterior, mantido por convenção)
    getAllTutors(): Observable<Tutor[]> {
        return this.db.list<Tutor>(this.basePath).snapshotChanges().pipe(
            map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() } as Tutor)))
        );
    }

    // Método para obter os dados de um tutor específico pelo ID (chave do Firebase)
    getTutorId(key: string): Observable<Tutor> {
        return this.db.object<Tutor>(`${this.basePath}/${key}`).valueChanges(); 
        // Retorna um observable que reflete mudanças em tempo real no banco de dados
    }

    // Método para atualizar os dados de um tutor existente
    updateTutor(key: string, value: any): Promise<void> {
        return this.db.object<Tutor>(`${this.basePath}/${key}`).update(value); 
        // Atualiza os dados do tutor com a chave fornecida
    }

    // Método para excluir um tutor com base na chave fornecida
    deleteTutor(key: string): Promise<void> {
        return this.db.object<Tutor>(`${this.basePath}/${key}`).remove(); 
        // Remove o tutor do banco de dados
    }
}
