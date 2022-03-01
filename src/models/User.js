/**
 * User model
 */
class User {
  constructor(data = {}) {
    this.id = null;
    this.password = null;
    this.username = null;
    this.birthday = null;
    this.logintime=null;
    this.token = null;
    this.status = null;
    Object.assign(this, data); //assigns User the thingys
  }
}
export default User;
