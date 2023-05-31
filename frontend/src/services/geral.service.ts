import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Marcador } from 'src/app/interfaces/marcador.interface';
import { Local } from 'src/app/interfaces/local.interface';
import { Marker } from '@capacitor/google-maps';

@Injectable({
  providedIn: 'root'
})
export class GeralService {

    // Definindo o endpoint da API
    private apiUrl = 'https://my-json-server.typicode.com/uriasgadelha/vaipraondeback/local';

    constructor(private http: HttpClient) { }

    // Método que retorna um array de objetos do tipo Marcador
    public getMarcadores(): Promise<Marker[]> {
      // Fazendo uma requisição GET para o endpoint da API e convertendo a resposta em um array de objetos do tipo Local
      return this.http.get<Local[]>(this.apiUrl).toPromise().then((locais) => {
        // Criando um array vazio de objetos do tipo Marcador
        let marcadores: Marker[] = [];
        // Iterando sobre cada objeto do tipo Local no array de locais
        if (locais) {
          for (let local of locais) {
            let [latitude, longitude] = local.localizacao.split(',').map(Number);
            let nome = local.nome;
            let endereco = local.endereco;
            console.log(endereco);

            let marker: Marker;
            marker = {
              coordinate: {
                lat: latitude,
                lng: longitude
              },
              title: nome,
              snippet: endereco
            }

            console.log(marker.snippet);
            marcadores.push(marker);
          }
        }
        // Retornando o array de marcadores
        return marcadores;
      });
    }
}

