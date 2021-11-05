export const pathTransformer = (path, latlngs) => {
    const markers = path.map(item => item.value);
    const idxs = path.map(item => item.idx);

    const cerclePath = [...markers, markers[0]];
    const cercleIdxs = [...idxs, idxs[0]];

    let distance = 0
    for (let i = 0; i < cercleIdxs.length - 1; i++) {
        distance += latlngs[cercleIdxs[i]].distanceTo(latlngs[cercleIdxs[i + 1]]);
    }

    return { path: cerclePath, distance:  Math.round(distance / 1000) };
}