import { bootstrap } from '@angular/platform-browser-dynamic';
import { AppComponent } from './containers/app.component';
import { provide } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { SearchActions } from './actions/search.actions';
import { Http, HTTP_PROVIDERS } from '@angular/http';
import { provideRouter } from '@angular/router';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { appRouterProviders } from './components/app.routes';

bootstrap(AppComponent, [
  appRouterProviders,
  HTTP_PROVIDERS,
  NgRedux,
  AUTH_PROVIDERS
  ]
);
