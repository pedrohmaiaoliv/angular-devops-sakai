import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TutorsComponent  } from './tutors.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: TutorsComponent  }
	])],
	exports: [RouterModule]
})
export class TutorsRoutingModule { }
