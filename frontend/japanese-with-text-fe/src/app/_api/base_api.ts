export default class Base_api {
	base_url: string
	base_client_url: string

	constructor() {
		this.base_url = process.env.API_URL ? process.env.API_URL : "http://localhost:8000"
		this.base_client_url = process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL : "http://localhost:8000"
	}

	async do_request(request: Request | null, message: string) {
		try {
			const response = await this.fetch_request(request)
			if (!response.ok) {
				throw new Error(`${message}: ${response.statusText}`)
			}

			const result = await response.json()
			return result
		} catch (error: any) {
			console.error(error)
		}
	}

	async do_blob_request(request: Request | null, message: string) {
		try {
			const response = await this.fetch_request(request)
			if (!response.ok) {
				throw new Error(`${message}: ${response.statusText}`)
			}

			const result = await response.blob()
			return result
		} catch (error: any) {
			console.error(error)
		}
	}

	async fetch_request(request: Request | null) {
		const response = await fetch(request)
		return response;
	}
}
