import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
  }


  private users$:User[] = [
    {
      userName: "test",
      password: "testUser",
      role:"user"
    },
    {
      userName: "admin",
      password: "adminUser",
      role:"admin"
    }
  ]



  authentecation(form:User):any {
    const isFound = this.users$.filter((e) => e.userName === form.userName)
    if (isFound.length == 0) {
      return {status:"Error" , message:"User Name is Not Found"}
    }

    if (isFound[0].password !== form.password) {
      return {status:"Error" , message:"Wrong Password"}
    }

    if (isFound[0].userName === 'admin') {
      return {status:"Success" , role:"admin"}
    } else {
      return {status:"Success" , role:"user"}
    }

  }


}
