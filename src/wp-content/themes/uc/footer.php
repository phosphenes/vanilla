<section id="contactSection" class="dark exhibit reverseHeader" data-range-margin="50">
	<main class="vertical animate fromTop">

		<h1>Say Hello</h1>
		<form id="footerContact">
			<label>
				<input class="reqField" type="text" name="firstname" />
				<span>First Name</span>
			</label>
			<label>
				<input class="reqField" type="text" name="lastname" />
				<span>Last Name</span>
			</label>
			<label>
				<input class="reqField" type="text" name="email" />
				<span>Email</span>
			</label>
			<label>
				<input class="reqField" type="text" name="company" />
				<span>Company</span>
			</label>
			<label class="textarea">
				<textarea class="reqField" name="message" onresize=""></textarea>
				<span>Message</span>
			</label>

			<button onclick="goog_report_conversion('<?php echo get_permalink(get_the_ID()); ?>');">Send</button>
			<input type="hidden" name="pType" value="contactSubmission" tabindex="-1"/>
		</form>

	</main>
</section>

<section id="locationsSection" class="exhibit exhibitOnOnly" data-range-margin="80">
	<main class="vertical animate fromTop">
		<h2>Our <span class="pink">Worldwide</span> Locations</h2>
		<div id="locations">
			<div class="location">
				<h3>USA</h3>
				<b>Xinova, LLC</b><br />3150 139th Ave SE, Bldg 4<br />Bellevue, WA 98005<br />USA
			</div>

			<div class="location">
				<h3>Japan</h3>
				<b>Xinova Japan GK</b><br />Tamachi East Wing 5F <br />3-5- 39 Shibaura, Minato-ku <br />Tokyo 108-0023 Japan
			</div>

			<div class="location">
				<h3>China</h3>
				<b>Xinova Innovation (Beijing) Consultancy Co. Ltd.</b><br />
				Unit 22F-2201B, Tower 3 <br />
				China Central Place<br />
				No. 77 Jianguo Road<br />
				Chaoyang District<br />
				Beijing 100025 China<br />
			</div>

			<div class="location">
				<h3>Singapore</h3>
				<b>Xinova Asia Pte Ltd.</b><br />150 Beach Road <br />#08-06/08 Gateway W. <br />189720 Singapore
			</div>

			<div class="location">
				<h3>Korea</h3>
				<b>Xinova Korea Yuhan Hoesa</b><br />4th Floor, 262 <br />Itaewon-ro, Yongsan-gu <br />Seoul 04400 Korea
			</div>

			<div class="location">
				<h3>Australia</h3>
				<b>Xinova Australasia Pty Ltd.</b><br />Suite 1, Level 18<br />227 Elizabeth Street<br />Sydney NSW 2000
			</div>

			<div class="location">
				<h3>India</h3>
				<b>Xinova India Consulting Private Ltd.</b><br />No. 701, Raheja Paramount <br />No. 138 Residency Road <br />Bangalore 560025 India
			</div>
		</div>

		<div style="margin-top: 20px;">Affiliate offices in <b>Israel and Germany</b></div>

	</main>
</section>

<footer class="dark">
	<main class="center vertical">
		<img class="footerLogo" src="/wp-content/themes/uc/images/footerLogo.png" style="margin-bottom: 10px">
		<div class="socNetButtons">
			<a class="icon fa fa-facebook socNetButton" href="https://www.facebook.com/thinkxinova/" target="_blank"></a>
			<a class="icon fa fa-twitter socNetButton" href="https://twitter.com/thinkxinova" target="_blank"></a>
			<a class="icon fa fa-vimeo socNetButton" href="https://vimeo.com/xinova" target="_blank"></a>
			<a class="icon fa fa-linkedin socNetButton" href="https://www.linkedin.com/company/12901573?trk=tyah&trkInfo=clickedVertical%3Acompany%2CclickedEntityId%3A12901573%2Cidx%3A2-2-3%2CtarId%3A1475250712300%2Ctas%3Axinova" target="_blank"></a>
		</div>
		<div class="miceType">XINOVA and THINK BEYOND are service marks of Xinova, LLC.  All rights reserved. <?php wp_nav_menu(array('menu' => 'Footer Nav', 'container_class' => 'footerMenu')); ?></div>
	</main>
</footer>









