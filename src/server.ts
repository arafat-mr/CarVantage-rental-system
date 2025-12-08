import { app, port } from "./app"

app.listen(port, () => {
  console.log(` App listening on port ${port}`)
})