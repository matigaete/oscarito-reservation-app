import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Field } from 'src/app/Interface/field';
import { FieldService } from 'src/app/Services/field.service';

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.css']
})
export class AddReservationComponent implements OnInit {

  public fields$: Observable<Field[]>;
  public display: boolean;
  public date: Date;

  

  constructor(private fieldService: FieldService) {
    this.fields$ = this.fieldService.getFields();
    this.fields$.forEach(f => console.log(f));
    this.display = false;
    this.date = new Date();
  }

  ngOnInit(): void {

  }


  showDialog(param:Field) {
    console.log(param);
    this.display = true;
  }

}
