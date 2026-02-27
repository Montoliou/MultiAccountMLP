/**
 * Flow Engine 2.0 — SVG Flow Drawing Module
 * 
 * Encapsulates all SVG path computation for the financial flow visualization.
 * Extracted from legacy-main.js for modularity and testability.
 * 
 * @module flow-engine
 */

// ─── Helpers ────────────────────────────────────────────
const getEl = (id) => document.getElementById(id);

const formatCurrency = (val) =>
    new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(val);

// ─── Constants ──────────────────────────────────────────
const MIN_FLOW_WIDTH = 10;
const MAX_FLOW_WIDTH = 45;
const EXIT_OFFSET_Y = 8;

// ─── Flow Dot (Animated Particle) ───────────────────────
/**
 * Attaches an animated dot that follows the SVG path.
 * @param {string} pathId - The DOM id of the flow path
 * @param {number} radius - Dot radius in px
 * @param {number} speedSec - Animation duration in seconds
 */
export function attachFlowDot(pathId, radius = 4, speedSec = 3) {
    const dotGroupId = `${pathId}-dot`;
    let g = document.getElementById(dotGroupId);
    if (!g) {
        g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttribute('id', dotGroupId);
        document.getElementById('flow-svg').appendChild(g);
    }
    g.innerHTML = '';

    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('class', 'flow-dot');
    circle.setAttribute('r', String(radius));

    const animateMotion = document.createElementNS('http://www.w3.org/2000/svg', 'animateMotion');
    animateMotion.setAttribute('dur', `${Math.max(1.2, speedSec)}s`);
    animateMotion.setAttribute('repeatCount', 'indefinite');

    const mpath = document.createElementNS('http://www.w3.org/1999/xlink', 'xlink:href', `#${pathId}`);
    animateMotion.appendChild(mpath);
    circle.appendChild(animateMotion);
    g.appendChild(circle);
}

// ─── Anchor Point Calculator ────────────────────────────
/**
 * Computes the start (fx, fy) and end (tx, ty) anchor points
 * for a flow based on its pathId and the current variant.
 */
function computeAnchors(pathId, fromRect, toRect, containerRect, fromBasin, currentVariant) {
    // Default: center-bottom → center-top
    let fx = fromRect.left - containerRect.left + fromRect.width / 2;
    let fy = fromRect.bottom - containerRect.top - EXIT_OFFSET_Y;
    let tx = toRect.left - containerRect.left + toRect.width / 2;
    let ty = toRect.top - containerRect.top;

    if (pathId === 'fixkosten-depot-flow') {
        fx = fromRect.left - containerRect.left + fromRect.width * (currentVariant === 'B' ? 0.25 : 0.75);
        tx = toRect.left - containerRect.left + toRect.width * 0.75;
    } else if (pathId === 'tagesgeld-depot-flow') {
        tx = toRect.left - containerRect.left + (currentVariant === 'B' ? toRect.width * 0.5 : toRect.width * 0.25);
    } else if (pathId === 'konsum-tagesgeld-flow') {
        fx = fromRect.left - containerRect.left + (currentVariant === 'B' ? fromRect.width * 0.20 : fromRect.width * 0.80);
    } else if (pathId === 'flow-path-2') {
        if (currentVariant === 'A') {
            fx = fromRect.left - containerRect.left + fromRect.width * 0.20;
            tx = toRect.left - containerRect.left + toRect.width * 0.80;
        } else {
            fx = fromRect.left - containerRect.left + fromRect.width * 0.80;
            tx = toRect.left - containerRect.left + toRect.width * 0.50;
        }
    } else if (pathId === 'vermieterkonto-einkommen-flow') {
        fx = fromRect.left - containerRect.left + fromRect.width * 0.75;
        fy = fromRect.top - containerRect.top; // exit TOP
        tx = toRect.left - containerRect.left + toRect.width * 0.25;
        ty = toRect.bottom - containerRect.top; // enter BOTTOM
    } else if (pathId === 'fixkosten-vermieterkonto-flow') {
        const isPositiveFlow = fromBasin.id === 'vermieterkonto-basin';
        if (isPositiveFlow) {
            fx = fromRect.left - containerRect.left + fromRect.width * 0.50;
            fy = fromRect.top - containerRect.top;
            tx = toRect.left - containerRect.left + toRect.width * (currentVariant === 'B' ? 0.50 : 0.10);
            ty = currentVariant === 'B'
                ? toRect.bottom - containerRect.top
                : toRect.top - containerRect.top + toRect.height * 0.5;
        } else {
            fx = fromRect.left - containerRect.left + fromRect.width * (currentVariant === 'B' ? 0.50 : 0.10);
            fy = currentVariant === 'B'
                ? fromRect.bottom - containerRect.top
                : fromRect.top - containerRect.top + fromRect.height * 0.5;
            tx = toRect.left - containerRect.left + toRect.width * 0.5;
            ty = toRect.top - containerRect.top;
        }
    }

    return { fx, fy, tx, ty };
}

