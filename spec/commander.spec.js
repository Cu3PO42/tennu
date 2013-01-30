var util = require('util');

var Commander = require('../lib/commander');
var EE = require('events').EventEmitter;
var mockMessage = Object.freeze({
  actor : 'sender',
  channel : 'sender',
  isQuery : 'true',
  message : 'event'
});

// Does not work this way anymore. Commander doesn't listen to the ctx
// anymore. Instead, it's up to the ctx to set this up.
xdescribe("binding", function () {
  it('binds callbacks to its context', function () {
    var ctx = new EE();
    var commander = new Commander(ctx, {}, {});

    runs(function () {
      commander.on('event', function () {
        this.success = true;
      });

      ctx.emit('privmsg', mockMessage);
    });

    waits(10);

    runs(function () {
      expect(ctx.success).toBeTruthy();
    });
  });
});