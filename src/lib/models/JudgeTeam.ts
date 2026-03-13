import mongoose, { Document, Schema } from 'mongoose';

export type JudgeDomain = 'AI' | 'Vibeathon' | 'UI/UX';

export interface IJudgeTeam extends Document {
  id: string;
  name: string;
  domain: JudgeDomain;
  labId: string;
  labName: string;
  members: string[];
  inFinal: boolean;
  createdAt: Date;
}

const JudgeTeamSchema = new Schema<IJudgeTeam>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  domain: { type: String, enum: ['AI', 'Vibeathon', 'UI/UX'], required: true },
  labId: { type: String, required: true },
  labName: { type: String, required: true },
  members: [{ type: String }],
  inFinal: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

JudgeTeamSchema.index({ domain: 1 });
JudgeTeamSchema.index({ labId: 1 });
JudgeTeamSchema.index({ inFinal: 1 });

export default mongoose.models.JudgeTeam ||
  mongoose.model<IJudgeTeam>('JudgeTeam', JudgeTeamSchema, 'judgeteams');
