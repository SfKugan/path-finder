const KohonenMap = function (input, output) {
    this.weights = []

    for (let i = 0; i < input; i++) {
        const currentLayer = [];

        for (let j = 0; j < output; j++) {
            currentLayer.push(Math.random() * 2 - 1);
        }

        this.weights.push(currentLayer);
    }
}

KohonenMap.prototype.shallowArrayEqual = function (a, b) {
    if (a.length !== b.length) 
        return false;

    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i])
            return false;
    }
    
    return true;
}

KohonenMap.prototype.shuffle = function (arg) {
    const arr = arg.slice();

	for (let i = arr.length - 1; i > 0; i--){
        let j = Math.floor(Math.random() * (i + 1));
        
		let temp = arr[j];
		arr[j] = arr[i];
		arr[i] = temp;
    }
    
	return arr;
}

KohonenMap.prototype.NDArrayTo1D = function (arr) {
   return arr.map(item => JSON.stringify(item));
}

KohonenMap.prototype.evolveRedius = function (init) {
    let time = 0;

    return () => {
        const pow = -time++ / (1000 / Math.log2(init));
        return init * Math.pow(Math.E, pow);
    }
}

KohonenMap.prototype.evolveStep = function (init) {
    let time = 0;

    return () => {
        const pow = -time++ / 1000;
        return init * Math.pow(Math.E, pow);
    }
}

KohonenMap.prototype.getWinnerIndex = function (input) {
    const weights = this.weights;

    const results = [];
    for (let i = 0; i < weights[0].length; i++) {
        let value = 0;

        for (let j = 0; j < input.length; j++) {
            value += Math.pow(input[j] - weights[j][i], 2);
        }

        results.push(value);
    }

    let curr = results[0];
    let idx = 0;
    for (let i = 1; i < results.length; i++) {
        if (results[i] < curr) {
            curr = results[i];
            idx = i
        }
    }

    return idx;
}

KohonenMap.prototype.getGravity = function (i, j, radius) {
    const length = this.weights[0].length;

    const circleDist = Math.min(
        Math.abs(i - j - length) % length,
        Math.abs(i - j + length) % length
    );

    const numerator = Math.pow(circleDist, 2);
    const denominator = (2 * Math.pow(radius, 2)) || 1;

    return Math.exp(- numerator / denominator);
}

KohonenMap.prototype.evolve = function (input, step, radius) {
    const winnerIdx = this.getWinnerIndex(input);

    for (let i = 0; i < this.weights[0].length; i++) {
        for (let j = 0; j < this.weights.length; j++) {
            const gravity = this.getGravity(i, winnerIdx, radius);
            this.weights[j][i] += step * gravity * (input[j] - this.weights[j][i]);
        }
    }
}

KohonenMap.prototype.train = function (images, trainStep = 1) {
    const evolveRedius = this.evolveRedius(images.length / 2);
    const evolveStep = this.evolveStep(trainStep);

    let radius = evolveRedius();
    let step = evolveStep();

    let etolon = this.NDArrayTo1D(this.weights);

    while (true) {
        this.shuffle(images).forEach(item => {
            this.evolve(item, step, radius);
        })

        const current = this.NDArrayTo1D(this.weights);

        if (this.shallowArrayEqual(current, etolon)) {
            break;
        } else {
            etolon = current;
            radius = evolveRedius();
            step = evolveStep();
        }   
    }
}

const normalize = function (arr) {
    const normalizer = arr.reduce((gen, curr) => {
        return gen.map((item, idx) => 
            item < Math.abs(curr[idx]) ? Math.abs(curr[idx]) : item
        )
    }, new Array(arr[0].length).fill(0));
    
    return arr.map(item => {
        return item.map((subitem, idx) => subitem / normalizer[idx])
    })
}

const center = function (arr) {
    const normalizer = arr.reduce((gen, curr) => {
        return gen.map((item, idx) => 
            item + curr[idx]
        )
    }, new Array(arr[0].length).fill(0))
    .map(item => item / arr.length);

    return arr.map(item => {
        return item.map((subitem, idx) => subitem - normalizer[idx])
    })
}

module.exports = {
    KohonenMap: KohonenMap,
    normalize: arr => normalize(center(arr)),
}