import 'zone.js/node';
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';
import type { BootstrapContext } from '@angular/platform-browser';

export default function bootstrap(context: BootstrapContext) {
  return bootstrapApplication(App, appConfig, context);
}
