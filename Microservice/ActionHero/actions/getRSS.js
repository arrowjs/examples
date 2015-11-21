"use strict";
const FeedParser = require('feedparser')
    , request = require('request');

exports.action = {
  name:                   'getRSS',
  description:            'get RSS from vnexpress',
  blockedConnectionTypes: [],
  outputExample:          {},
  matchExtensionMimeType: false,
  version:                1.0,
  toDocument:             true,
  middleware:             [],

  inputs: {},

  run: function(api, data, next){
    var error = null;
    let rssReq = request('http://vnexpress.net/rss/the-gioi.rss');
        let feedparser = new FeedParser({normalize: true, addmeta: false});
        var rssResult = [];
        rssReq.on('error', function (error) {
            data.response.error = error;
        });

        rssReq.on('response', function (res) {
            var stream = this;

            if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));

            stream.pipe(feedparser);
        });


        feedparser.on('error', function(error) {
            data.response.error = error;
        });
        feedparser.on('readable', function() {
            // This is where the action is!
            let stream = this
                , meta = this.meta // **NOTE** the "meta" is always available in the context of the feedparser instance
                , item;

            while (item = stream.read()) {
                rssResult.push(
                    {
                        title: item.title,
                        description: item.description
                    }
                );
            }

        });

        feedparser.on('end', function() {
            data.response.rss = rssResult;
            next();
        });
    
  }
};