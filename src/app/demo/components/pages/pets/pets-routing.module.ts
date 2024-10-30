import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PetsComponent } from './pets.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: PetsComponent }
	])],
	exports: [RouterModule]
})
export class PetsRoutingModule { }
