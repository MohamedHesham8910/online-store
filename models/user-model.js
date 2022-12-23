const db = require("../data/database");
const bcrypt = require("bcryptjs");

class User {
  constructor(email, password, name, street, city, code) {
    this.email = email;
    this.password = password;
    this.name = name;
    this.address = {
      street: street,
      city: city,
      code: code,
    };
  }

  async signup() {
    const hashedPassword = await bcrypt.hash(this.password,12);

    await db.getDB()
      .collection("users")
      .insertOne({
        email: this.email,
        password: hashedPassword,
        name: this.name,
        address: this.address,
      });
  }

  getUser(){
    return db.getDB().collection('users').findOne({email: this.email})
  }

  checkPassword(hashedPassword){
    return bcrypt.compare(this.password,hashedPassword);
  }
}

module.exports = User;