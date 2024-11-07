import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ServiceRequestComponent } from './serviceRequest.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ServiceRequestComponent }
    ])],
    exports: [RouterModule]
})
export class ServiceRequestRoutingModule { }
