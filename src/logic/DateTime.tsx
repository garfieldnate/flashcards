import moment from 'moment';

// TODO: I don't think we need this. Just use Moment everywhere.
export default class DateTime {
  public static now = () => new DateTime(moment());
  public static fromUnix = (timeStamp: number) => new DateTime(moment.unix(timeStamp));

  public dateTime: any;

  constructor(momentDateTime: moment.Moment) {
    this.dateTime = momentDateTime;
  }

  public unix = () => this.dateTime.unix();
}
