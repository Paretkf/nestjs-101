import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Res, ValidationPipe } from '@nestjs/common';
import { ApiForbiddenResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { PaginationQueryDto } from './dto/paginate.dto';

@ApiTags('coffees')
@Controller('coffees')
export class CoffeesController {
  constructor(
    private readonly coffeesService: CoffeesService
  ){}

  @Get()
  // @ApiResponse({ status: 403, description: 'Fobidden.'})
  @ApiForbiddenResponse({description: 'Fobidden.'})
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.coffeesService.findAll(paginationQuery)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns #${id} coffee`;
  }

  @Post()
  // Add validation pipe to request scoped
  // create(@Body(ValidationPipe) body: CreateCoffeeDto) {
  create(@Body(ValidationPipe) body: CreateCoffeeDto) {
    this.coffeesService.create(body)
    return body
    // return `This action creates a coffee`;
  }

  @Post('http-status')
  @HttpCode(HttpStatus.GONE) // 👈
  createGone(@Body() body) {
      return body;
  }

  @Get('res')
  findAllStatus(@Res() response) { 
    // Express.js example using status() and send() methods 
    response.status(200).send(`This action returns all coffees`);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return this.coffeesService.update(id, body)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeesService.remove(id)
  }
}
