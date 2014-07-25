(function(W) {
  if (W.detect.ipad || W.detect.iphone) {
    return;
  }
  var hashedId = "2ktm540sjx";
  var mediaJson = {"assets":{"flv":{"type":"flv","url":"http://embed-0.wistia.com/deliveries/49e5aa1ff9ca9c2d1e7ae6d4ad4cd898dbefa168.bin","width":640,"height":360,"ext":"flv","size":11479778,"2pass":true},"iphone":{"type":"iphone","url":"http://embed-0.wistia.com/deliveries/9c66ea9de1ff1bd95d02faf8f3ba0ee27aaaa99d.bin","width":640,"height":360,"ext":"mp4","size":12694092,"2pass":"true"},"mdflv":{"type":"mdflv","url":"http://embed-0.wistia.com/deliveries/9b89469c90a894e2c0cd4954084a1aa3b1900e1a.bin","width":960,"height":540,"ext":"flv","size":18334440,"2pass":true},"mdmp4":{"type":"mdmp4","url":"http://embed-0.wistia.com/deliveries/75b84cb5d9627aaee4478e3cfe54b417523a8884.bin","width":960,"height":540,"ext":"mp4","size":18301608,"2pass":"true"},"hdflv":{"type":"hdflv","url":"http://embed-0.wistia.com/deliveries/51c4db66f444d24055745ad1761df14bc7cca899.bin","width":1280,"height":720,"ext":"flv","size":35927371,"2pass":true},"hdmp4":{"type":"hdmp4","url":"http://embed-0.wistia.com/deliveries/6ab55056f8488ee6f32ca13bc86fac07e07777db.bin","width":1280,"height":720,"ext":"mp4","size":35903917,"2pass":"true"},"still":{"type":"still","url":"http://embed-0.wistia.com/deliveries/2cb028f3400847fb418278443a0ded6914070896.bin","width":960,"height":540,"ext":"png","size":771913,"2pass":null},"original":{"type":"original","url":"http://embed-0.wistia.com/deliveries/1d6ff49d3a0480f5ffef8151d81fbdc8f100a1a6.bin","width":1280,"height":720,"ext":"mp4","size":24919239,"2pass":null},"preview":{"type":"preview","url":"http://embed-0.wistia.com/deliveries/9b89469c90a894e2c0cd4954084a1aa3b1900e1a.bin","width":960,"height":540,"ext":"flv","size":18334440,"2pass":true}},"distilleryUrl":"http://distillery.wistia.com/x","accountKey":"wistia-production_50285","mediaKey":"wistia-production_7750285","name":"Web Courses Bangkok","duration":109.742,"hashedId":"2ktm540sjx","branding":true,"flashPlayerUrl":"http://embed-0.wistia.com/flash/embed_player_v2.0.swf?2013-10-04","trackingTransmitInterval":10,"showAbout":true,"playerPreference":"auto","embed_options":{"volumeControl":"true","fullscreenButton":"true","controlsVisibleOnLoad":"false","playerColor":"50b748","version":"v2","stillUrl":"https://embed-ssl.wistia.com/deliveries/2cb028f3400847fb418278443a0ded6914070896.jpg?t=1405308930126","autoPlay":"false","endVideoBehavior":"default","playButton":"true","smallPlayButton":"true","playbar":"true","branding":"false","plugin":{"socialbar-v1":{"height":"25"}}}};
  for (var key in W.data("video")) {
    var vid = W.data(["video", key]);
    if (vid.hashedId() === hashedId) {
      W.seo.inject(mediaJson, W.extend({}, vid.params));
      break;
    }
  }
}(Wistia));
