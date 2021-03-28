export interface QueueInterface {
  id: number;
  nameSubject: string;
  nameTeacher: string;
  dateCreate: string;
  timeCreate: string;
  groups: string[];
  creatorName?: string;
  description: string;
}
