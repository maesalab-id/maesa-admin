import faker from '@faker-js/faker';
import uniq from 'lodash/uniq';
import times from 'lodash/times';

export default function () {
  const companies = times(20, function (n) {
    return {
      id: n,
      name: faker.company.companyName(),
      suffix: faker.company.companySuffix(),
    };
  });

  const roles = uniq(
    times(10, function (n) {
      return faker.name.jobType();
    })
  ).map(function (name, id) {
    return { id, name };
  });

  return {
    companies,
    roles,
    people: times(100, function (n) {
      const g = faker.name.gender();
      const company = companies[Math.floor(Math.random() * companies.length)];
      const role = roles[Math.floor(Math.random() * roles.length)];
      return {
        id: n,
        name: faker.name.findName(),
        gender: g,
        avatar: faker.internet.avatar(),
        email: faker.internet.email(),
        role_id: role.id,
        role,
        company_id: company.id,
        company,
      };
    }),
  };
}
