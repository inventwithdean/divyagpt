import {z} from "zod"

const formSchema = z.object({
    prompt: z.string().min(1, "Prompt is Required!")
})

export default formSchema