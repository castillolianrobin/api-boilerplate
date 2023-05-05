import { MikroORM } from '@mikro-orm/core';
import config from './mikro-orm.config';

let orm: MikroORM;

MikroORM.init(config).then(m => {
  orm = m;
});

export default async function getOrm() {
  if (!orm) {
    await new Promise(resolve => setTimeout(resolve, 500)); // wait for orm to initialize
  }
  return orm;
}