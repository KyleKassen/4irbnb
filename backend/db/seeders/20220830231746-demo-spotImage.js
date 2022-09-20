'use strict';

const spotImageData = [
  {
    spotId: 1,
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53089914/original/7a26e34b-4529-4768-a270-415fbf7ecff8.jpeg?im_w=1200',
    preview: true,
  },
  {
    spotId: 1,
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53089914/original/62ceb10c-3e65-4f30-8437-9db70d7b7d40.jpeg?im_w=720',
    preview: false,
  },
  {
    spotId: 1,
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53089914/original/2d352235-50dd-496b-a511-2877b7ca87df.jpeg?im_w=720',
    preview: false,
  },
  {
    spotId: 1,
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53089914/original/23927b45-aef3-4fbd-a939-b543f4f17e88.jpeg?im_w=720',
    preview: false,
  },
  {
    spotId: 1,
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53089914/original/71d01800-0c66-4ef1-9288-a98319705390.jpeg?im_w=1200',
    preview: false,
  },
  {
    spotId: 2,
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-613924793497116243/original/8824e136-633d-49c7-bcf9-50bd75cd0555.jpeg?im_w=1200',
    preview: true,
  },
  {
    spotId: 2,
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-613924793497116243/original/3a8a414d-98dd-4f98-a891-b669347903e6.jpeg?im_w=720',
    preview: false,
  },
  {
    spotId: 2,
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-613924793497116243/original/f35b88c7-97c4-4cb8-ae4d-5191cce71deb.jpeg?im_w=720',
    preview: false,
  },
  {
    spotId: 2,
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-613924793497116243/original/6a528320-c2f7-4c87-8675-a68fac3f2f68.jpeg?im_w=720',
    preview: false,
  },
  {
    spotId: 2,
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-613924793497116243/original/8bb5e1e5-15dc-45cf-be56-930a6031414c.jpeg?im_w=720',
    preview: false,
  },
  {
    spotId: 3,
    url: 'https://a0.muscache.com/im/pictures/21316a15-db76-41c3-b133-6c83650d23f1.jpg?im_w=1200',
    preview: true,
  },
  {
    spotId: 3,
    url: 'https://a0.muscache.com/im/pictures/7f625a36-9ccb-4a76-943c-6929b1cf5be2.jpg?im_w=720',
    preview: false,
  },
  {
    spotId: 3,
    url: 'https://a0.muscache.com/im/pictures/54b7325d-db83-43e2-bc87-3134ce19ac93.jpg?im_w=720',
    preview: false,
  },
  {
    spotId: 3,
    url: 'https://a0.muscache.com/im/pictures/e1703831-ad9e-4431-bba3-054d38e565f8.jpg?im_w=720',
    preview: false,
  },
  {
    spotId: 3,
    url: 'https://a0.muscache.com/im/pictures/263d00bb-ed14-4c7d-baa6-8b5af9154b0f.jpg?im_w=720',
    preview: false,
  },
  {
    spotId: 4,
    url: 'https://a0.muscache.com/im/pictures/4d2d0fd4-9f48-45f1-b9db-eb98c76b5195.jpg?im_w=1200',
    preview: true,
  },
  {
    spotId: 4,
    url: 'https://a0.muscache.com/im/pictures/d15440da-ad39-4f54-a9f9-9c32f52a105b.jpg?im_w=720',
    preview: false,
  },
  {
    spotId: 4,
    url: 'https://a0.muscache.com/im/pictures/91a1f8e0-1653-4e5b-bde4-65fa89d69995.jpg?im_w=720',
    preview: false,
  },
  {
    spotId: 4,
    url: 'https://a0.muscache.com/im/pictures/8a837823-252d-4b94-bb8e-fed289abe07c.jpg?im_w=720',
    preview: false,
  },
  {
    spotId: 4,
    url: 'https://a0.muscache.com/im/pictures/6350c2be-b8ff-43db-a43f-d2f32183e6f1.jpg?im_w=720',
    preview: false,
  },
  {
    spotId: 5,
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-20168170/original/72809229-544c-44a7-bfbd-6df2c1160e38.jpeg?im_w=1200',
    preview: true,
  },
  {
    spotId: 5,
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-20168170/original/35d403ec-42d6-4059-b23b-6f6d793ba0a7.jpeg?im_w=720',
    preview: false,
  },
  {
    spotId: 5,
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-20168170/original/8ac644b9-805a-4be5-bc66-41aa85a55c38.jpeg?im_w=720',
    preview: false,
  },
  {
    spotId: 5,
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-20168170/original/7f22b3f1-408c-443a-bef6-492d48da0628.jpeg?im_w=720',
    preview: false,
  },
  {
    spotId: 5,
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-20168170/original/aab6e967-6a82-49c8-9b4c-06e2b9043170.jpeg?im_w=720',
    preview: false,
  },
  {
    spotId: 6,
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-693653015012600055/original/9d5f48b7-90b6-4e57-adbd-e7c4cde90245.jpeg?im_w=1200',
    preview: true,
  },
  {
    spotId: 6,
    url: 'https://a0.muscache.com/im/pictures/1322ff73-39bb-46b8-b8d2-91421e8870dc.jpg?im_w=720',
    preview: false,
  },
  {
    spotId: 6,
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-693653015012600055/original/7e34f5e9-fa21-49bd-b118-83a1446322eb.jpeg?im_w=720',
    preview: false,
  },
  {
    spotId: 6,
    url: 'https://a0.muscache.com/im/pictures/b3e9e631-67c2-4e7c-826b-d47f6899a1bc.jpg?im_w=720',
    preview: false,
  },
  {
    spotId: 6,
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-693653015012600055/original/dd4157e6-d8d6-48e6-a30c-84c70588f0cc.jpeg?im_w=720',
    preview: false,
  },
  {
    spotId: 7,
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-631458223490420191/original/2adf2efd-7756-40d4-8b3a-c966bbfa5b5e.jpeg?im_w=1200',
    preview: true,
  },
  {
    spotId: 7,
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-631458223490420191/original/843e83d6-0697-4c9e-8762-0a44dfc0adfd.jpeg?im_w=720',
    preview: false,
  },
  {
    spotId: 7,
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-631458223490420191/original/70dc6719-f34a-4d83-8847-829371e57847.jpeg?im_w=720',
    preview: false,
  },
  {
    spotId: 7,
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-631458223490420191/original/92fc1bb9-636c-4180-98b4-36d5a9b9f04b.jpeg?im_w=720',
    preview: false,
  },
  {
    spotId: 7,
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-631458223490420191/original/fd2ede6b-7a24-44c0-83f5-1049fadad139.jpeg?im_w=720',
    preview: false,
  }
]

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('SpotImages', spotImageData, {});
  },

  async down (queryInterface, Sequelize) {
    const { Op } = require('sequelize');
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('SpotImages', { [Op.or]: spotImageData }, {});
  }
};
