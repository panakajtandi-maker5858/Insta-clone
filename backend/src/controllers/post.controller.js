// ✅ Latest SDK ke saath sahi code
const { default: ImageKit, toFile } = require('@imagekit/nodejs')

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
//   publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
//   urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
})

async function createPostController(req, res) {
  console.log(req.body, req.file)

  // ✅ .files.upload() aur toFile(buffer) - latest SDK
  const file = await imagekit.files.upload({
    file: await toFile(req.file.buffer, 'file'),
    fileName: 'Test',
  })

  res.send(file)
}

module.exports = createPostController