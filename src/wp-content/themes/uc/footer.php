<?php 
$isHome = ($post->post_name == 'home') ? true: false;
?>



<footer>
    <main>
	    <a id="emailUs" class="fa fa-envelope-o" href="#"> E-mail Us</a><a id="faxUs" class="fa fa-fax" href="#"> (425) 376-0596</a><a id="callUs" class="fa fa-phone" href="#"> (425) 558-4224</a>
	    <p>8060 165th Avenue NE, Ste 100  |  Redmond, WA 98052</p>
	    <div id="micetype">&copy; <?php echo date('Y')?> NWCCU. All rights reserved.</div>
    </main>
</footer>

<a id="backToTop" href="#top" title="Back to top"></a>

<?php wp_footer(); ?>


</body>
</html>