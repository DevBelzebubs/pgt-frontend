import { CommonModule } from '@angular/common';
import { Component, signal, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MovementApiService } from '../../services/movement-api.service';
import {
  MovimientoListadoDto,
  RegistrarMovimientoRequest,
  FiltroMovimientoDto,
  TipoMovimiento
} from '../../models/movement.model';

@Component({
  selector: 'app-movement-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './movement-list.html',
  styleUrl: './movement-list.css',
})
export class MovementList implements OnInit {
  private readonly movementApi = inject(MovementApiService);

  movements = signal<MovimientoListadoDto[]>([]);
  loading = signal(false);
  isModalOpen = signal<boolean>(false);

  filtroTexto = signal('');
  filtroTipo = signal<string>('');
  filtroFecha = signal('');

  formTipo = signal<TipoMovimiento>('INGRESO');
  formProducto = signal('');
  formCantidad = signal<number | null>(null);
  formDocumentoRef = signal('');
  formMotivo = signal('');

  ngOnInit(): void {
    this.cargarMovimientos();
  }

  cargarMovimientos(): void {
    this.loading.set(true);
    const filtros: FiltroMovimientoDto = {};
    if (this.filtroTipo()) filtros.tipo = this.filtroTipo() as TipoMovimiento;
    if (this.filtroFecha()) filtros.fechaDesde = this.filtroFecha();
    if (this.filtroTexto()) filtros.texto = this.filtroTexto();

    this.movementApi.listar(filtros).subscribe({
      next: (data) => {
        this.movements.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  openModal(): void {
    this.isModalOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.isModalOpen.set(false);
    document.body.style.overflow = 'auto';
    this.limpiarFormulario();
  }

  registrarMovimiento(): void {
    if (!this.formCantidad() || this.formCantidad()! <= 0) return;
    if (!this.formMotivo()) return;

    const payload: RegistrarMovimientoRequest = {
      tipo: this.formTipo(),
      idProducto: '',
      idLocacion: '',
      cantidad: this.formCantidad()!,
      motivo: this.formMotivo(),
      documentoRef: this.formDocumentoRef() || undefined
    };

    this.movementApi.registrar(payload).subscribe({
      next: () => {
        this.closeModal();
        this.cargarMovimientos();
      },
      error: () => {
      }
    });
  }

  setFormTipo(tipo: string): void {
    this.formTipo.set(tipo as any);
  }

  private limpiarFormulario(): void {
    this.formTipo.set('INGRESO');
    this.formProducto.set('');
    this.formCantidad.set(null);
    this.formDocumentoRef.set('');
    this.formMotivo.set('');
  }

  getMovementBadgeClass(type: string): string {
    switch(type) {
      case 'INGRESO':
        return 'bg-[rgba(129,0,10,0.08)] dark:bg-[rgba(226,190,186,0.15)] text-[#81000A] dark:text-[#E2BEBA]';
      case 'SALIDA':
        return 'border border-[#81000A] text-[#81000A] dark:border-[#E2BEBA] dark:text-[#E2BEBA]';
      case 'AJUSTE':
        return 'bg-gray-100 dark:bg-[#313131] text-[#4C616C] dark:text-[#8A9BA8]';
      default:
        return 'bg-gray-100 dark:bg-[#313131] text-[#4C616C] dark:text-[#8A9BA8]';
    }
  }

  getQuantityClass(type: string): string {
    if (type === 'INGRESO') return 'text-[#34A853]';
    if (type === 'SALIDA') return 'text-[#111D23] dark:text-white';
    return 'text-[#B45309]';
  }

  formatQuantity(mov: MovimientoListadoDto): string {
    if (mov.cantidadIngreso > 0) return `+${mov.cantidadIngreso}`;
    if (mov.cantidadSalida > 0) return `-${mov.cantidadSalida}`;
    return '0';
  }

  getQuantityValue(mov: MovimientoListadoDto): number {
    return mov.cantidadIngreso > 0 ? mov.cantidadIngreso : mov.cantidadSalida;
  }
}
