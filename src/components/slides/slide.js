import React from 'react';
import { css, merge } from 'glamor';
import { beta, copy } from '../../style/components/type';

const slides__slide = css({
	label: "slides__slide",
	height: "100vh",
	width: "100vw",
	position: "relative",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	overflow: "auto"
});


export function Slide({
	title,
	children,
	contentSlide,
	advance,
	slideCount,
	slide
}) {

	const content = children
		?
		children
		:
		<div className="row align-center" onClick={ advance }>
			<div className="column small-12 large-6">
				<h2 className={ beta }>{ slide.title }</h2>
				<p className={ `${copy} u-text-center u-inline-block` } dangerouslySetInnerHTML={{__html: slide.__content}} />
			</div>
		</div>

	const justify = contentSlide ? css({
		justifyContent: "flex-start",
		'@media screen and (min-width: 640px)': {
			justifyContent: "center",
		}
	}) : null;

	return(
		<div { ...merge(slides__slide, justify) }>
			<div className="u-full-width">
				<div className="row align-center">
					<div className="column small-12 u-text-center">
						{ content }
					</div>
				</div>
			</div>
		</div>
	)

}
