import { ChromaClient } from "chromadb";
import constants from "./constants";
import dotenv from "dotenv";
dotenv.config();
console.log(process.env.CHROMADB_URL);

const chroma = new ChromaClient({
  path: process.env.CHROMADB_URL,
  // Replace with your Chroma server address
});

async function getClosestDocs(query: string) {
  const collection = await chroma.getOrCreateCollection({
    name: constants.EMBEDDINGS_COLLECTION,
  });

  const closestDocs = await collection.query({
    queryTexts: [query],
    nResults: 2,
  });
  const { documents, metadatas, distances } = closestDocs;

  return { documents, metadatas, distances };
}

export { getClosestDocs };
