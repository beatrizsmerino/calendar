<header class="c-header c-container">
    <nav class="c-header-nav c-list--reset">
        <ul class="c-header-nav__list">
            <li class="c-header-nav__item">
                <a class="c-header-nav__link c-link <?php if($_GET['action'] == "calendar-1" || $_GET['action'] == "") { ?>is-active<?php } ?>" href="index.php?action=calendar-1">Calendar 1</a>
            </li>
            <li class="c-header-nav__item">
                <a class="c-header-nav__link c-link <?php if($_GET['action'] == "calendar-2") {?>is-active<?php } ?>" href="index.php?action=calendar-2">Calendar 2</a>
            </li>
            <li class="c-header-nav__item">
                <a class="c-header-nav__link c-link <?php if($_GET['action'] == "calendar-3") {?>is-active<?php } ?>" href="index.php?action=calendar-3">Calendar 3</a>
            </li>
        </ul>
    </nav>
</header>