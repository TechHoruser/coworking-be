import '@/dotenv';
import app from '@/app';

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Servidor iniciado en el puerto 3000');
});
