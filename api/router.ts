import { Router } from "express"
import { createProfile, deleteProfile, getProfiles, getProfile, updateProfile } from "./profiles"
import { createUser, deleteUser, getUsers, getUser, updateUser } from "./users"
import checkSession from "./middleware/check-session"
import reqAdmin from "./middleware/req-admin"
import Login from "./login"
import Register from "./register"
import getAccessToken from "./middleware/get-access-token"
import { Logic } from "../logic/logic"

const router = Router()

router.post("/logic", Logic)
router.post("/login", Login)
router.post("/register", Register)
router.post("/get-token", getAccessToken)

router.get("/profiles", [checkSession, reqAdmin, getProfiles])
router.get("/profile", [checkSession, getProfile])
router.post("/profile", [checkSession, createProfile])
router.put("/profile", [checkSession, updateProfile])
router.delete("/profile/:id", [checkSession, reqAdmin, deleteProfile])

router.get("/users", [checkSession, reqAdmin, getUsers])
router.get("/user", [checkSession, getUser])
router.post("/user", [checkSession, createUser])
router.put("/user", [checkSession, updateUser])
router.delete("/user/:id", [checkSession, reqAdmin, deleteUser])

export { router }
