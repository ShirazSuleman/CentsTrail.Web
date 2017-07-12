import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
  public config: any = {
    baseUrl: 'https://centstrailapi.azurewebsites.net'
  }

  constructor() {}

  /* Allows you to update any of the values dynamically */
  set(key: string, value: any): void {
    this.config[key] = value;
  }

  /* Returns the entire config object or just one value if key is provided */
  get(key: string): any {
    return key ? this.config[key] : this.config;
  }
}