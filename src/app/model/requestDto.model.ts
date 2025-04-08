import { User } from './user.model';

export class RequestDto {
  description: string = '';
  justification: string = '';
  dateNeeded: string = '';
  deliveryMode: string = '';

  constructor(
    description: string = '',
    justification: string = '',
    dateNeeded: string = '',
    deliveryMode: string = ''
  ) {
    this.description = description;
    this.justification = justification;
    this.dateNeeded = dateNeeded;
    this.deliveryMode = deliveryMode;
  }
}
