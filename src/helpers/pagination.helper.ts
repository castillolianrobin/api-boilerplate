import { FilterQuery, FindOptions, EntityName } from '@mikro-orm/core'
import { EntityManager } from "@mikro-orm/core/EntityManager"
import getOrm from "../orm";

export async function findAndPaginate<Entity extends object, Hint extends string>
(
  entityName: EntityName<Entity>,
  options?: PaginationOptions,
  extraOptions?:  PaginationExtraOptions<Entity, Hint>
) 
{
  const orm = await getOrm();
  const em = orm.em.fork();
  const limit = options?.limit || 10;
  const page = options?.page || 1; 
  const offset = (page - 1) * limit;
  const findOptions = extraOptions?.findOptions 
    ? { ...extraOptions?.findOptions, limit, offset } 
    : { limit, offset };
  const data = await em.findAndCount(
    entityName, 
    extraOptions?.where || {}, 
    findOptions,
  )

  return {
    total: data[1],
    data: data[0],
    per_page: limit,
    current_page: page,
    last_page: Math.ceil(data[1]/limit),
    from: !data[0].length ? 0 : offset + 1,
    to: !data[0].length ? 0 : offset + data[0].length + 1,
  };
}


// export function paginate(
//   findAndCounData: [ any[], number ],
//   limit: number,
//   offset: 
// ) {
//   return {
//     total: findAndCounData[1],
//     per_page: 15,
//     "current_page": 1,
//     "last_page": 4,
//     "first_page_url": "http://laravel.app?page=1",
//     "last_page_url": "http://laravel.app?page=4",
//     "next_page_url": "http://laravel.app?page=2",
//     "prev_page_url": null,
//     "path": "http://laravel.app",
//     "from": 1,
//     "to": 15,
//     "data":[
//         {
//             // Record...
//         },
//         {
//             // Record...
//         }
//     ]
//   }
// }

/** __TYPE DEFINITIONS__ */


interface PaginationOptions {
  page?: number;
  limit?: number;
}

interface PaginationExtraOptions<T, P extends string> {
  where?: FilterQuery<T>;
  findOptions?: FindOptions<T, P>;
}
