const jwt = require("jsonwebtoken");
const { user } = require("../models");

const graphqlAuth = async (req) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return { user: null };
    }

    const token = authHeader.split(" ")[1]; // Bearer TOKEN
    if (!token) {
      return { user: null };
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.userId);

    if (!user || !user.isActive) {
      return { user: null };
    }

    return { user: user.getPublicProfile() };
  } catch (error) {
    return { user: null };
  }
};

module.exports = graphqlAuth;
