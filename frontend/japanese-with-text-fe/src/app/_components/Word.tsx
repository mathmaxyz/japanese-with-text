'use client'
import "../_styles/word.css"
import { useState, useRef, useEffect } from "react";
import DefinedWord from "../_types/definedWord";
import { autoUpdate, useFloating, useRole, useClick, useDismiss, useInteractions, autoPlacement, size, offset, flip, shift, useId } from '@floating-ui/react';
import BottomModal from "./BottomModal";
import Tooltip from "./Tooltip"
import { useIsMobile } from "../_utils/useIsMobile";
import DictEntryDisplay from "./dictEntryDisplay";

export default function Word({ definedWord }: { definedWord: DefinedWord }) {


	const [isOpen, setIsOpen] = useState(false);

	const isMobile = useIsMobile(600);

	const handleOpenChange = (open: boolean) => {
		setIsOpen(open);
		if (!open) {
			(document.activeElement as HTMLElement)?.blur();
		}
	};

	const { refs, floatingStyles, context, middlewareData } = useFloating({
		open: isOpen,
		onOpenChange: handleOpenChange,
		middleware: [
			offset(5),
			autoPlacement({ padding: 10 }),
			shift({ padding: 10, crossAxis: true }),
			size({
				apply({ availableHeight, elements }) {
					Object.assign(elements.floating.style, {
						maxHeight: `${availableHeight}px`,
						overflow: 'auto'
					});
				},
				padding: 10,
			}),
		],
		whileElementsMounted: autoUpdate,
	})

	useEffect(() => {
		if (isOpen && middlewareData) {
			console.log("shift data: ", middlewareData.shift);
		}
	}, [isOpen, middlewareData]);

	const click = useClick(context);
	const dismiss = useDismiss(context, {
		outsidePressEvent: "mousedown",
	});
	const role = useRole(context);

	const { getReferenceProps, getFloatingProps } = useInteractions([
		click,
		dismiss,
		role,
	])

	const getDictEntryDisplays = () => {
		return (
			definedWord.dict_entries.map((entry, index) => (
				<DictEntryDisplay key={index} entry={entry}></DictEntryDisplay>
			))
		)
	}

	return (
		<>
			<button className="word-button" ref={refs.setReference} {...getReferenceProps()}>{definedWord.original_word}</button>
			{isOpen && (
				isMobile ? (
					<BottomModal setFloating={refs.setFloating} getFloatingProps={getFloatingProps}
						onClose={() => setIsOpen(false)}>
						{getDictEntryDisplays()}
					</BottomModal>
				) : (
					< Tooltip onClose={() => setIsOpen(false)} setFloating={refs.setFloating} floatingStyles={floatingStyles} getFloatingProps={getFloatingProps}>
						{getDictEntryDisplays()}
					</Tooltip >
				)
			)
			}
		</>
	)

}
