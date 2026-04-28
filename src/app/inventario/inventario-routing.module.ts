import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovementForm } from './pages/movement-form/movement-form';
import { ProductForm } from './pages/product-form/product-form';
import { ProductList } from './pages/product-list/product-list';

const routes: Routes = [
  {
    path: '',
    component: ProductList
  },
  {
    path: 'nuevo',
    component: ProductForm
  },
  {
    path: 'movimientos/nuevo',
    component: MovementForm
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventarioRoutingModule {}
