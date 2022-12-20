// import prisma from '../database/model.module';
async function paginate<T>(
  filter: any,
  options: { orderBy: any; page: string; limit: string; populate: string },
  model: T
) {
  /**
   * 1. check if orderBy is provided in the options,m if it exists, then use it to sort the data in whatever order is provided else use the default order
   * 2. check if limit is provided in the options, if it exists, then use it to limit the number of data returned else use the default limit
   * 3. check if page is provided in the options, if it exists, then use it to page the number of data returned else use the default page
   * 4. calculate the total number of data in the database
   * 5. calculate the total number of pages
   * 6. if there are relationships that needs to be eager loaded, then use the include option to eager load them
   * 7. return the data
   */

  let orderBy;
  let include;
  if (options.orderBy) {
    const sortingCriteria: any[] = [];
    options.orderBy
      .split(',')
      .forEach((sortOption: { split: (arg0: string) => [any, any] }) => {
        const [key, value] = sortOption.split(':');
        const obj = { key, value };
        sortingCriteria.push(obj);
      });
    // for each of the objects inside the array, make the first value the key and the second value the value
    orderBy = sortingCriteria.reduce(
      (acc: any, cur: { key: any; value: any }): any => {
        acc[cur.key] = `${cur.value}`;
        return acc;
      },
      {}
    );
  } else {
    orderBy = [{ createdAt: 'desc' }];
  }

  const limit =
    options.limit && parseInt(options.limit, 10) > 0
      ? parseInt(options.limit, 10)
      : 10;
  const page =
    options.page && parseInt(options.page, 10) > 0
      ? parseInt(options.page, 10)
      : 1;
  const skip = (page - 1) * limit;

  // @ts-ignore
  const countPages = await model.count({ where: { ...filter } });

  const populate: Object[] = [];
  if (options.populate) {
    options.populate.split(',').forEach((populateOption: any): void => {
      const data = { [populateOption]: true };
      populate.push(data);
    });

    // convert the array of populate objects to a single object
    include = populate.reduce((acc: any, cur: any): any => {
      acc = { ...acc, ...cur };
      return acc;
    }, {});
    console.log(include);
  }

  //   @ts-ignore
  let docsPromise = await model.findMany({
    where: { ...filter },
    include: include ? { ...include } : undefined,
    orderBy,
    skip,
    take: limit,
  });

  const [results, total] = await Promise.all([docsPromise, countPages]);
  const totalPages = Math.ceil(total / limit);

  const result = {
    results,
    page,
    limit,
    totalPages,
    total,
  };
  return await Promise.resolve(result);
}

export default paginate;
