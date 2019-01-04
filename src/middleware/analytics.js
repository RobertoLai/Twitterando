const analytics = store => next => action => {
  if (!action || !action.meta || !action.meta.analytics) {
    return next(action);
  }

  const { event, data } = action.meta.analytics;

  fakeAnalyticsAPI(event, data)
    .then(resp => {
      console.log("Recorded: ", event, data);
    })
    .catch(err => {
      console.log("Analytics error: ", err.toString());
    });

  return next(action);
};

function fakeAnalyticsAPI(eventName, data) {
  return new Promise((resolve, reject) => {
    resolve("success");
  });
}

export default analytics;
