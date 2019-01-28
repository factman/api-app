import ethUtil from "ethereumjs-util";
import jwt from "jsonwebtoken";
import Customer from "../../../models/customer";

const SECRET = process.env.SECRET || "some funny secret password";

const create = (req, res, next) => {
  const { signature, publicAddress } = req.body;
  if (!signature || !publicAddress) {
    return res
      .status(400)
      .send({ error: "Request should have signature and publicAddress" });
  }
  return (
    Customer.findOne({ publicAddress })
      // //////////////////////////////////////////////////
      // Step 1: Get the customer with the given publicAddress
      // //////////////////////////////////////////////////
      .then((customer) => {
        if (!customer) {
          return res.status(401).send({
            error: `Customer with publicAddress ${publicAddress} is not found in database`,
          });
        }
        return customer;
      })
      // //////////////////////////////////////////////////
      // Step 2: Verify digital signature
      // //////////////////////////////////////////////////
      .then((customer) => {
        const msg = `I am signing my one-time nonce: ${customer.nonce}`;

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
        if (address.toLowerCase() === publicAddress.toLowerCase()) {
          return customer;
        }
        return res
          .status(401)
          .send({ error: "Signature verification failed" });
      })
      // //////////////////////////////////////////////////
      // Step 3: Generate a new nonce for the customer
      // //////////////////////////////////////////////////


      .then((customer) => {
        // //////////////////////////////////////////////////////////
        // This is necessary for to avoid eslint no-parameter-reassign
        // //////////////////////////////////////////////////////////
        const newCostomer = customer;
        newCostomer.nonce = Math.floor(Math.random() * 10000);
        return newCostomer.save();
      })
      // //////////////////////////////////////////////////
      // Step 4: Create JWT
      // //////////////////////////////////////////////////
      .then(customer =>
        new Promise((resolve, reject) =>
        // https://github.com/auth0/node-jsonwebtoken
          jwt.sign(
            {
              payload: {
                id: customer.id,
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
      .then(accessToken => res.json({ accessToken }))
      .catch(next)
  );
};

export default create;
