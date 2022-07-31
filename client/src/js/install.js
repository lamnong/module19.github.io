const butInstall = document.getElementById('buttonInstall');
console.log(butInstall);

let installPrompt;

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    console.log("before install prompt");
    installPrompt = event;
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    console.log("CLICKING");
    if (installPrompt !== null) {
        installPrompt.prompt();
        const { outcome } = await installPrompt.userChoice;
        if (outcome === 'accepted') {
            installPrompt = null;
        }
    } else {
        console.log("ALREADY INSTALLED");
    }
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log("app installed");
    installPrompt = null;
});
