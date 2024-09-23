import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const swagger = (app: INestApplication, name: string) => {
  const options = new DocumentBuilder()
    .setTitle(`${name} API`)
    .setDescription(`${name} API 문서입니다.`)
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        name: 'Authorization',
        in: 'header',
      },
      'jwt',
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      defaultModelsExpandDepth: -1,
      defaultModelExpandDepth: 10,
    },
  });
};
