import express from "express"
import tutores from "./tutoresRoutes.js"

const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send({message: "Adopet"})
    })

    app.use(
        express.json(),
        tutores
    )
}

export default routes