// ─── Bézier Control Point Calculator ────────────────────
/**
 * Computes cubic bézier control points for a smooth curve.
 */
function computeControlPoints(pathId, fx, fy, tx, ty) {
    const dx = tx - fx;
    const dy = ty - fy;

    if (pathId === 'vermieterkonto-einkommen-flow' || pathId === 'fixkosten-vermieterkonto-flow') {
        // Custom meander for specific flows (upwards or sideways)
        return {
            c1x: fx + (dx * 0.35),
            c1y: fy + (dy * 0.35),
            c2x: tx - (dx * 0.35),
            c2y: ty - (dy * 0.35),
        };
    } else if (pathId === 'flow-path-2') {
        // Mostly horizontal flow (Dauerauftrag)
        return {
            c1x: fx + (dx * 0.4),
            c1y: fy + Math.min(80, Math.max(0, dy * 0.5)),
            c2x: tx - (dx * 0.4),
            c2y: ty - Math.min(80, Math.max(0, dy * 0.5)),
        };
    } else {
        // Standard downward flow: dynamically scaled tension
        const strength = Math.max(50, Math.abs(dy) * 0.45);
        return {
            c1x: fx,
            c1y: fy + strength,
            c2x: tx,
            c2y: ty - strength,
        };
    }
}

// ─── Main Draw Function ─────────────────────────────────
/**
 * Draws (or updates) a financial flow between two basins.
 *
 * @param {string} pathId - DOM id of the SVG path element
 * @param {HTMLElement} fromBasin - Source basin element
 * @param {HTMLElement} toBasin - Target basin element
 * @param {number} value - Monetary value of the flow
 * @param {number} maxFlowValue - Maximum flow value (for proportional scaling)
 * @param {string} [labelText=''] - Optional text label above the value pill
 * @param {number} [flowOpacity=1.0] - Opacity override for subtle flows
 * @param {string} [currentVariant='A'] - Current layout variant ('A' or 'B')
 * @param {HTMLElement} flowContainer - The parent container element
 */
