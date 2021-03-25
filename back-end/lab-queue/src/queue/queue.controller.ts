import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Patch,
	Post,
	Request,
	UseGuards,
} from '@nestjs/common';
import { QueueService } from './queue.service';
import { QueueDto } from '../shared/classes/queue.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RequestService } from '../request/request.service';

@Controller('api/v1/queue')
export class QueueController {
	constructor(
		private readonly queue: QueueService,
		private readonly request: RequestService,
	) {}

	@UseGuards(JwtAuthGuard)
	@Post()
	@HttpCode(HttpStatus.CREATED)
	createQueue(@Body() queue: QueueDto): number {
		return this.queue.pushQueue(queue);
	}

	@UseGuards(JwtAuthGuard)
	@Get('available')
	getAllQueuesAvailable(@Request() req): QueueDto[] {
		return this.queue.getByUserAvailableId(req.user);
	}

	@UseGuards(JwtAuthGuard)
	@Get('creator')
	getAllQueuesCreator(@Request() req): QueueDto[] {
		console.log(req.user);
		return this.queue.getByUserCreatorId(req.user);
	}

	@UseGuards(JwtAuthGuard)
	@Get('signed')
	getAllQueuesSigned(@Request() req): QueueDto[] {
		return this.queue.getByUserSignedId(req.user);
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id')
	getQueueById(@Param('id') idQueue: number): QueueDto {
		return this.queue.getByQueueId(idQueue);
	}

	@UseGuards(JwtAuthGuard)
	@Patch(':id')
	editQueueById(@Param('id') id: number, @Body() queue: QueueDto): QueueDto {
		return queue;
	}

	@UseGuards(JwtAuthGuard)
	@Post(':id/signIn')
	signInQueue(@Param('id') queueId: string, @Request() req): number {
		return this.request.pushRequest({
			queueId: +queueId,
			userId: req.user.id,
			isSigned: true,
		});
	}

	@UseGuards(JwtAuthGuard)
	@Patch(':id/sighOut')
	sighOutQueue(@Param('id') queueId: string, @Request() req): number {
		return this.request.delRequest({
			queueId: +queueId,
			userId: req.user.id,
			isSigned: true,
		});
	}
}
