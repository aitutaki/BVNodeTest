var DAL = (function() {
	var http = require("http");
	var _data = null;
	var _url = "http://www.betvictor.com/live/en/live/list.json";

	// These would probably be moved out into a models library.
	// And would probably inherit from a base class.
	function SPORT(id, title) {
		this.id = id;
		this.title = title;
	}

	function EVENT(id, title) {
		this.id = id;
		this.title = title;
	}

	function OUTCOME(id, title) {
		this.id = id;
		this.title = title;
	}

	function _findInArray(ar, prop, value) {
		if (!ar) throw "No data supplied.";
		if (!prop) throw "No property supplied.";

		var loop = true;
		var rec = null
		var i = 0;
		while (loop) {
			// Use === as we don't want any truthy/falsey
			// shenanigans here.
			rec = ar[i];
			loop = (rec[prop] === value);
			i++;
		}
		return rec;
	}

	function _getData(cb) {
		var d = "";

		function _success() {
			_data = JSON.parse(d);
			cb(true);
		}

		function _failure(e) {
			throw ((!!e && e.message) || "Unable to process request.");
		}

		// We could build content expiration into here
		// if required, but for now just cache the data.

		if (!_data)
		{
			var _req = http.get(_url, function(res) {
				res.on("data", function (chunk) {
					d += chunk;
				});
				res.on("end", function() {
					_success();
				});
			});
			_req.on("error", function() {
				_failure();
			});
		}
		else
		{
			console.log("Already got data.");
			cb(true);
		}
	}

	function _getSports(cb) {
		function _process(data) {
			// We don't want to send back everything
			// so let's strip out just what we need.
			if (data)
			{
				var _ar = [];
				for (var i=0; i < data.sports.length; i++)
				{
					var rec = data.sports[i];
					_ar.push(new SPORT(rec.id, rec.title));
				}
				
				console.log("Get Sports: " + _ar);
				cb(_ar);
			}
			else
			{
				cb(null);
			}
		}
		
		_getData(function(ok) {
			if (ok)
			{
				_process(_data);
			}
			else
			{
				cb(null);
			}
		});
	}

	function _getEventsForSport(idx, cb) {
		function _process(_data) {
			var _ar = [];
			try
			{
				var _sport = _findInArray(_data.sports, "id", idx);
				if (_sport) {
					for (var i=0; (_sport.events && i < _sport.events.length); i++)
					{
						var ev = _sport.events[i];
						_ar.push(new EVENT(ev.id, ev.title));
					}
				}
				else
				{
					cb(null);
				}
				console.log("Get Events for Sport: " + _ar);
				cb(_ar);
			}
			catch(e) {
				console.log(e);
				cb(null);
			}
		}
		
		getData(function(ok) {
			if (ok) {
				_process(_data);
			}
			else
			{
				cb(null);
			}
		});
	}

	function _getEventOutcomes(sportIdx, eventIdx, cb) {
		function _process(_data) {
			var _ar = [];
			try
			{
				var _sport = _findInArray(_data.sports, "id", sportIdx);
				var _ev = _findInArray(_sport.events, "id", eventIdx);
				if (_ev) {
					for (var i=0; (_ev.outcomes && i < _ev.outcomes.length); i++)
					{
						var _rec = _ev.outcomes[i];
						_ar.push(new OUTCOME(_rec.id, _rec.description));
					}
				}
				else
				{
					cb(null);
				}
				console.log("Get Event Outcomes: " + _ar);
				cb(_ar);
			}
			catch(e) {
				console.log(e);
				cb(null);
			}
		}
		
		getData(function(ok) {
			if (ok) {
				_process(_data);
			}
			else
			{
				cb(null);
			}
		});
	}

	this.getData = _getData;
	this.getSports = _getSports;
	this.getEventsForSport = _getEventsForSport;
	this.getEventOutcomes = _getEventOutcomes;

	return this;
})();

module.exports = DAL;
