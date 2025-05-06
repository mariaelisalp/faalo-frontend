import { ApplicationConfig,  importProvidersFrom,  provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {JwtModule} from "@auth0/angular-jwt";
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { TokenInterceptor } from './core/auth/interceptors/token/token.interceptor';
import { errorInterceptor } from './core/auth/interceptors/error/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideHttpClient(withInterceptors([errorInterceptor]),  withInterceptorsFromDi()), 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    importProvidersFrom([
      JwtModule.forRoot({
        config: {
          tokenGetter: () => localStorage.getItem('token')
        }
      })
    ])
  ]
};
