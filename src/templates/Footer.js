import cat from '../images.js';
// import cat from '../img/github.png';
const Footer = () => {
  const viewFooter = `
    <img src="${cat}" alt="Logo de Github"/>
    <a href="https://github.com/LadyDi3103" target="_blank">Diana Quispe</a> & 
    <img src="${cat}" alt="Logo de Github"/>
    <a href="https://github.com/ifdotcom" target="_blank">Fernanda Vidal</a> 
    & <img src="${cat}" alt="Logo de Github"/>
    <a href="https://github.com/IndiraPe" target="_blank">Indira Pérez </a>  ©Derechos Reservados
    `;
  return viewFooter;
};
export default Footer;
