const { connectProductModule } = require("./model");
const faker = require("@faker-js/faker").faker;

async function generateProducts(connection, productAmount) {
  const Product = connectProductModule(connection);

  await Product.sync();
  const promises = [];
  for (let i = 0; i < productAmount; i++) {
    const params = {
      product: faker.commerce.productName(),
      userId: faker.number.int(10 ** 6),
      inActive: faker.datatype.boolean(),
      mapHash: Buffer.from(faker.string.uuid()),
    };

    const promise = Product.create(params);
    promises.push(promise);
  }

  await Promise.allSettled(promises);
}

module.exports = { generateProducts };
