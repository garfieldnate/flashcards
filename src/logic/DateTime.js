import moment from 'moment';

// TODO: would prefer an interface of some kind, maybe using TypeScript
export default class DateTime {
    static now = () => new DateTime(moment());
    static fromUnix = (timeStamp) => new DateTime(moment.unix(timeStamp));

    constructor(momentDateTime) {
        this.dateTime = momentDateTime;
    }

    unix = () => this.dateTime.unix();
}
