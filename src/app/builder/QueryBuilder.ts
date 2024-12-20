import { FilterQuery, Query, Types } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  // Searching
  search(searchAbleFields: string[]) {
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
  filter() {
    const queryObj = { ...this.query }; // copy of query object
    const excludedFields = ['search', 'page', 'limit', 'sort', 'fields'];

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
  sort() {
    const sort =
      (this?.query?.sort as string)?.split(',')?.join(' ') || '-createdAt';
    this.modelQuery = this.modelQuery.sort(sort as string);

    return this;
  }

  // Pagination
  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this?.modelQuery.skip(skip).limit(limit);

    return this;
  }

  // Fields
  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';
    this.modelQuery = this.modelQuery.select(fields);

    return this;
  }
  //   ----------- END ----------
}

export default QueryBuilder;
