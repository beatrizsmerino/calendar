<!DOCTYPE html>
<html lang="en" class="c-page c-sticky">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Web</title>
    <link rel="stylesheet" href="dist/css/styles.min.css">
</head>
<body class="c-page__body c-sticky__body">
    <div class="c-sticky__content">
        <?php include 'views/modules/header.php' ?>

        <main class="c-page__main c-container">
            <section>
                <?php
                    $mvc = new MvcController();
                    $mvc -> pageLinksController();
                ?>
            </section>
        </main>
    </div>

    <div class="c-sticky__footer">
        <?php include 'views/modules/footer.php' ?>
    </div>

    <script src="dist/js/scripts.min.js"></script>

</body>
</html>