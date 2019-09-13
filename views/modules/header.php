
    <header class="c-header">
        <nav class="c-header-nav">
            <ul class="c-header-nav__list c-list__no">
                <li class="c-header-nav__item">
                    <a class="c-header-nav__link <?php if($_GET['action'] == "calendar-1") { ?>is-active<?php } ?>" href="index.php?action=calendar-1">Calendar 1</a>
                </li>
                <li class="c-header-nav__item">
                    <a class="c-header-nav__link <?php if($_GET['action'] == "calendar-2") {?>is-active<?php } ?>" href="index.php?action=calendar-2">Calendar 2</a>
                </li>
            </ul>
        </nav>
    </header>