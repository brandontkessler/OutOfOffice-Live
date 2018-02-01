class Users {
  constructor () {
    this.users = [];
  }
  addUser(id, name) {
    var user = {id, name};
    this.users.push(user);
    return user;
  }
  getUser(id) {
    return this.users.filter((user) => user.id === id)[0];
  }
  removeUser(id) {
    var user = this.users.filter((user) => user.id === id)[0];

    if (user) {
      this.users = this.users.filter((user) => user.id !== id);
    }
    return user;
  }
  getUserList () {
    return this.users;
  }
}

module.exports = {
  Users
};