<!---->
<!---->
<!--	<!-- Modal -->-->
<!--	<div class="modal fade" id="video1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">-->
<!--		<div class="modal-dialog" role="document">-->
<!--			<div class="modal-content">-->
<!--				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>-->
<!--				<div class="modal-body">-->
<!--					<!--<iframe width="100%" height="420" src="https://www.youtube.com/embed/l4tPrcePdGM" frameborder="0" allowfullscreen></iframe>-->-->
<!--					<iframe width="900" id="ytplayer1" height="506" src="https://www.youtube.com/embed/lsAL7rITEnQ?autoplay=0" frameborder="0" autostart="true" allowfullscreen></iframe>-->
<!--				</div>-->
<!--			</div>-->
<!--		</div>-->
<!--	</div>-->
<!---->
<!---->
<!---->
<!--	<!-- Modal -->-->
<!--	<div class="modal fade" id="video2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">-->
<!--		<div class="modal-dialog" role="document">-->
<!--			<div class="modal-content">-->
<!--				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>-->
<!--				<div class="modal-body">-->
<!--					<!--<iframe width="100%" height="420" src="https://www.youtube.com/embed/l4tPrcePdGM" frameborder="0" allowfullscreen></iframe>-->-->
<!--					<iframe width="900" id="ytplayer2" height="506" src="https://www.youtube.com/embed/ubT-G-wMbp4?autoplay=0" frameborder="0" autostart="true" allowfullscreen></iframe>-->
<!--				</div>-->
<!--			</div>-->
<!--		</div>-->
<!--	</div>-->
<!---->
<!--	<!-- Services Modal -->-->
<!--	<div class="modal fade" id="video4" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">-->
<!--		<div class="modal-dialog" role="document">-->
<!--			<div class="modal-content">-->
<!--				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>-->
<!--				<div class="modal-body">-->
<!---->
<!--					<iframe width="900" id="ytplayer4" height="506" src="https://www.youtube.com/embed/LJW1BU6Ouys?autoplay=0" frameborder="0" autostart="true" allowfullscreen></iframe>-->
<!--				</div>-->
<!--			</div>-->
<!--		</div>-->
<!--	</div>-->
<!---->
<!--	<!-- this is idf -->-->
<!--	<div class="modal fade" id="video3" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">-->
<!--		<div class="modal-dialog" role="document">-->
<!--			<div class="modal-content">-->
<!--				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>-->
<!--				<div class="modal-body">-->
<!--					<!--<iframe width="100%" height="420" src="https://www.youtube.com/embed/l4tPrcePdGM" frameborder="0" allowfullscreen></iframe>-->-->
<!--					<iframe width="900" id="ytplayer3" height="506" src="https://www.youtube.com/embed/BS8nKrIxGHQ?autoplay=0" frameborder="0" autostart="true" allowfullscreen></iframe>-->
<!--				</div>-->
<!--			</div>-->
<!--		</div>-->
<!--	</div>-->
<!---->
<!--	<!-- RFI Explainer Home - How to Join Network-->-->
<!--	<div class="modal fade" id="video5" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">-->
<!--		<div class="modal-dialog" role="document">-->
<!--			<div class="modal-content">-->
<!--				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>-->
<!--				<div class="modal-body">-->
<!---->
<!--					<iframe width="900" id="ytplayer5" height="506" src="https://www.youtube.com/embed/HbSo2HmmyWA?autoplay=0" frameborder="0" autostart="true" allowfullscreen></iframe>-->
<!--				</div>-->
<!--			</div>-->
<!--		</div>-->
<!--	</div>-->
<!---->
<!--	<!-- RFI Explainer Home - Why Invent with IVIDF -->-->
<!---->
<!--	<div class="modal fade" id="video6" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">-->
<!--		<div class="modal-dialog" role="document">-->
<!--			<div class="modal-content">-->
<!--				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>-->
<!--				<div class="modal-body">-->
<!---->
<!---->
<!--					<iframe width="900" id="ytplayer6" height="506" src="https://www.youtube.com/embed/ZkTB5XwIG-A?autoplay=0" frameborder="0" autostart="true" allowfullscreen></iframe>-->
<!--				</div>-->
<!--			</div>-->
<!--		</div>-->
<!--	</div>-->
<!---->






<?php wp_footer(); ?>






</body>
</html>
