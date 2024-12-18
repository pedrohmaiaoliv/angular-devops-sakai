import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'crud', loadChildren: () => import('./crud/crud.module').then(m => m.CrudModule) },
        { path: 'tutors', loadChildren: () => import('./tutors/tutors.module').then(m => m.TutorsModule) },
        { path: 'service_crud', loadChildren: () => import('./service_crud/service.module').then(m => m.ServicesModule) },
        { path: 'serviceRequest', loadChildren: () => import('./serviceRequest/serviceRequest.module').then(m => m.ServiceRequestModule) },
        { path: 'empty', loadChildren: () => import('./empty/emptydemo.module').then(m => m.EmptyDemoModule) },
        { path: 'timeline', loadChildren: () => import('./timeline/timelinedemo.module').then(m => m.TimelineDemoModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
