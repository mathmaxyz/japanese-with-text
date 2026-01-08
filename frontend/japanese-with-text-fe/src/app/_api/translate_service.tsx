'use server'
import Base_api from "./base_api"
import TranslateResponse from "../_types/translateResponse"

const BASE_URL = process.env.API_URL;

class TranslateService extends Base_api {
	constructor() {
		super();
	}

	async get_translation(text: string) {
		const url = `${BASE_URL}/translate-text`;
		const request = new Request(
			url,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ text_chunks: [text] })
			}
			return this.do_request(request, "Unable to translate text")
		)
	}


}
