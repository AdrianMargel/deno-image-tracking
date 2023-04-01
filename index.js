import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const logoImg=await Deno.readFile('./logo.png');

const handler=(request)=>{
	const ua=request.headers.get("user-agent")??"Unknown";

	const head=new Headers();
	head.set('content-type','image/png');

	let img=logoImg;

	return new Response(img, {
		headers: head,
		status: 200
	});
};

serve(handler);