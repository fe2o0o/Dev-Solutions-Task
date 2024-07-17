import { Component, OnInit } from '@angular/core';
import { LoginFormComponent } from "../../components/login-form/login-form.component";
import { LoaderserviceService } from '../../services/loaderservice.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  constructor(private _LoaderserviceService:LoaderserviceService){}

  ngOnInit(): void {
      this._LoaderserviceService.hideLoading()
  }
}
