const colors = require('colors');
const Jimp = require('jimp');

colors.setTheme({
  right: ['green', 'bold'],
  input: ['grey', 'bold'],
  custom: ['cyan', 'bold', 'underline'],
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: ['red', 'bold']
});


// open a file called "lenna.png"
module.exports = function() {
    
    Jimp.read('modelo.png', (err, modelo) => {
    if (err) throw err + console.log('ocurrio un error revisa el codigo :('.error);
    console.log('script correcto! se iniciara'.right)
    modelo
      .resize(450, 700, Jimp.RESIZE_BICUBIC)
      .quality(100) // set JPEG quality
      .write('modelo-story.png') // save
       console.log('modelo DOLAR guardado!'.custom)

  });

  Jimp.read('modelo-peso.png', (err, modeloPeso) => {
    if (err) throw err + console.log('ocurrio un error revisa el codigo :('.error);
    console.log('script correcto! se iniciara'.right)
    modeloPeso
      .resize(450, 700, Jimp.RESIZE_BICUBIC)
      .quality(100) // set JPEG quality
      .write('modelo-peso-story.png') // save
       console.log('modelo PESO guardado!'.custom)

  });
  Jimp.read('bcv.org.ve.png', (err, modeloBcv) => {
    if (err) throw err + console.log('ocurrio un error revisa el codigo :('.error);
    console.log('script correcto! se iniciara'.right)
    modeloBcv
      .resize(450, 700, Jimp.RESIZE_BICUBIC)
      .quality(100) // set JPEG quality
      .write('bcv.org.ve.png-story.png') // save
       console.log('modelo BCV guardado!'.custom)

  });

}

