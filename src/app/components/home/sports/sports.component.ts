import { Component, OnInit } from '@angular/core';
import { Field } from 'src/app/Interface/field';
import { FieldService } from 'src/app/Services/field.service';

@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.css']
})
export class SportsComponent implements OnInit {

  fields: Field[] = [];

  constructor(private fieldService: FieldService) { }

  ngOnInit(): void {
    this.getFields();
  }

  getFields(){
    this.fieldService.getFields()
                      .subscribe((value:any) => {
                        this.fields = value;
                      });
  }

}
