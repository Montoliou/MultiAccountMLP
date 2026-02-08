/**
 * Basin Drag-and-Drop Positionierung Dev-Tool
 * ============================================
 * Aktivierung: Ctrl+Shift+D
 *
 * Nutzung:
 * 1. In index.html vor </script> einfügen (oder als <script src="..."> laden)
 * 2. Sicherstellen, dass `_devDragMode` Variable im Haupt-Script existiert:
 *      let _devDragMode = false;
 * 3. In positionCascade() am Anfang einfügen:
 *      if (_devDragMode) return;
 * 4. Ctrl+Shift+D drücken → Basins per Drag & Drop positionieren
 * 5. "Positionen kopieren" → Werte ins positionCascade() einfügen
 * 6. Nach Fertigstellung: Diesen Code + _devDragMode wieder entfernen!
 */

// ===== DEV TOOL: Basin Drag-and-Drop Positionierung (Ctrl+Shift+D) =====
(function() {
    let dragMode = false;
    let dragTarget = null;
    let dragOffsetX = 0;
    let dragOffsetY = 0;
    let overlay = null;
    let infoPanel = null;

    function toggleDragMode() {
        dragMode = !dragMode;
        if (dragMode) {
            enableDragMode();
        } else {
            disableDragMode();
        }
    }

    function enableDragMode() {
        const fc = document.getElementById('flow-container');
        if (!fc) return;
        _devDragMode = true;

        // Grid overlay
        overlay = document.createElement('div');
        overlay.id = 'dev-grid-overlay';
        overlay.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:5;' +
            'background-image:linear-gradient(rgba(96,165,250,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(96,165,250,0.08) 1px,transparent 1px);' +
            'background-size:40px 40px;';
        fc.appendChild(overlay);

        // Info panel
        infoPanel = document.createElement('div');
        infoPanel.id = 'dev-info-panel';
        infoPanel.style.cssText = 'position:fixed;top:8px;left:50%;transform:translateX(-50%);z-index:9999;' +
            'background:#1e293b;border:2px solid #60a5fa;border-radius:12px;padding:16px 24px;' +
            'font-family:ui-monospace,monospace;font-size:13px;color:#e2e8f0;max-width:700px;width:90%;';
        infoPanel.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">' +
            '<span style="font-weight:bold;color:#60a5fa;">Basin Positionierung (Drag & Drop)</span>' +
            '<div>' +
            '<button id="dev-copy-btn" style="background:#3b82f6;color:white;border:none;padding:6px 16px;border-radius:6px;cursor:pointer;margin-right:8px;font-size:13px;">Positionen kopieren</button>' +
            '<button id="dev-close-btn" style="background:#ef4444;color:white;border:none;padding:6px 16px;border-radius:6px;cursor:pointer;font-size:13px;">Schließen</button>' +
            '</div></div>' +
            '<div id="dev-positions" style="font-size:12px;line-height:1.8;color:#94a3b8;"></div>';
        document.body.appendChild(infoPanel);

        document.getElementById('dev-copy-btn').addEventListener('click', copyPositions);
        document.getElementById('dev-close-btn').addEventListener('click', toggleDragMode);

        // Make basins draggable
        const basinIds = ['einkommen-basin','fixkosten-basin','konsum-basin','tagesgeld-basin','depot-basin','vermieterkonto-basin','immobilien-basin'];
        basinIds.forEach(function(id) {
            var el = document.getElementById(id);
            if (!el) return;
            el.style.cursor = 'grab';
            el.style.outline = '2px dashed rgba(96,165,250,0.5)';
            el.setAttribute('data-draggable', 'true');
        });

        fc.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        updatePositionDisplay();
    }

    function disableDragMode() {
        _devDragMode = false;
        if (overlay) { overlay.remove(); overlay = null; }
        if (infoPanel) { infoPanel.remove(); infoPanel = null; }

        var els = document.querySelectorAll('[data-draggable]');
        els.forEach(function(el) {
            el.style.cursor = '';
            el.style.outline = '';
            el.removeAttribute('data-draggable');
        });

        var fc = document.getElementById('flow-container');
        if (fc) {
            fc.removeEventListener('mousedown', onMouseDown);
        }
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }

    function onMouseDown(e) {
        var el = e.target.closest('[data-draggable]');
        if (!el) return;
        e.preventDefault();
        dragTarget = el;
        el.style.cursor = 'grabbing';
        el.style.zIndex = '100';
        dragOffsetX = e.clientX - el.getBoundingClientRect().left;
        dragOffsetY = e.clientY - el.getBoundingClientRect().top;
    }

    function onMouseMove(e) {
        if (!dragTarget) return;
        var fc = document.getElementById('flow-container');
        if (!fc) return;
        var fcRect = fc.getBoundingClientRect();
        var newLeft = e.clientX - fcRect.left - dragOffsetX;
        var newTop = e.clientY - fcRect.top - dragOffsetY;
        // Snap to 8px grid (MLP Design Guide)
        newLeft = Math.round(newLeft / 8) * 8;
        newTop = Math.round(newTop / 8) * 8;
        dragTarget.style.left = newLeft + 'px';
        dragTarget.style.top = newTop + 'px';
        updatePositionDisplay();
    }

    function onMouseUp() {
        if (dragTarget) {
            dragTarget.style.cursor = 'grab';
            dragTarget.style.zIndex = '10';
            dragTarget = null;
        }
    }

    function getBasinPositions() {
        var fc = document.getElementById('flow-container');
        if (!fc) return {};
        var names = {
            'einkommen-basin': 'einkommen',
            'fixkosten-basin': 'fixkosten',
            'konsum-basin': 'konsum',
            'tagesgeld-basin': 'tagesgeld',
            'depot-basin': 'depot',
            'vermieterkonto-basin': 'vermieterkonto',
            'immobilien-basin': 'immobilien'
        };
        var result = {};
        Object.keys(names).forEach(function(id) {
            var el = document.getElementById(id);
            if (el) {
                result[names[id]] = {
                    top: parseInt(el.style.top) || 0,
                    left: parseInt(el.style.left) || 0
                };
            }
        });
        return result;
    }

    function updatePositionDisplay() {
        var posDiv = document.getElementById('dev-positions');
        if (!posDiv) return;
        var pos = getBasinPositions();
        var lines = [];
        var order = ['einkommen','konsum','fixkosten','vermieterkonto','tagesgeld','depot','immobilien'];
        order.forEach(function(name) {
            if (pos[name]) {
                var p = pos[name];
                lines.push('<span style="color:#60a5fa;font-weight:600;">' + name + '</span>: ' +
                    'top: <span style="color:#fbbf24;">' + p.top + '</span>, ' +
                    'left: <span style="color:#fbbf24;">' + p.left + '</span>');
            }
        });
        posDiv.innerHTML = lines.join('<br>');
    }

    function copyPositions() {
        var pos = getBasinPositions();
        var code = 'positions = {\n';
        var order = ['einkommen','konsum','fixkosten','vermieterkonto','tagesgeld','depot','immobilien'];
        order.forEach(function(name) {
            if (pos[name]) {
                var p = pos[name];
                var pad = '                ';
                code += pad + name + ': '.padEnd(16 - name.length) + '{ top: ' + p.top + ', left: ' + p.left + ' },\n';
            }
        });
        code += '            };';
        navigator.clipboard.writeText(code).then(function() {
            var btn = document.getElementById('dev-copy-btn');
            btn.textContent = 'Kopiert!';
            btn.style.background = '#22c55e';
            setTimeout(function() { btn.textContent = 'Positionen kopieren'; btn.style.background = '#3b82f6'; }, 2000);
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.shiftKey && e.key === 'D') {
            e.preventDefault();
            toggleDragMode();
        }
    });
})();
