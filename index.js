import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import {
  MongoClient,
  ObjectId,
} from "https://deno.land/x/atlas_sdk@v1.1.0/mod.ts";

const client = new MongoClient({
	endpoint: "https://us-west-2.aws.data.mongodb-api.com/app/data-bduil/endpoint/data/v1",
	dataSource: "Main-Cluster",
	auth: {
		apiKey: Deno.env.get("MONGO_API_KEY"),
	},
});

const db=client.database("image-tracking");
const tracks=db.collection("tracks");

const logoImg=await Deno.readFile('./logo.png');

const handler=(request)=>{
	const ua=request.headers.get("user-agent")??"Unknown";
	const url=request.url;
	if(url.includes(".png")){
		const head=new Headers();
		head.set('content-type','image/png');

		const img=logoImg;

		tracks.insertOne({
			_id: new ObjectId(),
			ua: ua,
			url: url,
			key: url.split("/").pop().split(".")[0],
			time: new Date().getTime()
		});
		return new Response(img, {
			headers: head,
			status: 200
		});
	}
	return new Response(null, {
		status: 404
	});
};

serve(handler);