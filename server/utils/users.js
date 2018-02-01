class Users {
  constructor () {
    this.users = [];
  }
  addUser(id, name) {
    var user = {id, name};
    this.users.push(user);
    return user;
  }
  removeUser(id) {
    var user = this.getUser(id);

    if (user) {
      this.users = this.users.filter((user) => user.id !== id);
    }
    return user;
  }
  getUser(id) {
    return this.users.filter((user) => user.id === id)[0];
  }
  getUserList () {
    var namesArray = this.users.map((user) => user.name); // converts object to string - of name only, instead of object with id and name properties
    return namesArray;
  }
}

module.exports = {Users};