export function drawFlow(pathId, fromBasin, toBasin, value, maxFlowValue, labelText = '', flowOpacity = 1.0, currentVariant = 'A', flowContainer = null) {
    if (!fromBasin || !toBasin) return;

    const path = getEl(pathId);
    const pathAnim = getEl(`${pathId}-anim`);
    if (!path) return;

    const fromRect = fromBasin.getBoundingClientRect();
    const toRect = toBasin.getBoundingClientRect();
    const containerRect = flowContainer
        ? flowContainer.getBoundingClientRect()
        : path.closest('svg')?.parentElement?.getBoundingClientRect();

    if (!containerRect) return;

    // 1. Stroke width (proportional to value)
    const normalizedValue = Math.max(0, value) / maxFlowValue;
    const strokeWidth = MIN_FLOW_WIDTH + normalizedValue * (MAX_FLOW_WIDTH - MIN_FLOW_WIDTH);
    path.style.strokeWidth = `${value > 0 ? Math.max(MIN_FLOW_WIDTH, strokeWidth) : 0}px`;

    // 2. Opacity
    if (flowOpacity !== 1.0) {
        path.style.opacity = flowOpacity;
    } else {
        path.style.opacity = '';
    }

    // 3. Compute anchor points
    const { fx, fy, tx, ty } = computeAnchors(pathId, fromRect, toRect, containerRect, fromBasin, currentVariant);

    // 4. Compute bézier control points
    const { c1x, c1y, c2x, c2y } = computeControlPoints(pathId, fx, fy, tx, ty);

    // 5. Build SVG path data
    const pathData = `M ${fx},${fy} C ${c1x},${c1y} ${c2x},${c2y} ${tx},${ty}`;
    path.setAttribute('d', pathData);

    // 6. Overflow glow
    const isUeberlauf = value >= maxFlowValue * 0.9 && value > 0;
    path.style.stroke = '';
    path.style.filter = isUeberlauf ? 'drop-shadow(0px 0px 8px var(--color-error))' : '';

    // 7. Animation path
    if (pathAnim) {
        pathAnim.setAttribute('d', pathData);
        pathAnim.style.opacity = '';
    }

    // 8. Mask path
    const pathMask = getEl(`${pathId}-mask`);
    if (pathMask) {
        pathMask.setAttribute('d', pathData);
        const maskWidth = Math.max(0, parseFloat(path.style.strokeWidth || '0') + 2);
        pathMask.style.strokeWidth = `${maskWidth}px`;
    }

    // 9. Eraser path
    const pathErase = getEl(`${pathId}-erase`);
    if (pathErase) {
        pathErase.setAttribute('d', pathData);
        const eraseWidth = Math.max(0, parseFloat(path.style.strokeWidth || '0') + 40);
        pathErase.style.strokeWidth = `${eraseWidth}px`;
    }

    // 10. Animated flow dot
    const radius = Math.max(2, Math.min(5, parseFloat(path.style.strokeWidth) / 6));
    const speed = 6 + Math.max(0, (parseFloat(path.style.strokeWidth) - 10) / 8);
    attachFlowDot(pathId, radius, speed);

    // 11. Value & text labels
    const valueLabelId = `${pathId}-value`;
    const textLabelId = `${pathId}-text`;
    let valueLabel = getEl(valueLabelId);
    let textLabel = getEl(textLabelId);

    if (!valueLabel) {
        valueLabel = document.createElement('div');
        valueLabel.className = 'flow-value';
        valueLabel.id = valueLabelId;
        flowContainer.appendChild(valueLabel);
    }
    if (labelText && !textLabel) {
        textLabel = document.createElement('div');
        textLabel.className = 'flow-label';
        textLabel.id = textLabelId;
        flowContainer.appendChild(textLabel);
    }

    valueLabel.textContent = formatCurrency(value);
    if (textLabel) textLabel.textContent = labelText;

    // 12. Label positioning along the curve
    let labelPosition = 0.5;
    if (pathId === 'vermieterkonto-einkommen-flow') {
        labelPosition = 0.35;
    } else if (pathId === 'fixkosten-vermieterkonto-flow') {
        labelPosition = 0.67;
    }

    const midPoint = path.getPointAtLength(path.getTotalLength() * labelPosition);
    valueLabel.style.left = `${midPoint.x}px`;
    valueLabel.style.top = `${midPoint.y}px`;
    if (textLabel) {
        textLabel.style.left = `${midPoint.x}px`;
        textLabel.style.top = `${midPoint.y - 22}px`;
    }

    // 13. Toggle active class
    path.classList.toggle('active', value > 0);
    valueLabel.style.display = (value > 0) ? 'block' : 'none';
    if (textLabel) textLabel.style.display = (value > 0) ? 'block' : 'none';
}

// ─── Hide Flow ──────────────────────────────────────────
/**
 * Hides a flow completely (resets stroke, opacity, labels, dots).
 * @param {string} pathId - DOM id of the flow path
 */
export function hideFlow(pathId) {
    const path = getEl(pathId);
    const pathAnim = getEl(`${pathId}-anim`);
    const valueLbl = getEl(`${pathId}-value`);
    const textLbl = getEl(`${pathId}-text`);
    const pathErase = getEl(`${pathId}-erase`);
    const pathMask = getEl(`${pathId}-mask`);
    const dotGroup = getEl(`${pathId}-dot`);

    if (path) {
        path.classList.remove('active');
        path.style.strokeWidth = '0px';
    }
    if (pathAnim) {
        pathAnim.style.opacity = '0';
    }
    if (valueLbl) valueLbl.style.display = 'none';
    if (textLbl) textLbl.style.display = 'none';
    if (pathErase) pathErase.style.strokeWidth = '0px';
    if (pathMask) pathMask.style.strokeWidth = '0px';
    if (dotGroup) dotGroup.innerHTML = '';
}
