import { Routes } from '@angular/router';
import { BookingsComponent } from './bookings/bookings.component';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { authGuard } from './auth/auth.guard';
import { CreateBookingComponent } from './create-booking/create-booking.component';

export const routes: Routes = [
    { path: "login", component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: "", component: BookingsComponent, canActivate: [authGuard] },
    { path: 'booking-details/:id', component: BookingDetailsComponent},
    { path: 'create-booking', component: CreateBookingComponent, canActivate: [authGuard] }
];
