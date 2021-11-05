const { workerData, parentPort } = require('worker_threads');
const { KohonenMap, normalize } = require('./KohonenMap');

const buildPath = (points, attemptsCount = 10) => {
    const normalized = normalize(points)

    for (let i = 0; i < attemptsCount; i++) {
        const net = new KohonenMap(points[0].length, points.length);

        net.train(normalized)

        const result = normalized.reduce((gen, curr, i) => {
            return { ...gen, [net.getWinnerIndex(curr)]: points[i] };
        }, {})

        const keys = Object.keys(result);
        if (keys.length === points.length) {
            const path = keys
                .map(idx => ({ idx, value: result[idx] }))
                .sort((a, b) => a.idx - b.idx);

            return { path };
        }
    }

    return { path: [] };
}

parentPort.postMessage(buildPath(workerData));