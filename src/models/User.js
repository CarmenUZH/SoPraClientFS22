/**
 * User model
 */
class User {
  constructor(data = {}) {
    this.id = null;
    this.userId = null;
    this.password = null;
    this.username = null;
    this.birthday = null;
    this.creation_date=null;
    this.token = null;
    this.logged_in = null;
    Object.assign(this, data); //assigns User the thingys
  }
}
export default User;
