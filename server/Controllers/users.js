const User = require("../models/User")
const _ = require("lodash");
const bcrypt = require("bcrypt")
const { validation, validatelogin } = require("../helpers/validation")






module.exports.register = async (req, res) => {
  try {
    let error = await validation(req.body)
    if (error) {
      return res.status(400).send(error.details[0].message)
    }

    let existUser = await User.findOne({ where: { email: req.body.email } })

    if (existUser) {
      return res.send({ msg: "already regeisterd" })
    }

    let newUser = User.build(req.body)

    let saltRound = 10;
    let salt = await bcrypt.genSalt(saltRound)
    newUser.password = await bcrypt.hash(newUser.password, salt)

    await newUser.save()

    newUser.generateToken()

    let data = _.pick(newUser, ["firstName", "email"])

    return res.status(200).cookie("accessToken", newUser.token, {
      httpOnly: true
    }).send({ user: data, message: "thanks for register" })
  } catch (e) {
    return res.status(500).send(e.message)
  }
}






module.exports.login = async (req, res) => {
  try {
    let error = await validatelogin(req.body)
    if (error) {
      return res.status(400).send(error.details[0].message)
    }

    let loginUser = await User.findOne({ where: { email: req.body.email } })
    if (!loginUser) {
      return res.status(400).send("email or password is wrong")
    }

    let match = await bcrypt.compare(req.body.password, loginUser.password)

    if (!match) {
      return res.status(400).send("email or password is wrong")
    }

    loginUser.generateToken()


    let data = _.pick(loginUser, ["firstName", "lastName", "email"])
    return res.status(200).cookie("accessToken", loginUser.token, {
      httpOnly: true
    }).send(data)
  } catch (e) {
    return res.status(500).send(e?.errors?.[0].message)
  }
}


module.exports.logOut = (req, res, next) => {
  res.clearCookie("accessToken", {
    secure: true,
    sameSite: 'none'
  }).status(200).send({ msg: 'user has been logged out', success: true })
}
