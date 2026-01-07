'use client'
import "../_styles/spinner.css"
import { useRef } from 'react';
import { useSuspenseHeight } from "../_utils/useSuspenseHeight";

export default function Spinner({ text }: { text: string }) {

	const height = useSuspenseHeight(text);

	return (
		<div className="suspense-paragraph" style={{ height: `${height}px` }}>
		</div>
	)
}
