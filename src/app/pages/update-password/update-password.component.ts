import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder,FormGroup,Validators }from '@angular/forms';
import { HttpService } from '../../services/http.service';
@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  passwordData: FormGroup;
  @Input() usedId: number;
  constructor(private fb:FormBuilder,private httpService: HttpService) { 
    this.initializeFormController();
  }

  initializeFormController(){
    this.passwordData = this.fb.group({
      oldPassword : this.fb.control('',[Validators.required,Validators.minLength(3)]),
      newPassword : this.fb.control('',[Validators.required,Validators.minLength(3)]),
      confirmNewPassword : this.fb.control('',[Validators.required,Validators.minLength(3)])
    });
  }

  ngOnInit(): void {
  }

  updatePassword() {
    console.log('--->>>');
    console.log(this.usedId);
    this.httpService.updatePassword(this.passwordData.value.newPassword, this.usedId).subscribe((response: any) => {
      if(response.code===200){
        this.passwordData.reset();
      }
    }, (err) => {
      console.log(err);
    })
  }

}
