import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
// import { AppChildModule } from './app/appchild.module';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

// let isChildUrl = location.href.includes(
//   'http://fmsservicesdev.ril.com/childui/'
// );
// let isChildUrl = location.href.includes('employees');
// console.log('childUrl', location.href);
// platformBrowserDynamic()
//   .bootstrapModule(
//     environment.production && !isChildUrl ? AppModule : AppChildModule
//   )
//   .catch((err) => console.error(err));
