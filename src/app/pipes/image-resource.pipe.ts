import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'imageResource'
})

export class ImageResourcePipe implements PipeTransform {

  private imagesName = [
    environment.imageFolder + "1_Tenis.png", 
    environment.imageFolder + "2_Futbol7.png",
    environment.imageFolder + "3_Futbol5.png",
    environment.imageFolder + "4_Futbol11.png",
    environment.imageFolder + "5_Voleyball.png",
    environment.imageFolder + "6_Basquetbol.png"
  ];

  transform(id? : number): string {
    if(id == undefined)
      return "";
    var image : string | undefined = this.imagesName.find((v,i) => i == id-1)?.toString();
    
    if(image == undefined)
      return "";
    return image;
  }

}
