import { Routes } from '@angular/router';
import { LoginGuardService } from './core/services/loginGuard.service';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/services-root/services.module').then(
        (m) => m.ServicesModule
      ),
    // canActivate: [LoginGuardService],
  },
  {
    path: 'services',
    loadChildren: () =>
      import('./modules/services-root/services.module').then(
        (m) => m.ServicesModule
      ),
    //canActivate: [LoginGuardService],
  },
];
