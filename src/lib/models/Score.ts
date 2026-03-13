import mongoose, { Document, Schema } from 'mongoose';

export type ScoreRound = 'lab' | 'final';

export interface IScore extends Document {
  teamId: string;
  judgeName: string;
  round: ScoreRound;
  criteria: {
    innovation: number;
    execution: number;
    presentation: number;
    impact: number;
    feasibility: number;
    scalability: number;
  };
  total: number;
  submittedAt: Date;
}

const ScoreSchema = new Schema<IScore>({
  teamId: { type: String, required: true },
  judgeName: { type: String, required: true },
  round: { type: String, enum: ['lab', 'final'], required: true },
  criteria: {
    innovation: { type: Number, required: true },
    execution: { type: Number, required: true },
    presentation: { type: Number, required: true },
    impact: { type: Number, required: true },
    feasibility: { type: Number, required: true },
    scalability: { type: Number, required: true },
  },
  total: { type: Number, required: true },
  submittedAt: { type: Date, default: Date.now },
});

ScoreSchema.index({ teamId: 1, round: 1 });
ScoreSchema.index({ judgeName: 1, round: 1 });
ScoreSchema.index({ teamId: 1, judgeName: 1, round: 1 }, { unique: true });

export default mongoose.models.Score ||
  mongoose.model<IScore>('Score', ScoreSchema, 'scores');
