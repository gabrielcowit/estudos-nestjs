import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VehicleModule } from './modules/vehicle/vehicle.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
@Module({
	imports: [
		VehicleModule,
		UserModule,
		AuthModule,
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
})
export class AppModule {}
