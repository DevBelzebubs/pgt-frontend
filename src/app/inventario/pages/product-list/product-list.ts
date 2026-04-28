import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-product-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.html',
  styles: [`
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes zoomIn {
      from { opacity: 0; transform: scale(0.95) translateY(10px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }
    .animate-fade-in {
      animation: fadeIn 0.2s ease-out forwards;
    }
    .animate-zoom-in {
      animation: zoomIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
  `]
})
export class ProductList {
  isModalOpen = signal<boolean>(false);
  inventoryStats = signal({
    totalProducts: { value: 1458, trend: '+12 este mes', isPositive: true },
    lowStock: { value: 24, trend: '-3 vs ayer', isPositive: true },
    criticalStock: { value: 5, trend: 'Requiere atención', isPositive: false },
    totalCategories: { value: 18, trend: '2 nuevas', isPositive: true }
  });

  products = signal([
    { id: '1', sku: 'PX-1001', name: 'Controlador PLC Allen-Bradley', category: 'Automatización', price: 1250.00, stock: 45, status: 'ACTIVO' },
    { id: '2', sku: 'PX-1045', name: 'Sensor de Presión Industrial 0-100 bar', category: 'Sensores', price: 185.50, stock: 12, status: 'ACTIVO' },
    { id: '3', sku: 'PX-2099', name: 'Motor Servodrive 5HP', category: 'Motores', price: 890.00, stock: 89, status: 'ACTIVO' },
    { id: '4', sku: 'PX-3012', name: 'Módulo de E/S Analógico 8 Ch', category: 'Automatización', price: 340.00, stock: 4, status: 'ACTIVO' },
    { id: '5', sku: 'PX-4050', name: 'Válvula Solenoide 24VDC', category: 'Válvulas', price: 120.00, stock: 0, status: 'INACTIVO' },
    { id: '6', sku: 'PX-5100', name: 'Pantalla HMI Táctil 10"', category: 'Interfaces', price: 560.00, stock: 22, status: 'ACTIVO' }
  ]);

  getStockStatus(stock: number): { label: string, colorClass: string } {
    if (stock > 20) return { label: 'Óptimo', colorClass: 'text-[#34A853] bg-[#E6F4EA] dark:bg-[rgba(52,168,83,0.1)]' };
    if (stock > 5) return { label: 'Bajo', colorClass: 'text-[#F5A623] bg-[#FEF3C7] dark:bg-[rgba(245,166,35,0.1)]' };
    if (stock > 0) return { label: 'Crítico', colorClass: 'text-[#81000A] bg-[#FCE8E8] dark:bg-[rgba(129,0,10,0.15)] dark:text-[#E2BEBA]' };
    return { label: 'Agotado', colorClass: 'text-[#4C616C] bg-[#F3F4F6] dark:bg-[rgba(255,255,255,0.05)] dark:text-[#8A9BA8]' };
  }
  categorias = signal([
    { id: 1, nombre: 'Automatización' },
    { id: 2, nombre: 'Sensores y Transductores' },
    { id: 3, nombre: 'Motores y Servos' },
    { id: 4, nombre: 'Válvulas' }
  ]);

  marcas = signal([
    { id: 1, nombre: 'Allen-Bradley' },
    { id: 2, nombre: 'Siemens' },
    { id: 3, nombre: 'Festo' },
    { id: 4, nombre: 'Schneider Electric' }
  ]);

  openModal() {
    this.isModalOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.isModalOpen.set(false);
    document.body.style.overflow = 'auto';
  }
}
