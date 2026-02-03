'use client'
import { analyzeText } from "../_api/text_process_service"
import { useState } from "react"
import "../_styles/textform.css"
import Form from "next/form"

export default function TextForm() {
	const [text, setText] = useState<string>("");

	const handleClick = () => {
		const button = document.getElementById("analyze-button");
		button.classList.add("loading");
	}

	return (
		<Form className="text-form" action={analyzeText}>
			<textarea value={text} onChange={(e) => setText(e.target.value)} className="text-box" name="text" />
			<div id="analyze-button" className="analyze-button-container">
				<button disabled={!text.trim()} id="analyze-button" className="action-button" onClick={handleClick} type="submit">Analyze</button>
			</div>
		</Form>
	)
}
