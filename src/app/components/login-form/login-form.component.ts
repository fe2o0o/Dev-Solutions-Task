import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [MatIconModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  constructor(private _AuthService: AuthService , private _Router:Router) { }
  globalMessage = signal('')
  hide: boolean = true
  loginForm: FormGroup = new FormGroup({
    userName: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required])
  })


  handleLogin(form: FormGroup) {
    if (form.invalid) {
      return this.globalMessage.set("All Data Is Required")
    }
    const result = this._AuthService.authentecation(form.value)
    if (result.status === 'Error') {
      return this.globalMessage.set(result.message)
    }

    if (result.status === 'Success') {
      localStorage.setItem('userRole' , result.role)
      result.role === 'admin' ? this._Router.navigate(['/admin']) : this._Router.navigate(['/user'])
    }

  }
}
