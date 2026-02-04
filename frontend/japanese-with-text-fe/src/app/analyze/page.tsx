import "../_styles/analyze.css"
import { Suspense } from "react";
import { getData } from "../_cache/cache";
import Spinner from "../_components/spinner"
import { lookupText } from "../_api/text_process_service";
import LookupParagraph from "../_components/lookupParagraph";
import SavedWordsView from "../_components/SavedWordsView";
import { useIsMobile } from "../_utils/useIsMobile";
import { useSidebarStore } from "../_state/sidebarStore";
import AnalyzedText from "../_components/AnalyzedText";

export default async function AnalysisPage({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {

	const params = await searchParams
	const id = Array.isArray(params.analysis) ? params.analysis[0] : params.analysis
	const resultsData = await getData(id)
	let firstLookup;
	let chunks;
	if (resultsData !== null) {
		firstLookup = resultsData.firstLookup
		chunks = resultsData.chunks
	}

	return (
		<section className="main-content">
			<section className="analysis-container">
				<AnalyzedText>					<LookupParagraph chunkId={0} chunk={chunks[0]} lookupData={firstLookup} />
					{chunks.slice(1).map((chunk: string, index: number) => (
						<Suspense key={index} fallback={<Spinner text={chunk} />}>
							<LookupParagraph chunkId={index + 1} chunk={chunk} lookupData={null} />
						</Suspense>
					))}
				</AnalyzedText>
				<SavedWordsView />
			</section>
		</section >
	)
}
