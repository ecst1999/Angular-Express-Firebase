import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/interfaces/interfaces';
import { GameService } from 'src/app/services/game.service';

// ES6 Modules or TypeScript
import Swal from 'sweetalert2';


@Component({
  selector: 'app-goty',
  templateUrl: './goty.component.html',
  styleUrls: ['./goty.component.css']
})
export class GotyComponent implements OnInit {

  juegos: Game[] = [];

  constructor(private gameService: GameService) { }

  ngOnInit(): void {

    this.gameService.getNominados()
      .subscribe( (resp) =>{        
                
        this.juegos = resp;

      });


  }

  votarJuego(juego: Game){

    
    this.gameService.votarJuego(juego.id)
      .subscribe((resp: {ok: boolean, mensaje: string}) => {
        
        
        if(resp.ok){

          Swal.fire('Gracias', resp.mensaje, 'success');
        }else{
          Swal.fire('Ooops', resp.mensaje, 'error');
        }

      });

  }
  

}
