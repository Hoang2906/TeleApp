import Pusher from "pusher";

const pusher = new Pusher({
  appId: "1701034",
  key: "aff6a6ed848dc2ae6717",
  secret: "cc012a8b0ff6bee80225",
  cluster: "ap1",
  useTLS: true
});

export default pusher
