import mixpanel from "mixpanel-browser";

export const InitMixpanel = () => {
  mixpanel.init(process.env.MIXPANEL_TOKEN, { debug: true });
};

const registerProperties = (username) => {
  mixpanel.identify(username);
};

const trackEvent = (event, properties = {}) => {
  mixpanel.track(event, properties);
};

const trackTimeEvent = (event) => {
  mixpanel.time_event(event);
};

const setPeopleOnce = (properties) => {
  mixpanel.people.set_once({
    ...properties,
    "Sign Up Date": new Date(),
  });
};

const resetIdentity = () => {
  mixpanel.reset();
};

const incrementSignIn = () => {
  mixpanel.people.increment("loginCount");
};

export const MixpanelEventsConstant = {
  signIn: "Sign In",
  signOut: "Sign Out",
  signUp: "Sign Up",
  signInFail: "Sign In Failure",
  sleepActivate: "Sleep Activate",
  sleepStart: "Sleep Start",
  sleepEnd: "Sleep End",
  sleepDownloadReport: "Download Sleep Report",
  sleepReadDetail: "Read Sleep Detail",
};

const {
  signIn,
  signOut,
  signInFail,
  signUp,
  sleepActivate,
  sleepStart,
  sleepEnd,
  sleepReadDetail,
  sleepDownloadReport,
} = MixpanelEventsConstant;

export const TrackSleepTest = (event, data = {}) => {
  switch (event) {
    case sleepActivate:
      trackEvent(sleepActivate);
      break;
    case sleepStart:
      trackEvent(sleepStart);
      trackTimeEvent(sleepEnd);
      break;
    case sleepEnd:
      trackEvent(sleepEnd);
      break;
    case sleepDownloadReport:
      trackEvent(sleepDownloadReport);
      break;
    case sleepReadDetail:
      trackEvent(sleepReadDetail, data);
      break;
    default:
      break;
  }
};

export const AuthListener = (data) => {
  console.log(data);
  switch (data.payload.event) {
    case "signIn":
      registerProperties(data.payload.data.username);
      incrementSignIn();
      trackEvent(signIn);
      break;
    case "signOut":
      trackEvent(signOut);
      resetIdentity();
      break;
    case "signIn_failure":
      trackEvent(signInFail);
      break;
  }
};
