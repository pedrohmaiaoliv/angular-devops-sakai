// src/app/service/location.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private estadosUrl = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';
  private municipiosUrl = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';

  constructor(private http: HttpClient) {}

  // Obter todos os Estados
  getEstados(): Observable<any[]> {
    return this.http.get<any[]>(this.estadosUrl);
  }

  // Obter Municípios pelo código do Estado
  getMunicipios(estadoId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.municipiosUrl}/${estadoId}/municipios`);
  }

  // Obter dados do endereço pelo CEP
  getEnderecoByCep(cep: string): Observable<any> {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    return this.http.get<any>(url);
  }
}
