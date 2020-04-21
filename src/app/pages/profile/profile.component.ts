import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public userProfile;
  public showProfile = false;
  public showPasswordComponent = false;
  showUploadButton = false;
  constructor(private http: HttpService, private routing: Router) { 
    if (!localStorage.getItem('userData')) {
      this.routing.navigate(['login']);
    }
  }

  ngOnInit(): void {
    const storageData = window.localStorage.getItem('userData');
    this.userProfile = (storageData && storageData.length > 10) ? JSON.parse(storageData) : false;
  }

  logoutUser() {
    window.localStorage.clear();
    this.routing.navigateByUrl('/login');
  }

  showComponent(component) {
    if (component === 'editProfile') {
      this.showPasswordComponent = false;
      this.showProfile = true;
    } else {
      this.showProfile = false;
      this.showPasswordComponent = true;
    }
  }

  profileUpdateHandler(updateData) {
    this.userProfile = updateData;
    console.log('.....');
    console.log(this.userProfile);
  }

  onFileChange(evt:any) {
    console.log('-file--',evt.target.files);
    if (evt.target.files.length > 0) {
      const formData = new FormData();
      formData.append('avatar', evt.target.files[0])
      this.http.uploadAvatar(formData, this.userProfile.data.Id).subscribe((response: any) => {
        if (response.code) {
          this.userProfile.data.profileURL = response.data.profileURL;
          window.localStorage.setItem("userData", JSON.stringify(this.userProfile));
        }
      }, (err) => {
        console.log("Error", err);
      });
    }
  }

}
