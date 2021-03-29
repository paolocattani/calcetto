import { Task, TaskTC } from '../database/config/mongo/models/task.model';

const TaskQuery = {
	taskById: TaskTC.mongooseResolvers.findById(),
	taskByIds: TaskTC.mongooseResolvers.findByIds(),
	taskOne: TaskTC.mongooseResolvers.findOne(),
	taskMany: TaskTC.mongooseResolvers.findMany(),
	taskCount: TaskTC.mongooseResolvers.count(),
	taskConnection: TaskTC.mongooseResolvers.connection(),
	taskPagination: TaskTC.mongooseResolvers.pagination(),
};

const TaskMutation = {
	taskCreateOne: TaskTC.mongooseResolvers.createOne(),
	taskCreateMany: TaskTC.mongooseResolvers.createMany(),
	taskUpdateById: TaskTC.mongooseResolvers.updateById(),
	taskUpdateOne: TaskTC.mongooseResolvers.updateOne(),
	taskUpdateMany: TaskTC.mongooseResolvers.updateMany(),
	taskRemoveById: TaskTC.mongooseResolvers.removeById(),
	taskRemoveOne: TaskTC.mongooseResolvers.removeOne(),
	taskRemoveMany: TaskTC.mongooseResolvers.removeMany(),
};

export { Task, TaskQuery, TaskMutation };
