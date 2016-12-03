<?php
/**
 * Template Name: Home
 */

get_header();


$banner = (get_field('featured_image')) ? get_field('featured_image'): null;
$image = ($banner) ? $banner['sizes']['large']: '/wp-content/themes/uc/images/sample-1.jpg';
?>









<div class="pi-drawer dark" id="myFirstPiDrawer">
	<div class="drawer-wrapper">
		<button class="pi-modal-close-button"></button>
		<iframe id="videoFrame" src="https://player.vimeo.com/video/184605013" width="960" height="540" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""></iframe>
	</div>
</div>


<!--	<div class="container-wrapper">-->



<div id="intro">

	<section class="dark fullHeight exhibit exhibitOnOnly reverseHeader" data-range-margin="30" data-range-function="initTheThinking" id="thinkBeyond">
		<div class="imageBG" style="background-image: url(/wp-content/themes/uc/images/banner-cherries.jpg)"></div>
		<div class="imageBG" style="background-image: url(/wp-content/themes/uc/images/banner-building-1.jpg)"></div>
		<div class="imageBG" style="background-image: url(/wp-content/themes/uc/images/banner-skydive.jpg)"></div>
		<div class="imageBG" style="background-color: #212a34"></div>
		<main class="vertical center spaceBetween">

			<!--<img class="colorSplash" src="images/color-splash.jpg">-->
			<div class="colorSplash">
				<video class="colorSplashVideo" src="/wp-content/themes/uc/images/xin-splash-1c.mp4"></video>
				<img src="/wp-content/themes/uc/images/videoOverlay.png" />
			</div>

			<h1 class="animate fromLeft">think</h1>
			<h1 id="beyondText" class="animate fromLeft">b<span style="color: transparent">eyond</span>
				<span id="bWords">
					<span><span style="color: transparent">b</span>etter</span>
					<span><span style="color: transparent">b</span>old</span>
					<span><span style="color: transparent">b</span>rave</span>
					<span><span style="color: transparent">b</span>eyond</span>
				</span>
			</h1>

			<div class="introOutro">
				<a href="#whatWeDoSection" class="button">What we do</a>
			</div>
		</main>

		<svg class="halfHex" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 433 1000">
			<g>
				<polygon class="knockout" points="0 81.47 307.01 81.47 0 280 0 81.47"/>
				<polygon class="knockout" points="0 919.12 307.92 919.12 0 720 0 919.12"/>
			</g>
			<g>
				<polygon points="433 925.1 64.9 712.5 64.9 287.4 433 74.9 433 74.9 433 0 433 0 0 250 0 750 433 1000 433 1000 433 925.1"/>
			</g>
		</svg>
	</section>

</div>

<div id="introMobile">
	<img src="/wp-content/themes/uc/images/logo-text.png" />
	<img src="/wp-content/themes/uc/images/logo-mark.png" />
</div>

<section id="whatWeDoSection" class="exhibit exhibitOnOnly white" data-range-margin="80">
	<div class="stickyImage left animate fromLeft" style="background-image: url(/wp-content/themes/uc/images/circle-building.jpg)"></div>
	<main class="vertical animate fromRight">
		<h4>Xinova provides a full suite of innovation-related services, capabilities, and global connectivity.</h4><h4>We've built our company on a strong and simple idea:</h4>

		<div class="row">

			<div class="column">
				<h1>Structured</h1>
				<p>A tried-and-tested scientific <br />approach to innovation</p>
				<p>A rigorous process for defining <br />and solving problems</p>
				<p>A global network of innovators <br />who are vetted and ranked</p>
			</div>

			<div class="column">
				<h1>Creativity</h1>
				<p>An approach that generates <br />creative, imaginative leaps</p>
				<p>A fresh approach to developing new <br />products, services and companies</p>
				<p>A highly collaborative, <br />interdisciplinary way of working</p>
			</div>

		</div>

		<div class="buttonBox">
			<a href="#process">See our process in action</a>
		</div>
	</main>
</section>




<section id="videoSection" class="exhibit dark parallax" data-range-margin="40">
	<main class="vertical">
		<h1 class="animate fromTop">In their own words: <br>Xinova worldwide</h1>
		<button class="animate fromBottom" pi-drawer-trigger="myFirstPiDrawer">Play</button>
	</main>

	<style media="screen">
		.disable-scroll {
			height: 100%;
			overflow: hidden;
		}
	</style>
	<script src="https://player.vimeo.com/api/player.js"></script>
	<script>
		;(function(){
			var currentPlayer = null;

			window.player = {}
			window.player.playVideo = function(videoFrameID){
				var iframe = document.getElementById(videoFrameID)
				currentPlayer = new Vimeo.Player(iframe)

				currentPlayer.play()

				document.body.classList.add('disable-scroll')
			}
			window.player.resetVideo = function(){
				if (currentPlayer) {
					currentPlayer.pause()
					currentPlayer.unload()
					currentPlayer = null
				}

				document.body.classList.remove('disable-scroll')
			}
		})()
	</script>

</section>


<script>
	(function(){
		var parallax = document.querySelectorAll(".parallax"),
			speed = 0.5;
		window.onscroll = function(){
			[].slice.call(parallax).forEach(function(el,i){
				var windowYOffset = window.pageYOffset,
					elBackgrounPos = "50% " + (windowYOffset * speed) + "px";
				el.style.backgroundPosition = elBackgrounPos;
			});
		};
	})();
