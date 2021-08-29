const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  permissionLevel: Number,
});

exports.findById = (id) => {
  return User.findById(id).then((result) => {
    result = result.toJSON();
    delete result._id;
    delete result.__v;
    return result;
  });
};
