import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  const { PORT = 8080 } = process.env;

  await app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
}
bootstrap();
