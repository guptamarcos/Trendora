import { z } from "zod";

const ImageSchema = z
  .instanceof(File)
  .refine((file) => file.size <= 2*1024*1024 , {
    message: "Max file size is 2 MB"
  })
  .refine((file)=> ["image/jpeg", "image/png", "image/webp","image/jpg"].includes(file.type),{
    message: "Only JPG, JPEG, PNG, Webp are allowed",
  })


export default ImageSchema;