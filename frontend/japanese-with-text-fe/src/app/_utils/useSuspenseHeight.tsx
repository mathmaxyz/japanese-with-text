'use client'
import { useEffect, useState } from "react";

export function useSuspenseHeight(chunk: string) {

	const [height, setHeight] = useState(200);

	const calculateHeight = (text: string) => {
		const containerWidth = window.innerWidth - 10;
		const temp = document.createElement('div');
		temp.style.cssText = `
	      position: absolute;
	      visibility: hidden;
	      width: ${containerWidth}px;
	      font-size: 16px;
	      line-height: 4;
	      box-sizing: border-box;
	      word-wrap: break-word;
	      white-space: normal;
	    `;
		temp.textContent = text;

		document.body.appendChild(temp);
		const height = temp.offsetHeight;
		document.body.removeChild(temp);

		return height;
	};

	useEffect(() => {
		if (!chunk) return;

		const updateHeight = () => {
			const height = calculateHeight(chunk);
			setHeight(height);
		};

		updateHeight();

		window.addEventListener('resize', updateHeight);
		return () => window.removeEventListener('resize', updateHeight);
	}, [chunk]);

	return height;

}
