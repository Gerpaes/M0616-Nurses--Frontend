import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

type FieldKey = 'name' | 'email' | 'password' | 'confirmPassword';

interface Field {
  key: FieldKey;
  type: 'text' | 'email' | 'password';
  label: string;
  secret: boolean;
}

interface FormError {
  key: string;
  params?: Record<string, unknown>;
}

@Component({
  selector: 'app-register',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  readonly minPassword = 6;

  // @for: lista de campos del formulario
  readonly fields: Field[] = [
    { key: 'name', type: 'text', label: 'REGISTER.NAME', secret: false },
    { key: 'email', type: 'email', label: 'REGISTER.EMAIL', secret: false },
    { key: 'password', type: 'password', label: 'REGISTER.PASSWORD', secret: true },
    { key: 'confirmPassword', type: 'password', label: 'REGISTER.CONFIRM_PASSWORD', secret: true },
  ];

  values = signal<Record<FieldKey, string>>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  showPassword = signal(false);
  submitted = signal(false);
  errors = signal<FormError[]>([]);

  setValue(key: FieldKey, event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.values.update((v) => ({ ...v, [key]: value }));
  }

  // click que cambia un valor visible en la vista
  togglePassword() {
    this.showPassword.update((v) => !v);
  }

  // Mock: sin backend
  onSubmit() {
    const v = this.values();
    const errs: FormError[] = [];

    if (!v.name.trim()) errs.push({ key: 'REGISTER.ERR_NAME' });
    if (!v.email.includes('@')) errs.push({ key: 'REGISTER.ERR_EMAIL' });
    if (v.password.length < this.minPassword) {
      errs.push({ key: 'REGISTER.ERR_PASSWORD', params: { min: this.minPassword } });
    }
    if (v.password !== v.confirmPassword) errs.push({ key: 'REGISTER.ERR_CONFIRM' });

    this.errors.set(errs);
    this.submitted.set(errs.length === 0);
  }
}