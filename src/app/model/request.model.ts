import { User } from './user.model';

export class Request {
  id: number;
  user: User;
  requestNumber: string;
  description: string;
  justification: string;
  dateNeeded: string;
  deliveryMode: string;
  status: string;
  total: number;
  submittedDate: string;
  reasonForRejection: string;

  constructor(
    id: number = 0,
    user: User = new User(),
    requestNumber: string = '',
    description: string = '',
    justification: string = '',
    dateNeeded: string = '',
    deliveryMode: string = '',
    status: string = '',
    total: number = 0,
    submittedDate: string = '',
    reasonForRejection: string = ''
  ) {
    this.id = id;
    this.user = user;
    this.requestNumber = requestNumber;
    this.description = description;
    this.justification = justification;
    this.dateNeeded = dateNeeded;
    this.deliveryMode = deliveryMode;
    this.status = status;
    this.total = total;
    this.submittedDate = submittedDate;
    this.reasonForRejection = reasonForRejection;
  }
}
