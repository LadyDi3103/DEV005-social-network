import { buttonLoginG } from '../lib/LoginGoogle';
import { buttonRegister } from '../lib/RegisterEmail';
import logo2 from '../img/vaca1_480.png';
import google from '../img/G.png';

const Register = (navigateTo) => {
  const viewRegister = `
  <h1 id="tittleLogo-2">Frikis del Espacio</h1>
  <img id="logo-2" src="${logo2}" alt="Imagen del logo"/>  
    <div class="register">
      <h1 class="tittleFrikis">Frikis Del Espacio</h1>
      <img class="logoSmall" src="${logo2}" alt="Vaca abducida por alien"/>
      <div class="container-register">
        <button class="btnG"><img src="${google}" alt="Ícono de google"/><span>Continúa con Google</span></button>
        <p class="or"><span class="line"></span><span>o</span><span class="line"></span></p>
        <form id=formRegister>
          <label for="inputEmail">EMAIL</label>
          <div class="gradient">
            <input type="email" id="inputEmail" name="inputEmail" class="inputStyle" placeholder="ejemplo@ejemplo.com" required>
          </div>
          <p id="errorEmail" class=input-error>*Ingresa un email válido.</p>
          <label for="inputPassword">CREAR CONTRASEÑA</label>
          <div class="gradient">
            <span class="icon-eye">
              <i class="fa-regular fa-eye-slash"></i>
            </span>
            <input type="password" id="inputPassword" name="inputPassword" class="inputStyle" placeholder="**********" required>
          </div>
          <p id="errorPassword" class=input-error>*Contraseña [5-10] caracteres. </p>
          <button class="btnRegister">Registrarse</button>
        </form>
        <p class="go-login">¿Ya tienes una cuenta? <a href="/login">Inicia Sesión</a></p>
      </div>
    </div>
    `;

  const mainRegister = document.createElement('div');
  mainRegister.classList.add('main-register');
  mainRegister.innerHTML = viewRegister;
  const inputEmail = mainRegister.querySelector('#inputEmail');
  const inputPassword = mainRegister.querySelector('#inputPassword');
  const btnRegister = mainRegister.querySelector('.btnRegister');
  const btnGoogle = mainRegister.querySelector('.btnG');
  const errorEmail = mainRegister.querySelector('#errorEmail');
  const errorPassword = mainRegister.querySelector('#errorPassword');
  // Enmascarar y desenmascarar la contraseña
  const iconEye = mainRegister.querySelector('.icon-eye');
  iconEye.addEventListener('click', () => {
    const icon = iconEye.querySelector('i');

    if (iconEye.nextElementSibling.type === 'password') {
      iconEye.nextElementSibling.type = 'text';
      icon.classList.remove('fa-eye-slash');
      icon.classList.add('fa-eye');
    } else {
      iconEye.nextElementSibling.type = 'password';
      icon.classList.remove('fa-eye');
      icon.classList.add('fa-eye-slash');
    }
  });
  // Validar campos de email y password del form Register para mostrar errores en pantalla
  btnRegister.addEventListener('click', (event) => {
    event.preventDefault();
    const passwordValue = inputPassword.value;
    const emailValue = inputEmail.value;
    if (emailValue === '' && passwordValue === '') {
      errorEmail.style.visibility = 'visible';
      errorEmail.textContent = 'Es un campo obligatorio';
      errorPassword.style.visibility = 'visible';
      errorPassword.textContent = 'Es un campo obligatorio';
      setTimeout(() => {
        errorEmail.style.visibility = 'hidden';
        errorPassword.style.visibility = 'hidden';
      }, 5000);
    }
    // Llamo a la función buttonRegister
    buttonRegister(passwordValue, emailValue)
      .then((user) => {
        console.log(user.nameUser);
        if (user.nameUser) {
          console.log(user.nameUser);
          navigateTo('/dashboard');
        }
      })
      .catch((error) => {
        if (error === 'auth/email-already-in-use') {
          errorEmail.style.visibility = 'visible';
          errorEmail.textContent = 'El email ya está en uso';
          setTimeout(() => {
            errorEmail.style.visibility = 'hidden';
          }, 5000);
        } else if (error === 'auth/internal-error') {
          errorPassword.style.visibility = 'visible';
          errorPassword.textContent = 'Ingresa una contraseña';
          setTimeout(() => {
            errorPassword.style.visibility = 'hidden';
            errorEmail.style.visibility = 'hidden';
          }, 5000);
        } else if (error === 'auth/weak-password') {
          errorPassword.style.visibility = 'visible';
          errorPassword.textContent = 'Contraseña mínimo 6 caracteres';
          setTimeout(() => {
            errorEmail.style.visibility = 'hidden';
            errorPassword.style.visibility = 'hidden';
          }, 5000);
        } else if (error === 'auth/missing-email') {
          errorEmail.style.visibility = 'visible';
          errorEmail.textContent = 'Ingresa un email';
          setTimeout(() => {
            errorEmail.style.visibility = 'hidden';
            errorPassword.style.visibility = 'hidden';
          }, 5000);
        } else if (error === 'auth/invalid-email' && emailValue !== '') {
          errorEmail.style.visibility = 'visible';
          errorEmail.textContent = 'Email inválido';
          setTimeout(() => {
            errorEmail.style.visibility = 'hidden';
            errorPassword.style.visibility = 'hidden';
          }, 5000);
        } else if (error === 'auth/missing-password') {
          errorPassword.style.visibility = 'visible';
          errorPassword.textContent = 'Ingresa una contraseña';
          setTimeout(() => {
            errorEmail.style.visibility = 'hidden';
            errorPassword.style.visibility = 'hidden';
          }, 5000);
        }
      });
  });
  buttonLoginG(btnGoogle, navigateTo);
  return mainRegister;
};

export default Register;
