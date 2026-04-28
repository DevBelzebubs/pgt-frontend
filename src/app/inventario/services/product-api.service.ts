import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  ActualizarProductoDto,
  CambiarEstadoProductoDto,
  CategoriaProductoDto,
  CrearProductoDto,
  DetalleProductoDto,
  FiltroCatalogoProductosDto,
  MarcaProductoDto,
  RespuestaPaginadaProductosDto
} from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/inventory/productos`;
  private readonly categoriasUrl = `${environment.apiUrl}/inventory/categorias`;
  private readonly marcasUrl = `${environment.apiUrl}/inventory/marcas`;

  listarCatalogo(
    filtros: FiltroCatalogoProductosDto = {}
  ): Observable<RespuestaPaginadaProductosDto> {
    return this.http.get<RespuestaPaginadaProductosDto>(this.baseUrl, {
      params: this.construirParams(filtros)
    });
  }

  obtenerPorId(idProducto: string): Observable<DetalleProductoDto> {
    return this.http.get<DetalleProductoDto>(`${this.baseUrl}/${idProducto}`);
  }

  crear(payload: CrearProductoDto): Observable<DetalleProductoDto> {
    return this.http.post<DetalleProductoDto>(this.baseUrl, payload);
  }

  actualizar(idProducto: string, payload: ActualizarProductoDto): Observable<DetalleProductoDto> {
    return this.http.put<DetalleProductoDto>(`${this.baseUrl}/${idProducto}`, payload);
  }

  cambiarEstado(
    idProducto: string,
    payload: CambiarEstadoProductoDto
  ): Observable<DetalleProductoDto> {
    return this.http.patch<DetalleProductoDto>(`${this.baseUrl}/${idProducto}/estado`, payload);
  }

  listarCategoriasActivas(): Observable<CategoriaProductoDto[]> {
    return this.http.get<CategoriaProductoDto[]>(`${this.categoriasUrl}/activas`);
  }

  listarMarcasActivas(): Observable<MarcaProductoDto[]> {
    return this.http.get<MarcaProductoDto[]>(`${this.marcasUrl}/activas`);
  }

  private construirParams(filtros: FiltroCatalogoProductosDto): HttpParams {
    let params = new HttpParams();

    if (filtros.texto) {
      params = params.set('texto', filtros.texto);
    }

    if (filtros.idCategoria !== undefined) {
      params = params.set('idCategoria', filtros.idCategoria);
    }

    if (filtros.idMarca !== undefined) {
      params = params.set('idMarca', filtros.idMarca);
    }

    if (filtros.estado !== undefined) {
      params = params.set('estado', filtros.estado);
    }

    if (filtros.pagina !== undefined) {
      params = params.set('pagina', filtros.pagina);
    }

    if (filtros.tamanioPagina !== undefined) {
      params = params.set('tamanioPagina', filtros.tamanioPagina);
    }

    return params;
  }
}
