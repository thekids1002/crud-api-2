import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category/category.module';

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
      CategoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
