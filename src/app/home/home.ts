import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';


interface Tarjeta {
  id: string;
  titulo: string;      
  texto: string;       
  conSesion: boolean;  
  ruta: string;        
  icono: string;       
}

@Component({
  selector: 'app-home',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  tarjetas: Tarjeta[] = [
    {
      id: 'buscar',
      titulo: 'HOME.CARD_SEARCH_TITLE',
      texto: 'HOME.CARD_SEARCH_TEXT',
      conSesion: false,
      ruta: '/search',
      icono: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-4-4',
    },
    {
      id: 'turnos',
      titulo: 'HOME.CARD_SHIFTS_TITLE',
      texto: 'HOME.CARD_SHIFTS_TEXT',
      conSesion: true,
      ruta: '/login',
      icono: 'M3 8a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3zM3 10h18M8 3v4M16 3v4',
    },
    {
      id: 'fichas',
      titulo: 'HOME.CARD_PROFILES_TITLE',
      texto: 'HOME.CARD_PROFILES_TEXT',
      conSesion: true,
      ruta: '/login',
      icono: 'M4 20h4L19 9l-4-4L4 16z',
    },
  ];

  
  elegida: Tarjeta | null = null;

  elegir(tarjeta: Tarjeta) {
    
    this.elegida = this.elegida === tarjeta ? null : tarjeta;
  }
}