import moment from 'moment';

export default function fromNow(datetime) {
  return moment(datetime).locale('zh-cn').fromNow();
}
