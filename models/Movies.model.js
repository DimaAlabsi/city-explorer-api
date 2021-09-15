"use strict";

class Movie {
  constructor(title, overview, date, voteAvg, votCount,img) {
    (this.title = title),
      (this.overview = overview),
        (this.voteAvg = voteAvg),
      (this.votCount = votCount),
      (this.date = date),
      this.img=img
  }
}
module.exports = Movie;

