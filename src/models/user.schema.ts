import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const userSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            minlength: 5,
            maxlength: 50,
            required: true
        },
        lastName: {
            type: String,
            minlength: 5,
            maxlength: 50,
            required: true
        }
    },
    email: {
        type: String,
        minlength: 5,
        maxlength: 300,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 5,
        maxlength: 1024,
        required: true
    },
    role: {
        type: [String],
        default: 'user'
    },
    created: {
        type: Date,
        default: Date.now
    },
})

userSchema.pre('save', async function (next: mongoose.HookNextFunction) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        const hash = await bcrypt.hash(this['password'], 10);
        this['password'] = hash;
        return next();
    } catch (err) {
        return next(err)
    }
})