import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  profileData: FormGroup;
  @Input() userData: any;
  @Output() profileUpdated = new EventEmitter();
  constructor(private fb: FormBuilder, private httpService: HttpService) {
    this.initializeFormController();
   }

   initializeFormController() {
    this.profileData = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.minLength(5)]),
      mobile: this.fb.control('', [Validators.required, Validators.minLength(10)]),
      city: this.fb.control('', [Validators.required]),
      dob: this.fb.control('', [Validators.required]),
      age: this.fb.control('', [Validators.required])
    });
  }

  ngOnInit(): void {
    console.log('edit profile');
    console.log(this.userData);
    this.profileData.controls.name.setValue(this.userData.data.name);
    this.profileData.controls.email.setValue(this.userData.data.email);
    this.profileData.controls.mobile.setValue(this.userData.data.mobile);
    this.profileData.controls.city.setValue(this.userData.data.city);
    // const dob = new DatePipe('en-US').transform(this.userData.dob, 'yyyy-MM-dd')
    this.profileData.controls.dob.setValue(this.userData.data.dob);
    this.profileData.controls.age.setValue(this.userData.data.age);
  }

  updateProfile() {
    this.profileData.value.user_id = this.userData.data.Id;
    this.httpService.updateprofile(this.profileData.value).subscribe((response: any) => {
      if (response.code === 200) {
        console.log('___>>>>>');
        console.log(this.profileData.value);
        this.userData.data.email = this.profileData.value.email;
        this.userData.data.name = this.profileData.value.name;
        this.userData.data.mobile = this.profileData.value.mobile;
        this.userData.data.city = this.profileData.value.city;
        this.userData.data.dob = this.profileData.value.dob;
        this.userData.data.age = this.profileData.value.age;
        window.localStorage.setItem("userData", JSON.stringify(this.userData));
        this.profileUpdated.emit(this.userData);
      }
    }, (err) => {
      console.log('Error', err);
    });
  }
  
}
