import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'] // Cambia 'styleUrl' a 'styleUrls'
})

export class ChatComponent {

  currentUSer: string = ''
  messages: string[] = []; // Define el tipo de mensajes como string
  newMessage: string = ''; // Define el tipo de newMessage como string

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.listenForMessages().subscribe((message: string) => { // Define el tipo de message como string
      this.messages.push(message);
    });
  }

  sendMessage(): void {
    if (this.newMessage.trim()) { // Asegúrate de que el mensaje no esté vacío
      this.api.sendMessage(`${this.currentUSer} : ${this.newMessage}`);
      console.log(`Mensaje Enviado: ${this.newMessage}`);
      this.newMessage = ''; 
    } else {
      console.error('El mensaje no puede estar vacío'); // Manejo de errores
    }
  }

}
 