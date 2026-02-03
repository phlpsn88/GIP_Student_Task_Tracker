<?php
include("navbar.html");
?>

<!DOCTYPE html>
<html lang="nl">

<head>
    <meta charset="UTF-8">
    <title>Login</title>
    <link rel="stylesheet" href="homepangina.css" />
    <link rel="stylesheet" href="login.css">
</head>

<body>
    <main>
        <div class="main_body">
            <div class="hero">
                <h1>Welcome to<br><span>R&A TASKS</span></h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vestibulum nec sollicitudin arcu. Fusce sed imperdiet lectus,
                    nec convallis turpis.
                </p>
                <a href="#" class="btn">More Info</a>
            </div>
            <div class="logo_spiraal">
                <img src="img/width_1600.webp" alt="">
            </div>
        </div>
        <div class="overlay" id="loginModal">
            <div class="login-modal"> 
                <div class="close-btn">
                    <a href="index.php">X</a>
                </div>

                <h1>Login</h1>

                <label for="email">E-mailadres</label>
                <input id="email" type="email">

                <label for="password">Wachtwoord</label>
                <input id="password" type="password">

                <button>Inloggen</button>

                <div class="register">
                    Heb je nog geen account?<br>
                    Meld je dan <a href="#">HIER</a> aan
                </div>
            </div>
        </div>
    </main>

</body>
<?php
    include("footer.html");
?>
</html>