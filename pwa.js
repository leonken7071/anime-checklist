// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(() => console.log('✅ Service Worker Registered'))
      .catch(err => console.log('SW failed:', err));
  });
}

// Install prompt handler
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;

  showInstallButton();
});

function showInstallButton() {
  const btn = document.createElement('button');

  btn.innerText = "📲 Install App";
  btn.style.position = "fixed";
  btn.style.bottom = "20px";
  btn.style.right = "20px";
  btn.style.zIndex = "9999";
  btn.style.padding = "12px 18px";
  btn.style.borderRadius = "12px";
  btn.style.border = "none";
  btn.style.background = "#4CAF50";
  btn.style.color = "white";
  btn.style.fontSize = "16px";
  btn.style.cursor = "pointer";

  btn.onclick = async () => {
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    btn.remove();
  };

  document.body.appendChild(btn);
}
