const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose
  .connect(url)
  .then((result) => {
    console.log(result)
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  number: {
    type: String,
    minlength: [8, 'Phone number must be at least 8 characters long'],
    validate: {
      validator: function (v) {
        return /\d{2,3}-\d{4,}/.test(v)
      },
      message: (props) =>
        `${props.value} is not a valid phone number (xx/xxx-xxxx)!`,
    },
    required: [true, 'User phone number required'],
  },
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})
module.exports = mongoose.model('Phonebook', userSchema)
