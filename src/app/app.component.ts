import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./pages/login/login.component";
import { LoaderComponent } from "./components/loader/loader.component";
import { LoaderserviceService } from './services/loaderservice.service';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe,RouterOutlet, LoginComponent, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(public _LoaderserviceService:LoaderserviceService){}

  title = 'basic_E-commerce';
}

