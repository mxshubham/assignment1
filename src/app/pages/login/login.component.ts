import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  constructor(private fb: FormBuilder, private httpService: HttpService,private router: Router) {
    if (localStorage.getItem('userData')) {
      this.router.navigate(['profile']);
    }
    this.initializeController();
  }

  initializeController() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required, Validators.minLength(3)])
    });
  }

  ngOnInit(): void {
  }

  userData: any
  loginUser() {
    this.httpService.doLoginProcess(this.loginForm.value).subscribe((response:any) => {
      console.log("Response", response);
      this.userData = response;
      if(response.code=='200'){
        this.router.navigate(['/profile']);
        // Create item:
        localStorage.setItem('userData', JSON.stringify(response));
      }else{
        this.userData = response;
      }
        
    }, (error) => {
      console.log("Error", error);
    });
  }
}
