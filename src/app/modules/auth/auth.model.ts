import { model, Schema } from 'mongoose';
import { TUser, UserModel } from './auth.interface';
import config from '../../config';
import bcrypt from 'bcrypt';
import { Role } from './auth.constant';

const UserSchema = new Schema<TUser, UserModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: {
        values: Role,
        message: '{VALUE} is not supported',
      },
      default: 'user',
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// post '' after save middleware in db
UserSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

UserSchema.statics.isUserExistsByCustomEmail = async function (email: string) {
  return AuthModel.findOne({ email }).select('password');
};

UserSchema.statics.isUserPasswordMatch = async function (
  plainTextPass,
  hasPass,
) {
  return await bcrypt.compare(plainTextPass, hasPass);
};

export const AuthModel = model<TUser, UserModel>('User', UserSchema);
