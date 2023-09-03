import { Image } from "image-js";
import { NextResponse } from "next/server";
import { loadLayersModel } from "@tensorflow/tfjs";
import { parse } from "querystring";

// const ALLOWED_EXT = new Set(["jpg", "jpeg", "png", "jfif"]);
// const classes = ["Meningioma", "Glioma", "Pituitary"];
const modelPath = "./model.json";
// const x_rayImage = "/AI models/chest.jpeg";
// function allowedFile(filename) {
//   const extension = filename.split(".").pop();
//   return ALLOWED_EXT.has(extension.toLowerCase());
// }

// async function predict(imageData, model) {
//   const img = await Image.load(imageData);
//   const resized = img.resize({ width: 256, height: 256 });
//   const tensor = resized.expandDims(0).div(255.0);

//   const result = await model.predict(tensor).data();
//   const dictResult = {};
//   for (let i = 0; i < result.length; i++) {
//     dictResult[result[i]] = classes[i];
//   }

//   const res = Array.from(result);
//   res.sort();
//   res.reverse();
//   const prob = res.slice(0, 3);

//   const probResult = [];
//   const classResult = [];
//   for (let i = 0; i < prob.length; i++) {
//     probResult.push((prob[i] * 100).toFixed(3));
//     classResult.push(dictResult[prob[i]]);
//   }

//   return { classResult, probResult };
// }

export async function POST(req, res) {
  const model = await loadLayersModel(
    "https://tumor-scan.vercel.app/model.json",
    // "/AI models/group1-shard1of19.bin",
    // "/AI models/group1-shard2of19.bin",
    // "/AI models/group1-shard3of19.bin",
    // "/AI models/group1-shard4of19.bin",
    // "/AI models/group1-shard5of19.bin",
    // "/AI models/group1-shard6of19.bin",
    // "/AI models/group1-shard7of19.bin",
    // "/AI models/group1-shard8of19.bin",
    // "/AI models/group1-shard9of19.bin",
    // "/AI models/group1-shard10of19.bin",
    // "/AI models/group1-shard11of19.bin",
    // "/AI models/group1-shard12of19.bin",
    // "/AI models/group1-shard13of19.bin",
    // "/AI models/group1-shard14of19.bin",
    // "/AI models/group1-shard15of19.bin",
    // "/AI models/group1-shard16of19.bin",
    // "/AI models/group1-shard17of19.bin",
    // "/AI models/group1-shard18of19.bin",
    // "/AI models/group1-shard19of19.bin"
  );
  // const { classResult, probResult } = await predict(x_rayImage, model);

  return NextResponse.json({ predictions: "hi" }, { status: 200 });
}
