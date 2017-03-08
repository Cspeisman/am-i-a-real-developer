import React, { Component } from 'react';
import { css, merge as mergeStyles } from 'glamor';
import { Slide } from './slide';
import { HighlightSlide } from './highlight-slide';
import { FinalSlide } from './final-slide';
import { questions } from '../../questions.js'
import * as slideContents from '../../content';

const slides = css({
	label: "slides",
	height: "100vh",
	width: "100vw",
	overflow: "hidden",
	position: "relative",
	zIndex: 1
});

let slides__carrier = css({
	transition: "all 1s",
	label: "slides__carrier"
});

let slides__translation = css({
	transform: `translateY(0%)`
});

export class Slides extends Component {
	constructor(props) {
		super(props);
		this.state = {
			slide: 0,
		};
		this.advance = this.advance.bind(this);
	}

	advance() {
		if (this.state.slide === 0) {
			this.props.makeHeaderVisible();
		}

		if (this.state.slide < Object.keys(slideContents).length + 1) {
			const nextSlide = this.state.slide + 1;
			const translation = -(100 / ((Object.keys(slideContents).length+2) / nextSlide));
			slides__translation = css({
				transform: `translateY(${translation}%)`
			});

			this.setState({slide: nextSlide});
		}
	}


	generateQuestions() {
		return Object.keys(slideContents).map(function(key, index){
			return (
				<Slide
					advance={ this.advance }
					title={`# ${index + 1}`}
					key={index}
					slide={slideContents[key]}
					slideCount={index + 1}
				/>
			)
		}.bind(this))
	}

	render() {
		return(
			<div { ...slides }>
				<div { ...mergeStyles(slides__carrier, slides__translation) }>
				<Slide
					key={0}
				>
					<HighlightSlide
						advance={this.advance}
						primaryContent={'Presenation'}
						secondaryContent={'Title'}
						copy={`designed and built by: Eli Fetch`}
						buttonText={'Let\'s Go!'}
					/>
				</Slide>

				{ this.generateQuestions() }

				<Slide
					key={"final"}
					contentSlide={true}
				>
					<FinalSlide
						isSuccessful={true}
						isReady={this.state.slide === Object.keys(slideContents).length}
						onSuccess={this.props.onSuccess}
					/>
				</Slide>

				</div>
			</div>
		);
	}
}
