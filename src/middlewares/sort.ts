import moment from 'moment';
import { Request, Response, NextFunction } from 'express';

type IRequest = Request & {
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
  skip?: number;
  meta?: {
    user?: string;
    userEmail?: string;
    search?: string;
    sort?: string;
    page?: number;
    limit?: number;
    skip?: number;
    date?: string;
    query?: any;
  };
  query: {
    search?: string;
    sort?: string;
    page?: any;
    limit?: any;
    skip?: number;
    date?: any;
  };
  date?: any;
};

export default function sort(req: IRequest, res: Response, next: NextFunction) {
  const {
    sort = '-createdAt',
    page = '1',
    limit = '10',
    search = '',
    date,
  } = req.query;
  const parsedPage = Math.max(1, parseInt(page));
  const parsedLimit = parseInt(limit);

  if (parsedLimit < 1) {
    return res
      .status(400)
      .json({ code: 'E003', message: 'Limit must be greater than 0' });
  }

  const skip = (parsedPage - 1) * parsedLimit;

  req.search = search;
  req.sort = sort;
  req.page = parsedPage;
  req.limit = parsedLimit;
  req.skip = skip;
  req.date = getDate(date);
  req.meta = {
    search,
    sort,
    page: parsedPage,
    limit: parsedLimit,
    skip,
    date,
    query: { ...req.date },
  };

  next();
}

const getDate = (query: any) => {
  const timeframes = ['today', 'daily', 'weekly', 'monthly', 'yearly'];
  const momentTimeframes = ['day', 'day', 'week', 'month', 'year'];

  const index = timeframes.indexOf(query);
  if (index !== -1) {
    return {
      createdAt: {
        $gte: moment()
          .startOf(momentTimeframes[index] as any)
          .toDate(),
        $lte: moment()
          .endOf(momentTimeframes[index] as any)
          .toDate(),
      },
    };
  }

  return {};
};

export type RequestSortType = Request & {
  sort?: string;
  page?: number;
  limit?: number;
  skip?: number;
  meta?: any;
  date?: any;
};
