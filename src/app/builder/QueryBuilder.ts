import { FilterQuery, Query, Types } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  // Searching
  searching(searchAbleFields: string[]) {
    const search = this.query?.search as string;
    if (search) {
      this.modelQuery = this.modelQuery.find({
        $or: searchAbleFields?.map(
          (field) =>
            ({
              [field]: {
                $regex: search,
                $options: 'i',
              },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }

  // Filtering
  filtering() {
    const queryObj = { ...this.query }; // copy of query object
    const excludedFields = ['searching', 'sorting'];

    excludedFields.forEach((field) => delete queryObj[field]);

    if (queryObj?.author) {
      queryObj.user = new Types.ObjectId(queryObj.author as string);
    }

    if (queryObj?.createdAt) {
      queryObj.createdAt = {
        $gte: new Date(queryObj.createdAt as string),
      };
    }

    if (queryObj?.updatedAt) {
      queryObj.updatedAt = {
        $gte: new Date(queryObj.updatedAt as string),
      };
    }

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

    return this;
  }

  // Sorting
  sorting() {
    const sort =
      (this?.query?.sort as string)?.split(',')?.join(' ') || '-createdAt';
    this.modelQuery = this.modelQuery.sort(sort as string);

    return this;
  }
  //   ----------- END ----------
}

export default QueryBuilder;
