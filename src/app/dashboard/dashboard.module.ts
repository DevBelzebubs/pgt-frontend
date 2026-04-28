import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { MainDashboard } from './pages/main-dashboard/main-dashboard';

const routes: Routes = [
  {
    path: '', // La ruta base del módulo, es decir: /dashboard
    component: MainDashboard
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardModule {}
