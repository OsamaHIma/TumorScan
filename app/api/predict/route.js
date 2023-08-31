import { Image } from "image-js";
import { loadLayersModel  } from "@tensorflow/tfjs";
import { NextResponse } from "next/server";
import { parse } from "querystring";

const ALLOWED_EXT = new Set(["jpg", "jpeg", "png", "jfif"]);
const classes = ["Meningioma", "Glioma", "Pituitary"];
const modelPath = "/ai/model.h5";
const x_rayImage = "/ai/chest.jpeg";
function allowedFile(filename) {
  const extension = filename.split(".").pop();
  return ALLOWED_EXT.has(extension.toLowerCase());
}

async function predict(imageData, model) {
  const img = await Image.load(imageData);
  const resized = img.resize({ width: 256, height: 256 });
  const tensor = resized.expandDims(0).div(255.0);

  const result = await model.predict(tensor).data();
  const dictResult = {};
  for (let i = 0; i < result.length; i++) {
    dictResult[result[i]] = classes[i];
  }

  const res = Array.from(result);
  res.sort();
  res.reverse();
  const prob = res.slice(0, 3);

  const probResult = [];
  const classResult = [];
  for (let i = 0; i < prob.length; i++) {
    probResult.push((prob[i] * 100).toFixed(3));
    classResult.push(dictResult[prob[i]]);
  }

  return { classResult, probResult };
}

export async function POST(req, res) {
  //   const { file } = req.body;

  //   if (!file) {
  //     return NextResponse.json(
  //       { error: "No file provided" },
  //       {
  //         status: 400,
  //       }
  //     );
  //   }

  //   if (!allowedFile(file.name)) {
  //     return NextResponse.json(
  //       {
  //         error: "Please upload images of jpg, jpeg, and png extension only",
  //       },
  //       { status: 400 }
  //     );
  //   }

//   const model = await loadLayersModel(`file://${modelPath}`);
//   const { classResult, probResult } = await predict(x_rayImage, model);

//   const predictions = {
//     class1: classResult[0],
//     class2: classResult[1],
//     class3: classResult[2],
//     prob1: probResult[0],
//     prob2: probResult[1],
//     prob3: probResult[2],
//   };
//   console.log(predictions);
  return NextResponse.json({ predictions:"hi" }, { status: 200 });
}

// export async function POST(req) {
//   // Do whatever you want
//   let body = '';
//   req.on('data', chunk => {
//     body += chunk.toString();
//   });
//   req.on('end', () => {
//     const { image } = parse(body);

//     return NextResponse.json({ message: "Image uploaded successfully" }, { status: 200 });
//   });
//   return NextResponse.json({ message: "Hello World" }, { status: 200 });
// }
