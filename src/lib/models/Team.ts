import mongoose, { Document, Schema } from 'mongoose';

export interface ICertificate {
  participantName: string;
  certificateDataUrl: string;
  generatedAt: Date;
}

export interface ITeam extends Document {
  teamName: string;
  leaderName: string;
  member2: string;
  member3?: string;
  domain: 'vibecoding' | 'agenticai' | 'uiux';
  submissionUrl: string;
  certificates: ICertificate[];
  createdAt: Date;
}

const CertificateSchema = new Schema<ICertificate>({
  participantName: { type: String, required: true },
  certificateDataUrl: { type: String, required: true },
  generatedAt: { type: Date, default: Date.now }
});

const TeamSchema = new Schema<ITeam>({
  teamName: { type: String, required: true, unique: true },
  leaderName: { type: String, required: true },
  member2: { type: String, required: true },
  member3: { type: String },
  domain: { type: String, enum: ['vibecoding', 'agenticai', 'uiux'], required: true },
  submissionUrl: { type: String, required: true },
  certificates: [CertificateSchema],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Team || mongoose.model<ITeam>('Team', TeamSchema);
