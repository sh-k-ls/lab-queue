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
import { RequestDto } from '../shared/classes/request.dto';
import { ProfileDto } from '../shared/classes/profile.dto';
import { ProfileService } from '../profile/profile.service';

@Controller('api/v1/queue')
export class QueueController {
	constructor(
		private readonly queue: QueueService,
		private readonly request: RequestService,
		private readonly profile: ProfileService,
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
		return this.queue.getByUserCreatorId(req.user);
	}

	@UseGuards(JwtAuthGuard)
	@Get('signed')
	getAllQueuesSigned(@Request() req): QueueDto[] {
		return this.queue.getByUserSignedId(req.user);
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id')
	getQueueById(@Param('id') idQueue: string): QueueDto {
		return this.queue.getByQueueId(+idQueue);
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id/request')
	getRequestsByQueueId(@Param('id') idQueue: string): RequestDto[] {
		return this.request.getByQueueId(+idQueue);
	}

	@UseGuards(JwtAuthGuard)
	@Post(':id/request')
	@HttpCode(HttpStatus.CREATED)
	addRequestsByQueueId(
		@Param('id') idQueue: string,
		@Body() queueReq: RequestDto,
		@Request() req,
	): number {
		queueReq.userId = req.user.id;
		return this.request.pushRequest(queueReq);
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id/request/profile')
	getProfilesByQueueId(@Param('id') idQueue: string): ProfileDto[] {
		return this.profile.getProfilesByQueueId(+idQueue);
	}

	@UseGuards(JwtAuthGuard)
	@Patch(':id/request')
	editRequestByQueueId(
		@Param('id') idQueue: string,
		@Body() queueReq: RequestDto,
		@Request() req,
	): RequestDto {
		return this.request.changeSigned(req.user.id, +idQueue);
	}

	@UseGuards(JwtAuthGuard)
	@Patch(':id')
	editQueueById(@Param('id') id: string, @Body() queue: QueueDto): QueueDto {
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
	@Patch(':id/signOut')
	sighOutQueue(@Param('id') queueId: string, @Request() req): number {
		return this.request.delRequest({
			queueId: +queueId,
			userId: req.user.id,
			isSigned: true,
		});
	}
}
