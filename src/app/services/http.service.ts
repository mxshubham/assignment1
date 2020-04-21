import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }

  doLoginProcess(user : object){
    return this.http.post('http://localhost:3000/users/login',user);
  }

  /**
   * 
   * @param userData Updated profile data.
   */
  updateprofile(userData) {
    return this.http.post(`http://localhost:3000/users/profile`, userData)
  }

  updatePassword(password, userId) {
    const header = new HttpHeaders({
      useragentId: `${userId}`,
      passToken: password
    });
    return this.http.post(`http://localhost:3000/users/password`, {}, { headers: header })
  }
  
  uploadAvatar(formData, userId) {
    const header = new HttpHeaders({
      useragentId: `${userId}`,
    });
    return this.http.post(`http://localhost:3000/users/avatar`, formData, { headers: header })
  }

}

