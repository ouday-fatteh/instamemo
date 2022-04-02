var cloudinary = require('cloudinary').v2;




const imageUploader = (image,tags) => {
cloudinary.config({
    cloud_name: 'instamemo',
    api_key: '516433781726457',
    api_secret: 'bo6PIRRb-OaDTa7-3WZIM4GqD3w'
  });

cloudinary.uploader.upload({image},
  { "tags": {tags}, "width": 500, "height": 500, "crop": "fit", "effect": "saturation:-70" },
  function (err, image) {
    console.log();
    console.log("** Remote Url");
    if (err) { console.warn(err); }
    console.log("* " + image.public_id);
    console.log("* " + image.url);
    waitForAllUploads("couple2", err, image);
  });


function waitForAllUploads(id, err, image) {
  uploads[id] = image;
  var ids = Object.keys(uploads);
  if (ids.length === 6) {
    console.log();
    console.log('**  uploaded all files (' + ids.join(',') + ') to cloudinary');
    performTransformations();
  }
}

function performTransformations() {
  console.log();
  console.log();
  console.log();
  console.log(">> >> >> >> >> >> >> >> >> >>  Transformations << << << << << << << << << <<");
  console.log();
  console.log("> Fit into 200x150");
  console.log("> " + cloudinary.url(uploads.pizza2.public_id, { width: 200, height: 150, crop: "fit", format: "jpg" }));

  console.log();
  console.log("> Eager transformation of scaling to 200x150");
  console.log("> " + cloudinary.url(uploads.lake.public_id, eager_options));

  console.log();
  console.log("> Face detection based 200x150 thumbnail");
  console.log("> " + cloudinary.url(uploads.couple.public_id, { width: 200, height: 150, crop: "thumb", gravity: "faces", format: "jpg" }));

  console.log();
  console.log("> Fill 200x150, round corners, apply the sepia effect");
  console.log("> " + cloudinary.url(uploads.couple2.public_id, { width: 200, height: 150, crop: "fill", gravity: "face", radius: 10, effect: "sepia", format: "jpg" }));

  console.log();
  console.log("> That's it. You can now open the URLs above in a browser");
  console.log("> and check out the generated images.");
}
}

export default imageUploader;