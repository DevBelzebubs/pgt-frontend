import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
interface Movement {
  id: string;
  type: 'ENTRADA' | 'SALIDA' | 'AJUSTE';
  sku: string;
  productName: string;
  quantity: number;
  date: string;
  user: string;
  referenceDoc: string;
  reason: string;
}
@Component({
  selector: 'app-movement-list',
  imports: [CommonModule],
  templateUrl: './movement-list.html',
  styleUrl: './movement-list.css',
})
export class MovementList {
isModalOpen = signal<boolean>(false);
  
  movements = signal<Movement[]>([
    {
      id: 'MOV-8901',
      type: 'ENTRADA',
      sku: 'MOT-001-BL',
      productName: 'High Efficiency AC Motor 3 Phase',
      quantity: 50,
      date: '2026-04-28 08:30 AM',
      user: 'Juan Perez',
      referenceDoc: 'FAC-001-4928',
      reason: 'Compra a proveedor local'
    },
    {
      id: 'MOV-8902',
      type: 'SALIDA',
      sku: 'SEN-PXL-24',
      productName: 'Photoelectric Distance Sensor 24V',
      quantity: 5,
      date: '2026-04-28 09:15 AM',
      user: 'Diego Florian',
      referenceDoc: 'BOL-002-1192',
      reason: 'Venta minorista mostrador'
    },
    {
      id: 'MOV-8903',
      type: 'AJUSTE',
      sku: 'BRG-6204-2RS',
      productName: 'Deep Groove Ball Bearing Sealed',
      quantity: -2,
      date: '2026-04-27 16:45 PM',
      user: 'Erick Flores',
      referenceDoc: 'MEM-001',
      reason: 'Merma por producto dañado en almacén'
    },
    {
      id: 'MOV-8904',
      type: 'SALIDA',
      sku: 'MOT-001-BL',
      productName: 'High Efficiency AC Motor 3 Phase',
      quantity: 12,
      date: '2026-04-27 11:20 AM',
      user: 'Geral Casas',
      referenceDoc: 'GUI-001-8832',
      reason: 'Despacho orden mayorista'
    }
  ]);

  openModal() {
    this.isModalOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.isModalOpen.set(false);
    document.body.style.overflow = 'auto';
  }

  getMovementBadgeClass(type: string): string {
    switch(type) {
      case 'ENTRADA':
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
    if (type === 'ENTRADA') return 'text-[#34A853]';
    if (type === 'SALIDA') return 'text-[#111D23] dark:text-white';
    return 'text-[#B45309]'; // Ajuste
  }

  formatQuantity(qty: number, type: string): string {
    if (type === 'ENTRADA') return `+${qty}`;
    if (type === 'SALIDA') return `-${Math.abs(qty)}`;
    return qty > 0 ? `+${qty}` : `${qty}`;
  }
}
