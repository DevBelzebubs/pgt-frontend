import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
interface Role {
  id: string;
  name: string;
  level: string;
  description: string;
  active: boolean;
}

interface AuditLog {
  id: number;
  timestamp: string;
  userInitials: string;
  userName: string;
  event: string;
  payload: string;
  eventType: 'critical' | 'warn' | 'info';
}
@Component({
  selector: 'app-admin-home',
  imports: [CommonModule],
  templateUrl: './admin-home.html',
  styleUrl: './admin-home.css',
})
export class AdminHome {
roles = signal<Role[]>([
    {
      id: 'admin',
      name: 'Administrator',
      level: 'L3',
      description: 'Full system access. Audit log visibility, user management, and configuration changes.',
      active: true
    },
    {
      id: 'wh_head',
      name: 'Warehouse Head',
      level: 'L2',
      description: 'Inventory adjustments, heat map analysis, and movement approvals.',
      active: false
    },
    {
      id: 'operator',
      name: 'Operator',
      level: 'L1',
      description: 'Picking, staging, and simple inventory queries.',
      active: false
    }
  ]);

  auditLogs = signal<AuditLog[]>([
    {
      id: 1,
      timestamp: '2026-04-28 14:32:01',
      userInitials: 'JD',
      userName: 'J. Doe',
      event: 'STOCK_OUT_WARN',
      payload: 'SKU-9942 Threshold reached (5 left)',
      eventType: 'critical'
    },
    {
      id: 2,
      timestamp: '2026-04-28 14:15:44',
      userInitials: 'SM',
      userName: 'S. Miller',
      event: 'AUTH_LOGIN',
      payload: 'IP: 192.168.1.104 Terminal B',
      eventType: 'info'
    },
    {
      id: 3,
      timestamp: '2026-04-28 13:50:12',
      userInitials: 'AK',
      userName: 'A. Khan (System)',
      event: 'ROUTE_UPDATE',
      payload: 'Pick Path Optimization Zone C to D',
      eventType: 'warn'
    },
    {
      id: 4,
      timestamp: '2026-04-28 11:22:05',
      userInitials: 'JD',
      userName: 'J. Doe',
      event: 'CONFIG_CHANGE',
      payload: 'Updated heat map thermal thresholds',
      eventType: 'info'
    }
  ]);

  // Cambiar el rol activo
  selectRole(roleId: string) {
    this.roles.update(currentRoles => 
      currentRoles.map(role => ({
        ...role,
        active: role.id === roleId
      }))
    );
  }

  // Estilos dinámicos para los badges de eventos
  getEventBadgeClass(type: string): string {
    switch(type) {
      case 'critical':
        return 'bg-[rgba(129,0,10,0.1)] dark:bg-[rgba(129,0,10,0.2)] text-[#81000A] dark:text-[#E2BEBA]';
      case 'warn':
        return 'bg-[#FEF3C7] dark:bg-[rgba(180,83,9,0.2)] text-[#B45309]';
      default:
        return 'bg-gray-100 dark:bg-[#222222] text-[#4C616C] dark:text-[#8A9BA8]';
    }
  }

  // Estilos dinámicos para los avatares
  getAvatarClass(type: string): string {
    if (type === 'critical') return 'bg-[#81000A] text-white';
    if (type === 'warn') return 'bg-[#B45309] text-white';
    return 'bg-gray-100 dark:bg-[#313131] text-[#111D23] dark:text-white';
  }
}
