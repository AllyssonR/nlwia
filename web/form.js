import { server } from "./server"
const form = document.querySelector("#form")
const input = document.querySelector("#url")
const content = document.querySelector("#content")
form.addEventListener("submit", async (event) => {
  event.preventDefault()
  content.classList.add("placeholder")
  const videoUrl = input.value
  if (!videoUrl.includes("shorts")) {
    return (content.textContent = "esse video não parece ser um short")
  }

  const [_, params] = videoUrl.split("/shorts/")
  const [videoId] = params.split("?si")
  content.textContent = "Obtendo texto do áudio..."
  const transcription = await server.get("/summary/" + videoId)

  const summary = await server.post("summary/", {
    text: transcription.data.result,
  })
  console.log(summary)
  console.log(transcription)

  content.textContent = summary.data.result
  content.classList.remove("placeholder")
})
