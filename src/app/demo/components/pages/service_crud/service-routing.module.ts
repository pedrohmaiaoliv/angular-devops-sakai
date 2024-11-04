import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ServicesComponent } from './service.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ServicesComponent }
	])],
	exports: [RouterModule]
})
export class ServicesRoutingModule { }
