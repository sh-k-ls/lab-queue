import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupEntity } from '../database.entities/group.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(GroupEntity)
    private readonly groupRepository: Repository<GroupEntity>,
  ) {}

  public findAll(): Promise<string[]> {
    const groupEntities = this.groupRepository.find();
    return this.getStringsGroups(groupEntities);
  }

  private async getStringsGroups(
    groups: Promise<GroupEntity[]>,
  ): Promise<string[]> {
    const groupsEntities = await groups;
    return groupsEntities.map((entity) => entity.groupName);
  }
}
