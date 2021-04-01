import { User, UserTC } from '../database/config/mongo/models/user.model';

const UserQuery = {
	userById: UserTC.mongooseResolvers.findById(),
	userByIds: UserTC.mongooseResolvers.findByIds(),
	userOne: UserTC.mongooseResolvers.findOne(),
	userMany: UserTC.mongooseResolvers.findMany(),
	userCount: UserTC.mongooseResolvers.count(),
	userConnection: UserTC.mongooseResolvers.connection(),
	userPagination: UserTC.mongooseResolvers.pagination(),
};

const UserMutation = {
	userCreateOne: UserTC.mongooseResolvers.createOne(),
	userCreateMany: UserTC.mongooseResolvers.createMany(),
	userUpdateById: UserTC.mongooseResolvers.updateById(),
	userUpdateOne: UserTC.mongooseResolvers.updateOne(),
	userUpdateMany: UserTC.mongooseResolvers.updateMany(),
	userRemoveById: UserTC.mongooseResolvers.removeById(),
	userRemoveOne: UserTC.mongooseResolvers.removeOne(),
	userRemoveMany: UserTC.mongooseResolvers.removeMany(),
};

export { User, UserQuery, UserMutation };
