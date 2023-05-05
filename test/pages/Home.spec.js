/**
 * @jest-environment jsdom
 */
import Home from '../../src/pages/Home.js';
// ignorar todas las importaciones de ese archivo
// reemplazar las imágenes.. tb sirve para reemplazar funciones.
jest.mock('../../src/images.js', () => {});

describe('Home', () => {
  it('debería ser una función', () => {
    expect(typeof Home).toBe('function');
  });

  it('Debería ser un botón', () => {
    const DOM = document.createElement('div');
    DOM.append(Home());
    const haveAButton = DOM.querySelector('#btn-login');
    expect(haveAButton).not.toBe(undefined);
  });

  // Test del coach regional
  it('debería de navegar a Login al dar clic en botón', () => {
    const navigateTo = jest.fn();
    const mainContainer = Home(navigateTo);
    mainContainer.querySelector('#btn-login').click();
    expect(navigateTo).toHaveBeenCalledWith('/login');
  });
  // Teste---end
  test('debería de navegar a Register al dar clic en botón', () => {
    const navigateTo = jest.fn();
    const mainContainer = Home(navigateTo);
    mainContainer.querySelector('#btn-register').click();
    expect(navigateTo).toHaveBeenCalledWith('/register');
  });
});
// describe('Login')
