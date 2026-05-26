import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  MovimientoListadoDto,
  RegistrarMovimientoRequest,
  FiltroMovimientoDto
} from '../models/movement.model';
import { MOCK_MOVEMENTS } from './movement-mock.data';

@Injectable({
  providedIn: 'root'
})
export class MovementApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/movements`;
  private readonly mockMode = true;

  listar(filtros: FiltroMovimientoDto = {}): Observable<MovimientoListadoDto[]> {
    if (this.mockMode) {
      let filtered = [...MOCK_MOVEMENTS];
      if (filtros.tipo) filtered = filtered.filter(m => m.tipo === filtros.tipo);
      if (filtros.fechaDesde) filtered = filtered.filter(m => new Date(m.fecha) >= new Date(filtros.fechaDesde!));
      if (filtros.fechaHasta) filtered = filtered.filter(m => new Date(m.fecha) <= new Date(filtros.fechaHasta!));
      if (filtros.texto) {
        const t = filtros.texto.toLowerCase();
        filtered = filtered.filter(m =>
          m.sku.toLowerCase().includes(t) ||
          m.producto.toLowerCase().includes(t) ||
          m.documentoRef.toLowerCase().includes(t) ||
          m.usuario.toLowerCase().includes(t) ||
          m.nroLote.toLowerCase().includes(t)
        );
      }
      return of(filtered).pipe(delay(350));
    }
    return this.http.get<MovimientoListadoDto[]>(this.baseUrl, {
      params: this.construirParams(filtros)
    });
  }

  obtenerPorId(id: string): Observable<MovimientoListadoDto> {
    if (this.mockMode) {
      const found = MOCK_MOVEMENTS.find(m => m.idMovimiento === id);
      return of(found!).pipe(delay(200));
    }
    return this.http.get<MovimientoListadoDto>(`${this.baseUrl}/${id}`);
  }

  registrar(payload: RegistrarMovimientoRequest): Observable<MovimientoListadoDto> {
    if (this.mockMode) {
      const nuevo: MovimientoListadoDto = {
        idMovimiento: crypto.randomUUID(),
        tipo: payload.tipo,
        fecha: new Date().toISOString(),
        motivo: payload.motivo,
        documentoRef: payload.documentoRef ?? '',
        nroLote: payload.nroLote ?? `LOTE-${Date.now()}`,
        producto: 'Producto registrado',
        sku: '---',
        cantidadIngreso: payload.tipo === 'INGRESO' ? payload.cantidad : 0,
        cantidadSalida: payload.tipo === 'SALIDA' || payload.tipo === 'AJUSTE' ? payload.cantidad : 0,
        stockActual: 0,
        locacion: payload.idLocacion,
        usuario: 'Usuario Actual'
      };
      return of(nuevo).pipe(delay(400));
    }
    return this.http.post<MovimientoListadoDto>(this.baseUrl, payload);
  }

  anular(id: string): Observable<void> {
    if (this.mockMode) {
      return of(void 0).pipe(delay(300));
    }
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  private construirParams(filtros: FiltroMovimientoDto): HttpParams {
    let params = new HttpParams();
    if (filtros.tipo) params = params.set('tipo', filtros.tipo);
    if (filtros.fechaDesde) params = params.set('fechaDesde', filtros.fechaDesde);
    if (filtros.fechaHasta) params = params.set('fechaHasta', filtros.fechaHasta);
    if (filtros.idProducto) params = params.set('idProducto', filtros.idProducto);
    if (filtros.texto) params = params.set('texto', filtros.texto);
    if (filtros.pagina !== undefined) params = params.set('pagina', filtros.pagina);
    if (filtros.tamanioPagina !== undefined) params = params.set('tamanioPagina', filtros.tamanioPagina);
    return params;
  }
}
