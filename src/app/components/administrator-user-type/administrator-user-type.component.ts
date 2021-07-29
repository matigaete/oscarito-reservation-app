import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserType } from 'src/app/Interface/user-type';
import { UserTypeService } from 'src/app/Services/user/user-type.service';

@Component({
  selector: 'app-administrator-user-type',
  templateUrl: './administrator-user-type.component.html',
  styleUrls: ['./administrator-user-type.component.css']
})
export class AdministratorUserTypeComponent implements OnInit {

  userTypes: UserType[] = [];
  clonedUserType: { [n: number]: UserType; } = {};
  addTypeDialog: boolean = false;
  newUserType: UserType = { idUserType: 0, description: ''};

  constructor(private userTypeService: UserTypeService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.userTypeService.getUserType()
    .subscribe((value: any) => {
      this.userTypes = value;
    })
  }

  onRowEditInit(userType: UserType) {
    this.clonedUserType[userType.idUserType] = {...userType};
  }

  onRowEditSave(userType: UserType, index: number) {
    if (userType.description !== undefined && userType.description.trim() !== '') {
      let persistUserType = this.clonedUserType[userType.idUserType];

      if(persistUserType.description.trim() === userType.description.trim()){
        this.messageService.add({severity:'warn', summary:'Alerta', detail:'Debe ingresar una descripción distinta a la anterior', life: 3000});
        delete this.clonedUserType[userType.idUserType];
        return;
      }

      this.confirmationService.confirm({
        message: '¿Está segur@ de modificar el tipo de usuario?',
        header: 'Confirmar',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.userTypeService.updateUserType(userType).subscribe();            
            this.messageService.add({severity:'success', summary:'Modificación', detail:'Cambio realizado con éxito', life: 3000});
        },
        reject: () => {
          this.userTypes[index] = persistUserType;
          this.messageService.add({severity:'info', summary:'Modificación', detail:'Cambio cancelado', life: 3000});
        }
      });
    }  
    else {
      this.userTypes[index] = this.clonedUserType[userType.idUserType];
      this.messageService.add({severity:'error', summary:'Error', detail:'Debe ingresar una descripción', life: 3000});
    }
    delete this.clonedUserType[userType.idUserType];
  }

  onRowEditCancel(userType: UserType, index: number) {
    this.userTypes[index] = this.clonedUserType[userType.idUserType];
    delete this.clonedUserType[userType.idUserType];
  }

  onClickAddNewType(){
    this.addTypeDialog = true;
    let maxRegistredId: number = Math.max.apply(Math, this.userTypes.map(function(o) { return o.idUserType; }))
    let nextId = maxRegistredId + 1;
    this.newUserType.idUserType = nextId;
  }

  onCancelAddType(){
    this.newUserType = { idUserType: 0, description: '' };
    this.addTypeDialog = false;
  }

  onSaveNewType(){
    let persistNewUserType = this.newUserType;
    this.confirmationService.confirm({
      message: `¿Seguro quieres añadir el tipo de usuario: ${persistNewUserType.description} ?`,
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.userTypeService.addUsertType(persistNewUserType).subscribe();
          this.userTypes.push(persistNewUserType);
          this.messageService.add({severity:'success', summary:'Guardado', detail:'Hemos registrado con éxito el nuevo tipo de usuario', life: 3000});
      }
    });
    this.onCancelAddType();
  }

}
