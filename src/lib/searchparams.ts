import {
  createSerializer,
  parseAsInteger,
  parseAsString
} from 'nuqs';

import { getSortingStateParser } from '@/lib/data-table-parsers';

export const searchParams = {
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
  name: parseAsString,
  gender: parseAsString,
  category: parseAsString,
  role: parseAsString,
  sort: getSortingStateParser().withDefault([])
};

export const serialize = createSerializer(searchParams);
