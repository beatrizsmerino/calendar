<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Calendar</title>

    <link rel="stylesheet" href="./dist/css/styles.min.css">
</head>

<body>
    <header class="c-header">
        <nav class="c-header-nav">
            <ul class="c-header-nav__list c-list__no">
                <li class="c-header-nav__item">
                    <a class="c-header-nav__link <?php if($pageTitle === "Home") { ?>is-active<?php } ?>" href="index.php">Home</a>
                </li>
                <li class="c-header-nav__item">
                    <a class="c-header-nav__link <?php if($pageTitle === "Calendar 1") { ?>is-active<?php } ?>" href="calendar1.php">Calendar 1</a>
                </li>
                <li class="c-header-nav__item">
                    <a class="c-header-nav__link <?php if($pageTitle === "Calendar 2") { ?>is-active<?php } ?>" href="calendar2.php">Calendar 2</a>
                </li>
            </ul>
        </nav>
    </header>