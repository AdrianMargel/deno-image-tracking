import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const handler = (request) => {
	const body = `Your user-agent is:\n\n${
		request.headers.get("user-agent") ?? "Unknown"
	}`;

	return new Response(body, { status: 200 });
};

serve(handler);