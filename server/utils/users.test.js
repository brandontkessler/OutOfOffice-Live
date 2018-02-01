const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
  var users;
  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike'
    },
    {
      id: '2',
      name: 'Dave'
    },
    {
      id: '3',
      name: 'Pat'
    }]
  });

  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'Ben'
    }
    var resUser = users.addUser(user.id, user.name);

    expect(users.users).toEqual([user])
  });

  it('should remove a user', () => {
    var userId = '1';
    var user = users.removeUser(userId);

    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it('should not remove a user', () => {
    var userId = '99';
    var user = users.removeUser(userId);

    expect(user.id).toBeFalsy;
    expect(users.users.length).toBe(3);
  });

  it('should find user', () => {
    var userId = '2';
    var user = users.getUser(userId);

    expect(user.id).toBe(userId);
  });

  it('should not find user', () => {
    var userId = '99';
    var user = users.getUser(userId);

    expect(user).toBeFalsy;
  });

  it('should return names for all', () => {
    var userList = users.getUserList();

    expect(userList).toEqual(['Mike', 'Dave', 'Pat']);
  });

})