</script>

<div id="process">

	<section id="stepZero" class="dark fullHeight exhibit reverseHeader processSpacer" data-range-margin="50" data-range-function="switchProcessStep" data-process-step="0"></section>
	<section id="stepOne" class="dark fullHeight exhibit reverseHeader processSpacer" data-range-margin="50" data-range-function="switchProcessStep" data-process-step="1"></section>
	<section id="stepTwo" class="dark fullHeight exhibit reverseHeader processSpacer" data-range-margin="50" data-range-function="switchProcessStep" data-process-step="2"></section>
	<section id="stepThree" class="dark fullHeight exhibit reverseHeader processSpacer" data-range-margin="50" data-range-function="switchProcessStep" data-process-step="3"></section>
	<section id="stepFour" class="dark fullHeight exhibit reverseHeader processSpacer" data-range-margin="50" data-range-function="switchProcessStep" data-process-step="4"></section>
	<section id="processSteps" class="dark fullHeight exhibit" data-range-margin="50" data-scroll-center="process">
		<main>
			<div class="headers">
				<h2>What's your biggest challenge?</h2>
				<h2>Engage</h2>
				<h2>Define</h2>
				<h2>Innovate</h2>
				<h2>Activate</h2>
			</div>
			<div class="line"></div>
			<div class="actions">

				<div class="action noLines">
					<h2>What's your biggest challenge?</h2>
					Our structured creativity approach brings a global innovation community  together to seek successful solutions. To begin the process, we <a href="#stepOne">engage</a>.
				</div>

				<div class="action"><div class="mobileLine"></div>

					<h2>Engage</h2>
					Xinova professionals engage with clients to fully understand their biggest challenges. They then collaborate on an approach for generating viable solutions via the Innovation Network.

					<div class="client"><div>
							<h3>Client</h3>
							Establishes the collaborative relationship in which Xinova begins to learn about client business, needs, and goals.
						</div></div>

					<div class="inventor"><div>
							<h3>Innovator</h3>
							Joins the Xinova worldwide innovation network, gaining access to client challenges to begin solving, including collaborating with other members of the network.
						</div></div>

				</div>
				<div class="action flipLines"><div class="mobileLine"></div>
					<h2>Define</h2>
					Xinova helps the client define their goals and translate them into innovation opportunities. A Request For Invention (RFI) is then published to the Xinova Innovation Network.

					<div class="client"><div>
							<h3>Client</h3>
							Identifies the need for solution(s) to a business or technology challenge and shares it with Xinova.
						</div></div>

					<div class="inventor"><div>
							<h3>Innovator</h3>
							Gains the opportunity to consult, write RFIs and reports, and participate in co-invention sessions.
						</div></div>

				</div>
				<div class="action"><div class="mobileLine"></div>
					<h2>Innovate</h2>
					From Co-invention Sessions with our Innovation Network to our portfolio of prototypes or licensable patents, Xinova generates and refines forward-thinking solutions.

					<div class="client"><div>
							<h3>Client</h3>
							Leverages Xinova expertise to evaluate inventions and decide on the solution that best aligns with their goals.
						</div></div>

					<div class="inventor"><div>
							<h3>Innovator</h3>
							Submits solution ideas for evaluation for specific client challenge. Can also be engaged to evaluate inventions.
						</div></div>
				</div>
				<div class="action flipLines"><div class="mobileLine"></div>
					<h2>Activate</h2>
					Xinova conducts industry, technology, and competitive analyses to develop commercialization strategies that are best suited for each innovation.

					<div class="client"><div>
							<h3>Client</h3>
							Implements selected solution and gains market value through commercialization.
						</div></div>

					<div class="inventor"><div>
							<h3>Innovator</h3>
							Inventions selected for commercialization result in payment to inventors. For non-selected ideas, the inventor retains sole ownership.
						</div></div>
				</div>

			</div>
			<div class="line"></div>

			<nav>
				<a href="#stepZero">Our Process</a>
				<a href="#stepOne">Engage</a>
				<a href="#stepTwo">Define</a>
				<a href="#stepThree">Innovate</a>
				<a href="#stepFour">Activate</a>
			</nav>
			<!--<div class="progress">-->

			<!--</div>-->
		</main>
		<a id="processButton" class="arrowButton down bounce"><span></span></a>
	</section>

</div>


<section id="aboutUsSection" class="exhibit exhibitOnOnly white" data-range-margin="50">
	<div class="stickyImage right animate fromRight" style="background-image: url(/wp-content/themes/uc/images/leaf-bg.jpg)"></div>
	<main class="vertical animate fromLeft">
		<h1>Innovation made new</h1>
		<h4>Xinova was established to build a global innovation network.</h4>
		<div class="columnContent">
			<p>We innovate on behalf of our many customers in a variety of industries, ranging from leading multinational food-and-beverage and credit card companies to startups and regional Small & Medium Enterprises (SMEs).</p>
			<p>Xinova cultivates working relationships with innovators worldwide through its 10,000-strong global innovation network, representing more than 100 research institutes, universities, and companies.</p>
			<p>Our name combines two different words for ‘new’, one from the East and one from the West. We’re a global company with clients worldwide that has developed a new, unique approach to innovation. Xinova is innovation made new.</p>

		</div>

		<div class="buttonBox">
			<a href="#contactSection">Say Hello</a>
		</div>
	</main>
</section>




			<?php

			include 'flex-content.php';

			get_footer();
			?>
