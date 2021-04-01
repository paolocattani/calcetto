import mongoose, { Schema, Document } from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';

// define interface for your mongoose model IUser
interface IUser extends Document {
	name: string;
	email: string;
}

export const UserSchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
		},
		email: {
			type: String,
			lowercase: true,
			trim: true,
			unique: true,
			required: true,
		},
	},
	{
		collection: 'users',
	}
);
UserSchema.index({ createdAt: 1, updatedAt: 1 });

export const User = mongoose.model<IUser>('User', UserSchema);
export const UserTC = composeMongoose(User);
