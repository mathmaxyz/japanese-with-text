import SavedWord from "../_types/savedWord";
import Base_api from "./base_api"

class AnkiDeckService extends Base_api {
	constructor() {
		super()
	}

	async create_anki_deck(savedWords: SavedWord[], name: string): Promise<Blob | undefined> {
		const url = `${this.base_client_url}/create-anki-deck`;
		const request = new Request(
			url,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ mined_words: savedWords, name: name })
			}
		)

		const blob = await this.do_blob_request(request, "Unable to create anki deck");

		return blob;
	}
}

const service = new AnkiDeckService();

export async function createAnkiDeck(savedWords: SavedWord[], name: string): Promise<string> {
	const result = await service.create_anki_deck(savedWords, name);
	if (result) {
		return URL.createObjectURL(result);
	}

	console.error("Deck generation failed");
	//TODO:need to actually create user visible feedback for this with some type of toast
	return ""
}
