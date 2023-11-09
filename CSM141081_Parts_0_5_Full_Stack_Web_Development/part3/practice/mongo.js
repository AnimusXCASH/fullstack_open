const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const encodedPassword = encodeURIComponent(process.argv[2]);

const url = `mongodb+srv://Animus:${encodedPassword}@openuniversity.ap3ovlb.mongodb.net/phonebookApp?retryWrites=true&w=majority`;
console.log(url);

mongoose.set('strictQuery',false)
mongoose.connect(url)

const userSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const User = mongoose.model('Phonebook', userSchema)


if (process.argv.length === 5) {
    // Add new user to phonebook
    const userName = process.argv[3];
    const userNumber = process.argv[4];

    const user = new User({
        name: userName,
        number: userNumber,
    });

    user.save().then(result => {
        console.log(`added ${userName} number ${userNumber} to phonebook`);
        mongoose.connection.close();
    });
} else if (process.argv.length === 3) {
    User.find({}).then(result => {
        console.log("phonebook:");
        result.forEach(user => {
            console.log(`${user.name} ${user.number}`);
        });
        mongoose.connection.close();
    });
} else {
    console.log('Invalid number of arguments. Please provide either just password or password followed by name and number.');
    mongoose.connection.close();
}


