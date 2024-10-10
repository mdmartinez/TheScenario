import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuid_v4 } from 'uuid';

@Schema({
  collection: 'Data',
  autoCreate: true,
  timestamps: {
    createdAt: 'created',
  },
})
export class Data extends Document {
  @Prop({ type: String, default: uuid_v4 })
  _id?: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: Number, required: true })
  age: number;

  @Prop({
    type: String,
    enum: ['red', 'blue', 'green', 'yellow'],
    required: true,
  })
  favoriteColor: 'red' | 'blue' | 'green' | 'yellow';

  @Prop({
    type: [String],
    enum: ['reading', 'hiking', 'coding'],
    required: true,
  })
  interests: string[];

  @Prop({ type: String, maxlength: 500 })
  comments: string;
}

export const DataSchema = SchemaFactory.createForClass(Data);

export const DataCollection = {
  name: Data.name,
  schema: DataSchema,
};

export const DataConnection = MongooseModule.forFeature(
  [DataCollection],
  'local',
);
