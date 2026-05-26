import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductApiService } from '../../services/product-api.service';
import {
  CategoriaProductoDto,
  CrearProductoDto,
  MarcaProductoDto,
} from '../../models/product.model';
@Component({
  selector: 'app-product-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.html',
  styles: [
    `
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      @keyframes zoomIn {
        from {
          opacity: 0;
          transform: scale(0.95) translateY(10px);
        }
        to {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
      }
      .animate-fade-in {
        animation: fadeIn 0.2s ease-out forwards;
      }
      .animate-zoom-in {
        animation: zoomIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }
    `,
  ],
})
export class ProductList {
  isModalOpen = signal<boolean>(false);
  private readonly productApi = inject(ProductApiService);
  isExportModalOpen = signal<boolean>(false);
  inventoryStats = signal({
    totalProducts: { value: 1458, trend: '+12 este mes', isPositive: true },
    lowStock: { value: 24, trend: '-3 vs ayer', isPositive: true },
    criticalStock: { value: 5, trend: 'Requiere atención', isPositive: false },
    totalCategories: { value: 18, trend: '2 nuevas', isPositive: true },
  });
  products = signal([
    {
      id: '1',
      sku: 'PX-1001',
      name: 'Controlador PLC Allen-Bradley',
      category: 'Automatización',
      price: 1250.0,
      stock: 45,
      status: 'ACTIVO',
    },
    {
      id: '2',
      sku: 'PX-1045',
      name: 'Sensor de Presión Industrial 0-100 bar',
      category: 'Sensores',
      price: 185.5,
      stock: 12,
      status: 'ACTIVO',
    },
    {
      id: '3',
      sku: 'PX-2099',
      name: 'Motor Servodrive 5HP',
      category: 'Motores',
      price: 890.0,
      stock: 89,
      status: 'ACTIVO',
    },
    {
      id: '4',
      sku: 'PX-3012',
      name: 'Módulo de E/S Analógico 8 Ch',
      category: 'Automatización',
      price: 340.0,
      stock: 4,
      status: 'ACTIVO',
    },
    {
      id: '5',
      sku: 'PX-4050',
      name: 'Válvula Solenoide 24VDC',
      category: 'Válvulas',
      price: 120.0,
      stock: 0,
      status: 'INACTIVO',
    },
    {
      id: '6',
      sku: 'PX-5100',
      name: 'Pantalla HMI Táctil 10"',
      category: 'Interfaces',
      price: 560.0,
      stock: 22,
      status: 'ACTIVO',
    },
  ]);
  formProducto = signal({
    idCategoria: null as number | null,
    idMarca: null as number | null,
    sku: '',
    numeroParte: '',
    descripcion: '',
    modelosCompatiblesStr: '',
    precioCompra: null as number | null,
    precioVenta: null as number | null,
  });
  isSaving = signal(false);
  categorias = signal<CategoriaProductoDto[]>([]);
  marcas = signal<MarcaProductoDto[]>([]);
  getStockStatus(stock: number): { label: string; colorClass: string } {
    if (stock > 20)
      return {
        label: 'Óptimo',
        colorClass: 'text-[#34A853] bg-[#E6F4EA] dark:bg-[rgba(52,168,83,0.1)]',
      };
    if (stock > 5)
      return {
        label: 'Bajo',
        colorClass: 'text-[#F5A623] bg-[#FEF3C7] dark:bg-[rgba(245,166,35,0.1)]',
      };
    if (stock > 0)
      return {
        label: 'Crítico',
        colorClass: 'text-[#81000A] bg-[#FCE8E8] dark:bg-[rgba(129,0,10,0.15)] dark:text-[#E2BEBA]',
      };
    return {
      label: 'Agotado',
      colorClass:
        'text-[#4C616C] bg-[#F3F4F6] dark:bg-[rgba(255,255,255,0.05)] dark:text-[#8A9BA8]',
    };
  }
  ngOnInit(): void {
    this.cargarCatalogos();
  }
  private cargarCatalogos(): void {
    this.productApi.listarCategoriasActivas().subscribe({
      next: (data) => this.categorias.set(data),
      error: (err) => {
        console.error('Error cargando categorías:', err);
      },
    });
    this.productApi.listarMarcasActivas().subscribe({
      next: (data) => this.marcas.set(data),
      error: (err) => {
        console.error('Error cargando marcas:', err);
        this.marcas.set([
          { idMarca: 1, nombreMarca: 'Allen-Bradley', activo: true },
          { idMarca: 2, nombreMarca: 'Siemens', activo: true },
        ]);
      },
    });
  }

  guardarProducto(): void {
    const form = this.formProducto();
    if (
      !form.idCategoria ||
      !form.idMarca ||
      !form.sku ||
      !form.descripcion ||
      form.precioCompra === null ||
      form.precioVenta === null
    ) {
      alert(
        'Por favor completa los campos requeridos: Categoría, Marca, SKU, Descripción, Precios',
      );
      return;
    }
    if (form.precioCompra <= 0 || form.precioVenta <= 0) {
      alert('Los precios deben ser mayores a 0');
      return;
    }
    let modelosCompatibles: string[] = [];
    if (form.modelosCompatiblesStr && form.modelosCompatiblesStr.trim()) {
      modelosCompatibles = form.modelosCompatiblesStr
        .split(',')
        .map((m) => m.trim())
        .filter((m) => m.length > 0);
    }
    const payload: CrearProductoDto = {
      idCategoria: form.idCategoria,
      idMarca: form.idMarca,
      sku: form.sku.toUpperCase(),
      numeroParte: form.numeroParte || null,
      descripcion: form.descripcion,
      modelosCompatibles: modelosCompatibles,
      precioCompra: form.precioCompra,
      precioVenta: form.precioVenta,
    };
    this.isSaving.set(true);
    this.productApi.crear(payload).subscribe({
      next: (productoCreado) => {
        console.log('Producto creado:', productoCreado);
        alert('Producto guardado exitosamente!');
        this.limpiarFormulario();
        this.closeModal();
        // WebSocket se implementará luego
      },
      error: (err) => {
        console.error('Error guardando producto:', err);
        const msg = err.error?.message || err.error || 'Error al guardar. Verifica consola.';
        alert(`No se pudo guardar:\n${msg}`);
      },
      complete: () => {
        this.isSaving.set(false);
      },
    });
  }
  private limpiarFormulario(): void {
    this.formProducto.set({
      idCategoria: null,
      idMarca: null,
      sku: '',
      numeroParte: '',
      descripcion: '',
      modelosCompatiblesStr: '',
      precioCompra: null,
      precioVenta: null,
    });
  }
  openModal() {
    this.isModalOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.isModalOpen.set(false);
    document.body.style.overflow = 'auto';
  }
  openExportModal() {
    this.isExportModalOpen.set(true);
    document.body.style.overflow = 'hidden';
  }
  closeExportModal() {
    this.isExportModalOpen.set(false);
    document.body.style.overflow = 'auto';
  }
  exportar(formato: 'excel' | 'pdf') {
    this.closeExportModal();

    this.productApi.exportar(formato).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const fecha = new Date().toISOString().split('T')[0];
        const extension = formato === 'pdf' ? 'pdf' : 'xlsx';
        a.download = `inventario-productos-${fecha}.${extension}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error(`Error exportando ${formato.toUpperCase()}:`, err);
        alert('No se pudo exportar. Verifica que el backend esté corriendo.');
      },
    });
  }
  actualizarForm<K extends keyof ReturnType<typeof this.formProducto>>(
    campo: K,
    valor: ReturnType<typeof this.formProducto>[K],
  ): void {
    this.formProducto.update((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  }
}
