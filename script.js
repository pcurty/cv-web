document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", function () {
    const reduireMouvement = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    lancerFrappe(reduireMouvement);
    activerCopie();
});

function lancerFrappe(reduireMouvement) {
    const commande = document.getElementById("commande");
    const elements = document.querySelectorAll(".apparition");

    function toutAfficher() {
        elements.forEach(function (element) {
            element.classList.add("visible");
        });
    }

    if (!commande || reduireMouvement) {
        toutAfficher();
        return;
    }

    const texte = commande.textContent;
    const curseur = document.createElement("span");
    curseur.className = "curseur";
    curseur.setAttribute("aria-hidden", "true");
    commande.textContent = "";
    commande.after(curseur);

    let position = 0;

    setTimeout(function () {
        const minuterie = setInterval(function () {
            position++;
            commande.textContent = texte.slice(0, position);

            if (position === texte.length) {
                clearInterval(minuterie);
                setTimeout(function () {
                    curseur.remove();
                    toutAfficher();
                }, 350);
            }
        }, 110);
    }, 400);
}

function activerCopie() {
    const bouton = document.querySelector(".bouton-copier");

    if (!bouton || !navigator.clipboard) {
        return;
    }

    bouton.hidden = false;
    const libelle = bouton.textContent;
    let minuterie;

    bouton.addEventListener("click", function () {
        navigator.clipboard
            .writeText(bouton.dataset.copie)
            .then(function () {
                bouton.textContent = "[copié]";
            })
            .catch(function () {
                bouton.textContent = "[échec]";
            })
            .finally(function () {
                clearTimeout(minuterie);
                minuterie = setTimeout(function () {
                    bouton.textContent = libelle;
                }, 2000);
            });
    });
}