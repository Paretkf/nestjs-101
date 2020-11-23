import { Inject, Injectable, Module, Scope } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.module';
import { Connection } from 'typeorm';
import { COFFEE_BRANDS } from './coffee.constants';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

// class MockCoffeesService {}
class DevelopmentConfigService {}
class ProductionConfigService {}
class ConfigService {}

@Injectable()
export class CoffeeBrandsFactory {
  create() {
    return ['buddy brew', 'nescafe']
  }
}
@Module({
  imports: [
    // DatabaseModule.register({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432
    // }),
    TypeOrmModule.forFeature([Coffee, Flavor]),
    ConfigModule
  ],
  providers: [
    CoffeesService,
    CoffeeBrandsFactory,
    // non class base provider token
    {
      provide: COFFEE_BRANDS, // 👈
      useValue: ['buddy brew', 'nescafe'] // array of coffee brands,
    },
    {
      provide: 'COFFEE_BRANDS_FACTORY', // 👈
      useFactory: (brandFactory: CoffeeBrandsFactory) => brandFactory.create(),
      inject: [ CoffeeBrandsFactory ],
      scope: Scope.TRANSIENT // 👈
    },
    // {
    //   provide: CoffeesService,
    //   useValue: new MockCoffeesService(), // <-- mock implementation
    // },
    {
      provide: ConfigService,
      useClass:
        process.env.NODE_ENV === 'development'
          ? DevelopmentConfigService
          : ProductionConfigService,
    },
    {
      provide: 'COFFEE_BRANDS_ASYNC',
      // Note "async" here, and Promise/Async event inside the Factory function 
      // Could be a database connection / API call / etc
      // In our case we're just "mocking" this type of event with a Promise
      useFactory: async (connection: Connection): Promise<string[]> => {
        // const coffeeBrands = await connection.query('SELECT * ...');
        const coffeeBrands = await Promise.resolve(['buddy brew', 'nescafe'])
        return coffeeBrands;
      },
      inject: [Connection],
    }
  ],
  controllers: [
    CoffeesController
  ],
  exports: [
    CoffeesService
  ]
})
export class CoffeesModule {}
