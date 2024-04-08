"use client";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

const token = Cookies.get("token");
const userDetails = jwt.decode(token);

export default userDetails;
