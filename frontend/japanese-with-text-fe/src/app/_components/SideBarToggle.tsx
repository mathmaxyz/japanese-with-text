import { useSidebarStore } from "../_state/sidebarStore";

export default function SideBarToggle() {
	const { isOpen, setIsOpen } = useSidebarStore();

	const handleClick = () => {
		setIsOpen(!isOpen);
	}

	return (
		<button className="side-bar-toggle" onClick={handleClick}>
			{isOpen && (<svg className="toggle-icon-right" width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M5.5 5L11.7929 11.2929C12.1834 11.6834 12.1834 12.3166 11.7929 12.7071L5.5 19" stroke="var(--yellow)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
				<path d="M13.5 5L19.7929 11.2929C20.1834 11.6834 20.1834 12.3166 19.7929 12.7071L13.5 19" stroke="var(--yellow)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
			</svg>)}
			{!isOpen && <svg className="toggle-icon-right" width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M19 19L12.7071 12.7071C12.3166 12.3166 12.3166 11.6834 12.7071 11.2929L19 5" stroke="var(--yellow)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
				<path d="M11 19L4.70711 12.7071C4.31658 12.3166 4.31658 11.6834 4.70711 11.2929L11 5" stroke="var(--yellow)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
			</svg>}
		</button>
	)
}
