import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import {
  Bson,
  MongoClient,
} from "https://deno.land/x/mongo@LATEST_VERSION/mod.ts";

const dbClient=new MongoClient();
// Connect to Mongo Atlas Database
await client.connect({
  db: "image-tracking",
  tls: true,
  servers: [
    {
      host: "main-cluster.tyflron.mongodb.net",
      port: 27017,
    },
  ],
  credential: {
    username: "adrian",
    password: Deno.env.get("MONGO_PASSWORD"),//yeah, not a chance I was going to put that here directly
    db: "image-tracking",
    mechanism: "SCRAM-SHA-1",
  },
});
const db=client.database("image-tracking");
const tracks=db.collection("tracks");

const logoImg=await Deno.readFile('./logo.png');

const handler=(request)=>{
	const ua=request.headers.get("user-agent")??"Unknown";
	const url=request.url;

	const head=new Headers();
	head.set('content-type','image/png');

	const img=logoImg;
	const insertId=await tracks.insertOne({
		ua,
		url,
	});

	return new Response(img, {
		headers: head,
		status: 200
	});
};

serve(handler);