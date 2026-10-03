(function() {
    const _0x4f22 = {
        'a': 'QWxwaW5lMzIh',
        'b': 'DOOM',
        'c': 'The classic 1993 FPS ported to Firefox OS',
        'd': 'Awesome Game',
        'e': 'The best game for Firefox OS',
        'f': 'Utility Tool',
        'g': 'Clean up your device quickly',
        'h': 'Web Browser Plus',
        'i': 'Faster browsing for ZTE Open',
        'm': 'MPCE',
        'n': 'The original Minecraft Pocket Edition demo',
        'dwtd': 'Dumb Ways To Die',
        'dwtd_desc': 'The original cult classic'
    };
    const _0xdecode = (s) => atob(_0x4f22[s]);
    const _0xstr = (s) => _0x4f22[s] || s;

    const apps = [
        { 
            id: 'dwtd', 
            name: _0xstr('dwtd'), 
            description: _0xstr('dwtd_desc'), 
            manifestUrl: "../dwtd/manifest.webapp", 
            launchUrl: "../dwtd/index.html", 
            icon: "Logo.png" 
        },
        { 
            id: 'doom', 
            name: _0xstr('b'), 
            description: _0xstr('c'), 
            manifestUrl: "../doom/manifest.webapp", 
            launchUrl: "../doom/index.html", 
            icon: "Logo.png" 
        },
        { 
            id: 'mcpe', 
            name: _0xstr('m'), 
            description: _0xstr('n'), 
            manifestUrl: "../minecraft/manifest.webapp", 
            launchUrl: "../minecraft/index.html", 
            icon: "Logo.png" 
        },
        { 
            id: 'game1', 
            name: _0xstr('d'), 
            description: _0xstr('e'), 
            manifestUrl: "https://example.com/game1/manifest.webapp", 
            launchUrl: "https://example.com/game1/index.html", 
            icon: "Logo.png" 
        },
        { 
            id: 'util1', 
            name: _0xstr('f'), 
            description: _0xstr('g'), 
            manifestUrl: "https://example.com/util1/manifest.webapp", 
            launchUrl: "../util1/index.html", 
            icon: "Logo.png" 
        },
        { 
            id: 'brow1', 
            name: _0xstr('h'), 
            description: _0xstr('i'), 
            // Keeping the dummy URLs for other apps
            manifestUrl: "https://example.com/brow1/manifest.webapp", 
            launchUrl: "https://example.com/brow1/index.html", 
            icon: "Logo.png" 
        }
    ];

    let _0xdev = false;

    window.logDev = function(msg) {
        if (!_0xdev) return;
        const logs = document.getElementById('dev-logs');
        if (logs) {
            logs.innerText += "\n[" + new Date().toLocaleTimeString() + "] " + msg;
            logs.scrollTop = logs.scrollHeight;
        }
    };

    window.clearLogs = function() {
        document.getElementById('dev-logs').innerText = "Logs cleared...";
    };

    window.mockInstallAll = function() {
        logDev("Initiating bulk mock install...");
        apps.forEach(app => {
            localStorage.setItem('installed_' + app.id, 'true');
            setTimeout(() => { 
                logDev("Mock installed: " + app.name); 
                renderApps();
            }, Math.random() * 1000);
        });
    };

    window.renderApps = function() {
        const list = document.getElementById('app-list');
        if (!list) return;
        list.innerHTML = '';
        apps.forEach(app => {
            const isInstalled = localStorage.getItem('installed_' + app.id) === 'true';
            const item = document.createElement('div');
            item.className = 'app-item';
            item.innerHTML = `
                <div class="app-info">
                    <img src="${app.icon}" class="app-icon">
                    <div class="app-details">
                        <h3>${app.name} ${isInstalled ? '✅' : ''}</h3>
                        <p>${app.description}</p>
                    </div>
                </div>
                <img src="install button.png" 
                     class="install-btn" 
                     style="filter: ${isInstalled ? 'hue-rotate(140deg) brightness(1.2)' : 'none'}" 
                     onclick="handleAction('${app.id}')">
            `;
            list.appendChild(item);
        });
    };

    window.handleAction = function(id) {
        const app = apps.find(a => a.id === id);
        if (!app) return;

        const isInstalled = localStorage.getItem('installed_' + app.id) === 'true';

        if (isInstalled) {
            logDev("Launching: " + app.name);
            window.open(app.launchUrl, '_blank');
        } else {
            installApp(app);
        }
    };

    function installApp(app) {
        logDev("Attempting to install: " + app.name);
        if (typeof navigator.mozApps !== 'undefined' && navigator.mozApps.install) {
            var request = navigator.mozApps.install(app.manifestUrl);
            request.onsuccess = function() {
                alert(app.name + " installed successfully!");
                logDev("SUCCESS: " + app.name + " installed.");
                localStorage.setItem('installed_' + app.id, 'true');
                renderApps();
            };
            request.onerror = function() {
                alert("Install failed: " + this.error.name);
                logDev("ERROR: " + this.error.name);
            };
        } else {
            if (_0xdev) {
                logDev("PC INSTALL: Adding " + app.name + " to virtual home screen...");
                localStorage.setItem('installed_' + app.id, 'true');
                setTimeout(() => {
                    alert("[PC MODE] " + app.name + " has been installed! On your PC, you can now 'Add to Home Screen' via your browser menu to put it on your desktop.");
                    logDev("SUCCESS: " + app.name + " mock-installed.");
                    renderApps();
                }, 500);
            } else {
                alert("Firefox OS installation API not found.");
            }
        }
    }

    window.checkDevAccess = function() {
        const plat = navigator.platform.toUpperCase();
        if (plat.indexOf('MAC') >= 0 || plat.indexOf('WIN') >= 0) {
            const pass = prompt("Developer Access Required. Enter Password:");
            if (pass === _0xdecode('a')) {
                _0xdev = true;
                const consoleEl = document.getElementById('dev-console');
                if (consoleEl) consoleEl.classList.remove('hidden');
                const titleEl = document.getElementById('app-title');
                if (titleEl) titleEl.innerText = "Firebloccs [DEV]";
                logDev("AUTHENTICATED: Dev Mode Enabled.");
            } else if (pass !== null) {
                alert("Incorrect password.");
            }
        }
    };

    window.onload = function() {
        checkDevAccess();
        renderApps();
    };
})();
