<?php 
$isHome = ($post->post_name == 'home') ? true: false;
?>



<footer>
    <main>
        <div class="legal">&copy; <?php echo date('Y'); ?> Company Name</div>
        <div class="links">
            <?php wp_nav_menu(array('menu' => 'Footer Menu', 'container_class' => 'footerMenu')); ?>
        </div>
    </main>
</footer>

<a id="backToTop" href="#top" title="Back to top"></a>

<?php wp_footer(); ?>


</body>
</html>