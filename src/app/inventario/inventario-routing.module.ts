import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductList } from './pages/product-list/product-list';
import { MovementList } from './pages/movement-list/movement-list';

const routes: Routes = [
  {
    path: '',
    component: ProductList,
    data: { breadcrumb: 'Inventario General' }
  },
  {
    path: 'movimientos',
    component: MovementList,
    data: { breadcrumb: 'Trazabilidad' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventarioRoutingModule {}
