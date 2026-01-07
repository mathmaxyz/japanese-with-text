import "../_styles/analyze.css"
import { Suspense } from "react";
import { getData } from "../_cache/cache";
import Spinner from "../_components/spinner"
import { lookupText } from "../_api/text_process_service";
import LookupParagraph from "../_components/lookupParagraph";

export default async function AnalysisPage({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {

	const params = await searchParams
	const id = Array.isArray(params.analysis) ? params.analysis[0] : params.analysis
	const resultsData = await getData(id)
	console.log("got data: ", resultsData)
	let firstLookup;
	let chunks;
	if (resultsData !== null) {
		firstLookup = resultsData.firstLookup
		chunks = resultsData.chunks
	}

	return (
		<section className=".main-content">
			<section className="analyzed-text">
				<LookupParagraph chunk={chunks[0]} lookupData={firstLookup} />
				{chunks.slice(1).map((chunk: string, index: number) => (
					<Suspense key={index} fallback={<Spinner text={chunk} />}>
						<LookupParagraph chunk={chunk} lookupData={null} />
					</Suspense>
				))}
			</section>
		</section>
	)
}
