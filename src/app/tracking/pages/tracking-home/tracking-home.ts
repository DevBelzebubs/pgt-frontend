import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
interface Rack {
  id: string;
  intensity: number;
  selected: boolean;
}

interface Aisle {
  name: string;
  racks: Rack[];
}
@Component({
  selector: 'app-tracking-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tracking-home.html'
})
export class TrackingHome {
  aisles = signal<Aisle[]>([
    {
      name: 'AISLE A',
      racks: [
        { id: 'A01', intensity: 10, selected: false },
        { id: 'A02', intensity: 45, selected: false },
        { id: 'A03', intensity: 95, selected: true }, // Punto Crítico
        { id: 'A04', intensity: 75, selected: false },
        { id: 'A05', intensity: 20, selected: false },
      ]
    },
    {
      name: 'AISLE B',
      racks: [
        { id: 'B01', intensity: 5, selected: false },
        { id: 'B02', intensity: 15, selected: false },
        { id: 'B03', intensity: 30, selected: false },
        { id: 'B04', intensity: 85, selected: false }, // Otro punto caliente
        { id: 'B05', intensity: 40, selected: false },
      ]
    },
    {
      name: 'AISLE C',
      racks: [
        { id: 'C01', intensity: 0, selected: false },
        { id: 'C02', intensity: 5, selected: false },
        { id: 'C03', intensity: 15, selected: false },
        { id: 'C04', intensity: 25, selected: false },
        { id: 'C05', intensity: 10, selected: false },
      ]
    }
  ]);

  selectedNode = signal({
    id: 'Rack A03',
    occupancy: 95,
    occupancyStatus: 'CRITICAL',
    dailyPicks: 342,
    picksStatus: 'PEAK',
    inventory: [
      { name: 'Actuator Valve X-90', qty: 45 },
      { name: 'Drive Belt Heavy', qty: 120 }
    ]
  });

  // 1. Escala Térmica para la caja física del estante
  getRackColorClass(intensity: number, isSelected: boolean): string {
    let baseClass = 'relative z-10 w-full h-full rounded-md flex items-center justify-center font-["Inter"] font-bold text-sm transition-all duration-300 cursor-pointer border backdrop-blur-sm ';
    
    if (isSelected) {
      baseClass += 'ring-2 ring-white dark:ring-[#E2BEBA] ring-offset-2 ring-offset-gray-100 dark:ring-offset-[#111111] scale-105 z-20 ';
    }

    if (intensity >= 80) return baseClass + 'bg-[#81000A]/90 border-[#81000A] text-white'; // Fuego / Granate
    if (intensity >= 60) return baseClass + 'bg-[#C53030]/80 border-[#C53030] text-white'; // Rojo intenso
    if (intensity >= 40) return baseClass + 'bg-[#DD6B20]/80 border-[#DD6B20] text-white'; // Naranja
    if (intensity >= 20) return baseClass + 'bg-[#D69E2E]/80 border-[#D69E2E] text-white'; // Amarillo/Ambar
    
    // Zona Fría (Gris oscuro/neutro)
    return baseClass + 'bg-gray-100/50 dark:bg-[#222222]/80 border-gray-300 dark:border-[#313131] text-[#4C616C] dark:text-[#8A9BA8]'; 
  }

  getGlowOpacity(intensity: number): number {
    if (intensity < 30) return 0;
    return intensity / 100;
  }

  selectRack(rackId: string) {
    console.log('Rack focalizado:', rackId);
  }
}
