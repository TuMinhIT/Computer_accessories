// import express from "express";
// import {
//     addEmployee,
//     activateEmployee,
//     getEmployees,
//     resendActivation,
//     changeEmployeePassword,
//     updateEmployee,
//     loginEmployee,
//     toggleBlockEmployee,
// } from "../controllers/employeeController.js";

// const router = express.Router();

// router.post("/", addEmployee);
// router.get("/", getEmployees);
// router.get("/activate/:token", activateEmployee);
// router.get("/resend-activation", resendActivation);
// router.post("/login", loginEmployee);
// router.post("/change-password", changeEmployeePassword);
// router.put("/:id", updateEmployee);
// router.put("/:id/toggle-block", toggleBlockEmployee);

// export default router;

import express from "express";
import {
    addEmployee,
    activateEmployee,
    getEmployees,
    resendActivation,
    changeEmployeePassword,
    updateEmployee,
    loginEmployee,
    toggleBlockEmployee,
    deleteEmployee,
} from "../controllers/employeeController.js";

const router = express.Router();

router.post("/", addEmployee);
router.get("/", getEmployees);
router.get("/activate/:token", activateEmployee);
router.get("/resend-activation", resendActivation);
router.post("/login", loginEmployee);
router.post("/change-password", changeEmployeePassword);
router.put("/:id", updateEmployee);
router.put("/:id/toggle-block", toggleBlockEmployee);
router.delete("/:id", deleteEmployee);

export default router;

