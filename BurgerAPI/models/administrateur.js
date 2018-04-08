const Administrateur = function(fname, lname, login, password, isConnect) {

    this.name = fname;
    this.lname = lname;
    this.login = login;
    this.password = password;
    this.isConnect = isConnect || false;
  };

module.exports = Administrateur;
