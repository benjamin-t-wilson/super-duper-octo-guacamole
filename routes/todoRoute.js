const router = require("express").Router();
const {insertNewTodo} = require("../services/todoService.js")

router.post("/new", async (req, res) => {
    const result = await insertNewTodo(req)

    return res.status(result.status).json(result.data);
})

module.exports = router;