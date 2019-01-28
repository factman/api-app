/*
* File /auth/controller.js
* @desc It handles User users Login and Signup
* @author 4Dcoder
* @date 13 July 2018
* @params publicAddress for metamask
*
*/

import ethUtil from "ethereumjs-util";
import jwt from "jsonwebtoken";
import Admin from "./../admin/model";
import Vendor from "./../vendor/model";
import Customer from "./../customer/model";
import { randomNonce } from "./../../services/helpers";

const SECRET = process.env.SECRET || "some funny secret password";
let User = null;

// ///////////////////////////////////////////////////
// 1. First, find the record with public Address
// /:userType/:authType/publicaddress/:publicAddress
// //////////////////////////////////////////////////
exports.find = (req, res, next) => {
  const { userType, authType, publicAddress } = req.params;
  console.log(`User Type: ${userType} Auth Type: ${authType} publicAddress: ${publicAddress}`);
  if (!userType || !authType || !publicAddress) {
    return res.status(400)
      .json({
        success: false,
        data: {},
        message: "Request should have a Metamask address or auth  and user type",
      });
  }

  switch (userType) {
    case "admin": User = Admin;
      break;
    case "vendor": User = Vendor;
      break;
    case "customer": User = Customer;
      break;
    default: User = null;
  }

  return User.findOne({ publicAddress }).exec()
    .then((user) => {
      if ((!user && authType === "login") || (user && authType === "signup")) {
        const msg = authType === "login" ? "is not found, please signup" : "ialready exist, please login";
        res.status(401)
          .json({
            success: false,
            data: {},
            message: `User with publicAddress ${publicAddress} ${msg} `,
          });
      }

      // Create a User
      if ((!user && authType === "signup")) {
        const newUser = new User({
          publicAddress,
          username: "",
          fullname: "",
          phone: "",
          address: "",
          email: "",
        });

          // Save User in the database
        newUser.save()
          .then((record) => {
            res.status(200)
              .json({
                success: true,
                data: { publicAddress, nonce: record.nonce, authType: "signup" },
                message: "new User record has been created",
              });
          })
          .catch((err) => {
            res.status(500)
              .json({
                success: false,
                data: {},
                message: err.message || "Some error occurred while creating the User.",
              });
          });
      }
      if ((user && authType === "login")) {
        res.status(200)
          .json({
            success: true,
            data: { publicAddress, nonce: user.nonce, authType },
            message: "Record found!",
          });
      }
    })
    .catch(next);
};

// ///////////////////////////////////////////////////
// 2. Secondly, the signed message is posted with publicAddress
// /{post} /:userType/auth/:authType Authenticate
// body { signature, publicAddress }
// returns the accessToken if Authentication is successful
// //////////////////////////////////////////////////
exports.auth = (req, res, next) => {
  const { signature, publicAddress } = req.body;
  const { userType, authType } = req.params;
  console.log(`${signature}, ${publicAddress} ${userType}, ${authType}`);
  if (!signature || !publicAddress) {
    return res.status(400)
      .json({
        success: false,
        data: {},
        message: "Request should have signature and publicAddress",
      });
  }

  switch (userType) {
    case "admin": User = Admin;
      break;
    case "vendor": User = Vendor;
      break;
    case "customer": User = Customer;
      break;
    default: User = null;
  }

  return User.findOne({ publicAddress }).exec()

  // //////////////////////////////////////////////////
  // Step 1: Get the user with the given publicAddress
  // //////////////////////////////////////////////////

    .then((user) => {
      if (!user) {
        res.status(401)
          .json({
            success: false,
            data: {},
            message: `User with publicAddress ${publicAddress} is not found in database. Signup`,
          });
      }
      return user;
    })

  // //////////////////////////////////////////////////
  // Step 2: Verify digital signature
  // //////////////////////////////////////////////////

    .then((user) => {
      const msg = `I am signing my one-time nonce: ${user.nonce} to ${authType}`;

      // We now are in possession of msg, publicAddress and signature. We
      // can perform an elliptic curve signature verification with ecrecover
      const msgBuffer = ethUtil.toBuffer(msg);
      const msgHash = ethUtil.hashPersonalMessage(msgBuffer);
      const signatureBuffer = ethUtil.toBuffer(signature);
      const signatureParams = ethUtil.fromRpcSig(signatureBuffer);
      const publicKey = ethUtil.ecrecover(
        msgHash,
        signatureParams.v,
        signatureParams.r,
        signatureParams.s,
      );
      const addressBuffer = ethUtil.publicToAddress(publicKey);
      const address = ethUtil.bufferToHex(addressBuffer);

      // The signature verification is successful if the address found with
      // ecrecover matches the initial publicAddress
      if (address.toLowerCase() !== publicAddress.toLowerCase()) {
        res.status(401)
          .json({
            success: false,
            data: {},
            message: "Signature verification failed",
          });
      }
      return user;
    })

  // //////////////////////////////////////////////////
  // Step 3: Generate a new nonce for the user
  // //////////////////////////////////////////////////

    .then((user) => {
      user.nonce = randomNonce();
      return user.save()
        .then(data => data)
        .catch((err) => {
          res.status(500)
            .json({
              success: false,
              data: {},
              message: err.message || "Error occurred while creating user record",
            });
        });
    })

  // //////////////////////////////////////////////////
  // Step 4: Create JWT
  // //////////////////////////////////////////////////

    .then(user =>
      new Promise((resolve, reject) =>
      // https://github.com/auth0/node-jsonwebtoken
        jwt.sign(
          {
            payload: {
              id: user.id,
              publicAddress,
            },
          },
          SECRET,
          null,
          (err, token) => {
            if (err) {
              return reject(err);
            }
            return resolve(token);
          },
        )))
    .then((accessToken) => {
      res.status(200)
        .json({
          success: true,
          data: { accessToken },
          message: "Authentication successful!",
        });
    })
    .catch(next);
};
