import { Module } from '@nestjs/common';
import { UserController } from '@src/modules/controllers';
import { AppService } from './app.service';

@Module({
	imports: [],
	controllers: [UserController],
	providers: [AppService],
})
export class AppModule {}
