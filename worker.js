const { initConnection } = require("./db/connection");
const { generateProducts } = require("./db/product/generate_products");
const { workerData, parentPort } = require("worker_threads");

const productAmount = workerData.amount;
const workerNum = workerData.workerNum;

(async function () {
  const connection = await initConnection();
  try {
    console.log("Worker ", workerNum, " is running");
    await generateProducts(connection, productAmount);

    parentPort.postMessage({ success: "complete", error: false });
  } catch (error) {
    parentPort.postMessage({ error: error.message, success: false });
  } finally {
    await connection.close();
    process.exit();
  }
})();
