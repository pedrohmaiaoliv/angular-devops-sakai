import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServiceRequest } from '../api/serviceRequest.model';

@Injectable({
    providedIn: 'root'
})
export class ServiceRequestService {
    private basePath = 'serviceRequests';

    constructor(private db: AngularFireDatabase) { }

    createServiceRequest(serviceRequest: ServiceRequest): void {
        const requestToSave = { ...serviceRequest };
        if (requestToSave.date instanceof Date) {
            requestToSave.date = requestToSave.date.toISOString().split('T')[0];
        }
        this.db.list<ServiceRequest>(this.basePath).push(requestToSave);
    }

    getServiceRequests(): Observable<ServiceRequest[]> {
        return this.db.list<ServiceRequest>(this.basePath).snapshotChanges().pipe(
            map(changes => 
                changes.map(c => ({ key: c.payload.key, ...c.payload.val() } as ServiceRequest))
            )
        );
    }

    getServiceRequestId(key: string): Observable<ServiceRequest> {
        return this.db.object<ServiceRequest>(`${this.basePath}/${key}`).valueChanges();
    }

    updateServiceRequest(key: string, serviceRequest: ServiceRequest): Promise<void> {
        const requestToUpdate = { ...serviceRequest };
        if (requestToUpdate.date instanceof Date) {
            requestToUpdate.date = requestToUpdate.date.toISOString().split('T')[0];
        }
        return this.db.object<ServiceRequest>(`${this.basePath}/${key}`).update(requestToUpdate);
    }

    deleteServiceRequest(key: string): Promise<void> {
        return this.db.object<ServiceRequest>(`${this.basePath}/${key}`).remove();
    }

    // New methods to fetch pets, tutors, and services
    getPets(): Observable<any[]> {
        return this.db.list('pets').snapshotChanges().pipe(
            map(changes => 
                changes.map(c => ({ key: c.payload.key, ...(c.payload.val() as object) }))
            )
        );
    }

    getTutors(): Observable<any[]> {
        return this.db.list('tutors').snapshotChanges().pipe(
            map(changes => 
                changes.map(c => ({ key: c.payload.key, ...(c.payload.val() as object) }))
            )
        );
    }

    getServices(): Observable<any[]> {
        return this.db.list('services').snapshotChanges().pipe(
            map(changes => 
                changes.map(c => {
                    const val = c.payload.val();
                    return { key: c.payload.key, ...(typeof val === 'object' && val !== null ? val : {}) };
                })
            )
        );
    }
}