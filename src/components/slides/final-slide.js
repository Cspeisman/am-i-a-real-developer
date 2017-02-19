import React from 'react';
import { css } from 'glamor';
import { Button } from '../button/button';
import { 
	alphaSmall, 
	gamma, 
	copy, 
} from '../../style/components/type';
import { TimelineLite, Elastic } from 'gsap';
import { uniqueId as loUniqueId } from 'lodash';

const slide__content = css({
	height: 'calc(100vh - 8em)',
	overflow: 'auto',
	paddingTop: '12vmin',
	paddingBottom: '1em',
	pointerEvents: 'auto'
});
const buttonContainer = css({
	display: 'flex',
	justifyContent: 'space-between',
	flexDirection: 'column',
	"@media screen and (min-width: 640px)": {
		flexDirection: 'row',
	},
})

export class FinalSlide extends React.Component {
	constructor() {
		super();
		this.state = {
			animateBorder: false
		}
	}
	shouldComponentUpdate(nextProps) {
		if (this.props.isSuccessful !== nextProps.isSuccessful || this.props.isReady !== nextProps.isReady) {
			return true;
		}
		return false;
	}
	componentWillMount() {
		// dunno why can't pass element as ref to anim, need get hacky w/ ids
		this.bodyUniqueId = loUniqueId();
		this.TL = new TimelineLite();
	}
	componentDidUpdate() {
		if (this.props.isReady) {
			console.log('play');
			this.TL = new TimelineLite();
			this.TL.staggerFrom('#conclusion-headline span', 2, {
				delay: 1, 
				y: "-40%", 
				opacity: 0, 
				ease: Elastic.easeOut.config(1, 0.2),
				onComplete: () => {
					
				}
			}, 0.05)
			.staggerFrom(`#body-${this.bodyUniqueId} > div`, 0.8, {
				y: "-20%", 
				opacity: 0, 
				ease: Elastic.easeOut.config(1, 0.9)
			}, 0.1, "-=1.5")
			this.TL.pause();
			this.TL.play();

			setTimeout(() => {
				if (this.props.isSuccessful) {
					this.props.onSuccess();
				}
			}, 2000);
		}
	}

	render() {
		console.log('render');
		return (
			<div className={slide__content}>
				<h1 {...alphaSmall}>
					{
						this.props.isSuccessful ? 
						<span id="conclusion-headline">
								{spanSplit('Congrats!')}
						</span>
						: 
						<span id="conclusion-headline">
							{spanSplit('No worries!')}
						</span>
					}
				</h1>
				<div id={`body-${this.bodyUniqueId}`}>
					<div className={'row align-center'}>
						<div className="column small-12 u-text-center">
							<p className={ gamma }>
								{
									this.props.isSuccessful ? 
									'Looks like you ARE a real developer!' :
									"It's ok to not be a developer."
								}
							</p>
						</div>
					</div>
					<div className={'row align-center'}>
						<div className="column small-12 medium-8 large-7 xlarge-6 u-text-left">
							<p className={ copy }>
								{
									this.props.isSuccessful ? 
									`Don't ever let anybody tell you that you're anything less than you are. No developer gets to be "more" developer than anybody else. Nobody gets to be the arbiter of "realness".`  :
									`Even if you're not a developer, don't let people take you down a peg by defining for you what you know yourself to be. You don't need to "sling code" or whatever to have value. If you're not a developer that's cool.`
								}
							</p>
						</div>
					</div>
					<div className={'row align-center'}>
						<div className="column small-12 medium-8 large-7 xlarge-6 u-text-left">
							<p className={ copy }>
								{
									this.props.isSuccessful ? 
									`Are you a real developer? 💩 yeah.` : 
									`If you do want to be a developer though, hit the button down thattaways 👇🏾 and check out some awesome free resources at Codecademy.com.`									
								}
							</p>
						</div>
					</div>
					<div className={'row align-center'}>
						<div className={`column small-12 medium-11 large-8 ${buttonContainer}`}
							style={{maxWidth: '38rem'}}
						>
							<Button
								href={"http://eli.wtf"}
							>
								Share on the twitters ✌️🏾
							</Button>
							<Button
								href={"http://eli.wtf"}
							>
								Check out Codecademy 🚀
							</Button>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

function spanSplit(string) {
	return string.split('').map((char, index) => (
		char === ' ' ? <span key={index}>&nbsp;</span> : <span key={index}>{char}</span>
	));
}
