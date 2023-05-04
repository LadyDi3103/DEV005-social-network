import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase.js';

export const buttonLogin = (passwordValue, emailValue) => new Promise((resolve, reject) => {
  signInWithEmailAndPassword(auth, emailValue, passwordValue)

    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      resolve({ nameUser: user }); // se resuelve la promesa
    })
    .catch((error) => {
      const errorCode = error.code;
      reject(errorCode); // errores de firebase al hacer loggin
    });
});
