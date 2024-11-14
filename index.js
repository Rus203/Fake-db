require("dotenv").config();
const { Worker } = require("worker_threads");
const os = require("os");

const { PRODUCT_AMOUNT } = process.env;
let workerAmount = os.cpus().length - 1;

let amountPerWorker = 1;
if (PRODUCT_AMOUNT < workerAmount) {
  workerAmount = 1;
  amountPerWorker = PRODUCT_AMOUNT;
} else {
  amountPerWorker = Math.floor(parseInt(PRODUCT_AMOUNT) / workerAmount);
}

(async () => {
  let promises = [];

  for (let i = 0; i < workerAmount; i++) {
    const promise = new Promise((res, rej) => {
      const worker = new Worker("./worker.js", {
        workerData: { amount: amountPerWorker, workerNum: i + 1 },
      });

      worker.on("message", (message) => {
        if (message.error) {
          console.log(`Error from worker ${i + 1}:`, message.error);
        } else console.log(`Message from worker ${i + 1}:`, message.success);
      });

      worker.on("error", (err) => {
        console.error(`Error from worker ${i + 1} :`, err);
        rej(err);
      });

      worker.on("exit", (code) => {
        if (code !== 0) {
          console.error(`Worker ${i + 1} stopped with exit code ${code}`);
          rej(new Error(`Worker ${i + 1} failed`));
        } else {
          res();
        }
      });
    });

    promises.push(promise);
  }

  await Promise.allSettled(promises);

  const errors = promises.filter((p) => p.status === "rejected");
  if (errors.length > 0) {
    console.error("Some workers failed:", errors);
  } else {
    console.log("All workers completed successfully.");
  }
})();
