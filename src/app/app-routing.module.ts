import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app/components/login/login.component'
import { CityComponent } from '../app/components/city/city.component'
import { HquarterComponent } from '../app/components/hquarter/hquarter.component'
import { UserComponent } from '../app/components/user/user.component'
import { CanActivateViaAuthGuard } from '../utils/can-activate-via-auth-guard'

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UserComponent },
  { path: 'city', component: CityComponent, canActivate: [CanActivateViaAuthGuard] },
  { path: 'hquarter', component: HquarterComponent, canActivate: [CanActivateViaAuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
