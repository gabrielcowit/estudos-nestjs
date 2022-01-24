import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VehicleModule } from './modules/vehicle/vehicle.module';
@Module({
	imports: [
		VehicleModule,
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'localhost',
			port: 5432,
			username: 'postgres',
			password: 'postgres',
			database: 'shopping-car',
			autoLoadEntities: true,
			synchronize: true, // always keep your db schema in sync
		}),
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
