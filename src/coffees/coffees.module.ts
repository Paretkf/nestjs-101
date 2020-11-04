import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

class MockCoffeesService {}

@Module({
  imports: [
    TypeOrmModule.forFeature([Coffee, Flavor])
  ],
  providers: [
    CoffeesService,
    // {
    //   provide: CoffeesService,
    //   useValue: new MockCoffeesService(), // <-- mock implementation
    // }
  ],
  controllers: [
    CoffeesController
  ],
  exports: [
    CoffeesService
  ]
})
export class CoffeesModule {}
