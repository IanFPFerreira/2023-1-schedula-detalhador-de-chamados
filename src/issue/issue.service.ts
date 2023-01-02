import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Issue } from './issue.entity';
import { CreateIssuedto } from './dto/createIssuedto';
import { UpdateIssuedto } from './dto/updateIssuedto';

@Injectable()
export class IssuesService {
  constructor(
    @InjectRepository(Issue)
    private IssueRepo: Repository<Issue>,
  ) {}

  async createIssue(createIssuedto: CreateIssuedto): Promise<Issue> {
    const date = new Date();
    const issue = this.IssueRepo.create({ ...createIssuedto, date });
    try {
      return await this.IssueRepo.save(issue);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findIssues(): Promise<Issue[]> {
    const issues = await this.IssueRepo.find({});
    if (!issues) throw new NotFoundException('Não existem chamado cadastrados');
    return issues;
  }

  async findIssueById(issueId: string): Promise<Issue> {
    const Issue = await this.IssueRepo.findOne({
      where: { id: issueId },
    });
    if (!Issue) throw new NotFoundException('Chamado não encontrado');
    return Issue;
  }

  async updateIssue(
    updateIssuedto: UpdateIssuedto,
    issueId: string,
  ): Promise<Issue> {
    const issue = await this.IssueRepo.findOneBy({
      id: issueId,
    });
    const {
      requester,
      phone,
      city,
      workstation,
      problem_category,
      problem_type,
      email,
    } = updateIssuedto;

    issue.requester = requester;
    issue.phone = phone;
    issue.city = city;
    issue.workstation = workstation;
    issue.problem_category = problem_category;
    issue.problem_type = problem_type;
    issue.email = email;

    try {
      await this.IssueRepo.save(issue);
      return issue;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteIssue(issueId: string) {
    const result = await this.IssueRepo.delete({ id: issueId });
    if (result.affected === 0) {
      throw new NotFoundException('Nao foi encontrado um chamado com este id');
    }
  }
}