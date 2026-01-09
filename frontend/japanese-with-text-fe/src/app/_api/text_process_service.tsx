'use server'
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Base_api from "./base_api";
import { saveData } from "../_cache/cache";
import LookupResponse from "../_types/lookupResponse";
import TranslateResponse from "../_types/translateResponse";

const BASE_URL = process.env.API_URL

class TextProcessService extends Base_api {

	constructor() {
		super()
	}

	async get_lookup(text: string): Promise<LookupResponse> {
		const url = `${BASE_URL}/lookup-text`
		const request = new Request(
			url,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ text: text })
			}
		)
		return this.do_request(request, "Unable to lookup text")
	}

	async get_translation(text: string[]): Promise<TranslateResponse> {
		const url = `${BASE_URL}/translate-text`

		const request = new Request(
			url,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ text_chunks: text })
			}
		)
		return this.do_request(request, "Unable to translate text")
	}
}

const service = new TextProcessService()

export async function lookupText(text: string): Promise<LookupResponse> {
	return service.get_lookup(text)
}

export async function analyzeText(formData: FormData) {
	const text = formData.get("text") as string

	let chunks = text.split("\n\n").filter(p => p.trim());

	if (chunks.length === 1) {
		chunks = text.split("\r\n\r\n").filter(p => p.trim());
		if (chunks.length === 1) {
			const words = text.split("。")
			const chunkSize = 5;
			chunks = []
			for (let i = 0; i < words.length; i += chunkSize) {
				chunks.push(words.slice(i, i + chunkSize).join(' '))
			}
		}
	}

	const firstLookup = await service.get_lookup(chunks[0])

	const data = {
		firstLookup,
		chunks: chunks
	}

	const id = await saveData(data)

	redirect(`/analyze?analysis=${id}`)
}

export async function translateText(text: string): Promise<TranslateResponse> {
	return await service.get_translation([text]);
}
