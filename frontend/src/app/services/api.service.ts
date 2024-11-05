import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:3000'; // Cambia solo la URL base
  private socket: Socket;

  constructor(private http: HttpClient) { 
    this.socket = io(this.apiUrl); // Establece conexión Socket.IO a la URL base
  }
  
  getStatus(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/status`); // Agrega '/api' aquí
  }

  listenForMessages(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('chatMessage', (data) => {
        console.log('Mensaje recibido:', data); // Para depuración
        observer.next(data);
      });
    });
  }

  sendMessage(message: string): void {
    this.socket.emit('chatMessage', message);
  }
}
