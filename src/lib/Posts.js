import { onAuthStateChanged } from 'firebase/auth'; // El escucha
import {
  savePost, auth, onGetPosts,
} from './firebase';

// Recorta el email hasta el @ para usarlo como nombre de usuario.
export const idUser = () => {
  const userID = [];
  onAuthStateChanged(auth, (user) => {
    const emailName = user.email;
    const emailAt = emailName.search('@');
    const emailCutted = emailName.slice(0, emailAt);
    userID.push(emailCutted);
  });
  return userID; // retorna el email Recortado
};

//
export const gettingPosts = (callback) => {
  onGetPosts((querySnapshot) => { // ejecuta un callback el cual va a recibir los posts.
    // const querySnapshot = getPost();
    const data = []; // se guarda en data
    querySnapshot.forEach((doc) => { // itera
      data.push(doc);
    });
    callback(data); // luego esa data se manda como argumento al callback
  });
};

// guardar en firebase fecha, los likes, el post
export const savePostFire = async (textArea) => {
  const idUserPost = await idUser();
  const idUserPostSave = idUserPost[0];
  const valueTextArea = textArea.value;
  const datePost = Date.now();
  const datePostFormat = datePost.toString();
  const likes = [];
  if (valueTextArea !== '') {
    savePost(idUserPostSave, valueTextArea, datePostFormat, likes);
  }
  textArea.value = '';
};
