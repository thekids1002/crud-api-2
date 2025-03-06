import { Category } from 'src/entity/category.entity';
import { CategoryService } from './category.service';
import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { CreateCategoryRequest } from './payload/request/createCategoryRequest';

@Controller('category')
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService,
    ){}

    @Get()
    public getAll(@Req() req: Request){
        return this.categoryService.findAll(req);
    }

    @Get(':id')
    public getById(@Param('id') id:number){
        return this.categoryService.findById(id);
    }

    @Post()
    public create(@Body() category:CreateCategoryRequest){
        return this.categoryService.create(category);
    }

    @Put(':id')
    public update(@Param('id') id:number, @Body() updateCategory: Category){
        return this.categoryService.update(id,updateCategory);
    }

    @Delete(':id')
    public remove(@Param('id') id:number){
        return this.categoryService.remove(id);
    }
}
