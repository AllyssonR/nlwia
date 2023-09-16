import { pipeline } from "@xenova/transformers"

export async function Summarize(text) {
  try {
    console.log("realizando o resumo...")
    const generator = await pipeline(
      "summarization",
      "Xenova/distilbart-cnn-12-6"
    )
    const output = await generator(text)
    console.log("Resumo realizado com sucesso")
    return output[0].summary_text
  } catch (error) {
    console.log(`Não foi possivel relizar o resumo do texto ${error}`)
    throw new Error(error)
  }
}
