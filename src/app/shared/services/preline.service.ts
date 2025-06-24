import { Injectable } from '@angular/core';

declare const HSStaticMethods: any; 

@Injectable({
  providedIn: 'root'
})
export class PrelineService {
  initialize() {
    try {
      HSStaticMethods.autoInit(); 
    } catch (error) {
      console.error('Erro ao inicializar Preline:', error);
    }
  }

  initializeFileUpload() {
  
  }
}