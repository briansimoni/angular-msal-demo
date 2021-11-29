import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http"; // Import
import { environment } from './../environments/environment';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

import { MsalModule, MsalRedirectComponent, MsalGuard, MsalInterceptor } from '@azure/msal-angular';

import { PublicClientApplication, InteractionType, BrowserCacheLocation } from "@azure/msal-browser";

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MsalModule.forRoot( new PublicClientApplication({
      auth: {
        // clientId: 'd4668d06-27c6-462f-9710-12637fc7eace',
        authority: 'https://login.microsoftonline.com/1aea6c8a-20a4-4995-a64b-f460c93fcab9',
        redirectUri: environment.redirectUri,
        clientId: '4deee88e-38f2-460a-ac3b-2e39c8b97be4',

      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: isIE, // Set to true for Internet Explorer 11
      }
    }), {
      interactionType: InteractionType.Redirect,
      authRequest: {
        scopes: ['openid', 'profile', 'email']
      }
    }, {
      interactionType: InteractionType.Redirect, // MSAL Interceptor Configuration
            protectedResourceMap: new Map([
                ['https://graph.microsoft.com/v1.0/me', ['user.read']],
                ['https://api.myapplication.com/users/*', ['customscope.read']],
                ['http://localhost:4200/*', ['user.read']],
                ['http://localhost:4200/profile', ['api://f044c4fc-d1b7-42b4-8e81-35b4f6d3bef7/access_as_user']],
                ['http://localhost:5000/weatherforecast', ['api://f044c4fc-d1b7-42b4-8e81-35b4f6d3bef7/access_as_user']]
            ])
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    MsalGuard
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
