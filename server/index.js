import cors from "cors"
import express from "express"
import { download } from "./download.js"
import { transcribe } from "./transcribe.js"
import { Summarize } from "./summarize.js"
import { convert } from "./convert.js"
const app = express()
app.use(express.json())
app.use(cors())

app.get("/summary/:id", async (req, res) => {
  try {
    await download(req.params.id)
    const audioConverted = await convert()
    const result = await transcribe(audioConverted)
    console.log(result, "aqui era pra vir o resultado")
    
    return res.json({ result })
  } catch (error) {
    console.log(error)
    return res.json({ error })
  }
})
/*
app.get("/summary", (req, res) => {
  res.send("ID do video:" + req.params.id)
})
*/

app.post("/summary", async (req, res) => {
  try {
    const result = await Summarize(req.body.text)
    return res.json({ result })
  } catch (error) {
    return res.json({ error })
  }
})
app.listen(3333, () => console.log("Server is Running on port 3333"))
