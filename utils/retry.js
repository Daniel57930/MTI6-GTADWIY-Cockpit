// Your retry utility code here

function retry(fn, retries = 3) {
    return new Promise((resolve, reject) => {
        fn()
            .then(resolve)
            .catch((error) => {
                if (retries === 0) {
                    reject(error);
                } else {
                    resolve(retry(fn, retries - 1));
                }
            });
    });
}

module.exports = retry;