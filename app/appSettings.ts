import { isDevMode } from '@angular/core';

export class AppSettings {
    public static URL = false ? 'http://localhost:3000/' : 'http://monty-musicbase.herokuapp.com/';
}