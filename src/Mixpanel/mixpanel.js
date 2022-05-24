import mixpanel from "mixpanel-browser";

export const InitMixpanel = () => {
  // console.log(process.env.MIXPANEL_TOKEN)
  // mixpanel.init(process.env.MIXPANEL_TOKEN, { debug: true });
  mixpanel.init("3e6d4e8d268453671ccdfa7bb9818a37", { debug: true });
};


// const trackEvent = (event, properties = {}) => {
//   mixpanel.track(event, properties);
// };