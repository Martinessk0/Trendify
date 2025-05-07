import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidatorFn,
  FormControl,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../services/auth-service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

export function matchPasswords(
  password: string,
  confirmPassword: string
): ValidatorFn {
  return (formGroup: AbstractControl) => {
    const pass = formGroup.get(password);
    const confirmPass = formGroup.get(confirmPassword);

    if (pass && confirmPass && pass.value !== confirmPass.value) {
      confirmPass.setErrors({ passwordMismatch: true });
    } else {
      confirmPass?.setErrors(null);
    }
    return null;
  };
}

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public authSerice: AuthService,
    public router: Router
  ) {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      email: new FormControl('', [Validators.email, Validators.required]),
      passwords: new FormGroup(
        {
          password: new FormControl('', [
            Validators.minLength(6),
            Validators.required,
          ]),
          confirmPassword: new FormControl('', [
            Validators.minLength(6),
            Validators.required,
          ]),
        },
        {
          validators: [matchPasswords('password', 'confirmPassword')],
        }
      ),
    });
  }

  // onRegister() {
  //   if (this.form.invalid) {
  //     Swal.fire('Oops...', 'Invalid form', 'error');
  //   } else {
  //     this.authSerice
  //       .register({
  //         fullName: this.form.value.fullName,
  //         email: this.form.value.email,
  //         password: this.form.value.passwords.password,
  //       })
  //       .subscribe({
  //         next: (res) => {
  //           this.router.navigate(['/login']);
  //         },
  //         error: (error) => {
  //           Swal.fire(
  //             'Oops...',
  //             'The following error occurred: ' + error.message,
  //             'error'
  //           );
  //           console.log(error);
  //         }
  //       });
  //   }
  // }

  onRegister() {
    if (this.form.invalid) {
      Swal.fire('Oops...', 'Invalid form', 'error');
      return;
    }
  
    const { fullName, email, passwords } = this.form.value;
  
    this.authSerice
      .register({
        fullName,
        email,
        password: passwords.password,
      })
      .subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (error) => {
          let errorMessage = 'An error occurred.';
  
          if (Array.isArray(error.error)) {
            errorMessage = error.error
              .map((err: any) => err.description || err.message || JSON.stringify(err))
              .join('<br>');
          } else if (error.error?.description) {
            errorMessage = error.error.description;
          } else if (error.message) {
            errorMessage = error.message;
          }
  
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            html: errorMessage,
          });
  
          console.error(error);
        },
      });
  }
  

  get fullNameIsInvalid() {
    return (
      this.form.controls['fullName'].touched &&
      this.form.controls['fullName'].invalid &&
      this.form.controls['fullName'].dirty
    );
  }

  get emailIsInvalid() {
    return (
      this.form.controls['email'].touched &&
      this.form.controls['email'].invalid &&
      this.form.controls['email'].dirty
    );
  }

  get passwordIsInvalid() {
    return (
      this.form.controls['passwords'].touched &&
      this.form.controls['passwords'].invalid &&
      this.form.controls['passwords'].dirty
    );
  }
}
