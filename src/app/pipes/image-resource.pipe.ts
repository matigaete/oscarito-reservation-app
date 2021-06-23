import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'imageResource'
})

export class ImageResourcePipe implements PipeTransform {

  private imagesName = [
    environment.imageFolder + "1.jpg", 
    environment.imageFolder + "2.jpg",
    environment.imageFolder + "3.jpg"
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
