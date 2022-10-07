const Role = require("_helpers/role");
const accountService = require("../services/account.service");

exports.authenticate = (req, res, next) => {
  const { email, password } = req.body;
  const ipAddress = req.ip;
  accountService
    .authenticate({ email, password, ipAddress })
    .then(({ refreshToken, ...account }) => {
      setTokenCookie(res, refreshToken);
      res.json(account);
    })
    .catch(next);
};

exports.refreshToken = (req, res, next) => {
  const token = req.cookies.refreshToken;
  const ipAddress = req.ip;
  accountService
    .refreshToken({ token, ipAddress })
    .then(({ refreshToken, ...account }) => {
      setTokenCookie(res, refreshToken);
      res.json(account);
    })
    .catch(next);
};

exports.revokeToken = (req, res, next) => {
  // accept token from request body or cookie
  const token = req.body.token || req.cookies.refreshToken;
  const ipAddress = req.ip;

  if (!token) return res.status(400).json({ message: "Token is required" });

  // users can revoke their own tokens and admins can revoke any tokens
  if (!req.user.ownsToken(token) && req.user.role !== Role.Admin) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  accountService
    .revokeToken({ token, ipAddress })
    .then(() => res.json({ message: "Token revoked" }))
    .catch(next);
};

exports.register = (req, res, next) => {
  accountService
    .register(req.body, req.get("origin"), res)
    .then(() =>
      res.json({
        message:
          "Registration successful, please check your email for verification instructions",
      })
    )
    .catch(next);
};

exports.verifyEmail = (req, res, next) => {
  accountService
    .verifyEmail(req.body)
    .then(() =>
      res.json({ message: "Verification successful, you can now login" })
    )
    .catch(next);
};

exports.forgotPassword = (req, res, next) => {
  accountService
    .forgotPassword(req.body, req.get("origin"))
    .then(() =>
      res.json({
        message: "Please check your email for password reset instructions",
      })
    )
    .catch(next);
};

exports.validateResetToken = (req, res, next) => {
  accountService
    .validateResetToken(req.body)
    .then(() => res.json({ message: "Token is valid" }))
    .catch(next);
};

exports.resetPassword = (req, res, next) => {
  accountService
    .resetPassword(req.body)
    .then(() =>
      res.json({ message: "Password reset successful, you can now login" })
    )
    .catch(next);
};

//////////////////////////////////////////////////////////////////////////////
exports.getAll = (req, res, next) => {
  accountService
    .getAll(req.params)
    .then((accounts) => res.json(accounts))
    .catch(next);
};

exports.banUser = (req, res, next) => {
  accountService
    .banUser(req.body.id)
    .then((data) => res.json({ ...data, message: "User banned" }))
    .catch(next);
};

exports.activateUser = (req, res, next) => {
  accountService
    .activateUser(req.body.id)
    .then((data) =>
      res.json({ ...data, message: "User activated successfully" })
    )
    .catch(next);
};

exports.getInfo = async (req, res, next) => {
  accountService
    .userInfo(req.user.id)
    .then((data) => res.status(200).json(data))
    .catch(next);
};

exports.getById = (req, res, next) => {
  // users can get their own account and admins can get any account
  if (req.params.id !== req.user.id && req.user.role !== Role.Admin) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  accountService
    .getById(req.params.id)
    .then((account) => (account ? res.json(account) : res.sendStatus(404)))
    .catch(next);
};

exports.create = (req, res, next) => {
  accountService
    .create(req.body)
    .then((account) => res.json(account))
    .catch(next);
};

exports.update = (req, res, next) => {
  // users can update their own account and admins can update any account
  if (req.params.id !== req.user.id && req.user.role !== Role.Admin) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  accountService
    .update(req.params.id, req.body)
    .then((account) => res.json(account))
    .catch(next);
};

exports._delete = (req, res, next) => {
  // users can delete their own account and admins can delete any account
  if (req.params.id !== req.user.id && req.user.role !== Role.Admin) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  accountService
    .delete(req.params.id)
    .then(() => res.json({ message: "Account deleted successfully" }))
    .catch(next);
};

// helper functions

function setTokenCookie(res, token) {
  // create cookie with refresh token that expires in 7 days
  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  };
  res.cookie("refreshToken", token, cookieOptions);
}
