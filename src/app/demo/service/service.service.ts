import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Service } from '../api/service.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private basePath = '/services';

  constructor(private db: AngularFireDatabase) {}

  // Criar serviço
  createService(service: Service) {
    return this.db.list<Service>(this.basePath).push(service);
  }

  // Obter todos os serviços com a chave incluída
  getServices(): Observable<Service[]> {
    return this.db.list<Service>(this.basePath).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() as Service }))
      )
    );
  }

  // Atualizar serviço
  updateService(key: string, service: Service) {
    return this.db.object<Service>(`${this.basePath}/${key}`).update(service);
  }

  // Deletar serviço
  deleteService(key: string) {
    return this.db.object<Service>(`${this.basePath}/${key}`).remove();
  }
}
