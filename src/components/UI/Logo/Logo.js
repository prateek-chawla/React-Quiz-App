import React, { useEffect, useRef } from "react";
import styles from "./Logo.module.css";

const Logo = ({triggerLogoAnimation}) => {
	const logoRef = useRef(null);

	useEffect(() => {
		console.log(triggerLogoAnimation)
		const logo = logoRef.current;
		const animateLogo = () => {
			logo.style.opacity = 1;
			const logoPaths = logo.children;
			let delay = 0.2;
			for (const logoPath of logoPaths) {
				const strokeLength = parseInt(logoPath.getTotalLength() + 1);
				logoPath.style.strokeDasharray = strokeLength;
				logoPath.style.strokeDashoffset = strokeLength;
				logoPath.classList.add(styles.animateStroke);
				logoPath.style.animationDelay = `${delay}s`;
				delay += 0.15;
			}
			logo.classList.add(styles.animateFill);
			logo.style.animationDelay = `${++delay}s`;
		};

		animateLogo();
	}, []);

	return (
		<div>
			<svg
				className={styles.logoContainer}
				ref={logoRef}
				width="511"
				height="182"
				x="5"
				y="5"
				viewBox="0 0 521 192"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M12.4352 16.2C20.5685 5.66666 34.7685 0.399994 55.0351 0.399994C75.3018 0.399994 89.4352 5.66666 97.4352 16.2C105.435 26.6 109.435 45.2 109.435 72C109.435 98.8 105.435 117.467 97.4352 128C89.4352 138.4 75.3018 143.6 55.0351 143.6C34.7685 143.6 20.5685 138.4 12.4352 128C4.43515 117.467 0.43515 98.8 0.43515 72C0.43515 45.2 4.43515 26.6 12.4352 16.2ZM55.0351 16.2C41.4351 16.2 32.0352 20.2667 26.8352 28.4C21.6352 36.4 19.0351 50.9333 19.0351 72C19.0351 93.0667 21.6352 107.667 26.8352 115.8C32.0352 123.8 41.4351 127.8 55.0351 127.8C68.5018 127.8 77.8352 123.8 83.0352 115.8C88.3685 107.667 91.0352 93.0667 91.0352 72C91.0352 50.9333 88.3685 36.4 83.0352 28.4C77.8352 20.2667 68.5018 16.2 55.0351 16.2ZM41.8352 160.2L46.8351 149.6C61.5018 156 79.1685 160.667 99.8352 163.6L94.2352 181.2C76.9018 177.733 59.4352 170.733 41.8352 160.2Z"
					stroke="white"
					strokeWidth="3"
					strokeLinecap="square"
				/>
				<path
					d="M220.224 43.6V141H206.624L205.424 127C190.758 138.067 176.758 143.6 163.424 143.6C145.691 143.6 136.824 134.667 136.824 116.8V43.6H153.824V112C153.691 118.133 154.824 122.467 157.224 125C159.624 127.533 163.624 128.8 169.224 128.8C174.158 128.8 179.158 127.733 184.224 125.6C189.291 123.333 195.624 119.733 203.224 114.8V43.6H220.224Z"
					stroke="white"
					strokeWidth="3"
					strokeLinecap="square"
				/>
				<path
					d="M256.687 2.19999H264.687C268.153 2.19999 269.887 3.93333 269.887 7.39999V18.8C269.887 22.2667 268.153 24 264.687 24H256.687C253.22 24 251.487 22.2667 251.487 18.8V7.39999C251.487 3.93333 253.22 2.19999 256.687 2.19999ZM269.087 141H252.287V43.6H269.087V141Z"
					stroke="white"
					strokeWidth="3"
					strokeLinecap="square"
				/>
				<path
					d="M377.696 127.2V141H295.296V127.2L357.896 57.6H295.896V43.6H377.096V57.6L314.296 127.2H377.696Z"
					stroke="white"
					strokeWidth="3"
					strokeLinecap="square"
				/>
				<path
					d="M422.449 141H404.849V2.99998H422.449V141Z"
					stroke="white"
					strokeWidth="3"
					strokeLinecap="square"
				/>
				<path
					d="M479.793 57V114.2C479.793 118.867 480.793 122.2 482.793 124.2C484.793 126.2 488.193 127.2 492.993 127.2H507.793L509.793 140.2C503.66 141.933 496.326 142.8 487.793 142.8C479.66 142.8 473.46 140.533 469.193 136C464.926 131.467 462.793 124.933 462.793 116.4V57H445.193V44.6L462.793 43.8V14.8H479.793V43.6H510.793V57H479.793Z"
					stroke="white"
					strokeWidth="3"
					strokeLinecap="square"
				/>
			</svg>
		</div>
	);
};

export default Logo;
