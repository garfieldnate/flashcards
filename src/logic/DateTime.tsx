import moment from 'moment';

// TODO: I don't think we need this. Just use Moment everywhere.
export default class DateTime {
  static now = () => new DateTime(moment());
  static fromUnix = (timeStamp: number) => new DateTime(moment.unix(timeStamp));

  dateTime: any;

  constructor(momentDateTime: moment.Moment) {
    this.dateTime = momentDateTime;
  }

  unix = () => this.dateTime.unix();
}
