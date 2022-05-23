import faker from '@faker-js/faker';
import times from 'lodash/times';

export default function () {
  return {
    people: times(100, function (n) {
      return {
        id: n,
        name: faker.name.findName(),
        avatar: faker.internet.avatar(),
        email: faker.internet.email(),
      };
    }),
  };
}
