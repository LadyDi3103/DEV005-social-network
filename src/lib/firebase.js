// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  getFirestore, doc, deleteDoc, collection, addDoc,
  getDocs, onSnapshot, orderBy, updateDoc, getDoc, arrayUnion, arrayRemove, query,
} from 'firebase/firestore';
// Integración de los servicios de firebase al proyecto todo de LIB

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: 'AIzaSyDr_i_8XfqSbS2ej-v0w-r6Wy2FCpmL_sw',
//   authDomain: 'social-network-b08d0.firebaseapp.com',
//   projectId: 'social-network-b08d0',
//   storageBucket: 'social-network-b08d0.appspot.com',
//   messagingSenderId: '611309449971',
//   appId: '1:611309449971:web:52cdfd8a7f8dfccac87d86',
// };
const firebaseConfig = {
  apiKey: 'AIzaSyBpUAmyGv1olj6CsTJ6A8rZtCvK3XgzpXA',
  authDomain: 'myfirstproyect-bb58e.firebaseapp.com',
  projectId: 'myfirstproyect-bb58e',
  storageBucket: 'myfirstproyect-bb58e.appspot.com',
  messagingSenderId: '849896345504',
  appId: '1:849896345504:web:4482e1224f5e61429d5ec5',
  measurementId: 'G-5HVRKB5KL9',
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
// Función para guardar posts y crear los campos de la colección
export const savePost = (idUser, post, date, likes) => {
  addDoc(collection(db, 'posts'), {
    idUser, post, date, likes,
  });
};
// Obtener todos los posts
export const getPosts = () => getDocs(collection(db, 'posts'));
// Obtener los posts en tiempo real al usar onSnapshot y el query orderBy por fecha de creación
export const onGetPosts = (callback) => onSnapshot(query(collection(db, 'posts'), orderBy('date', 'desc')), callback);
// Elimina posts, elimina un post, id del post
export const deletePost = (id) => deleteDoc(doc(db, 'posts', id));
// Obtener un post en específico por id para editar por ejemplo.
export const getPost = (id) => getDoc(doc(db, 'posts', id));
// Editar el post y actualiza  con updateDoc, newPost es la nueva información
export const editPost = (id, newPost) => updateDoc(doc(db, 'posts', id), newPost);
// Función para dar like idUser, email cortado,
export const likePost = (id, idUser) => updateDoc(doc(db, 'posts', id), {
  likes: arrayUnion(idUser),
});
// Quita el like del array
export const dislikePost = (id, idUser) => updateDoc(doc(db, 'posts', id), {
  likes: arrayRemove(idUser),
});
// Para verificar sí el usuario está logeado o no con el fin de proteger la ruta.
export const verifyUser = () => {
  onAuthStateChanged(auth, (user) => {
    console.log(user);
    if (window.location.pathname === '/dashboard' && user === null) {
      window.location.pathname = '/';
    } else if (window.location.pathname === '/' && user) {
      window.location.pathname = '/dashboard';
    } else if (window.location.pathname === '/login' && user) {
      window.location.pathname = '/dashboard';
    } else if (window.location.pathname === '/register' && user) {
      window.location.pathname = '/dashboard';
    } else if (window.location.pathname === '' && user) {
      window.location.pathname = '/dashboard';
    }
  });
};
