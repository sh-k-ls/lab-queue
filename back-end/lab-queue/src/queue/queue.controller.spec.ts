import { Test, TestingModule } from '@nestjs/testing';
import { QueueController } from './queue.controller';
import { QueueService } from './queue.service';
import { RequestService } from '../request/request.service';
import { ProfileService } from '../profile/profile.service';

describe('QueueController', () => {
	let controller: QueueController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [QueueController],
			providers: [QueueService, RequestService, ProfileService],
		}).compile();

		controller = module.get<QueueController>(QueueController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
