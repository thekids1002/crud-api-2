import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
      TypeOrmModule.forRoot({
        type : 'mysql',
        host : 'localhost',
        port : 3306,
        username : 'root',
        password : '',
        database : 'api-crud',
        entities : [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize : true,
        "logging": ["query", "error"]
      }),
      CategoryModule,
      ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
