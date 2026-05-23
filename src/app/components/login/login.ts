import { Component, ChangeDetectorRef, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent implements OnInit { 
  isLoginForm: boolean = true;
  
  // URL-ul primit de la backend pentru producție
  private apiUrl = 'https://sportconnect-be.onrender.com/api/auth';

  // Obiectele mapate pe formularele din HTML
  loginData = {
    email: '',
    password: ''
  };

  registerData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: ''
  };

  constructor(
    private http: HttpClient, 
    private cdr: ChangeDetectorRef 
  ) {}

  // Această funcție rulează automat când se deschide pagina
  ngOnInit() {
    this.actualizeazaFundalul();
  }

  toggleForm() {
    this.isLoginForm = !this.isLoginForm;
    this.actualizeazaFundalul(); // Schimbăm fundalul când se rotește mingea
  }

  // Funcție separată care se ocupă de logica fundalului dinamic
  private actualizeazaFundalul() {
    if (this.isLoginForm) {
      // Când este pe LOGIN (mingea de baschet) -> punem terenul de baschet
      document.body.style.backgroundImage = "url('/fundal_fotbal.jpg')";
    } else {
      // Când este pe REGISTER (mingea de fotbal) -> punem terenul de fotbal
      document.body.style.backgroundImage = "url('/fundal_bascket.png')";
    }
    // Ne asigurăm că proprietățile de cover sunt păstandențiale
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
  }

  // Funcția de Login conectată la API-ul de pe Render
 onLogin() {
    console.log('Se trimit datele de login...', this.loginData);
    
    // 1. Salvezi datele pe ascuns ca să le trimiți la API
    const dateDeTrimis = { ...this.loginData };
    
    // 2. GOLEȘTI CASETELE INSTANT (Dispare textul de pe ecran la secundă)
    this.loginData.email = '';
    this.loginData.password = '';
    this.cdr.detectChanges();
    
    // 3. Trimitem copia salvată către Render
    this.http.post(`${this.apiUrl}/login`, dateDeTrimis).subscribe({
      next: (response: any) => {
        console.log('Login reușit!', response);
        if (response && response.token) {
          localStorage.setItem('token', response.token);
        }
        alert('Te-ai autentificat cu succes!');
      },
      error: (err) => {
        console.error('Eroare la login:', err);
        alert('Autentificare eșuată! Verifică datele introduse.');
      }
    });
  }

  // Funcția de Register conectată la API-ul de pe Render
  onRegister() {
    console.log('Se trimit datele de înregistrare...', this.registerData);
    
    this.http.post(`${this.apiUrl}/register`, this.registerData, { responseType: 'text' }).subscribe({
      next: (response) => {
        console.log('Înregistrare reușită!', response);
        
        // 1. Golește câmpurile instant de pe ecran
        this.registerData.firstName = '';
        this.registerData.lastName = '';
        this.registerData.email = '';
        this.registerData.password = '';
        this.registerData.phoneNumber = '';
        
        // 2. Forțăm actualizarea grafică
        this.cdr.detectChanges();
        
        // 3. Afișează alerta
        alert('Cont creat cu succes! Te poți autentifica acum.');
        
        // 4. Mutăm utilizatorul la Login și actualizăm fundalul
        this.isLoginForm = true; 
        this.actualizeazaFundalul(); 
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Eroare completă la înregistrare:', err);
        alert('Eroare la înregistrare! Status: ' + err.status + ' - ' + (err.error || 'Problemă de rețea/CORS'));
      }
    });
  }
}