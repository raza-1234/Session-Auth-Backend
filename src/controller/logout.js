const logout = (req, res) => {
  req.session.destroy();
  res.clearCookie("session_id", { path: "/"});
  return res.status(200).json({"message": "logout successfully"});
}

module.exports = { logout }