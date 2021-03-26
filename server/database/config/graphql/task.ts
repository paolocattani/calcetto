import { TaskTC } from '../mongo/models/task.model';

const TaskQuery = {
	taskById: TaskTC.getResolver('findById'),
	taskByIds: TaskTC.getResolver('findByIds'),
	taskOne: TaskTC.getResolver('findOne'),
	taskMany: TaskTC.getResolver('findMany'),
	taskCount: TaskTC.getResolver('count'),
	taskConnection: TaskTC.getResolver('connection'),
	taskPagination: TaskTC.getResolver('pagination'),
};

const TaskMutation = {
	taskCreateOne: TaskTC.getResolver('createOne'),
	taskCreateMany: TaskTC.getResolver('createMany'),
	taskUpdateById: TaskTC.getResolver('updateById'),
	taskUpdateOne: TaskTC.getResolver('updateOne'),
	taskUpdateMany: TaskTC.getResolver('updateMany'),
	taskRemoveById: TaskTC.getResolver('removeById'),
	taskRemoveOne: TaskTC.getResolver('removeOne'),
	taskRemoveMany: TaskTC.getResolver('removeMany'),
};

export { TaskQuery, TaskMutation };
