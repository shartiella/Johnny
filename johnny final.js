(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if((deltaFrame >= 0) && this.ignorePause){
					cjs.MovieClip.prototype.play.call(this);
					this.ignorePause = false;
				}
				else if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
				else if(deltaFrame <= -2){
					cjs.MovieClip.prototype.stop.call(this);
					this.ignorePause = true;
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_2 = function() {
	this.initialize(img.CachedBmp_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2329,1941);// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.your = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgtEjQhRgPhhgcQgSgGgKgFQgPgIgHgLQgIgNAAgdQAAg0AKhSIARiGIAFhPIADhPQABgWAHgJQAFgHAJgCQAJgCAFAFQAGAEACANQATBVgNCJQgRC6AAAmQA4AVA5AOQgBgIADgKIAEgSQADgNADgXIAGglQABgHAMgoQASg9AThqQAXh+AKgsQACgMAEgEQAHgJAJADQAIADACARQACAVgDAiQgEBWgbB/IgtDSQgDASgEAJQBnATBrgEQAOgBAFgEQAGgFABgQQAWjjALiSQACgRACgJQADgOAHgKQAGgHAHgCQAHgCAGAEQAGADAFAGQAJAMADASQACAMgBAVQgCA5gLBzQgLBzgCA6QAAAXgCALQgCASgHANQgPAZgiALQgWAIgnAAIgOAAQhPAAhXgPg");
	this.shape.setTransform(234.93,34.8936);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AnnIFQgMgGgFgPQgFgOAEgOQAEgMAKgMIATgVQAygyAyg4QAlgrAYggQAfgrAVgnQAyhggEhZQgCgUgIgHQgHgGgTgBQhLgChLABIgfAAQgRgBgNgEQgjgJgOgZQgIgPAAgWQAAgOAEgYQAPhJAYhXQAQg5AfhlQAEgMAGgHQAHgJAJACQAMADADATQAFAYgEAgQgDASgJAlQgcBxgXBxQgDAPAEAGQAFAHASAAICLABQAsAAAaAGQAlAKASAYQATAZABAyQABCqiVC4QgdAjgnArIhIBLQgbAbgUAAQgGAAgGgCgAC+HOQhRgOhhgdQgRgFgKgGQgPgHgHgMQgIgNAAgcQAAg1AKhSIARiGIAFhPIADhOQABgWAHgJQAEgHAJgDQAJgCAFAFQAGAFACAMQATBWgNCIQgRC6AAAnQA4AVA5ANQgBgHADgKIAEgTQADgNADgXIAGgkQABgHAMgpQASg9AThrQAXh9ALgrQACgMAEgFQAHgJAJADQAIAEACAQQACAVgDAiQgEBWgbB/IguDTQgDASgEAJQBoATBrgEQAOgBAFgFQAGgFABgPQAWjlALiRQACgRACgJQADgOAHgJQAGgIAHgCQAHgBAGADQAGAEAFAFQAJAMADASQACALgBAWQgCA5gLB0QgLBygCA7QAAAXgCAKQgCATgHAMQgPAagiALQgWAHgnABIgOAAQhPAAhYgQg");
	this.shape_1.setTransform(211.33,17.7091);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("Ak6LmQgMgEgHgKQgJgOgCghIgFh8QgDhOgDguQgEg9ghkHQgYjFADh+QABgagLgJQgIgHgTACQgjACg1AHIhXAMQhoANhEgPQgUgEgCgMQgCgJAKgGQAIgFALgCIE1gtQAhgFASABQAcACATANQAWAQAJAiQAGAXABApQADB8AoFDQAjEagHClQgCAfgOAJQgFADgHAAQgFAAgFgCgAi5EkQgMgGgFgPQgFgOAEgOQAEgMAKgMIATgVQAygyAyg4QAlgrAYggQAegqAVgnQAyhggEhaQgCgUgIgHQgHgGgTgBQhKgChLABIgfAAQgRgBgNgEQgjgJgOgZQgIgPAAgWQAAgOAEgYQAPhJAYhXQAQg5AfhlQAEgMAGgHQAHgJAJACQAMADADATQAFAYgEAgQgDASgJAlQgcBxgXBxQgDAPAEAGQAFAHASAAICKABQAsAAAaAGQAlAKASAYQATAZABAyQABCriVC3QgcAjgnArIhIBLQgbAbgUAAQgGAAgGgCgAHsDtQhRgOhhgdQgSgFgKgGQgPgHgHgMQgIgNAAgcQAAg1AKhRIARiGIAFhPIADhPQABgWAHgJQAFgHAJgDQAJgCAFAFQAGAFACAMQATBWgNCJQgRC5AAAnQA4AVA5ANQgBgHADgKIAEgTQADgNADgXIAGgkQABgHAMgpQASg8AThrQAXh+ALgrQACgMAEgFQAHgJAJADQAIAEACAQQACAVgDAiQgEBXgbB/IguDSQgDASgEAJQBoATBrgEQAOgBAFgFQAGgFABgPQAWjkALiRQACgSACgJQADgOAHgJQAGgIAHgCQAHgBAGADQAGAEAFAFQAJAMADASQACAMgBAWQgCA5gLB0QgLBxgCA7QAAAXgCAKQgCATgHAMQgPAagiALQgWAHgnABIgOAAQhPAAhYgQg");
	this.shape_2.setTransform(181.1198,40.2107);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape_2}]},2).to({state:[{t:this.shape_2}]},20).to({state:[]},1).wait(102));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-34.2,263.2,148.9);


(lib.small = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AiPH0QgKgCgIgIQgGgHgEgLQgEgNABgcQADgoAJhlQAIhaADg0QACgtAAiGQAAhxAGhDQACgVAEgJQAIgRAPgCQAJgBAJAGQAIAFAEAJQAGALACAZQARDzgVD0IgHBIQgEArgCAdQgBAjgIAPQgGAMgLAHQgJAGgJAAIgGgBgAC6hGQgUgRAIgvQAThwACgWQAKhMgFg7QgBgIgDgDQgDgEgJAAQhCgHiMADQiHAEhHgIQgWgCgLgHQgIgEgFgIQgFgIABgIQAAgJAHgHQAGgGAJgDQAIgDAKgBIASAAQA6ABCDgFQB6gGBDADQAkACAXAHQAgALAPAXQAMASACAhQAEAngFA6QgFBAgVB/IgFAYQgFAOgIAHQgKAJgNAAIgCAAQgNAAgJgHg");
	this.shape.setTransform(261.9993,20.8783);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("ADFIpQgKgCgHgIQgHgHgDgLQgFgNACgcQACgoAKhlQAIhaACg0QACgtAAiHQAAhwAGhDQACgVAFgJQAHgRAQgCQAIgBAJAGQAIAFAEAJQAGALACAZQASDzgWD0IgGBIQgFArgBAdQgCAjgIAPQgGAMgLAHQgJAGgJAAIgGgBgApkAmQgGgJgBgOIgBgXQAEh0AVjmIAGhFQACgPADgHQADgFAFgDQAFgEAFABQAIABAGAJQADAHACALQALBQgHCCQgJClABAuQA9gFB6gRQBsgNBKALQAPjeAEjQQg0A0gZAcQgpAugbApIgMASQgHAJgIAGQgJAHgLABQgMABgIgGQgHgFgCgJQgDgIABgJQACgNALgSQAUghAfgkQASgUAogqIA/hAIAUgTQAMgKALgFQAOgFAOABQAOACAKAJQAIAJACAOQACAKAAARQgCB1gKDOIgHCkQgCAYgEALQgIAVgRAFQgLADgQgGIgbgMQgYgJgsAAQgyABhTALQhmAOgfACIgQABQgtAAgPgXgAIPgRQgTgRAIgvQAShwADgWQAJhMgFg7QAAgIgDgDQgDgEgKAAQhCgHiMADQiIAEhGgIQgWgCgLgHQgJgEgEgIQgFgIAAgIQABgJAGgHQAHgGAJgDQAHgDAKgBIASAAQA7ABCDgFQB6gGBDADQAlACAWAHQAhALAPAXQALASADAhQADAngEA6QgFBAgVB/IgGAYQgFAOgIAHQgJAJgOAAIgBAAQgNAAgKgHg");
	this.shape_1.setTransform(227.8266,15.5652);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AsHIyQgHgPgCgWQgCgNABgZQADhcAJhyIAUjOIA8pDQACgXADgMQAFgTAJgNQAGgIAHAAQAMAAACAWQADAlABA+QACCogZD9IgpGkQgEA9gDAZQgGAwgKAkQgHAZgPABIgCABQgMAAgJgSgAFqIpQgKgCgHgIQgHgHgDgLQgFgNACgcQACgoAKhlQAIhaACg0QACgtAAiHQAAhwAGhDQACgVAFgJQAHgRAQgCQAIgBAJAGQAIAFAEAJQAGALACAZQASDzgWD0IgGBIQgFArgBAdQgCAjgIAPQgGAMgLAHQgJAGgJAAIgGgBgAm/AmQgGgJgBgOIgBgXQAEh0AVjmIAGhFQACgPADgHQADgFAFgDQAFgEAFABQAIABAGAJQADAHACALQALBQgHCCQgJClABAuQA9gFB6gRQBsgNBKALQAPjeAEjQQg0A0gZAcQgpAugbApIgMASQgHAJgIAGQgJAHgLABQgMABgIgGQgHgFgCgJQgDgIABgJQACgNALgSQAUghAfgkQASgUAogqIA/hAIAUgTQAMgKAKgFQAOgFAOABQAOACAKAJQAIAJACAOQACAKAAARQgCB1gKDOIgHCkQgCAYgEALQgIAVgRAFQgLADgPgGIgbgMQgYgJgsAAQgyABhTALQhmAOgfACIgQABQgtAAgPgXgAK0gRQgTgRAIgvQAShwADgWQAJhMgFg7QAAgIgDgDQgDgEgKAAQhCgHiMADQiIAEhGgIQgWgCgLgHQgJgEgEgIQgFgIAAgIQABgJAGgHQAHgGAJgDQAHgDAKgBIASAAQA7ABCDgFQB6gGBDADQAlACAWAHQAhALAPAXQALASADAhQADAngEA6QgFBAgVB/IgGAYQgFAOgIAHQgJAJgOAAIgBAAQgNAAgKgHg");
	this.shape_2.setTransform(211.3203,15.5556);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape_2}]},2).to({state:[]},1).wait(37));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-42.4,290,115.9);


(lib.johnnyear = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// facefeatures
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#250B0D").s().p("EAnGAJzQhXgRgsgiQgagVgXgiQgOgVgXgrQgdg4gMgbQgVgvgJgoQgHgfgCgqQgBgVgBg0QAAhpAGgtQAHg3AdhnQARg7ALgdQARgvAYghQAigxA1geIARgJQBqAyBjBZQA+A4A9BKQglAJgbASQgwAegpBDQhEBuARBbQANBFA8A0QA4AwBLAQQBUARA9gdQBDgfAjhRIAHgTQBZCJA+BOIAAABIAEAFIAEAEIAAABQgLAxgPAiQgTAsgdAbQgpAmhEAOQguAJhPAAQjWAAiHgbgEgstAGVQgRgHgRgJQhRgrg7hSQg3hLgdhgQgahUgIhmQgHhOAChxQAChqAOhAQAUhcAzg4QAdggAmgTQBABTAsBCIAtBGQgTAdgLAnQgMAmgJBJQgKBMgCAeQgFA7AFAvQAGA3AUAvQAXA0AlAhQApAkA3AJQA4AJAtgaQAwgcAahAQArBQAeA6QAHAPAIAKQgZBEguAsQgVAUgYAOIgLADQg9AOhsAAg");
	this.shape.setTransform(-276.161,374.3875);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AY9N6QjNg6kQiKQhNgngugdQhBgogtgsQg1g0gdg9IgMgbIADgdIADAFQARATAsgUQBVgmAlgTQBEghAygfQBig9CHh6QC0ihAsgjQDYiqEKhbQEKhaETAEQDDACCNA3IAqASIgSAJQg1AegiAxQgYAhgRAwQgLAdgRA6QgdBogHA1QgGAuAABpQABA0ABAWQACApAHAgQAJAoAVAvQAMAbAdA3QAXAsAOAVQAXAiAaAUQAsAiBXARQCHAbDWAAQBPAAAugJQBEgOApglQAdgcATgsQAPghALgyQAPAQAPAAQAIABAIgFQgrA9gWBEQiLB6jUBIQhdAfh1AZQhQAQiGAVQmJA+kJAGIhDABQlBAAkFhKgEgmhAGyQisAAhWgEQiPgGhxgUQi4gfhyhLQhCgrhDhJQgogshJheIhliCQgxhAgWgkQgjg7gJg1QgHgmAGgmQACAEADAEQALAMAUgEQARgCARgMQBHgsBUhVQBehiAwgwQBkhhCchvQBVg9A/gZQBXgiBKASQA4AOA3AuQAjAfA2BAQBRBiA/BQQgnATgdAgQgzA3gUBcQgOBAgCBqQgCByAHBNQAIBnAaBTQAdBgA3BLQA7BSBRAsQARAJARAHgA/RGAQAugsAZhEQARAWASACIAJAAQgMAbgUAWQgtA0hTAVQAYgOAVgUg");
	this.shape_1.setTransform(-330.0752,371.5066);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("EAAjBG6QgQgFgbgFIgsgIQhXgUhfhHIifiHQgugogxglQhCgyhHgtQg+gmgogNQgkgMhCgJQhxgOgngHQhVgQg9gbQhOgkgFg1QgDgUAJgUQAHgTAQgPQAXgYAvgTQAzgUBCgNQApgIBQgLQBKgKAjgDQA+gEAwAIQBUAOBvA/QBrA9B3BdQBOA8AxAwQBABAAnBBIAPAeQARAjAXA2QANAgAGAQQAJAbADAXQAEAdgEAvQgGA9AAAOQgRgJgZgIgA8KUjQgZgGgjggQjejIhkkmQhlkmA0kmQAWh6AshSQAnhIBLhNQARgSB5hwQF2laDBmRQAfhCAQgxQAVhAABg5IABgyQACgdAIgTQAKgZAXgNQAZgOAVALQAZANAKAuQAfCFgiCcQgdCBhJCUQitFdkhEGQiJB9gVAWQhUBYgdBYQgTA3gEBNQgBAZAABuIABBmQACA5AKArQAJAnAUAwQALAaAbA5QBoDbBWDdQAIAUACAMQACASgGAOQgIAPgSAGQgKAEgKAAQgIAAgIgCgEA5vgU2QgPgBgPgPIAAgBIgEgEIgEgFIAAgBQg+hNhZiKIgHATQgjBRhDAfQg9AdhUgRQhLgQg4gwQg8g0gNhFQgRhbBEhvQAphDAwgeQAbgSAlgJQg9hKg+g4QhihZhrgyIgpgSQiNg3jDgDQkTgDkKBaQkKBajYCrQgsAji0ChQiHB6hiA9QgyAghEAhQglAShVAnQgsAUgRgUIgDgFQACgrgGgtIAAgCQAJhEAihKQAMgaARgeQAig7A1hGQDLkQDWipQDmi0E0hzQD3hdDygbQEHgdDtAyQD9A2DQCQQDaCXB1DYQBcCqAVDEQAJBZgGBXQgHBpgdBmIgGAQIgEAFIgRAXQgHAFgJAAIAAAAgA+I3yQgSgCgRgWQgIgKgHgPQgeg6grhQQgaBAgwAcQgtAag4gJQg3gJgpgkQglghgXg0QgUgvgGg4QgFgvAFg7QACgeAKhMQAJhJAMgmQALgnATgdIgthGQgrhChBhTQg+hQhRhhQg2hAgjgfQg3gvg4gOQhKgShXAjQg/AZhVA8QicBvhkBiQgwAvheBjQhUBVhHAsQgRALgRADQgUADgLgMQgEgDgBgFQgIgSARghQDAmHDnkNQA8hGAxgqQBAg4BBgdQB2g2CPAUQCFASB4BLQBpBBBjBtQBLBSBcCDQBzCjBNCLQBcCoA1CeQBbEUhNCyQgKAXgOANQgNANgPACIgFAAIgEAAgEAMpgy/QgwgoAHg0QAFgjAegfQAVgVApgcQBUg3Beg6QDdiICshNQEgiAE7gvQE7gvE4AnQELAhDBBbQCGBABpBgQBuBlBAB9QAKATABAQQABAUgNAJQgIAFgLAAQgIAAgNgEQhngbjdhaQjOhUh3gbQhpgXiFgHQhWgFiaABQiiABhaAFQiMAJhuAZQhxAZiHA1QhRAhidBJQiyBShbA0QhMAsgVAKQg5AagwABIgGAAQg2AAgrgkgEgaOgyvQgYAAgOgeQgIgSgHgnQgIg0ggg4QgVglgtg8QiDivhmhoQiLiPiQhPQibhXjMglQj9gvidBNQhAAghlBXQhqBdg4AfQADhGAKhAQAXieBEh3QBNiKB6g8QBZgqCHgJQC5gNC2ArQC3AqCgBeQBsA/CABrQBZBLA7A/QBLBQAuBQQAZAsAYA5QAPAkAZBFQAXA+AKAiQAPA2AAAtQABAwgRA7QgJAjgbBGQgVA5giAAIgBAAg");
	this.shape_2.setTransform(-326.7711,553.383);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// hair
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#4C331F").s().p("EA6VBocQAFgEAGgCIgCAGIgJAAgEBM5BcpIABgCQAPAZAGAWQgagZAEgUgEBXUBJDQgWgHgFgqQgMheAAh3QAAhCAGiUQARmKAClOQhNBphYBcQgNAPgOALQgNAYgPAVIgBABQgvCzhDCcQgRAngWAWQgcAdgfgGQgigHgNgsQgJgiAGgvQASiYAPiNQgLAHgLAAQgSgBgTgYQgdgkgUgvQgDBBgIA9IgrAFQgmhEgjhNQAaDfAQDbQACAfgOAaQgQAdgXgLQihkMhrmCQg2jEhjn2QhOmGhRlLQhljwhMj8IgHgaIgBApQCFF4AtFUQADAXAAANQAAAUgFAPQgFASgOANQgOANgSABQgpABgdhHIiemWQgHgEgGgHQgQgQgMgqQgPgzgQg9QhBikgwh1QhZjYhYi5IAXBpQA6EJAXDSQBoE7BlFqQBmFvC3LlQAHAcgEAWQgFAcgVAFQgdAHgdgsQjflLivoKQg3ihhXklQhflDgriEQh8l/kIqBQBRHlhJG9QgNBZgwAOQgWAHgZgLQgXgLgOgWQgNgSgHgbQgEgRgFggQgSh8gUjuQgVj2gPh0QgQhxgXhzIgFABQgMACgMgDQgTgEgTgRQgVgTgYglQibj4imksQCGHyAdHTQADA4gXAsQgZAygqgNQgRgFgPgRQgJgLgMgWQjElmkZpXQj8oXh+kGQhjgwhihEQC0EwCbE6QBQCiAmBoQA1CWAICDQAEBLggAdQggAcgzgRQgqgPgqgmQjXjFjTk7QhTh8kKnCQi5k5jzl6QiZjwkjm5IgGgKQAhBmAsBsQBHCrCEEAIDZGnIARAlIBuC8QIBKuEcGbQAsBAARAqQAaA+gLA1QhCguhCgvIB2C/QhgA5ighjQi4hxi0i2QiLiNiojZIghgqIARAiQBxDmArDJQlsiplHlnQjxkLkcnCQjVlSoAt9QnCsRkjmzIgHgKQAEFgAQGRIApOcQAYImAFF2QADDggJCHQgMDFgqCbQgQA9giAIQgaAHgYgYQgTgSgPghQipl1g8oKQkcn8h4rEQgwkXgemOQghFSgdF9QhRTug5J1IhfANQhSiggvjQQgliigWjiQhErABXtoQAqmiBrqWQkmLwjYNjQkbRxjGYhQgwF9gnCuQhEEyh7DXQhdhTgwiRQgjhsgOimQgom1AxoRQAKhoAOh4QgWgZgKg4QghizgRi7QlfNvm5MGQgzBag7AvQhLA9hIgZQgogOgbgoQgZgmgHguQgFgoAHgxQAFgfAOg5QB7n5Cuo9QicFeiJESQgkBIgbAlQgqA4gzAWQg4AYg+gRQg+gQglgxQgggqgKhDQgGgtADhMQAfqfD0sAQBSkBB2ksIgFg9QkIHwjYIKQiWFrkVLfQj/KMjvGfQhjlpgCmUQgDl2BQmNQBIliCNmFQB2lHC2mEQE1qTFboTQAqhWAuhWQA5huA/huIiQCFQqTJglsEbQCNn6ENnXIgCACQgwAcgdANQgtAUgnADQgtAEgogTQgrgWgPgnQgQgpAUgzQAOglAkgyQBRhyBUhtIgEAAQgmAIgcgOQgZgOgNgeQgMgbADggQACgaANgfQAHgSATglQBojDAyhaQBZidBPh3QC6kWESkZQDajfE+kLQD7jTC1h7QD4inDnhXQBdgjBVgUQBVgdBdgVQjIgLjKgGQgygCgigQQgrgVADglQABgVAYgfQCLiwDOh9QDCh2Dng8QGShqICBEQGPA0FBCNQFiCbDmD8QD+jQC3iHQEujgEOiaQCDhKBjgqQCBg2B0gVQCegbChAfQCiAgCJBVQB/BOAtBiQh9BIjUA3IgoAKQIQgKFpAxQH2BFFyDHQA3AeAfAeIACACQCEgBB0AIQKgAwKdFjQJVE9IfITQA7A6AdAlQAsA3ATA2QAVBAgPBAQgQBFgzAhQg7AnhYgUQhAgPhWgyIgEgCQPAKPMETUQDbFeB2ETQBqD6A7EKQA8EKAKEPQACAogFAcIAgBtQB8GtAcFPQAjGmhrFVQgjBvhAAKQgdAFgegRQgPgIgMgNQgJFshbFaQgXBcg0AKQgYAEgWgOQADB/ACCKQADC7ABGYIgBDHQgCBvgHBYIgLCLQgEBQAGA6QAIBBAAAKQABArgPAcQgZAxhBALQg7AJg5gbQgzgYgqgsQAEBigIBRQgQCbg+CQQiFhrhjiiQhaiSg4i2QgviYgejFIgNhbIgUAqQAHDpgDEGQgEFLgcDSQgnEnhjDfQgKAWgNANQgNALgMAAQgFAAgFgCgEBNYAs+IgIAYIAQBaIADidIgLArgEBVaAgKIACAeIAAgeIgCgFIAAAFgEBiYgRhIADB0IAdAuQB7DJBhDQQgjhygmhoQhQjahnjQIAEBJgEBaEgkOQAsAGAsAMIAZAHQjplej7krQDXE+CcEygEBEshElQAZAJAaAMIj1iVQk0i8i7hmIgKgFQBsBeB7B+IBNBRIB2BrQAOgEAOgEQAmgIAqAAQBOAABXAfg");
	this.shape_3.setTransform(-185.3082,1.3591);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	// Layer_2
	this.instance = new lib.CachedBmp_2();
	this.instance.setTransform(-798.8,365.6,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_3
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#966B4A").s().p("EgWeBOwQhegQiZg4QixhBiMhBQh8g5hrhAQg3gHgsgKQh3gbiAg7Qhqgyh9hOQlcjalyljQjjjbmbnFQlemCimjUQkOlaiVk9IhNiqQguhlgkhAQggg3hLhxQhIhrghg8QhvjIhGlPQhDl4gxi3Qg0iugXhXQgpiZgBhxQgCh9AvhJQAIgMAJgKQAMAlAOBQQAQBXAdArQAUAeAuAmQA6AvAPAPQAdAeAiA3QAuBLALAOQAiAvArAkIAPAoQALAgATBAQApAMAxAeQAgAUA/ApQBTAyBxAfQBSAWB/ASQC7AcC9APQBBAGAngBQA5gDArgTQAggOA0gpQA2gqAcgOQAlgSBSgRQBSgQAlgTQAdgOAwgnQAzgoAagPQAogVBEgQIBxgaQAUgFAYgKQAvg/Ahg5IAyhUQAYgjAZgXIADgOQAYhqAgg/QAshUBPgsQBXgxBPAgQAsARAhArQAeAlAQAyQAOApAGA4IAJBkQAODAgFBHQgMCThLBUQgaAegtAgQgXAkggAmQAFAigGAkQgKA1gfArQgcAng6ArIhiBHQgdAYgkAkIg9BCIgJAJQgbBIgwCKQg1CegnBWQgSAqgnBSQghBIgQA1QgtCcAdDyIAeDLQASB6AEBQIAAAdQB6CdAdAhQA9BHBWBQQAzAwBqBeQB7BsBEA3QBsBYBgA5QCqBoDDAzQBoAdBqAMQAqgEArAGIAcAGQAjABAjgBICOgDQBRAEA4AXQAWAJASAOIAagNQC8hcBegpQCfhGCFgmQCbgnBMgVQCGgmBVgzQA1ggBfhPQBfhQA1gfQAigVBsgwQBYgpAvgkQBkhJBFiLQA3hwAUh9QAUh8gQh8IgWh0Qgtg6gzhNIhtioQiFjOhyhlQg+g2hmhBQhzhHg4gmQjKiJiii8Ig5hBQghgkgfgVQgpgbhDgTIhzgeQhggchug6QhGglh7hOQhmhAg2gdQhaguhOgUQgvgMhggOQhVgPgygeQheg3gviBQgghYgSicQgJhOACgtQAEhFAdgtQAcgtA1gcQAxgZA7gEQAygEA8AKQArAHBCASQE/BXFSCLQD4BnDeByQBCgCBMARQBIAPCAAxIGZCYQBcAjApASQBLAfA3AgQA3AeBLA3IB+BbQEeDHFZBfQFGBaGmABQEDACH1gqQCBgMBDgOQBrgZBGg0QAjgaA/hDQA9hCAmgbQBEgwCFgfQBLgSAzgNQAjgxAtg6QBahxAsg5QB7ihB9jQQBciaB+jrQCBjwBAiaQA2iAAzimQAehjA4jKIIS9/QAShDAHgdQAMg3ACgsQACgugHhBIgPhuQgRiUARiVQAQiUAxiMQA5imBngXIAzgGQAfgDARgJQAZgNATgjIAdg/QAshZBogfQBqgfBMA6QB0BagcD0QgVCwhOEgQhbFUgXB4Qg8E6AFHoQABCHAFENQAEDwgHCkQgFCFgOCjQgJBogUC+Ig1IAQAJAPAHAQQAaA6AEBQQADAzgIBeIgDAmIgUAyQggBUg5CpIgzCNQgeBRgQA8IgaBtQgPBBgOApQgNAlgZA2IgoBZQgUAugUA8IguA1QgrAwgpAfQgRAOglAbQggAYgSAWQgQASgPAbIgYAwQhZC7hgCHQgjAzhRBmQh8Ccg3BRIhLBsQgtA9gqAlQgOAMg4ApIgZATQhGBxhMBtQjdE5kOEPQjPDQkeDlQitCKlhEGQjyCzh+BaQjPCTitBrQkLCklcCrQjiBtmbC3Qk5CKjtBlQiDA2hPAcQh1AphjASQg2AKhBAFIgtAaQhcA1hPAdQiAAvisAQQhDAGg+AAQhmAAhZgRg");
	this.shape_4.setTransform(-206.873,813.1999);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1));

	// highlight
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFCCAD").s().p("EgQXAqdQgmgLgpgZQgegTgpggQhOhAgqg1QgfgmgcgzQgTgjgKgdQgQgyAChEQAChMAWg+QgLAJgMAFQgZAMgbgFQgdgFgPgVQgUgbAKg6QAPhXAlhQQgYAFgVgSQgVgQgGgZQgGgWADgbQADgUAJgdIA1iWQAOgpAKgjQgGgCgHgEQgXgMgJgXQgJgYAJgeQAFgVARghIA0hiIAAgEIABhjQgHgHgGgJQgLgTgBgWQgBghAagmQgBhZgBg7QgGjQgYilQgEghAFgXQAIgeAXgGQAOgEAPAIQAOAHAIAOQALASAFAoIAJBJQAOgXAZgMQAagNAaADQAbAEAWARQAXARAKAZIAHAYQAEAOAFAJQAFAJALALIARATQAYAigDA6QgEBAgfA4QgRAcgCANQgCAHAAAMIAAAUQgCAUgNAaIgXArQgIATgGAbIgKAvQgPBCgjBNQgRAlghA+QgDAugFAkQAGBQADBQQAhgFAVASQAVASgBAiQgBAdgPAfIgdA3QgPAgACAZQAwgjAugfQAqgdAcACQAOABAMAHQAUAEAQANQATAPAJAXQAJAYgFAYQAhgMAkgeIA8g5QAjgiAegSQAngXAlAAQAMAcghAiIgXAbQgMAPgCAPQAWAMAMAYQAMAYgFAYQgGAYgkAkQglAlgGAYQATANAJAYQAJAWgBAZQgBAWgHAZIgRAtQAagTASgKQAZgPAXgFQAagGAaAGQAbAHAQAUQAQAUAEAlIAGA/IAIAhQAFAVABAMQAEApgbArQgSAdgpArQgkAlgSAQQgfAcgeAPIgWAMQgMAIgFAJQgFAHgCAMIgFAUQgGAVgSAQQgQAPgXAHQgRAFgTAAQgZAAgdgIgA0yMMQACgeAAgqQAAgZgDgOQgDgOgHgKQAGBEAFBDgAgPJMQgMgBgJgHQgKgHACgKQABgGAGgGIAKgKQAGgGADgMIAGgVQAFgMANgNIAZgVQAVgSAVgeIAig4QAuhMA3hBQAYgcAyg2QAtgyAWgiQAKgPAQgcIAZgqQA1hRBSg1QAJATgEAaQgDARgLAbQgbBEgZAwQgfA9gkAvIg0A/IgkAtQgKAKgVARQgWASgKAKQgeAdgnBEQgqBJgZAbQgSATgoAgQgWASgPAJQgUALgTAAIgBAAgARFi/QgKgKABgbQAEhpBCiLQBSibAhhQQA6iJAXiyQARiEACjFQABhggChAQgEhYgKhIQgai0hQinQhPioh8iGQgogrgigaQgrghgtgNQgOgEgDgGQgIgMAQgPQATgRAdgGQAbgFAbAHQAqAKA2ApQDICXCTEhQAvBbAYBIQAjBoAOCAQAKBjAACMQAADygeCyQgnDihbCrQgaAxgnA6QgVAhgyBHIhTB3QgQAXgVALQgLAFgJAAQgMAAgIgJgAIiqkQgbgtg+hGQhFhNgYgkIgZgmQgOgWgNgOQgNgOgcgWQgegYgMgMQgOgPgTgbIgfgsIgdgjQgTgWgJgPQgMgSgMgdIgUgyQgOgfgbgyQghg9gJgUQgwhkADhLQABgIADgGQAEgHAGAAQAKABADAVQACAVAPAWQAIAMAUAYQBiByA0BiQAeA3ALAPIAXAcIAZAbIAhArQAVAcAOAPQAPARAiAfQAiAfAPARQAYAbAoA+QA0BRAUAsQAeBBAKBKQAFAfgSAFIgEAAQgNAAgNgWgAsIrKQglgWgQgMQgdgUgTgUQgfgjgdhDQgmhUgJg/QgFggABhNIAEhmQAIhmAchiQAQg1AUgdQAegqAqgHQANgCAGAFQALAHgDAQQgCAGgIARQgHASgCAoIgEA9QgICpABBJQACAuADAsQAEArAFAVQAEARAPAuQAmBqAWB2QACALgEAEQgDAEgFAAQgHAAgJgFgAIvvkQgLgCgOgTQg5hRgXg0QgPgjgMgtQgHgdgMg2QgVhpgIg7QgMhcAFhKIADgnQAAgWgFgQQgCgJgJgSQgIgSgDgJQgMgoAVgiQAFgKANgPQAPgQAFgIIANgWQAJgOAIgHQARgPAaACQAZADAOATQAIAMAFATIAIAiQADAMAKAWQAIAVgBAOQAAAPgJAVIgPAjQgHAYACAyQADBSAEAwQAGBHAMA4QAHAiARBBQAcB3ACB6QAAAcgGANQgFAJgJAGQgHAEgHAAIgFgBgEgHRghCQgMgJAEgTQADgPALgQQBtiaCMh5QCPh9CkhSQBZgsBEgPQBKgQBnAIQBfAJAYAxQAMAagKAdQgKAdgYARQgTANgcAFQgTADghACQhnADgyAMQg7APhZAzQhaA0iyB1QiwB0hdA1QgTALgNAAQgIAAgGgEg");
	this.shape_5.setTransform(521.4855,483.8662);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(1));

	// ear_lines
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#6E5140").s().p("Auja9QgjgmgChSQgDiKA5ieQARgvAWgvQATgrAGgSQALgkgEgcQgCgSgIgSQgKgIgIgKQgMgRgIgTIgYgbIgJgLQglgogrgyQgggogTgbQgagngNgkQgVg7AAhgQAAhEAGhAQAQiaA3iHQAdhIAngbQAYgRAhgHIAFgBQAZgEArgCQB3gFBeAEQAiABAUAEIArAAQA9AAAhAFQAzAJAiAXIAFAEQARADAPAGQAhAMAkAaQAYARAlAiQAxAsAYAeQAjAtAKAtQAJAmgUAQQgKAJgRgBQgMAAgTgGQgwgOgYgJQgmgOgdgSIg2gmIgWgOIgLAFQgQAGgeAEQgjAEgLADQggAHgkAaQguAfghArQg2BIgXCCQgLA9gMB9QgFA0AAAeIAGAIQBNBeAJBdQAHBHghBeQgSA2gsBqQgeBVgIBgQgFA6gDASQgIAqgWAZQgcAhgwABIgCAAQgvAAgdgggAQECWQgGgGAAgPIgSpQQgBgqAJgSQAIgOAOgIQAPgHANAFQAaALABAyQADBdAIBpIAMCQQAGBSgDA+QgCAygLAgQgOAsgfAVQgKAHgIAAQgGAAgFgEgAkkjVIgKgDQgVgHgRgTQgxg4gLhdQgFgjABguIADhOIAAgDQAEi0AGhaQALiaAkhtQATg6AhhDQAWgsArhNQAXgpATgfQAdguAUgZQAvg7BVhDICQhyQAWgSAJgGQASgMARgDQAUgEASAKIAEACQAQAKACARQADAXggAgIhTBSQhuBugsA3QhZBsg7CAQg7CAgZCJQgZCJAEDFQACBwAHBkQAGBIgEAjQgFAggPALQgJAIgNAAIgIgBg");
	this.shape_6.setTransform(502.8134,443.0432);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#B08267").s().p("EgEiAhIQAOhEAJgbQAGgVAOgjIAUg3QAjhoAGiYQABiwADhXIACg3IABg4IgChhQADg3AYgiQALgPALADQAIABAHAPQAWAyAPA3QARBFAGBZQADA1ABBsQABBegDA8QgLDIhGCGQhAB6h0BPQAMghAOg+gAufYGQhKgEgugOQg/gVgegsQgQgZgGgjQgFgZgCgoQgDhkAOg+QALgsAbg7QAVguAYgqQg5CfADCKQACBSAjAmQAdAgAxgBQAwgBAcghQAWgZAIgqQADgRAFg7QAIhgAehUQAshrASg1QAhhfgHhGQgJhdhNheIgGgIQAAgeAFg1QAMh9ALg8QAXiCA2hIQAhgsAugfQAkgYAggIQALgDAjgEQAegDAQgGIALgFIAWAOIA2AlQAdARAmAPQAYAIAwAPQATAFAMABQARAAAKgIQAUgRgJgmQgKgsgjgtQgYgegxgsQglghgYgSQgkgaghgMQgPgFgRgEIgFgDQgigYgzgIQghgFg9AAIgrAAQgUgEgigBQhegEh3AFQgrABgZAFIgFABQAsgaBCgEQAUgCBwADIBYAAQA1AAAjAEQAwAGA5ATQAkALBCAaIB3AvQAvASAVAKQAlASAbATQAiAYAqAwQBBgEAfgRQiMhohCg7Qhthig/hiQgUgfgdg4QARADANgJQAPgMAFgfQAEgjgGhIQgHhlgChwQgEjEAZiKQAZiJA7h/QA7iABZhsQAtg4BuhuIBShSQAggfgDgYQgCgRgQgKQAegQAggOQCUhFCTgaQChgcCSAaQCeAcB/BbQCGBgA8CLQAnBZAMB4QAIBSgECIQgGD/gZC9QgRCHgfBRQgYBBguBJQgcAsg9BVIhPBtQABBDgGAiQgIAvgfBLQhJCthvCaQgWAggRARQgZAYgbAJQggAKghgKQgVgGgGgNQgGgMAFgXQAQhIA+hjQBViFAPgeQARgkAXhDQAUg3AHgfQAGghADg6QAIixgTivQgHgFgGgGQgNgQgJgYQgGgQgIgdQgsi2gNiXQgPi0AbiaQAJg7AhgJQAQgFARAJQAQAJAIAQQAMAVADAvIALCwQAGBZAFAwQAIBMANA8QAIAjATBHIACAKIASAnQAWA0AOBQQANBTAGBoIACA1QAxhmAkhuQA+i9ASjFQAJhjABjIQAAhwgGg6QgKhegfhEQgshfhchDQhYhAhsgYQjAgqjoBOQi3A8iEBqQgjAdgnAmQANAXgFAjQgCARgHAWIgNAmQgWBHAHBPQAHBLAmBpIAoBsQAOAhAIAQQAOAbAQASQANANAaATQAeAVAKAKQAaAXAdAxQAlA+AMAQQAKAMAXAaQAWAYAKAOQASAYAPAiQAJAUARArIAGAPQANgEAOAAQAfgBAdAUQAaARATAdQAbArAKA+QAHAqAABIQAAA2gDAiQgEAxgLAmQgTBBg6BXQhRB5hbBXQheBahwA+IhVAsQg2AcgfASQg1AigcASQgUAyg8A1Ig1AuQgfAcgSAWQgoAzgYBQQgJAggXByQgeCXgvB1Qg4CKhUBjQgzA9gxAWQggAOgsADIgdABIgxgBgANptoQgOAHgIAOQgJASABAqIASJSQAAAPAGAGQALAJASgNQAfgUAOgsQALghACgyQADg+gGhSIgMiRQgIhogDheQgBgygagKQgFgDgGAAQgJAAgIAFgAzUHrQgthPgEhvQgDhOAShsQgHBBABBDQAABhAVA7QANAkAaAmQATAcAgAnQArAzAlAoQhlg6gyhWgApExNQACivAih0QAyilCOinIAGgHQgTAfgXApQgrBMgWAsQghBEgTA6QgkBsgLCbQgGBZgEC0IAAADQgUhcACiDg");
	this.shape_7.setTransform(518.9229,475.7991);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6}]}).wait(1));

	// flesh
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#DEA6A6").ss(1,1,1).p("Eg+chv5QWW19cmAAUAjYAAAAZyAhnQCHCvCCC9UAbEAnTAAAA3kUAAAAwTgUcAkAEgU/CF3UggMgEWgXpgiVQiGjDh8jI");
	this.shape_8.setTransform(-191.35,449.0125);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#E4A985").s().p("EhjNBfMQiGjDh7jIQhwjYhojcIgXgyQi7mUibmeQgvizgri8Qg/kRhNmaIgIl6IgChxQgKorAamEQAhn8BmmkQAti5B1l4QBylxAujAQBPlQAlmRQAdk8AHmwIAFrwQAEm/AUkvQAzrxC/reQC/rfFCqqQB+kLEloeQBeitBMiTQWW19cmAAUAjYAAAAZzAhnIAJgCQgJiMBmh0QBlhyCOgUQCJgTCHBFQCCBCBOB6IAzBXQAfA0AbAeQAkAoAuASQAzAUAtgQQgYixBVibQBcinCggOQCCgMCABmQBgBNBiCTQEyHHClHVQBBC5A7DvQAkCNA/EiQCMKDAiFVQA4IohpGtIgNAxQAlI8gJK4IgBA9IAigoQA+hKB6iXQDBjnDjjOQCfiQCJhaQCqhwCngzQBggeB1gOQBfgMB7gEQCBgEBcAKQB4ANBeAkQCCAzB8BzQBdBWBwCRQBZB0A9BgQBKB1AvBvQB7EigRFeQgQFAiCFCQhwEVjKEoQiXDdj9EtQjPD2hEBaQiTDDhQCsQg7B+hGDlQhQEGgnBhQhVDViKDEQiFC9iuCiQjSDCjJBTQi6BNjKgEQjOgEiwhYQgxgYgugfQgIgRgMgOQgXgcgkgNQgkgNgjAGQgkAGgeAYQgeAXgOAiQgPAjAAA9QABBUgCAPQgDAVgIAdIgNAxQgcBqgBCWQAABOAJA5QgoAwgpA/QgrBChSCGQhGBphxCFQhBBMiGCXQigC5jEEGQhrCPjMEZUAUcgkAAAAgwTUAAAg3kgbEgnTQiCi9iGivQCGCvCCC9UAbEAnTAAAA3kUAAAAwTgUcAkAIgbAmQmnJAkxEtQkxEtm7EvQkLC4onFLQk/C/ifBZQkNCXjhBkQgzAWjuBkQiyBKhtA2Qh8A9hmBDQiTAyhdAaQlcBinNAfIhCAEUggMgEWgXpgiVg");
	this.shape_9.setTransform(-48.0607,449.0125);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_9},{t:this.shape_8}]}).wait(1));

	// neck
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#C98C67").s().p("EBIbBFIMgshgAWQn7gEkag5QmthXj8jxQhghlgzguQhZhQhTgXQhegZh9AjIjZBPQibA4ilAUQilATikgTQhwgNjpg4Qjgg2h5gMQhhgKh5ADQhJACiRAJIr4AyQnpAgkIgWQmggjkfinQiNhRhwhyIhmAkQmJCHkNArQl0A7kqhOQlfhdkDkaQkBkahClmQhBllCLlkQCJliEhjfQCriFD0hjQCjhCEohWQFUhiB9gsQEAhbCyhyQEXixC6kcQC7kbA0lGQAViFAIk2QAIkeAgibQBLlnEHkXQEJkYFihcQFjhdFuB3QFvB3DnEcQEPFNA1IFQAIBKADBPQAdgaAdghQAkgnBmiIQDAj+DajDQDsjUEEiIQEViSEog2QE4g4EkA0QBLi/BilSQBxmGAyiOQBmkmCBjXQCbkBDKijQEUjfFwgyQFwgyFFCOQFGCNDXEvQDYEuAaFiQAWEoh0F7QgpCGhKDEIh7FGQjZJUhYJgQhbJ3A1JfQANCMAWBZQAeB7A8BVQBCBcBzBGQBbA3CHAwQFABxH7BBQCNASEbAfQD+AeCoAcQHYBRFaCwQGfDUDMFRQC6E0gNF7QgNF7jPEoQimDtkWClQj7CWk5BLQkGA+lSASQidAJkYAAIiqgBg");
	this.shape_10.setTransform(-177.9957,1273.9556);

	this.timeline.addTween(cjs.Tween.get(this.shape_10).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-903.6,-667.1,1598.7,2383.5);


(lib.heart2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EF7070").s().p("ADSFOQgSgGgFgOQgFgPANgRQABgCAXgVIAXgYQANgPAKgHQAHgGAkgVQAegSA3gsQAsgmAUgZQAMgPAagpIApg/QAMgQAIgCQAHgCAJAFQAIAFADAIQAFAOgFAUQgIAcgZAqQgkBBgWAhQgkA1gkAjQg1AzhLAmQgkASgaAAQgLAAgJgDgAoTAnQgQgTgFgLIgKgjIgOgnQgLgjADgnQACgmAQgiQAghEBGgoQAYgNASgDQANgCAlACQAsAFAVAGQAkAMARAYQAQAVgEAVQgDAOgMALQgLAKgQAFQgPAFgtABQgmABgUANQgWAOgNAjQgGATgHAoQgFAWgKAfIgRAzQgIAagOADIgBAAQgMAAgOgQg");
	this.shape.setTransform(160.2565,34.4419);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CC0000").s().p("AgyHpQgpg2goggQgUgPgYgOQgVgggOgSQgxg9hUgpQgmgghDg0QhRhAgqglQhBg5gZgxQgVgpgMhLQgViQAbhjQAJgmAPgbQAKgVARgUQAGgIAHgIQAsg1A6gWQANgFAPgDQAWgKAXgGQBRgVBPAOQBKAMBiAxQBOAnAyApQAfAaAYAbQAfgiAlggQB0hgCTgXQBcgNA6AbQBBAcAtBUQAwBcgBBsIAAAZIAAAKQADCVg+BaQgWAggmAhQgTARg0AoQh+Bih3BuQgcAmgQAmIgQAbIhKCAQgjA4gRAnQgIARgKAfIgQAGQgqhhg5hNgAIqkYQgIABgMAQIgpBAQgaAqgMAOQgUAagsAlQg3AtgeARQgkAUgHAGQgKAIgNAPIgXAXQgXAVgBADQgNAQAFAPQAFAPASAGQAeALA0gbQBLgmA1gyQAkgjAkg0QAWgiAkhBQAZgpAIgdQAFgVgFgOQgDgHgIgFQgGgEgGAAIgEABgAmoocQgSAEgYANQhGAoggBDQgQAjgCAmQgDAnALAjIAOAmIAKAkQAFAMAQATQAPAQAMgBQAOgCAIgaIARg1QAKgeAFgXQAHgoAGgTQANgiAWgPQAUgMAmgCQAtgBAPgFQAQgFALgKQAMgLADgOQAEgVgQgVQgRgXgkgMQgVgGgsgFIgigCIgQABg");
	this.shape_1.setTransform(160.4916,54.895);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#EF7070").s().p("ADAExQgRgFgEgOQgEgNALgPQACgDAVgTIAUgVQAMgOAJgHQAHgFAhgUQAbgQAygoQApgjASgXQALgNAYgmIAlg6QAZgSAIAFQAHAFADAHQAFAMgFATQgHAagXAmQghA7gUAfQghAwghAgQgwAuhFAjQgiARgXAAQgKAAgIgDgAnlAjQgPgRgFgKIgJggIgMgkQgLgfADgkQACgjAPgfQAdg+BAglQAWgMAQgDQANgCAhADQAoAEATAGQAhALAQAVQAPAUgEATQgYAggOAEQgOAFgpABQgjABgSALQgVAOgLAfQgGASgGAkQgFAVgJAcIgQAvQgHAXgMADIgCAAQgKAAgNgPg");
	this.shape_2.setTransform(160.2667,36.2005);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#CC0000").s().p("AgtG/QgmgyglgcQgSgPgWgMQgTgegNgQQgtg4hNglQgigeg9gvQhLg6gmgiQg7g0gXgtQgTgmgLhEQgTiDAYhbQAIgjAOgZQAJgTAQgSQAFgIAHgHQAogwA1gUQAMgFANgDQAUgIAWgGQBKgTBIANQBDAKBaAtQBHAkAuAmQAdAXAWAZQAbggAigcQBrhYCGgVQBUgMA1AYQA8AaAoBNQAtBUgBBiIgBAXIAAAKQADCIg4BSQgVAegiAeQgSAPgvAkQh0BahsBkQgZAjgPAjIgPAZIhEB1QgfAzgQAjQgHAQgKAdIgOAFQgnhZgzhGgAHojwIglA6QgYAmgLAOQgSAXgpAiQgyApgbAQQghASgHAGQgJAGgMAOIgUAWQgVATgCACQgLAPAEAOQAEANARAGQAcAKAvgZQBFgiAwguQAhggAhgwQAUgfAhg7QAXgmAHgaQAFgTgFgNQgDgHgHgEIgEgBQgJAAgUAOgAmEntQgQADgWAMQhAAkgdA+QgPAggCAiQgDAkALAgIAMAjIAJAhQAFALAPARQANAPAMgBQAMgCAHgYIAQgwQAJgcAFgUQAGglAGgRQALggAVgNQASgMAjgBQApgBAOgEQAOgFAYggQAEgTgPgTQgQgWghgLQgTgFgogFIgfgBIgPABg");
	this.shape_3.setTransform(160.4862,54.89);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#EF7070").s().p("ACuEVQgPgFgEgMQgEgNAKgNIAVgUIASgTQALgNAIgGQAHgFAdgRQAZgPAtglQAlgfARgVQAKgMAVgiIAig0QAKgNAGgCQAHgCAHAFQAGAEADAGQAEAMgEARQgHAXgUAiQgeA2gTAcQgdArgeAeQgsApg+AgQgeAPgWAAQgJAAgHgCgAm3AgQgOgPgEgKIgIgdIgMggQgJgdACggQACgfAOgdQAag4A6ghQAUgLAPgDQALgBAeACQAkAEASAFQAeAKAOATQANASgDARQgCAMgLAJQgJAIgNAEQgMAEglABQggABgRALQgSAMgKAcQgGAQgGAhQgEATgIAZIgOArQgHAVgLACIgBAAQgKAAgLgNg");
	this.shape_4.setTransform(160.2615,37.9235);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#CC0000").s().p("AgpGVQgjgtghgaQgQgNgUgLQgRgbgMgPQgpgzhFgiQgggag3grQhDg1gjgeQg2gvgUgpQgSgigKg+QgRh3AWhSQAHggANgXQAIgRAPgQIAKgOQAlgrAwgTQAKgEANgDQASgHATgFQBDgSBCAMQA9AJBRApQBAAhAqAiQAaAVAUAWQAZgcAfgaQBghQB6gTQBMgLAwAWQA2AYAlBGQAoBMgBBZIAAAVIAAAIQACB7gzBLQgSAbggAbQgQAOgqAhQhpBRhjBbQgWAfgOAgIgNAWIg+BqQgcAvgOAgQgHAOgJAaIgMAFQgkhRgug/gAHKjoQgGABgKANIgiA1QgVAjgKAMQgRAVglAfQgtAlgZAOQgdARgHAFQgIAGgLAMIgSAUIgVATQgKAOAEAMQAEAMAPAFQAZAJArgWQA+gfAsgqQAegcAdgsQATgcAeg1QAUgjAHgYQAEgRgEgLQgDgHgGgEQgFgDgFAAIgEABgAlfm/QgPADgUALQg6AhgaA4QgOAcgCAgQgCAgAJAdIAMAgIAIAeQAEAJAOAQQAMAOAKgBQALgCAHgWIAOgrQAIgaAEgSQAGghAGgQQAKgdASgMQARgKAggBQAlgBAMgEQANgEAJgJQALgJACgLQADgSgNgRQgOgUgegKQgSgFgkgEIgcgBIgNABg");
	this.shape_5.setTransform(160.4675,54.872);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1},{t:this.shape}]},2).to({state:[{t:this.shape_3},{t:this.shape_2}]},1).to({state:[{t:this.shape_5},{t:this.shape_4}]},1).wait(2));

	// Layer_1
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AhKEWQgOgCgHgMQgIgOAGggQAEgTACgUQAGgqADg0IABgxQABgdADgTQADgZANgIQAFgDAHAAQAHABAFAEQAKAGADAYQAGAsACBaIgBAWIgEAYIgBAcQgBARgLAhQgHAUgJAIQgHAGgLAAIgGgBgADVDmQgIAAgHgHQgHgHgDgJQgEgKAAgaQAChdgDh0QgChYgMgxQgFgTgIgFQgHgGgSAAQiPgEhIAIIg/AHQglAEgbgCQgVgBgLgGQgSgKACgRQABgQATgJQALgEAVgBQAagCAygHQAzgIAZgCQAigDBCAAIBRAAQAmAAARAHQAtASAQBJQAKAqAFBMQAFBggCBTQgBAzgHAZQgEAQgKAKQgKAMgMAAIgDgBg");
	this.shape_6.setTransform(248.1864,62.4048);

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(6));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(90.1,-11.3,184.20000000000002,132.5);


(lib.head = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("ABMDEQAVhEAKgjQAThFADhJQACg9gLguQgIgjgRgOQgVgQgsADQhlAHhbAoQgQAIgJABQgQABgIgKQgFgIACgLQACgJAHgJQASgXApgUQBLglBRgJQBNgKAtAbQAmAWAVAvQAQAkAGA3QAJBYgSBYQgTBYgsBOQgjA+gpARQgFgtAQg8gAi7EhQgJgHACgQQABgOAGgPIAOgcQASggAdhCQAMgaADgNQAEgNADgXIAGgkQADgNAFgFQADgEAFgCQAFgCAEABQAJADAFARQALAqgBAZQgBAXgIAaQgGASgNAdQgMAegOAaQgMAYgKAPQgPAUgRAMQgLAHgJAAQgFAAgFgDg");
	this.shape.setTransform(272.0971,85.2247);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AEgDEQAVhEAKgjQAThFADhJQACg9gLguQgIgjgRgOQgVgQgsADQhmAHhbAoQgQAIgJABQgQABgIgKQgEgIACgLQACgJAGgJQASgXApgUQBLglBSgJQBNgKAtAbQAmAWAVAvQAQAkAGA3QAJBYgSBYQgTBYgsBOQgjA+gpARQgFgtAQg8gAAYEhQgJgHACgQQABgOAGgPIAOgcQASggAdhCQAMgaADgNQAEgNADgXIAGgkQADgNAFgFQADgEAFgCQAFgCAEABQAJADAFARQALAqgBAZQgBAXgIAaQgGASgNAdQgMAegOAaQgMAYgKAPQgPAUgRAMQgLAHgIAAQgGAAgFgDgAjcDiQgCgCAAgEQAAgfALgpIAWhIQAShDADhFQAChJgbglQgQgWgagMQgYgNgdgBQgxgDg5AaQgQAHgHgDQgFgCgDgFQgCgFAAgFQAAgJAGgLQAQgdAhgRQAegQAkgDQAygEAuASQAwASAdAmQArA3ADBaQACA9gQA7QgPA9ggA0QgeAygkAUIgEABIgCAAg");
	this.shape_1.setTransform(250.8612,85.2247);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AIeDxQAWhEAJgjQAUhFADhJQACg9gLguQgIgjgSgOQgUgQgsADQhnAHhbAoQgQAIgJABQgQABgHgKQgGgIADgLQACgJAGgJQASgXAqgUQBLglBSgJQBMgKAtAbQAnAWAVAvQAPAkAGA3QAKBXgTBZQgTBYgrBOQgjA+gqARQgEgtAPg8gAEXFOQgJgHABgQQABgOAHgPIAOgcQARggAdhCQAMgaADgNQAEgNAEgXIAFglQAEgNAEgFQADgEAFgCQAFgCAFABQAIADAFARQALArgBAZQgBAXgIAaQgGASgMAdQgNAegNAaQgMAYgLAPQgOAUgRAMQgMAHgIAAQgGAAgEgDgAqkEyQgCgDgBgHQgIhGAWhRQAPg2AmhaQAkhUAfgsQADgEADgCQgQgqgMgqIgMglQgHgUgHgPIgKgUQgEgMADgJQAEgKAMgEQAMgDALAFQAQAHAPAZQAPAbAXA/QAlBhAjBKIADAGIACgGQAIgRARgcQA+hrAyhvQAIgRAHgGQAGgFAHAAQAIgBAFAFQAJAIgGAXQgrCNhZCFQgPAWgMANQAfA6AhAxIAdArQAQAZAIAUQAKAXgKAKQgJAJgSgFQgWgGgbgdQglgngqhIQgyhXglhcIgDAJQgNAtgKAcIgWA0QgNAfgdBkQgZBSgXAtQgDAGgEABIgDABQgDAAgDgFgAAhEPQgCgCAAgEQAAgfAMgpIAVhIQAThDAChFQAChJgbglQgPgWgbgMQgXgNgcgBQgygDg4AaQgQAHgHgDQgFgCgDgFQgDgFAAgFQAAgJAGgLQAQgdAhgRQAegQAlgDQAxgEAtASQAwASAeAmQArA3ADBaQACA8gQA8QgQA9gfA0QgeAygkAUIgFABIgCAAg");
	this.shape_2.setTransform(225.4408,80.715);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("ANGDxQAVhEAKgjQAThFADhJQACg9gLguQgIgjgRgOQgVgQgsADQhmAHhbAoQgQAIgJABQgQABgIgKQgFgIACgLQACgJAHgJQASgXApgUQBLglBSgJQBNgKAtAbQAmAWAVAvQAQAkAGA3QAJBXgSBZQgTBYgsBOQgjA+gpARQgFgtAQg8gAI+FOQgJgHACgQQABgOAGgPIAOgcQASggAdhCQAMgaADgNQAEgNADgXIAGglQADgNAFgFQADgEAFgCQAFgCAEABQAJADAFARQALArgBAZQgBAXgIAaQgGASgNAdQgMAegOAaQgMAYgKAPQgPAUgRAMQgLAHgJAAQgFAAgFgDgAl9EyQgCgDgBgHQgHhGAWhRQAOg2AnhaQAkhUAegsQADgEADgCQgPgqgNgqIgLglQgHgUgIgPIgKgUQgEgMAEgJQAEgKAMgEQALgDALAFQAQAHAPAZQAQAbAXA/QAkBhAkBKIADAGIACgGQAIgRAQgcQA+hrAyhvQAHgRAIgGQAFgFAIAAQAHgBAFAFQAJAIgGAXQgrCNhXCFQgPAWgMANQAeA6AhAxIAdArQAPAZAJAUQAKAXgLAKQgJAJgQgFQgXgGgbgdQgkgngqhIQgyhXgmhcIgCAJQgNAtgLAcIgWA0QgMAfgeBkQgZBSgXAtQgDAGgDABIgDABQgEAAgDgFgAFJEPQgCgCAAgEQAAgfALgpIAWhIQAShDADhFQAChJgbglQgQgWgagMQgYgNgdgBQgxgDg5AaQgQAHgHgDQgFgCgDgFQgCgFAAgFQAAgJAGgLQAQgdAhgRQAegQAkgDQAygEAuASQAwASAdAmQArA3ADBaQACA8gQA8QgPA9ggA0QgeAygkAUIgEABIgCAAgAonDeQgHgDgNgIIgUgMQgPgHgVgDQgOgBgZAAIi7gCQglAAgVgFQgfgHgRgUQgXgcAHg9QAGg+AghuQAih2AIg4QAEgZANgBQAIgBAGAIQAFAIACAKQAFAkgJAuQgDARgRA/QgbBjgNBpQgCAWAHAKQAGAHALADQAIACANAAIBFAAIgDgJQgDgLACgNIAGgXIAqiWIARg4IANgqQAOgzADgyQAAgPAEgHQADgFAFgDQAFgDAGABQAIADAEAPQAIAbgCAjQgCAagIAkIgOA4IgnCSIgOAwQgKAbgMASIAkAAQBBABAgAEQA3AGAmAVQALhIAliPQAkiOALhLQACgOAEgGQADgFAFgCQAFgCAFABQAJADADAQQAHAfgEAmQgCAbgJApQgMA3gcBsQgXBigHBEQgBALgCAGQgCAJgGAGQgHAIgNABIgEAAQgJAAgKgEg");
	this.shape_3.setTransform(195.8808,80.715);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape_2}]},2).to({state:[{t:this.shape_3}]},2).to({state:[{t:this.shape_3}]},25).to({state:[]},1).wait(62));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,293.7,115.3);


(lib.girlprofiletalking = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// hair
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#C3A16A").s().p("EAYtCmIQh0gvgOieQgKh+AzifIG51VQAtiNAShKQAch4AAhjQAAhqgiiHQgJgjg8jJQgjhzgeh3QgZAzgcAvQilEQj9BCQht1WhGqwIggk1QgpI7iDIJQikKKkrIfQhvDKigDuQhiCTjFEVQguBAgbAeQgsAxguAZQg3Adg9gFQhBgFgkgsQgigrABhEQABgxAVhKQBAjoBmlGICworQDTqlBZm+QBln8Aco6QiDInj1GwQgeA0gWAbQgZAfgbATQg6Crg7CcQjlJfkTHuQgYArgQAVQgZAhgcASQBRnBCppPIE3wDIAtiWQgMjkgBmjQgBvJgEl3QgHpSgUnqIgHBNQiNVWo6TIQgXAwgbgBQgaAAgJggQgHgaAGghIDCvTQBinxAsj8QBKmgAllRIADgXQgLgsgCg5QgMlTgaytQgLnmgNmGIgKg5QgKCsgRCWIAGBcQAICNgCEWQgCDpgEB0QgIDBgVCaQgQBygdCHQgWBmglCRQhQE6hMD4QhcEphmD8QgSAtgdAbQgjAfghgRQgogVAJhUQAVjTANhnIASiHQAPmHAmmvQAVj0AgkhQiBkBhJlGQhBklgimiQgkB2grBzQgOAngWAXQgbAcgegIQgTgFgOgUQgJgOgKgaQicmWhho2QgjjLgokqIhDn2QgqktgxkdQgFEQgjEOQgGApgSAcQgWAhgegHQghgHgTg6QhWkOg8l/Qgjjcg7m8Qg/mnhXkyQgQg5gRg2IgJgJQB1HsgUHHIAYCEQBmIzBlLCQA+GxBvNJQALBUACAtQADBIgNA5IhUALQkVv7i5wYQgjjDhDmIIgThrQjdlPjmoGQgphchwkIQkAjlj4kzQhZhthjiIQCtGzBqEoQFhPXCjMzQAIAogCAbQgDAlgXASQgVASgggEQgegEgWgVQgTgRgPgdQgJgSgOgjMgV6g6iQiMjiiIjmIglg/IARAxQBBC7BmD9QBxEWEbKLQECJRCEFRQAeBMAAA7QgBBMgzAfQhMAth+hjQibh6iUiNQlQlAjIlPQhKh8hKigQg0hvhNi3IgKgYQkRmNjKoTQgmhlgmhuQA5DaBMDjQCxIWFVLYQAhBIAOAkQAXA9AHAzQghANgpgRQgegMgmgfQkqjujhl9Qi8k/iQmxQjhqkg8rGQg8rMBwq4QANhTAOgwQAVhGAigxQAog5A+gbQBDgeA8AUQBFAXArBRIANAaQAQgqAVgjQBAhrBxhBQBug+B6gBQAJhuAJhCQAUiZAnh2QAjhqA1g2QAigiAsgPQAwgQAqANQASAFAQAJQApgZAugQQAjgMBIgPQBKgPAigLQARgGAlgPQgyingOiUQgOigAnhlQAZhBAwgtQAzgyA+gNQA+gNBDAYQA+AVA0AwQAsAnAqA9QAZAlAsBNIA/BuQCji3D7hwQD8hwFCgwQD9glFbgEQFfgEEVAeQFPAkEWBYQFIBoE2DCIAaAQQCUg6CmgVQDPgbDFAiQFkA/F7DmQEFCeGFFAQCJBwA+AuQBzBUBlAwQCaBLDyAuIFOA1QDIAfCBAmQCUArCiBOQCDA/CiBhQILE5HjGwQHHGVGaH3QGIHhFDIVQFDIVD1I7QGQOmCeO7QBFGnAcHaQAZGjgHHkQgTU0j4RMQixMRk1LpIgJBVQgdEOhICoQhgDgi0BJQkkImlqH8QgkAygiAqQgMA8gTA5QgMAhg8CJQguBngOBGQgOBEACBZQABAiAKB9QAVEdhKDVQhbEGjWA9QCUDHggEsQgZDziKEbQhjDJhjCJQhrCUiPBFQilBQh9hRQgbCNgHFIQgGEwgpChQgdBzhBBpQhDBrhZBLQjNCqjVhDQiXgwhdiYQguB/g2B9QkCJTmoHfQhXBihSAtQhDAkg8AAQglAAgigNgEhFVhSmIg0haIgfg1IghgmIB0C1gEhk8iFoQAPAQAMATQAEgpAHgjQgagMgHgaIgFBPgEhBggnyQgYgDgWgPQgQgLgWgWIgjgjQgfgcgygaIhYgqQhug4hdhVQhdhVhDhrQgeBmg1AFQgZACgcgTQgMgJghgfQgzgxhOgpQgxgZhhgmQgTgHgIgCQgQgEgMABQgkAEgqBBQgsBBgiAGQgeAFg0giQg2gkgdABQAGApACAVQACAjgGAbQgHAggUAXQgVAagcAFQgjAIgjgbQgegWgVgoQgNgYgVgyQgUgsgVgXQgGAwgoAhQgpAggtgHQgDAfgOAYQgOAcgYAKQgaALgagSQgcgRAFgcQheAJhWg1QhXg1gnhbQgihQADhvQADhGAXiAQAKg2AIgcQANgsAVgfQAYgkAlgSQAngSAkAMQAlANAWApQAVAkAEAvQACAcgCA6QgDA5ADAdQAQggAogKQAigJApAJQAwAOAZAFQAqAKAdgHQgGguAdgsQAcgpAtgRQBMgeBmApQAgAMA0AbQA7AfAYALQBeAqBmAKIBiAIQA4AHAjAXQARALAfAdQAfAcASALQAUAMAdAKQARAGAjAJQBaAdBVBAQA9AtBFBJIAqAsQAYAZAVAQQAZATApAWIBEAkQA6AjBAA5QAnAiBIBKQAZAaAMAQQATAYAIAXQAJAcgFAdQgHAegVAPQgQAKgVAAIgJAAg");
	this.shape.setTransform(536.4418,-167.701);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(139));

	// eye
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#0000FF").s().p("AA4I2IgDgBIgDgBQg+gTg2heQgTgjgag7QAcgSAbggQAcgkAPggQAdhEgIhKQgGgugchLQgchIgcgmQgQgYgogoIgvgwQgdgegNgLQgPgMgOgJQADg1AGhOQAEglAEgYQA2gIAngYIANgIIAjgZIAHgEIALAGQAgARAjAhQAfAeAiAsQB9CiAqCYQAWBNAKBhQAOCAgTBUQgSBTg+BqQgoBIgrAwQgOgBgNgDg");
	this.shape_1.setTransform(40.572,-280.775);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("Ao4JDQArgwAohIQA+hqAShTQAThUgOiAQgKhhgWhNQgqiYh9iiQgigsgggeQgjghgggRIgLgGQAQgJAPABIAHACIACgEIAFgIIADAAIAKAAIAWABIAOAAIABAAIAEAAIAiABQAvAEAlAJQAMADAPAGQAXAGAeANQA3AWAWAIIADABQApANBOAPQAaAEAWAGQAuAJAZAHQA4AQBgAsQBpAuAvAQIBrAcIA1APQAfAKAWAKQArATA/AqIBaA7IANAIQAzAeAuAPQAZAIAYADQgTAegiAhQhiBciKBQQhqA/idBHQjGBamsCqQg1AUgeAHQgVAEgUAAIgKAAg");
	this.shape_2.setTransform(105.775,-281.6839);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AmPJ2IgGgNQgLgYgLgaIgBgDQgrhogUg8QgghcgNhNQgNhXAChvIAEhDQAOAJAPAMQANALAdAdIAvAwQAoAoAQAYQAcAmAcBIQAdBMAGAuQAIBKgeBEQgPAggcAkQgbAggcASIgBgBgARVC3QgYgDgZgIQgugPgzgeIgNgIIhag7Qg/gqgrgSQgWgKgfgKIg1gPIhrgcQgvgQhpguQhhgsg4gQQgZgHgugJQgWgGgagEQhOgPgogNIgDgBQgWgIg3gWQgegNgXgGQgPgGgMgDQglgJgvgEIgigBIgEAAIgBAAIgOAAIgWgBIgKAAIgDAAIgFAIIgCAEIgHgCQgPgBgQAJIgHAEIgjAZIgNAIQgnAYg2AIQgaAEgeAAQgdABg2gEQg6gFgaAAIh9AFQhLABgwgQQgPgFgagLQgPgEgNgFQgLgFgFgFIgagKQgagGgMgFQgVgHgMgNQgPgQgDgYQgDgXAIgVQAIgVARgOQARgOATgDQgKgoAZglQAZgkAkABQAYABAaATQANAJAfAeQA2A2ArgJQgQgWgFgeQgFgdAKgbQAJgbAZgPQAYgPAXAIQAVAGAlAnQAiAkAYADQgFgeAVgZQAUgZAcgCQArgFA4AtQANgoAqgMQAqgMAcAdQAIAJAJARIARAcQAWAjAaAAQAJgBANgGIAWgMQAXgOAagBQAagBAWAOQALAHASARQATAUAIAGQAWARAqAJQA0AMAOAGQAnAQAnArIDSBBIDuBLQDEA8BkAuQCnBNCTCDQAcAZANAcQAQAjgQAZQgZAHgcAAQgOAAgPgCg");
	this.shape_3.setTransform(69.2654,-308.1985);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(139));

	// nosalines
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#7D5D5D").s().p("AEuGMQgSgDgOgLQgPgNgBgRQgBgRATgZQAWgeAXgPQAggUA6gFQBWgHAMgDQAZgGAngQQAXgJALgGQATgKALgLQAXgVAJgmQAHgbACgxQAEhOgDguIgQiEQgIhOANgzQAHgcAOgLQAKgIAPgBQAOgBALAIQALAIAHAQQAFALAEAUIAXBrQAQBNAEAbQALBOABBdQABAngDAYQgDAigLAbQgJAWgaAoQgfAvgVATQgTARgcAPQgSAKgiAOQg3AXgbAGQgoAKg9gCIg9gBIgiAEIgTABIgQgBgAAEDQQgZgIgNgGQgMgFgjgZQgrgBgngPQgPgGgUgKIgjgTQgagNgPgBQgJAAgTAEQg3AKh8AFIjtAJQgtACgVgLQgOgIgJgOQgIgOgBgQQgCgqA4gsQAfgYAZgLQA1gaBMABQArABAgAHIAlAIQAnABATADQAXACAwAQQBOAaAkAQQAXALAyAdQAoAXAUARQANALAKAMIARAMQAcAVANAMQAUAUAKAVQAFAMgEAFQgDAEgGAAQgFAAgFgCg");
	this.shape_4.setTransform(-138.6243,47.4194);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(139));

	// shading
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#DEA6A6").s().p("EgJ3AgzQglgGgmgbQgcgVgiglIgkgmQgVgVgUgLQgYgOgagDIgLAAQiRhviAhGIgJgEIgpggQh6hcg6gzQhfhUg8hTIgvhFQgOgUgOgQIAPgYQAVgeAagOQAfgQAoAEQAjAEAmASQATAKAuAcQAoAZAZAKQAPAGBMAXQA4AQAdAWIAgAYQATANARgBQAMgBASgJQAVgLAKgBQAKgCAYAEQAWAEAMgDQAMgDAOgMIAXgVQAagXAigHQAjgIAhAKIAxAUQAdALAUgCQAPgBAUgKIAhgQQAqgRA8AHIBpASQAvAIAogBQBLgBAtgfQAKgHA4g6QAngoAjgEQgXgwgKgXQgQgogHgiQgHgoAGgmQAIgpAXgdQALgNAXgUQAZgVAIgKIAcgkQARgXAOgKQAjgbAyAFQAoAEAkAVQgGgMgIgNQgIgOgVgcIiqjlQhShrglg5QgYgnAAgYQAAgVAOgTQAOgTAVgIQAqgPAqAYQAUALAVAWIAjAoIAkAlIAkAlQAjAlBABQQBKBbAmA4QBrCcBNDZQAnBvAWBiQAUBcAABFQACBegdBjQgXBSg0BtQgPAfgLARQgQAagSAQQgWASgbAGQgdAGgXgMQgFAagZASQgXAQgfADQgUACgjgDQgogDgQAAIg0AGQgeADgUgDQgggGgagXQgKgKgGgKQgKADgeAFQgbAGgPAIQgNAHgPAQIgZAaQgqAlg8gDQg9gDgmgoQgFBciPA8QgoARgeAHQgYAFgVAAQgOAAgNgCgAFBWbIAFgGQANgTAEgqIABgOQgJArgOAmgAM3iVQgpgLgFhMQgJihAbigQAcigA+iVQAhhQAkg6QAWgiAvhDQApg9ATguQALgaAKgkIAQhBQAYhoAHg5QALhagLhIQgPhgg6hTQguhBg4ghIgbgQQgPgLgHgLQgNgVAIgbQAIgaAXgNQAVgMAbABQAZAAAYAMQAWgfAtgFQApgFApARQAYAKAwAeQAtAcAbALQAtAQAMAHQAdARACAaQABASgQAXIgbAnQgLAXACAiIAFA8QACAjgKA8QgMBFgBAaQgCA8AlCZQAhCGgRBMQBMgbA1hAQATgXALgIQAUgPASAEQAWAGAFAbQAEAZgMAWQgGALgWAbQgTAXgGARQAaAIABAiQABAhgWAUQgRARggAMQglAMgSAIQgbALgoAbQg0AjgNAIQgRAKgtAUQgpATgVANQhfA6g5B7QgXAygRA/QgNAugPBHQgGAZgFAOQgHAVgMAOQgOAQgVADQgXAEgOgNQgFATABAkQABAngDARQgFAdgUAVQgSAQgSAAQgGAAgGgBg");
	this.shape_5.setTransform(-112.0154,-105.3521);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(139));

	// mouthline
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#DEA6A6").s().p("AI+W0QjEhgh/j7Qh9j1gJkRIgBiCQgBhNgJg0QgVh9hViLQgrhFh/ilQjgkkh0jtQiVk1gGkdQgChfAag1QAKgUAOgKQARgNARAHQAPAGAMAdQA0CEBkEKQBcDnBeCWQA7BfBuCMQCUC8AdAoQBhCEA4ByQBFCNARCFQAHA5ACByQABByAHA4QAPBtAxB2QAoBgBFByQA+BnAUAuQAkBXgMBJQgHAsgcALQgGACgIAAQgRAAgXgMg");
	this.shape_6.setTransform(51.1913,241.6036);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#DEA6A6").s().p("EAMsAkwQhPAAgtiLQjJpzh7qNIgji6QgVhqgXhOQgVhGgghVIg9iZIjYoSQhRjKg0hrQhMifiPjrQjFlGgjg9Qh9jfhEi6QhVjkgNjRQgEg+APggQALgXAVgNQAWgOAWAFQAhAHAPApQAKAbAEAyQAJCFA+CbQAlBfBdCxQBHCIAiA8QA8BtA2BSQAkA4BhCIQBWB5AtBJQAzBTA1BsQAiBEA8CBQC0GABRDEQCHFHBFETQAhCCBLGOQA9FMA/DAIBKDgQAmCBACBkQAABAgbAxQgfA4gzAAIgBAAg");
	this.shape_7.setTransform(47.8833,285.5344);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#DEA6A6").s().p("EAMLAl6QgSgVgMgkQg6iqgslEQgulggqiTQgpiThRitQgzhuhqjFQnat2iUkxQlLqpipozQg9jIgSiMQgZi9AmiZQAJglAZgZQAcgcAbAPQAPAJAHAVQAEANACAZQAPC5A2DRQAsCrBNDUQChG6EKIOQCgE9FWJnICrEyQBhCvAmBQQDrHmA4KYQAKB3gFBLQgHBrgkBPQgXAzgiAFIgHAAQgYAAgUgXg");
	this.shape_8.setTransform(57.2171,280.8392);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#DEA6A6").s().p("ABbMrQiZjJiGkbQlbreA1p9QADgiAFgUQAGgdAOgUQAQgYAagJQAcgLAXAMQAgAQANA6QAJAmAEA0IAHBaQAaF1CBGDQB1FgDIFlQA7BpB6DRQBkC4AxCQQjfiHi4jwg");
	this.shape_9.setTransform(-0.8819,182.262);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#DEA6A6").s().p("AHLNWQgwgeg1hKQhGhjgUgUQgrgthWg0QhFgphTgoIhNglQgsgWgdgWQgogegngxQgXgdgrg/Qg/hggcguQgxhPgehEQhCiVgPimQgPilAnifQARhEAbghQASgWAagLQAcgMAZAHQAaAGAUAYQASAWAGAdQAGAYgBAgIgFA5QgYD8BEC0QAaBHA8BmQApBDAuBEQAYAlASAUQAYAfAZATQAXASAlASIBAAdQBiAsBlBFQBCAuAuAqQA4A1AjA5QAnBAALBGQAMBLgXBBQgLAggTAIQgJAEgJAAQgSAAgYgPg");
	this.shape_10.setTransform(-18.1546,142.2521);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#DEA6A6").s().p("AJiPcQgPgHgPgRQlClbgngnQjWjSjDhyQhdgzgsgcQhMgwgpg1QgbgigXgxQgOgfgXg+Qg6icgYhSQgniGgIhvQgHhlAPiVQAEgmAFgWQAIghAPgWQATgaAegKQAfgLAaAPQAZAPAJAjQAHAYABAqQAIFXCFE+QAXA4AVAiQAcAuAjAdQAbAXAsAVIBOAlQAyAaA3AoQAnAcA7AxQB2BgBrBgQBPBHAuAwQBBBFApBBQAwBOATBRQAWBZgQBQQgEAWgKAHQgHAGgJAAQgIAAgJgEg");
	this.shape_11.setTransform(5.18,135.5376);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#DEA6A6").s().p("ALOZvIggibQg/kZilk3QhyjXjflKIk9nYQizkRhzjYQkxo9grn6QgEg0ALgZQAIgTASgLQASgLASAFQAZAHAJAgQAGAVABAnQACBNAbBbQASA7AqBoQCmGSCYEPQCND5EzG1QFGHLCCDfQBXCTA0B1QBCCUAdCGQAhCZgNCRQgOCdhDB/QgTg8gTheg");
	this.shape_12.setTransform(38.6304,213.4469);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#DEA6A6").s().p("AHuSIQh6oKjlmjQhYiijRk7QjOk2haioQink2helWQhdlXgOlfQgCg7AbgQQAcgQAdAfQAYAbAKApQBVFmBIDiQBkE8B+DzQBnDFEXGYQEIF/BsDkQBXC0BKDtQAwCZBIEWQA5DeAVB6QAhDBgKCcQgIB1gqBWQgzBnhaAfQgaoihqnJg");
	this.shape_13.setTransform(44.4094,220.8527);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#DEA6A6").s().p("AHrb6QgKgMgFgUQgkiCgCjAQAFjbgBhtQgGlnh2l0QhtlXjGlPQhIh7iVjeQidjqhDhuQhrixg1iLQhGi0AAihQAAgzANgkQARgtAkgPQA+DMB0DcQBaCrCVDhQBWCCCuEBQCYDkBcCpQD+HTBCHvQBIIWimHMQgMAigUADIgDAAQgNAAgKgNg");
	this.shape_14.setTransform(26.4513,214.9368);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#DEA6A6").s().p("AKldLQgTgJgJgXQgHgSgEgcQg0mWh/mHQh/mHjDloQhbimiZjzIkAmUQkrnoholvQgbhggKhLQgNheAIhQQAFgpAUgdQAXghAgAGQAYAFAPAdQAKATAHAjQBMGVEqHyQBUCMC5EaQC0EUBWCRQETHOCyH5QBWD2AZC2QAgDvg9C+QgNAngYAXQgUAUgUAAQgJAAgJgEg");
	this.shape_15.setTransform(43.0075,211.8151);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#DEA6A6").s().p("EAKGAgVQgOgYgEgiIiDxoQgTiegNhSQgWiEghhnQhBjPinj7QgyhMhiiJQhoiTgthCQkcmpioniIhYkFQg1iZgxhmIgXgwQgLgdgCgXQgCgcAMgYQANgbAXgJQAegMAjASQAcAPAbAfQBXBjBDCgQAQAmBXD7QCuHxEsG0QBXB9C0D1QCYDaBHCwQAyB+AjCoQAVBlAfDKQA9GVAIDWQAOFahOEIQgPAygbAGIgIABQgVAAgPgYg");
	this.shape_16.setTransform(15.485,183.4584);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#DEA6A6").s().p("EAN1AnLQgUgFgNgPQgMgNgHgUQgFgNgGgZQirrIk4tcQi9oHmcv1IjPn+QihmMhPjMQiDlOhckRQgIgYgCgOQgCgVAHgQQAMgWAegFQAcgEAXAPQAUAMARAZQALAQAPAeQBZC1BjDlQA/CPBwEQIGzQZQCkGKCZEDQCZEFB+GLQB/GMBbGpQBbGpAVGcQADA5gZARQgLAHgMAAQgHAAgGgCg");
	this.shape_17.setTransform(34.6345,236.1874);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#DEA6A6").s().p("EANUAjbQgYgGgRgqQg9iUgqjLQgRhSgukYQgrkEhkoFQgbiKgQhFQgahygghYQgphzhJiKQggg9hpi0QmTq5lLrfQhRiygmhIQhJiIhShaQgdgfgJgNQgSgbgBgZQgCgvAwgaQAvgaAvAQQAoAOAlAnQAYAaAhAzQCyEUD7H3QEgJEB6DRQBPCIChENQCGDrA+C8QAdBVAaBvQAOA9AcCKQBkH2AkD9QA7GngMFUQgBAlgPAbQgPAagWAAIgJgBg");
	this.shape_18.setTransform(18.1648,193.0222);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#DEA6A6").s().p("EALFAkgQgcgIgSgzQhIjDgjkfQgelLgTikQgOh3gXiTQgOhZgfiwQgzkmgfiUQg0j0g/i9QhSj2iZkyQgbg2kAnfQkJnyjsoFQgNgegEgTQgGgcALgVQANgaAigGQAfgFAcAPQAYANAVAaQANARAUAiQF0JsFdKGQBPCSAvBdQBDCEAxBwQCfFwBhHgQBEFNBAIlQAiEtAeEqQAOCFABBKQACBzgVBaQgIAlgVAZQgTAWgWAAQgGAAgHgCg");
	this.shape_19.setTransform(25.3642,234.0726);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#DEA6A6").s().p("AGVZxQgWgCgMgnQgvibgSkJQgWlGgShkQgbibg/irQgziLhTisQgohTiUkfQh3jlg/iRQhbjRgvi5Qg2jXABjEQABhAAJgqQANg5AeglQAKgNAMgGQAOgIAMAFQATAGAHAmIAmDqQAXCKAYBeQAuC0BcDMQBBCQB4DeQChErAhBBQBqDOA9CoQBNDUAkDfQAjDggHDhQgDBtgOBUQgSBmglBSQgQAkgWAAIgDAAg");
	this.shape_20.setTransform(-0.8944,149.2732);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#DEA6A6").s().p("AKceWQgMgwgViEQg8l9iZmiQh+lYjQmfQhfjCkioaQj2nLiDkXQgqhagYg7QgihSgThHQgdhxgEh1QgDh1AYhyQAOhEAmgGQAggGAUAlQARAeADAsQAKCNAoCJQAhBzA+CIQAmBTBSCfQCvFSBaCnQBhC0DFFpQCtE/BsDlQErJ4BTILQAcCtgJCBQgMClhJB0QgvhAgZhjg");
	this.shape_21.setTransform(17.669,235.5836);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#DEA6A6").s().p("ALFdlQgSgQgtkcQgtkbh8l5Qh8l5hhhlQhhhkg2hqQg3hshkiQQh1ihg4hSQjAkXiFk7QiFk6hFlMQgYh2ABhSQAChuAwhMQARgdAVgDQAXgEARAZQANAUAFAfQBcHuDPHKQCJEvCgDgQAXAgBQBsQBBBWAlA3QBzCtB3C8QB3C8BkE+QBkE/AQDyIAfHhQADA2gaAMQgHADgHAAQgOAAgOgNg");
	this.shape_22.setTransform(11.6362,220.8337);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#DEA6A6").s().p("AI+bbQgVg6gYhhQgyjEhGlaQhQmIgjiYQiVp6jgmLQg+hsh7i2QiIjKg0hVQhjikg3iPQhDitgLifQgEg4ANgpQAQgzAngRQAyBdByEIQBjDkBLB8QAwBPBYB6QBwCZAdAsQDkFUCbHjQBmE+B4I+QBBE6APCtQAXERg5DTQgpg7gfhTg");
	this.shape_23.setTransform(15.3336,225.575);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#DEA6A6").s().p("AMZemQiJkDi0ngQjKobhijQQhljXikkbIkinnQiokfhmjQQiFkShKj3Qgih0gNhZQgRhyAOhfQAEghASgXQAUgaAZAJQAQAFAJAVQAFAPADAZQARCYBGCwQAtBzBkDEIC5FqQBsDSBBBoQAoBBBDBgIBuCgQDUE7C8GcQCPE6CmHMQBPDcApCLQA7DHAWCpQAFAlgIAcQgKAigcAFIgIABQgkAAghg9g");
	this.shape_24.setTransform(27.0674,218.3078);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#DEA6A6").s().p("AIDZ6QgilZgbiqQhYo1lcriQhUi0jim9QjJmNhnjlQhbjHggiIQgui/AnibQANgzAbgMQAVgKAZAMQAYALAMAXQAKATAEAcIAFAyQAIBaAlBoQAZBHA3ByQBqDfEWIYQD6HiB/EYQDBGrBqFyQB9G1ARGOQAIC+gWCSQgcC0hMCHQhHjEgmkzg");
	this.shape_25.setTransform(13.4049,230.1977);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#DEA6A6").s().p("AHPXxQgekxgZiWQgykqiVlbQhbjTjRmOIknovQhGiHgghBQg1hyggheQguiHgbiwQgQhpgUjVQgGg7AGgkQAJgyAhgZQB1BeA2DMQAMArAbCAQAWBrAUA+QAVA/AiBJQAXAwAsBTIGKLxQC3FdBTC1QCKEsBGD/QBUEwAAEcQABE7hnEHQhUilglkNg");
	this.shape_26.setTransform(4.3936,231.25);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#DEA6A6").s().p("AFeNEQgOgFgOgNQifiWh3i5QgbgrhEh2Qg8hngng6Ig5hOQgigwgUghQhAhnggh3Qgfh4AFh6QACglAKhYQAJhQAAgtIACgsQACgYAIgSQAKgVATgLQAVgMAUAHQAVAJARAhQAuBcAGDBQAEBrAEAqQAJBSAXA8QAUA2ArBAIBPBsQA9BVBGBuQAqBDBQCHQAiA4ARAgQAaAyAQAqQAQAtAMA6QAHAlAKBFQAEAagJALQgGAGgKAAQgFAAgHgCg");
	this.shape_27.setTransform(-44.4755,148.4086);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#DEA6A6").s().p("AA+KgQguhjgziyQhUkehEkOQgkiQgNhKQgpjwAejxQADgZAHgKQAGgHAKgDQAKgDAHAFQAFAEADAJIAEAQQAEASANAVIAWAlQAlA9AYBYQAKAoAXB3QAoDHBxGMQBxGJAnDLQANA/ACAoQADA5gOAsIgYACQhghYhEiTg");
	this.shape_28.setTransform(-32.2529,121.9188);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#DEA6A6").s().p("AF1UFQgJgEgNgSQjtlcirnkQh5lViGotQhEkagditQgNhLgDg0QgFhFAJg6QAKg3AXgbQAQgSAWgHQAYgHAUAJQAVAJANAcQAIASAHAiQDtS/GySIQAJAWACAMQAEAUgDAPQgFASgQALQgKAHgJAAQgHAAgGgDg");
	this.shape_29.setTransform(-14.7433,153.3989);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#DEA6A6").s().p("AHvXfQgNgJgMgRQhLhuhJh+IgFgMQgYg6gyhTIhSiKQgvhVg+iaQhIi0geg+IgJgSQAHgBAHAFIg8iZQifmahtlPQhhkpgmjOQgzkZAdjqQAGgtAZgCQAVgBAQAhQApBTAgBzQANAsAmChQBlGkC0HnQCCFjDhINQBqD3ApB1QBJDOAWCsQAFAngUALQgFADgGAAQgJAAgKgGg");
	this.shape_30.setTransform(-7.3413,181.2385);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#DEA6A6").s().p("AE9S6QlEpljfqVQhmkxgpjgQg3klAbj3QAGg6ARgcQANgTAVgLQAWgKAUAFQApAMAQBFQALAsAHA9QAFAkAGBHQATC1AuC6QAWBVAoCHQA0CsAZBNQArCJAqBsQAdBNBDCcQBCCZAfBQQB2E3AaEWQADAegHAVQgJAcgXACIgEABQgbAAgagvg");
	this.shape_31.setTransform(-25.1256,165.5201);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#DEA6A6").s().p("AAXGCQgehCgMhrQgJh4gKg8QgTh7g/iKQgWgygHgVQgNgpAGghQADgUAMgPQANgQASAAQARAAAaAWQAoAjAUAXQAaAfAfA6QBqDEADCtQADCBg0CLQgPAngXAEIgFAAQgZAAgTgng");
	this.shape_32.setTransform(-74.4009,322.217);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#DEA6A6").s().p("ACJGNQgPgDgVgOQhUg7g3hXQgRgbgagxQgthYgTg3QgchPgFhVQgFhVAThSQAOhCAngNQANgEAOADQAPAEAKAJQALAMAKAeQAMAmAaB6QAWBkAZA5IAeA/QARAlARAxIAcBZIAkB4QAKAmgMAPQgGAIgLACIgJABIgKgBg");
	this.shape_33.setTransform(-98.1885,335.0482);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#DEA6A6").s().p("AB4HHQgKgFgLgLQgogpghgvQgXgigSgiQgqhPgchtQgRhDgYiCQgLg9gDgfQgGhIAOhHQAQhZA2gZQAPgHARACQARADAGAOQAEAHgBALIgCATQgBAPAFAUIAJAiQAGAYADAiIAFA7QAEAqATBQIBDEPQAiCdgCB3QgGAEgGAAQgFAAgGgCg");
	this.shape_34.setTransform(-91.9087,348.0585);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#DEA6A6").s().p("ACPGfQgOAAgNgMQgIgGgOgQQgLgMgagaQgZgYgMgPQgWgbgWgmQgNgYgXgwQgthfgUgyQghhRgOhGQgIglABgeQAAgOADgWIAGgkQAFgogCgoQgBgWACgLQADgSANgHQAOgEAGgEQAKAAAJAIQAIAIAEAKQAFAOAAAdQgBB9AdBNQAKAaAaAyQBmDHBjDZQAKAWgBAMQgBAOgLAKQgKAIgNAAIgCAAg");
	this.shape_35.setTransform(-58.172,324.5798);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#DEA6A6").s().p("AGSMaQgYgUgfgiIg0g5Qgggig1gvIhYhPQhjhchriKQgtg5iMjAQhdh9glg4QhFhpgohaQgxhtgPhpQgQh2AchnQAThIAugMQAcgHAcAUQAZASALAeQAJAYACAkIABA9QAEBqA4B1QAoBUBSB2QAmA1BwCZQBeB/A0BBQBVBpBOBLIBWBQQAzAwAfAkQB0CFAqCsQAGAdgKAMQgJAJgVAAQhGAAhGg7g");
	this.shape_36.setTransform(-16.4916,217.0075);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6}]}).to({state:[{t:this.shape_7}]},8).to({state:[{t:this.shape_8}]},6).to({state:[{t:this.shape_9}]},6).to({state:[{t:this.shape_10}]},4).to({state:[{t:this.shape_11}]},5).to({state:[{t:this.shape_12}]},3).to({state:[{t:this.shape_13}]},4).to({state:[{t:this.shape_14}]},4).to({state:[{t:this.shape_15}]},4).to({state:[{t:this.shape_16}]},4).to({state:[{t:this.shape_17}]},6).to({state:[{t:this.shape_18}]},4).to({state:[{t:this.shape_19}]},2).to({state:[{t:this.shape_20}]},4).to({state:[{t:this.shape_21}]},6).to({state:[{t:this.shape_22}]},6).to({state:[{t:this.shape_23}]},2).to({state:[{t:this.shape_24}]},4).to({state:[{t:this.shape_25}]},2).to({state:[{t:this.shape_26}]},4).to({state:[{t:this.shape_27}]},6).to({state:[{t:this.shape_28}]},4).to({state:[{t:this.shape_29}]},6).to({state:[{t:this.shape_30}]},4).to({state:[{t:this.shape_31}]},4).to({state:[{t:this.shape_32}]},4).to({state:[{t:this.shape_33}]},4).to({state:[{t:this.shape_34}]},4).to({state:[{t:this.shape_35}]},4).to({state:[{t:this.shape_36}]},8).wait(3));

	// lipupper
	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#E488B7").s().p("Aq2GDQhxgBhegMQjRgahLhtQgggwgMhIQgIgxABhRQAAgsACgaQAEgnAKgeQAOgrAggqQAZggApgnQAzgxAvgfQANATAQANQATAQAYAIIAGACIAEAIQAQAdAkAWQAXAOAuATIHYDCQB2AwA/AWQA0ASAwANQAuANAoAHQBKAOC6AKQCmAJBcAYIBJAVQAvAPAaAGQBJARBeADQA8ACBtgFQBzgFBagIQgDANgIAOQgTAjgkAWQgfASgqAKQgfAHgwAEQluAimRg/Qh3gTgsgCQg8gEhIAHQgvAEhRAMQgjApgnAYQguAcg3AFQg2AFgzgSIgegLQgSgFgNACQgLABgNAHIgXAMQgcAOgmAFQgXADgkAAIgKAAg");
	this.shape_37.setTransform(-69.164,279.6906);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFC3C3").s().p("AR5VnQhXgHhDhCQhEhBgLhXQgCgNgCggQgCgdgCgQIgGgWIgFAFQg5AxhKAbQg7AVhoAOQgsAGg0AEQhaAIh0AFQhtAFg8gCQhdgChJgSQgZgGgwgPIhJgVQhcgXimgJQi6gLhJgNQgqgIgtgMQgwgNg0gSQg/gWh3gxInXjCQgvgUgWgNQgkgXgRgdIgEgHIgFgCQgYgIgUgQQgQgNgNgTIgDgFQgcguAIgxQAEgXAOgdIAZgxIAKgWQgEglAIgfQAIgiAVgWIADgZIABghIAIgPQAVgkAKgTQA2hygGiTQgEhngmiIQAPACAOAGIAMAFIgWhYIiDnxQgXhbgFgwQgJhOAUg7QAWhBA4gtQA4gtBDgHQBEgIBBAgQBAAfAkA6QAVAiAOAyQAGAWAOBDQAXBrBADiQAgByAWBWQAzAmAcA5QAFgrgCg/IgFhrQgDiDAthLQAhg4A9ggQA8gfBCAEQBBAEA4AnQA4AnAbA8QAVAtAFBAQADAjgCBPIgGGOQgHCBgWBsQBUAKBSAhIAvAUQAcAMAUAGQAdAIAqAFIBHAGQCgARDIBbQCFA8B+BPIAJgNQAyg/BJgVQAegIAogCIBHgCIB9AAQBHADAzARQAnANAtAaQAeASAwAiQAgAXAbAWQgBgjACgZQAGhUAhg7QAgg7A7glQA7glBDgEQBDgDA/AfQA/AfAmA3QAhAwARBHQAKAsAKBWIArGVQARCZgMBcQgTCHhPBIQhTBLh9gQQhAgIgwgeQgTAWgaATQhEAxhMAAIgUgBg");
	this.shape_38.setTransform(4.2775,180.6095);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFC3C3").s().p("AR+VnQhXgHhEhCQhDhBgMhXQgCgNgBggQgCgdgDgQIgFgWIgGAFQg4AxhKAbQg7AVhpAOQgrAGg0AEQhaAIh0AFQhtAFg8gCQhegChIgSQgagGgvgPIhJgVQhcgXimgJQi6gLhKgNQgpgIgugMQgvgNg1gSQg/gWh2gxInYjCQgugUgXgNQgkgXgQgdIgEgHIgGgCQgYgIgTgQQgQgNgNgTIgDgFQgdguAJgxQAEgXAOgdIAZgxIAKgWQgEglAHgfQAJgiAVgWIACgZIABghIAJgPQAVgkAJgTQA3hygGiTQgFhngliIQAOACAOAGIAMAFIgWhYIiCnxQgYhbgFgwQgJhOAVg7QAWhBA3gtQA4gtBEgHQBEgIBAAgQBBAfAjA6QAVAiAOAyQAHAWAOBDQAXBrA/DiQAhByAVBWQA0AmAbA5QAFgrgCg/IgFhrQgDiDAthLQAig4A8ggQA9gfBBAEQBBAEA4AnQA5AnAaA8QAVAtAFBAQADAjgBBPIgHGOQgHCBgVBsQBUAKBRAhIAvAUQAcAMAVAGQAdAIApAFIBIAGQCfARDIBbQCFA8B/BPIAJgNQAyg/BJgVQAegIAngCIBHgCIB9AAQA4ADAsALQgJhRAkhEQA7huCMgfQCHgdB1A/QBrA6BJB2QBABqAbCIIAPBWQAKAyALAiQAFAPAZA7QATAtAGAdQAPBHgcBPQgYBGg1BAQhJBZhkAnQgvASgrADQgCAQgDAOQgSBVhNA4QhEAxhNAAIgTgBg");
	this.shape_39.setTransform(3.813,180.6095);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#E488B7").s().p("ATUIyIhkg7QiyhsjlhGQlFgUlWhjQhygMimgOQiYgOh3gOIi7ADQixAAiGgMQhPgHgzgRQhFgWglguQgNgQgKgUIgIgJQgggjgPgnQgOgogChEQgChgATg+QAMgmAcg2QAbgyAZghQAhgrAlgYQARgKATgIQAHAKAIAKQARARAXALIAGADIADAIQAMAfAhAbQAUAQAtAZIG7D7QBvBBA8AdQBhAwBSAbQBHAUC2AjQCkAdBYAjQAXAJAvAVQAtAVAZAJQBHAaBcAPIAgAFIAZAIIBuAlQBOAcBlAtICAA6IAsAzQAoAxBMBhIALANQgmgKgsgXg");
	this.shape_40.setTransform(-67.247,276.5);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFC3C3").s().p("APvWGQhkgagthRQgJgQgNgiQgOgigJgQQgRgeggghIg7g5Qgzgxg+hLIgLgOQhNhhgngwIgtg0IiAg6QhlgshOgcIhtgmIgZgIIgfgFQhdgOhGgbQgZgJgtgVQgvgVgXgJQhYgjikgdQi3gihIgWQhSgbhhgwQg7gdhwhAIm7j6QgsgagUgQQghgbgNgfIgDgIIgFgCQgXgLgRgSQgIgJgHgLQgHgKgGgLQgWgxAOgwQAHgWASgbIAfguIANgVIAAgKQgFgZgCgbIAFgMQAVgwAIgPIAYgqQARgbAHgOQAohOABhjQAAhYgehfQgXhHg6h8QgZg2gNgYQgXgrgZgeQgNgQgPgPIADgBQBHgKBHAWQB7AlBtB7QBVBfA1B2QAkBRASBUQAfAlAEAwQARgoArgZQAngXAxgEQAogDAyALQAfAGA6ARQANgjAJgSQANgdASgSQAVgWAcgJQAegIAZALQAdAOAMAlQALAggHAlQgFAXgQAsQgRAsgEAVQCygDCbBYIAsAaQAbAPAUAJQAbAMApAKIBGAPQCcAlC7BzQBTAzBQA8IALgVQAthGBagiQBQgfBeAHQBuAHBiA0QAUALATAMQAfg0AyggQAzghA/gHQA/gHA5AVQBMAcBRBZIBDBNQAoAvAdAbIA+A2QAlAgAUAbQBABUgXB1QgFAZgIAWIAiATQA4AiAnAjQBbBTAuCGQAqB+gfBeQgfBehlAsQhkAthegmQAVBOgaBQQgaBRhAAvQg3AqhHAGQgEApgQAqQglBfhRAtQg1Aeg8AAQghAAgjgJg");
	this.shape_41.setTransform(5.0162,239.7564);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#E488B7").s().p("AUWKaQhPg+gpgdQhJg0hpgpQg9gZiCgoQl+h3jHgzQlFhTkMgbQhogKjRgNQhkgHhTgNIg+ADQhQADg0gKQhIgOgqgoQgggegRgvIgSgUQhRhjALitQAMiqBZhyQAVgbAagXQAFAOAIANQAOAWATAQQATAPAYAIIAFACIAEAIQARAdAkAWQAVANAtATQAhAwA6AqQApAeBUAuIGADSQB9BFBDAjIAZAMQBdAvBOAhQCgBEEYBSQFLBgBxApQBbAgA5AfQBNApAyA1QAoArArBLIALAUIgCgCg");
	this.shape_42.setTransform(-58.9158,262.5125);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFC3C3").s().p("ASBVNQgugTg3glQi4h8hnimIg9htIgLgTQgrhLgogrQgyg1hNgpQg5gfhbggQhxgplKhgQkYhSighEQhPghhdgwIgZgMQhDgjh9hFImAjRQhUgugpgeQg6gqghgwQgtgTgVgNQgkgWgRgdIgEgIIgFgCQgYgIgTgPQgTgQgOgWQgIgNgFgOQgNghAGgiQADgOAFgPQCMhbAdh0QAHgaACgiIABg9QABhogBgqQgDhSgKhAQgXiJhAhbIAIgBQAkgEAhANQApARAzA3QA+BFBDBhIADADQARAFASAKQBDAlAOBFQAMgqAogeQAkgcAvgJQAogIAzAEQAfACA8AKQAIglAHgTQAKgeAPgVQASgYAagMQAdgMAaAIQAfAKARAjQAPAfgDAlQgBAYgLAtQgLAugCAWQCwgaCmBEIAvAVQAcALAUAGQAdAJAqAEIBHAHQCgARDIBaQDWBiDGCRIBhBHQAeAVAbAQQABgUAFgTQAMgyAggqQAhgrAtgYQAvgYA1gCQA2gCAvAWQAyAXAxA2QAOAQBCBWQAnAyBQBiQBBBYAZBLQALAhALA5QANBFAGAVQAXBaBMCOQBXCiAYBCQAiBgANB5QAKBZAACFQAAB8gSBNQgaBrhEA6QgpAig0ANQg1AOg0gKQgbgGgZgLQg8A5hOADIgJAAQgwAAg2gWg");
	this.shape_43.setTransform(1.0783,239.0358);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#E488B7").s().p("APVJQQgfAAgwgMQjLgxjnhnIhigsQg6gbgpgQQgogQhsgnQiDguhFgUQhwgihdgPIh7gRQhKgJgwgNQg/gQhqgrQg3gWgcgNQgugVghgWQhLg0guhTQguhSgFhcQgDg4ANgzQAPg3AhgoQAjgrA0gUQAMgFANgDQApgJAnAKQALADANAFIAXAdQAcAfArAlQApAlA4AsIETDUQB5BdA7AnQBhA9DwBzQDeBpBuBQQAaATA+AwQA4AsAhAXQBAAqBWAqQAxAXBhApQgUAFgYAAIgHAAg");
	this.shape_44.setTransform(-124.0773,302.2627);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFC3C3").s().p("AQ9YqQgtgTg4glQg7gogzgsIgRAKQgzAchFADQiDAFieguQhigdi0hLIi+hQIgMgEQhggpgygXQhWgqg/gqQgigXg3gsQg+gwgbgTQhuhQjehpQjxhzhgg+Qg8gnh4hdIkTjUQg4gsgqglQgrglgbgfIgYgdQgMgFgMgDQgngLgpAKQgHgVgDgaQgFguAQhJQAMg0APglQAKhGAihUIA2h+QATgsANglQAbgeAaglQAagjAthHQAjg2AQggQAbgxALgrQAKglADguQACgZAAgkIALANQAFhZAAhKQAAhtAEgnQAIhSAgg4QAkg/BDgjQBDgjBIAHQBIAHA6AyQA6AxASBGQAJAlgBAyIgFBZQgCAjAABCQgBBFgBAgQgCAogFA6IgFA2IAkAGQAJglAGgTQAKgeAPgVQASgYAbgMQAdgMAaAIQAfAKAQAjQAPAfgCAlQgCAYgLAtQgLAugCAWQCxgaClBEIAvAVQAcALAVAGQAdAJApAEIBIAHQCfARDIBaQDXBiDFCRIAuAiQARgpAfgiQAxg2BDgSQA+gQBIAQQApAJAoATQAWgyApgoQA4g0BGgQQBegWBtAqQB5AwBhBtQBGBOA8B0QAmBIA8CNQAlBWAVAmIAhA6QAVAiALAYQAcA8AFBCQAFBEgUA9QgUBAgtAxQgvAyg8AXQgoAQgrABQAPAlALAiQAeBcgCBTQgBA9gSA2QgVA6gmApQgyA1hKARQg4AOg1gMIAEAbQAJA8gBAiQgEBchBBIQhDBJhZAEIgIAAQgxAAg2gWg");
	this.shape_45.setTransform(-17.6413,235.9674);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#E488B7").s().p("AJwFlIgKgDQk/hpkJgtQhmgRjQgbQhjgPhRgSQghAAgfgCQhPgCg0gOQhGgTgogrQgdghgOgvIgQgVQhKhpAXirQAGgsALgoIARgGQBAgWBhgGQAFAJAIAIQARATAdARQARAJAlARQClBICZBbIBjA9QA7AjApAWQAZANAxAYIBKAkQA1AaCFBRIDVCAIDtCOQAmAXAVALQAiARAdAJIAWAGIAEAUIAAABQiZg4hpgkg");
	this.shape_46.setTransform(-145.0102,282.375);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFC3C3").s().p("AOncWQg0gCg5gcQgsgWg1gpQiviIhbitIg1hwIgCgCQhLhEgngfQhFg5hlgwQg8gdh9gyQiphBiEgxIAAgCIgEgUIgWgGQgdgJgigRQgVgLgmgXIjtiOIjViAQiFhRg1gbIhKgkQgygYgZgNQgpgWg7gjIhjg9QiZhbilhIQglgRgRgJQgdgRgRgTQgHgIgGgJQhhAGhAAWIgRAGQAghwBHhQQAXgaAbgUQgKgiAIgiQAGgWAQgdIAcgvIAMgWIAAgJIAOgQQAQgSANgLQARgQAhgXQAmgaAOgMQAZgUAcgiIAvg8IAqgzQAXgfANgZQAWgsAHg/IADgqIADAEIAcg2QAVgrAKglQALgqAFhWQADhBABghQABg2gEgsQgQhngFgzQgIhaAXg7QAbhFBFgsQBAgqBPgIQA1gGAwAKQA0ALAoAbQAvAfAgA2QAdAwAPA9QAMAxAFBDIAFB1IAMDWQADB7gPBZIgGAdQAFAXgDAZQgEAYgOAsQgOAsgDAWQCxgNChBPIAtAYQAbAOAVAHQAbALAqAHIBHALQCeAdDCBnQBAAkA/AoIAKgNQAlgpAwgVQBagnB8AeQArALA8AWIBmAmQAsAPDxBDQA5APAwAQIADgNQAWhOBCg3QBBg3BRgIQBDgHBUAaQBYAbA3AtQAfAaAxA/QBWBuAzBPQBFBpAnBjQALAaAXBCQAVA8AOAhQAQAlAkBEQAlBGAPAiQA5CBgQBiQgLBHgwA6QgwA5hDAYQhEAYhJgOQhKgPg1gvQgugpgnhMIAGAwQABBSgyBHQgxBGhMAdQhMAdhUgSQgqgKgkgTQAfBigHBYQgCAZgJA4QgJA1gBAdQgBAcAFBDQAFA8gDAiQgKBchGBDQhGBChUAAIgHAAg");
	this.shape_47.setTransform(-20.5372,237.2568);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#E488B7").s().p("AJwFMIgKgEQk/hhkJgqQhngPjPgaQhkgOhRgRIg/gBQhQgCgzgNQhHgSgngoQgdgegOgsIgRgUQhKhgAXifQAGgpAMglIARgFQAwgQBDgHIAugDQAFAIAHAHQASASAdAPQARAKAlAPQBHAcBEAhQBbAqBXAwIBjA4QA7AhAqAUIBJAjIBLAhQA1AYCEBLIDVB3IDtCDQAmAVAWALQAhAPAdAJQALADAMACIADATIABABQiag1hogfg");
	this.shape_48.setTransform(-129.6977,261.85);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFC3C3").s().p("AOrcDQg1gBg5gaQgrgUg1gnQivh+hbigIg1hoIgCgBQhLg/gngeQhGg0hlgtQg8gbh9guQiog8iEguIgBgBIgDgTQgMgCgLgDQgdgJghgQQgWgKgmgVIjtiDIjVh3QiEhLg1gZIhLgiIhKgiQgqgUg7ghIhjg4QhXgwhbgrQhFgghGgdQglgPgRgJQgdgPgSgSQgHgHgFgJIguAEQhDAHgwAPIgRAGQAfhpBHhJIASgQQAKgxAYgyQAGgRAMgVIAKgOQATghAbgoIBJhtQAdgvAihDIA6h1IBJiVQAohVAShFQAWhXADhsQADiCgmhMQgMgYghgxQgggvgMgcQgZg5AHhBQAIhAAlgyQAlgyA8gaQA8gaA+AHQBkALBYBaQByB0ApC/QARBPAFBeQADBKgEBlQgFCegaBgQgPA7ggBKIAZAFQALghAIgRQAMgcARgSQATgVAcgJQAegJAZAIQAeAMAOAhQANAegFAiQgDAWgOApQgOApgEAVQCygNCgBKIAuAWQAbAMAUAHQAcAKApAHIBHAKQCeAbDBBgQBYAsBVA0QgBgVACgVQAJhEArg6QArg6A/gcQBtgxCeArQCeAsCfB4QB3BZCUCeIAYAaQAdgTAjgMQAmgQArgEQBCgHA7AXQBrAqBNCJQAtBQBICtQA/CCBgBtIBRBbQAsA1ATAwQAsBtg/BzQhABzhzAVQhGAMhLgYIgegKQgZAbggAVQg1Aig9AHQg9AGg7gWQgcgLgYgQQgaAjghAXQgyAjhAAGIgDABIgHAlQgJAxgBAbQAAAaAFA+QAFA4gEAfQgKBWhFA9QhGA+hVAAIgGgBg");
	this.shape_49.setTransform(-5.5745,208.5555);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#E488B7").s().p("AQmGVQichLkCg6IjXguQiAgbhWgZQgygOhvgkQhngig5gQQiZgqi2gWIgigGQgpgFg5gBQhqgIh0gDQg+gBg5ABQh1gahAhJQhChKgChwIAAgJIAAgLIAAgFIAAgEQADg0ARgyQBsguCQATQBrAPCpA8QBAAXAgANQA1AWAoAVQAjATA9ApQBCArAfASQA1AeBGAcQAqARBVAfILFD7QByAoA7AbQBdArA/A1QBAA2AlBFQgrgeg3gbg");
	this.shape_50.setTransform(-75.3146,253.809);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFC3C3").s().p("AUYYkQg0gBg5gaIgcgOIgDABQgpAYgwAGQgwAGgtgNQgugMgmgeQgngdgXgpQgZgqgLg8QgGglgFhIIgOjQIgCgoIAAgBIgHgHIgOgPQgcgcgmgWQgmgyg9grQglhFhBg2Qg/g1hdgqQg7gbhygpIrEj8QhWgegqgRQhGgdg1geQgfgRhCgrQg9gpgjgTQgogWg1gVQgggMhAgYQipg8hrgOQiQgThsAtIADgJIgHACIgRAGQAghpBHhKQAXgYAbgSQgKggAIgfQAGgVAQgbIAcgsIAMgUQgCghAKgdQALgfAXgSIAEgYQAMhUgXhPQgHgagQgnIgag/QgdhOAEg3IABgCQgjglgbgzQgyhfAAhcQgBgyAQguQAQgxAegkQAcghAngVQAngVArgHQArgGAsAJQArAJAlAXQAgASAjAjIA7A9QBBBDBZBLIA0AtQAcAaARAZQAkA1ADBCQAEBDgeA5QgSAkgeAcQAXgJAagDQAogFAzAHQAfAEA7ANQALghAIgRQAMgcAQgSQAUgVAbgJQAegJAZAIQAfAMAOAhQANAegFAiQgEAWgOApQgOApgDAVQCxgNChBKIAtAWQAbAMAVAHQAbAKAqAHIBGAKQCeAbDCBgQCWBLCLBiQAOgkAbggQA1g+BKgTQBcgXB/AtQCbA3B0BqQBHBBBEBhQAvBDBDByQAlBBAUAmQAdA6ATAxQBUDXgdETQgJBfgZBBQggBUg7AtQgVAQgXAKQgDAWgGAjQgJAxgBAbQgBAaAFA+QAFA4gDAfQgKBWhGA9QhFA9hVAAIgHAAgAwaswQAEAKABAMQAHgRAMgPIgYAKg");
	this.shape_51.setTransform(-17.9374,218.1847);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#E488B7").s().p("AUWKaQhPg+gpgdQhJg0hpgpQg9gZiCgoQl+h3jHgzQlFhTkMgbQhogKjRgNQhkgIhSgMIg/ADQhQADg0gKQhIgOgqgoQgggfgRguIgSgUQhRhjALitQAMiqBZhyQAVgbAagXQAFAOAIANQAOAWATAQQATAPAYAIIAFACIAEAIQARAdAkAWQAWANAsATQAhAwA6AqQApAeBUAuIGADSQB9BFBDAjIAZAMQBdAvBOAhQCgBEEYBSQFLBgBxApQBbAgA5AfQBNApAyA1QAoArArBLIALAUIgCgCg");
	this.shape_52.setTransform(-58.9158,249.775);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFC3C3").s().p("ASdVNQgtgTg4glQi4h8hmimIg+hsIgKgUQgrhLgogrQgyg1hOgpQg5gfhbggQhwgplKhgQkZhSifhEQhPghhdgvIgZgNQhDgjh+hFImAjRQhTgugqgeQg5gqgigwQgsgTgWgNQgkgWgQgdIgEgIIgGgCQgYgIgTgPQgSgQgOgWQgJgNgFgOQgMghAFgiQAFgXANgdIAagyIAKgWQgEglAHgfQAJgiAVgVIACgaQAGhbgdhUQgJgcgSgoIgfhDQgjhRAAg8QAAgmAPgiQAQgjAcgWQAbgVAlgEQAkgEAgANQApARAzA3QA/BFBDBhIACADQARAFASAKQBDAlAOBFQANgqAngeQAkgcAvgJQAogIAzAEQAgACA7AKQAJglAGgTQAKgeAPgVQASgYAbgMQAdgMAaAIQAfAKAQAjQAPAfgCAlQgCAYgLAtQgLAugCAWQCxgaClBEIAvAVQAcALAVAGQAdAJApAEIBIAHQCeARDJBaQDXBiDFCRIBiBHQA4AoAuAWIBKAhQArATAZAVQArAiAUA1QAdAAAcAHQA/AQA9A0QAqAkA6BGQC7DiCZD5QArBHAXAwQAhBEAMA8QALA2AABKQAAAsgDBWIgCBiQgCA4gIApQgUBxhCA7QgpAkg6APQg2AOg7gHIgUgDQg8A2hMADIgIAAQgxAAg2gWg");
	this.shape_53.setTransform(-1.7503,226.2858);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#E488B7").s().p("ATUHlIhkg0Qiyhdjlg8QlFgSlWhVQhygKimgMQiYgMh3gMIi7ADQixAAiGgLQhPgGgzgOQhFgUglgnQgOgOgJgRIgIgIQgggegPgiQgOgigCg6QgChTATg1QAMgiAcgtQAbgsAZgcQAhglAlgVQARgJATgGQAHAIAIAIQARAPAXAKIAGADIADAGQAMAbAhAXQAUAOAtAWIG7DYQBvA3A8AaQBhApBSAXQBHASC2AdQCkAZBYAfIBGAZQAtATAZAHQBHAXBcAMIAgAFIAZAHIBuAgQBOAYBlAmICAAzIAsAsQAoApBMBUIALAMQgngJgrgTg");
	this.shape_54.setTransform(-59.7345,228.8);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFC3C3").s().p("AYEUYQgzgOgpgkQgpgkgVgwIgOgmQg5ALg/gOQhkgWgthGQgIgOgOgdQgNgdgJgNQgRgaghgdIg7gxQgzgqg+hBIgLgMQhMhUgogpIgsgsIiAgyQhlgnhOgYIhuggIgZgHIgggEQhcgNhHgXQgZgHgsgSIhGgaQhYgeikgaQi3gdhHgTQhSgXhhgpQg8gahvg3Im7jXQgtgWgUgOQghgXgMgbIgDgGIgGgDQgXgJgRgQQgIgHgHgJQgHgJgFgKQgXgqAPgpQAHgTARgYIAggnIAMgSIABgJQgIghgCgkIABhCQABgngEgaQgFgcgNgiQgIgVgSgnQgQgmgTgQQgJgHgMgGIgCgJQgNgxgdgvQgqhBg/gpQgfgUghgMQAFgaALgZQAZg1AwghQA2gmBMgJQBHgJBHATQB7AgBtBqQBUBSA1BlQAkBGATBIQAfAgADAqQASgjArgVQAngUAwgDQApgDAyAJQAeAFA6APQANgeAJgPQAOgaARgPQAVgTAcgHQAfgIAYAKQAeAMALAgQAMAbgIAhQgEATgRAmQgQAmgFASQCygCCcBLIAsAXQAaANAUAHQAcAKAoAJIBFANQCdAgC8BjQDIBrCyCRIBYBHQAxAnApAXIARgWQAyg9BGgUQBBgTBJATQBEARA6AtQAzAnAuA9QAkAvAoBIQAzBcBFCYQBcDKAWAsQBBCEAMAdQAoBcAMBMQAPBegaBUQgdBchFAxQgrAeg2AJQgUAEgTAAQgiAAgfgKg");
	this.shape_55.setTransform(-12.0164,205.9598);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#E488B7").s().p("ATUHkIhkgzQiyhejlg7QlFgSlWhVQhygKimgNQiYgLh3gMIi7ACQixAAiGgKQhPgGgzgOQhFgUglgnQgOgOgJgRIgIgIQgggegPgiQgOgjgCg6QgChTATg1QAMghAcguQAbgsAZgcQAhgkAlgVQARgJATgGQAcAiApAYQANAWAbAUQAUAOAtAWIG7DYQBvA3A8AZQBhAqBSAXQBHARC2AeQCkAZBYAeIBGAaQAtASAZAIQBHAXBcAMIAgAEIAZAIIBuAgQBOAYBlAmICAAyIAsAtQAoApBMBUIALALQgngIgrgUg");
	this.shape_56.setTransform(-52.1345,237.925);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFC3C3").s().p("AUWTCQhkgWgthGQgIgOgOgdQgNgdgJgOQgRgaghgdIg7gwQgzgrg+hBIgLgLQhMhUgogpIgsgtIiAgyQhlgmhOgYIhuggIgZgIIgggEQhcgMhHgXQgZgIgtgSIhFgaQhYgeikgZQi3gehHgSQhSgXhhgqQg8gZhvg3Im7jXQgtgWgUgOQgbgUgNgWQgpgYgcgiIgEgFQgvg7gIhLQgBgQABhMQAAg4gMghQgEgNgPgcQgKgVgGgOQAPg1gBhLQAAhQgSgxQgRgtgsgyQgagdg2g3Igxg5QgdgggbgRIgIgGQAXgaAggUQA0ghA7gEQAqgDAyAMQAXgGAagDQBHgJBHASQB7AgBtBqQBUBSA1BmQAkBFATBJQAfAfADAqQASgiArgWQAngUAwgDQApgCAyAJQAeAFA6APQANgfAJgPQAOgZARgQQAVgTAcgHQAfgHAYAJQAeAMALAgQAMAcgIAgQgEAUgRAlQgQAmgFASQCygCCcBMIAsAWQAaANAUAIQAcAKAoAIIBFAOQCdAgC8BiQDFBqCwCOQAOgkAaghQAyg+BIgZQBIgZBOASQBNASA2A1QAUAUAXAgIAoA4QASAXBiBuQBHBRAfA9QALAVAPAlIAYA7QAVAvA3BaQA2BaAgAtIBhCEQAzBOAIBFQAJBMgmBIQgmBIhDAmQhCAlhSAAQgfAAgdgGQgcAcgmASQg2AZg8AAQghAAgjgHg");
	this.shape_57.setTransform(-9.4397,206.2316);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#E488B7").s().p("ANrFaQlFgSlWhVQhzgKilgNQiYgLh3gMIi7ACQixAAiGgKQhPgGgzgOQhFgUglgnQgOgOgJgRIgIgIQgggfgPgiQgOgigCg6QgChTATg1QAMghAcguQAbgsAZgcQAhgkAlgVQARgJATgGQAcAiApAYQANAWAbAUQAUAOAtAWIG7DYQBvA3A8AZQBhApBRAXQBHASC3AeQCkAZBYAeIBGAaQAtASAZAIQBBAVBUAMICSBLQBwA5BEAuIApAdQiHg6iigqg");
	this.shape_58.setTransform(-66.7345,222.4375);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFC3C3").s().p("AUqTCQhkgWgthGQgIgOgOgdQgNgdgJgOQgRgaghgdIgIgHQhJgHhZg0QhCgohnhTQhNg/gwgkIgpgdQhEguhwg5IiShLQhUgMhBgVQgZgIgtgSIhFgaQhYgeikgZQi3gehHgSQhSgXhhgqQg8gZhvg3Im7jXQgtgWgUgOQgbgUgNgWQgpgYgcgiIgEgFQgvg7gIhLQgBgQABhMQAAg4gMghQgEgMgLgXQAIgugFg4QgIhRgfg/QgWgqg1hBQg8hHgTggIgdg2QgSgigNgTQgLgQgNgPQAWgXAdgSQA0ghA7gEQAqgDAyAMQAXgGAagDQBHgJBHASQB7AgBtBqQBUBSA1BmQAkBFATBJQAfAfADAqQASgiArgWQAngUAwgDQApgCAyAJQAeAFA6APQANgfAJgPQAOgZARgQQAVgTAcgHQAfgHAYAJQAeAMALAgQAMAcgIAgQgEAUgRAlQgQAmgFASQCygCCcBMIAsAWQAaANAUAIQAcAKAnAIIBGAOQCdAgC8BiQBuA7BnBGQAHgTAKgUQAuhYBWglQBVglBhAXQBfAYA+BGQAfAlAfA9IAzBpQAbA1BDBmQBCBmAcA3IAnBQQAZAsAcAZQAPAOAgAUQAjAWAOALQAnAiAjBCQAUAmAmBMQAIANArA/QAfAuAPAhQAfBHgKBSQgLBRgxA9QgmAwg2AbQg4Acg7AAQgmAAgmgMIgUALQg1AZg9AAQghAAgjgHg");
	this.shape_59.setTransform(-11.4437,197.3316);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#E488B7").s().p("AUWJNQhPg3gpgaQhJgthpglQg9gViCglQl+hpjHgtQlFhJkMgYQhogIjRgMQhkgHhSgLIg/ADQhQADg0gKQhIgMgqgjQgggcgRgpIgSgRQhRhYALiZQAMiWBZhkQAVgZAagTQAFALAIAMQAOATATAOQATAOAYAHIAFACIAEAGQARAaAkAUQAWAMAsAQQAhArA6AkQApAbBUApIGAC6QB9A9BDAfIAZAKQBdApBOAeQCgA9EYBHQFLBWBxAkQBbAdA5AaQBNAkAyAvQAoAnArBCIALASIgCgCg");
	this.shape_60.setTransform(-41.1158,242.35);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFC3C3").s().p("AR/SwQgugRg3ghQi4hthniTIg9hgIgLgRQgrhDgogmQgygvhNgkQg5gbhbgdQhxgklKhVQkYhIigg8QhPgehdgpIgZgMQhDgeh9g9ImAi6QhUgogpgbQg6glghgqQgsgRgWgLQgkgUgRgaIgEgGIgFgCQgYgHgTgOQgTgOgOgTQgIgMgFgMQgNgdAGgfQAEgUAOgaIAZgrIALgUQgFghAIgbQAIgfAWgSIACgXQAGhRgdhKQgJgYgTgkIgeg7QgkhIABg1QAAgiAPgdQAPggAcgTQAcgSAkgEQAkgDAhALQApAPAzAxQA+A9BDBVIADADQARAFASAJQBDAgAOA9QAMglAogaQAkgZAvgIQAogIAzAEQAfACA8AJQAIghAHgQQAKgbAPgTQASgVAagKQAdgLAaAHQAfAIARAfQAPAcgDAhQgBAVgLAoQgLAogCAUQCwgXCmA8IAvASQAcALAUAFQAdAHAqAEIBHAGQCgAPDIBQQDWBWDGCBIBhA/QA5AjAuAUIBJAcQArASAaASQAMAJALALQAHhCAsg8QA+hWBggTQB0gXByBPQBnBIA7B5QApBWAlCXQAuC4AUA5QAXBAAyCBQAkBxgPBUQgRBihTBCQhUBDhhgJQgUgCgTgFIAAAbQABAZAKA6QAJA1gBAeQgDBShBA/QhDBBhZADIgIAAQgxAAg2gTg");
	this.shape_61.setTransform(19.0952,221.5643);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#E488B7").s().p("ATiHlIhlg0Qixhejlg7QhHgEhIgHIgHgDQhVglg4gQQgngMhKgQQhNgSgkgKQgsgNhTghQhVgggpgNQhngfiJgOQg2gFh5gFQgjAPgtANQhUAahRANIg2AGQggAGgWAGQgUAGggAOQgmAQgNAFQhRAdhYgNQhagNhBg1QhEg4gbhUQgbhXAahSQALggASgbIACgHQAMggAcgvQAcgsAZgcQAggkAmgVQAQgJAUgHQAGAKAJAHQARAQAXAJIAEACQAVgEAXABQAiABAsALIBNAVQAjAJA/AOIBiAVQB6AeCrBFQBLAeCtBJIC3BOQDoBkB1AtQBaAkAmAXQAWANAiAaIA2AoIALAHIAeADIAaAIIBtAgQBOAYBlAmICAAzIAtAsQAnApBNBUIALAMQgngJgrgTg");
	this.shape_62.setTransform(-38.1752,227.75);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFC3C3").s().p("ATZTCQhkgWgthGQgJgOgNgdQgOgdgJgOQgRgagggdIg7gwQgzgrg+hBIgLgLQhNhUgngpIgtgtIiAgyQhlgmhOgYIhtggIgagIIgegEIgLgHIg2gnQgigagWgNQgmgXhZgkQh1gvjohjIi4hOQithJhLgeQirhEh6geIhigWQg/gNgjgJIhNgWQgsgLgigBQgXAAgVAEIgEgCQgXgKgRgPQgJgIgGgJQgHgIgGgKQgWgqAOgpQAHgTASgYIAPgTQgQgTgPgVQgigzgahDQgTg0gThMIgNgzQgIgcgIgVIgRgoIgQgnIgGgTQgcgSgWgZQgogsgIg2QgIg2AYg0QAYg0AxgiQA2glBLgJQBHgJBHASQBKATBEAtIAQAAQAwgBAtARQAuASAiAhQAiAhAUAtQATAsABAwQABAdgHA2QAPAoAKAoQAfAfAEAqQARgiArgWQAngUAxgDQAogCAyAJQAfAFA6APQANgfAJgPQANgZASgQQAVgTAcgHQAegHAZAJQAdAMAMAgQALAcgHAgQgFAUgQAlQgRAmgEASQCygCCbBMIAsAWQAbANAUAIQAbAKApAIIBFAOQCcAgC8BiQDIBrCyCRIBYBIQAzAnArAYIBAAhQAkhIBGghQBVgqBqAaQBgAXBQBEQBAA2BDBeQAnA1BKBvQBoCUAVAlQA9BugDBfQgEBlhJBPQhLBPhjAGQgdABgegFQgEAigPAjQglBRhRAnQg1AZg8AAQghAAgjgHg");
	this.shape_63.setTransform(12.0094,196.0816);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#E488B7").s().p("AReKYQgkg8hIg3Qglgdhhg8IjKiCQh7hAjDhIQjYhQipguQhrgehKgHQhfgJijAVQi7AZhHAAQgpAAgjgFIgIAOQhDgOgvgSQhIgagwgoQg4gwghhKQgfhFgHhQQgGhIAQg+QAShFAtgtQALgLANgKQARgSAmgSQAxgXAPgMQAKgIAVgYIAOgOQAMAcASAbQAPAWAUAVQA5A/BiA1QA9AhAsACIAHAAIGNDCQBvA3A8AZIAeANIAJAIQAmAfA3AmQAsABA9AYQA5AYBXAyQBuBCAfAQIAwAYQAcAPATAMIAkAaQAWAQAPAJQAPAIAkANQAiANARAKQAWANAdAdQAnAkAKAJQANAKAbARQAXARAMAPQAJALAOAZQAOAZAIALQAMAPAWASIAlAeQAeAbAPAfIAbAfIAdAhQgXAKgYAEIgJgPg");
	this.shape_64.setTransform(-60.9068,248.325);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FFC3C3").s().p("AU8WmQhigLhDgWQhYgdg3g1QgTgSghgrQghgqgUgTQgTgRghgYIg2gnQgvgmg7hIQhch1g6hEIgdgiIgbgeQgPgfgegcIglgeQgWgSgMgPQgIgKgOgaQgOgYgJgMQgMgPgXgQQgbgSgNgKQgKgIgnglQgdgcgWgNQgRgKgigNQgkgOgPgIQgPgIgWgQIgjgaQgTgNgcgOIgwgZQgfgQhuhBQhXg0g5gYQg9gYgsAAQg3gmgmgfIgJgIIgfgNQg8gZhvg3ImNjBIgHAAQgsgDg9ggQhig1g5g/QgUgVgPgWQgSgbgMgcQgQgkgFgmQgEgaABhfQABhBgMgoIgCgLIgEgsIgFg6QgDgigGgXQgJgegXgnQghg6gogoQgLgZgPgWQgohBg+gqIgDgCIAMgWQAdg0A1ggQA0ghA7gEQAqgDAyAMQAXgHAagDQBHgJBHATQB7AgBtBqQBUBSA1BlQAkBGATBIQAfAgADAqQASgjArgVQAngUAwgDQApgDAyAJQAeAFA6APQANgeAJgPQAOgaARgPQAVgTAcgHQAfgIAYAKQAeAMALAgQAMAbgIAhQgEATgRAmQgQAmgFASQCygCCcBLIArAXQAaANAUAHQAcAKAoAJIBGANQCdAgC8BjQDIBrCyCRIBSBCIAAgBQAahYA+g1QBbhPCEAcQCFAbA0BsQALAXASAxQARAqAUAXQAPAQAfAVQAkAXANALQA3AxARBlQAKA7AMB4QAEAYAqCXQAeBqgHBGQgIBXg7BBQAJA8gcA9QgkBShRAmQgkASgnAFIAKAvIAcBiQAPA6ADAqQADA2gRAvQgTAzgoAbQgiAWgxAFIgcABQgcAAgjgEg");
	this.shape_65.setTransform(-0.0413,231.489);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#E488B7").s().p("AL7GHQgggOhXgwQhJgpgvgRQg8gXhagPIiagXQg5gKi9gtQiagkhggIQhtgJhBAdQgYALgyAjQguAhgdALQhCAZhMgaQhFgXg3g4QhLhNgghxQgehsAQhyQAOhuA8gnQAMgHAMgFQAEAWAQAVQAOASATAMQATANAYAGIAFACIAEAGQARAXAkATQAWAKAvAQIHXCdQB3AnA/ASQA3AQAyALQBAAfAzAfIB7BPQBJAuA3AYQAwAVBRAZQBmAeAdALQByApBjBCQAgAVAYAWQgdAIghAAQhMAAhbgqg");
	this.shape_66.setTransform(-93.939,233.9373);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FFC3C3").s().p("ALaWoQhYgLgtgxQgbgegRg0QgQg+gKgeQgpiEhphZIhUhBQgxgngXgkQgSgcgTg7QgUg+gPgaQgTgjgnghQgYgWgggVQhihChygpQgdgLhmgeQhRgZgwgVQg3gYhJguIh7hPQgzgfhAggQgygLg4gQQg/gSh3gnInXicQgvgQgWgKQgkgTgRgXIgEgGIgFgCQgYgGgTgNQgTgMgOgSQgQgVgEgWQgDgQADgRQAEgTAOgXIAZgoIALgSQgFgeAIgZQAIgcAWgRIACgUQACgUgBgSIADgHQAkhRALgnQAPg1AFg/QADgpgBgjQgihGgWgkQgSgfgng7Qghg2gLgqQgUhQAmhRQAmhRBLgjQBLgkBXATQBWATA2BAIAQASQAJALAJAFQALAHAQAEIAdAGQA7ANAwApQAwAqAUA5QARAvACBJIABB7QABAcAGA2QACAbAAAXQAfACA6AIQAIgeAHgPQAKgYAPgRQASgTAagKQAdgKAaAHQAfAIARAcQAPAZgDAeQgBATgLAkQgLAmgCARQCwgUCmA3IAvAQQAcAJAUAFQAdAHAqAEIBHAFQCgAODIBJQDWBODGB1IBhA6QAhASAdAOQAEgcALgcQAdhPBCgvQBBguBVgCQBUgCBEArQBKAvA6BtQAgA/A7CCQBSgNBPAlQBPAkArBGQAhA3AMBNQAIA5gCBUIgFCOQABBQAPA7QAJAgAmBcQAgBNAGAxQAIA+gUA9QgUA9gsAsQgrAsg9AVQg9AUg9gKQhLgMhDg3Qg6gxgshLQghg3gihaIgVg5QglAQgpgEQAJAugPAwQgPAvgiAhQgiAhgwANQgvAOgvgLQAHAqAZA7IAqBhQAUA4gCAyQgCA6ghAlQgdAfgxALQgYAGgcAAQgTAAgUgDg");
	this.shape_67.setTransform(-4.2469,215.4395);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#E488B7").s().p("AUWIZQhPgygpgYQhJgphpgiQg9gTiCghQl+hgjHgpQlFhDkMgWQhogHjRgLQhkgGhSgKIg/ADQhQACg0gIQhIgLgqghQgggZgRglIgSgQQhRhQALiLQAMiJBZhcQAVgWAagSQAFAKAIALQAOASATANQATAMAYAHIAFABIAEAGQARAYAkASQAWAKAsAQQAhAmA6AiQApAYBUAlIGACqQB9A3BDAcIAZAKQBdAmBOAaQCgA4EYBBQFLBOBxAgQBbAbA5AYQBNAhAyArQAoAjArA8IALAQIgCgBg");
	this.shape_68.setTransform(-61.4658,242.425);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FFC3C3").s().p("ARARGQgtgQg4geQi4hkhmiGIg9hXIgLgQQgrg8gogjQgygrhOghQg5gYhagbQhxgglKhOQkZhBifg4QhPgahdgmIgZgLQhDgch+g3ImAipQhTglgpgYQg6gigigmQgsgQgWgKQgkgSgQgYIgEgGIgGgBQgYgHgTgMQgSgNgOgSQgJgLgFgKQgMgbAGgcQAEgSAOgYIAZgnIAKgSQgEgeAHgZQAJgcAVgRIACgUIABgXIARgmQAhhNAKgpQARhDgGhgQgCgvgIgdQgLgkgWgjQAYABAWAHQApANAzAtQA/A4BDBOIACACQARAEASAJQBDAdAPA4QAMgiAngYQAkgXAwgHQAngHAzADQAgACA7AIQAJgeAGgOQAKgZAPgRQASgTAbgKQAdgKAaAHQAfAIAQAcQAPAZgCAeQgCAUgLAkQgLAkgCASQCxgUClA2IAvARQAcAJAVAFQAdAHApADIBIAGQCfAODIBJQDXBODFB1IBiA5QA4AhAvASIBJAaQArAQAZAQQAsAdAUAsIADACIACABIAGgWQAIgdAEgUQAFgbAEhSQADhFANgnQAchWBZg2QBTgxBjgBQBKgBBDAaQBGAbAvAzQAlAoAcA9QARAlAaBNIA+C4QAUA7AIAgQANAzACApQAAAKgEBVQgDA5AJAkQAHAYASAkIAdA7QAWA0AEBKQACASAABxQABCZgDAnQgKBrgvBEQgmA4g+AfQg/AfhDgDQhDgCg8glIgOgJQgRAagaAXQhDA7hZADIgFABQgyAAg4gSg");
	this.shape_69.setTransform(4.9888,223.5026);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFC3C3").s().p("ARARGQgugPg3geQi4hkhniGIg9hXIgLgQQgrg9gogiQgygrhNghQg5gZhbgaQhxghlKhNQkYhCigg3QhPgbhdgmIgZgKQhDgch9g4ImAipQhUglgpgYQg6ghghgnQgsgPgWgLQgkgSgRgXIgEgGIgFgCQgYgGgTgNQgTgMgOgSQgIgLgFgLQgNgaAGgcQAEgTAOgXIAZgoIALgSQgFgeAIgZQAIgcAWgQIACgVIABgaQAZgeAPgnQAVg2gFg5QgCgZgLgtIgZhlQgLgygJgbIgMgfIATgDQAkgDAhALQApANAzAtQA+A3BDBOIADADQARAEASAIQBDAeAOA3QAMghAogYQAkgXAvgIQAogGAzADQAfACA8AIQAIgeAHgPQAKgYAPgRQASgTAagKQAdgKAaAGQAfAIARAcQAPAZgDAeQgBAUgLAkQgLAlgCASQCwgVCmA3IAvAQQAcAKAUAEQAdAHAqAEIBHAFQCgAODIBJQDWBODGB2IBhA5QA5AgAuASIBJAaIAIADQALgaARgZQA1hPBVgcQBVgcBbAdQBaAeA2BIQAIALAbAsQAWAiARATQAPARAeAXIAwAlQAoAkAiA4QAYAoAdBCIA4B8QAiBGAiAvQAOAUAeAlQAaAiANAaQAcA0AIBPQATCohDCGQguBchJArQgoAYg3AKQgsAIg7ABQgcAAgZgCQgSAjghAeQhDA7hZADIgFAAQgzAAg3gSg");
	this.shape_70.setTransform(5.004,217.1442);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FFC3C3").s().p("AQ+RGQgtgPg4geQi4hkhmiGIg9hXIgLgQQgrg9gogiQgygrhOghQg5gZhagaQhxghlKhNQkZhCifg3QhPgbhdgmIgZgKQhDgch+g4ImAipQhTglgpgYQg6ghgignQgsgPgWgLQgkgSgQgXIgEgGIgGgCQgYgGgTgNQgSgMgOgSQgJgLgFgLQgMgaAGgcQAEgTAOgXIAZgoIAKgSIgBgIQATgTAPgWQAng4APhHQANg+gDhMQgDg1gNhUQgHgvgKgZQgIgWgSgYQgJgNgSgUQAOgEARgCQAkgDAgALQApANAzAtQA/A3BDBOIACADQARAEASAIQBDAeAPA3QAMghAngYQAkgXAwgIQAngGAzADQAgACA7AIQAJgeAGgPQAKgYAPgRQASgTAbgKQAdgKAaAGQAfAIAQAcQAPAZgCAeQgCAUgLAkQgLAlgCASQCxgVClA3IAvAQQAcAKAVAEQAdAHApAEIBIAFQCfAODIBJQDXBODFB2IBiA5QAuAaAnARIAFgHQAtg8BJgcQBJgcBJANQBDANBFAwQAtAfBIBEIGzGUQA2AzAZAcQAoAvATAtQAWAzAHBcQAKB0gKBZQgMBugqBUQguBghVA7QhbA/higEQgkgCgjgLQgLAOgQAOQhDA7hZADIgFAAQgyAAg4gSg");
	this.shape_71.setTransform(5.1591,223.4942);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#E488B7").s().p("AUWH6QhPgwgpgVQhJgnhpggQg9gSiCggQl+hajHgnQlFg/kMgUQhogHjRgKQhkgHhSgJIg/ADQhQACg0gHQhIgLgqgfQgggXgRgjIgSgPQhRhMALiDQAMiCBZhVQAVgWAagQQAFAJAIAKQAOARATAMQATAMAYAGIAFABIAEAGQARAXAkAQQAWAKAsAPQAhAkA6AgQApAWBUAkIGACgQB9A0BDAbIAZAIQBdAkBOAZQCgA1EYA9QFLBJBxAfQBbAZA5AXQBNAfAyApQAoAgArA5IALAQIgCgCg");
	this.shape_72.setTransform(-56.3658,249);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FFC3C3").s().p("ARzTgQgtgPg4gcQi4hehmh+Ig9hSIgLgQQgrg5goggQgygphOgfQg5gXhagZQhxgflKhJQkZg9ifg1QhPgZhdgkIgZgJQhDgbh+g0ImAigQhTgjgpgXQg6gggigkQgsgOgWgKQgkgQgQgWIgEgGIgGgCQgYgGgTgLQgSgMgOgRQgJgLgFgJQgMgZAGgbQAEgRAOgWIAZgmIAKgRQgEgcAHgYQAJgaAVgQIACgTIABgSIAJgYQANgsAAhUQAAhMgKg1QgLg7gihOQgagngQgmQgahBABhDQAChIAgg4QAhg5A9ghQA8giBCADQBCADA5AmQA6AmAcA7IAOAfQAIASAHAMQANASAfAZQBMA/AkAvQA2BHADBJQADA1gZA2QgGAOgIAOQAggDAnACQAgACA7AHQAJgcAGgOQAKgXAPgQQASgSAbgJQAdgKAaAGQAfAIAQAaQAPAYgCAcQgCATgLAiQgLAigCARQCxgTClAzIAvAQQAcAJAVAEQAdAHApADIBIAFQCfANDIBFQDXBKDFBvIBiA1QA4AfAvARIBDAXQAqh0BSg6QBghECIARQB6AQBvBLQCqBzBgDGQBeDBgCDVQgBBngZBRQgeBgg+A8QgqAqg6AXQg3AWg5AAIAAAHQABAVAKAyQAJAugBAZQgEBGhBA3QhDA4hZADIgFAAQgyAAg4gRg");
	this.shape_73.setTransform(4.9731,209.4654);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#E488B7").s().p("ATEHhQhLgtgmgUQhFgmhhgeQg6gRh5geQlmhVi7gmQkvg8j7gTQhigHjDgJQhegGhNgJIg7ACQhLACgxgGQhDgLgngdQgegWgQgiQgJgGgIgIQhLhHAKh9QALh7BThSQAUgVAYgPQAFAJAIAJQANAQARAMQASALAWAGIAFABIAEAGQAQAVAhAQQAVAJApAOQAfAjA3AeQAmAVBOAiIFoCYQB1AyA/AZIAXAIQBXAiBJAYQCWAyEGA6QE2BGBqAdQBVAYA1AWQBJAdAuAnQAmAfAoA3IAKANIgBgBg");
	this.shape_74.setTransform(-60.8085,249.3);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#FFC3C3").s().p("APaS0QgqgOg0gbQishahgh4Ig6hOIAAAAIgKgOQgog3gmgeQgugnhJgeQg1gVhVgYQhqgek1hFQkGg7iWgyQhKgXhXgjIgXgJQg/gZh1gyIloiYQhOghgmgWQg3gegfgiQgpgOgVgKQghgQgQgUIgEgGIgFgBQgWgGgSgLQgRgLgNgQQgIgKgFgJQgMgYAGgZQADgQAMgTQAkgjATguQAUgxADhIIgBh9IACiFQABhQgJg1QgMhHgfg4QgNgXgQgUIgCgUQgGhNArhGQArhGBIgdQBIgdBPAVQBQAVAwA9QAbAjAaBBQAjBbAIAQQARAiBKBpQA8BUAQA9QAHAbACAaIA1AGQAIgbAGgNQAJgWAOgPQARgRAZgJQAbgJAZAGQAdAHAPAZQAOAWgCAcQgCASgKAfQgKAhgCAQQClgSCbAxIAsAPQAaAIATAFQAcAGAmADIBDAFQCWAMC7BCQDJBGC5BpIBbAzQA1AeArAPIA+AWQAUgnAjggQAxgsA/gNQBHgOBOAcQBFAZA+A2QAwArA2BFQAfAoA8BUQA7gzBTgFQBUgFBBArQBBArAcBOQAdBOgXBLQgGAXgQAhIgZA2QgOAggOAzIgXBUQgaBVgrA/QgxBIhEAiQgvAYg2AEQgfADgegFIAFAXQAIAsgBAYQgDBDg9A0Qg+A1hUADIgGAAQguAAg0gQg");
	this.shape_75.setTransform(4.6824,210.0619);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#E488B7").s().p("ATEHiQhLgtgmgVQhFglhhgeQg6gSh5gdQlmhWi7gmQkvg7j7gUQhigHjDgJQhegGhNgJIg7ADQhLACgxgHQhDgKgngeQgegWgQghQgJgHgIgIQhLhHAKh9QALh7BThSQAUgVAYgPQAFAJAIAKQANAQARALQASALAWAGIAFABIAEAGQAQAVAhAQQAVAKApAOQAfAiA3AeQAmAWBOAhIFoCYQB1AyA/AZIAXAIQBXAjBJAXQCWAyEGA7QE2BFBqAeQBVAYA1AVQBJAeAuAnQAmAeAoA3IAKANIgBAAg");
	this.shape_76.setTransform(-69.7585,249.2875);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FFC3C3").s().p("AV6VaQhWgghGhgIgTgbQgQAfgfAbQg/A0hTADQgxABg3gQQgrgPg0gaQishahgh4Ig5hOIgBgBIgJgOQgpg2glgfQgvgnhIgdQg2gWhUgYQhqgdk1hGQkHg6iVgyQhKgYhXgiIgXgJQg/gZh2gyIlniZQhOghgngVQg2gfgfgiQgqgOgUgJQgigQgPgVIgEgGIgFgBQgXgGgRgLQgSgMgNgQQgIgKgFgJQgLgXAFgZQAEgQANgVIAYgkIAJgQQgEgZAGgWQAxgiAag1QAWgsAGg7QAFgrgChCQgCgvgEgcQgFgpgMggQgKgZgRgbQASABARAEIgLgqQgNg4gRhXIgji2QgQhSACgqQAEhCAkg5QAlg5A6gdQA7geBEAGQBEAGA0AnQBHA2ArB/QAlBtAKBzQAIBfAGAcQAPBDAnAjQAKAJATAMIAeAVQA3ApAeBOQAQgQAYgIQAbgJAYAFQAdAHAQAaQAOAWgDAbQgBASgKAgQgLAhgCAQQCmgSCbAwIAsAPQAaAJATAEQAbAHAnADIBDAEQCVANC7BBQDJBGC5BqIA7AhQAGgaALgZQAXg1ApgkQAogiAzgPQA0gOAzAIQAzAIAsAeQAtAeAaAtQAJAPALAaIACgCQBBgzBMgNQBOgNBLAeQBOAfAqBBQAcApAWBRQAbBhAOAfQAZA2AwA3QAfAkA+A5QBFBBAaAbQAyA2AcAzQAhA+ADBBQAEBHghA2IgVAdQgMASgDAPQgEATAGAZIAOArQAWBKgSBNQgSBPg1A2Qg2A4hOASQggAIgfAAQgtAAgqgQg");
	this.shape_77.setTransform(1.3824,199.2004);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#E488B7").s().p("AJwErIgKgDQk/hYkJgmQhngOjPgXQhkgMhRgPIg/gBQhQgDgzgLQhHgQgngkQgdgbgOgnIgRgSQhKhXAXiQQAGgkAMghIARgGQBAgSBhgFIAMAOQASAQAdAOQARAIAlAOQCkA8CZBMIBjAzQA7AeAqARIBJAfIBLAfQA1AVCEBEIDVBrIDtB2QAmATAWAJQAhAPAdAHIAXAFIADARIABABQiagvhogdg");
	this.shape_78.setTransform(-143.0477,250.525);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#FFC3C3").s().p("APpXmQg1gBg5gYQgrgSg1gjQivhxhbiQIg1heIgCgBQhLg5gngaQhGgwhlgoQg8gYh+gqQing2iEgpIgBgBIgDgRIgXgFQgdgIghgOQgWgJgmgUIjth2IjVhrQiEhDg1gXIhLgeIhKgfQgqgSg7geIhjgyQiZhMikg9QglgNgRgIQgdgOgSgQIgMgOQhhAEhAATIgRAFQAfheBHhCQAYgWAagQIgEgPQAcgSAcgZQAigeA5hCIC2jQQAggkAPgVQAZghANgeQAPgiAFgpIAOAFIAHilQACgjgCgSQgDgdgMgUIgHgKQgDgXgGgVQgMglgXgiQgfguguggQgQgLgQgJQgEgYAAgZQACg+Afg4QAfg4A0ghQAzgiBAgEQBAgFA4AaQAaAMAhAZIA5AqQA1AjAaATQAsAhAXAhQAPAXALAhQAHAUALApQAdBxAJA8QAOBXACBpQAOAAAMAEQAeAKAOAeQANAbgFAfQgDAUgOAkQgOAlgEATQCygLCgBCIAuAUQAbALAUAGQAcAJApAHIBHAJQCeAXDBBXQDPBeC7CEIBbBAQAVgmAhgdQAnggAugMQBFgUBaAXQAoALB1AtIANAFIAFgPQAZhMBDgvQAxgkBIgOQA3gLBPABQB5AABLAfQAnAQArAeQAZASAwAoQBFA5AfAgQA1A1AaA0QAZAzAHA4QAGA5gNA2IgFAaQgCAOADALQAEAMAMANIAYAVQA7A0APBhQAGAmgBAvQgBAdgEA4IgQDSQgGBLgHAkQgLA9gXArQgbAxgsAjQgtAjg1AOQg1AOg5gJQg4gJgugdQgOgKgOgLQgmAYgvAMQg/AQhEgKQg4gIg1gYIgBAIQAAAXAFA4QAFAygEAdQgKBMhFA4QhGA3hVAAIgGAAg");
	this.shape_79.setTransform(-25.1423,213.288);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#E488B7").s().p("AN1IwQhogpjNhVIkMhvQh+g1hFgSQgxgMhBgKIh0gPQiCgSjogsQhKgOgmgKQg9gQgtgXQiFhCg5iSQg2iLAmiQQARhBAggtQAZgkAggWIABACQAEAKAGALQALARAPAMQAOAMATAGIAEABIAEAHQAMAWAdARQARALAiAOQAaAlAtAhQAgAXBCAjIErCjQBiA2A0AbIATAKIBKAkIMiIPQATAfAPAdIgjgOg");
	this.shape_80.setTransform(-105.4309,245.65);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#FFC3C3").s().p("AELcNQg2gMgsglQgtgkgWgzQgPgjgIgzIgMhZQgKhDghhuQglh/gKgwIgcipQgRhmgYhAQgKgZgOgcQgOgdgTgeIsioQIhLgkIgTgKQg1gbhhg2IksiiQhBgjgggXQgtghgaglQgjgPgRgKQgcgRgNgXIgDgGIgEgBQgTgGgPgMQgOgMgLgSQgHgLgEgJIAAgCQgKgYAFgbQACgJADgKIAFgDIA9gmIBEgjIAYgNQAUgkAlg0QAkgxASgmQgGgTgDgTQgCgPgBgaIgDgqQgHhVgthPQgRgcglg3QgZgpgjhQQgQgngIgVQgMgigDgdQgJhJAkhGQALgUAOgSQABgfADgXQAHg0ARgnQAkhNBSgpQBSgoBTATQBUAUA3BJQA4BJgEBVIgBAWQAAAOACAJQAEAQAWAcQBWBwAmCkQAUBWAIBuQALAXgCAcQgBAMgDASIAAAeIABArQCBgOB5AxIAkAQQAWAJAQAFQAXAGAgAEIA4AFQB8AOCdBGQCoBLCaBxIBLA2QAsAgAkARIAwAVQAOACAOAEQA6ASAxBHQARgLAUgIQApgRA5gFQAcgCBKAAQBcAAATABQA+ADAuALQAyAMA0AcIABgDIANgwQAbhTBRg0QBOgyBbABQAvABA/AQQAlAJBIAUICwAtQBiAfA0A4QA2A7ATBkQAMBBAAB1IgDGNQgBCYAHBLQACAUAPB3QAKBUAAA3QgBCnhUBcQgqAug9AWQg9AWg+gIQgTgCgngKQgmgJgUgCQgegDgzAFQg6AFgXgBQhIgDhAgmQhAgngjg+QgIgNgGgOQgqASgzACQhiADhCg8QgdgagXgmIgVA3QgOAggZAUQgeAXgfgGQAdAvANAaQAUApAEAkQAFAsgUAlQgUApgoAPIgFACQAJAuACAnQAFBOgXBEQgYBMg1AuQgqAkg3APQgeAHgeAAQgZAAgZgFg");
	this.shape_81.setTransform(-1.7862,227.585);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#E488B7").s().p("AM5JOQhogsjNheIkMh7Qh+g5hFgTQgxgOhBgLIh0gRQiCgUjogwQhKgPgmgLQg9gSgtgYQiFhKg5igQg2iaAmieQARhHAggyQAZgnAggYIABACQAEAKAGAMQALAUAPANQAOANATAGIAEACIAEAHQAMAYAdAUQARALAiARQAaAoAtAjQAgAaBCAnIErC0QBiA7A0AdIAUALIBJAnIMrJKQBhBHAwAnQhKgehRgkg");
	this.shape_82.setTransform(-91.9184,240.75);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#FFC3C3").s().p("AHaVrQgngKgfgbQgagXgXglQgQgZgVgtQg5h9geg+Qg1hqg2hEQg0hAhOhCIgDgDQgwgnhhhHIsrpLIhKgmIgUgLQg0gehig7IkrizQhCgngggaQgtgkgagoQgigQgRgLQgdgUgMgYIgEgHIgEgCQgTgGgOgNQgPgOgLgTQgGgMgEgKIgBgCQgJgbAFgdQADgUALgYIATgqIAIgTQgDggAGgbQAGgdARgSIACgVQAEhPgWhHQgHgYgPgiIgXg5QgchFAAg0QABggALgcQAMgfAWgSQAVgSAdgDQAcgEAZAMQAgANAoAwQAxA7A0BSIACADQANAEAOAJQA1AfALA7QAJgkAfgZQAcgYAlgJQAfgGAoADQAYACAvAJQAGggAFgPQAIgaAMgSQAOgUAVgLQAWgLAVAHQAYAIANAeQALAbgCAgQgBAVgIAlQgJAngCATQCKgVCBA5IAlASQAWAKAQAFQAWAHAhAEIA4AFQB8APCdBNQCnBTCaB8IBLA8QAsAjAlATIAwAXQANACAOAFQA9AUAyBUQAOAYAbAxIAVAkIACgBQApgYAwgHQAugGAvALQAvg7BEgZQA0gTBMgCQAsgBBYACQArAABXgEQBNgCA0AJQA5ALBKAgQAqATBUAoICDA8QBJAmArAsQAyA1AbBNQAYBGABBQQAAAZgBAxQgBArAFAeQAGAfAYA7QAXA8AGAfQALA7gRA7QgRA8gpArQgKAKgoAjQgfAbgPAVQgTAagVA9QgcBNgTAqQgdBAghAvQgnA2gzAlQg3Aog8ALQhUAQhXgnQhSglg7hJQgggngagxQgXAegfAWQg4AnhJADQhIADg8giIgPgKQgNAegXAUQgdAZgggHQAeA0ANAcQAUAuAEAoQAEAvgTAqQgVAsgnARQgUAJgXAAQgQAAgRgEg");
	this.shape_83.setTransform(7.0618,233.7753);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#E488B7").s().p("AQuJwQgYgMhFgvQgrgdg5gdQgjgShFgfQhTglgqgQQhHgcg7gNQgngIhZgMQhUgLgsgLQgtgLhPgfQhVgggngLQgZgIhCgNQg7gNghgKQgUgHg5gWQgxgTgdgHQgygMhVgDQhmgDghgEIg8gKQgjgFgYAAQgTABgZAEIgtAIQiCAVhPgsQhEgngjhTQgfhKAAhcQAAipBSiWQAqhOAzgfQAOgIAPgGIgFAHQgUAcgCAmQgCAkANAjIABABIARgDQAjgEAkAKQAfAIAjASQAWALAoAZIEdCwQDiCMB0BDQC/BvCgBNQBOAmA4ASQAQAFBEASQA0AOAfANQAnARAyAhIBVA5QBBArBGAhIBXApQAxAZAeAcIAQAQQAlAYAfAcQASARAeAeIgKAAQgfAAgjgQg");
	this.shape_84.setTransform(-75.3875,238.9471);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#FFC3C3").s().p("AYHSVQhZgEhPgtIgBABQhTAlhjgUQhkgVgthCQgIgOgOgbQgNgcgJgMQgRgZghgcIg7guIgjgcQgGAPgKAMQgLANgdAVQgbATgLAPQgNASgLApQgKArgKARQgbAsg9AHQg4AGgygdQgmgVguguIgdgeQgdgegTgRQgegbgmgZIgPgQQgegcgxgZIhXgpQhGghhBgrIhUg5QgyghgogRQgfgNgzgOQhEgSgRgFQg3gShPgmQighNjAhwQh0hDjiiMIkcivQgpgZgVgLQgkgSgegIQgkgKgjAEIgSADIAAgBQgNgjACgkQACgmAUgcIAFgHQAIgKAKgIQAHgOAMgPQAWgYAKgNIAMgRIABgJQgIgfgCgjIABg+QABglgEgYQgFgbgNggQgIgUgSglIgJgTQAAgogFgdQgNhRhAhaQg/hYhGghIgDgCQATgYAcgSQA2gkBMgIQBHgJBHASQB7AeBtBlQBUBNA1BhQAkBBATBFQAfAeADAoQASghArgUQAngTAwgDQApgCAyAIQAeAFA6AOQANgdAJgOQAOgYARgPQAVgSAcgHQAfgHAYAJQAeAMALAeQAMAagIAfQgEASgRAkQgQAkgFARQCygCCcBIIAsAVQAaAMAUAIQAcAJAoAIIBGANQCcAeC8BeQCsBXCcByQAQgcAXgXQA3g5BfgYQBGgRBrgBQBbgBBAAJQBUAKBBAdQBPAiBEBDQA+A9AuBSQAoBIAgBdQAYBHAYBmQARBHAMAdQAPAjAfAtIA0BNQApBBAUBFQAVBLgGBHQgGBLgkBBQgmBEg9AmQhJAvheAAIgWgBg");
	this.shape_85.setTransform(-2.2179,203.7171);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#E488B7").s().p("AM5I0QhogsjNhZIkMh1Qh+g2hFgTQgxgOhBgKIh0gQQiCgSjogvQhKgOgmgKQg9gRgtgYQiFhFg5iaQg2iSAmiYQARhDAggwQAZglAggXIABACQAEAKAGALQALASAPAOQAOAMATAGIAEACIAEAGQAMAXAdATQARAKAiAQQAaAmAtAjQAgAYBCAlIErCsQBiA4A0AcQAKAFAKAGQAnAVAiARIMrIuQBhBEAwAlQhKgdhRghg");
	this.shape_86.setTransform(-95.6684,257);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#FFC3C3").s().p("AHPaOQgngJgfgaQgagWgXgjQgQgYgVgrQg5h3geg7Qg1hlg2hBQg0g+hOg/IgDgDQgwglhhhDIsrowQgjgRgngVQgKgGgKgEQg0gdhig4IkrirQhCglgggZQgtghgagmQgigQgRgLQgdgSgMgYIgEgGIgEgCQgTgGgOgMQgPgNgLgSQgGgMgEgKIgBgCQgJgZAFgcIACgKQA3gKAwgYQApgVAogiQAGg+Acg7QAmhHAQglQAdg/gHgxQgDgZgOghIgag3QgUgtgPhCIgahyIgmiZQgVhZgDhBQgEhVAZhHQAbhRA5gvQAygpBCgLQBCgKA8AXQA8AXApA2QAqA0AIBAQAEAbgDA6QgCA3AFAdQAEAbAOAoIAXBDQAGAWAHApQAIAsAFATQAHAdARAqIAbBHIAMAkQAPAKAJAUQALAZgCAfQgBAPgFAaQADAbABAbIAAAOQCAgPB5AzIAlARQAWAKAQAEQAWAHAhAEIA4AFQB8AOCdBKQCnBPCaB2IBLA6QAsAhAlASIAwAWQANACAOAEQAxAQAqA2QAngrBCgYQBFgZBZAAQCHABBSAwQAYANAWASQAWgcAfgXQBKg4BWABQA7ABBXAgQByAqBuA9QAyAcB/BPQA3AjAbAUQAsAiAbAiQA8BKAXB+IAYDgQAFAwAOBeQALBUgBA6QAABNgTBAQgVBKgtAyQg9BGhqAeQhYAYhygFQisgHhVhKIgSgRQgNAagTAXQgsA2g+AWQg/AWhEgPQhEgQgugvQgTgTgRgaIgNALQgTATgOAkIgXA/QgOAigaAVQgdAYgggHQAeAyANAbQAUAsAEAlQAEAugTAnQgVArgnAQQgVAIgXAAQgPAAgRgEg");
	this.shape_87.setTransform(4.4399,214.8919);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#E488B7").s().p("AMdH/QgpgHg0gOIhbgaInNiLQiHgqg9gVIh5grQhIgagzgNQgvgNhpgWQhkgVg0gQQizg1hVhpQgngvgSg7QgUg7AFg8QAFg9Adg3QAeg3AxgjQAdgVAlgPQgLAXgJAaIAEgCQgHAbgDAcQgHBFAYAyQAXAwBGA1QBpBQCRBPQBYAwCyBUQBvA1A5AVQAhALBKAVQBGAUAlANQA9AWBlA0QBxA6AwAUQBYAlBhATQAqAJAjAAIASAJQA3AbAnAUIgUAFQgXAFgZAAQgfAAgigHg");
	this.shape_88.setTransform(-151.5547,271.3649);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#FFC3C3").s().p("AFQXoQgqgEgtgbQgigVgpgmQiGh7hAiVIgkhgIgCgBQg5g9gegdQg1gzhQguIg0gcQgngVg4gbIgSgJQgiAAgqgIQhigThXglQgwgUhxg6Qhmg0g9gWQgkgOhHgTQhKgVghgMQg6gUhvg1QixhVhZgwQiRhPhphRQhGg1gXgwQgYgwAHhGQADgcAIgbIgEACQAIgZAMgXIABgEQAngUA7giICXhZQBVg1A7gvQBlhSBih+QAigrArg+IAHgjQAHgjAAhAQgChrgUhMIgXhKQgOgtgEgeQgMhMAfhIQAghKA/gmQA8gjBXgDQBmgFBGAmQA/AkAuBPQAeAzAkBkIApBzQAdBSAKAqQARBKAABrQAAA9gDB7IAAAgIAEACQAWAKAhAJIA5ANQB0AeCKBUQAXggAlgpQAugxAjgcQAwgmAwgQQBLgZBtAVQA+ALB9AgQBTAQCrAQQCVAVBSA9QAVAQAoAhQAkAcAfAHQAXAGAogDQAwgDAQACQAVACAUAHQABgmALgmQATg9AvgwQAugwA9gVQBBgWBJANQBGAMA8AoQA5AmAqA9QAoA4AXBGQAMAlANBAQAQBLAIAcQAgB3BGBmQAOATAqA4QAkAuASAeQA3BZAYB4QAUBiABB/QAABRgKA3QgNBJgiAzQgwBLhZAeQgMAsgSAjQgZAvgnAhQgpAigwALIgwAHQgdAFgRAIQgRAJgTATIghAjQhZBciMgBQiNAAhYhcQgnA9gVAcQglAvgmAcQhSA8htgJQhugJhHhJIgRgTQgTAiggAbQg4Avg+AAIgRgBg");
	this.shape_89.setTransform(-25.004,238.4368);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#E488B7").s().p("AK/InQhjgMiQg8QjHhSgogNQhagcj5gnQjZgih1g0QhLgihVg7QgygigegdQgngngSgpQgWg4AIhSQAQhgAFgvIAHhFQAFgnAMgaQAbg/BMgsQAagPAbgLIgDARQgHBFAYAyQAXAwBGA1IASANQAhBiBLBrQCFC7C4B+QDACFDWAnIBjAPQA8AKAmALQByAgAyBMIALAXIgPAAQgXAAgZgDg");
	this.shape_90.setTransform(-178.879,293.7652);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#FFC3C3").s().p("AAbZWQg0gHgrgjQglgegfgxQgVghgcg9QghhEgPgaQgdg0ghgfIjSAQQgrADgYgCQgmgDgagPQgmgXgbhAIglhUIgLgWQgyhMhyggQgmgLg8gKIhjgPQjWgnjBiFQi4h+iFi8QhLhrghhiIgSgNQhGg1gXgwQgYgyAHhEIADgRQADgTAFgTIgEACQAJgaALgXQAXgvAggmQA+gcBHguQAugeBSg7QBahCAvgnQBKg9Azg5QA7hCA7hhIALgBIgDn1QAAhPAFgpQAIhDAaguQAaguAuggQAugfA1gIQA0gJA1ANQA1ANAsAgQA/AvAuBZQAbA0ApB0QBuE5CJEhQgJiAAAg/QAAhuAmhFQAZguAqghQAqghAzgLQAzgLA0ANQA1AMAnAiQAsAlAjBKQAUArAiBXQAoBUBbB2IADAEQBAgMA7ANQAkAHA+AaQBCAcAgAHQBAAQBjgHIClgMQECgCEdDCQBeBACJB0QC7CcAmAfQBgBKAXAVQBAA5AgA6QAmBDAOBfQAJA8ACBxQACB1gMBBQgSBjg2A6IgkAkQgUAWgHATQgIAVACAcQABANAHAlQAcCVgkBsQgUBAgrAyQgtA0g7AWQg2AUhrgBQhygBgxANQgYAHg0AWQgwAVgcAGQhGAPhFgeQhGgfgkg+IgTgkQgLgWgLgMQgPgRgTgHQgWgHgRAIQgcBAg+AoQg+AohFgBQhGgBg9gpQgfgWgWgbQgQBDg4AvQg/A2hIgHQgqgFgtgbQgRgKgTgPQgEAQgHAPQgQAngfAVQghAXgqAAQgMAAgMgCg");
	this.shape_91.setTransform(-28.3892,243.2815);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#FFC3C3").s().p("AAoa1Qg0gIgrgjQglgdgfgxQgVgigcg8QghhEgPgbQgdgzghggIjSAQQgrAEgYgCQgmgDgagPQgmgXgbhAIglhUIgLgWQgyhMhyghQgmgLg8gJIhjgQQjWgmjBiFQi4h+iFi9QhLhqghhiIgSgOQhGg1gXgwQgYgxAHhGIACgQQADgTAGgTIgEABQAJgYALgXQAKgWANgUQA9gFA/gUQBegdBlhAQBGgsBqhTQBAgzAlgkQBUhSAyhmIAPjYQADgvAAgYQgCgngJgeQgLghgkgyIhMhuQgqg/gZgzQgehBgKg/QgLhGARg8QAOg2AkgtQAkgsAxgaQBdgwB1AYQBrAWBdBJQBGA3BTBkQAvA5BcByQBKBVChCiQCJCUA4B+QBBCUgJChIgBAmQBPABA+AqIAoAbQAYAMAUgEQANgCAOgLIAYgUQAegZAlgMQAmgMAnACQAaABA7AQQA2AOAfAAQAkAAAugPIBRgeQBkgmA6AWQAaAKAoAhQArAkAXAKQAgAPA1ACIBLADQA5gtBKgLQBMgLBCAeQAnARArAkIBKBDQAwAsBrBVQBpBSAyAuQAvArBXBeQAxA0AXAfQAmAwASAuQARAqAHA4QAEAnABBAQACBxgQBJQgWBkg8A5QhIBFh7ALQgLAXgPAUQggAqgxAaQgxAZg1AAQg2ABgygXQgygXgigpQgUgYgLgIQgUgPgRAHQAkBoAJBFQANBhgfBJQgdBDhBAqQhAArhJgBQhJgBhAgrQhAgsgbhEQAJBKgbBGQgcBIg6AsQg6AshNAFQhJAEg5giQgSAegdAYQg/A1hIgHQgqgEgtgbQgSgKgSgPQgEAQgHAPQgQAngfAVQghAXgqAAQgMAAgMgCg");
	this.shape_92.setTransform(-29.6679,233.8004);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#E488B7").s().p("ALYIGQgegEg3gRQjdhBjhguIkJg2QiXgjhpgxQg8gbhGgsQgogZhUg5Qg3glgbgXQgqgkgYgmQgig1gLhOQgHgyABhcQAAhAAJglQAOg3AjgbQAagUAogFIgCASQgHBGAYAxQAXAwBGA1QArAiAyAgQA1BGAgAmQBCBOA9A1QAsAmA7AqQAjAZBJAvQBOAzApAYQBDAoA5AbQBKAiBtAkIC8A6QBtAjBUAoIgRABQgQAAgRgDg");
	this.shape_93.setTransform(-149.5392,277.5012);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#FFC3C3").s().p("AF5ZjQgrgEgtgbQgigVgogmQhqhhg/hxIgFAFQgpAkg/ABQg6AAg3gcQg3gbhEhAIhyhpQg9gyhcgsQhUgohtgjIi8g6QhtgkhKgiQg5gbhDgoQgpgYhPgzQhJgvgjgZQg7gqgsgmQg9g2hChOQgggng1hFQgyghgrghQhGg1gXgwQgYgxAHhGIACgSQADgSAFgRIgEABQAJgZALgXQAeg+AtgtIAGgGQA2gVAtgYQCvheCsjQQAzg+BKhkQAPgHAPgDIgthnQg9iPhKiCIgzhYQgcg0gQgoQgqhwAWhYQANg1AkgrQAjgsAygWQAxgXA4ACQA4ACAwAaQA2AeAtBAQAdApApBSICrFbQAgBCASAgQAeA1AeAnIAtA2QAaAfANAaQAeA4AEBXQACAtgDBXQAQAKAOAGQAWAKAhAJIA6ANQB/AhCYBhQA+ApA8AuQBFg1CPABQBRACApgBQBFgCAwgOQAXgHAsgSQAogPAdgBQATgBAsAGQAoAGAXgEQASgDAUgJQAMgGAYgOIB8hGQBBglAngPQA8gXAzAEQAqADAoAVQAegkApgYQBMgrBbAKQBcALA/A7QAaAYAdApIAyBGQAmA0B7B3QBqBoAsBKQAeAzAWBEQARAyASBMQAUBZAHA9QAKBTgKBEQgMBPgmBAQgqBGhBAiIgPAHIACAEQAmBygVBVQgPA+gvAxQgvAwg+ARQg+AShBgRQhBgRgugtQAFBtgJA+QgOBdgxA5QgpAwg/AUQg/ATg+gNQg9gOgygrQgygqgZg6Qg+BNhuAGQhvAFhGhHIgLgMIAAANQABAygFAcQgOBMg8A0Qg4Avg/AAIgQgBg");
	this.shape_94.setTransform(-15.0226,223.6323);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#E488B7").s().p("AvdFXQhHgOgqgpQhFhCgBiUQgBiLAriGQAghkA1gzQASAQAZAIIAFACIAEAHQARAdAkAXQAWANAuAUIHYDCQB3AwA/AWQBlAjBWAQQBIANC6ALQCmAJBcAXIBJAVQAwAPAZAGQBKASBdACQA8ACBtgFQB0gFBagIQgEAOgIANQgTAkgjAVQgfATgrAJQgfAHgwAEQluAjmQhAQh3gSgtgDQg6gDhJAHQgxAEhTAMQkDAmgxAGQivAXiGAFIgkABQg5AAgogIg");
	this.shape_95.setTransform(-84.3503,259.6096);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#FFC3C3").s().p("AVZVlQg1gXgmgqQgVgZgLgMQgVgUgUgEQgQgDgXAFIgnALQhHAQhGgtQhBgpghhIQgcg9gHhTQgEgkABg1QggASgkANQg7AVhpAOQgrAGg0AEQhbAIhzAFQhtAFg8gCQhegChIgSQgagGgvgPIhJgVQhcgXimgJQi6gLhKgNQhVgQhmgjQg/gWh2gxInYjCQgugUgXgNQgkgXgQgdIgEgHIgGgCQgYgIgTgQQgSgPgOgWQgdguAJgxQADgQAIgTQAzgYAsgaQC/hyBYioIAOgcIADgaQgIgdgEgiIgLikQgCglgJgVQgGgQgOgUIgZgiQgggugKg4QgLg5ANg2QANg3AlgtQAigqAvgYIgRgiQgjhHgOghQg0iCAXhfQAShMBAg1QA/g1BOgEQA0gCA1ATQAxARAtAiQBHA1BIBpQB0CnBMDIQBIC/AfDTQAEAaADANQAGAVAJAPQAYAiAzAJQAuAJBNgRQBcgTAhAAQAzAAAwAWQAwAWAhAmIAOASQAegbAkgPQAtgTBRgGQBkgIAegHQALgCA3gQQApgLAbgCQAmgDA1ANIBaAXQA0AMBDADQArABBOgCIEqgGQBNgBAnABQBAACAyAKQCBAZBIBQQA7BBAHBeQAHBdgwBKQgxBJhYAfQhZAfhUgcQClCcBMBbQB7CSA0CQQAwCDgECLQgECbhJBYQgkArg0AYQg1AZg4ABIgEAAQg2AAgygXg");
	this.shape_96.setTransform(-19.3073,181.2125);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_38},{t:this.shape_37}]}).to({state:[{t:this.shape_39},{t:this.shape_37}]},4).to({state:[{t:this.shape_41},{t:this.shape_40}]},4).to({state:[{t:this.shape_43},{t:this.shape_42}]},6).to({state:[{t:this.shape_45},{t:this.shape_44}]},6).to({state:[{t:this.shape_47},{t:this.shape_46}]},4).to({state:[{t:this.shape_49},{t:this.shape_48}]},5).to({state:[{t:this.shape_51},{t:this.shape_50}]},3).to({state:[{t:this.shape_53},{t:this.shape_52}]},4).to({state:[{t:this.shape_55},{t:this.shape_54}]},4).to({state:[{t:this.shape_57},{t:this.shape_56}]},4).to({state:[{t:this.shape_59},{t:this.shape_58}]},4).to({state:[{t:this.shape_61},{t:this.shape_60}]},6).to({state:[{t:this.shape_63},{t:this.shape_62}]},4).to({state:[{t:this.shape_65},{t:this.shape_64}]},2).to({state:[{t:this.shape_67},{t:this.shape_66}]},4).to({state:[{t:this.shape_69},{t:this.shape_68,p:{y:242.425}}]},6).to({state:[{t:this.shape_70},{t:this.shape_68,p:{y:236.075}}]},6).to({state:[{t:this.shape_71},{t:this.shape_68,p:{y:242.425}}]},2).to({state:[{t:this.shape_73},{t:this.shape_72}]},4).to({state:[{t:this.shape_75},{t:this.shape_74}]},2).to({state:[{t:this.shape_77},{t:this.shape_76}]},4).to({state:[{t:this.shape_79},{t:this.shape_78}]},6).to({state:[{t:this.shape_81},{t:this.shape_80}]},4).to({state:[{t:this.shape_83},{t:this.shape_82}]},6).to({state:[{t:this.shape_85},{t:this.shape_84}]},4).to({state:[{t:this.shape_87},{t:this.shape_86}]},4).to({state:[{t:this.shape_89},{t:this.shape_88}]},4).to({state:[{t:this.shape_91},{t:this.shape_90}]},4).to({state:[{t:this.shape_92},{t:this.shape_90}]},4).to({state:[{t:this.shape_94},{t:this.shape_93}]},4).to({state:[{t:this.shape_96},{t:this.shape_95}]},8).wait(3));

	// lipbottom
	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#E488B7").s().p("At5G4QhCgUg1g2QgygygchFQgwh0ARijQAGhFAUgoQAUgpA7g2QBmhcBageQA1gRBIgEICAgCQBKgBAXABQA2ADAoANQAZAJAWAOQCfgTCRAQQBIALAkAEQBAAIAugDQAegCA3gJQA5gJAbgCQAmgDBbAGQBTAGAugGQA8gIBrgqQBwgsA3gJQAqgHAkAGQAqAIAYAbIAJALQAVAggHAuQgIAzgkAkQgfAegyAWQgeANhAATQmYB7kxCfIg+AfQgjASgcAKIg+AUQgmAMgWAJQgiAOguAeIhMAyQh6BIinAaQhgAPh9ABQgrAAgvgBIgEgBIAHARIgDAAQgmAAglgMg");
	this.shape_97.setTransform(-69.3047,334.1317);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#FFC3C3").s().p("AqJdqIh/hNQh5hShqiIQhUhshYigQgvhWgbhBQgjhUgNhLQgVh0AViOQAQhoAuiXQAbhZAIgmQAPhJgFg6QgEgrgRgzQgKgegag9Il5t8IgHgRIAEABQAvABArAAQB9gCBggOQCngaB6hIIBMgyQAugeAigOQAWgJAngMIA+gUQAcgKAjgSIA+gfQExigGXh7QBAgTAegNQAygWAfgeQAkgkAIgzQAHgugVggQAVgPAPgSQAPgSAgg7QAcgzAagWQAdgYAtgKQAhgIAzgBQBVgDA7APQBMASApAyQAjArANBLQAHArAGBZQAzADA0AnQAiAaAzA4IByB9QBRBZAmA2QA7BUAUBPQANAxADBSQAEBoAEAcQALBcA2CJQBJC6AMAnQArCPAECyQADCIgVDAQgQCSgbBaQgmB+hJBNQgjAlg0AjQggAWhBAlQhdA2g1AWQhUAjhJABQgjCFgZBEQgpBsg3BLQhBBZhcAwQhlA0higQQgRBXhABEQhABEhWAWIg7ANQgiAJgVAOQgIAFgIAIIjuABQiQABhIADQh4ADhgAKIhCAIIgNgIg");
	this.shape_98.setTransform(11.9688,461.7441);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#E488B7").s().p("As0OJQiGiFgXiyQgOhuAhhnQAjhsBNhGQAygsBOgjQAqgUBkgjQHKijFHjPQGNj7DplHQA4hPAegdQAcgcAdgPQglB0hAB9Qg+B6h+DGQmQJxmxJQIAAABIgaAVQgwAkhAAkQgsAYhLAjQhKAjgtASQhDAbg5ANIgEABIARAkQhpgnhYhXg");
	this.shape_99.setTransform(-31.6835,458.6625);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#FFC3C3").s().p("EAAZAmOIqbgEIhZgxQh9hNhwiBQhahphficQgzhTgeg/QgnhTgRhKQgahzAOiPQALhoAniZQAWhbAGgmQAMhJgIg6QgGgrgTgyQgMgegcg7IkhpYIgRgjIAFgBQA5gOBDgZQAtgTBKgiQBLgkAsgYQBAgjAwglIAagVIAAAAQGypQGQpzQB+jGA+h5QBAh+AkhzQARg1ALgyQARhLALgdQAWg3AogXQAOgIAigMQAggLAPgKQAPgMATgYQAYgiAGgGQAeghAtgLQAtgLApAOQAwAQAoAxQAaAgAjBAIFxKlQBDB8AeA9QA0BoAfBYQAxCLAbC2QAOBeAPCpQAbAtANAtQAPAwAHBRQAKBoAEAcQAQBcA9CGQBSC1AOAnQAxCNAMCyQAKCIgMDBQgJCSgWBbQggCAhGBRQghAmgyAlQgeAXhAApQhbA6gzAZQhSAnhJAEQgdCHgWBFQgjBugzBNQg9BdhaA0QhiA5hjgMQgNBYg9BHQg8BHhVAaIg7AQQghAKgVAPQgQAMgRAYIgLAOIgzAAIgpAAg");
	this.shape_100.setTransform(62.9274,555.1485);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#E488B7").s().p("ApKT/QhegShLguQhSgzgqhLQglhEgNhuQgWjOBQiGQBKh7CyhTQA2gZBiglQBugpAsgTQCHg7CVhmQBnhICdh/QBThFAygsQBHg/A1g6QCHiVBfjGQBYi2AxjWQAPhAAIgaQAPgxAXggQAIgNAKgLQgEFbh2ESQg6CIiCDFQipEDglBCQgxBVhNCjQg7B8glBJIgcA2IgMAWQhEB7hIBbIgcAjQgUBLgWApQgiBDhNBNQgsAshZBVIgrAtQgaAYgYANQgrAWhBgBQgBATADATQgwgDgpgIg");
	this.shape_101.setTransform(-8.7373,483.5);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#FFC3C3").s().p("EgCXAqtQgOgIhWg/QgvgihSglIiHg9QiChDh6h6QhhhhhqiVQg5hPgjg9QgthPgXhJQgihxAEiQQAChoAcicQAQhcAEgmQAGhKgNg5QgJgqgXgxQgOgcggg6Ik7ojQhngggng8QgRgbgGggQgDgSACgTQBBABArgWQAYgNAagYIArgtQBZhUAsgsQBNhNAihDQAWgqAUhKIAdgjQBIhbBEh7IAMgWIAcg2QAlhJA7h8QBNijAxhWQAlhDCpkCQCCjGA6iHQB2kSAElbIAAgrQAAhUAHgnQALhEAmglQAsgrBWgIQBVgIA/AcQArAUAmAqQAeAgAgAzQAoBBBTCrQBKCZA3BPQAbAnAuA4IBMBcQDTEICLFzQBTDgBCEgQAwAsAdAfQBFBNAeBMQASAvANBRQARBmAHAcQAXBaBGCBQBfCvARAmQA8CIAZCyQATCGADDCQACCSgQBcQgWCChABWQgeAogvAqQgdAZg8AtQhWBBgyAcQhPAthIAKQgTCIgRBGQgbBxgtBRQg2BghWA8QheA/hjgEQgGBZg4BLQg3BLhTAhIg5ATQghANgSARQgQANgQAZIgbAqQgcAogpAbQgpAbgwAIQgSADgkAEQgfAFgUAKQgRAJggAdQgdAcgUAJQgRAHgUAAQggAAgmgUg");
	this.shape_102.setTransform(108.9945,597.4313);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#FFC3C3").s().p("EAAJApjIiMgvQiIg0iHhsQhshWh5iJQhBhIgog5Qg2hKgfhGQguhtgLiPQgKhoALidQAGheAAgmQgChLgTg3QgNgpgcguQgRgagng2Ilzn9QhrgWgsg3QgVgagIgeQghABgegBQgLAGgNAEQgzASgwgOIgLgDQgWgIgegUQghgXgSgKIAAgBIghgRQAcgRAbgdQAOgPAtg2QBYhoCRiJQCliZBPhPQBWhWA+hHQBlh2BGh0QASgfAJgMQARgWARgNIAGgDIAAgBQA1hqAuhYIgFANIAhhRQAehGCMkTIAUgoQBci4Aoh/QBXkdghlZIgFgsQgJhTACgoQAEhEAjgpQAngwBUgQQBUgSBBAVQAtAPArAmQAgAcAmAwQAuA8BlChQBaCQBABJQAeAkA0AyIBWBUQDuDvCyFiQBrDWBhEYQA1AmAfAcQBNBFAmBIQAXAtAWBPQAcBkAJAaQAhBYBTB4QByClAVAjQBKCBAsCuQAhCEAYDAQASCRgGBdQgJCEg1BcQgaArgqAvQgaAcg3AzQhPBKguAhQhKA2hHARQgECJgIBIQgQBzgkBWQgrBlhQBEQhVBKhkAGQADBZguBRQgvBQhPApIg3AaQgfARgQASQgOAPgOAaIgWAtQgVAlggAdQgwgIg9ACQhyAEhkAeIhJAYQgtAQgdAHQgcAIgtAFQgogSg1gRg");
	this.shape_103.setTransform(49.95,517.3774);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#E488B7").s().p("Ap8UiQgmgSgSgLQhGgqgvhMQgrhIgPhXQgYiOA2jAQAehrAqg8QAegqAxgoQAhgbA9gpQBfg/DAh6ICFhVQBLgvApgYQBAglA3gaIBcgnQA5gYAigSQA8gfBZg+IBGgyQAggmAagkQB3iiBJjPQBDi+AajaQAIhCAFgaQAKgyATgjQAHgOAJgLQAhFZhXEdQgoB/hbC4IgVAoQiMETgeBFIggBRIAEgNQguBYg1BqIAAABIgFADQgSANgRAWQgJAMgSAfQhGB0hlB2Qg9BHhWBWQhPBPilCZQiRCKhXBoQgtA2gOAPQgcAcgbASIgYgLg");
	this.shape_104.setTransform(-76.0936,415.2875);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#E488B7").s().p("ApKT/QhegShLguQhSgzgqhLQglhEgNhuQgWjOBQiGQBKh7CyhTQA2gaBigkQBugpAsgTQCHg7CVhmQBnhICdiAQBThEAygsQBHg/A1g7QCHiVBfjFQBYi2AxjWQAPhAAIgaQAPgxAXggQAIgNAKgLQgEFbh2ESQg6CIiCDFQipECglBDQgxBVhNCjQg7B8glBJIgcA2IgMAWQhEB7hIBbIgcAjQgUBLgWApQgiBDhNBNQgsAshZBVIgrAtQgaAYgYANQgrAWhBgBQgBAUADASQgwgDgpgIg");
	this.shape_105.setTransform(-104.1873,366.4);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#FFC3C3").s().p("EgF8ApaIiHg9QiChDh6h6QhhhhhqiVQg5hPgjg9QgthPgXhJQgihxAEiQQAChoAcicQAQhcAEgmQAGhKgNg5QgJgqgXgxQgOgcggg6Ik7oiQhnghgng8QgRgbgFggQgDgSABgTQBBABArgWQAYgNAagYIArgtQBZhUAsgsQBNhNAihDQAWgqAUhKIAdgjQBIhbBEh7IAMgWIAcg2QAlhJA7h8QBNijAxhWQAlhDCpkCQCCjGA6iHQB2kSAElbIAAgrQAAhUAHgnQALhEAmglQAsgrBWgIQBVgIA/AcQArAUAmAqQAeAgAgAzQAoBBBTCrQBKCZA3BPQAbAnAuA4IBMBcQDTEICLFzQBTDgBCEgQAxAsAcAfQBFBNAeBMQASAvANBRQARBmAHAcQAXBaBGCBQBfCvARAmQA8CIAZCyQATCGADDCQACCSgQBcQgWCChABWQgeAogvAqQgdAZg8AtQhWBBgyAcQhPAthIAKQgTCIgRBGQgbBxgtBRQg2BghWA8QheA/hjgEQgGBZg4BLQg1BJhPAgIgpAEQh2AOhVAsQgZAMg+AoQg3AjgiAPQhCAchzAJQiNALgrAHQgkgVgxgWg");
	this.shape_106.setTransform(13.5489,474.4024);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#E488B7").s().p("ApKS1QhegRhLgrQhSgxgqhHQglg/gNhnQgWjDBQh+QBKh0CyhOQA2gYBigiQBugnAsgSQCHg4CVhgQBnhDCdh4QBThBAygqQBHg7A1g3QCHiNBfi6QBYirAxjJQAPg+AIgXQAPguAXgfQAIgMAKgKQgEFHh2ECQg6B/iCC7QipDzglA+QgxBRhNCaQg7B0glBGIgcAyIgMAVQhEBzhIBWIgcAiQgUBGgWAnQgiA/hNBIQgsAphZBRIgrAqQgaAXgYAMQgrAUhBgBQgBATADARQgwgDgpgHg");
	this.shape_107.setTransform(-104.1873,336.75);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#FFC3C3").s().p("EgD3AnhQg6gBgZgBIAAAAIgygWIiHg6QiChAh6hyQhhhchqiMQg5hLgjg5QgthLgXhEQgihrAEiHQAChiAciTQAQhXAEgkQAGhGgNg1QgJgogXguQgOgaggg3Ik7oDQhngegng5QgRgagFgdQgDgRABgTQBBABArgUQAYgMAagXIArgqQBZhQAsgpQBNhIAig/QAWgoAUhGIAdghQBIhWBEh0IAMgUIAcgzQAlhFA7h0QBNiaAxhSQAlg+CpjzQCCi7A6h/QB2kDAElGIAAgpQAAhPAHglQALhAAmgiQAsgpBWgHQBVgIA/AaQArATAmAnQAeAeAgAxQAoA9BTChQBKCQA3BLQAbAkAuA1IBMBXQDTD4CLFeQBTDTBCEQQAxApAcAdQBFBIAeBJQASAsANBMQARBgAHAaQAXBVBGB6QBfClARAjQA8CBAZCnQATB/ADC2QACCKgQBXQgWB6hABRQgeAmgvAnQgdAYg8AqQhWA+gyAaQhPAqhIAKQgTCAgRBCQgbBqgtBNQg2BahWA4QheA8hjgEQgGBUg4BHQg3BGhTAfIg5ASQghANgSAPQgQAMgQAYIgbAoQgcAlgpAaIgHAEg");
	this.shape_108.setTransform(13.5489,437.7697);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#E488B7").s().p("Ap+SCQgBgWgFgVIgKgBQhRgSg6hFQg6hEgHhUIgDgoQgBgYgFgPQgEgMgIgSIgOgcQgSgpgChGQgEhhAXg8QAUg2AsgpQAegbAjgRIAAgBQAbgNAfgMQA3gVBkgdQBwgiAsgQQCJgwCZhYQBqg9CjhvQBWg8AzgmQBKg4A3gyQCOiEBnixQBfikA6jCQASg7AJgXQARgsAYgdQAJgLAKgKQgSE+iBD3QhBB6iJCwQi0DngoA8Qg1BMhTCSQhABwgpBAIgeAxIgNAUQhIBuhLBRIgfAfQgXBEgYAlQglA8hQBDIh6BkQgaAhgnAXQgZATgWAKQgsAShBgEQgCASACARIgOgBg");
	this.shape_109.setTransform(-29.9986,435.8);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#FFC3C3").s().p("EAAcAmsQgcgBhYADQhKACgsgFQg9gFhMgWQgbgIhsgjIgNgFIhvgzQh/hDh1h0QhdhfhkiMQg2hMggg5QgphKgUhEQgehpAKiEQAHhgAiiNQAUhUAFgjQAJhEgKg1QgHgmgVgvQgNgageg2IkjoCQhmgigkg6QgQgZgEgdQgCgRACgSQBBAEAsgTQAWgJAZgTQAngXAaggIB6hkQBQhDAlg8QAYgmAXhDIAfggQBLhQBJhvIANgTIAegxQAphBBAhvQBTiTA1hNQAog7C0jnQCJiwBBh6QCBj3ASk+IACgoQADhMAJgkQAOg+AnggQAugmBWgEQBWgEA9AdQAqAUAlAnQAcAeAeAxQAlA+BMCgQBDCPA1BMQAZAjAsA2IBIBYQDHD7B7FaQBKDRA2EMQAvAqAbAeQBBBIAbBIQAQAsAJBLQANBeAGAaQATBUBBB4QBXClAQAjQA2CAASCkQANB9gFCxQgECHgUBUQgcB2hDBMQgfAkgyAlQgeAWg+AnQhYA4gzAXQhQAnhJAGQgZB7gTBAQghBngwBJQg6BWhZAzQhfA3hkgJQgJBRg7BDQg6BDhVAbIg5APQgiALgTAOQgQAMgRAWIgdAmQgeAjgpAXQggARgjAHQgdgEghgBg");
	this.shape_110.setTransform(73.7352,539.6323);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#E488B7").s().p("AqJS4QhdgWhIgwQhQg1gnhLQgihDgIhsQgNjJBVh+QBPh0C1hJQA3gXBkgfQBwgjAsgRQCJgzCZhdQBqhBCjh2QBWg+AzgpQBKg7A3g1QCOiMBni7QBfitA6jOQASg+AJgYQARgvAYgfQAJgMAKgKQgSFRiBEFQhBCBiJC7Qi0DzgoA/Qg1BRhTCbQhAB2gpBFIgeAzIgNAVQhJB0hKBWIgfAhQgXBHgYAoQglA/hQBIQgtAohdBPIgtAqQgbAXgYALQgsAThBgEQgCATACASQgvgFgqgJg");
	this.shape_111.setTransform(-13.4608,432.675);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#FFC3C3").s().p("EgFgAmkQh3AEgfAAQhUAAhAgMQhFgMhXghIgYgKIgQgRQhdhjhkiVQg2hQggg8QgphPgUhIQgehvAKiLQAHhmAiiWQAUhYAFglQAJhIgKg4QgHgpgVgxQgNgbgeg6IkjogQhmgkgkg8QgQgbgEgfQgCgSACgTQBBAEAsgTQAYgLAbgXIAtgqQBdhPAtgnQBQhIAlg/QAYgoAXhHIAfghQBLhWBJh0IANgVIAegzQAphFBAh2QBTibA1hSQAog/C0jzQCJi7BBiBQCBkFASlRIACgqQADhRAJgmQAOhBAngiQAugoBWgEQBWgFA9AfQAqAVAlAqQAcAgAeAzQAlBCBMCpQBDCXA1BQQAZAmAsA5IBIBdQDHEJB7FuQBKDeA2EbQAvAsAbAgQBBBNAbBMQAQAuAJBPQANBkAGAbQATBYBBCBQBXCuAQAlQA2CIASCtQANCEgFC8QgECOgUBZQgcB9hDBQQgfAngyAmQgeAXg+AqQhYA7gzAZQhQAohJAHQgZCDgTBDQghBtgwBNQg6BbhZA2QhfA6hkgJQgJBWg7BHQg6BGhVAcIgoAMQk/hJmJANg");
	this.shape_112.setTransform(96.6352,532.7711);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#E488B7").s().p("AuAMwQh9iMgLivQgGhtAohiQAqhnBSg/QA1goBQgdQArgQBmgcQHUh/FVi0QGcjaD/kwQA9hIAggbQAegZAegNQgtBvhIB2QhGByiLC5Qm6JInYIkIAAABIgcASQgxAhhCAeQguAVhNAdQhMAdgvAPQhFAVg5AJIgEABIAOAkQhmgthShbg");
	this.shape_113.setTransform(-34.4954,399.875);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#FFC3C3").s().p("EgAuAkxQhYgGjtABQjOABh3gNQhdgKhBgXIgSgLQh3hUhniGQhThshVifQgshVgahBQghhTgMhJQgThzAYiKQAShlAxiTQAchYAJgkQARhHgEg5QgEgqgPgzQgKgegYg8Ij3pcIgOgkIAEgBQA5gJBFgVQAvgPBMgdQBNgdAugVQBCgeAxghIAcgSIAAgBQHZokG6pJQCKi5BGhyQBIh2AthvQAVgyAOgwQAWhJANgaQAZg1AqgUQAOgHAjgJQAggIAQgKQAQgKAVgWQAaggAHgGQAfgdAugIQAtgIApAQQAuAUAlAyQAXAhAgBCIFBKuQA7B+AaA+QAtBpAYBYQAoCMAPCzQAIBeADClQAYAvAKAsQAMAwACBQQACBmADAbQAJBbA0CGQBFC4AMAnQAoCNgBCvQAACFgYC8QgTCPgcBXQgpB7hLBKQgjAjg1AhQgfAUhDAkQhfAyg0AVQhVAhhJgBQgmCCgaBBQgqBpg5BJQhDBVhdAtQhmAxhigSQgSBVhCBBQhBBBhXAUIg7ALQgiAIgWANIgDACIg9gFg");
	this.shape_114.setTransform(49.8253,499.0694);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#E488B7").s().p("AroPuQhCgLg6gvQg1grgjhAQg4hngLilQgGhSATgtQAag/BRgmQArgUBugdQCqgsC7hgQCPhKC8h6QC3h5B9hmQCXh7BriAQAygiAsggQC0iEB+iOQBIhSAjhGQAIAGAHAIQg4B1hZCAQhABbiLCtIocKfQjJD7h3B3QjBDAjCBgQg/AggSAKQgrAbgVAhQgRAZgHAiIgGgBg");
	this.shape_115.setTransform(-15.913,428.225);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#FFC3C3").s().p("EgGnAogIgwgCIgrgTQiChBh5h1QhhhehqiPQg4hNgjg8QgshMgXhGQgihuAEiLQADhmAciWQAQhaAEglQAGhIgMg3QgJgogXgwQgNgcghg3Ikmn0Qg/gVgSgIQg2gZgbgkQgWgegJgsQgGghAAgwQAAgsAFgeIACgJQAHgiARgZQAVghArgaQASgKA/ggQDChgDBjAQB3h3DKj7IIcqgQCLitBAhbQBYiBA4h1IATgrIAehGIAPgeQgBgYgFgYIAOgTQAWgjAGgGQAagiAsgOQAsgOArAKQATAFASAJIAAgeQABg8ADglQAFg1AMgrQAPgxAZgnQAdgrAngaQAzghBMgGQA1gFBUAKQA8AIAlAIQA1AMAnATQAvAXAgAkQAjAnAKAuQBYgPBTAtQBUAtAjBSQAQAlAIAxQAFAfAEA7QAODMAFBmQAJCqAACIQAABlgNA/QgRBZgvA4QggAnguAYQguAXgzAEQgcACgdgFQA5CAAnCoQAUBaAbCiQAeAqAQApQATAuANBOQARBkAGAaQAWBYBGB7QBfCrARAkQA7CFAYCrQATCCACC8QACCOgQBZQgXB/g/BTQgfAngvAoQgcAYg9AtQhXA/gxAbQhPAshJAKQgTCFgQBDQgcBtguBQQg2BdhWA5QheA+hjgDQgGBWg5BJQgTAZgXAVQhiArg7AZQjEBPihAbQhsASiIADIgoAAQhPAAh/gEg");
	this.shape_116.setTransform(77.7664,517.4462);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#FFC3C3").s().p("EgIDAj1Qg2gBgqgGQgcgEg/gOQg6gMghgEQgXgChQgDQhAgDgngIQgcgHhBgYQgqgPgegIQhdhShPh0QhNhwhLihQgohXgWhBQgchUgIhJQgMhyAgiIQAXhiA6iOQAhhWALgjQAVhFgBg5QAAgogNg0QgIgegVg9Ii8oiQg6ghgQgNQgwgjgTgoQgQgiABgtQAAgiAKgvIAIgjQAFgUAHgQIADgJQAOgfAVgWQAbgcAxgSQATgGBEgTQBlgbBpgxQBxg0B2hNQBbg9CLhuQBJg5BVhHIKXolIAvgoQCHhxBFhCQBxhsBOhnQAPgTANgUIArg+IAVgaQADgYAAgYIASgRQAdgeAHgFQAggbAugFQAugGApASQAsAYAiAzQAVAiAcBCICLFbQAogsBAgWQBZgfBWAbIARAFQALADAIgCQALgCAMgKIASgVQAggmAtgXQAugWAxgCQAygCAvATQAvATAjAjQA9A/AbB9IASBoQALA/ALAnIAVBAQANAnADAaQAIA0gPA0QgPAzgiAoQghAngwAXQgxAXg0ACQgGBnhNBPQhMBQhnAKQgLBEgvA4IgDADQAABWgECDQAUAvAIAsQAJAxgDBOQgDBmABAbQAEBaArCHQA7C6AKAnQAfCOgLCtQgGCDglC5QgaCLgiBUQgvB4hPBEQgmAhg2AeQggARhFAgQhiAsg1ASQhXAbhJgFQgbBMgWA1IgxAtQiAB1i1B2Qg6AkhXA0IgBAAIAAABQhSAwhrA+Qg5AggcAOQgxAYgqAKQgmAKgxAEQgdACg7ABIg5ABIgpgBg");
	this.shape_117.setTransform(37.0992,468.7356);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#E488B7").s().p("Av/MVQhwhRgriMQgriMAtiCQAkhkBThTQBMhLBogzQBYgsB2ghQBJgUCPgeIEig9QBlgVA2gNQBUgVBDgXQAigMB7gxQBggnA+gQQAngLArgHQAdgUAagVQA3gYAygXQDLhdCYhxQBXhCAxg+QAGAHAFAJQhOBnhxBsQhFBCiIByIgvAnIqXIkQhVBHhIA5QiLBuhcA9Qh1BNhxA1QhpAwhmAbQhEATgTAGQgwASgbAcQgVAWgOAfIgEAJQgGAQgFAUQgqgRgmgcg");
	this.shape_118.setTransform(-47.4946,347.225);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#E488B7").s().p("AquTDQhhgWhMgxQhUg2gohMQgkhEgIhsQgNjMBbiAQBTh1C+hJQA5gXBpgfQB2gkAugQQCRg0CghdQBvhCCrh2QBag/A2gpQBOg7A6g2QCViNBti9QBkivA+jQQATg/AJgYQATgvAZggQAJgMALgKQgVFViIEIQhECCiRC8Qi+D2gqBAQg3BRhZCdQhDB3grBGIgfA0IgOAUQhNB2hPBWQgPASgRAQQgYBIgZAoQgoBAhUBIQgvAphiBQIgvAqQgdAWgZALQguAUhEgEQgDATADASQgygFgrgKg");
	this.shape_119.setTransform(-15.6316,459.325);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#FFC3C3").s().p("EgIpAp9IhXgrQiFhHh6h+QhhhkhoiXQg4hRghg9QgrhQgVhJQgfhwAMiNQAHhnAmiXQAUhaAGgmQAKhIgKg5QgIgpgWgyQgNgcgfg6IkvonQhrglglg9QgRgcgEgfQgCgSACgTQBFAEAugUQAZgLAcgWIAvgqQBihQAwgpQBUhHAnhAQAZgoAZhIQAQgQAQgSQBPhWBNh2IAOgUIAgg0QArhGBDh3QBZidA3hSQAqhAC+j2QCRi8BDiCQCJkIAVlVIACgqQAEhSAJgnQAPhCAqgiQAvgoBagEQBbgEA/AfQAsAVAnArIAJALIABgiQADgmAIgeQAVhGA7gxQA8gxBIgGQBJgGBDAmQBDAnAgBBQAaA2ADBQQABAWgFB2QgDBHALAqQAEASASAsQAPAnAEAXQAHAqgOBKQgNBIgOAhQgYA1gvAlIgXAQIAfAmQDQENB/FzQBMDgA3EfQAxAtAdAgQBEBOAbBNQARAvAKBQQANBlAGAbQATBZBDCDQBbCxAQAlQA4CKASCvQAOCFgHC+QgFCRgUBZQgeB/hHBRQgiAmgzAoQggAXhAApQhdA8g2AZQhVAohMAHQgaCFgVBEQgiBug0BNQgLARgMAPQg0gmhFgHQhHgIg/AeQgiAQgsAiIhJA8QgjAbg0AfIhaA1QhgA5hiBHIhLA2QgrAeglAQQgTAJgwASQgsAQgXAMIgxAcQgcARgWAHQgYAHgtABIgvABQh5AAh3gPg");
	this.shape_120.setTransform(98.9405,557.7066);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#E488B7").s().p("AuyM2Qh9iPgLi1QgHhvAohlQArhrBShAQARgNAUgMQBkhmCohJQBOgiB7gmIDMhAQDFhCDUhqQCxhYDTiBQBVg0A2gkQBKgzA5gvIBRhFQAwgpAmgXQAggUAggMQg4A+hBA2IgfAlQgkAogxAnQhEBvh7CmQj9FZkHFMQh1CTh2CRQhQBihSBiIgBABIgbASQgxAihDAfIg7AZIhAAaQhMAeguAPQhFAWg6AJIgEABIAOAlQhmguhRheg");
	this.shape_121.setTransform(-38.3454,420.725);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#FFC3C3").s().p("EgNoAk8Qh3hWhniKQhThvhVikQgshXgahCQghhWgMhLQgTh2AYiPQAShnAxiYQAchaAJglQARhJgEg7QgEgqgPg1QgKgfgYg9Ij3puIgOglIAEgBQA5gJBFgWQAvgPBMgeIBAgaIA7gZQBCgfAxgiIAcgSIAAgBQBShiBRhiQB2iRB1iTQEIlND9lZQB6imBEhvQAwgnAkgoIAfglQBCg2A3g+QB7iKBJi0QAag/ARg/QATgJAWgEQAtgIApARQAuAUAlA0QAXAiAgBDIFBLCQA7CCAaA/QAtBsAYBaQAoCQAPC5QAIBgADCqQAYAwAKAtQAMAyACBSQACBqADAbQAJBeA0CKQBFC8AMApQAoCRgBC0QAACJgYDBQgTCTgcBZQgpB/hLBMQgjAkg1AiQgfAVhDAkQhfA0g0AVQhVAihJgBQgmCGgaBDQgqBsg5BLQhDBYhdAuQhmAyhigSQgSBXhCBDQhBBDhXAVIg7ALIgBAAIteAJIhTg2g");
	this.shape_122.setTransform(40.9253,520.3333);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#FFC3C3").s().p("EgICAnHQiChBh5h1QhhhehqiPQg4hNgjg8QgshMgXhGQgihuAEiLQADhmAciWQAQhaAEglQAGhIgMg3QgJgogXgwQgNgcghg3IkmnzQg/gVgSgJQg2gZgbgkQgWgegJgsQgGghAAgwQAAgsAFgeIACgJQAHgiARgYQAVghArgbQASgKA/ggQDChgDBjAQB3h3DKj7IIcqgQCLitBAhbQBYiAA4h1IATgsIAehGIAPgdQgBgZgFgXIAOgUQAWgjAGgGQAagiAsgOQAsgOArAKQAxANArAsQAcAdAoA7ICADBIAHgzQAIguARhIIAbh2QAXhnAKggQAYhLAngtQAwg2BJgTQBKgSBEAZQBEAZArA+QAsA+ABBIQAAAXgFAsQgGAsAAAWQAAAVAEAdIAIAyQALBFABBhQABA4gBBvQACBmgBAUQgDBGgPAyQgSA+gpAuQgsAxg5ALIgDAgQA0BYAiBMQA7CDApCuQAUBaAbCiQAeAqAQApQATAuANBOQARBkAGAaQAWBYBGB8QBfCqARAkQA7CFAYCrQATCCACC8QACCOgQBZQgXB/g/BTQgfAngvAoQgcAYg9AtQhXA/gxAbQhPAshJAKQgTCFgQBDQgZBignBJQgXARgaAWIjRCtIgJAIQgmAIgmgBQgCAbgHAbQhGAug/AdQgxAWhSAcQhpAjgcALIj3BsQiTBAhsAMQgqAEhIAAIhbAAIhXgmg");
	this.shape_123.setTransform(59.9664,550.8066);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#E488B7").s().p("AvyHFQgUgggEguQgCgiAGgyQAKhTAThOQAMgzAOgjQASgsAaggQA/hKB7gYQAsgJA/gDIBrgEQBZgECfgUIExgmQCRgTBBgOQAhgIBZgZQBNgVAugIICTgUQBWgMA3gYQAggOAtgdIBLgvQBBgmA1gIIgHADQg6AWhcA9Qi7B9imBbQjABqi2BHQhtApjjBJQjhBIhxAsQh6AxhKA2QgdAVgXAXIgJAEQgdANgUAFIgnAJQgYAGgOAHQgqAYgQA4IgCALQgbgRgRgag");
	this.shape_124.setTransform(-81.4972,335.225);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#FFC3C3").s().p("EgKRAhWIh/hOQh5hShqiHQhVhthXigQgvhWgbhAQgjhUgOhLQgVh1AWiOQAPhnAuiXQAbhaAJgmQAPhIgGg6QgEgrgRgzQgKgegZg9IlNsSQgWgMgUgUQgogmgVg2QgGgSgGgUIgjgtQgvg/gQgvQgJgcgCglQgCgYAAgrQAAg5AHggIACgLQAQg4AqgYQAOgHAYgGIAngJQAUgFAdgNIAJgEQAXgXAdgVQBKg2B6gxQBxgsDhhIQDkhJBtgqQC2hHDAhqQCmhbC6h9QBcg9A6gWIAHgDQBUgeBEAXQBmAkA6CaQAcBKAPBXIAggCQBVgCA6AOQAPAEANAFIAKgWIB9kAQAfg/ATgeQAggyAlgdQAmgdAvgLQAwgLAuAJQAQADAmALQAiAKAUACQAVACAsgEQArgDAVACQA9AGAzAtQAwAqAYA+QAVA2AFBFQAEA0gFBLIgIB/QgDBIAJA2QBNAUA1BCQA1BCACBPQACA9gcBIQgPAnguBVQhWClhDCjQgfBLgSAiQggA6goAiIgJAHQARBBAfBOQBJC6AMAoQArCOADCzQADCIgVDAQgQCSgaBZQgmB+hKBOQgiAkg1AkQgfAVhBAmQheA2g0AWQhUAjhJABQgkCFgZBDQgoBtg3BLQhBBZhdAwQhkA0hjgQQgRBXhABEQhABEhWAWIg7ANQgiAIgVAOQgQALgTAXIgGAHIqVABIgsABIgSgLg");
	this.shape_125.setTransform(2.6017,486.8147);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#E488B7").s().p("AokRqQhhgWhMgxQhUg2gohMQgkhEgIhsQgIiAAhhiQAPhFA9hCQAkgqA0gkQAngdAwgcICwhhQEMiWDcjSIB+h8QBMhLA2gsIBbhGQA4grAggdQA1gxBXhnQA6hDAdgoQAug+Aag4IAchBQAQgoAPgYQAVggAagUQgjBmgsBwQg2CKh4ETQgxBxgbA4IgDAIQgrBZgpBEQgoBChMBoIhWB2IgiAwQhDBmh7DTQhyC2hyBhIhhBMQg7AtggAmQgsAxgSA6QgQAzAJAtIgTgBQgDATADASQgygEgrgKg");
	this.shape_126.setTransform(-34.444,427.55);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#FFC3C3").s().p("EgH2AogIiKhCQiFhIh6h9QhhhlhoiXQg4hQghg+QgrhQgVhIQgfhxAMiNQAHhmAmiYQAUhZAGgmQAKhIgKg5QgIgqgWgxQgNgcgfg6IkvooQhrglglg9QgRgbgEggQgCgSACgTIATABQgJgtARgzQASg5AsgyQAgglA7gtIBhhNQBxhgBzi2QB8jUBDhlIAhgxIBWh3QBMhoAohCQAphDArhZIAEgIQAag4AyhyQB3kSA3iLQArhvAjhnQAmhuAbhkQAQg4ALgZQATgsAdgXQArgiA+AGQAdADAbALQAQgsAggZQAvgpBagEQBbgEA/AfQAsAWAnAqQAdAhAfA0QAnBCBPCsQBGCZA2BRQAaAnAuA5IBLBfQDQEMB/F0QBMDfA3EfQAxAtAdAhQBEBOAbBMQARAwAKBPQANBmAGAbQATBaBDCBQBbCyAQAlQA4CJASCwQAOCFgHC+QgFCQgUBaQgeB+hHBRQgiAngzAnQggAXhAApQhdA8g2AaQhVAohMAHQgaCEgVBEQgiBug0BNQg9BchcA3QhlA6hpgJQgHA9ghA2QgWAFgXAJQgqAPhIAlQh9BAg+AdQhqAwhZAaQhPAXh6AVQiIAVhEANIg3ALQgngYg2gag");
	this.shape_127.setTransform(93.9405,528.6771);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#E488B7").s().p("AqwQRQhegghGg5QhOg+gfhQQgdhHAEhuQAGh/ArheQAWhCBEg8QApgmA3geQApgZAzgXIC6hOQEah3Dyi6ICLhtQBThDA6gmIBig8QA8gkAkgaQA6gqBhhdQBBg9AhglQA0g4Agg1IAjg+QAUgmASgXQAYgdAcgSQguBjg3BqQhFCEiUEEQg+BsggA1IgEAHQg1BUgwA+QgvA+hWBeIhiBuIgnAsQhOBdiQDFQiGCph7BUIhpBBQg/AogkAgQgxAugYA3QgWAxAEAuIgTgDQgFATABASQgwgKgrgPg");
	this.shape_128.setTransform(-30.3742,407.6);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#FFC3C3").s().p("EgRJAkFQhVhuhXiiQgwhWgahBQgjhUgMhKQgThzAbiLQAShlA2iTQAdhXALgkQARhHgEg6QgDgqgRg0QgKgdgYg9IjypFQhmgwgfhAQgOgeAAggQgBgRAEgSIAUACQgFguAWgwQAYg3AxguQAkghBAgnIBohBQB8hUCFipQCSjFBNhdIAngtIBihtQBXhgAug9QAxg/A0hTIAEgHQAhg2A9hrQCUkEBGiFQA3hpAuhjQAxhqAmhgQAVg2ANgXQAXgqAggUQAugdA9ANQAdAGAZAOQAVgqAigWQA0gkBbAGQBbAGA7AmQApAaAiAuQAaAkAZA3QAgBGA7CzQA1CgAuBWQAWApAnA/IBABmQCyEhBXF/QA0DmAYEjQArAyAZAkQA8BVATBPQAMAwAABRQACBlAEAcQAJBbA0CJQBIC6AMAnQApCOgBCxQAACGgbC7QgVCQgeBXQgrB6hQBJQglAjg4AhQghAUhEAiQhjAyg5ATQhYAfhNgCQgoCCgcBBQguBqg7BHQhIBVhhAsQhqAvhngUQgIAfgNAbQg/AIhLAcIhMAeQgtAQgiAHQgaAFgiACIg8ABIoAAEQhOAAgfgDIhJgJQgrgFgeACQg5AEgxAdQh5hUhoiGg");
	this.shape_129.setTransform(79.9936,510.6066);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#FFC3C3").s().p("EgGlAoKIiEgOQhOgHg2AFIgSACQhkhBhchfQhhhlhoiXQg4hQghg+QgrhQgVhIQgfhxAMiNQAHhmAmiYQAUhZAGgmQAKhIgKg5QgIgqgWgxQgNgcgfg6IkvooQhrglglg9QgRgbgEggQgCgSACgTIATABQgJgtARgzQASg6AsgxQAgglA7gtIBhhNQBxhgBzi2QB8jUBDhlIAhgwIBWh4QBMhoAohCQAphDArhZIAEgIQAag4AyhyQB3kSA3iLQArhvAjhnQAmhuAbhkQAQg4ALgZQATgsAdgXQArgiA+AGQAdAEAbAKQAQgrAggaQAvgpBagEQBbgEA/AfQAsAWAnAqQAdAhAfA0QAnBCBPCsQBGCZA2BRQAaAnAuA5IBLBfQDQEMB/F0QBMDfA3EfQAxAtAdAhQBEBOAbBMQARAwAKBPQANBmAGAbQATBaBDCBQBbCyAQAlQA4CJASCwQAOCFgHC+QgFCQgUBaQgeB+hHBRQgiAngzAnQggAXhAApQhdA8g2AaQhVAohMAHQgaCEgVBEQgiBug0BNQg9BchcA3QhlA6hpgJQgKBXg+BHQgQAUgTAPQgggTgkgJQhCgQhVATQgrAKhpAlQhjAihNATQiSAjiWAAQg1AAg2gFg");
	this.shape_130.setTransform(93.9405,521.9512);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#E488B7").s().p("AokRqQhhgWhMgxQhUg2gohMQgkhEgIhsQgIiAAhhiQAPhFA9hCQAkgrA0gjQAmgdAxgcICwhiQEMiVDcjSIB+h8QBMhLA2gsIBbhHQA4gqAggeQA1gvBXhoQA6hDAdgoQAug+Aag4IAchBQAQgoAPgYQAVggAagVQgjBngsBwQg2CKh4ETQgxBygbA4IgDAIQgrBYgpBEQgoBChMBoIhWB2IgiAwQhDBmh7DTQhyC2hyBgIhhBNQg7AtggAmQgsAxgSA6QgQAzAJAtIgTgBQgDAUADARQgygEgrgKg");
	this.shape_131.setTransform(-13.729,469.6);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#FFC3C3").s().p("EgENAp5QgOgIhYhCQgvgkhUgoIiKhDQiFhHh6h+QhhhkhoiXQg4hRghg9QgrhQgVhJQgfhwAMiNQAHhnAmiXQAUhaAGgmQAKhIgKg5QgIgpgWgyQgNgcgfg6IkvonQhrglglg9QgRgcgEgfQgCgSACgTIAUABQgKgtARgzQASg5AsgyQAgglA7guIBhhMQBxhhBzi2QB8jTBDhlIAigxIBVh3QBMhoAohCQAphEArhYIAEgIQAag4AyhyQB3kTA3iKQAshwAjhmQAlhvAbhjQAQg4ALgZQATgsAdgXQArgiA+AGQAdADAbALQAQgsAggaQAvgoBagEQBbgEA/AfQAsAVAnArQAdAgAfA1QAnBBBPCsQBGCaA2BQQAaAnAuA6IBLBeQDQENB/FzQBMDgA3EfQAxAtAdAgQBEBOAbBNQARAvAKBQQANBlAGAbQATBaBDCDQBbCwAQAlQA4CKASCvQAOCFgHC+QgFCRgUBZQgeB/hHBRQgiAmgzAoQggAXhAApQhdA8g2AZQhVAohMAHQgaCFgVBEQgiBug0BNQg9BchcA2QhlA7hpgJQgKBXg+BHQg9BHhYAcIg8ARQgkALgUAPQgRAMgSAYIgeApQgfAlgtAZQgsAZgzAFQgTACgmACQggAEgVAJQgSAIgjAbQggAagWAIQgQAFgRAAQglAAgpgXg");
	this.shape_132.setTransform(114.6405,576.8941);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#FFC3C3").s().p("EgD9AoEQhpgNg0gCIg8gBQgjgCgZgEQgcgGgrgRIhFgbQhLgZheACQhghHhWhlQhZhsheidQgzhUgcg/QgnhTgPhJQgXhzAViLQAOhlAviUQAahXAJglQAPhHgHg6QgEgpgUgzQgKgdgbg8IkJo5Qhpgtggg/QgQgcgCggQgBgSAEgTIATACQgGgsAUgyQAWg3AvgvQAigiA+gpIBmhFQB4hYB+isQCKjKBKhfIAkguIBehwQBThiAsg/QAthAAxhUIAEgJQAeg1A6htQCJkJBAiFQAzhsAphjQAthrAihhQATg3ANgYQAWgqAfgVQAsgeA9AKQAdAFAaANQATgqAhgYQAzgkBaACQBcADA8AjQArAZAjAtQAcAiAbA2QAiBEBDCxQA8CdAwBUQAYApAqA8IBEBjQC+EaBmF7QA9DjAkEhQAuAwAaAiQA/BTAWBOQANAwAFBQQAGBmAEAbQANBaA6CGQBPC3AOAmQAvCMAFCwQAGCFgUC8QgPCQgaBXQgmB8hMBLQgkAjg2AkQghAVhEAkQhgA1g3AVQhXAihNABQgjCBgaBDQgpBrg4BJQhEBWhgAvQhoAzhogQQgQBWhCBCQhCBChaAWIg9AMQgkAIgVAPIgPAKIjVAAQh4AAg8gFg");
	this.shape_133.setTransform(83.5994,535.342);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#E488B7").s().p("Ap8QrQhfgdhJg2QhQg7gihQQgghFgBhsQABh/AnhgQAThCBCg+QAngoA1gfQApgaAygaIC2hSQEWiBDpjBICHhyQBQhFA6gpIBeg/QA7gmAigbQA5grBdhhQA+g/AggmQAyg5Adg2IAhg/QATgnARgXQAWgeAbgSQgpBjgzBsQhACGiJEIQg6BtgeA2IgDAIQgyBVgtA/QgsA/hTBiIhdBwIglAtQhKBfiKDKQh9Cth3BXIhnBFQg9ApgjAjQgvAugWA3QgUAyAHAuIgUgDQgDAUAAARQgxgJgqgMg");
	this.shape_134.setTransform(-33.55,432);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#E488B7").s().p("Ap9QFQhfgchHg0QhRg5gihNQgghDgBhoQABh7AnhcQAUhABAg8QAogmA1geQApgZAygZIC3hQQEUh7Dri7ICGhtQBQhDA6gnIBeg9QA7glAjgaQA4gqBdhdQA+g9AggkQAyg3Aeg1IAgg8QATglAQgWQAXgdAcgSQgpBfg0BoQhACBiJD/Qg5BqgfAzIgDAIQgyBRgtA/QgsA7hTBfIhdBrIglAsQhKBdiKDCQh9Cmh4BVIhlBCQg/AngiAiQgvAtgWA1QgUAwAHAsIgUgCQgDASAAARQgwgIgsgMg");
	this.shape_135.setTransform(-52.7,425.6);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#FFC3C3").s().p("EgKUAmUIgBAAQhug8gIgFQiBhOhxiAQhZhoheiXQgzhRgcg9QgnhQgPhHQgXhuAViGQAOhiAviOQAahVAJgjQAPhFgHg3QgEgogUgxQgKgcgbg6IkJolQhpgrggg9QgQgbgCgfQgBgRAEgSIATADQgGgsAUgwQAWg2AvgsQAigiA+gnIBmhDQB4hUB+imQCKjDBKhcIAkgsIBehsQBThfAsg8QAtg+AxhRIAEgIQAeg0A6hpQCJj/BAiBQAzhoAphfQAthoAihdQATg1ANgXQAWgpAfgUQAsgdA9AKQAdAFAaAMQATgpAhgWQAzgjBaACQBcACA8AjQArAXAjAsQAcAhAbA0QAiBBBDCrQA8CYAwBRQAYAnAqA6IBEBgQC+EPBmFtQA9DbAkEXQAuAvAaAhQA/BPAWBLQANAvAFBNQAGBiAEAbQANBWA6CBQBPCxAOAkQAvCIAFCpQAGCBgUC1QgPCKgaBUQgmB4hMBIQgkAig2AjQghAUhEAjQhgAzg3AUQhXAhhNABQgjB9gaBAQgpBng4BGQhEBUhgAtQhoAxhogPQgQBShCBAQhCBAhaAVIg9ALQgkAIgVAOQgSAKgUAWIghAlIgJAIIhQABQlIAAlHg7g");
	this.shape_136.setTransform(64.4494,528.6366);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#E488B7").s().p("ApKT1QhegShLgtQhSgzgqhKQglhDgNhsQgWjMBQiFQBKh5CyhSQA2gaBigjQBugpAsgTQAqgSAsgWQALAFANACQAPACAPAAIADgCQAegVATgLQAvgdBFgaIAEgBIADgCIADgBQBZgdAsgPQBBgWARgEQAvgNAlgBQAZgBAZAEQA/geA4ghQBVg1ArgZQBMgtA7gUQAQgFAegIIgFAQQgjANgmAYQh4BJiFCVQhLBWiUCwQgyA3j3DtQi5CxhcCFQgjA0hDBpQg+Bag7AxIgQAOIgBgBgANXw0QAPhAAIgZQAPgwAXghQAIgMAKgLQgCDsg5DKIgDAAQguALg5AVQA0iDAiiSg");
	this.shape_137.setTransform(-127.0873,301.725);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#FFC3C3").s().p("EgEhApEIhHgEIhwgzQiChCh6h4QhihghqiTQg5hPgig8QgthOgXhIQgjhwAEiOQADhnAciaQAPhbAEgmQAGhJgMg4QgJgqgYgwQgNgcghg5Ik6ocQhogggmg7QgSgbgFggQgvgDgogGIAQgOQA7gxA9haQBDhoAjg0QBdiFC5ixQD4jtAyg3QCTiwBMhWQCFiWB3hJQAngYAjgNIAEgQIAkgKQA0gOAdgLQBhgjAhhEQAUgogHgtQgJgwgigXQgbgQgngBQgaAAgtAJIgTAEQAXgQAcgQIBqhAQBNgxAMgGQAzgcAsgIQA6gKA7AWQA6AWAnAuQAnAtAOA+QAOA9gOA8QgVBchTBJQhHA+hoAmQBeAFArAAQBMABA7gIQAhgFA3gJQAqgbAdgrQAig0AHg7QAHg8gWg5QgWg6gtgoQAlg4AKhCQALhEgUg+QgUg/gxguQgzgug+gMQgzgJhEAPQgoAIhOAWQgxAMhpAPQhkAOg0AOQA5jKADjsIAAgrQgBhSAHgnQAMhDAmgkQAsgrBWgIQBVgIA+AcQArAUAnApQAdAgAgAyQAoBBBTCpQBKCWA4BPQAbAmAuA3IBMBcQDSEECLFvQBUDdBCEdQAwArAdAgQBEBLAeBMQATAuAMBQQASBlAGAbQAXBaBGB/QBfCtARAlQA8CHAZCwQAUCEACDAQACCRgPBaQgXCBg/BUQgeAogwAqQgdAZg8AsQhWBAgxAcQhPAshJAKQgTCHgQBFQgcBwgtBQQg2BfhWA7QhdA+hkgEQgGBYg3BKQg3BKhTAhIg5ATQghANgTAQQgPANgQAZIgbAqQgYAhghAYQkqgHkmgNg");
	this.shape_138.setTransform(-13.6136,407.5385);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#E488B7").s().p("AokQfQhhgVhMguQhUgygohHQgkg/gIhmQgIh3AhhbQAPhAA9g+QAkgoA0ghQAmgbAxgbICwhaQDDhmCqiCQAogTAsgaQAkgWBOgzQBIgvAjgaQA7gqApgoQAhgfAzg6QA8hFAWgXQBiheArgyQAvg1AYgzIACgDQAug5Aag0IAcg9QAQgmAPgWQAVgeAagTQgjBfgsBpQg2CBh4EAQgxBqgbA1IgDAHQgrBTgpA/QgoA9hMBhIhWBvIgiAtQhDBeh7DGQhyCqhyBaIhhBHQg7ArggAiQgsAvgSA2QgQAvAJArIgTgBQgDARADARQgygEgrgJg");
	this.shape_139.setTransform(-72.279,406.525);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#FFC3C3").s().p("EgGPAmZQgXgEgjgHQgVgLgYgLIiKg+QiFhDh6h1QhhhdhoiNQg4hMghg5QgrhLgVhDQgfhpAMiEQAHhgAmiNQAUhTAGgkQAKhDgKg1QgIgngWguQgNgagfg3IkvoCQhrgjglg5QgRgZgEgeQgCgRACgRIAUABQgKgrARgvQASg1AsgvQAggiA7grIBhhHQBxhaBziqQB8jGBDheIAigtIBVhwQBMhhAog9QApg/ArhTIAEgHQAag1AyhqQB3kAA3iBQAshpAjhfQAlhnAbhdQAQg0ALgYQATgpAdgVQArggA+AGQAdACAbALQAQgpAggYQAvgmBagEQBbgEA/AdQAsAUAnAoQAdAeAfAxQAnA+BPCgQBGCPA2BMQAaAkAuA2IBLBYQDQD6B/FbQBMDRA3EMQAxAqAdAeQBEBJAbBHQARAsAKBLQANBeAGAaQATBUBDB4QBbCmAQAjQA4CAASCkQAOB8gHCxQgFCHgUBUQgeB2hHBLQgiAkgzAlQggAWhAAmQhdA4g2AYQhVAlhMAGQgaB8gVBAQgiBmg0BIQg9BWhcAzQhlA2hpgIQgKBRg+BDQg9BChYAaIg8AQQgkAKgUAPQgRALgSAWIgeAmIgPAOQiCgFiBgIQhBgEgdgBQg1gBgpAGQhQAKg3AjIgggEg");
	this.shape_140.setTransform(56.0905,500.4383);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#E488B7").s().p("AokRqQhhgWhMgxQhUg2gohMQgkhEgIhsQgIiAAhhiQAPhEA9hDQAkgqA0gkQAmgdAxgdICwhgQDDhtCqiNQAogUAsgbQAkgYBOg2QBIgzAjgcQA7gtApgqQAhgiAzg+QA8hJAWgZQBihlArg1QAvg6AYg2IACgDQAug+Aag4IAchBQAQgoAPgYQAVggAagUQgjBmgsBwQg2CKh4ESQgxBzgbA3IgDAIQgrBZgpBEQgoBBhMBoIhWB3IgiAwQhDBmh7DTQhyC2hyBhIhhBMQg7AuggAkQgsAzgSA5QgQAzAJAtIgTgBQgDATADASQgygEgrgKg");
	this.shape_141.setTransform(-46.779,430.15);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#FFC3C3").s().p("EgEiApSQhYgMgVgEQgXgEgjgIIgtgXIiKhCQiFhIh6h9QhhhlhoiXQg4hQghg+QgrhQgVhIQgfhxAMiNQAHhmAmiYQAUhZAGgmQAKhIgKg5QgIgqgWgxQgNgcgfg6IkvooQhrglglg9QgRgbgEggQgCgSACgTIAUABQgKgtARgzQASg5AsgyQAgglA7gtIBhhNQBxhgBzi2QB8jUBDhlIAigwIBVh4QBMhoAohCQAphDArhZIAEgIQAag4AyhyQB3kSA3iLQAshvAjhnQAlhuAbhkQAQg4ALgZQATgsAdgXQArgiA+AGQAdADAbALQAQgsAggZQAvgpBagEQBbgEA/AfQAsAWAnAqQAdAhAfA0QAnBCBPCsQBGCZA2BRQAaAnAuA5IBLBfQDQEMB/F0QBMDfA3EfQAxAtAdAhQBEBOAbBMQARAwAKBPQANBmAGAbQATBaBDCBQBbCyAQAlQA4CJASCwQAOCFgHC+QgFCQgUBaQgeB+hHBRQgiAngzAnQggAXhAApQhdA8g2AaQhVAohMAHQgaCEgVBEQgiBug0BNQg9BchcA3QhlA6hpgJQgKBXg+BHQgSAWgVARQhJAFhGAXQgtAPhGAeIiJA6QhNAhgsARQhDAYg6AMIh/ATIghAGIgKgBg");
	this.shape_142.setTransform(81.5905,531.3771);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#FFC3C3").s().p("EgLZAmFIgSgMIh9hQQh3hWhniLQhThvhVijQgshYgahCQghhVgMhLQgTh3AYiOQAShoAxiXQAchaAJgmQARhJgEg6QgEgrgPg0QgKgfgYg+Ij3puIgOglIAEAAQA5gJBFgXQAvgPBMgeIBAgZIA7gaQBCgfAxghIAcgTIAAgBQBShhBRhjQB2iRB1iTQEIlND9lYQB6inBEhvQAwgmAkgoIAfgmQBCg1A3g+QB7iKBJi1QAag+ARg/QATgJAWgEQAtgJApARQAuAVAlAzQAXAiAgBEIFBLCQA7CBAaA/QAtBtAYBaQAoCQAPC5QAIBgADCqQAYAwAKAtQAMAyACBSQACBpADAcQAJBdA0CKQBFC9AMAoQAoCSgBC0QAACIgYDCQgTCSgcBaQgpB+hLBMQgjAlg1AiQgfAUhDAlQhfA0g0AVQhVAihJgBQgmCFgaBEQgqBsg5BKQhDBYhdAvQhmAxhigSQgSBYhCBDQhBBChXAVIg7ALQgiAIgWANQgOAKgOARg");
	this.shape_143.setTransform(32.0253,477.8083);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#E488B7").s().p("Ap4PTQhggbhIgxQhQg4gjhHQgghBgBhkQAAh2AnhWQATg+BCg4QAmgkA2geQAogYAzgWIC1hNQDKhWCzh0QApgPAtgXQAmgSBRgtQBLgpAlgXQA9glAsgkQAkgdA2g1QBAg/AYgVQBohWAvgtQAygxAcgwIACgCQAxg2AegxIAgg6QATgjARgVQAWgcAcgRQgpBbg0BjQg/B7iIDyQg5BlgeAyIgEAHQgxBOgtA7QgsA5hTBZIhdBnIgkAqQhKBYiIC4Qh+Cfh3BQQgGAFhgA6Qg+AmgiAfQgvArgVAzQgUAuAGAqIgTgCQgEARACARQgygJgqgMg");
	this.shape_144.setTransform(-63.175,428.95);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#FFC3C3").s().p("EgIbAlPQgXgFgigKQgUgMgYgMIiEhGQiBhLhyh7QhahiheiSQgzhNgdg7QgmhMgQhEQgXhoAUiBQAOhdAviHQAahRAIgjQAPhAgHg1QgFgngTgvQgKgagcg3IkLoNQhogqghg6QgQgagBgdQgCgQAEgRIATACQgGgqAUgtQAVg0AvgrQAigfA+gmQBgg6AGgFQB3hQB/ifQCIi4BKhYIAkgqIBdhnQBThaAsg5QAtg7AxhOIAEgHQAegyA5hkQCIjzA/h7QA0hiAphcQAshiAhhZQAUgyAMgWQAWgnAfgTQAtgcA8AJQAdAFAaAMQATgnAhgVQAzgiBaADQBbADA9AgQAqAXAkApQAcAgAbAzQAjA+BDCjQA8CRAxBNQAYAmAqA3IBFBcQC+EEBnFcQA+DSAkEKQAuAsAbAgQA/BMAWBIQAOAtAFBJQAGBeAEAZQAOBTA6B7QBQCpANAjQAwCCAGChQAFB7gSCtQgPCDgaBRQgmByhLBFQgkAhg2AgQghAThDAhQhhAwg3AUQhXAehNACQgiB3gaA9QgpBig3BCQhEBRhfArQhpAuhngPQgQBPhCA8QhCA9hZATIg9AMQglAHgVANQgOAIgRAPQgjgHgmgCQhIgDhvASQikAcgUACQhQAHgoAFIglAGIhIgPg");
	this.shape_145.setTransform(54.4405,527.8163);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#E488B7").s().p("AnmLVQhagThHgtQhOgygohLQgjhCgMhtQgVjMBMiEQBGh5CqhSQAzgZBegkQBpgpApgSQApgTApgWQALAFANACQANADAPgBIACgCQAegVARgLQAsgdBCgaIAEgBIAEgCIACgBQBWgcApgQQA+gWAQgEQAtgNAjgBQAYgBAYAEQA8geA1ghQBRg1AqgaQBIgtA4gTIAsgOIgFAQQghANglAYQhxBJh/CWQhIBWiNCwQgvA3jtDtQivCwhYCFQgiA0g/BqQg7BZg4AxIgQAOIgBAAg");
	this.shape_146.setTransform(-127.3273,381.65);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#FFC3C3").s().p("AlBedIiBg9Qh8hCh0h4QhdhghliTQg3hPggg8QgrhOgWhIQghhwAEiOQAChnAbiaQAPhbADgmQAGhJgMg4QgIgqgXgwQgNgcgfg5IkrobQhjggglg7QgQgbgFggQgtgDgngGIAQgOQA4gxA7haQA/hpAig0QBYiFCwixQDtjtAvg3QCNiwBIhWQB/iWBxhJQAlgYAhgNIAFgQIAigKQAggJAXgIQAlAQAtAMQAzANCQAXIBUAOQglAVgqAQQBaAFAoAAQBEABA3gHQGXBbF9CrQAYBaAVBhQAvArAbAgQBBBLAdBMQARAuAMBQQARBlAGAbQAWBaBDB/QBaCuAQAlQA6CHAXCwQATCEACC/QACCRgPBaQgVCBg8BUQgdAogtAqQgcAZg5AsQhSBAgvAcQhMAshFAKQgSCHgQBFQgaBwgrBQQgzBfhSA7QhZA+hfgEQgGBYg1BKQg0BKhPAhIg2ATQggANgRAQQgPANgQAZIgZAqIgMAQIo6AWQgvACgjAEg");
	this.shape_147.setTransform(-11.9382,501.475);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#E488B7").s().p("AkOLvQhTgFhYhMQhehRgbhbQgVhHAOhnQArkxD+ktQAsg0A/hBQA3g5AjgaQAUgPAfgVIA0gjIBXhAQA1gmAmgUQBIgmB3gbQAwgKAgAAQAsABAcAXQARANAKATQgSAEgMAIQgaAPgZAtQgbAygTAvIgVA4IgTA5IgUASQhFBDguB0QgUAxgvCjQg+DVhuD9QgbBAgUAlIgDAGQgcAyggAjQgnAsgyAYQgwAYgwAAIgKAAg");
	this.shape_148.setTransform(-162.5711,420.0891);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#FFC3C3").s().p("AijfAIiBg9Qh8hCh0h5QhdhghliTQg3hOggg9QgrhOgWhIQghhwAEiNQAChnAbiaQAPhbADgmQAGhJgMg4QgIgqgXgxQgNgbgfg5IkooWIgUgLQg/gXgjgkQgZgOgSgIQgpgRhGgPQhegTgTgFQg+gRgtgfQgvgigUgtIADgGQAUglAchAQBuj9A9jVQAwikATgxQAuh0BGhDIAUgSIATg5IAVg4QASgvAcgyQAZgtAZgPQANgIARgEIALgCQALgCAWgBIAPgGQBJgeB+gjQDUg5CZgYQDJgfCqAMQA6AEAnALQA0APAhAdQAXAUARAgQA3AMB7AUIBUAOQglAVgqAQQBaAEAoABQBEAAA3gHQGXBcF9CrQAYBZAVBiQAvArAbAfQBBBMAdBLQARAvAMBPQARBlAGAcQAWBZBDCAQBaCuAQAkQA6CIAXCvQATCFACC+QACCRgPBbQgVCAg8BVQgdAogtAqQgcAYg5AtQhSBAgvAbQhMAthFAKQgSCGgQBFQgaBwgrBQQgzBfhSA7QhZA+hfgDQgGBXg1BLQg0BKhPAgIg2AUQggAMgRAQQgPAOgQAYIgZApQhCgbhcAAQhigBiRAiQjJAugiAGIgcgNg");
	this.shape_149.setTransform(15.5868,532.3704);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#FFC3C3").s().p("AF+e0QgxgEh1AEQhqAEg8gIIiYgeQhcgRg9ANIgXAGIgOgHQh8hCh0h4QhdhghliTQg3hPggg8QgrhOgWhIQghhwAEiOQAChnAbiaQAPhbADgmQAGhJgMg4QgIgqgXgwQgNgcgfg5IkooVIgUgLQg/gYgjgjQgZgOgSgIQgpgShGgOQhegUgTgFQg+gRgtgfQgvghgUgtIADgGQAUglAchAQBuj9A9jVQAwilATgwQAuh1BGhDIAUgSIATg4IAVg5QASgvAcgxQAZgtAZgQQANgHARgEIALgCQALgCAWgBIAPgHQBJgeB+giQDUg6CZgYQDJgfCqANQA6AEAnALQA0AOAhAeQAXAUARAfQA3AMB7AUIBUAPQglAUgqAQQBaAFAoAAQBEABA3gHQGXBbF9CrQAYBaAVBhQAvArAbAgQBBBLAdBMQARAuAMBQQARBlAGAbQAWBaBDB/QBaCuAQAlQA6CHAXCwQATCDACDAQACCRgPBaQgVCBg8BUQgdAogtAqQgcAZg5AsQhSBAgvAcQhMAshFAKQgSCHgQBFQgaBwgrBQQgzBfhSA7QhZA+hfgEQgGBYg1BKQg0BKhPAhIg2ATQggANgRAQQgPANgQAZIgZAqQgOATgQARQgqgMgvgDg");
	this.shape_150.setTransform(15.5868,531.3204);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#E488B7").s().p("AmkKaQhrgwgthFQgshEgEh4QgHjBBDi6QBDi7CAiRQA5hAA4goQA7grBCgVQBHgXBCAHIA3AIQAhAGAWAAQAegBAogKIBFgUIB9gbQBJgQAtgZQARgJBjhMIAEgDQgaCDg+CAQilCCiFCmQg3BDghA5IggA2QgTAjgOAVQgOAVgZAgIgoA0QgSAagQAbQgeAdgRAXQghArgtBcQgbA3gJAhQgOAyAKAoQALAqAmAiIgKAFQgpATgvACIgKABQhLAAhbgqg");
	this.shape_151.setTransform(-139.6628,399.2096);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#FFC3C3").s().p("EAEvAgLIh2gCQhGgCgvgKQgrgJhfglQhYgigzgHQhFgKhCATQggAKgbAOIgBAAQh8hCh0h5QhdhghliTQg2hOghg9QgrhOgWhIQghhwAEiNQADhnAaiaQAPhbAEgmQAGhJgMg4QgJgqgWgxQgNgbgfg5Ij8nEIgTgKIjIhjQhAgfgggbIgMgKQgmgjgLgpQgLgoAOgzQAJghAbg2QAthcAhgsQASgWAdgeQAQgbATgaIApg0QAYggAOgVQAOgUAUgjIAfg4QAig4A3hEQCFimCliBQA9iBAaiCQAOhFAEhFQADhDADgRQAGgvATgfQAZgrAygSQAzgTAvAQQAvAQAcAuQAcAtgFAxQA2glA5gJQBBgKAtAgQAuAfAMA/IAJgCIA3gRQAmAQAsALQAzANCQAYIBUAOQgkAVgqAQQBZAEApABQBEAAA2gHQGYBcF9CrQAXBZAWBiQAuArAbAfQBBBMAdBLQASAvAMBPQAQBlAGAcQAWBZBDCAQBbCuAQAkQA5CIAYCvQASCEADC/QACCRgPBbQgVCAg9BVQgdAogtAqQgbAYg6AtQhSBAgvAbQhLAthFAKQgSCGgQBFQgaBwgrBQQg0BfhSA7QhZA+hegDQgGBXg1BLQg0BKhQAgIg2AUQgfAMgSAQQgPAOgPAYIgaAqQgUAegcAXIgmgCg");
	this.shape_152.setTransform(8.8868,497.454);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#E488B7").s().p("AtbG7IgFAAQg2gCghgHQgxgLgdgdQglgkgIhDQgFgkAFhWQAHh8AEgcQANhUAqgxQAbghAtgZQAfgSA3gVQBPgeBOgXQFThnEbAgQBIAKAlAEQBAAIAugDQAdgBA3gJQA5gKAcgCQAmgCBbAGQBTAFAtgGQA9gHBqgqQBwgsA3gKQArgHAjAHQAqAIAYAaIAJAMQAVAggGAtQgIA0glAkQgfAegyAWQgdAMhAAUQmYB7kyCeIg9AgQgkASgcAKIg8AUQgoALgWAKQghAOguAeIhNAxQh5BIioAaQhmAQiJAAIhHgBg");
	this.shape_153.setTransform(-86.3857,316.2185);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#FFC3C3").s().p("AheeaQhBg1hugLQgcgCiqAAIh8ABQgagSgggUIh/hNQh5hShqiIQhUhshYigQgvhWgbhBQgjhUgNhLQgVh0AViOQAQhoAuiXQAbhZAIgmQAPhJgFg6QgEgrgRgzQgKgegag9ImAuMIAEAAQC2AFCBgUQCngaB6hIIBMgyQAugeAigOQAWgJAngMIA+gUQAcgKAjgSIA+gfQExigGXh7QBAgTAegNQAygWAfgeQAkgkAIgzQAHgugVggQAVgPAPgSQAPgSAgg7QAcgzAagWQAdgYAtgKQAhgIAzgBQBVgDA7APQBMASApAyQAjArANBLQAHArAGBZQAzADA0AnQAiAaAzA4IByB9QBRBZAmA2QA7BUAUBPQANAxADBSQAEBoAEAcQALBcA2CJQBJC6AMAnQArCPAECzQADCHgVDAQgQCSgbBaQgmB+hJBNQgjAlg0AjQggAWhBAlQhdA2g1AWQhUAjhJABQgjCFgZBEQgpBsg3BLQhBBZhcAwQhlA0higQQgRBXhABEQhABEhWAWIg7ANQgiAJgVAOQgRALgTAXIggAnQggAkgrAVQgZAMgaAHIgQgPg");
	this.shape_154.setTransform(-9.6312,450.0816);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_98},{t:this.shape_97}]}).to({state:[{t:this.shape_98},{t:this.shape_97}]},4).to({state:[{t:this.shape_100},{t:this.shape_99}]},4).to({state:[{t:this.shape_102},{t:this.shape_101}]},6).to({state:[{t:this.shape_104},{t:this.shape_103}]},6).to({state:[{t:this.shape_106},{t:this.shape_105}]},4).to({state:[{t:this.shape_108},{t:this.shape_107}]},5).to({state:[{t:this.shape_110},{t:this.shape_109}]},3).to({state:[{t:this.shape_112},{t:this.shape_111}]},4).to({state:[{t:this.shape_114},{t:this.shape_113}]},4).to({state:[{t:this.shape_116},{t:this.shape_115,p:{x:-15.913,y:428.225}}]},4).to({state:[{t:this.shape_118},{t:this.shape_117}]},4).to({state:[{t:this.shape_120},{t:this.shape_119}]},6).to({state:[{t:this.shape_122},{t:this.shape_121,p:{x:-38.3454,y:420.725}}]},4).to({state:[{t:this.shape_123},{t:this.shape_115,p:{x:-33.713,y:454.825}}]},2).to({state:[{t:this.shape_125},{t:this.shape_124}]},4).to({state:[{t:this.shape_127},{t:this.shape_126}]},6).to({state:[{t:this.shape_129},{t:this.shape_128}]},6).to({state:[{t:this.shape_130},{t:this.shape_126}]},2).to({state:[{t:this.shape_132},{t:this.shape_131}]},4).to({state:[{t:this.shape_134},{t:this.shape_133}]},2).to({state:[{t:this.shape_136},{t:this.shape_135}]},4).to({state:[{t:this.shape_138},{t:this.shape_137}]},6).to({state:[{t:this.shape_140},{t:this.shape_139}]},4).to({state:[{t:this.shape_142},{t:this.shape_141}]},6).to({state:[{t:this.shape_143},{t:this.shape_121,p:{x:-47.2454,y:376.275}}]},4).to({state:[{t:this.shape_145},{t:this.shape_144}]},4).to({state:[{t:this.shape_147},{t:this.shape_146}]},4).to({state:[{t:this.shape_149},{t:this.shape_148}]},4).to({state:[{t:this.shape_150},{t:this.shape_148}]},4).to({state:[{t:this.shape_152},{t:this.shape_151}]},4).to({state:[{t:this.shape_154},{t:this.shape_153}]},8).wait(3));

	// teeth
	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#FFFFFF").s().p("AwoG6QgOgKgNgRQgIgJgPgWQgcgqgPgaQgMgXgVgwQgag7gGgfQgFgeABgvIAChOIgCg3QgBghAFgXQAFgVAUgsQAQgjAMgOQAWgaAdgJQAWgIAjAAQBDgBAkAZQAPAKAOASQAIAIAQAYQAgAsAhAqQADgRAGgOQAOggAGgQIAIgbIAHgcQAJghAWghQAWghAYgRQAcgTAlgEQAjgDAiALQA8AUAzA9QAaAfATAlIABACQAHgeAYgfQAPgTAjghQA0gxAggVQAygjAvgHQARgDAXAAIAnAAIAvAAQAaABATAFQAmAKAvApQA5AxAuBAQAQAVALAUQAGgbAJgUQAbg4A7gfQAagOAbgFQAXgWAVgIQATgHAsgBIAlgBQAVAAAPADQAgAGAuAeQBLAzAtA6IAKANQgCgXACgNQACgOAIgWIAMgkIAFgbQADgQAFgKQAPgdAmgLQAWgHAugBQAmgBAVADQAgAEAVAPIASAPQALAJAJADQAMADAZgCQAaACAXASQAUAQAPAaQAYApAJA5QAHAsgCA9QgDBQgRA8QgFASgbBHQgNAigJAPQgPAagUAMQgXANgtAAQg3AAgXgUQgLgKgMgUQgPgbgFgHQgJgLgRgOIgdgXQgRgPgXgdIgPgTIAAABIAAAuQAAAbgFAUQgJAjgdAiQgSAWgnAiQghAcgUAHQgQAFgYgBIgpgCIg5ACQgiABgVgJQgMgFgTgNQgVgQgJgEQgLgGgggLQgcgJgOgKQgPgLgNgUQgIgMgMgYQgMgXgGgQIgBgDIgVgeIgHgMQgJAjgVAoQgNAagdAvQgbAugTAYQgdAjghASQgrAYg5gEQgxgDg2gXQghgOgZgPQgegSg3gqQgogegPgWQgQghgLgOIgIgKQgEAagGAQQgEAMgJARIgPAcIgVAtQgNAbgNAPQgXAcgnANQgjALgngEQgkgEgggPQghgRgXgaQgHgIgKgPIgCALQgJAzgXAlIgSAZIgRAZIgNAZQgIAQgGAJQgTAaghANQgeAMgkAAIgIAAQg7AAglgcg");
	this.shape_155.setTransform(1.4158,303.1688);

	this.timeline.addTween(cjs.Tween.get(this.shape_155).wait(139));

	// gums
	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#E98F8F").s().p("AxaGmQg6gEgjgJQgygNgegcQg2gygIh3IgBgmQgBhmAchMQAnhrBhhTQBZhMB4gpQBkgiCEgPQBRgICegFIS5goQBWgCAqACQBHAFA1ATQBcAiBbBhQBqBwA/CMQAsBhAABJQABAugPApQgRAsgfAdQgrAnhHALQguAIhVgDQqIgRqaAtImlAcQh4AGhqAAQhpAAhbgGg");
	this.shape_156.setTransform(17.2013,260.1375);

	this.timeline.addTween(cjs.Tween.get(this.shape_156).wait(139));

	// tounge
	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#FF6666").s().p("AqOOpQhOgChHg0QhCgwgnhMQgjhCgRhXQgMhBgHhiQgGhrAFhKQAHhjAchNQAjhdBQhfQA0g+BphjQChiYB9hnQCOh1B0hHQCmhkDAg6QC7g5DHgNQBRgFA3AHQBKAKAzAiQAyAhAeA4QAdA3gBA9QgCA8gfA3QggA2g0AfQgzAfhPAMIiMANQjtAVjRB0QhkA4h7BiQi2CRieCsQgZAbgOATQgUAagKAaQgfBOAwCNQAfBcAFAUQARBBgEAxQgHBYhIBAQhFA9hVAAIgGAAg");
	this.shape_157.setTransform(36.393,428.6797);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#FF6666").s().p("Ao4PwQiHgShMhMQhKhIgQh5QgOhoAeh4QApigBnivQBIh5CLi0QBFhbAwg5QBDhPA9g8IDDitQBzhnA7hXQAphBAVgfQAlg3AmgdQBEgyBbAIQBbAJA4A+IAdAjQARAUAPAKQAOAKAYAIIAoANQBfAkAwBqQAtBkgQBuQgNBdg3BpQghBAhOB1IkQGSQhmCXgmA1QhYB6hMBSQhfBphhBEQhwBPh6AkQheAchZAAQgmAAgkgFg");
	this.shape_158.setTransform(55.9754,435.6319);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#FF6666").s().p("ArHMuQhRgYgzhOQgxhKgEhaQgDhQAehZQAYhIAxhWQB+jZDajRQChibEKjFQBphPBDglQBkg4BcgNIBBgHQAngFAZgHQAWgGApgTQAqgUAVgGQBfgdBeA5QBeA6ARBiQALBAgYBHQgWA/guA6QgkAtg8A2QgjAfhGA8Qg1AwhOBOQh9B7g7BBIhdBrQg5BCgmAnQhHBJhgBPQhEA2hxBTQhJA1grAcQhCAqg6AaQhaAphLAAQgjAAgggJg");
	this.shape_159.setTransform(12.2404,428.1337);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#FF6666").s().p("AgKLMQhmgEhHgHQhegJhOgQQiVgeiMhCQgxgQgrgTQiAg4h1htQhxhrgphsQgZg+gIhUQgFgyAAhkQgBhaAEgvQAIhMAYg4QAdhGA+g6QA3g0BMgoQCnhWDigOQCrgKD0AgQEmAoDPBGQEIBaCvCaQBrBeB4CmQBFBfAbBMQAkBngfBSQgZBChCApQhAAohJgDQgSAAgRgDQgBAlgNAnQgaBPg/AyQg7AvhcAWQg/AOhpAGQiTAIiWAAQheAAhegDg");
	this.shape_160.setTransform(23.2331,351.0202);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#FF6666").s().p("ArbNqQgwgWgigqQgjgqgNgzQgRhFAYhWQAQg9AthYQCTkgC6jyQDFkBDpjEIBIg+QAqgkAbgfQAwg9AagbQAtgxAtgOQAggKA2ACQBFAEATgCQAbgDAwgPQAzgPAYgEQA+gIA8AYQA8AYAmAxQAmAxAJBAQAJBAgXA6QgpBjiDBHQglAThKAgQhNAhgjASQiIBIh/CPQhTBbh8C4IlYH4QguBEgdAhQguA0gyAXQgwAXg2AAIgCAAQg1AAgugWg");
	this.shape_161.setTransform(62.3678,392.3394);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#FF6666").s().p("AuQNAQg0ghgfg9Qgcg5gFhDQgDg6AMhGQAIgvAVhNQAVhMAQguQAWhDAagzQBNiXCgiAQB8hkDDhiQCyhbEZh0QA2gWAZgNQAqgVAdgZQAZgXAngxQAog2AWgUQA4g2BPgRQBQgSBIAcQBJAcAuBEQAtBGgFBMQA+AMAyAqQAxAqAWA7QAVA7gKBBQgLBAgoAxQggAng5AjQgTALhVAsQiwBajrC6QhCA0iBBpQhzBdhRA7Qj4C0kVB+QhqAwhRAMQgaAEgZAAQhKAAg3gkg");
	this.shape_162.setTransform(56.4577,343.3019);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#FF6666").s().p("AtTOyQhngChXg0Qhbg2glhZQgYg4gChKQgBg4ALhPQAxlFCYjPQA7hRBchUQA5g1BzhdQBdhLAtghQBPg6BGgjQApgVC/hJQCPg3BMg7IBOhDQAvgpAjgTQBng6B9AlQB8AkA4BoQAqgQA8gzQBCg6AggRQA0gbA8AAQA9AAAzAbQA0AcAiAyQAiAzAFA6QAHBBgdBEQgbA+gzA0QgqAthAAqQgoAahPAtIlRC9QiWBVhJAuQh5BNhVBNQhfBYjBD7QivDiiABhQhUBAhYAjQhcAlhaAAIgJAAg");
	this.shape_163.setTransform(86.8009,396.5549);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#FF6666").s().p("AquP2QhGhFgFhdQgDhEAihQQAVgwA1hZQDJlXBnioQC1kkCfjCQA4hDAbgiQAug7AbgyQAWgqAbhHQAkhdAJgWQA+iKBbgyQBHgmBUAPQBVAPA1A7QBNBVABCfQAABSgSBkQgMBBgdByQgZBggcA1QgoBOg+AeIgvATQgcALgPALQgZASgaAxQgeA1gpBUIhECLQjoHGk/EQQg+A1gyAbQhDAkg+ABIgCAAQhZAAhHhGg");
	this.shape_164.setTransform(78.5135,429.3634);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#FF6666").s().p("AoOLgQgzgPgvgkQgogdgogvQgYgcgsg8Qgog1gTgdQgggugTgpQgehAgShVQgMg6gLhiQgTijADhkQAEiCAkh+QAih4A6hDQAkgpAvgXQAygZAyACQAdACArAMQA5ARAOADQAaAFBAADQA6ADAfAIQAgAJBAAgQA9AfAjAJQAhAIAwAAIBSgCQBGABCDAZQCJAbBBACQBIADCTgJQCAgBBMAuQBPAvAeBfQAdBggoBSQgIAQgTAeQgTAfgIAQQgLAWgLAoQgOAsgHASQgTAygrA1QgbAhg5A5QhzBzhHA1QhvBUhsAZIhMAOQguAIgdALQgnAQhJA5QhFA2gtAPQgkANhHADQhMAEghAJQgSAFgrASQgnAPgXAFQgUAFgVAAQghAAgjgLg");
	this.shape_165.setTransform(31.3762,333.5547);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#FF6666").s().p("AprOyQhXgGhGghQhOglgphBQgdgvgKhBQgJg0ADhGQAIiRAshwQAqhnBih8QCVi9DnjEQCLh3EjjYQAogeAVgSQAggbAVgcQAOgSAcgwQAZgrASgWQBDhPBygBQBzgBBDBOIAbAgQARATAPAIQANAGATAEIAiAFQBMANA4A9QA3A+AFBNQAFA+geBIQgUAygvBKQkpHWmaGZQhcBchFA7QhcBNhXA0QhkA7hnAdQhcAahYAAIgmgCg");
	this.shape_166.setTransform(62.5906,420.413);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#FF6666").s().p("AolNwQhUAAgug3Qg5hEAViNQAJhHAiiMQAwi/AlhyQA3ikBGh7QAlhABMhuQA8hXAhgrQA3hFA2guQAqglA7glQAmgYBGgmQCLhLBfgfQCGgrBxARQBlAQArA7QAnA1gFBiQgHBrg1AyQAXA9gMBJQgKBBgkA/QgeA1gzA4QgfAjhCA+InBGrIhpBnQg5A6gqAzIhcB3Qg4BDg0AjQhCArhMAAIgCAAg");
	this.shape_167.setTransform(38.8125,396.5493);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#FF6666").s().p("AgENaQhKgHhMgzQg2gkhJhIQgugtgZgdQgmgqgXgoQgUgggVg0QgYg7gNgdQgbg9hQiQQhJiBgdhOQgth6gFiBQgGh9AnhSIAXgsQAQgbAHgQIATgvQAMgcANgQQAVgZAogQQARgHA3gPQAjgKA5gUIBbgfQDMhBCkAUQBgALBUAoQBYAqA8BEQAdAhAcAuQAUAgAcA2QB9DuA6CnQBRDlgCDIQAABhgbA7QgSAmgeAaQghAbgmAGIgaADQgQABgJAEQgPAFgPANIgZAZQhsBzi3BSQg7AbguAMQgtAMgnAAIgYgBg");
	this.shape_168.setTransform(-0.5576,333.5346);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#FF6666").s().p("Ai5LtQhsgehdg5Qh2hKhRhwQg2hKg3h5QhJiegiiGQgqijAKiQQAHh0A2gxQALgLAXgPQAZgQAKgJQARgOAXgeQAbgiALgLQAagaApgXQAagOAxgVQA5gYAdgLQAwgSApgIQAygJBDgBIB1ACICYAAQBcABA9AEQCNALBfApQBXAlBLBFQBGBBA1BXQBcCVgICCQgCATgGAoQgGAmgBAVIACCEQACBPgXAwQgNAageAgIgyA1QgOARgeAmQgbAlgRASQgsAwhnBCQhsBHgqApQgQAQggAjQgdAegYAQQg3AkhkADIgfABQhyAAhsgeg");
	this.shape_169.setTransform(5.9975,346.2513);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#FF6666").s().p("AnEOvQgwgCgqgRQgtgSgdghQg+hFAFiHQAEhZAfhtQAShCAvh+QB/lSBNimQB/kTCVi+QBMhhBJg6QBchIBhgSQAvgJA+ACIBuAHQA/AEAfAIQA0ANAcAeQAlAogBBLQgBArgMBYQgDAgABA1QAAA/gBAWQgKD2jDESQg5BRh2COQh9CXg0BHQgkAyhGBmQhABYg2A2QhHBGhQAnQhSAnhRAAIgPAAg");
	this.shape_170.setTransform(51.8041,441.3978);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#FF6666").s().p("ApgLCQhwgFhFggQgsgUghggQgjgjgPgqQgOgqAEg2QADgkANg+QAShTANguQAThHAZg1QBCiOCUiBQBdhRDDh+ICqhvQBCgqAhgUQA4giAugWQBfgsBqgWQCKgdCsAEQBgADBBASQBWAYAwA3QAlAqAXBJQAnB9gYCFQgYCFhPBmQg0BDhHAzQg2AohKAjQgwAYhZAkQi9BNi0BEQAFAcgKAdQgJAcgUAXQgcAjhAAjQh7BDiLAhQh2Abh4AAIgpAAg");
	this.shape_171.setTransform(47.4176,401.1406);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#FF6666").s().p("ADENIQlFhCkPjNQkSjPiSknQhei8BGhtQAOgXAlgjQAnglAOgUQASgZARgtIAchKQAehCA7g5QA1gyBIgmQA9ggBQgaQA6gSBbgVQDGguCFgFQC4gICJA/QCQBBBlCPQBdCFAkCoQAfCUgNCvQgLCQgqC1QgXBhgYA/QggBVgvA7Qg2BEhNAiQhSAkhNgSQgNAYgaAQQgYAPgdAFQgOACgRAAQgiAAgxgKg");
	this.shape_172.setTransform(4.5527,338.6738);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#FF6666").s().p("AkUJpQhWgmhmhIQhLg1hJhAQhThKglg+QhBhvAMiqQAGhjAghNQAmhbBEgwQAggXA7gYQBLgfATgKQAfgQB1hWQBZhBBDgPQAlgIA7AAQBPABASgCQAsgDBZgWQBXgVAugDQBxgHBsA7QBoA4BBBjQA+BeAUB3QATBygWB1QgpDRihDIQhKBbhGAvQgoAag1AXQglAQg+AVQg9AWgmAKQg2AQgvAGQggAEghAAQh6AAh/g3g");
	this.shape_173.setTransform(-10.0462,327.1904);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#FF6666").s().p("Aq9KSQhVgFgngsQg1g9AqiIQBLjzCDidQAegiA1g1QBDhEASgTIBOhYQAwg4AggfQA1g2BMg5QAugjBehAQBTg7A1gVQCPg7DXA2QBgAYA+AjIAkAXQAXAOAOAHIAkAPQAWAJANAGQAvAaAaAzQAbAygGA2QgIBShMBFQgeAagqAaQgbAQgzAaQhhAyhCAZIhGAbQgpAQgbAPQgjATgtAjIhNA7QggAYgwAgIhSA1Qg1AkhwBQIinB5QgzAlgXAQQgrAcgkARQhZAqhjAAIgdgBg");
	this.shape_174.setTransform(20.2487,378.9485);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("#FF6666").s().p("AqTJ3Qg6gDghgIQgxgMgdgcQgegdgIgtQgIgrAQgoQAUgxAzgoQAggaBEglQDpiBC3h8QDWiRCnibIBzhtQBEg/A0goQCShwCKgXQA+gKA1ANQA8APAgAqQAnA0gGBaQgKCeh5CzQhlCTiLB1QiLB0ilBJQhJAgimA4QieA2hRAmIhfAuQg3AZgrAKQgnAJgzABIgKAAQgdAAg1gDg");
	this.shape_175.setTransform(26.9267,427.2612);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#FF6666").s().p("AD2MYQhVgahbhbQhYhYhWiBQg1hQhdihIhlivQhDhzgeg9QgyhlgWhXQgbhoAIhhQAIhsAyhSQAhg2ApgVQAtgXA2AOQA0ANAlAmQAUAUATAeIAfA3QBLCICSDpQA1BVAfAkQAdAhA4AyQBCA6AWAVQBABCA3BeQA7BkAVBZQARBFgEBJQgDBIgXBEQgZBPgrAmQgnAig4AIQgRACgQAAQgkAAglgLg");
	this.shape_176.setTransform(-33.5358,314.5737);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#FF6666").s().p("AmUJnQgwgBgfgFQgrgHgggRQhEgkgihWQgahBgBheQgDh1AdhpQAfhwA/hYQAxhDBlhXQCSh9B3g9QBdgxCmgzQCNgrBfgKQCEgNBjAqQAhAOAWAUQAaAYAFAdQACAJAAAQIABAYQABAOAIAUIAMAhQAJAhgIAiQgHAjgWAaIgiAhQgVATgIARQgKAUAAAeQAAARACAkQACBSgqBTQglBLhDA/Qg4A1hSAzQgyAfhmA2IjOBsQg9AggbAMQgyAXgpAKQhBARheAAIgLAAg");
	this.shape_177.setTransform(-3.4146,383.999);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_157}]},8).to({state:[{t:this.shape_158}]},6).to({state:[{t:this.shape_159}]},6).to({state:[{t:this.shape_159}]},9).to({state:[{t:this.shape_160}]},3).to({state:[{t:this.shape_161}]},4).to({state:[{t:this.shape_162}]},4).to({state:[{t:this.shape_163}]},4).to({state:[{t:this.shape_164}]},10).to({state:[{t:this.shape_165}]},4).to({state:[{t:this.shape_166}]},2).to({state:[{t:this.shape_167}]},10).to({state:[{t:this.shape_168}]},6).to({state:[{t:this.shape_169}]},2).to({state:[{t:this.shape_170}]},2).to({state:[{t:this.shape_171}]},2).to({state:[{t:this.shape_172}]},2).to({state:[{t:this.shape_173}]},2).to({state:[{t:this.shape_174}]},2).to({state:[{t:this.shape_175,p:{x:26.9267,y:427.2612}}]},4).to({state:[{t:this.shape_175,p:{x:-32.8733,y:358.5112}}]},4).to({state:[{t:this.shape_176}]},2).to({state:[{t:this.shape_177,p:{x:-3.4146,y:383.999}}]},2).to({state:[{t:this.shape_177,p:{x:29.6354,y:471.799}}]},2).wait(37));

	// chin
	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#FFC3C3").s().p("EhBuAn5Qkegbi1hrQhjg8hlhoQg8g/huiHQg6hIgbgoQgthAgXg6QgbhGgBhEQABgcAEgZIgFgSQgYhlAHiKIAVjyQAVjhgLjeQgEhYgKg7QgMhPgag+QgZg5gyhFIhah1QhxiUhDiOIAEABQAZANAaAHQgRgWgIgbQgMgmAJgkQAJglAagdQAbgdAkgLQAQgFAhgEQAhgEAPgGQApgOAxgyIBBhHQAogsAcgZQBKhBB+g3QA2gYBWggQBVggAqgXQBDglAjgxQAKgOAaguQAVglATgUQAngpBGgSQAugLBSgEQA+gDAiACQARABAPADQBHg/BIhXQA6hGBniPQCUjMBJhqQB3ivBViTQA6hkAihNQAshjAThZQAMg1ALgZQASgoAigKQAagIAcANQAaAMAQAZQAYAlADBIQABAfgCAeIAJAKQAVAdAEAlQACAbgFAqIgKBFQAcgGAcAPQAaAPAOAbQAPAcACAqQAWAJAVAQQA6AugEBBQA/gCAxAuQAzAuABA+QAcgCAZAUIAGAFIAVAGQAPAEALgCQAQgCASgOIAegYQAXgQAcgCQAcgDAZAKQAWAJAVAVQAOANAWAbQAaAeAQAYIMriOQQPi2IXhXQNriNLChWQJBhFHVghQHighJcgKQFpgGLUABILCABQiHDghzCUQiQC4jSDJQiAB5kIDlQrzKNmOEwQqUH5pQExQiRBKj2BzQkoCKhgAwQkKCClAC1QjHBwl3DeIpXFgQi5BuhlA0QijBTiMApQhmAeibAaQiuAahWAQQg6ALg5AOQqKA3qCByQoyBjhzAPQj3AgjSAAQh1AAhrgKg");
	this.shape_178.setTransform(407.8,414.7037);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("#FFC3C3").s().p("EhBuAn5Qkegbi1hrQhjg8hkhoQg+g/htiHQg6hIgcgoQgshAgXg6QgchGABhEQAAgcAEgZIgEgSQgYhlAGiKIAVjyQAUjhgKjeQgEhYgJg7QgNhPgag+Qgag5gxhFIhah1QhyiUhCiOIAEABQAZANAaAHQgRgWgIgbQgMgmAJgkQAIglAbgdQAbgdAkgLQAQgFAhgEQAhgEAPgGQApgOAxgyIBBhHQAogsAdgZQBJhBB+g3QA2gYBWggQBVggAqgXQBCglAkgxQAKgOAaguQAWglARgUQAogpBFgSQAvgLBTgEQA8gDAiACQASABAPADQBHg/BIhXQA7hGBniPQCTjMBJhqQB4ivBUiTQA6hkAihNQAshjAThZQAMg1ALgZQATgoAggKQAbgIAcANQAbAMAPAZQAYAlADBIQABAfgCAeIAJAKQAVAdAEAlQADAbgHAqIgJBFQAbgGAdAPQAZAPAPAbQAPAcACAqQAWAJAVAQQA5AugDBBQA/gCAxAuQAzAuACA+QAbgCAaAUIAEAFIAWAGQAOAEAMgCQAQgCASgOIAfgYQAWgQAcgCQAcgDAZAKQAWAJAVAVQAPANAVAbQAaAeARAYIMqiOQQPi2IXhXQNriNLChWQJBhFHWghQHhghJbgKQFqgGLUABILCABQiHDghzCUQiQC4jTDJQh+B5kJDlQrzKNmOEwQqVH5pPExQiRBKj2BzQknCKhhAwQkKCClBC1QjGBwl3DeIpXFgQi6BuhkA0QijBTiMApQhmAeibAaQiuAahWAQQg6ALg5AOQqKA3qCByQoyBjhzAPQj3AgjSAAQh1AAhrgKg");
	this.shape_179.setTransform(404.45,411.1537);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f("#FFC3C3").s().p("EhAvAsXQhmgyhqheQhBg5h3h9Qg/hBgegmQgxg8gdg4QgghCgHhFQgDgaACgaIgGgSQghhigGiKIgEjzQgCjiggjbQgMhXgPg7QgUhNgfg7Qgeg3g2g/IhihtQh8iJhOiHIAEABQAaAKAZAEQgSgTgLgbQgOglAEglQAFglAXgfQAXggAigOQAPgGAfgHQAegIAQgHQAlgRArg3IA4hMQAigwAZgaQBAhJB0hDQAygcBQgoQBPgoAmgbQA8grAeg0QAIgOAVgxQARgnAOgVQAjgtBBgYQAsgQBPgMQA6gIAhgBQARgBAQABQA9hFA+hdQAxhLBViYQB6jZA9hxQBii4BDiaQAuhqAZhQQAihnAJhaQAGg2AIgZQAOgqAfgNQAZgLAcALQAbAKASAXQAaAiAKBIQAEAfACAeIAJAJQAXAaAGAlQAGAagBArQgEA9AAAIQAbgIAcANQAaAMARAZQARAaAHAqQAVAHAWAPQA8AoADBBQA8gJA0AqQA1ApAIA+QAagFAbASIAFADIAVAFQAPACAKgCQAQgEAQgPIAbgbQAUgSAbgGQAbgFAZAJQAWAGAWASQAPAMAYAZQAbAcASAWIL/jZQPXkXH7iIQM+jfKgiYQIkh7HChNQHMhNJEhCQFcgoK6hEIKnhAQhsDqhhCfQh4DEi3DdQhvCEjpD9QqXLQljFUQpKI2odFlQiEBYjjCJQkOClhaA5QjzCbkiDRQi1CClVEAIodGXQipCAhbA8QiVBiiDA2QhfAoiTAoQikAqhTAYQg3ARg1ASQptB1pfCsQoTCYhuAZQluBWkgABQkVgBi5hZg");
	this.shape_180.setTransform(434.85,525.3);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f("#FFC3C3").s().p("Eg91AvuQhogthvhaQhEg2h7h3QhCg/gggjQgzg7gfg2QgkhBgKhEQgDgbAAgaIgHgRQglhggMiKQgCgTgNjfQgMjigqjaQgQhWgRg6QgXhMgjg6Qgfg2g5g8IhnhpQiBiChUiFIADABQAbAJAZADQgTgTgLgZQgRglADglQADglAWghQAVggAhgQQAPgHAfgJQAegIAOgIQAlgTApg5IA1hPQAfgxAYgcQA9hLBxhIQAwgdBOgsQBNgrAlgdQA7guAbg1IAahAQAPgoAPgVQAggvBAgbQArgSBPgPQA5gLAhgCQARgCAPABQA7hIA5hfQAuhOBOibQBxjfA3hzQBai9A8idQAqhrAVhRQAdhoAFhbQAEg2AHgaQAMgqAegPQAZgMAdAKQAbAIATAXQAbAiAOBHQAEAeAEAeIAJAIQAZAaAHAlQAIAZAAArQgBA9ABAJQAZgLAdAMQAbALASAZQASAaAJApQAWAGAWANQA+AmAGBBQA7gLA3AnQA2AnALA9QAagGAbAQIAGAEIAUADQAPACAKgDQAPgEAQgRIAZgbQAVgTAagGQAbgHAZAHQAWAGAXARQAQALAZAYQAdAaASAWIL1j7QPKlCH1ifQMykDKYi1QIeiUG+hgQHJhiJBhcQFag3K1hiIKlhfQhhDvhbCjQhvDKiuDkQhoCJjeEGQp3LtlTFkQoxJPoMF9QiABejcCTQkHCxhXA8QjsClkaDfQiuCJlJEQIoNGuQihCHhYBAQiRBoiBA9QhcAriRAvQijAxhRAcQg1ATg1AVQpoCQpWDHQoNCvhtAeQlpBnkfAMQglACgjAAQjnAAijhHg");
	this.shape_181.setTransform(462.05,560.3577);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f("#FFC3C3").s().p("Eg5/Az0Qhqgnh0hTQhGgziChvQhFg7gigiQg3g4ghg0Qgog/gOhDQgFgbgBgaIgIgRQgqhegViJQgDgSgZjeQgYjhg2jYQgUhVgWg4QgbhLglg4Qgjg0g8g5IhthiQiHh8hciAIADABQAbAHAaACQgUgSgNgYQgTgkACglQAAglAUgiQAUghAggSQAOgIAegLQAegKANgJQAkgVAmg7IAwhRQAdgzAWgdQA5hOBthPQAughBLgvQBLgwAjgfQA4gxAZg3QAFgOARgyQAMgpAOgWQAdgwA/gfQAqgUBNgUQA4gOAigEQAQgCAQgBQA2hLA1hiQAphQBFigQBljkAwh3QBPjBA0igQAjhtARhSQAXhqAAhbQABg2AGgaQAJgrAegQQAXgOAeAJQAbAGAUAWQAdAgASBGQAGAdAFAeIAKAIQAaAYAKAlQAIAZADAqQACA+ACAIQAZgLAeAKQAbAJATAYQATAYAMApQAWAFAXAMQBAAiAKBBQA6gPA5AlQA4AjAOA9QAagHAcAOIAGADIAUACQAPABAKgEQAPgFAPgQIAXgdQATgUAbgIQAagIAaAGQAWAEAYAQQAQAKAbAWQAeAZAUAUILlklQO3l4Hsi6QMhkxKNjaQIWixG4h6QHBh7I7h8QFWhKKwiJIKeiFQhUD0hRCoQhkDQigDtQhiCPjOESQpLMPk/F2QoQJun1GaQh8BljSCfQj9C/hTBBQjiCzkNDtQinCUk6EhInyHLQiaCPhWBGQiJBwh+BDQhZAxiPA3QifA6hQAgQg0AWg0AZQpeCypLDoQoBDMhsAkQliB7kfAdQhNAHhIAAQi2AAiKgzg");
	this.shape_182.setTransform(409.5,455.594);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f("#FFC3C3").s().p("Eg+HAvaQhoguhuhaQhEg3h7h3QhCg+gfgkQgzg7gfg3QgjhBgKhDQgEgcAAgZIgGgSQglhggMiKQgCgTgLjfQgMjigojaQgQhWgRg6QgXhNgig5Qgfg2g5g9IhmhpQiBiDhTiGIADABQAbAKAZADQgTgTgLgZQgRglAEglQADglAVghQAWgfAhgRQAPgGAegJQAfgJAOgIQAlgTApg4IA1hPQAggwAXgcQA/hLBxhHQAwgeBOgrQBOgrAkgdQA7guAcg1QAGgOAVgyQAOgnAOgWQAhguBBgbQAqgSBPgOQA5gMAhgBQARgCAPABQA7hIA6hfQAvhNBPibQByjeA3h0QBai7A+ieQAphqAWhRQAehoAFhbQAEg2AIgaQAMgqAegOQAZgMAcAKQAbAIATAXQAbAhANBHQAFAeADAeIAJAJQAZAZAHAlQAIAagBArQgBA9ABAJQAagKAdAMQAbALARAYQATAaAIApQAWAGAWANQA+AnAGBBQA6gLA3AoQA3AnAKA9QAagFAbAQIAGADIATADQAQABAKgCQAPgEAQgQIAZgbQAVgTAagGQAbgHAZAHQAXAGAXARQAPAMAZAXQAcAbAUAVIL1j4QPLk+H3icQMykAKZizQIfiQG/hfQHIhgJChaQFZg1K2hfIKmhdQhjDvhbCjQhwDJiuDkQhqCJjfEFQp5LqlUFiQo1JNoNF7QiBBdjdCSQkICvhWA8QjsCmkbDcQiwCJlKEOIoOGsQihCGhZBAQiSBoiBA8QhcAriRAuQijAwhRAcQg3ATg0AVQpnCNpZDFQoNCshtAeQlpBlkgAMIg/ABQjtAAilhJg");
	this.shape_183.setTransform(361.7,432.0394);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f("#FFC3C3").s().p("Eg6PAzjQhqgnh0hUQhFgziDhwQhFg6ghgjQg3g4ghg0Qgng/gOhDQgFgbgCgaIgHgRQgqhegUiJQgDgSgZjfQgXjhg0jXQgVhVgVg5QgbhMglg3Qgjg0g7g5IhthjQiHh8hbiBIADABQAbAIAaACQgUgTgNgYQgTgjACgmQABglATgiQAUggAhgTQAOgHAegLQAegKAOgJQAjgVAmg7IAxhRQAcgyAWgdQA6hOBthPQAvghBLgvQBLgvAjgfQA4gxAZg3IAXhAQANgpANgWQAdgvA/gfQAqgUBNgTQA4gPAigDQAQgDAQAAQA3hLA1hiQAphQBGifQBmjkAxh3QBPjAA0ihQAkhsAQhTQAYhpAAhbQACg2AGgaQAKgrAdgQQAYgOAdAJQAbAGAUAWQAdAgARBGQAHAeAEAeIAKAIQAbAYAJAkQAJAaACAqQADA+ABAIQAZgLAeAKQAcAKASAXQAUAZAKAoQAXAFAXAMQA+AjAKBBQA6gPA6AlQA4AkAPA8QAZgHAcAPIAFACIAVACQAPABAKgDQAOgFAQgQIAXgdQATgUAbgHQAagJAaAGQAWAEAYARQARAKAZAWQAeAZAWAUILlkiQO4l1Hsi4QMikuKPjYQIWivG4h4QHCh6I8h6QFWhIKwiHIKfiDQhWD0hRCoQhkDPiiDtQhhCPjQERQpPMNk+F1QoTJsn2GYQh9BkjTCfQj/C9hTBBQjhCykODtQioCSk7EhIn0HIQiaCQhWBFQiLBvh9BEQhaAwiOA3QigA5hQAfQg0AWgzAYQpfCxpMDmQoDDKhqAkQlkB4keAdQhLAHhEAAQi6AAiMg1g");
	this.shape_184.setTransform(352.65,361.7315);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f("#FFC3C3").s().p("Eg9hAwEQhpgshuhZQhEg3h9h2QhCg9gfgkQg0g7ggg2QgkhBgKhDQgEgbAAgaIgGgRQgnhhgNiJQgCgTgOjfQgMjjgrjZQgQhWgSg5QgXhNgig5Qghg1g5g9IhnhoQiBiChViFIADABQAbAJAZADQgTgTgLgYQgSglAEgmQADgkAVghQAVggAigRQAOgGAegKQAegIAPgJQAkgTApg5IA1hPQAegwAYgcQA9hMBwhJQAxgfBNgqQBNgsAlgdQA6gvAcg1IAZhAQAQgoAOgVQAgguA/gcQAsgSBOgQQA5gLAhgCQARgCAPAAQA7hIA5hfQAthOBOicQBwjeA2h1QBZi8A8ieQAohrAWhRQAdhpADhaQAEg2AIgaQAMgqAdgPQAZgMAdAJQAaAIATAXQAbAiAPBGQAFAeADAeIAJAJQAZAZAIAlQAIAZAAArQgBA+ABAIQAZgKAfAMQAbALARAYQASAaAKApQAVAFAXANQA8AmAHBCQA7gMA4AnQA2AmAMA+QAZgGAcAQIAGACIATADQAPACALgDQAOgEAQgQIAZgbQAUgTAbgGQAagIAaAIQAWAFAYARQAPALAZAXQAdAbAUAVILzj+QPHlHH2igQMvkIKYi5QIdiVG+hjQHIhkJBhfQFZg3K1hmIKlhjQhhDwhZCjQhuDLiuDkQhoCLjcEGQpzLxlQFlQowJSoJF/QiBBejbCVQkHCxhWA9QjqCnkZDfQiuCLlJERIoKGwQifCIhYBBQiSBpiAA9QhcAriRAxQijAxhQAcQg2ATg0AWQpnCTpWDKQoMCxhsAfQloBnkgAPQgmACglAAQjlAAiihGg");
	this.shape_185.setTransform(420.35,479.1149);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f("#FFC3C3").s().p("EhAnAshQhlgyhrheQhBg6h4h7Qg/hBgdglQgxg9gdg4QghhCgIhEQgCgbABgaIgGgSQghhhgGiKIgFjzQgCjjghjbQgMhWgPg6QgThOggg7Qgfg3g1g/IhjhtQh7iIhOiIIADABQAaAKAZAEQgRgTgLgZQgQgmAGgmQAEgkAYggQAWgfAigPQAPgGAegHQAfgHAOgIQAmgSArg3IA6hMQAfguAagbQBBhJBzhDQAxgdBQgoQBPgoAmgbQA8gsAeg0IAdg/QARgnAPgVQAigsBBgZQAsgQBPgMQA5gJAiAAQAQgCAPACQA/hGA9hcQAxhLBViZQB6jYA9hyQBgi4BDibQAuhpAZhQQAihoAIhZQAGg2AKgZQAOgqAegOQAZgLAdALQAZAJASAYQAaAjALBHQAEAeABAfIAJAIQAYAaAFAmQAHAZgBArQgEA+ABAIQAZgJAeANQAaANAQAZQASAaAGAqQAWAGAWAOQA7ApAEBCQA7gJA2AqQA1AoAIA+QAagFAaASIAGACIAUAEQAPACALgCQANgDASgPIAZgaQAWgTAbgEQAbgHAZAJQAVAGAXATQAPAMAYAYQAcAcATAVIL+jaQPWkYH6iJQM9jiKgiZQIjh8HChOQHMhOJFhEQFagnK7hGIKohDQhsDshhCeQh3DGi4DcQhuCFjpD8QqWLSlgFVQpMI4oaFmQiFBYjhCKQkPCkhaA5QjxCckiDSQi2CDlUEBIodGXQimCAhcA9QiWBiiDA3QheAniTAqQikAphSAYQg3ARg1ATQptB3pfCtQoUCYhuAbQlrBWkiACQkVAAi5hag");
	this.shape_186.setTransform(453.7,516.675);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f("#FFC3C3").s().p("Eg/rAn5QkUgcivhsQhgg7hhhpQg7hAhriGQg4hHgZgoQgrhBgXg7QgahFgBhEQAAgcAEgZIgEgTQgYhkAIiKIAUjyQAVjigLjdQgEhXgJg7QgMhQgZg+QgZg5guhEIhYh2QhtiUhAiPQAAAAAAAAQABABAAAAQAAAAABAAQAAABAAAAQAaAMAYAHQgQgVgIgaQgMgnAKglQAIgkAagdQAagdAjgLQAPgEAggFQAfgEAPgGQAngOAxgzIBAhGQAlgrAbgZQBIhBB6g4QA0gYBUgfQBSggAogXQBBgnAjgwIAig8QAVglARgTQAngpBDgSQAtgMBQgEQA6gDAhADQARAAAOADQBGg+BGhWQA4hGBkiPQCQjMBHhrQByitBSiUQA5hjAhhOQArhjAShZQALg0ALgZQATgoAfgLQAagIAbAOQAaALAPAaQAWAlAEBHQABAfgCAfIAIAJQAVAcACAmQAEAagGArQgKA9AAAIQAagGAcAQQAZAPAOAaQAPAcADArQAUAIAVAQQA2AvgDBCQA8gEAyAvQAwAuADA/QAagDAYAUIAFADIATAGQAQAEAKgBQAPgCASgNIAcgXQAXgRAcgCQAbgEAYAMQAVAIAVAVQAOANAVAaQAZAfARAXIMPiMQPti1IGhVQNQiPKrhVQIthEHHghQHSggJJgJQFdgFK9ABIKsABQiDDghwCUQiKC5jNDJQh7B5kBDjQrbKMmBExQqBH4o7ExQiNBKjuBzQkeCIhfAvQkACEk2C0QjBBvltDeIpCFfQizBvhhA0QigBSiHAqQhhAdiWAaQipAZhUAQQg3AMg3ANQp2A4ptBwQogBihwAQQjwAgjOAAQhwAAhlgKg");
	this.shape_187.setTransform(421.525,498.1159);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f("#FFC3C3").s().p("Eg+pAuzQhoguhuhbQhCg4h8h4QhBg+gdglQgzg7geg3QgkhCgJhDQgEgbAAgaIgFgSQglhhgLiJIgMjyQgIjjgnjaQgPhWgRg5QgWhOghg6Qggg1g3g+IhmhqQiAiEhRiGQAAAAAAAAQAAAAABAAQAAAAAAABQAAAAAAAAQAbAJAaAEQgTgUgLgYQgRglAEgmQAEglAWggQAWggAhgPQAOgHAggIQAegIAOgJQAlgTAqg4IA3hOQAfgvAXgdQA/hKByhGQAwgeBPgqQBNgqAlgdQA7guAdg1IAag/QARgoAOgVQAgguBBgaQAqgSBQgOQA5gLAhgBQARgCAOABQA+hHA6heQAuhNBRibQB0jdA4hzQBbi7A/icQAqhrAXhRQAfhoAFhaQAEg1AJgbQANgqAdgOQAagMAcAKQAbAJARAXQAbAiAOBGQAFAfABAeIAKAIQAZAaAGAlQAIAZAAArQgCA+ABAIQAZgJAeAMQAaAMASAYQARAaAJAqQAWAFAXANQA7AoAGBBQA6gLA3AoQA3AoALA9QAZgGAaARIAGADIATADQAQABALgCQAOgEARgPIAYgbQAVgUAcgFQAZgHAaAIQAWAFAXATQAQALAYAXQAdAcATAUIL4jwQPNk2H2iYQM2j8KaisQIgiNG+hbQHKhcJDhVQFZgyK4hbIKmhXQhlDvhcChQhxDKixDiQhqCIjhECQqALmlXFfQo5JJoPF3QiDBcjdCRQkKCrhYA8QjtCjkcDbQixCIlMELIoRGnQijCFhYBAQiUBniBA7QhcApiSAuQikAuhRAbQg1ATg1AUQpqCKpZC/QoOCohtAeQlqBhkhALIgvABQj3AAiqhOg");
	this.shape_188.setTransform(434.7,479.3596);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f("#FFC3C3").s().p("EhDvAnFQkSgvinh5QhbhChahvQg1hEhiiOQgzhKgWgpQgmhFgTg8QgVhHAEhEQACgbAFgaIgCgSQgRhnASiIIAkjwQAljgAFjdQAChXgFg8QgGhQgUhAQgVg6gqhIIhPh8Qhiiag1iUQAAAAAAAAQAAAAABAAQAAAAAAABQAAAAAAABQAZAOAYAJQgPgXgGgaQgJgoAMglQALgiAcgbQAcgcAkgIQAOgEAhgBQAfgCAQgGQAngLA0gvIBGhCQAogoAdgXQBMg8B+gvQA1gUBWgZQBUgaAqgVQBDghAmguQAJgLAdguQAZgkASgSQApgmBEgMQAugJBQABQA6ABAhAGQARABAOAEQBKg6BMhRQA9hBBuiIQCdjBBPhmQB+ilBdiNQA/hgAmhKQAzhgAXhYQAPgzANgYQAVgnAggIQAbgHAaAQQAZAOAMAaQAUAmgBBIQgBAfgFAeIAIAKQATAegBAlQACAbgIAqQgOA8gBAJQAagFAbASQAYARAMAbQANAdgBArQAVAKAUARQAyAzgIBBQA8ABAuAyQAuAygCA+QAagBAXAWIAFAEIASAGQAPAFALgBQAPAAATgMIAdgVQAZgPAcAAQAagCAYANQAVAKATAWQANAPATAbQAXAhAOAYIMYhUQP3huILgxQNYhSKvgkQIxgdHIAAQHTAAJIAhQFcATK8AyIKqAyQiTDWh6CMQiXCvjbC6QiDBwkQDQQsHJXmWETQqjHLpPEIQiSBAj2BiQkmBzhiAoQkJBylCCeQjIBhl8DDIpaE2Qi6BhhkAuQilBHiKAfQhjAXiYAQQipAMhVAKQg5AIg4AJQp4AMpzBEQomA7hwAIQh7AHhxAAQjoAAi/gfg");
	this.shape_189.setTransform(402.825,474.3857);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f("#FFC3C3").s().p("Eg/0AteQhmgwhtheQhAg5h6h5QhAhAgdglQgyg9geg3QgihCgIhEQgDgaABgaIgGgTQgjhhgIiJIgHjzQgFjjgkjaQgNhWgQg6QgUhOggg7Qgfg1g3g/IhkhsQh9iGhPiIQAAAAABAAQAAAAAAAAQAAAAAAABQABAAAAAAQAbAJAZAFQgTgUgKgYQgRglAGgnQAEgkAXggQAWggAigOQANgHAhgIQAdgHAPgIQAlgTAqg3IA5hNQAggvAYgbQBAhJBzhFQAxgdBPgpQBOgoAmgcQA8guAeg0QAGgMAUgzQASgoAPgUQAhguBBgYQArgRBPgOQA5gJAiAAQAQgCAQACQA9hHA9heQAvhLBUiZQB3jbA7hzQBei5BCibQAshqAYhQQAhhoAGhaQAGg1AIgbQAOgpAegOQAZgMAdAMQAbAJAQAXQAbAiAMBHQAFAfAAAdIAKAJQAYAaAGAlQAHAZgBArIgBBHQAYgJAeAMQAaANASAYQARAbAHApQAWAGAXANQA6ApAFBBQA7gJA2ApQA3AoAJA+QAagGAaASIAGACQATADAAABQAPABALgCQAOgDARgPIAZgaQAVgUAbgFQAbgHAZAJQAWAGAXASQAQANAXAXQAdAcASAVIL8jjQPSklH5iPQM7juKdigQIiiCHAhTQHLhVJFhLQFZgsK5hPIKphKQhrDsheChQh0DHi1DfQhtCGjmD+QqNLbldFZQpEI+oVFuQiEBZjgCNQkMCnhZA6QjwCgkgDWQizCElSEFIoYGeQikCBhaBAQiWBkiCA3QhdApiSArQilArhRAZQg2ASg2AUQprB+pdC1QoSCehtAdQlrBakhAGIgVAAQkHAAizhUg");
	this.shape_190.setTransform(453.275,537.3317);

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f("#FFC3C3").s().p("EhDkAkUQkQgyinh2Qhbg/hahrQg1hBhhiHQgzhHgWgnQgmhCgTg5QgWhCAEhBQACgZAGgXIgCgSQgRhgARiAIAljgQAkjRAFjQQAChRgFg4QgGhLgUg9QgVg3gqhFQg1hQgagkQhiiUg1iMIABABQAaAOAXAJQgOgWgHgYQgJglAMgjQALggAcgZQAcgZAkgHQAOgDAhgBQAegBAQgEQAogLA0gqIBGg8QAnglAdgVQBMg3B+goQA1gRBVgXQBUgVApgTQBDgeAngqQAJgKAdgrQAYghATgQQAogjBEgKQAugHBQACQA6ADAhAHQAQABAPAFQBJg2BMhKQA9g8Buh8QCdiyBNheQB/iXBciCQA/hZAmhFQA0hYAVhSQAQgwANgXQAUgjAggHQAcgGAaARQAYANAMAYQAUAlAABDQgCAegEAbIAIAKQASAcAAAjQACAZgJAnQgNA5gBAIQAagEAaARQAYARANAZQAMAdgBAnQAVAKAUAQQAxAxgGA8QA7ADAtAwQAvAwgCA6QAbAAAWAVIAFAEIASAHQAPAEALAAQAOAAAUgLIAdgTQAYgOAcABQAbgBAXANQAVAKATAVQANAOATAaQAXAfAOAYIMWg9QP1hQIKghQNVg6KugRQIwgOHGALQHSALJHAsQFbAaK6A/IKpA/QiTDFh6CBQiWCgjaCqQiDBmkQC9QsEIfmWD5QqhGepODqQiRA4j1BWQkmBmhhAjQkJBllBCMQjHBXl8CuIpXEUQi5BXhlApQikA+iKAaQhjAUiXALQipAHhVAHIhwAOQp3gEpyAxQokArhwAFQhKAChHAAQkdAAjkgog");
	this.shape_191.setTransform(422.425,543.819);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f("#FFC3C3").s().p("Eg4dAtNQkWgCi6hcQhngyhthgQhCg6h6h8QhAhBgdglQgzg/geg4QgihCgJhEQgEgbACgZIgGgTQgjhigJiJIgIjzQgGjjgljaQgOhWgPg6QgVhOghg8Qgfg3g3hAQhDhKghgjQh+iIhPiKIABABQAcAKAYAFQgTgUgKgZQgRglAFgnQAEgkAXgfQAWgfAigOQAOgGAggHQAdgHAPgIQAlgSArg1IA5hMQAfguAYgcQBAhHB0hCQAwgcBPgnQBPgnAlgbQA7gsAeg0QAHgMAUgyQARgnAPgUQAhgtBBgXQArgQBPgMQA6gIAiABQAPgCARACQA8hFA9hcQAvhKBUiYQB3jYA6hxQBei2BBiaQAshqAYhPQAhhmAFhbQAFg0AJgbQANgpAegNQAagLAdAMQAaAJARAYQAbAjANBHQAEAfABAdIAKAJQAYAaAGAlQAHAaAAArQgDA+ABAJQAZgJAdAMQAbAOARAZQASAbAHApQAXAHAWANQA7AqAFBCQA7gJA2ArQA4ApAJA+QAagGAaATIAGACIATAEQAPACALgCQAOgCARgQIAZgZQAVgTAbgFQAbgGAaAKQAWAGAWATQAQANAYAYQAdAcATAWIL8jTQPTkPH6iEQM8jbKeiRQIjh3HBhJQHMhLJGg+QFagkK6hAIKpg7QhpDqheCeQh0DFi1DaQhrCDjmD6QqLLLldFRQpDIwoWFiQiDBXjgCHQkMCihZA3QjxCbkfDPQizCAlSD9IoYGSQijB9hbA/QiVBgiCA1QhdAmiTAoQilAnhRAXIhsAkQpsBwpeCoQoSCThtAZQloBSkfAAIgHAAg");
	this.shape_192.setTransform(419.925,535.6256);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.f("#FFC3C3").s().p("Eg9zArkQkUgYiyhzQhig9hlhxQg8hEhviPQg7hMgagrQgthIgZg+QgdhLgEhKQgBgeAEgbIgEgVQgbhtACiVIANkIQANj2gSjwQgGhegLhAQgOhWgchEQgag9gxhKQg9hWgfgoQhyidhDibQABAAAAAAQAAAAAAAAQAAABAAAAQAAAAAAAAQAbANAYAIQgRgYgIgcQgOgpAIgqQAHgmAaggQAZggAjgNQAOgFAhgGQAdgFAQgHQAmgQAvg3IBAhPQAigvAbgdQBGhIB5g+QAygbBSgkQBSgkAngaQA/gsAig1QAIgMAZg1QATgqASgUQAkguBCgUQAtgOBQgHQA6gEAiADQAPAAARADQBChGBEhfQA2hNBgidQCIjhBEh2QBti/BOiiQA1huAehUQAqhtAMhhQAKg5ALgcQAQgrAfgMQAbgKAcAPQAaAMAOAcQAYAnAHBOQABAjgBAfIAJAKQAWAeADApQAFAcgEAvIgIBNQAagIAcAPQAaASAOAcQAQAfAEAtQAWAJAVAQQA3AyAABIQA7gFAyAyQA1AxADBEQAbgEAYAWQADABADACIATAGQAPADAKgBQAPgCASgPIAbgZQAWgUAcgCQAbgFAZAMQAWAJAUAWQAPAPAWAcQAaAhARAZIMMipQPnjaIEhoQNLisKphpQIrhWHGguQHRgsJJgXQFcgMK9gPIKtgLQh9D2hrCjQiEDMjHDfQh2CGj6D8QrGLVl4FRQpxIyoyFXQiKBUjqCBQkaCahdA2Qj9CUkwDKQi9B9lmD5Io4GJQiuB7hgA9QicBciGAwQhhAiiVAfQioAfhTASIhvAeQpzBKprCHQodB1huATQkNAtjiAAQhVAAhQgGg");
	this.shape_193.setTransform(369.225,440.5359);

	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.f("#FFC3C3").s().p("Eg93AxNQhpgzhvhkQhDg9h+iBQhChEgegpQg1hBgfg7QglhGgLhJQgEgdABgcIgGgUQgnhogNiTIgOkGQgMjzgsjrQgQhbgRg+QgWhUgkg/Qggg6g5hDQhGhPghgkQiCiOhTiSQAdAKAYAFQgTgWgLgaQgRgnACgrQADgmAXgiQAWgjAhgPQAOgHAfgJQAdgIAPgJQAkgUAqg7IA3hUQAdgyAYgfQA9hNByhLQAwgfBOgsQBNgsAlgfQA6gxAcg4QAGgNATg3QAQgqAPgWQAfgxBAgbQArgTBPgPQA5gKAjAAQAOgCARACQA7hNA6hkQAthSBPilQBxjrA3h7QBYjIA9inQAqhzAUhVQAghwABhhQAEg5AHgdQAMgsAegPQAagNAdANQAbAJASAZQAbAkAPBMQAEAiACAfIALAKQAZAbAHAnQAIAcAAAuIAABNQAagLAdANQAcAOARAaQAUAdAHAsQAXAHAWANQA9AsAHBHQA6gMA4AsQA5ArALBDQAagHAaATIAFADIAUAEQAQABAKgCQAPgDARgSIAXgbQATgVAdgGQAagHAaAJQAXAGAXATQAQAOAYAZQAdAeAVAWIL1j3QPLlAH3icQM0kCKbivQIeiPG/hdQHJhcJEhUQFZgwK4hYIKnhUQhiEAhaCsQhuDWiuDxQhoCQjfETQp2MTlTF0QozJsoLGMQiBBhjcCXQkHC2hYA+QjsCtkaDnQiuCOlLEbIoMG/QigCLhYBGQiTBriAA9QhdAtiQAuQikAvhRAbIhrApQppCLpZDGQoOCshrAeQlqBkkiAHIgeABQkBAAizhZg");
	this.shape_194.setTransform(434.9,486.9652);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.f("#FFC3C3").s().p("Eg+7AneQkTgfixhwQhhg8hihrQg7hAhsiHQg5hHgagpQgshCgXg7QgchFgChEQAAgbAEgZIgEgTQgZhkAGiJIARjxQASjggOjcQgFhWgJg6QgMhQgbg/Qgag4gvhFIhZh3QhviSg/iQQAbAMAXAIQgQgWgIgaQgMgmAIgmQAIgjAagcQAagdAjgJQAOgFAhgEQAegDAQgGQAlgOAxgwIBBhGQAjgpAbgaQBHg/B6g1QAzgWBTgeQBSgdAogYQBAgkAigxQAIgKAagwQAUglASgSQAlgnBCgRQAugLBPgEQA7gBAiAEQAOAAARAEQBDg+BGhTQA3hFBjiMQCMjIBGhpQBxirBQiQQA4hjAfhMQAshhANhaQALgzAMgZQARgnAfgKQAcgIAbAQQAZALAPAaQAWAkAFBIQABAfgCAdIAKAKQAUAcAEAlQADAbgEApIgKBHQAagGAcAPQAaARANAaQAQAcADAqQAVAKAVAOQA2AxgCBCQA8gDAxAvQAzAvADA+QAbgCAXAVIAFADIAUAGQAPADAKAAQAPgBATgOIAagWQAXgQAcgCQAbgDAZALQAVAJAVAVIAjAoIArA3IMNh8QPpijIFhMQNOh9KqhHQIrg6HGgZQHRgXJJABQFbACK9ANIKsAPQiBDbhuCSQiIC1jKDFQh6B1j9DdQrSJ7l+EnQp7Hqo3EkQiLBHjsBuQkdCCheAuQj/B+k0CtQi+BrlrDWIo9FSQiwBqhhAzQifBPiGAnQhhAciWAWQioAWhTAOIhvAXQp0AspsBkQofBXhuAOQjTAYi5AAQiLAAh8gOg");
	this.shape_195.setTransform(446.225,539.1633);

	this.shape_196 = new cjs.Shape();
	this.shape_196.graphics.f("#FFC3C3").s().p("Eg+7AkTQkTgcixhnQhhg3hihjQg7g7hsh8Qg5hBgagmQgsg9gXg2Qgcg/gCg/QAAgYAEgXIgEgSQgZhcAGh+IARjeQASjOgOjKQgFhPgJg2QgMhJgbg6Qgag0gvg/IhZhtQhviHg/iEQAbALAXAIQgQgVgIgYQgMgjAIgjQAIggAagaQAagaAjgJQAOgEAhgEQAegDAQgFQAlgNAxgsIBBhAQAjgnAbgXQBHg6B6gxQAzgUBTgcQBSgbAogVQBAgiAigsQAIgKAagsQAUgiASgQQAlglBCgPQAugKBPgEQA7gBAiAEQAOAAARAEQBDg5BGhNQA3g/BjiBQCMi4BGhhQBxidBQiEQA4hcAfhFQAshaANhSQALgvAMgXQARgkAfgJQAcgHAbAOQAZALAPAXQAWAiAFBBQABAdgCAbIAKAJQAUAaAEAiQADAYgEAnIgKBAQAagFAcAOQAaAPANAYQAQAaADAnQAVAJAVANQA2AtgCA8QA8gCAxArQAzArADA6QAbgDAXAUIAFACIAUAGQAPADAKAAQAPgBATgNIAagUQAXgPAcgCQAbgDAZALQAVAIAVATIAjAlIArAyIMNhyQPpiVIFhGQNOhzKqhCQIrg1HGgXQHRgVJJABQFbACK9ALIKsAOQiBDKhuCGQiICnjKC1Qh6Bsj9DLQrSJIl+EPQp7HDo3EMQiLBCjsBkQkdB4heAqQj/B1k0CeQi+BjlrDEIo9E4QiwBhhhAvQifBIiGAkQhhAaiWAVQioAThTANIhvAWQp0AopsBcQofBQhuANQjTAWi4AAQiMAAh8gNg");
	this.shape_196.setTransform(466.775,569.8667);
	this.shape_196._off = true;

	this.shape_197 = new cjs.Shape();
	this.shape_197.graphics.f("#FFC3C3").s().p("EhB1AjrQkRgsirhxQhdg8hdhoQg4g+hliCQg0hEgYgnQgphAgUg3QgYhBABg/QABgYAFgXIgCgSQgUhdANh9IAdjdQAejMgCjLQgBhPgGg2QgIhKgYg8QgXg1gqhCIhThyQhoiMg4iIQAbANAXAJQgQgWgGgYQgKgkAKgiQAJggAcgYQAbgZAkgHQAOgEAhgBQAfgCAQgEQAmgLAzgpIBEg8QAlglAdgVQBKg2B9gqQAzgRBVgYQBTgWAqgTQBBgeAlgqQAIgKAcgqQAXghASgPQAogjBDgLQAugIBOABQA8ACAhAGQAPABARAEQBGg1BKhIQA6g8Bqh8QCXivBLhdQB5iWBYiAQA9hYAjhEQAxhXARhRQAOguANgXQATgiAfgHQAdgGAaAPQAZANANAXQAVAjABBCQgBAdgDAaIAJALQATAaABAiQACAZgGAmIgNBAQAagEAbAPQAYARAMAZQAPAbAAAnQAVAKAUAOQA0AwgFA8QA7ABAvAuQAxAugBA6QAbgBAWAUIAFADIATAHQAPAEAKABQAPgBAUgMIAcgSQAXgOAcAAQAcgCAYAMQAVAKATAUQANAOAUAZIAoA1IMThGQPvhdIIgpQNThDKtgbQItgWHHADQHSAFJHAiQFbAVK6AzIKrA1QiMDCh2B/QiRCfjUCpQiABlkIC8QrxIfmND4QqTGgpGDsQiOA5jyBYQkiBnhhAlQkFBmk9CNQjDBXl2CwIpNEXQi1BXhkAqQiiA/iJAcQhiAViWAMQiqAKhTAIIhwAPQp2AFpwA5QoiAyhuAGQhrAFhkAAQj5AAjLghg");
	this.shape_197.setTransform(465.925,580.4816);

	this.shape_198 = new cjs.Shape();
	this.shape_198.graphics.f("#FFC3C3").s().p("EhASAkCQkTgjiuhsQhfg6hfhlQg6g8hph/Qg3hDgZgmQgqg+gWg3QgbhAAAg/QAAgYAFgXIgDgSQgXhdAJh9IAXjdQAYjOgJjLQgChOgJg2QgKhKgag7QgYg0gshBIhXhvQhsiJg8iHQAbANAXAIQgQgWgHgXQgLgkAJgiQAIghAbgZQAbgZAjgIQAPgEAggDQAfgCAQgFQAmgMAygrIBCg+QAkglAcgXQBIg4B9guQAygTBTgaQBTgYApgVQBAgfAjgsQAJgJAagsQAWghASgQQAngkBCgOQAugJBOgBQA8AAAiAFQAPABARAEQBEg3BIhMQA4g9Bmh+QCRi1BIheQB1iaBViDQA5haAihEQAthZAQhRQAMgwAMgXQASgiAggIQAbgGAbANQAZAMAOAXQAXAjADBCQgBAdgCAaIAKAKQATAaACAiQAEAZgGAmQgKA4gBAIQAagFAcAPQAYAQANAZQAQAaABAnQAWAKAUANQA2AvgEA8QA7gBAxAsQAxAsABA7QAbgCAXAUIAGACIASAHQAPAEAKgBQAPgBAUgMIAagTQAXgPAdgBQAbgCAZALQAVAJAUATQAOAOATAZIArAzIMQhdQPth8IFg4QNQhdKtgwQIsgnHHgLQHRgJJIARQFcALK8AeIKrAfQiGDGhyCEQiLCijPCwQh9BokDDFQrgI1mFEFQqGGypAD+QiMA+juBeQkgBwheAoQkDBuk4CWQjBBdlwC8IpFEpQiyBchiAtQihBDiHAhQhiAYiWAQQipAPhSALIhwASQp2AYptBMQohBChuAKQimANiUAAQi6AAifgVg");
	this.shape_198.setTransform(425.3,555.5);

	this.shape_199 = new cjs.Shape();
	this.shape_199.graphics.f("#FFC3C3").s().p("EhASAkCQkTgkiuhsQhfg5hfhkQg6g9hph/Qg3hDgZgmQgqg+gWg3QgbhAAAg/QAAgYAFgXIgDgSQgXhdAJh9IAXjdQAYjOgJjKQgChPgJg2QgKhKgag7QgYg1gshBIhXhuQhsiJg8iGQAbAMAXAIQgQgVgHgYQgLgkAJgjQAIgfAbgZQAbgaAjgIQAPgEAggDQAfgCAQgFQAmgMAygrIBCg+QAkglAcgXQBIg4B9guQAygTBTgaQBTgYApgVQBAgfAjgsQAJgKAagrQAWghASgQQAngkBCgOQAugIBOgCQA8AAAiAGQAPAAARADQBEg3BIhKQA4g+Bmh+QCRi1BIheQB1iaBViCQA5hbAihFQAthYAQhSQAMguAMgYQASgiAggHQAbgIAbAOQAZANAOAWQAXAjADBCQgBAdgCAaIAKAKQATAaACAiQAEAZgGAmQgKA4gBAIQAagEAcAOQAYAQANAYQAQAbABAnQAVAKAVANQA2AvgEA8QA7gBAxAsQAxAsABA6QAbgBAXATIAGADIASAHQAPADAKAAQAPgBAUgMIAagTQAXgPAdgBQAbgCAZALQAVAJAUATQAOAOAUAZIAqAzIMQhdQPth8IFg4QNQheKtgvQIsgnHHgLQHRgJJIARQFcALK8AeIKrAfQiGDGhyCDQiLCjjPCwQh9BpkDDDQrgI2mFEFQqGGzpAD9QiMA+juBeQkgBxheAnQkDBtk4CXQjABdlxC8IpFEpQiyBchiAtQihBDiHAhQhiAXiWARQipAPhSALIhwATQp2AXptBNQohBChuAIQimAOiUAAQi6AAifgVg");
	this.shape_199.setTransform(390.2,487.3);

	this.shape_200 = new cjs.Shape();
	this.shape_200.graphics.f("#FFC3C3").s().p("Eg9jAkhQkUgVizhjQhig1hlhfQg9g6hvh5Qg6g/gbgmQgtg8gZg1Qgeg/gEg/QAAgZADgWIgEgSQgchbADh+IAMjeQANjOgTjKQgHhPgLg1QgOhKgcg5Qgcgzgvg/IhchrQhziDhDiCQAcALAYAHQgSgVgIgYQgNgjAHgjQAHggAZgaQAagbAjgKQAOgFAhgEQAegEAPgGQAmgOAvgtIA/hBQAigoAbgYQBFg7B6g1QAygVBRgeQBSgdAogWQA/gkAggtQAIgKAYgsQAUgiARgRQAlgmBCgRQAtgMBPgFQA7gDAiAEQAPgBARADQBBg6BFhPQA0hBBgiDQCIi7BDhiQBtigBNiHQA1hdAehGQAphbALhSQAKgwALgXQARgkAegJQAcgIAbAMQAaALAPAWQAYAiAHBCQABAdgBAaIAJAJQAVAZAEAiQAFAZgEAmIgIBAQAagFAdANQAZAPAOAXQARAaADAnQAWAJAWAMQA3ArAAA9QA7gEAzAqQA0ApAEA6QAagDAYASIAGADIASAGQAQACAKAAQAPgCATgNIAZgVQAXgQAcgCQAcgEAZAKQAVAIAVASQAOAOAWAXIAsAyIMKiHQPliuIDhTQNKiJKphSQIphEHGgiQHRghJIgNQFbgHK8gGIKtgDQh8DNhrCIQiDCqjGC6Qh3Bvj4DRQrCJbl4EYQpvHToxEbQiJBFjpBqQkaB/hdAsQj8B7kwCmQi7BolnDNIo0FHQiuBlhgAyQicBLiHAoQhgAdiUAYQioAXhSAQIhvAYQpzA4pqBrQocBehtAPQj+AhjYAAQhiAAhbgHg");
	this.shape_200.setTransform(416.875,502.532);

	this.shape_201 = new cjs.Shape();
	this.shape_201.graphics.f("#FFC3C3").s().p("Eg/MAkQQkTgeiwhoQhgg4hjhiQg7g7hqh9Qg4hBgbgmQgrg9gXg3Qgcg/gDg/QABgZAEgWIgDgSQgZhcAGh+IATjdQATjOgNjLQgEhOgKg2QgLhKgbg6Qgag0guhAIhYhuQhviGg/iFQAbAMAYAIQgRgVgIgYQgMgkAJgiQAIghAagZQAagaAkgJQANgEAigEQAegDAPgFQAmgNAxgsIBBg/QAjgmAcgXQBHg6B7gxQAzgTBSgcQBSgbApgVQBAghAigsQAIgKAZgsQAVghASgRQAlgkBDgPQAugLBOgDQA7AAAjAEQAOAAARAEQBEg5BGhNQA3g/Bjh/QCOi4BFhgQBzicBQiFQA5hcAfhEQAthaANhSQAMgvALgXQASgjAfgIQAbgIAbAOQAaALAOAXQAXAiAFBCQABAdgDAaIAJAKQAVAZADAiQADAZgEAmIgKBAQAagFAcAOQAZAQANAYQARAaACAnQAVAKAVAMQA3AugDA9QA8gDAxArQAzArADA7QAZgDAYATIAGADIARAGQAQADAKAAQAPgBATgNIAagUQAXgPAdgCQAcgCAYALQAWAIAUATQAOAOAUAYIArAzIMOhvQPqiRIFhDQNNhvKsg+QIrgzHGgUQHSgTJIAFQFbADK9APIKsASQiCDJhvCFQiICmjLC0Qh7Bsj+DJQrUJFmBEMQp8HBo6EJQiKBBjtBjQkdB3heApQkABzk1CdQi+BiltDCIo+E2QiwBfhiAvQifBHiHAkQhhAaiVATQipAThSANIhwAUQp1AlpsBZQofBNhuAMQjLAUiyAAQiUAAiCgOg");
	this.shape_201.setTransform(411.725,502.3425);

	this.shape_202 = new cjs.Shape();
	this.shape_202.graphics.f("#FFC3C3").s().p("EgwoAjfQokALhvgCQl1gHkahCQkOg/iih9QhZhDhWhtQgzhChbiJQgvhHgWgpQgkhCgQg5QgUhDAFg+QAEgZAGgVIgBgTQgNheAVh8IAtjaQAsjKAMjLQAFhOgDg3QgChLgUg8QgTg3gmhEIhKh4QheiTguiLQAaAOAWALQgOgXgFgZQgIgkANghQAMggAdgVQAdgYAkgEQAOgDAiABQAeABAQgDQAngJA3gmIBIg2QAngiAegUQBOgwCAgiQA0gNBVgSQBVgQArgQQBEgZAngoQAJgJAegoQAZgfAUgOQApggBEgHQAvgEBOAGQA7AHAiAIQAOACAQAGQBKgwBQhEQA+g4ByhzQCiilBRhWQCEiOBgh6QBEhVAnhAQA3hTAYhQQARguAOgUQAVghAggFQAdgEAZARQAYAOAMAYQASAlgEBCQgCAdgGAaQAFAFADAFQARAcgBAiQABAZgJAlIgSA/QAbgCAaASQAXASAKAZQANAdgDAnQAVAMATAPQAxAzgKA9QA7AEAsAxQAuAxgFA6QAZABAVAWIAGADIAQAIQAQAFAKACQAPAAAVgKIAcgRQAYgMAdABQAcABAXAOQAUALASAVQAMAQASAaIAkA3IMWgPQP0gWIJgEQNVgIKuAWQIsAQHGAjQHQAmJEBLQFYAtK2BkIKlBkQiZC4h/B3QibCUjgCaQiGBckVCpQsVHomeDcQquFxpWDDQiRAvj3BGQkqBThiAeQkMBTlGB2QjIBLmBCVIpgDtQi7BKhmAiQinA0iLATQhjANiWACQiqgChTADIhyAGQp0gnpyANg");
	this.shape_202.setTransform(390.125,437.0944);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_178}]}).to({state:[{t:this.shape_179}]},4).to({state:[{t:this.shape_180}]},4).to({state:[{t:this.shape_181}]},6).to({state:[{t:this.shape_182}]},6).to({state:[{t:this.shape_183}]},4).to({state:[{t:this.shape_184}]},5).to({state:[{t:this.shape_185}]},3).to({state:[{t:this.shape_186}]},4).to({state:[{t:this.shape_187}]},4).to({state:[{t:this.shape_188}]},4).to({state:[{t:this.shape_189}]},4).to({state:[{t:this.shape_190}]},6).to({state:[{t:this.shape_191}]},4).to({state:[{t:this.shape_192}]},2).to({state:[{t:this.shape_193}]},4).to({state:[{t:this.shape_194}]},6).to({state:[{t:this.shape_195}]},6).to({state:[{t:this.shape_196}]},2).to({state:[{t:this.shape_196}]},4).to({state:[{t:this.shape_196}]},2).to({state:[{t:this.shape_196}]},4).to({state:[{t:this.shape_196}]},6).to({state:[{t:this.shape_196}]},4).to({state:[{t:this.shape_197,p:{x:465.925,y:580.4816}}]},6).to({state:[{t:this.shape_197,p:{x:412.875,y:503.9316}}]},4).to({state:[{t:this.shape_198}]},4).to({state:[{t:this.shape_199}]},4).to({state:[{t:this.shape_200}]},4).to({state:[{t:this.shape_200}]},4).to({state:[{t:this.shape_201}]},4).to({state:[{t:this.shape_202}]},8).wait(3));
	this.timeline.addTween(cjs.Tween.get(this.shape_196).wait(78).to({_off:false},0).wait(4).to({x:495.625,y:613.1167},0).wait(2).to({x:454.625,y:565.6667},0).wait(4).to({x:433.675,y:550.6667},0).wait(6).to({x:377.625,y:454.7667},0).wait(4).to({x:431.175,y:530.8167},0).to({_off:true},6).wait(35));

	// face
	this.shape_203 = new cjs.Shape();
	this.shape_203.graphics.f("#FFC3C3").s().p("EA3sCYjQi8gniph8Qiehzh0irQiXB7jOAQQjOAQinhkQhAB2iKA/Qh+A6iUgEQh8gDiVguQhWgaixhHQi9hMhWgpQiWhJhnhSQkcjgianGQg1ibg2jvQg6kLghiFQiNo9kCnmQiikzj0lSQizj3kjljQpqruqUrDQiCiLhRhRQh2h4hohaQjei2htheQgwgqgqgpQgRhDgXhaQgKgogDgSQgFghAEgaQADgXARgrQARgsADgXQAHgzgdhBQgohKgRglIgyiAQgehMgkgpQglgrgzgUQAYgvAhgqQAtg4A9gpQh1gMhugIQhugIhrgFQg0gihCgcQgwgVhgggQhighgvgTQh2gyichoQith4hZg4IhRg0QgtgfgdgdQgPgPgmgwQghgogYgUQgSgQg0ggQgugegWgWQgpgpgshuQgshtgrgpQgwguhSgSQgZgGgigDIgog7QhWh2hXgrQgmgTgsgKIpdmDQhZg5gtghQhIg2gxg0QhWhegth+Qgsh7ABiDQACh/Arh+QAph5BLhtQA4hRBaheICiiiQL4rtEvswQBCixA9jkIAWhVIgGivQgQjGh2kpIhijxQg3iNgchpQg0jAgEjIQgEjJAsjCQAGgaAmiMQAbhlALhCQALhHAGh8QAGiOAGg1QAKhdAgiRQArjDAIgqQAOhNAbjXQAXi5AZhqQAbh2A+irIBnkeQAihlA7jRQA7jQAihmQA8ixBJiLQgNghgKglQg1jFBcihQBginDohhQBYglB9giIDag4QCCgiFehvQEthgC1gmQJNh6KZCBQJMByJkEvQHfDtJfGeQFdDuKyHrQHNE+MPHxQO2JbEuDIQPFJ/I2IeQL8LdFQMlQB3EfBTFTQBIEmAyFjQBLIbgBHiQgBIYhgHfQhWGwjBIFQh0E3kJJfQg4B/gpBJIABAEQADCOgqEAQhZIchLK5QgPCIgYDxIkZgvQALBsAKCDIAgGLQApHcBBE0QANA+BEEaQA0DVAVCGQBCGPhgEZQgJAcgxB5QglBagOA8QgTBRgDBzQgBBDADCGQABD2hNB/QgaAshLBVQhHBPgbAzQgkBGgTB6QgZCsgHAcQgkCRhlB0QhkB1iJA4QiKA5iZgLQiagLh/hNQgRCGgSBnQAFBOgCBDQgJEkiQC4Qh4CZjKBAQh0Akh1AAQhRAAhQgRg");
	this.shape_203.setTransform(402.3482,38.8188);

	this.timeline.addTween(cjs.Tween.get(this.shape_203).wait(139));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-297.1,-1232.2,1523,2249.1);


(lib.but = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("Aj/JnQgLgJgFgNQgFgQACgmIANieQARjSARhpIARhYQAaiGAUhMIACgHIgphcIgqheQgZg1gYgmIgPgZQgHgPAAgNQAAgVASgQQAQgQAWgBQAVgCAVAKQATAKAPAQQAOAPAMAVIATAmQBJCXCTEtIAjBFQANhCAZhZQAkh/AQg/IALgsQAFgbACgcQADgwAFgYQAEgTAGgKQALgPAPABQAQAAAKARQAHALADAVQAOBSgDAxQgCAYgJAwQgbCLgWBEQgPAugDAOIgHAoQgEAZgGAQQgOAigeAWIgLAIQBLCdA0B8QAOAgAFAUQAIAegEAYQgEAcgXATQgYAUgagHQgSgFgPgTQgJgMgNgaIjenYIg/iGIgFA9IgqHuQgFA3gGAcQgLAtgXAcQgSAWgSABIgCAAQgMAAgLgJg");
	this.shape.setTransform(205.3667,123.0165);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AGjJ8QgLgJgEgNQgGgQACgmIANieQARjSAShpIAQhYQAaiGAUhMIADgHIgphcIgrheQgZg1gYgmIgOgZQgHgPAAgNQAAgVARgQQARgQAWgBQAVgCAUAKQATAKAQAQQANAPAMAVIAUAmQBICXCVEtIAiBFQAOhCAYhZQAkh/ARg/IAKgsQAGgbACgcQADgwAEgYQAEgTAHgKQALgPAOABQARAAAKARQAGALADAVQAPBSgDAxQgCAYgJAwQgbCLgWBEQgPAugDAOIgHAoQgFAZgGAQQgNAigeAWIgLAIQBKCdA1B8QAOAgAFAUQAIAegEAYQgFAcgXATQgYAUgZgHQgTgFgOgTQgKgMgMgaIjgnYIg/iGIgFA9IgpHuQgFA3gHAcQgLAtgWAcQgSAWgTABIgBAAQgNAAgLgJgAuSJMQglgEgRgMQgNgIgGgOQgHgOAEgOQAHgXAjgMQAYgHAjgDIA8gCQAlgCA1gJIBagQQBXgOCVgHIBcgEIAAgEQAAiQAak6QAZkrgDihQhfgOitAkQi7AmhTgEQgtgCgYgRQgQgMgGgSQgHgTAIgQQAJgSAZgHQANgEAhgEQAcgDAlgIIBAgRQCsgrDEgMQA1gEAjAHQAvAJAaAeQASAVAIAiQAFAYABAnQAFCZgYEQQgbEpAAB+QAAAegCASIABAAQBlgLAQAAQBCgEAxAMQAmAJBCAfQA+AcABAkQABAYgYARQgWAPgbgBQgUgBgdgLQgfgMgQgFQgvgPhCAEIh0ANQhBAHh8ACQiCACg7AFIi0AYQhDAJg3AAQgfAAgbgDg");
	this.shape_1.setTransform(137.8054,120.9179);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AyzNDQgLgDgGgJQgJgMAFgYQAJgvAhg3QALgSA0hLQBciFBjjaQA4h4AShQQAahygdhbQhMgLiDAvQiPA1hBgBQg+gBgYgiQgLgQgCgXQgBgPACgbIARinIAtmqQADgUAGgNQAJgRAPAAQAZgBALArQAeB1gRCzIgQCWQgLBcgCA6QA5gGBvgqQBsgpA7gFQBagHAzAsQAvApAMBbQAPBsgiB+QgZBfg9CCQhFCVhEBpQhUCChiBZQgWAUgPAEQgGACgGAAIgKgBgAMfL2QgLgJgEgNQgGgQACgmIANieQARjSAShpIAQhZQAaiFAUhMIADgHIgphcIgrheQgZg1gYgmIgOgZQgHgPAAgNQAAgVARgQQARgQAWgBQAVgCAUAKQATAKAQAQQANAPAMAVIAUAmQBICXCVEsIAiBGQAOhDAYhYQAkh/ARg/IAKgsQAGgbACgcQADgwAEgYQAEgTAHgKQALgPAOABQARAAAKARQAGALADAVQAPBSgDAxQgCAYgJAwQgbCLgWBDQgPAugDAOIgHApQgFAZgGAQQgNAigeAWIgLAIQBKCeA1B7QAOAgAFAUQAIAegEAYQgFAcgXATQgYAUgZgHQgTgFgOgTQgKgMgMgaIjgnYIg/iHIgFA9IgpHvQgFA3gHAcQgLAtgWAcQgSAWgTABIgBAAQgNAAgLgJgAoWLGQglgEgRgMQgNgIgGgOQgHgOAEgOQAHgXAjgMQAYgHAjgDIA8gCQAlgCA1gJIBagQQBXgOCVgHIBbgEIAAgEQAAiQAak7QAZkqgDihQhfgOisAkQi7AmhTgEQgtgCgYgRQgQgMgGgSQgHgTAIgQQAJgSAZgHQANgEAhgEQAcgDAlgIIBAgRQCsgrDDgMQA1gEAjAHQAvAJAaAeQASAVAIAiQAFAYABAnQAFCZgYEPQgbEqAAB+QAAAegCASIABAAQBlgLAQAAQBDgEAxAMQAmAJBCAfQA+AcABAkQABAYgYARQgWAPgbgBQgUgBgdgLQgfgMgQgFQgvgPhDAEIh0ANQhBAHh8ACQiBACg7AFIi0AYQhDAJg3AAQgfAAgbgDg");
	this.shape_2.setTransform(99.8135,108.7065);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape_2}]},2).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-37.4,25.1,274.5,167.20000000000002);


(lib.big = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("Ai4G7IgBAAQgLAFgLgBQgPgCgLgMQgKgLgCgPQgBgIABgMIADgTQADgVgBgfQgBh6AIhuQACggAGgTQgFgaABgNQABgYAOgOQAKgJAZgHIBYgYQArgMAYgIIALgFQg4hogfhYIgDABQghAJgrADQgXABg1ABQgaAAgNgCQgWgDgPgIQgLgHgHgJQgHgFgFgHQgKgOAFgOQADgKAKgGQALgPAYgDQAKgCAOAAIAPABIAVgJIAsgUQA0gXA6gEQAjgCARALQAJAGAGAKQAPAHAOAPQALANAVAmQAkBDCFDNQBtCmAwBvQALAaAFARQAFAYgEAUQgEAXgTAPQgTAQgVgFQgIgCgGgFQgJAJgPAFQgZAIgSgOQgNgKgIgVIgLglQgLgkgeg4Ihsi7QgdAXgiAOQgnAPgoABIgUABIgJACIABAFQANA+ADBWQACAxAABkQABAlgFASQgKAggYAJQgIADgHAAQgLAAgKgFg");
	this.shape.setTransform(335.5394,7.7965);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AjXHyQgcgFgNggQgIgSgDgmIgWkXQgOiJgfiAQgThTgDgPIgDgSIgNACQglAHhLgCQhugDhlACQgbAAgNgEQgYgIgGgSQgCgIABgIQgUgMgJgUQgEgJAEgFQADgDAJAAQAEAAAXgIQARgGA2gJQApgHBSgVQA9gNB8gMIC5gSQATgCALABQAQABALAGQAMAGAHALQAHAMAAANIAAAKQAJAIAEANQAEAQgGAOQgHASgWALQgPAIgbAGIgmAIIAFAgIAzEvQAYCvgNCDQgDAbgGAMQgGANgKAHIADAYQAAASgHAMQgHAMgNAGQgJAFgJAAIgIgBgADzGIIAAAAQgLAFgMgBQgOgCgLgMQgLgLgCgPQgBgIACgMIADgTQADgVgBgfQgBh6AIhuQACggAGgSQgGgaABgOQABgYAOgOQAKgJAZgHIBZgYQArgMAXgIIAMgFQg4hogfhXIgEAAQghAJgqADQgXABg2ABQgZAAgOgCQgVgDgQgIQgKgGgHgJQgHgGgFgHQgKgOAEgOQAEgJAJgGQAMgPAXgEQAKgCAOAAIAPABIAWgJIArgUQA1gXA6gEQAjgCAQALQAJAGAHALQAPAGANAPQAMANAVAmQAlBDCFDNQBtCmAwBvQALAaAEARQAGAYgEAUQgFAXgSAPQgUAQgUgFQgIgCgHgFQgIAJgPAFQgZAIgTgOQgNgKgIgVIgLglQgKgkgfg4Ihri6QgdAXgkAOQgmAPgpABIgTABIgJACIAAAEQANA+ADBWQACAxAABkQABAlgFASQgKAggYAJQgHADgHAAQgLAAgLgFg");
	this.shape_1.setTransform(292.6592,12.872);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AtiIcQgOgCgKgLQgKgKgEgPQgKgCgJgGQgPgLgFgZQgEgQABgcQAJjXgRjQIgMicQgHhbAChCQABgjAKgQQAGgMANgFQAMgGAMAEQAMAFAIAPIACgFQAHgNAQgEQAPgEANAHQATAKAKAlQAWBOAJBlQAFA8ADB5QADCYgDBNQgFB+gWBjQgIAhgLAPQgIALgMAGQgKAGgJAAIgFgBgAgoHIQgcgFgNggQgIgSgDgmIgWkXQgOiJgfiAQgThTgDgPIgDgSIgNACQglAHhLgCQhugDhlACQgbAAgNgEQgYgIgGgSQgCgIABgIQgUgMgJgUQgEgJAEgFQADgDAJAAQAEAAAXgIQARgGA2gJQApgHBSgVQA9gNB8gMIC5gSQASgCALABQAQABALAGQAMAGAHALQAHAMAAANIAAAKQAJAIAEANQAEAQgGAOQgHASgWALQgPAIgbAGIgmAIIAGAgIAyEvQAYCvgNCDQgDAbgGAMQgGANgKAHIADAYQAAASgHAMQgGAMgNAGQgJAEgJAAIgIAAgAGiFeIAAAAQgLAFgMgBQgOgCgLgMQgLgLgCgPQgBgIACgMIADgTQADgVgBgfQgBh6AIhtQACggAGgTQgGgaABgOQABgYAOgOQAKgJAZgHIBZgYQArgMAXgIIAMgFQg4hogfhYIgEABQghAJgqADQgXABg2ABQgZAAgOgCQgVgDgQgIQgKgGgIgKQgGgFgFgHQgKgOAEgOQADgKAKgGQALgPAYgDQAKgCAOAAIAPABIAWgJIArgUQA1gXA6gEQAjgCAQALQAJAGAGAKQAQAHANAPQAMANAVAmQAlBDCFDNQBtCnAwBuQALAaAEARQAGAYgEAUQgFAXgSAPQgUAQgUgFQgIgCgHgFQgIAJgPAFQgZAIgTgOQgNgKgIgVIgLglQgKgkgfg4Ihsi7QgdAYgjAOQgmAPgpABIgTABIgKACIABAFQANA9ADBWQACAxAABkQABAlgFASQgKAggYAJQgHADgIAAQgKAAgLgFg");
	this.shape_2.setTransform(275.1857,17.0824);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AndKXQgNgCgLgLQgKgKgDgPQgLgBgIgHQgQgLgFgZQgDgQABgcQAIjXgQjRIgNibQgGhbAChCQABgjAJgQQAHgMAMgFQANgGAMAEQAMAFAHAQIADgGQAHgNAPgEQAQgEANAHQATAKAKAlQAVBOAJBlQAFA7ADB6QAECYgDBNQgFB+gXBjQgIAhgKAPQgJALgLAGQgKAGgJAAIgGgBgAFcJDQgbgFgOggQgHgSgDgmIgXkXQgOiKgeh/QgUhTgCgPIgDgSIgNACQglAHhLgCQhtgDhlACQgcAAgNgEQgXgIgGgSQgDgIACgIQgUgMgJgUQgEgJAEgFQACgDAJAAQAFAAAWgIQARgGA3gJQApgHBRgVQA9gNB8gMIC5gSQASgCALABQAQABAMAGQALAGAHALQAHAMABANIgBAKQAKAJADAMQAEAQgFAOQgIASgWALQgPAIgbAGIgmAIIAGAgIAzEvQAXCvgMCDQgDAbgGAMQgGAOgLAGIADAYQABASgIAMQgGAMgOAGQgJAFgJAAIgIgBgAzdIzQgRgCgKgLIgFgHQgMAOgOADQgZAGgSgXQgSgXAEgaQADgXASgXQALgPAYgYQCNiJBnh3QB7iPBYiKQitgeisAHQgZABgNgCQgVgEgLgMQgMgPABgZIAEgXQgbgGgNgTQgMgSABgrIAGklQABglAPgLQAMgIAQAFQAQAFAIAOIAFAJQAEgEAGgEQALgJANACQAgAFAHA5QAIBJACBcIAABeQCPgHCPARQAiADAVAGQAdAIAUAPQAWARAOAbQANAaADAeIAAAFIACAFQAEARgHAUQgDAegLAlQgvCXiKCmQgtA2hPBTQhjBogcAfQgcAggSAIQgMAGgMAAIgGgBgAMoHZIAAAAQgMAFgLgBQgPgCgLgMQgKgLgCgPQgBgIABgMIADgTQADgVgBgfQgBh6AIhuQACggAHgTQgGgaABgOQABgXAOgOQAKgJAZgHIBYgYQArgMAYgIIALgFQg3hogghXIgDAAQghAJgrADQgXABg1ABQgaAAgNgCQgWgDgPgIQgLgGgHgJQgHgGgFgHQgKgOAFgOQADgJAKgGQALgPAYgEQAKgCAOAAIAPABIAVgJIAsgUQA0gXA6gEQAjgCARALQAJAGAGALQAPAGAOAPQAMANAVAmQAkBDCFDNQBtCmAwBvQALAaAFARQAFAYgEAUQgEAXgTAPQgTAQgVgFQgHgCgHgFQgJAJgPAFQgZAIgSgOQgNgKgIgVIgLglQgLgkgeg4Ihsi7QgdAXgjAOQgnAPgoABIgUABIgJACIABAFQANA+ADBWQACAxAABkQABAlgFASQgKAggYAJQgIADgHAAQgKAAgLgFg");
	this.shape_3.setTransform(236.2229,4.7642);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape_2}]},2).to({state:[{t:this.shape_3}]},2).to({state:[{t:this.shape_3}]},2).to({state:[]},1).wait(110));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-61.6,372.4,132.8);


(lib.sky3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CDE9FF").s().p("EiAXBKYMAAAiUvMEAvAAAMAAACUvg");
	this.shape.setTransform(821.6,476);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CCE6FC").s().p("EiAXBKYMAAAiUvMEAvAAAMAAACUvg");
	this.shape_1.setTransform(821.6,476);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#CBE3FA").s().p("EiAXBKYMAAAiUvMEAvAAAMAAACUvg");
	this.shape_2.setTransform(821.6,476);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#CAE0F7").s().p("EiAXBKYMAAAiUvMEAvAAAMAAACUvg");
	this.shape_3.setTransform(821.6,476);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#CADDF5").s().p("EiAXBKYMAAAiUvMEAvAAAMAAACUvg");
	this.shape_4.setTransform(821.6,476);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#C9DAF2").s().p("EiAXBKYMAAAiUvMEAvAAAMAAACUvg");
	this.shape_5.setTransform(821.6,476);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#C8D7F0").s().p("EiAXBKYMAAAiUvMEAvAAAMAAACUvg");
	this.shape_6.setTransform(821.6,476);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#C7D4ED").s().p("EiAXBKYMAAAiUvMEAvAAAMAAACUvg");
	this.shape_7.setTransform(821.6,476);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#C6D1EB").s().p("EiAXBKYMAAAiUvMEAvAAAMAAACUvg");
	this.shape_8.setTransform(821.6,476);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#C5CEE8").s().p("EiAXBKYMAAAiUvMEAvAAAMAAACUvg");
	this.shape_9.setTransform(821.6,476);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#C4CBE6").s().p("EiAXBKYMAAAiUvMEAvAAAMAAACUvg");
	this.shape_10.setTransform(821.6,476);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#C3C8E3").s().p("EiAXBKYMAAAiUvMEAvAAAMAAACUvg");
	this.shape_11.setTransform(821.6,476);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#C3C5E1").s().p("EiAXBKYMAAAiUvMEAvAAAMAAACUvg");
	this.shape_12.setTransform(821.6,476);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#C2C2DE").s().p("EiAXBKYMAAAiUvMEAvAAAMAAACUvg");
	this.shape_13.setTransform(821.6,476);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#C1BFDC").s().p("EiAXBKYMAAAiUvMEAvAAAMAAACUvg");
	this.shape_14.setTransform(821.6,476);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#C0BCD9").s().p("EiAXBKYMAAAiUvMEAvAAAMAAACUvg");
	this.shape_15.setTransform(821.6,476);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#BFB8D6").s().p("EiAXBKYMAAAiUvMEAvAAAMAAACUvg");
	this.shape_16.setTransform(821.6,476);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#BEB5D4").s().p("EiAXBKYMAAAiUvMEAvAAAMAAACUvg");
	this.shape_17.setTransform(821.6,476);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#BDB2D1").s().p("EiAXBKYMAAAiUvMEAvAAAMAAACUvg");
	this.shape_18.setTransform(821.6,476);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#BDAFCF").s().p("EiAXBKYMAAAiUvMEAvAAAMAAACUvg");
	this.shape_19.setTransform(821.6,476);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#BCACCC").s().p("EiAXBKYMAAAiUvMEAvAAAMAAACUvg");
	this.shape_20.setTransform(821.6,476);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#BBA9CA").s().p("EiAXBKYMAAAiUvMEAvAAAMAAACUvg");
	this.shape_21.setTransform(821.6,476);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#BAA6C7").s().p("EiAXBKYMAAAiUvMEAvAAAMAAACUvg");
	this.shape_22.setTransform(821.6,476);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#B9A3C5").s().p("EiAXBKYMAAAiUvMEAvAAAMAAACUvg");
	this.shape_23.setTransform(821.6,476);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#B8A0C2").s().p("EiAXBKYMAAAiUvMEAvAAAMAAACUvg");
	this.shape_24.setTransform(821.6,476);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#B79DC0").s().p("EiAXBKYMAAAiUvMEAvAAAMAAACUvg");
	this.shape_25.setTransform(821.6,476);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#B69ABD").s().p("EiAXBKYMAAAiUvMEAvAAAMAAACUvg");
	this.shape_26.setTransform(821.6,476);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#B697BB").s().p("EiAXBKYMAAAiUvMEAvAAAMAAACUvg");
	this.shape_27.setTransform(821.6,476);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#B594B8").s().p("EiAXBKYMAAAiUvMEAvAAAMAAACUvg");
	this.shape_28.setTransform(821.6,476);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#B491B6").s().p("EiAXBKYMAAAiUvMEAvAAAMAAACUvg");
	this.shape_29.setTransform(821.6,476);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#B38EB3").s().p("EiAXBKYMAAAiUvMEAvAAAMAAACUvg");
	this.shape_30.setTransform(821.6,476);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#B28BB1").s().p("EiAXBKYMAAAiUvMEAvAAAMAAACUvg");
	this.shape_31.setTransform(821.6,476);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#B188AE").s().p("EiAXBKYMAAAiUvMEAvAAAMAAACUvg");
	this.shape_32.setTransform(821.6,476);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#B085AC").s().p("EiAXBKYMAAAiUvMEAvAAAMAAACUvg");
	this.shape_33.setTransform(821.6,476);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#B082A9").s().p("EiAXBKYMAAAiUvMEAvAAAMAAACUvg");
	this.shape_34.setTransform(821.6,476);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#AF7FA7").s().p("EiAXBKYMAAAiUvMEAvAAAMAAACUvg");
	this.shape_35.setTransform(821.6,476);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#AE7CA4").s().p("EiAXBKYMAAAiUvMEAvAAAMAAACUvg");
	this.shape_36.setTransform(821.6,476);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#AD7AA2").s().p("EiAXBKYMAAAiUvMEAvAAAMAAACUvg");
	this.shape_37.setTransform(821.6,476);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#AC779F").s().p("EiAXBKYMAAAiUvMEAvAAAMAAACUvg");
	this.shape_38.setTransform(821.6,476);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#AB749D").s().p("EiAXBKYMAAAiUvMEAvAAAMAAACUvg");
	this.shape_39.setTransform(821.6,476);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#AB719A").s().p("EiAXBKYMAAAiUvMEAvAAAMAAACUvg");
	this.shape_40.setTransform(821.6,476);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#AA6E98").s().p("EiAXBKYMAAAiUvMEAvAAAMAAACUvg");
	this.shape_41.setTransform(821.6,476);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#A96B95").s().p("EiAXBKYMAAAiUvMEAvAAAMAAACUvg");
	this.shape_42.setTransform(821.6,476);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#A86893").s().p("EiAXBKYMAAAiUvMEAvAAAMAAACUvg");
	this.shape_43.setTransform(821.6,476);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#A76590").s().p("EiAXBKYMAAAiUvMEAvAAAMAAACUvg");
	this.shape_44.setTransform(821.6,476);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#A6628E").s().p("EiAXBKYMAAAiUvMEAvAAAMAAACUvg");
	this.shape_45.setTransform(821.6,476);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#A65F8B").s().p("EiAXBKYMAAAiUvMEAvAAAMAAACUvg");
	this.shape_46.setTransform(821.6,476);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#A55C89").s().p("EiAXBKYMAAAiUvMEAvAAAMAAACUvg");
	this.shape_47.setTransform(821.6,476);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#A45986").s().p("EiAXBKYMAAAiUvMEAvAAAMAAACUvg");
	this.shape_48.setTransform(821.6,476);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#A35784").s().p("EiAXBKYMAAAiUvMEAvAAAMAAACUvg");
	this.shape_49.setTransform(821.6,476);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#A25481").s().p("EiAXBKYMAAAiUvMEAvAAAMAAACUvg");
	this.shape_50.setTransform(821.6,476);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#A1517F").s().p("EiAXBKYMAAAiUvMEAvAAAMAAACUvg");
	this.shape_51.setTransform(821.6,476);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#A14E7C").s().p("EiAXBKYMAAAiUvMEAvAAAMAAACUvg");
	this.shape_52.setTransform(821.6,476);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#A04B7A").s().p("EiAXBKYMAAAiUvMEAvAAAMAAACUvg");
	this.shape_53.setTransform(821.6,476);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#9F4877").s().p("EiAXBKYMAAAiUvMEAvAAAMAAACUvg");
	this.shape_54.setTransform(821.6,476);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#9E4575").s().p("EiAXBKYMAAAiUvMEAvAAAMAAACUvg");
	this.shape_55.setTransform(821.6,476);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#9C3F70").s().p("EiAXBKYMAAAiUvMEAvAAAMAAACUvg");
	this.shape_56.setTransform(821.6,476);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_28}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_31}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_33}]},1).to({state:[{t:this.shape_34}]},1).to({state:[{t:this.shape_35}]},1).to({state:[{t:this.shape_36}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_38}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_41}]},1).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_43}]},1).to({state:[{t:this.shape_44}]},1).to({state:[{t:this.shape_45}]},1).to({state:[{t:this.shape_46}]},1).to({state:[{t:this.shape_47}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_49}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_51}]},1).to({state:[{t:this.shape_52}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_54}]},1).to({state:[{t:this.shape_55}]},1).to({state:[{t:this.shape_55}]},1).to({state:[{t:this.shape_56}]},1).to({state:[]},1).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,1643.2,952);


(lib.eyeflare = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("ABuCPQgRgPABgYQABgNAHgLQAHgLALgGQAMgGANAAQANABALAGQASAKAFAVQAFAVgMASQgMATgXADIgHABQgTAAgOgOgADGAbQgIgBgFgFQgGgFgCgIQgBgIADgGQADgHAGgEQAHgEAHAAQAJAAAHAHQAIAGAAAIQABAIgEAHQgDAGgHAEQgGADgFAAIgEgBgAi5AZQgIgBgFgFQgGgFgCgIQgBgHADgHQADgHAGgEQAHgEAHAAQAJAAAHAHQAIAGAAAJQABAHgEAHQgDAGgHAEQgGADgGAAIgDgBgAjRhGQgRgQABgXQABgNAHgLQAHgLALgGQAMgGANAAQANABALAGQASAKAFAWQAFAUgMASQgNATgWADIgHABQgUAAgNgOg");
	this.shape.setTransform(22.6322,15.6718);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("ABECfQgRgPABgYQABgNAHgLQAHgMAMgGQALgGANABQAOAAALAHQASAKAFAVQAFAVgMARQgMAUgYADIgHAAQgTAAgOgNgADDBJQgIgCgGgFQgFgFgCgHQgCgIADgHQADgHAHgEQAGgFAIABQAJAAAHAGQAHAHABAJQABAHgEAHQgEAHgHADQgFADgGAAIgDAAgAjIAQQgIgCgGgFQgFgFgCgGQgCgIADgHQADgHAHgEQAGgFAIABQAJAAAHAGQAHAHABAJQABAHgEAGQgEAHgHADQgFADgGAAIgDAAgAjIhVQgRgQABgXQABgNAHgLQAHgMAMgGQALgGANABQAOAAALAHQASAKAFAVQAFAVgMARQgNAUgXADIgGAAQgUAAgOgNg");
	this.shape_1.setTransform(22.985,14.1218);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},4).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-3.1,45.3,34.5);


(lib.suns = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#B3D5FF").s().p("AwRbgQh0gshXhVQhohmguiRQgtiRAbiPQAciQBgh2QBfh2CHg4QCHg4CXAPQCXAPB5BRQBsBIBFByQBFByAOCBQANB4glB3QglB3hPBcQhPBbhwA3QhwA2h5AFIgaABQhsAAhngogAMvSRQhug7g4hoQgcgygMg3QgLguAAguIABgVQAFh2BJhmQBJhlBugrQBGgcBLAAQArAAAsAJQB6AYBVBTQBVBTAcB5QALAxAAAxQAABFgYBCQgoBvhjBMQhjBLh3AJIgeABQhmAAhfg0gAj3iQQjHgFi1hkQi2hjhtinQgyhKghhYQg8idAGiqQAIi7BbirQBbiqCYhvQCYhtC+giQC/ghC0AzQC+A3CWCOQCWCPBBC8QBBC9gfDLQggDNh2ChQh2Cgi5BcQiuBWi9AAIgUAAg");
	this.shape.setTransform(142.332,179.982);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.suns, new cjs.Rectangle(0,0,284.7,360), null);


(lib.moon = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Ah5IxQhtgihahJQhahKg3hjQggg6gTg/QgsiYAliXQApitCLh+QB5huCWghQgUAdgRAfQhBB7gECGQgFCIA5B/QA5B/BoBXQBoBWCJAhQCGAgCDgcQgOATgPATQhwCIixA1QhaAbhYAAQhUAAhSgZg");
	this.shape.setTransform(54.0725,58.6315);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_2
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#333333").s().p("AhtIoQh8gmhsgxQgpgSgYgPQgjgVgVgZQgfgigWg/QgWhIgOgjIgQgpQgIgZAAgTQAAgNAFgYQAGgbABgLQACgQgFgNQAFgMAAgRIgEghQgFgpAIgqQAMhAAngjQAKgKARgLIAdgTQAigWAzgvQA6g2AZgSIAugiQAagUAQgRQAUgVAGgXIABgFQCagoCjAvQDuBGB3DWQB2DXhGDpQgdBhg3BNQgMAAgPADQhkAXhHBLIgVAYQgNANgLAIQgRALgnAMQhDAVglAIQgyALgpABQgigFgvgOg");
	this.shape_1.setTransform(61.1649,56.1045);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-1,118.8,118.3);


(lib.johnnyheadback = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// hair
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#4C331F").s().p("ACrEOQgKAAgHgFIgGACQgMAEgLgFQgIgEgJgKIgQgQQgGgEgEgCQgSgJgSAGQgHADgEAEIgKAJQgMAKgNgDQgOgEgHgNQgGgRANgeQgGgDgEgHQgDgHAAgHQABgJAIgTIAHgNQgFgFgCgHQgGAAgDgIQgFgLADgVQgPgBgJgDQgSgGgFgPQgCgIACgLIADgJIgFACQgRAGgOgKQgQgLABgRQAAgNALgOIAGgGIgFgBQgXgCgRgPQgFgFgEgFIgFADQgKAJgOAFQgTAHgQgGQgIgDgHgHQgGgHgCgIQgDgPAOgUQAKgQANgIQAAgGACgFQAFgPANgJQASgLAnACQABgMAHgHIAGgEQgCgIgBgFQgBgTARgMQAQgLASAHQAFACAFAEQACgEAEgBQAHgEAPAAIATgGQALgCAIAFQAFADACAAQACAAAGgFQAHgFAIAAQAJAAAHAFQAGAFADAAQACAAAHgDQAIgEAJADQAIACAFAHQAFAHACAOIADAPIABAAQASABAIAQIACAEQAFABAFgCQAEgDAHgHQAHgGAKABQAKAAAHAHQAGAGACAJQACAKgEAJIgKAPIACABQAkARAHAeQACANgEANQgEAIgFAGQAHAMADAYQACATgBAKQgBAGgCAGQAMAHAHAMQAJAQgIARQgMAQgBAJQgBAEABAHIABAIIABAGQAAAEgCADQgCALgFASIAAABQABANgBAFQgCANgIAGIgHAEIACAWQABAlgPAPQgJAIgOAAIgDAAg");
	this.shape.setTransform(20.986,16.7798);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// beard
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#4C331F").s().p("AgIBoQgJgDgGgGQgIgHgBgJQgBgIAEgLQAFgRAKgDQAJgDAOAMQAEgYgCgUQgBgHgEgCQgCgCgHAAQgOABgLgLQgHAKgJAFIgIADIgIAJQgHAFgIgDQgHgDgFgNQgFgNgEgWIAEgDQADAIAEABQADAAAJgFIAKgGIAKgKQAIgIANgBQANgBAKAHIAKAIQAFADALAAQAMgBAFADQgBgKAGgJIAEgJIACgKQACgJAGgHQAGgHAJgCQAJgCAIAFQAJAEACAJQACAGgCAFQgCAFgFACQgJACgBACIAAAGQABAFgCAIIgEANQgBAEAAAPIACAeQADAVgBAHQgBAIgFAFQgFAGgGABQADAOAAAIQgBANgIAGQgHAGgTAAQgaAAgKgEg");
	this.shape_1.setTransform(11.1821,36.1714);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// face
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E4A985").s().p("AgaE5IgGgBIAEheIgBgjQAAgPABgLIgMgBQgkgGgegSQg8glgchHQgYg7AEhPQAFhaArg0QAmgtA5gLQAagFA1ADQAmADAYAFQAhAIAXAPQAZAQAXAgQAZAfAIAYQAKAegCA5QgBAugKAWQgDAIgIAMIgNASQgMAbgHANQgSAig3AiIABACQAFAKACAOIAEASIABAYIAAAUIAEACIgQApQgKAbgNANQgYAYgoAAQgNAAgPgDg");
	this.shape_2.setTransform(21.5631,31.575);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-10.2,49.9,73.4);


(lib.groundtomove = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#6A3439").s().p("EiYhAjpMAAAhHRMExDAAAMAAABHRg");
	this.shape.setTransform(976.225,228.075);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,1952.5,456.2);


(lib.glow = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#6F96AB").s().p("EgkBAkCQpQpQjhroQiKnJAAoBQAA1GO7u7QO7u7VGAAQVHAAO7O7QCjCiCGCuQKSNRAARgQAAVHu7O7Qu7O71HAAQ1GAAu7u7g");
	this.shape.setTransform(326.1,326.1);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.glow, new cjs.Rectangle(0,0,652.2,652.2), null);


(lib.girlheadback = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// hair
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#C3A16A").s().p("AAEHAQgRgBgTgMQgNgIgTgTQgSgSgIgMQgMgSgBgRQgGAbgTAUQgUAUgZABQggABghgdQgcgZgKgbQgLgcAEgvIAFhFQgOAAgMgLQgMgLgIgSQgag7AQhaQAEgWAOg1QAMgvAEgcIAFglQAEgUAFgPQAIgSAMgNQAOgPARgDIANgCQAHgCAFgDQAIgEAFgKQADgGADgOQAKgoAKgQQASgfAbgHQAJgDAWAAQAUgBAKgDQAMgFAWgPQAfgQAfAMIAaAOQAQAIALAAQAKABAMgGIAVgJQAmgQAnABQApABAVAUQAQAPAEAcQADASgBAgIgBAVIABADQAGAXgBAmIAABKQAAAUAEAKQADAFAFAGIAJAKQAQAUAFAtQANBsgNByQgGAvgKAZIgLAXQgHAPgDAJQgHARgIAnQgJAhgSAPQgHAGgMAHIgVAKIgUAMQgLAHgJAEQgfALgfgQQgfgRgJgfQgGAbgSATQgUAVgZAAIgBAAg");
	this.shape.setTransform(20.8898,37.2498);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// face
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFC3C3").s().p("AALG4QgEgBgGABIgEAAIgIAAIgDgCIgCgBIgDgCIgDgDIgCgCIgCgBQgBgDAAgEIgHgIQgHgJgDgKIgDgIIgCgEIgCgDIgCgDIAAhOIgMgLIAIgBIAChSIACgWQg6gJglgYQgSgNgcgcQgjgkgRgTQgegjgRgkQgeg+AIhMQAIhIApg8QAQgYAtgyQAWgYAMgLQAVgSATgJQAegNA7gCQBOgEAtAQQAlAMAvAhQAuAhAaAgQAWAbAbAyQAaAvAEAcQACAQgBAXIgCAnIABAmQAAAXgDAPQgHAogkAlQgYAZgwAhQgzAkgaAKQgkAOg1ACQADAOAAAVIABBLIABAAIABArQABAVgDATQgCARgEARIgDANIAAADIgLAKIgFAAg");
	this.shape_1.setTransform(31.7313,44);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13.2,-7.5,76.7,95.5);


(lib.johnnymouth = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// top_lip
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("Ah9A7QgxgHgsgRQg0gUgJggQgHgTALgPQAGgHAJgCQAJgCAIADQAGAEAFAKIAKAQQAIALAVAIQA7AUA5AAQAVAAAqgDIBEgGQBBgFAggFQA1gKAngSQASgJAJAEQAJADADALQACAKgFAJQgHALgYAKQgxAVhBAKQgpAHhOAGIhFAFIgXABQgaAAgWgDg");
	this.shape.setTransform(29.2683,5.8111);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(21));

	// bottom_lip
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("Ah9A7QgxgHgsgRQg0gUgJggQgHgTALgPQAGgHAJgCQAJgCAIADQAGAEAFAKIAKAQQAIALAVAIQA7AUA5AAQAVAAAqgDIBEgGQBBgFAggFQA1gKAngSQASgJAJAEQAJADADALQACAKgFAJQgHALgYAKQgxAVhBAKQgpAHhOAGIhFAFIgXABQgaAAgWgDg");
	this.shape_1.setTransform(29.2683,5.8111);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("Ag8BLIgQgBQgggCgYgEIgBgBQgegGgagKQgSgIgQgJQgLgHgJgHQgbgUgFgaIgBgCQgFgVALgOIACgCQAFgGAHgCIAHgBQAGgBAFADIAGAEQAEAEADAGIACAFIAGANIABADQAHALAQAIQAZASAeAIQAYAGAeAEIADAAQAZADAmgCIABAAIApgCIAegCIAJgBQATgDATgFIAzgNIACAAQAagJAVgMIAKgGQAMgCAMgFIAGgDIAOgGQAIgCAGABIAAAAQAGAEACAJIABADQACALgFAJQgHAPgVAKIgeARQgkAQguANIgHACQgWAGgZADIgyAGIgSAAQgeACgVAAIgWAAg");
	this.shape_2.setTransform(28.2229,7.2208);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgqBZIgXgCIgRgCQgigEgXgGIgCAAQgfgJgYgNQgRgJgPgMQgKgJgIgJQgWgXgEgeIgBgBQgDgWAKgPIACgCQAGgGAHgCIAHgCQAHAAAFACQAEABACADQAEAEADAHIACAFIAFAOIABAEQAFAMAMALQAVAYAdALQAXAJAgAGIAEABQAeAGAigBIABAAIArAAQARAAAOgCIAJgCQATgDAVgIIAygUIACAAQAZgNASgRIAIgIQANAAANgFIAHgDIAPgHIANgDIAAABQAFAEACAKIAAADQABAMgFAKQgGAQgTANQgMAKgPAKQgiAWgwASIgHACQgYAKgYAEQgVADgfACIgTAAIgcABIgYgBg");
	this.shape_3.setTransform(27.1737,8.72);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgvBnIgXgEIgRgDQgkgHgXgHIgCgBQgggLgXgPQgRgMgNgOQgJgKgHgLQgSgbgCggIAAgBQgCgYAKgOIACgDQAFgGAIgDIAHgBQAHgCAGADIAGAEQAFAEACAIIADAFQACAHABAJIABADQADAPAJAMQAQAeAcAQQAVAKAjAJIAEABQAjAJAfABIABAAIAtABQASAAAOgCIAKgCQARgEAXgMQAigRAQgJIACgBQAXgQAQgVIAGgKQAOABAOgFIAIgDIAPgHIANgFIAAAAQAEAGABALIAAADQAAAMgEALQgGASgQAPQgMANgOAMQggAagxAXIgHAEQgaAMgXAEQgUAEgiACIgTAAIgJAAQgaAAgUgCg");
	this.shape_4.setTransform(26.109,10.276);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AAGB4QghgBgYgDIgYgFIgSgFQgmgJgWgJIgCAAQghgOgXgSQgPgNgMgRQgHgMgGgNQgPgeAAgkIAAAAQAAgaAKgOIACgDQAFgGAIgDIAHgCQAHgBAHACQAEABACADQAFAFADAIIACAFIACARIAAAEQACAQAFAOQAMAlAbATQAUANAmALIAEACQAoAMAcACIABAAIAvACQATABAOgCIAKgCQAPgFAagPQAjgWAOgLIABgBQAXgUAMgaIAGgMQAOADAQgFIAIgDIAQgIIANgHIAAABQADAGAAAMIAAADQgBANgEAMQgGATgNARQgKAPgPAOQgdAggzAcIgHAEQgcAQgVAFQgUAEglABIgKAAIgJAAg");
	this.shape_5.setTransform(25.05,11.8554);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("Ag3CBQgVgEgXgIQgqgNgVgKQgigPgVgWQgZgZgMglQgKgiACgnQABgeAMgOQAIgJAMgDQANgCAJAHQAHAGACANIABAXQgBBDAlAgQARAPApAOQAwARAaADQARADAhABQAdACAPgFQAPgFAcgTQAlgdANgMQAUgYAKgfIAEgNQAPAEARgEQAMgEAOgIIANgJQABAIAAAMQgFA3goAxQgeAmg5AkQgeAUgUAEQgTAFgoABQgvAAgfgHg");
	this.shape_6.setTransform(23.9903,13.4421);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AgNCWQgagBgUgEIgUgFQgNgDgOgGIgfgMQgUgJgOgIQghgUgVgaQgHgJgHgKQgNgXgHgaQgKglADgpIAAgBQABgWAHgNQADgHAEgEQAIgJALgCIADgBQAIgBAFADQAGADADADIADAFQADAGAAAKIAAABIAAASIAAAGQgBAwARAjQAHAOAKAMQAQASAhAPIAIAEQAuAWAfAEIABAAQAPACAaAAIALAAIATAAQAOgCALgDIADgCQALgFAPgMIAOgMIALgLQAZgXAMgQQAUgbAMggIAFgOQAJgBAKgCIALgEQANgEANgGIACgBIAPgJIACAFIACAOIgBANQgCAKgDAKIgJATIgOAbQgJAPgLAQIgHAJQgRAXgSAQIgfAeIgJAJQgOALgMAHQgNAIgLAEQgOAGgXADIgZACIgUAAIgSAAg");
	this.shape_7.setTransform(24.049,14.9375);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AhAChIgUgFQgPgEgOgHQgRgGgQgJQgUgLgOgLQgggWgUgfQgHgKgGgMQgNgZgHgcQgJgnAEgsIAAgBQACgYAHgOQADgGAFgFQAJgJAMgCIADAAQAIAAAGAEQAFADADAEIACAGQADAHgDALIAAAAIgBATIAAAHQgBAxAQAoQAHAPAKAOQAQAXAeARIAIAGQAsAbAlAEIABAAQAQACAcAAIAMgBIATgCQAPgCALgEIADgDQAMgGAOgOIANgOIAJgNQAWgZAOgVQATgdAQgjIAGgPIARgIIAKgGIAAAAQAPgDANgFIADgBIAQgIIAEACQADAHAAAIQABAHgBAGQgCALgFAKIgKAUIgQAdQgJARgMARIgGAKQgTAcgPAPIgdAjIgIAKQgNANgLAJQgNAJgMAGQgQAHgXAEIgaAEQgVACgUAAQgcAAgWgEg");
	this.shape_8.setTransform(24.0843,16.45);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AhECwIgWgFQgPgEgQgHQgSgIgQgLQgTgMgPgNQgggbgUgjIgMgYQgMgbgGgeQgIgqAFguIAAgCQACgaAIgOQAEgHAEgEQAKgKANgBIAEAAQAIAAAGAFQAGAFACAFIABAGQABAHgEAMIAAABQgCAGAAANIAAAHQgBA0AQAsQAGARAJAPQAQAcAcAVIAIAGQArAgAqAFQASACAdgCIAMgBIAUgCQAQgEAMgGIADgCQAMgIANgPQAGgHAGgLIAJgOQASgbAQgaQASggASglIAHgPIAQgNIAJgIIABAAQARgDANgFIACAAQAKgDAJgFIAEABQAFAGABAJIAAAOQgCAKgGALQgEAIgIAMIgSAfIgVAlIgHAKQgUAigMAOIgaApIgHALQgMAQgMAKQgMAKgNAHQgQAKgYAGQgMADgQACQgVADgXAAIgGAAQgaAAgUgEg");
	this.shape_9.setTransform(24.1523,17.9528);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AhJDAIgXgFQgQgFgQgIQgSgJgRgNQgUgNgPgQQgfgegTgoIgLgaQgMgdgFggQgIgtAGgxIAAgCQACgbAJgPQAEgHAFgFQALgKAOAAIAEAAQAIABAHAGQAFAFACAGQABADAAAEQAAAIgHANIAAAAQgCAIgBANIAAAHQgBA2APAwQAHATAIAQQAQAhAZAYIAIAHQApAlAwAFQATACAfgDIANgBIAUgDQARgEAMgIIAEgCQAMgKAMgRIALgUIAHgQIAhg8IAnhKIAIgPIAOgSIAIgLIABAAQATgCANgEIADAAQAKgDAKgEIAGgBQAGAGABAJQACAHgBAIQgCAKgHAMIgOAUQgIALgMAWIgVApIgHAKIgfA0IgXAuIgHAMQgLATgLALQgMALgOAJQgSALgYAIQgNAEgQADQgWADgZABIgMAAQgYAAgUgDg");
	this.shape_10.setTransform(24.2037,19.4725);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AhlDLQgkgLgigcQhCg1gdhXQgahNAKhaQADgdAJgPQAPgXAWAAQAMABAIAJQAJAKgCAKQgBAIgJAOQgDAIgBAOQgCA8AQA5QARA9AjApQArAxA5AHQAVACAhgEQAVgDAMgDQASgFANgJQAPgLAMgVQAGgNALgcQAchHBBhxIAIgNQAVgCAOgDQAQgDAQgHQAMAMgCATQgCALgIAMIgQAVQgIALgNAYIgdA3QgYAsgFAMIgVAzQgNAegPARQgZAegsAPQghAMgvACIgVABQgjAAgcgIg");
	this.shape_11.setTransform(24.2403,20.9833);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1}]}).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_1}]},1).wait(1));

	// insidemouth
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#531515").s().p("AjeAsQgHgDgCgCQgEgCgGgFIgMgHQgHgEgEgEQgKgJABgRQABgMAGgRQAGgBACgFQAFAAAGACIAHAEQAGAHAEAJIACADIACAEQAJAOADACQAHAHAXAGQAkAHAiAEIAYACQAJABAggCQB6gJA9gKIA2gJIAdgGIAcgLIAUgHIADAEIAFAIIABAEIAAADIgFAIIgEALIgGAFQgFADgJADIgjAOQgLAEgKACIgDgBQgIgDACgHIhdAMIgOgBQgOgBgbgFIglAAQiUADhCAFg");
	this.shape_12.setTransform(29.5406,4.475);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#531515").s().p("AC3AzQgEgBgBgCQgDgCABgDIgXAAIgBAAIgHgBIgegBIgaAAIgNgDIgngHIgRgCIgUAAIiOgBIgSACQgXABgSADIgDAAIgFABIgDAAIgCAAIgBgBIgKgDIgFgCIgFgEIgMgHIgDgBIgGgGQgJgKABgOIAAgCQABgNAHgPQAFgCACgEIAAgBQAGAAAFABIAIACIAFAGIAGAHIACADIADADIAFAGIAIAIIALAGIATAHIAEABQAaAFAbAEIAMABIAYACQAKABAegBIAGAAQBIgFAygGIAcgCIAZgEIAGgBQAXgEATgBIAGAAIAKAAIAOAAIABAAQACABAKgDIACAAIAIgCIAFAAIALgBIAAABIACADIACAIIABADIAAAAIgBACIgGAIIgDAEQAAABAAABQgBAAAAABQAAAAgBABQAAAAAAAAIgHAEIgBgBIgGADIgHADIgFAEQgJAHgMAGIgBABQgKAFgJACIgDAAg");
	this.shape_13.setTransform(28.1143,5.9667);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#531515").s().p("ACvA4QgDgBAAgDQgKAAgMgCIgCgBIgFgCIgagHIgZgDIgNgEIglgJIgRgDIgUgBQhOgEg+gBIgSABQgXACgSAEIgDAAIgFABIgDABIgCAAIgBAAIgLgBIgFgCIgFgDIgLgIIgDgBIgFgGQgIgIACgQIAAgBQACgNAGgOQAFgDADgDIAAgBQAEgBAGAAIAHABIAGADIAHAHIADACIADADIAFAEQAGAGAEABIALAFIASAHIAFABQAYAHAcAEIAMABIAXACQAMABAcgBIAGAAQBHgDAygGIAcgEIAYgDIAGgBQAYgEASABIAFABIAJADIAMAEIAAABQABADAHgBIACAAIAHABIAEABIAHADIAAABIABADIgBAHIABACIgBAAIgBADIgHAGIgDADQgBABAAAAQAAABgBAAQAAAAgBABQAAAAAAAAIgHACIgCAAIgFACIgHADIgCAEQgGAJgKAIIgBABQgIAGgKACIgDAAIgFgCg");
	this.shape_14.setTransform(26.68,7.575);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#531515").s().p("ACwBCIgGgBIgEgDQgJAAgNgFIgBAAIgEgFQgIgGgPgGIgXgHIgNgEIgjgMIgRgEIgTgCQhLgHhAgCIgSABQgXADgRAFIgDABIgGAAIgDABIgDABIgBAAQgGABgEgBIgGgBIgFgCIgLgIIgCgBIgEgEQgHgLADgPIAAgBQACgNAHgNIAHgGIAAAAQAEgCAGgBIAHgBIAGACIAIAFIAEACIADACIAGAEIAKAEIAMAFIARAHIAFACQAWAGAdAEIAMABIAYACQANACAaAAIAGAAQBGgCAxgGQAOgCAOgDIAZgCIAGgBQAYgDAQADIAGABQAEACADADQAHAEACAEIABACQAAAEADACIABABIAHAEIADACQADAEAAADIAAAAIAAADQgBAEgDADIABACIgBAAIgCACIgIAFIgDACQgBABgBAAQAAAAgBABQAAAAgBAAQAAAAgBAAIgHABIgCAAIgEACIgGABIgBAGQgBAKgJAKIgBABQgHAGgJADIgDAAg");
	this.shape_15.setTransform(25.4421,9.1);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#531515").s().p("ACkBLIgFgDQgJgBgMgGIgBgBQAAgDgDgCQgFgJgPgJIgVgLIgNgGQgNgHgUgGIgQgFIgTgDQhIgJhCgEIgRABQgYADgRAGIgDABQgDABgDgBIgDADIgDABIgBAAQgGADgFgBIgGgBIgFgCQgFgDgFgDIgCgCIgDgFQgGgKADgQQADgOAHgLIAHgGQAEgDAFgCIAIgDIAFAAIAKAFIAFACIAEABIAGABIALAEIALAEIASAHIAEACQAVAHAeAEIAMABIAXACIAmADIAHAAQBFgBAwgGIAcgGIAZgCIAGgBQAZgDAOAGIAGADQAEADADAEQAFAGABAHIAAABQAAAHgCAEIACABIAGAGIABADQACAGgBAGIAAAAIgCADQgCAFgFADIABAAIgBABIgDABIgIADIgFACIgFAAIgHAAIgDgBIgEACIgFABIACAHQADALgIALIgBABQgGAIgIADIgDABIgHAAg");
	this.shape_16.setTransform(24.2571,10.6);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#531515").s().p("ACEBJIgCAAQABgEgCgEQgDgLgOgNQgcgXgzgSQhOgPhNgHIgSABQgXAEgSAJIgDAAQgCABgEAAIgFAEQgJAFgKgCQgKgCgGgIQgIgMAEgTQAFgTANgLQAIgIAOgEQAMAEAPACIAYAEIAVAKQATAIAfAEQAbAEAzACQBGABAvgHIAcgFQALAAATgDQAagDANAIQAIAFAEAIQAEAJgBAIQgBALgFAHIABABQAGAGAAAIQAAAIgEAHQgEAHgIADQgHAEgMgBQgHAAgJgDIgEACIgFABIAFAHQAIAOgIANQgIAOgPgBIAAAAQgLAAgPgLg");
	this.shape_17.setTransform(23.1611,12.026);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#531515").s().p("ACJBVIgIgFIgBAAQAAgEgCgEIgBAAQgEgKgIgIIgGgGIgJgHQgOgKgWgJQgRgIgVgHQg0gKgxgFQgVgCgYAAIgNgBIgSACIgJACIgJADIgCABIgNABIgHABIgCAAIgFgBIgEACQgGACgGgCIgDgBQgHgEgFgGIgEgHQgDgKADgOIAAAAIACgIIADgKQAEgHAGgGIABgBIAAgBQAEgFAHgEIAJgFIACABQAMAFAPACIAGACIATADQAGACAQAHIAPAFQAOAEAWADIAGABIArAEIAfABIAZAAIAeAAIAdgDIAkgDIASgDIAKgCIAfgDIAFAAQAKgBAIACQAKACAGAFIAEAEQAEAEACAGQACAFgBAFIgBAHQAAAFgCAEIgEAIIABACIACAHIAAAGQgBAHgFAGQgFAHgHADIgFACIgCAAIgGACIgEABQgFABgIAAIgCAAIgCACIgFACQADAEAAADIABAEIAAABQADAJgDAJIgBADQgGALgKADIgGABIgEABQgHAAgJgFg");
	this.shape_18.setTransform(23.2108,12.4161);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#531515").s().p("ACHBcIgJgFIgBAAQgBgEgCgEIgBgBQgGgKgHgHIgHgGIgJgIQgOgJgYgKQgSgHgVgHQg3gMgxgCQgUAAgbAAIgMAAIgSACIgKADIgJAEIgCAAQgIAAgFgCIgFgBIgCgBIgDgCIgDgBQgEAAgDgCIAAgCQgIgEgFgGIgEgHQgEgKADgPIAAAAIADgIIACgKQADgIAHgGIABgCIAAAAQADgGAGgFIAKgGIACACQANAGAPADIAGACIAUADQAHACAPAHIAPAEQAOAEAYACIAGABIAsAEIAfACIAaABIAfgCIAdgCIAmgDIASgDIALgCQANAAASgDIAFgBQAKAAAIADQAKADAGAGIADAEQADAFABAGQACAFgCAFIgCAHQgBAFgDADIgDAJIABABQABAEgBADIgCAFQgBAHgGAFQgHAGgHADIgFACIgCABIgEADIgCACQgEADgHABIgBABIgCACIgFADQABADgBADIAAAEIgBABQAFAJgDAJIgBAEQgFALgLAEIgFACIgGABQgHAAgHgEg");
	this.shape_19.setTransform(23.3232,12.8141);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#531515").s().p("ACDBjIgIgFIgBgBIgFgHIgCgCQgHgKgHgGIgGgGIgKgIQgNgJgagKIgogNQg6gNgxAAQgTgBgdACIgNABIgSADIgKADIgJAFIgDAAQgHgCgFgEIgEgCIgBgCIgDgEIgBgDQgBgCABgEIABgCQgIgDgFgHIgEgHQgEgLADgOIAAgBIACgIIACgLQACgIAHgGIABgCIAAAAQACgHAHgFQAEgFAGgCIACABQANAHAQAFIAGABIAUAFIAXAHIAQAFQAMADAaACIAGABIAsAEIAgADIAbAAIAfgCIAfgCIAngEIASgCIALgBIAggEIAFgBQALAAAIAEQAKADAEAIIADAEQADAGABAGIgCALIgDAGIgFAIQgBAEgCAEIAAACIgCAGIgCAFQgEAFgGAFQgIAGgGACIgFACIgCACQgBAAAAAAQgBABAAAAQAAABgBAAQAAABAAAAIgBAEQgCAEgGAEIgBABIgCACIgFADQAAAEgCADIgCADIAAAAQAEAKgCAKIAAAEQgFALgKAFIgGACQgFABgEAAQgGAAgGgCg");
	this.shape_20.setTransform(23.4857,13.2266);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#531515").s().p("ACABpQgEgBgEgDIgBgBIgGgHIgDgDIgPgQIgGgFIgKgIQgNgKgcgJIgogMQg+gOgxABQgTABgfADIgNACIgSADIgLAEIgJAFIgDgBQgHgCgEgHIgDgDIgBgDIgBgGIABgFQABgFAEgEIADgDQgJgDgEgHQgDgEgCgEQgEgLADgOIAAgBIACgIIACgLQABgJAHgGIABgCIAAgBQACgHAGgGQAEgFAGgDIADACQANAIAQAGIAHABIAUAFIAYAGIAQAFQALACAcADIAGABIAtAEIAhADIAbAAQAOAAASgCIAggDIApgDIASgCIALgBQARgCAQgDIAEAAQAMAAAIAFQAJAEAEAJIACAFQADAGAAAFQgBAGgCAGIgEAGIgHAHQAAAEgCAEIgBADQgBADgDADIgDAEQgFAEgHAFIgPAGIgFACIgCADQgBAAAAAAQAAABAAAAQgBABAAABQAAAAABABIAAAEQgBAHgEAFIgBACIgCACIgEAEIgGAGIgDADIAAAAQAFAKgBAKIgBAFQgEALgKAGIgGACQgFACgFAAQgFAAgGgCg");
	this.shape_21.setTransform(23.64,13.6375);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#531515").s().p("AB9BwQgFgBgEgDIgLgMIgQgPQgKgJgHgFQgNgJgegKQhagbhBAEIgzAHQgfADgLAHIgKAGIgDgBQgHgEgDgJQgEgIACgJQADgPAOgIQgNgEgFgOQgEgLADgPIACgJIABgLQABgJAHgHIABgDQABgIAGgHQAEgFAGgDQARANAXAHIA9AOQAMADAiADIAvAEQAjAEAaAAQANAAAUgDIAggDIA9gEQAcgDAVgEQAMABAJAFQAKAHADANQADAOgGAKQgFAHgIAFQgBALgIAHQgGAFgNAFIgUAIIgCADQgCABACAEQADAMgFALQgGALgMAEIgBAAQAGAKAAAKQgBAPgOAJQgJAGgJAAIgIgBg");
	this.shape_22.setTransform(23.8124,14.0615);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#531515").s().p("ACEBnQgEgBgFgDIgGgGIgBgBIgDgDIgDgFIgMgMIgJgJIgHgFQgOgJgcgKIgogMQg+gOgyABIgzAEIgCAAIgSADQgNADgIADIgKAGIgDgBIgEgCQgEgCgCgEQgEgCgBgFIAAgFIACgIIADgDIAEgDIABAAIgEgBQgFgCgEgEQgDgEgCgGIAAAAIgBgHIgCgIIAAgIIAAgCIACgIIAAgBIACgIIAAgCQgBgGAEgFIADgEIABgDIABgCIABgCIABgCIAEgIIAEgEIAFgEQAIAEAJACIAEACIALACIACABIACAAIAMABIAcAHIAVAEIAGABIAXAFIAQADIAjADIALABQAhAEAcAAIAJAAIAYgCIAfgCIA9gFIAJgBIAcgEIALgCQALABAJAEIABABQALAFAEAKQADAIAAAHIgCAGQgBAEgDAEIgEAFQAAAFgCAFQgCAEgDAEIgGAFIgBABQgDADgFAEIgNAHIgFADIgCACQgCACABADQABAKgFAHIgCACQgDADgFADIgFAEIgFACIAAABIgBAAIADAFQADAHAAAIQgBAHgEAHQgDAFgGAEQgHAEgHABIgEAAIgJgBg");
	this.shape_23.setTransform(23.3911,13.9417);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#531515").s().p("ACLBeQgEgBgFgDIgGgGIgCAAIgCgEIgCgEIgLgNIgJgJIgHgFQgOgKgagKIgogNQg7gNgzgBQgUAAgeACIgCAAIgSACQgNADgJAEIgJAEIgDAAIAAAAIgDgBQgEAAgEgCQgEgBgBgDIgBgDIgBgEIABgBIACgCIgBAAIgEAAQgFAAgDgFQgDgDgBgGIAAgBIgCgHQgCgCgBgFIgBgIIAAgBIACgIIAAgBIADgHIgBgCQAAgHADgEQAAgCACgCIABgDIACgCIABgBIABgCIADgIIAEgEIAEgEIAPABIAEABQAEgBAGABIACABIACgBIAMAAQANAEAOADIAVAEIAFABIAXAGIAQADIAjAFIALABQAfADAdABIAJAAIAYgCIAfgCQAlgCAXgCIAIgBIAcgFIALgBQAKAAAJADIACABQALADAGAIQAFAGABAGIAAAGIgCAIIgCAGIgBAKIgFAIIgFAGIgBABQAAAFgEADIgLAKIgEADIgDADQgCABAAADQgBAIgHAFIgCACQgEACgFABIgFAEIgFACIAAABIAAABIADAEQADAHAAAHQAAAIgFAGQgDAGgGADQgGAFgIABIgCAAQgFAAgFgCg");
	this.shape_24.setTransform(23.0125,13.83);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#531515").s().p("ACRBZIgJgEIgHgFIgBgBIgBgDIgDgFQgEgHgFgGIgKgJIgGgFQgOgLgYgKQgTgHgVgGQg5gMgzgDQgVgBgcABIgDAAIgRACQgNACgJADIgJAEIgCAAIgBAAIgDABIgIAAQgFABgBgCIgDAAIgDAAIgBAAIgBABIgBAAIgEAAQgFAAgEgFQgCgCgBgGIAAgBIgCgIQgDAAgCgEQgBgEAAgEIAAgBIACgIIAAgBQABgFACgBIAAgCQgBgHACgEIACgEIACgDIABgBIACgBIAAgDIAEgHIACgEIAEgEIANgDIADgBQADgDAGABIADAAIABAAIAMgBIAcAGIAUAEIAFABIAWAHIAQAEQAQADATACIALABQAcADAfABIAJAAIAXAAIAfgCQAjgCAYgDIAIgBQAOgBAOgDIALgBIATABIABAAQAMACAIAGQAGAFACAFIADAFIABAIIgCAHQABAFgBAEQgBAGgDAEIgFAGIAAABQACAFgDAFIgIAMIgEADIgDADIgDAEQgDAGgJADIgCACIgKABIgFADIgFABIABACIAAABIACAEQAEAHAAAHQAAAHgEAHQgEAFgFAEQgGAFgIAAIgDAAQgFAAgEgCg");
	this.shape_25.setTransform(22.7688,13.3143);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#531515").s().p("ACVBWIgIgFIgHgFIgBAAIgBgDIgCgFQgDgHgFgHIgKgJIgGgFQgOgLgXgKQgSgIgVgHQg2gKg1gFQgWgCgZgBIgDAAIgRACQgNACgJAEIgJADIgCABIgCAAQAAAAAAAAQAAABAAAAQgBAAAAAAQAAAAgBAAQgDACgFABIgHACIgEACIgGAEIgDADQAAAAAAABQgBAAAAAAQgBAAAAABQgBAAAAAAIgDAAIgDABQgFACgEgGQgCgCgBgHIAAgCIgBgGQgEAAgDgEQgCgEAAgEQAAgEACgEIAAAAQABgFADgBIAAgBQgCgIABgDIACgEIACgDIACgCIACAAIAAgCIADgHIACgEIACgEQAGgFAHgEIABgCQADgEAGAAIADABIABgBIALgDQANAEAPACIAUAEIAEABIAWAIIAQAFQAPAEAUACIALABIA6AFIAJAAIAXgBIAegBQAigBAZgDIAHgBIAcgFIAKgBIATAAIACAAQANAAAIAEQAIADAEAEIAEAFIAEAIIAAAIQABAEgBAFIgDAJIgEAHIABACQADAFgBAGQgBAIgFAGIgEAEIgCADIgFADQgFAFgKABIgDABIgLgBIgFACIgFACIACACIAAABIACAEQAEAHAAAGQAAAHgEAHQgEAGgEADQgHAFgIAAIgCAAQgEAAgGgCg");
	this.shape_26.setTransform(22.62,12.6792);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#531515").s().p("ACKBJIgCAAQABgEgCgEQgDgLgOgNQgcgXgzgSQhOgPhNgHIgSABQgTAEgPAFIgBADQgEAEgFADIgJAEIgOAMIgEAFQgCADgEABIgDABIgEACQgFACgEgGQgBgCgBgHIgBgKQgFACgDgEQgCgDgBgEQAAgEACgEQABgFAEAAQgDgIABgDQAAgHAGgCIACAAIAAgCIACgHIABgDQAFgLAIgHIABgDQACgHAGABIACAAQAGgDAHgCQAMAEAPACIAYAEIAVAKQATAIAfAEQAbAEAzACQBGABAvgHIAcgFQALAAATgDQAagDANAIQAIAFAEAIQAEAJgBAIQgBALgFAHIABABQAGAGAAAIQAAAIgEAHQgEAHgIADQgHAEgMgBQgHAAgJgDIgEACIgFABIAFAHQAIAOgIANQgIAOgPgBIgBAAQgKAAgPgLg");
	this.shape_27.setTransform(22.5728,12.026);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#531515").s().p("ACsBGIgEAAQgLABgQgJIgBAAQgBgDgCgDQgFgJgPgJIgRgJIgOgHQgOgHgVgHIgQgFIgVgDQhFgJhAgEIgSABQgTADgPAFIgCACIgJAFIgJAEIgIAGIgDABIgDACIgEAEQgDACgDAAIgDAAIgCABIgCAAQgEABgEgEIgBgBQgDgCgBgHIAAAAIgCgJQgEABgDgDIgCgIIAAgBQgBgEACgEQABgFAEgBIgBgKIAAgCIADgGQAAAAABgBQAAAAABAAQAAAAABAAQAAAAABAAIACgBIABgBIABgCIACgDIABgBIAKgKIADgBIAAgBIABgBIAAAAQACgEAGABIACABIAHgCIAEgBQALAEAQADIAYAEQAGABAPAHQAKAEANADIAYAEIAEAAQAPACAYABIAmABQBGAAAwgHIAbgFIAegDQAOgCALABQAJABAGACQAHAEAFAGIAGAMIAAAIIgCAFIACABQAFAFABAGIAAAAIABADIgBAJIgBACIAAABIgCADQgDAFgFACQgFAEgEAAIgJACIgOgBIgBAAIgFABIgFABIADAHQACAHgDAHQgBAFgEAEIgGAGIgCACQgEABgEAAIgCAAg");
	this.shape_28.setTransform(23.895,10.8893);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#531515").s().p("ACuA4IgEAAQgLABgQgGIgBAAIgEgEQgIgGgOgHIgTgGIgOgFQgOgGgXgGIgPgEIgWgCQhHgGg+gDIgSABQgSADgQACIgCACIgJAFIgIADIgJAEIgDABIgDABIgFACQgCABgDAAIgDgBIgCAAIgCABQgEAAgFgEIgBgBQgDgDgCgFIAAgBIgDgHQgDAAgDgEIgCgIIAAgCQAAgFACgEQABgEADgCIAAgKIABgCIADgGIAEgBIACAAIABgBIACgBIACgCIACAAIABAAQAEgDAFgBIACAAIACAAIAAAAQACgCAFACIACABIAGAAIAFAAQAKAEAQADIABAAIAYAFQAHABAOAGIAXAGIAYADIAEAAQANACAZAAIAnAAQBGgBAvgHIAbgFIAegDQAOgCALAAIAPACQAIACAEAEQAEAFAFACIADAFIABADIABABQAGADACAEIAAABIABADQABAEgBAEIAAACIAAABIgBADIgIAIIAAAAQgEAFgEABIgHACIgOABIgCAAIgEACIgGABIAAAGQAAAGgEAGIgHAIIgHAFIgCABIgDAAQgEAAgCgCg");
	this.shape_29.setTransform(25.2533,9.7143);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#531515").s().p("ACwAuIgDAAQgMACgPgEIgCAAIgFgCIgZgHIgVgDQgIgCgFgDIgmgJIgQgDIgWgBIiFgGIgRACQgTABgPAEIgDABIgJACIgIADIgIAEIgDgBIgEAAIgFABIgFgBIgEgBIgCAAIgBAAQgDgBgHgEIgBgBQgDgDgDgFIAAgBIgDgHQgEgBgBgCQgCgEAAgEIAAgEIABgJQABgEACgDIABgLIACgBQADgCABgEIAEAAIACAAIACAAIACgCIADAAIACAAIABACIAJACIACABIAAAAIACABIAAAAIAGACIADADIAFABIAEABQAKAEARAFIAYAEIAWAGIAXAFIAYADIADAAQANABAaAAIAngBQBGgDAvgGIAbgFIAdgEIAagDIAOAAQAIAAAFADQADADAJAAIAGABIACABIACAAIAJAFIAAAAIABADIACAJIAAADIAAABIgBACQgDAEgEAEIAAAAQgDAGgDABIgHADIgOADIgCAAIgEACIgGACIgDAEQgCAGgFAEQgEAEgFADIgHAEIgDABQgHAAgBgFg");
	this.shape_30.setTransform(26.675,8.15);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#531515").s().p("AC5AvQgIgCABgFIgDAAQgMABgQAAIgBAAIgGgBIgcgCIgWAAQgJgBgFgBIgngIIgQgCIgVAAIiGgBIgRABIgiADIgEABIgIACIgIACIgJABIgDgBIgEgBIgFgBIgFgCIgDgCIgCgBIgCAAIgKgFIgBAAIgHgIIgBgBIgEgGQgCgCgCgEIgBgHIAAgFIABgJIADgIIACgLIACgBQAEgCABgEIADAAIACAAIADABIACAAIAEABIACABIACABIAIAIIACACIAAABIACACIABAAIAFAGIADADIAEACIAEACQAJAFARAEIABAAIAYAFIAWAEIAXAEIAYACIAEAAIAmAAIAngCQBGgEAvgFIAagFIAegEIAZgEIAPgBIANgBQADABAMgDIAIgBIAFgBIACAAIAKAAIAAABIACADIADAIIABADIAAABIgBADIgGAIIAAABQgDAHgCABIgGAEIgOAEIgCABIgEACIgGACIgGAEIgLAIIgKAFIgJADIgBAAIgBAAg");
	this.shape_31.setTransform(28.1125,6.2625);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_12}]}).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_28}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_31}]},1).to({state:[{t:this.shape_12}]},1).wait(1));

	// tounge
	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#E488B7").s().p("AhKARIgwgEIgEgBQgQgDgbgKIgTgIQBCgFCSgDIAnAAQAbAFAOABIANABIAYAAQAXAAAOACQAIABACADIABAAIgJACIgDABQgCgCgGABIg6AFIgPADIgKADIgOADIgEAAQgiABgQABIgzAEIgpgBg");
	this.shape_32.setTransform(26.45,9.975);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#E488B7").s().p("AAXAZIgGgBQgSgBgLAAIgXAAIgCAAIgmgCIgNgBIgbgCIgJgBIgDgBIgQgEQgLgEgLgGIgEgCIgQgKIABAAQAJgDAOgDIAWgDQASgDAXgBIASgBIBpABQAdAAALACIAEABIAlAGQAEACAJAAIAXADIAMABQAOADAKAEIABAAIAGADIABABIAAAAIgGADIgBAAIgCACIgIABIgFAAIgYAFIgeADIgOACIgLADIgEABIgJABIgDAAIgDAAIgLABIgRAAIgPAAg");
	this.shape_33.setTransform(24.9,11.175);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#E488B7").s().p("AAVAiIgEgBQgVgFgJAAQgPAAgJgCIgCAAIgmgDIgNAAIgbgCIgJgBIgCgBIgQgFQgMgEgKgHIgDgDQgIgGgFgGIAAgBQAJgFANgEIAVgGQATgDAXgCIASgCIBpAFQAbAAAOACIAEABIAlAJQAFACAIACIAWAEIAMAEQAOAEAHAGIACAAIAEAEIABABIAAACIgFADIgBAAIgCACIgHAEIgEAAQgKADgPACIgdAEIgPADIgLABIgDABIgJABIgEAAIgDAAIgLAAIgLABQgLAAgLgCg");
	this.shape_34.setTransform(23.375,12.5);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#E488B7").s().p("AAUAqIgFgBQgVgIgHAAIgZgEIgCAAIgmgEIgOgBIgbgCIgJAAIgCgBIgQgFQgMgFgJgJIgDgCQgHgHgCgHIAAgCQAHgHANgGQAJgEAMgDQASgGAXgDIASgBQAzACA3AFIAqAFIAEABIAkALIANAEIAWAIIALAFQAOAGAGAHIABABQADACAAADIABACIAAABIgEAFIAAABIgCABQgDADgEADIgEABQgIADgQADIgeAEIgOACIgLABIgEAAIgJABIgDAAIgEAAIgLABIgHABQgNAAgNgFg");
	this.shape_35.setTransform(21.85,13.8661);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#E488B7").s().p("AASA0IgDgCQgYgLgFgBIgagGIgCAAIgmgEIgOgBIgbgCIgIgBIgCAAIgQgFQgNgFgIgLIgCgDQgGgIAAgIIAAgDQAGgIAMgJQAJgFALgEQASgHAYgDIASgBQA0ADA2AHIArAGIAEABIAlAOIAMAFIAVAKIAKAGQAOAIAFAKIABABQACADAAADIAAACIAAABIgDAGIAAABIgBACQgDAEgEAEIgDABQgIAEgRADIgdAFIgPABIgLABIgDAAIgJAAIgEAAIgDAAIgMABIgGAAQgNAAgPgFg");
	this.shape_36.setTransform(20.325,15.1961);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#E488B7").s().p("AARA9QgbgRgFgBQgLgFgSgDQgbgEgYgBIgbgCQgQgCgLgFQgNgGgHgMQgHgMAEgNQADgKANgKQAIgHALgEQASgJAXgEIASgBQBNAHBOAPQAzATAcAXQAOAMADALQACAEgBAEQABAFgCAFQgDAKgHAEQgHAGgSADQgoAIgTgCQgNgCgDABIgLACIgGAAQgNAAgQgHg");
	this.shape_37.setTransform(18.7617,16.5424);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#E488B7").s().p("AASBHIgTgJIgPgIQgNgFgQgEIgTgGIgLgEIgNgDIgHAAIgIgBIgNgDIgHgBIgHgCQgKgCgKgFIgCAAQgMgGgHgMIgCgCQgHgMADgMIAAgBQADgLALgLQAIgHAJgFIADgBIAEgDQAPgHAWgDIACAAIATgCIAVABQA/AEBHAQIAGACQASAGANAHIARAJIAPALIAMAIIAFAFIAFAEQAKAKADALIAAACIAAAFQABAGgCAFIgDAFQgDAGgFAEQgEADgHACQgEADgIADIgJADIgYAGIgcADIgFAAIgLABIgJACIgDAAIgJACQgMAAgPgHg");
	this.shape_38.setTransform(18.6675,18.901);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#E488B7").s().p("AATBTIgVgJIgQgHIgcgMQgKgEgIgFIgLgGIgNgEIgGgBIgJgBQgHgCgGgDIgHgCIgHgDQgKgDgMgFIgBAAQgNgHgIgKIgCgDQgHgNACgNIAAAAQABgNALgNQAHgHAJgGIADgBIAFgDQAOgHAYgDIADgBIAUgCIAVABQBAACBLASIAHACQATAHANAHQAJAEAIAHIAQALIALAKIAFAEIAFAFQALALACALIABACIAAAGQAAAGgCAFIgEAGQgDAGgFADQgFADgGACQgDAFgIAEIgIAFIgZAHIgdAGIgFAAQgIABgEABIgJADIgCABQgGABgHAAQgMAAgNgEg");
	this.shape_39.setTransform(18.5914,21.2477);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#E488B7").s().p("AAVBeQgNgDgLgFIgQgHIgcgOQgKgFgHgHIgKgIQgFgEgIgCIgHgBIgJgCQgGgCgIgFIgGgDIgIgDIgXgJIgBgBQgNgGgJgLIgBgDQgJgNABgOIAAgBQABgOAKgNQAGgJAJgGIAEgCIAFgDQANgHAagDIAEAAIAVgDIAWgBQBAAABQAWIAHACQAVAHAMAIQAIAEAJAHIAQANIALAKIAGAGIAFAFQALAMABALIABACIAAAGQAAAGgDAFIgDAGQgEAGgGAEQgEADgHACQgBAGgHAGIgIAGQgKAFgQAEIgeAIIgGABIgLAEIgJADIgDAAQgIADgKAAQgKAAgKgDg");
	this.shape_40.setTransform(18.4768,23.5875);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#E488B7").s().p("AAWBpQgNgCgMgFIgRgHQgQgHgNgJQgJgGgGgJIgKgLQgFgEgIgDIgHgBIgJgDQgGgCgIgGIgHgFIgHgEQgJgEgPgGIgCgBQgOgGgJgLIgBgDQgKgNABgPIAAgBQAAgQAJgOQAFgKAJgGIAEgDIAGgCQAMgHAcgEIAEAAIAXgDIAWgCQBBgCBVAZIAHACQAWAHAMAIQAIAFAJAIIAQAOIALALIAGAGIAFAFQALAOACALIAAACIAAAHQAAAFgDAGQgBADgDADQgEAGgGADQgFAEgGABQAAAJgGAHIgIAHQgJAFgSAGIggAKIgFACIgMAFIgJADIgCABQgLAEgMAAQgJAAgIgCg");
	this.shape_41.setTransform(18.3863,25.9225);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#E488B7").s().p("AgEBuQgtgPgPgcIgJgNQgEgFgKgEIgPgFQgGgDgJgHQgJgIgFgCQgJgGgSgGQgQgHgKgOQgKgOAAgQQgBgSAIgPQAFgKAJgHIAKgGQALgHAfgDIAzgHQBBgEBaAbQAeAKANAJQAHAFAKAJIAQAPIALAMIALAMQAMAPABANQABAOgJALQgJAMgNACQACAPgOAMQgIAGgUAHIgmAPIgVAKQgOAGgRAAQgTAAgVgHg");
	this.shape_42.setTransform(18.2494,28.2563);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#E488B7").s().p("AAWBpQgNgCgMgFIgRgHQgQgHgNgJQgJgGgGgJIgKgLQgFgEgIgDIgHgBIgJgDQgGgCgIgGIgHgFIgHgEQgJgEgPgGIgCgBQgOgGgJgLIgBgDQgKgNABgPIAAgBIABgIIACgIIAGgNIAFgHQADgEAFgDIACgCIAJgGIAEgCQAMgFAYgDIAEgBIAXgDIAWgCQBBgCBVAZIAHACQAWAHAMAIQAIAFAJAIIAQAOIALALIAGAGIAFAFQALAOACALIAAACIAAAHQAAAFgDAGQgBADgDADQgEAGgGADQgFAEgGABQAAAJgGAHIgIAHQgJAFgSAGIggAKIgFACIgMAFIgJADIgCABQgLAEgMAAQgJAAgIgCg");
	this.shape_43.setTransform(18.3863,25.9225);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#E488B7").s().p("AAVBeQgNgDgLgFIgQgHIgcgOQgKgFgHgHIgKgIQgFgEgIgCIgHgBIgJgCQgGgCgIgFIgGgDIgIgDIgXgJIgBgBQgNgGgJgLIgBgDQgJgNABgOIAAAAIACgIIADgGIAHgMIAFgGQACgEAGgEIACgCIAIgFIAEgCQAMgFAWgDIAFgBIAVgDIAWgBQBAAABQAWIAHACQAVAHAMAIQAIAEAJAHIAQANIALAKIAGAGIAFAFQALAMABALIABACIAAAGQAAAGgDAFIgDAGQgEAGgGAEQgEADgHACQgBAGgHAGIgIAGQgKAFgQAEIgeAIIgGABIgLAEIgJADIgDAAQgIADgKAAQgKAAgKgDg");
	this.shape_44.setTransform(18.4822,23.5875);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#E488B7").s().p("AATBTIgVgJIgQgHIgcgMQgKgEgIgFIgLgGIgNgEIgGgBIgJgBQgHgCgGgDIgHgCIgHgDQgKgDgMgFIgBAAQgNgHgIgKIgCgDQgHgNABgNIAAAAIAEgGIADgGIAIgKIAEgGIAJgHIACgCIAIgFIACgDQAOgFATgDIAFgBIAUgCIAVABQBAACBLASIAHACQATAHANAHQAJAEAIAHIAQALIALAKIAFAEIAFAFQALALACALIABACIAAAGQAAAGgCAFIgEAGQgDAGgFADQgFADgGACQgDAFgIAEIgIAFIgZAHIgdAGIgFAAQgIABgEABIgJADIgCABQgGABgHAAQgLAAgOgEg");
	this.shape_45.setTransform(18.575,21.2477);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#E488B7").s().p("AASBHIgTgJIgPgIQgNgFgQgEIgTgGIgLgEIgNgDIgHAAIgIgBIgNgDIgHgBIgHgCQgKgCgKgFIgCAAQgMgGgHgMIgCgBQgGgNACgMIAAAAQADgCACgDIADgFIAIgJIAFgFIAJgHIADgCIAGgEIACgDQAOgFASgDIAEgBIATgCIAVABQA/AEBHAQIAGACQASAGANAHIARAJIAPALIAMAIIAFAFIAFAEQAKAKADALIAAACIAAAFQABAGgCAFIgDAFQgDAGgFAEQgEADgHACQgEADgIADIgJADIgYAGIgcADIgFAAIgLABIgJACIgDAAIgJACQgMAAgPgHg");
	this.shape_46.setTransform(18.664,18.901);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#E488B7").s().p("AARA9QgbgRgFgBQgLgFgSgDQgbgEgYgBIgbgCQgQgCgLgFQgNgGgHgMQgHgMADgMQAEgBACgDIAEgFIAOgMIAJgFQAFgDAEgEIABgDQAPgFATgEIASgBQBNAHBOAPQAzATAcAXQAOAMADALQACAEgBAEQABAFgCAFQgDAKgHAEQgHAGgSADQgoAIgTgCQgNgCgDABIgLACIgFAAQgNAAgRgHg");
	this.shape_47.setTransform(18.7506,16.5424);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#E488B7").s().p("AASA0IgDgCQgYgLgFgBIgagGIgCAAIgmgEIgOgBIgbgCIgIgBIgCAAIgQgFQgNgFgIgLIgCgDQgGgIAAgJIAAgBQAEgBACgCIAFgEIAPgKIAJgFIAJgFIACgCQAPgFATgDIASgBQA0ADA2AHIAqAGIAFABQAUAHAQAGIAMAFIAVALIALAGQAOAJAEAIIACACQACADAAAEIAAAAIAAABQAAAEgDADIgBACQgCAFgFADIgDACQgIAEgRADIgdAFIgPABIgLABIgDAAIgJAAIgEAAIgDAAIgMABIgGAAQgNAAgPgFg");
	this.shape_48.setTransform(20.325,15.1961);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#E488B7").s().p("AAUAqIgFgBQgVgIgHAAIgZgEIgCAAIgmgEIgOgBIgbgCIgJAAIgCgBIgQgFQgMgFgJgJIgDgCQgHgHgCgIIAAgBQAEAAADgCIAFgDIAPgIIAJgEIAKgDIADgCQAPgEASgCIAUgCQAxADA3AEIApAFIAFABIAkALQAGACAHACIAVAIIAMAFQANAGAHAHIACABQACADABADIAAAAIAAABIgEAGIgCACQgCADgFACIgEACQgIADgQADIgeAEIgOACIgLABIgEAAIgJABIgDAAIgEAAIgLABIgHABQgNAAgNgFg");
	this.shape_49.setTransform(21.85,13.8661);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#E488B7").s().p("AAVAiIgEgBQgVgFgJAAQgPgBgJgBIgCAAIgmgDIgNgBIgbgCIgJgBIgCAAIgQgFQgMgEgKgIIgDgCQgIgGgFgGIAAgBIAHgCIAGgCIAQgFIAKgDIAKgDIADgBIAigFIASgBQAxABA3ADQAbABAOACIAFABIAjAJIANADIAXAFIAMAEQAOAFAHAEIACABQADACACADIAAAAIAAABIgGAEIgCABIgHAEIgEABQgKADgPACIgdAEIgPACIgLACIgDABIgJABIgEAAIgDAAIgLAAIgLABQgLAAgLgCg");
	this.shape_50.setTransform(23.375,12.525);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#E488B7").s().p("AAXAZIgGgBQgSgBgLAAIgXgBIgCAAIgmgCIgNgBIgbgBIgJgBIgDgBIgQgFQgLgDgLgHIgEgBIgQgKIAAAAIAIgCIAGgBIARgDIAJgBIALgCIAEAAIAhgEIATgBIBnAAQAdABALABIAFACIAkAGQAEACAJAAIAXADIAMABQAOADAKAEIABABIAHACIAAABIgHADIgCABIgIABIgFABIgYAEIgeAEIgOACIgLACIgEABIgJACIgDAAIgDAAIgLABIgRAAIgPAAg");
	this.shape_51.setTransform(24.9,11.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_32}]}).to({state:[{t:this.shape_33}]},1).to({state:[{t:this.shape_34}]},1).to({state:[{t:this.shape_35}]},1).to({state:[{t:this.shape_36}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_38}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_41}]},1).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_43}]},1).to({state:[{t:this.shape_44}]},1).to({state:[{t:this.shape_45}]},1).to({state:[{t:this.shape_46}]},1).to({state:[{t:this.shape_47}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_49}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_51}]},1).to({state:[{t:this.shape_32}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4.3,-0.3,61.9,42.4);


(lib.johnnyeyes = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// eyelid
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AJ6ClQgIgCgIgKIgMgUQglg/gzgpQg0gog6gMQgjgGgXAHQgWAHgcAZIgvApQgUAPgRADQgKADgFgEQgIgGgBgMQgDgTAJgWQAMgcAdgkQAignAggSQAsgZA5AIQBFAJA8AuQBEAzAsBUQATAjgBAaQAAASgJANQgJAMgKAAIgDAAgAifBJQgJgGgSgTQhIhNh4gRQgigEgVAEQgbAEggATQgiAUghAcIgeAZQgQAOgOAHQgaANgMgQQgMgOAJggQALgtAegjQAVgbAwgdQA6glApgJQAvgKA7APQBEAQA3AlQA+AoAoA+QARAagBAUQgBAMgHALQgHAKgJACIgJACQgKAAgMgKg");
	this.shape.setTransform(66.2968,10.8745);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AJ7BHQgIgBgIgFIgNgIQgmgbg1gSQg0gRg7gHQgjgFgXACQgVACgbAKIguANQgUAFgQABQgKAAgFgCQgIgCgCgFQgDgHAIgIQALgLAcgNQAhgOAegGQAsgIA5AFQBFAHA+AUQBEAYAvAiQAUAOAAALQAAAHgJAEQgHAFgJAAIgFAAgAigAaQgJgCgTgJQhKgdh4gMQgigDgVAAQgbABgfAFQghAGggAIIgdAIIgeAGQgZADgNgGQgLgFAHgLQAKgQAcgLQAVgJAugIQA5gLAogBQAvgCA7AIQBEAJA5AQQA/ARApAXQASALAAAHQAAAEgHAEQgHADgJAAIgGABQgMAAgNgFg");
	this.shape_1.setTransform(66.1689,17.8002,1,1.3469);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AJeBNQgFgBgJgDIgDgBQgtgJgjgKIgNgDIgngJQgVgGgfgFIgUgDQgegEgOgBIgMgBQgXgBgYABIAAABQgdADgOgIQgJgBgKgDIgNgEQgHgDgEgFQgGgEAAgGQgCgKAHgKQAZgTAPgBIAjACIAYABIAcABQAfgBAYACIARACIAtAHIBBALIAVADQAhADAXAJQAmAKAaAaIAHAHQAEAFABAFQABAEgBADIgDAHQgDAHgIAFQgLAHgJABIgDAAQgHAAgHgBgAigAWQgNAAgQgEQgjgDgXgEIhagHIgsgDQgdgBgagBIghAAIgYABIhCAGQgMAAgPADIgJABIgTAAQgUgBgLgIIgDgCQgKgIABgOIABAAQABgNAKgLQAIgJANgFIAKgDQAVgGAggEIAEgBQAVgCAcAAIAvAAQAxABA1AFIB8ANIAcAEQAbACAQAGQAVAHAPAOIABABQALAKACAKIABAEQAAAGgFAFIgDADQgEADgFACQgJAEgNAAIgIgBg");
	this.shape_2.setTransform(66.4652,19.7217);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AG1A4Ig1gGIg9gFQgigFgXgJQgYgJgigVQgWgOABgNQAAgIAGgGQAGgGAIgCQANgDASAIIAdAPQAUAJAeADIA1ADIA/AGQAmADAagBQA1gIAaABQAwgBAaAXQAEAFAAADQgBADgDACQgLAHgMAFQgSAHgjAGQg4AJgbABIgIAAQgTAAgbgCgAnVAVQhPgEgtgIQgggGgOgJQgKgIgDgKQgDgLAIgIQAJgKAXgCQAXgDAdABIA1AFQCsAOB8gQQAggDALAAQAZACAPAMQAHAHACAJQACAJgGAHQgIAKgbADIhYAOQgyAGgnABIgjABQgmAAg6gDg");
	this.shape_3.setTransform(66.8349,22.1935,1,1.3469);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AJaBKQgHAAgIgCIgDAAQgxgCghgGIgNgCIgngHQgUgFghgFIgTgDIgrgEIgMgCIgugFIgBAAQgZAAgRgMIgSgHIgMgHQgHgEgDgEQgFgGgBgGQgBgKAHgKQAZgRAPACIAiAIIAYAFIAcACQAgABAWACIASACIAtAGIBAAIIAWABQAiAAAWAGQAoAHAZAZIAHAHQAEAGABAEQAAAEgCADIgEAGQgEAHgIAFQgKAGgKACIgKABIgGAAgAi9ARQgnACgUgCQgvABgrgCIgsgCIg3gCIghgBIgXAAIhCACIgbAAIgJAAIgSgBQgUgDgLgJIgCgCQgKgIABgNIAAgBQAAgNAJgLQAHgJAOgFIAKgDQAWgFAfgCIAEgBQATgBAeACIAuABQAzACAzAEQBCAFA5ACIAdAAQAcAAAOAFQAXAFAOAOIABABQAKAKACAKIAAAEQABAIgEAEIgDAEQgEADgEACQgLAGgTAAIgJABIgTgCg");
	this.shape_4.setTransform(66.6038,20.2633);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AJjBRQgFgBgJgGIgDgCIhPgdIgMgDIgngMQgWgHgegFIgUgDQgdgFgQAAIgMgBQgWAAgZAGIgBAAQggAIgLgFQgKAAgJgBIgPgCQgIgCgEgEQgGgEgBgFQgDgKAIgLQAYgUAPgEIAkgFIAZgCIAcgBQAdgBAbACIAQABIAtAIQAjAHAeAHIAVAEQAgAIAYALQAkAOAaAaIAHAHQAFAFABAFIACAHQAAAEgCADQgCAJgIAFQgLAHgKAAQgIAAgIgDgAigAbQgLgBgRgHIg6gMIhagNIgtgEQgfgDgYAAIghABIgZACQgiAFgfAFIgcAGIgJABIgTACQgVABgLgIIgEgCQgKgHADgOIABAAQACgOAKgKQAJgJANgFIAJgEQAVgGAhgGIAEAAQAWgFAbgBQAZgCAWAAQAwAAA4AIQBDAHA4AMIAdAHQAZAFARAHQAVAIAPANIABABQAMAKACAJIABAEQgBAGgFAGIgEADQgEACgGABQgGADgJAAQgHAAgIgCg");
	this.shape_5.setTransform(66.325,19.05);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AJqB7IgNgQQglgxg0ggQg0ggg6gLQgjgGgYAFQgVAFgbASIgvAeQgUALgQACQgKACgFgEQgIgEgCgJQgDgPAJgQQALgWAcgbQAigdAfgNQAsgRA5AHQBFAJA9AlQBEApAtBCQAUAbAAAUQAAAOgJAJQgPADgJAAQgKAAgEgEgAigA5QgJgEgTgQQhJg6h3gQQgigFgVACQgbADggAMQgiAPggATIgdASQgQAJgOAGQgaAJgMgNQgMgLAIgXQALghAcgZQAWgTAvgVQA5gZApgGQAugFA7AMQBFAOA4AdQA+AgAoAuQASAVAAAOQgBAKgHAHQgHAIgJABIgHABQgLAAgNgIg");
	this.shape_6.setTransform(66.2526,14.0724);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},25).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape}]},1).wait(1));

	// pupil
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#250B0D").s().p("AF2B0QgSgZAAg5QAAgoAJgZQAGgQAJgLQAMgKALgBQAMAAASAKQANAHAFAIQAFAJADAUQACAYAAAeQABAygQAYQgNAWgWACQgWAAgPgVgAm2BnQgLgLgFgVQgEgPgBgWQgFhHALg0QAFgbANgMQAMgLAbADQAOADAFADQAIAEAJAOIAMAUQAHAQAEASQAFAbgCAyQgDAjgEAOQgGAagPAMQgIAHgRADIgPABQgXAAgNgOg");
	this.shape_7.setTransform(78.6118,19.6092);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#250B0D").s().p("AF2BBQgSgTAAgqQAAgaAGgRIAWAJIAdAJQAVAFAQAAIAKgBIABAZQABAlgQASQgNAQgWACQgWAAgPgQgAm2A3QgLgIgFgPQgEgLgBgRQgFgwAKgkIAQADIAkAHQAdAIAMAGIARAJIAKAFQABAPgBAVQgDAZgEAKQgGAUgPAIQgIAGgRACIgPABQgXAAgNgLg");
	this.shape_8.setTransform(78.6146,22.4765,1,1.3469);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#250B0D").s().p("AGZBTQgIAAgIgHIgFgEIgCgCQgGgGgEgKQgGgMgBgSIAAgBQgBgSADgQQAHgLAHABIAWACIAUABIAPABQAFAKADAMIAAAFQADAYgFAVIgCAGQgCAHgFAFQgGAIgKACIgJAAIgFAAgAmfAzQgJgCgGgFQgIgGgFgLIgBgDQgEgKgBgQIAAgBQgDgaAFgTIAIgYIAFgKIAMAAIAHABIAUAEIAOAEIAMAEIAFADIANAJIAGAGIAAABQADAMgBAQIAAAHIgBALIgCASIgDAHQgDAGgEAEQgFAHgJAFIgBAAQgHAFgMADIgEAAIgLABIgKgBg");
	this.shape_9.setTransform(78.1846,22.6333);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#250B0D").s().p("AGYAvIgEgBIgCAAQgIgBgFgDQgIgFgBgJQgCgHACgKQADgJADgDQAHgJASgBQARABAJAKQAGAHABAPQAAAHgCAEQgEAFgGADIgKADQgHADgFAAIgCAAgAmeAKQgPAAgHgHQgEgDgCgKQgDgOAIgHIANgJQAIgEAMgCIAXABIAIABIAMAFIADAEQAEAGAAAJIgBAJQAAAHgCACQgDAFgJAAIgOACIgQAFIgIAAIgHAAg");
	this.shape_10.setTransform(77.9821,22.9517,1,1.3469);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#250B0D").s().p("AGPBJIgGgEIgBgBQgHgFgFgHQgGgLgBgQIAAgBQgBgPADgPQAFgMAFAAQAKgCAJAAIASAAIAOABQAGAHADALIABAEQAEAUgDAUIgBAFQgCAHgEAFQgFAHgJADIgMACIgEAAQgGAAgFgDgAmeAnQgIgBgGgEQgIgFgEgJIgBgDQgEgIgBgOIAAgBQgDgYAFgQIAKgUIAGgIIALgBIAGABIASACIAMADIALAEIAEACIAMAIIAFAFIAAACQADAKAAAPIAAAGIgBAKQgBAKgCAGIgDAGQgDAFgEADQgFAFgJADIgBABQgGADgLADIgDABIgJABIgKgBg");
	this.shape_11.setTransform(78.0663,22.6938);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#250B0D").s().p("AGUBaQgJgCgIgIIgFgGIgCgCQgGgIgEgMQgFgOAAgUIAAgBQgBgUADgSQAIgKAIACIAaAHIAXACIAQABQADAMADAOIAAAHQABAcgGAVIgDAGQgDAIgFAFQgIAIgLABIgFABIgKgCgAmhA/QgJgDgHgGQgIgHgFgNIgCgEQgDgMgBgSIAAAAQgDgcAEgWIAGgcIAEgNIAOACIAHABIAXAFIAPAFIAOAFIAFAEIAOAKIAIAGIAAABQACANgBASIAAAIIgBAMIgDAUIgCAIQgDAHgEAFQgFAKgKAFIgBABQgGAFgOADIgFAAIgKABIgNgBg");
	this.shape_12.setTransform(78.312,22.5667);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#250B0D").s().p("AGTB3QgNgCgLgMIgHgKQgPgZAAg0QAAglAHgYQAIgHAKgBQANgDAMADQAPADAMAFIAUAIIADACQACAJABAOIABANQABASgBARQgBAdgJATQgEAMgHAHQgIAJgLAEQgGABgHAAIgFAAgAmwBaQgFgDgEgFQgHgJgFgPIgBgGQgDgOgBgUIAAgBQgFhAAJgxIACgKQAFgFAHgDIAJgDQANgCAOABIAKACQAMAEAHADQAHAEAHAHIADADIAMAPIABAAIAHAKIADAUIACAhIgCAlIgDAQQgCATgGAKQgDAHgEAGQgHALgMAFIgEACQgJADgLABIgGAAQgTAAgLgKg");
	this.shape_13.setTransform(78.5971,21.2862);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7}]}).to({state:[{t:this.shape_8}]},25).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_7}]},1).wait(1));

	// white
	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AH1CQQg6gGgcgJQgYgIgegQQgPgIglgYIhAgqIgjgZQgFgHgCgKQgFgXALgSQALgUATADQAIABACgDQACgBADgKQAKgiAugLQAmgJBCgIQAlgEAPAEQATAGAVAUQAWAWABAWIgCAbQAAAGAEARQAEAPgBAJQAjgBAiAGQAYAFAIAQQALATgJAZQgEAOgPAZIgRAbQgPAGgOADQgLACgQAAQgSAAgagDgAIMA7QgEAIgFADQAGADAKABIAQACIAFgGQgNACgJgMQgBAAAAgBQAAAAgBgBQAAAAgBAAQAAgBgBAAgAlvBxQhggShegiIgCgCQgTgQgKgGIgZgRQgPgKgHgNQgFgNAAgQQABgPAHgMQAGgLALgGQALgEAKAFQALgcAbgQQASgKAfgFIA8gFICAgFQAhgDAPAPQAJAOAGAFQAEAEANAEQAuANAMADQAbAEAKAKQARASgCA4QAAAogIAQQgHAPgOAKIgaAQIgJAFIgHABQgQABgjABIgfAHQgUAFgLABIgLABQgSAAgZgFg");
	this.shape_14.setTransform(65.8806,19.3071);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AH1BSQg6gEgcgHQgYgFgegMIg0gYIhAgeIgjgTQgEgFgCgGQAJgJAHgEIAOgEIAPgCQAHgBAMgFIASgIQASgGAXAAQAPAAAbACIA5AEQA8AFAgAKIANAGIAAAAQAEALgBAHQAjgBAiAFQAYAEAIAMQALANgJATQgEAKgPASIgRAVIgdAGIgZABQgTAAgbgCgAlvA7QhggNhegZIgCgBQgTgNgKgEIgZgLQgPgIgHgKQgEgIgBgKIAOgBQAUgEARgLQAQgJAEgCQAHgBAPACQAWACAlgHQAtgIAPAAQAOgBAaADIBZAHQAvAEAZAIIAnAQQAYALAPADQAKADAKABIAAADQAAAdgIAMQgHALgOAIIgaAMIgJAEIgHAAIgzACIgfAFQgUAEgLABIgKAAQgSAAgagEg");
	this.shape_15.setTransform(65.8577,22.6249,1,1.3469);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AHwBcIgBAAQgagBgbgEIgggGIgUgFQgTgFgQgGQgOgDgKgFIgegNQgNgGgMgHQgTgLgVgQIgRgMQgLgIgGgIQgFgGgBgIIAAgDQAEgJAFgHIASgJIAMgCIASgBIATABIAMABIAZAEIAaADIAQACIAmADIATACIAqAGIA1AIIAKADIAEABIANAKQAegDAWACIAQACQAWAEANANQAJAJAEANQABAGgBAGIgDAGQgHALgMANIgEAEQgMAMgNAHIgOAEIgPADQgZAGgaAAIgTgBgAlZA2IgPAAQgxgFhBgLQgqgHgkgJIgDgCIgggOIgFgCIgVgJQgPgIgIgKIgBgDQgHgKgCgNIAAAAIAIgHIAIgIQAKgIAOgHIAIgEQAJgFAGgBQAJgBANABIAOABIAtgBIAHAAQAigDAUAAIAnADIBYAGIBJAFQARACAXAGIABAAIAoAIIAUAEIADADQAEAIADAJQADAMgBALQAAAGgBAFQgCAEgDAFQgGAJgLAGIgQAIIgLADIgIAEIgIABQgYAEgaACIgLADIgUAEQgSAEgOABIgVABIgRgBg");
	this.shape_16.setTransform(66.32,22.6543);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AG1A4Ig1gGIg9gFQgigFgXgJQgYgJgigVQgWgOABgNQAAgIAGgGQAGgGAIgCQANgDASAIIAdAPQAUAJAeADIA1ADIA/AGQAmADAagBQA1gIAaABQAwgBAaAXQAEAFAAADQgBADgDACQgLAHgMAFQgSAHgjAGQg4AJgbABIgIAAQgTAAgbgCgAnVAVQhPgEgtgIQgggGgOgJQgKgIgDgKQgDgLAIgIQAJgKAXgCQAXgDAdABIA1AFQCsAOB8gQQAggDALAAQAZACAPAMQAHAHACAJQACAJgGAHQgIAKgbADIhYAOQgyAGgnABIgjABQgmAAg6gDg");
	this.shape_17.setTransform(66.8349,22.1935,1,1.3469);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AHvBXIgBAAQgZgBgcgEIgggFIgVgEIgkgJQgPgDgJgEQgPgEgPgHIgZgMQgSgLgWgQIgSgMQgKgJgGgIQgFgHgBgHIAAgEQADgJAFgIIARgJQAHgCAGAAIARACIATAFIALADIAZAGIAaAEIAQACIAmADIATACIArAGIA1AGIAKACIAEAAIAQAGQAfgEAVABIAQACQAWADAOAMQAKAIAFANQADAGgBAFIgEAHQgIAKgMALIgFAEQgMAKgPAGIgOAEIgPADQgiAHgcAAIgHAAgAlWAuIgQAAQgvgChDgKQgrgGgkgIIgDgBIghgLIgFgCIgVgIQgPgHgJgKIgBgCQgIgKgCgNQACgFADgFIAHgJQAKgJAOgGIAIgDQAJgDAIgBQAJgBAMABIAOAAIAtABIAHAAQAggBAXABIAmADQAtADArABIBJACQASABAXADQAdABANACIAUAFIADADQAGAGAEAIQAEAMAAALIgBAMQgBAFgDAEQgGAIgLAGIgRAHIgLADIgIADIgIACIgyAHIgLACIgUAEIggAFQgPABgPAAIgHAAg");
	this.shape_18.setTransform(66.4893,22.5806);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AHyBiIgBAAQgcgBgZgEIgggHIgUgGQgSgFgRgHQgMgEgMgGIgdgPQgNgHgMgHQgTgMgVgPIgRgLIgSgPQgEgHgBgIIgBgCQAFgJAGgHIASgIIANgCIASgEIATgCIAMgBIAaABIAaADIAQABIAmAEIATACIAqAFQAfAFAVAGIAKAEIAEABIAJAOQAdgCAYADIAPACQAXAFALANQAJAKACAPQABAGgCAGIgCAGQgHALgMAPIgDAEQgMAPgKAHIgPAEIgOAEQgUADgXAAIgbgBgAlbBAIgPgBQg0gHg9gMQgqgJglgLIgDgCQgTgLgLgGIgFgCIgVgKQgPgIgHgLIgCgDQgFgKgCgNIAAgBIAKgEIAKgHIAXgQIAIgEQAKgGAFgBQAIgBANABIAPABQARAAAcgDIAHgBQAjgEASAAQAQAAAYACIBYAIQAsADAdAGQAPACAYAKIABAAIAoALIAUAFIABADIAFASQACAOgCAKIgCAKIgFAJQgGAKgKAGIgRAJIgKAEIgIAEIgIABQgVAEgeABIgLADIgUAEQgSAEgNABIgQABIgWgBg");
	this.shape_19.setTransform(66.1563,22.6395);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AH1B+Qg6gFgcgKQgYgHgegQQgPgJglgYIhAgpIgjgZQgFgHgBgJQACgSAJgLQAIgLAOAAQARgEAHgIQAMgVAZgHQAcgJAtgEQAagCAVAEQAXAEAZALQApAPARASQADAGACALIACAMQAEAPgBAIQAjgBAiAHQAYAGAIAOQALATgJAaQgEANgPAZIgRAcQgPAFgOADQgLACgQAAQgTAAgZgDgAlvBfQhggRhegiIgCgCQgTgRgKgGIgZgQQgPgKgHgNQgFgMAAgPQAEgHAHgHIAbgSQAOgJAHACQAJgPAUgHIA3gLQAcgFAggDQAngBAtAAQAnABAdAKQAcAKAQAIIAcAPQAiANAOAEQATAEAJAFQAJAKgBAdQAAAogIAQQgHAPgOAKIgaAQIgJAGIgHAAQgQACgjAAIgfAHQgUAGgLABIgLAAQgSAAgZgFg");
	this.shape_20.setTransform(65.8827,21.095);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AH1CQQg6gGgcgJQgYgIgegQQgPgIglgYIhAgqIgjgZQgFgHgCgKQgFgXALgSQALgUATADQAIABACgDQACgBADgKQAKgiAugLQAmgJBCgIQAlgEAPAEQATAGAVAUQAWAWABAWIgCAbQAAAGAEARQAEAPgBAJQAjgBAiAGQAYAFAIAQQALATgJAZQgEAOgPAZIgRAbQgPAGgOADQgLACgQAAQgSAAgagDgAlvBxQhggShegiIgCgCQgTgQgKgGIgZgRQgPgKgHgNQgFgNAAgQQABgPAHgMQAGgLALgGQALgEAKAFQALgcAbgQQASgKAfgFIA8gFICAgFQAhgDAPAPQAJAOAGAFQAEAEANAEQAuANAMADQAbAEAKAKQARASgCA4QAAAogIAQQgHAPgOAKIgaAQIgJAFIgHABQgQABgjABIgfAHQgUAFgLABIgLABQgSAAgZgFg");
	this.shape_21.setTransform(65.8806,19.3071);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_14}]}).to({state:[{t:this.shape_15}]},25).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.3,-5.6,133.10000000000002,39.6);


(lib.girlmouth = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// top_lip
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("Ah+BEQhCgFgzgQQgYgIgIgMQgGgIABgLQACgKAJgEQAJgEASAHQAoAOA2AFQAhADBBAAIBEgBQAqAAAVgCQA5gFA4gZQAVgKAHgLIAIgRQAFgKAGgEQAHgFAKACQAJABAGAHQAMANgFAUQgGAhgzAYQgpAVgxALQgfAHgnACIhGABIgWAAQg+AAgjgDg");
	this.shape.setTransform(23.3964,2.2348);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(21));

	// bottom_lip
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("Ah+BEQhCgFgzgQQgYgIgIgMQgGgIABgLQACgKAJgEQAJgEASAHQAoAOA2AFQAhADBBAAIBEgBQAqAAAVgCQA5gFA4gZQAVgKAHgLIAIgRQAFgKAGgEQAHgFAKACQAJABAGAHQAMANgFAUQgGAhgzAYQgpAVgxALQgfAHgnACIhGABIgWAAQg+AAgjgDg");
	this.shape_1.setTransform(23.3964,2.2348);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("Ag7BWQgXgBgWgEIgagEQgkgHgegKQgagKgVgLQgWgLgHgOIgBgDQgFgIACgIQACgFAFgCIAGgDQAHgBAKADIAKACIARAEIALAGQAVAJAcAHIANADIAqAHQAVAEAWABIAOABIAXgBIAsgCIAEgBQAhgBAZgEIAHgCQAagFAVgHQAggMAbgVQAIgHAGgGQAFgHADgGIACgEIAFgNIAEgHQADgFAEgCQAEgCAGgBIAIABQAHABAGAFIACADQALANgCATIAAADQgDAcgZAVQgJAJgLAHQgOAKgOAIQgXAMgbAJIgMAEQgUAGgaAEIgZADIgLABQgYADgmABIgEAAIgaAAIgYAAg");
	this.shape_2.setTransform(24.4536,3.75);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("Ag7BkQgXgBgYgHIgagHQgmgMgcgOQgagNgTgPQgTgOgHgRIgBgBQgDgJABgJQADgCAGgBIAGgBQAIgBAKADIAKACIASACIAJAHQATAPAbALIANAEIApANQAXAHAVABIAOABIAYgBIAugDIAEgBQAggDAdgIIAHgCQAbgHAUgJQAfgQAUgdQAGgHAEgJIAGgOIABgEIAFgNIAEgHQADgEAEgCQAFgDAHAAIAIABQAHACAFAFIACACQAMANgBAWIAAADQgBAdgVAZQgHALgKAJQgNAMgOAKQgWAPgcALIgLAEQgVAHgbAGIgaAGIgLACQgaAEgnACIgEAAIgXAAIgdgBg");
	this.shape_3.setTransform(25.5429,5.295);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("Ag8BzQgWgCgbgKIgbgKQgmgQgbgSQgZgRgRgTQgRgRgGgSIgBgDQgDgKABgIIALAAIAHAAIASAEIALACQAJABAJgBIAIAJQARAUAZAOIANAHIApARQAZAKATACIAPABIAagBQAcgCATgDIAEgBQAdgEAhgMIAIgCQAegKARgLQAegUAOgjQAEgKACgJIAEgQIABgEQABgGADgHIAEgHIAHgGQAFgDAHABIAJACQAHABAFAFIACADQALANABAXIAAADQABAggQAdQgGALgJALQgLAPgNALQgVASgeAOIgMAFQgUAHgcAJIgaAHIgNADQgaAFgqADIgEAAIgeABIgYgBg");
	this.shape_4.setTransform(26.6154,6.8214);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("Ag9CCQgVgDgegNIgbgNQgogUgagXQgYgUgPgYQgOgSgFgVIgBgDQgCgLAAgIIANADIAHACIATAFIALACQAKAAAJgCIAGALQAPAZAYARIANAJIApAWQAbANARADIAQABIAagBQAfgDASgEIAEAAQAcgGAlgQIAIgCQAfgNAQgNQAdgXAHgrQACgLAAgLIACgRIAAgFQABgGADgHIAEgGIAHgFQAGgDAIABQAFAAAEACQAGACAFAFIACACQAMAOACAZIAAACQADAjgMAfQgEAOgIANQgKAQgNAOQgUAUgfAQIgLAGQgUAIgeALIgbAJIgNAEQgcAHgrAEIgEAAIgdABQgQAAgLgBg");
	this.shape_5.setTransform(27.751,8.3569);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("Ag/CRQgUgDgggRQg8gfghgkQgsgugKg1IgBgUIAOAHQAPAHAMADQARADAPgGIAFANQAMAeAXAVQANANAoAZQAdAQAQAEQAQADAcgEQAhgEARgEQAagGAtgVQAogRAQgQQAigjgHhDQgCgQABgHQABgNAHgHQAIgIANACQAMABAJAJQANANAEAdQAFAngHAjQgJAlgWAcQgTAXghASQgVAMgoARQgWAKgUAGQgfAJgvAEIggACQgQAAgLgCg");
	this.shape_6.setTransform(28.9377,9.8824);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("Ag5CcIgCAAQgXgFgegRIgIgFQgRgLgQgOIgggeQgIgIgKgMIgOgRQgPgUgLgUQgJgQgFgNQgFgKgCgJIAAAAQgDgMAAgJIALACIAIABQALAEAKACIADAAQAOACAOgDIACAAIAEAIIADAGQAPAgAWAXQAQASAkAbIAPALQARAMAKAFIABAAQAMAGAUABIALAAIANgBIAbgDIAOgBQANgCAPgGQAWgGAagOQATgJAPgLQANgKAIgKQASgVAHgfQAGgcgDggIgBgZIAAgFQABgKADgGIAAgBQAEgHAGgCQACgBADAAQAFgBAFAAQAGABAFADIADACQAMAJAGAXIACAFQADANABAPQACAagEAZQgGAngUAgIgEAGQgRAYgaAUQgVARgmATIgBABQgWAMgVAIIgTAFQgbAHgmADIgcACQgUAAgOgDg");
	this.shape_7.setTransform(28.9083,11.5517);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AgyCpIgCAAQgbgHgdgSIgIgFQgRgNgQgRIgegjIgSgWIgPgTQgPgWgNgVQgKgRgGgNQgGgLgDgIIgBAAQgFgMAAgJIAJgEIAHgCQAMAEALACIADABQAOABAQgCIACAAIAFAJIADAGQASAiAWAbQATAWAfAcIAOAPQAQAPAJAHIABAAQANAKATADIALABIAPABIAcgBIAPgBQAQgCAPgFQAYgHAagPQATgLAPgNQANgMAJgMQARgYAHghQAGgegCgiIgCgbIAAgGIACgRIgBgCQABgIAEgDIAEgDIAJgDQAGgCAFACIAEABQAPAHAIAWIADAGQAEANACAQQADAcgDAbQgDArgSAiIgEAHQgPAcgYAXQgVAXglAWIgBABQgWAPgVAIIgTAHQgdAJgoADIgBAAIgXABQgaAAgRgEg");
	this.shape_8.setTransform(28.8818,13.0569);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AgsC3IgDgBQgegHgcgTIgJgGQgQgOgQgVIgcgoIgSgYIgQgWQgQgWgOgXIgTgfQgHgLgEgIIgBAAQgGgMgBgJQABgGAFgEIAHgFQAMAEANACIADABQAOACASgCIACABIAFAJIAEAHQAWAjAWAdQAUAcAbAeIAOARQAOAUAJAHIAAABQAOAOASAEIALADIARADIAdAAIARgBQARgBAPgEQAbgHAagQQAUgNAPgRQAMgMAJgPQARgbAHgjQAGgggCgjIgBgeIgBgGIAAgTIgCgCQgCgJADgEIACgFQADgEAFgCQAFgEAHAAIAEABQARADAMAWIADAIQAFAMACASQAFAdgBAdQgCAtgPAmIgEAHQgNAggWAbQgVAegkAZIgBABQgVAQgWAKIgUAIQgfALgqACIgBAAIgYABQgbAAgTgFg");
	this.shape_9.setTransform(28.9091,14.4618);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AgmDGIgDgBQgigIgbgUIgIgIQgRgOgPgZIgbgsIgSgbIgQgYIgggwIgVggIgOgSIgBgBQgIgMgCgKQAAgJAEgHIAHgHQANAFANACIAEAAQAOACAUgBIACABIAGAKIAEAHIAuBFIAtBBIANAUQAOAXAIAJIAAABQAOARARAHQAGADAGACQAJACAJABIAfACIASAAQATgBAPgDQAdgHAbgSQATgOAQgUQAMgOAJgQQAQgeAHgmQAHgigBglIgCgfIgBgIQgBgNgCgHIgCgDQgFgJAAgGIABgGQACgFAFgFQAGgFAHgBIAFgBQATABAOAVIAEAJQAGAMADATQAGAgAAAdQABAwgNAqIgDAIQgLAkgUAeQgVAkgjAcIgBABQgVASgWAMIgVAJQghAMgsACIgBAAIgUAAQggAAgXgFg");
	this.shape_10.setTransform(28.9484,15.7972);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AgjDUQgtgMgcgbQgQgQgPgdIgagxQgGgLgbgrIgigzQgPgXgJgLIgSgTQgJgLgDgLQgDgTALgNQAQAGAQACQAOABAWAAIAIAMQBLBsAiBEQAOAbAHAMQANAUARAKQANAHASAEQALACAWABQAiABAVgEQA4gLAng1QAfgrAMhAQALg5gIg8QgCgOgDgHQgKgNgCgIQgDgLAIgKQAHgKAMgBQAWgCAQAVQAKAOAGAcQASBagTBPQgWBZg8A6QggAfgjAOQgjANgvACIgSAAQglAAgbgHg");
	this.shape_11.setTransform(28.9841,17.1097);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AgyCpIgCAAQgbgHgdgSIgIgFQgRgNgQgRIgegjIgSgWIgPgTQgPgWgNgVQgKgRgGgNQgGgLgDgIIgBAAQgFgMAAgIIAAgBIAJgEIAHgCQAMAEALACIADABQAOABAQgCIACAAIAFAJIADAGQASAiAWAbQATAWAfAcIAOAPQAQAPAJAHIABAAQANAKATADIALABIAPABIAcgBIAPgBQAQgCAPgFQAYgHAagPQATgLAPgNQANgMAJgMQARgYAHghQAGgegCgiIgCgbIAAgGIACgRIgBgCQABgIAEgDIAEgDIAJgDQAGgCAFACIAEABQAPAHAIAWIADAGQAEANACAQQADAcgDAbQgDArgSAiIgEAHQgPAcgYAXQgVAXglAWIgBABQgWAPgVAIIgTAHQgdAJgoADIgBAAIgXABQgaAAgRgEg");
	this.shape_12.setTransform(28.8818,13.0569);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("Ag5CcIgCAAQgXgFgegRIgIgFQgRgLgQgOIgggeQgIgIgKgMIgOgRQgPgUgLgUQgJgQgFgNQgFgKgCgJIAAAAQgDgMAAgIIAAgBIALACIAIABQALAEAKACIADAAQAOACAOgDIACAAIAEAIIADAGQAPAgAWAXQAQASAkAbIAPALQARAMAKAFIABAAQAMAGAUABIALAAIANgBIAbgDIAOgBQANgCAPgGQAWgGAagOQATgJAPgLQANgKAIgKQASgVAHgfQAGgcgDggIgBgZIAAgFQABgKADgGIAAgBQAEgHAGgCQACgBADAAQAFgBAFAAQAGABAFADIADACQAMAJAGAXIACAFQADANABAPQACAagEAZQgGAngUAgIgEAGQgRAYgaAUQgVARgmATIgBABQgWAMgVAIIgTAFQgbAHgmADIgcACQgUAAgOgDg");
	this.shape_13.setTransform(28.9083,11.5517);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1}]}).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_1}]},1).wait(1));

	// mouth_color
	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#E488B7").s().p("AhTAVIgKgCIgQgCIg6gBQgGAAgDABIgCAAIgJgBIABgBQACgCAHgCQAOgEAXgCIAYgCIANgCIApgIIAmgEQCSgJBCgBIgSAJQgbANgPAEIgDABIgwAIIgoAFIg0ABQgQAAgiACIgFAAIgNgBg");
	this.shape_14.setTransform(26.725,7.0375);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#531515").s().p("AjMA7IgkgLIgOgFQgEgCgDgDIgFgKIgFgIIgBgDIABgFIAEgIIACgEIAVAFIAcAIIAeAEIA3AGQA9AEB7gCQAggBAJgBIAYgEQAhgHAjgLQAXgGAGgIQADgDAHgPIACgEIABgDQAEgJAFgIIAHgFQAGgCAFAAQACAEAHABQAHARACALQADASgKAKQgDADgHAFIgLAHIgJAIIgKAGIgDACQhCABiTAJIglAEIgoAJIgOACQg6gBgkgCQADAHgIADIgDABIgVgEg");
	this.shape_15.setTransform(23.186,1.825);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#E488B7").s().p("AhDAgIgNgCIgCAAIgJgBIgQgBIgdgBIgZgCIgFgBIgHAAIgCgBIgIgCIAAgBIAAgBIAPgHIAJAAQAOAAAQgCIACAAIADAAIAGgCIADgCIAWgHIAPgFQAIgEAcgEIArgGICDgLIALABIAXABIASADIgDADIgLAIIgHAHQgPAIgLAEIgFABIgDACIgQADIgZAEIgJABIgmAGIgcACQgJAAgRADIgIABQgPADgUABIgGAAIgEABIgBAAg");
	this.shape_16.setTransform(28.35,8.375);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#531515").s().p("Ah+A8QgLgBgJgCQgPgDgKgEQACAEgDACIgCABIgDABIgEgBIgPgBIgDgBIgQgEIgNgFIgGgDIgFgDIgHgFIgFgEIAAgDIgEgHIgFgJIgBgBIAAgBIABgFIAEgIIABgCIABgCIAOABIAFAAIAdAGIAEAAIAZACIAIABIAdACIASACQAnADA/gCIBPgDIAEAAQAbgBAKgCIAPgDIAIgCIAQgEIAXgFIAcgJIABAAQAPgEAIgDIAFgDQAEAAAGgLIACgCIACgCIAHgKIAGgCIAHgBIABABQABAEAFABIABAIQABAJgBAGIAAAFIgCAGIgBADQgDAEgEADQgDADgHADIgLAFIgHAEIgDACIgJAFIgDABIgDAAIgfACIiDALIgrAGQgcAEgJAEIgOAFIgXAIIgCACIgGACIgDAAIgCAAQgQACgOAAIgJAAg");
	this.shape_17.setTransform(24.17,3.6);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#E488B7").s().p("Ag6AqIgFAAIgBAAIgNgBIgCAAIgJAAIgRgBIgdgBIgZgDIgFgCIgHgBIgCgCIgHgEIAAgBIABgBIABgCIAKABQANAAAQgFIABAAIADAAIAEgEIACgCIAVgMIANgFQAKgFAZgGIAqgJQBQgLA6gGIAVACIAWAEIASAFIgCAEIgHAKIgHAHQgNAJgMAFIgEACIgEABIgPAEIgaAEIgJABIgnAHIgcAEQgIAAgQAGIgJACQgQAFgTABIgFAAg");
	this.shape_18.setTransform(29.975,9.575);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#531515").s().p("AiEA9QgKgBgIgEQgOgFgFgGQAAAAAAAAQAAABAAAAQAAAAAAABQAAAAAAAAIgCAAIgDABIgEgBIgPAAIgDAAQgJgBgIgCQgGgDgGgEIgGgDIgEgFIgFgFIgDgFIAAgDIgDgGIgFgKIgBAAIAAgBIABgEIADgJIABgDIABgCQAGgCAHgBIAFAAIAeADIADABIAYABIAIABIAdADIASABQAoACA+gCIBNgFIAEAAQAZgCALgEIAPgEIAIgCIAPgGIAYgGQAOgDANgFIACAAIAWgDIAFgBQAEACAGgHIACAAIACAAIAAABIAGgEIAEAAIAEABIABABQAAAEADACIgBAHQgCAHgDAEIgBACIgDAFIgCACIgIAEIgJAFIgNADIgHAEIgCABIgKADIgDABIgCAAIgVACQg6AFhSALIgpAJQgYAFgKAGIgNAFIgVANIgCACIgFADIgCAAIgBAAQgQAGgOAAIgJgBg");
	this.shape_19.setTransform(25.425,5.8);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#E488B7").s().p("Ag3A1IgEgBIgCAAQgFgBgIACIgCAAIgKAAIgRgBIgdgBQgQgCgKgDIgFgBIgGgEIgCgCIgEgEIgBgCIAAgBIAAgBQALgPAOgIIAdgNIANgGQAPgHAVgHQARgFAYgEQA5gKA1gHIASgBIAMABQARABAOADQALACAKADQAKAFAHAEIgBAEQAAAGgDAGIgHAIQgKAKgLAFIgFACIgEACIgQAEIgaAEIgJABIgoAHIgcAHQgGABgRAIIgJADQgRAHgSABIgFAAg");
	this.shape_20.setTransform(31.6,10.775);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#531515").s().p("AicA/QgMgIgCgJQABAAAAAAQABAAAAAAQAAAAAAAAQABgBAAAAIgCABIgEAAIgDgBQgJACgHgBIgCAAQgKAAgHgDQgHgCgGgFIgEgEIgEgGQgCgEgBgDIgBgGIABgCIgDgFIgGgJIAAgCIAAgEIACgJIACgDIABgCQAEgFAIgCIAFgBIAeABIACAAIAZABIAHABIAdACIASACQApABA7gDIBOgIIADAAQAXgDAMgEIAQgFIAGgDIAPgGIAYgGIAbgIIACAAIAVABIAGABQAEACAGgBIABACIACACIAFAEIACADIADACIAAABIAAAGIgEAGQgEAGgFABIgDAAIgEADIgCABIgJACIgJACQgJACgEgBIgHACIgDABIgJADIgDAAIgDAAIgLACIgMgBIgSABQg1AHg6AJQgXAEgRAFQgVAHgPAHIgNAGIgdAOQgOAIgLAPIAAABIAAABIABACIgCAAIgDAAQgOAAgKgHg");
	this.shape_21.setTransform(26.8,7.2556);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#E488B7").s().p("AhlBAIgfgCQgQgCgJgDIgEgDIgGgFIgCgDIgDgEIgBgDIAAgCIAAgBQAIgRAMgKIAdgSIANgGQAPgIAUgIIAogKQA5gNA3gJIARAAIABAAQAXABATAGQALADAKAFQAKAFAGAGIABAEQABAHgCAHIgFAJQgIALgMAGIgEACIgFACIgQAFIgaAEIgJABQgWADgTAFIgdAIQgFABgRALIgIAEQgSAKgRAAIgFAAIgFgBIgCAAQgDgBgKACIgCAAIgKABIgJAAIgIAAg");
	this.shape_22.setTransform(33.2917,12.0256);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#531515").s().p("AijBLQgKgKACgLIADgFIgBABIgEgBIgDAAQgJACgHABIgDgBQgJABgHgDQgIgCgFgGIgEgFIgDgIIAAgHIABgGIABgCIgEgFIgFgJIAAgCIAAgEIACgJIABgEIABgCQAEgGAHgDIAFgDQAOgCAQAAIADABIAXAAIAIAAIAcADIASABQAqACA6gFQAugFAegFIADgBQAWgDANgFIAPgGIAGgDIAOgHQAJgDAPgDQAPgEAMgFIADABQANACAHADIAGADIAJAHIADAEIACAEIAAAAIAEALIAAAFIAAAEIAAABIgEAGIgFAFQgHAFgHgCIgFgCIgFABIgCABIgKgBIgKAAIgNgBIgIABIgCAAIgJABIgDABIgEAAIgCAAIgSAAQg2AJg6ANIgnAJQgVAIgOAIIgOAGIgcATQgMAKgIARIgBABIAAACIACADQgIAEgHAAIgDAAQgNAAgKgKg");
	this.shape_23.setTransform(28.325,8.1293);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#E488B7").s().p("AiEBJQgSgCgHgEQgIgFgEgJQgCgFAAgGIAAgHQADgLANgOQAZgZAygXQBNgWBLgOIASAAQAXACATAHQALAEAJAGQAOAJAEAKQAFAMgGAOQgGALgNAHQgKAGgPADIgbAEQgZADgaAHQgRAFgLAFIgeAVQgTAMgPgBIgMgBQgDgBgNADQgJABgNAAQgPAAgWgCg");
	this.shape_24.setTransform(35.0711,13.2985);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#531515").s().p("AirBYQgJgNAGgOIAFgIIgFAAIgEgBQgJADgHABQgLACgIgDQgIgDgFgHQgFgGAAgIQAAgIAEgHIABgCQgFgGgCgJQgCgJAEgJQADgJAHgFQAMgJAaABQAUAAALgBIAcADQAwADBFgHQAzgHAagGQAfgGASgKIAUgMQAIgDAQgDQAOgDAMgFQAPADAIAHQAOAKAGATQAGASgHANQgFAIgKAEQgKADgJgFIgGgEIgFAAIgDgBQgTgHgYgBIgSAAQhMANhMAWQgxAXgaAZQgNAOgCAMIgBAHIgBABQgPANgKAAIgDAAQgNAAgIgLg");
	this.shape_25.setTransform(30.0285,9.0328);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#E488B7").s().p("AgxBSIgHgCIgFAAQgEgBgMACIgPAAIgZgDIgTgEIgGgDQgMgCgGgEIgEgDQgFgEgDgHQgCgFAAgGIAAgGIABgBIABAAIAAgBIACgGIABgCIAAgCQAHgMAFgFIAHgGQAHgHAIgGIASgNIAEgCIAegQIADgBIAjgKIAegIIAcgHIAggGIAZgEIAJgBIAMAAIAHABQAPABALADIAIACIAKAFIAHADQAHAEAFAGIAGAGQAHAIABAIIABAIQgBAJgFAJIgEAGQgIAHgJAFIgQAIIgJAEIgFABIgPADIgHACIgHACIgLAEIgfALQgQAGgMAGIgDACIgdARQgOAHgMAAIgEABIgHgBg");
	this.shape_26.setTransform(35.2423,15.4575);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#531515").s().p("AiTBmQgGgBgFgEQgGgDgDgIIAAgBIgBAAQgHgJACgMIAAgDQABgDACgFIgEgBIgDgCIgCAAIgEAAIgCABIgGAAQgHABgHgCIgGgBQgGgCgEgEIgDgEQgFgGgBgIIAAgBQgCgHACgGIABAAIABgCQgGgHgCgJIAAgBQgBgIAEgJIAEgGIAIgIIAHgDQANgDATAAIANAAIATAAIAdACIAFAAIAfABIAegBQAYgBAdgEIACAAIArgHIAjgHIAEgBQAcgGATgKIAHgEIANgHQAIgDAPgEIAFgCIAMgBIAIgBIAEABIACACQAKADAFAGIAAABIAFAFIAEAGQAGAJADALIAAAEQACAOgGAJIAAADQgCAIgHAFIgDABQgGADgFgBIgBAAIgFgCIgFABIgBAAIgDAAIgJgDQgPgFgUgCIgFAAIgMAAIgJABIgZAEIghAGIgcAHIgfAHIghAKIgEABIgdAQIgFACIgSANQgHAGgIAHIgHAHQgEAFgHAMIgBACIAAACIgCAGIgBABIgBAAIAAABQgJAFgHACIgHABIgEAAg");
	this.shape_27.setTransform(29.865,9.4667);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#E488B7").s().p("Ag1BaIgHgCIgGgBQgEgBgMABIgQgBIgZgFQgKgDgHgFIgFgEQgMgCgHgFIgEgDQgEgEgDgGQgDgGAAgGQgBgFACgEIADgGIAAAAIABgBIADgGIABgBIAHgNIABAAIAIgJIAGgGIAOgNIATgMIAKgFIAUgKIAEgCIAigLIAagHIAigIIAkgGIATgCIAHAAIAKgBIAJABIABAAIAAAAIABAAIAAAAIAJAAIAFAAQANACAIACIAJAEIALAFIAGAFQAHAFAEAHIAGAIQAEAIAAAJIgBAIQgBAKgHAJIgFAFQgJAHgJAFIgQAJIgJAFIgFACIgPAEIgHACIgHADIgKAHQgMAIgQAHIgdAOIgEACIgeAPQgQAFgNAAIgBAAQgEAAgGgCg");
	this.shape_28.setTransform(35.45,17.7792);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#531515").s().p("AiTBpQgGgCgDgFQgFgFgBgIIgBgBQgJgIAAgLIAAgDIACgIIgDgDIgDgCIgBAAIgDgBIgCgBIgGAAQgHAAgHgCIgHgBQgHgDgEgEIgCgDQgGgFAAgIIgBgCQgDgGgBgGIABgBIAAgBQgFgHgBgKIAAgBQgBgJAFgIIAEgGIAIgHIAIgDQAOgCATAAIANAAIAUAAIAdABIAGAAIAfABIAfgBQAZgBAdgEIADgBIArgHQAYgEANgDIAEgBQAcgHAUgJIAIgEIANgHIAWgJIAFgCIAMABIAIACIACACIACACQAKAEAEAHIABACIADAFIAEAGQAFAKACALIAAAEQABAOgIAIIABADQABAIgFAGIgBACQgEAEgFABIgBAAIgEABIgGACIgBAAIgCAAIgJgEQgLgEgQgBIgFgBIgJAAIAAAAIgBAAIgBAAIAAAAIgKAAIgKAAIgHABIgTACIgkAGIgiAHIgbAHIghALIgEABIgUAKIgKAGIgTAMIgOANIgGAGIgIAJIAAABIgIANIAAABIgEAFIAAABIgBAAIgBABQgJAFgJAAIgDAAQgEAAgEgCg");
	this.shape_29.setTransform(29.7241,9.83);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#E488B7").s().p("AguBkIgLgCIgIgDIgGgBQgGgCgJAAIgRgCQgQgDgLgEQgKgFgFgGIgEgGQgLgBgIgGIgEgDQgEgFgDgGQgDgGAAgGIABgJIAJgSIACgCIAAgBIAJgLIAGgHIAPgPQAJgIAIgGIAHgFQAMgHASgIIAIgDIAtgOIA9gOIAYgDIAogCIAMAAIABAAIAJABQARABAKAEIAJADQAGADAFAFIAGAEQAGAHAEAJIAEAIQADAKgBAKIgCAIQgDAKgIAIIgGAGIgUAMIgQAKIgJAGIgFACIgPAFIgHADIgGAEIgJAJQgLAKgQAKQgOAIgQAHIgDABQgPAHgRAHQgLADgKAAIgKgBg");
	this.shape_30.setTransform(35.7225,20.1167);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#531515").s().p("AiIBxQgGgBgFgDQgFgDgDgGQgEgGAAgJIABgCIgBAAQgKgGgCgLIgBgDIABgIIgDgDIgBgDIgBgBIgCgDIgCAAIgGgBIgPgDIgGgCQgHgCgFgEIgCgDQgFgGgCgHIAAgCQgGgGgBgGIAAAAIAAgCQgGgHAAgKIAAgCQAAgJAFgIIAEgFQAEgEAGgDIAIgDIAiAAIANAAIAVAAIAeABIAGAAIAgAAQARABAOgBQAYgCAfgFIADAAIAtgIIAlgIIAFgBQAbgHAWgJIAIgEIAOgHIAVgJIAEgDQAGAAAGADQAEACADADIADACIABADQAJAEAEAHIAAADIADAGIADAHQAFALABAKIgBAFQgBAOgJAHIACADQAEAHgBAHIgBADQgCAFgEADIAAABIgFACIgFADIgBAAIgDABIgJgEQgNgFgXgBIgEAAIgBAAIgMAAIgoABIgYADIg+AOIgsAOIgIADQgSAHgMAIIgHAFQgIAGgJAIIgPAPIgGAHIgJAMIAAABIgCACIgDAEIgBAAIgCABQgGACgGAAIgHAAg");
	this.shape_31.setTransform(29.6231,10.1481);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#E488B7").s().p("AgyBtIgMgEIgIgDIgGgBIgQgDIgRgEQgSgEgKgFQgKgGgEgIQgCgDAAgFQgLAAgIgHIgEgDQgFgFgCgGQgDgGgBgHIABgKQAIgQAGgIIABgBIABAAIAKgNIAAgBIAIgIIAGgHQAIgKAHgFIAOgJQALgHASgIIAGgCIAegLIAzgOQAfgHAcgBIABAAIAigBIABAAIACAAIABAAIALABIABAAIAMAAIAJABQAMACAHADIAKAEQAGAEAFAFIAFAFQAHAJADAJIACAKQACALgDALIgDAIQgEAKgJAIIgHAGIgWALQgHAFgIAHIgKAGIgEADIgPAGIgIADIgGAFIgIAMQgJANgQALQgNAJgRAIIgDABQgRAIgSAEQgJACgIAAQgIAAgHgCg");
	this.shape_32.setTransform(36.025,22.4875);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#531515").s().p("AiIB2QgGgCgFgEQgFgEgCgHQgCgIACgJIAAgCQgMgFgEgLIgBgCIgBgJIgBgEIgBgDIAAgCQAAgBAAAAQAAgBAAAAQgBgBAAAAQAAgBAAAAIgDgBIgFgBIgPgEIgHgCQgIgDgEgEIgCgCQgGgGgBgHIgBgCQgHgFgEgGIAAAAIgBgCQgFgIABgKIAAgCQAAgKAGgIIAEgEQAEgEAGgDIAJgDIAjACIANAAIAWAAIAeAAIAHAAIAgAAQATABAOgBQAYgCAfgGIAEAAIAtgIQAbgFAMgEIAFgBQAagHAYgJIAJgDIAOgHIAUgLIAEgEQAGACAFADQAFAEADAEIABAEIABACQAJAGADAHIABAEIABAGIADAIQAEAMAAAKIgBAEQgCAOgLAHIADADQAHAGABAJIABADQAAAGgEAGIAAABIgEAEIgGAEIgBAAIgCACIgJgFQgIgEgOgBIgIgBIgMAAIgBAAIgLgBIgCAAIgBAAIgCAAIgiAAIgBAAQgcACgfAHIgzAOIgeAKIgFADQgSAHgMAHIgOAJQgHAGgIAJIgGAHIgHAJIgBABIgKAMIAAABIgBABIgGAEIAAAAIgDABQgFACgEAAQgGAAgGgDg");
	this.shape_33.setTransform(29.4951,10.5266);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#E488B7").s().p("Ag3B2IgVgJIgngLQgUgFgJgGQgPgLABgPQgNgBgKgLQgKgKgBgOQAAgOAKgPIALgNIAKgMIAPgRQAIgKAHgGQAMgKAdgMQBZgjA/gBIA0ACQAfABAMAFIAKAFQAJAGAHAKQAJAPABARQABAQgJAQQgJAPgPAIQgRAHgIAGQgFADgJAJQgIAIgFADIgQAHQgJAEgEAFIgHAOQgNAegsASQgZALgWAAQgNAAgLgDg");
	this.shape_34.setTransform(36.3789,24.8318);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#531515").s().p("AiKB8QgOgIgCgOQgCgLAFgKIAAAAQgNgEgHgKQgGgKADgMQABgEgCgCIgCgCIgVgGQgNgEgHgFQgIgHgCgKQgKgFgEgFQgIgKACgOQACgNAKgIQAHgGANgDQAVADAdAAIA9gBIAgABQAUAAANgBQAZgCAjgHIAvgIQAigGALgEIA8gTQAWgJAPgPQAHACAFAGQAGAGACAIIABADQAHAGADAJIACALIACAJQAFAPgEALQgEAOgNAGQAQAIAEANQADAJgDAIQgDAJgHAEIgDACIgJgFQgMgGgfgBIg0gCQhBABhXAkQgdAMgMAKQgHAFgJAKIgOARIgLANIgIAEQgGACgFAAQgIAAgIgEg");
	this.shape_35.setTransform(29.5358,10.8995);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#E488B7").s().p("AgyBtIgLgEIgJgDIgFgBIgQgEIgSgDQgSgEgKgFQgKgGgEgJQgCgDAAgEQgMgBgIgHIgDgDQgFgFgDgHQgDgFAAgHIABgJQAJgTAIgJIACgCIAEgFIAFgHIAGgGIAJgJQAIgKAIgFIACgCQANgJAYgKIAHgDQBPgdA8gEIAtABIANAAIAQACIADABIAKACIAKADIABABIABAAIABABIAIAFIADAEIAFAFIACAEIAFAJQAEAHACAIIAAAEIABAHIgBAIIgEALQgDAIgGAHQgFAFgHAEIgSAJIgGAEQgFADgIAHIgGAEIgIAFIgPAGQgKAEgEAEIgIAMQgIAMgOAKQgNAJgRAIIgGADQgQAIgQAEQgJACgJAAQgIAAgIgCg");
	this.shape_36.setTransform(36.025,22.5167);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#531515").s().p("Ah/B5QgEAAgFgCQgLgEgFgIIgCgEQgDgJADgKIgBAAIgFgCQgIgFgEgIQgCgEAAgFIAAgJIAAgDQAAgBAAgBQAAAAAAgBQAAAAAAgBQAAAAgBAAIgBgBIgCgBIgNgDIgIgCQgHgBgFgDIgHgEIgFgFQgEgFgCgHIgBgCQgGgEgEgGIAAgCIgBgBQgFgIABgLQABgJAFgHIAEgGIAJgGIALgDIAgABIARAAIARAAIAfAAIALAAIAgABQATAAAOgBQAUgBAagFIANgCIAugIIAagFIASgFIAjgLIAXgJIABAAIAUgJQALgGAIgHIAEACIAHAFIAFAEIACAEIACAEIABACIADADIACADQAEAEACAFIABAIIABADIACAHIABACIAAAAIABACQADAFAAAHIgCALIgBAHIgEAHQgCADgFADIAAAAIADAEQAEADACAEQAEAGABAEIgBABIAAAEIgBAEIgBADIgBACIgCADIgFAFIgDABIgDAAIgIgEIgBgBIgBAAIgKgEIgKgCIgDgBIgQgCIgNAAIgtAAQg9ADhOAdIgHADQgYALgNAJIgCABQgIAGgIAJIgJAJIgGAHIgFAGIgEAFIgCADIgIAFIgEACQgDACgEAAIgBAAIgCAAg");
	this.shape_37.setTransform(29.6167,10.3875);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#E488B7").s().p("AguBkIgLgDIgIgCIgFgBIgQgCIgRgDQgQgCgLgEQgKgFgGgHIgDgFQgMgBgIgHIgDgCQgFgFgDgHQgCgGAAgFIAAgBIABgJQAIgRAGgIIADgDIAGgHIADgDQAIgKAHgFQAIgJAIgFIAJgGIAHgEIAWgKIAAAAIAGgDQBKgaA7gGIArgBIAGAAIALABIASACIADABIAKAEIAJADIABABIACABIADADIAFAGIADADQAEAEACAEQAEAGADAHIABAEIABAGIABAHQAAAGgCAFQgDAIgFAHQgEAFgGAEIgRAJIgGAEQgFACgIAGIgGADQgDADgFACIgPAFQgKADgEADIgJAKQgJAJgPAJIgdAPIgGAEIgeAMQgMAEgLAAIgJgBg");
	this.shape_38.setTransform(35.725,20.1641);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#531515").s().p("AiHBxQgLgBgGgGIgCgDQgFgGAAgKIgFgDQgHgFgDgIIgBgKIABgIIgBgDQAAAAAAgBQAAAAgBgBQAAAAAAAAQAAgBgBAAIgBgBIgCAAIgNgBIgIgCQgGgBgFgCQgFgCgCgCQgEgCgCgDQgEgGgBgHIgBgBQgFgFgCgGIAAgDIAAgCQgFgGAAgKIAAgBQAAgJAFgHIAEgHIAIgFIALgEIAfAAIARAAIAQAAIAfABIALAAIAfAAIAggBQAVgBAZgEIANgCIAugIIAYgFIASgEQATgGAPgGQANgGAJgDIACgBIAUgIQALgFAJgGIAEABIAIAEIAEAEIACADIADADIACACIACADIACADQAEAEACAFIADAIIABADIACAHIABABIAAABIABABQAEAEAAAHIgCALQABADAAAEIgCAHQgCADgEADIgBABIABADIAFAIQACAGABAEIgCABIgBADIgCADIgBACIgCACIgCABIgFACIgDABIgEgBIgGgDIgCgCIgBAAIgJgEIgKgDIgDgBIgSgDIgLgBIgGAAIgrACQg8AFhJAbIgGACIAAAAIgWALIgHADIgJAGQgIAGgIAIQgHAGgIAJIgDAEIgGAGIgDAEIgBABIgGAGIgEADIgFADIgCAAIgFABIgEgBg");
	this.shape_39.setTransform(29.825,9.9125);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#E488B7").s().p("AgrBbQgDABgGgCIgIgDIgFAAQgFgBgLAAIgRgBQgOgCgMgDQgJgDgIgEIgEgFQgMgBgHgFIgDgDQgGgFgDgGQgCgGAAgFIAAgBQgBgEABgEQALgVAHgHIAHgIIAPgOIAKgIIACgCQAMgIASgJIALgFIAFgDIBSgWQAXgFAXgDQARgDAXgBIAQABIAIAAIARADIADACIAJAEIAHADIABABIAFAGIADACIAHAGIAJANIABACIADAHIADAFIgBALQgCAHgFAHQgEAGgFAEIgPAJIgGADIgOAIIgFACIgJAEIgOAEQgKACgEADIgKAGQgLAIgPAHIgdANIgGAEIgcAOQgOAGgMAAIgEgBg");
	this.shape_40.setTransform(35.4917,17.8071);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#531515").s().p("AiYBpIgDgCQgGgFgCgIIgBAAIgEgDQgHgHgCgIIABgKIACgIIgDgCIgCgCIgBgBIgCAAQgGABgHgBIgIAAIgMgDIgGgEIgGgGQgEgFgBgGIgBgDQgDgFgBgGIABgDIAAgBQgFgHgBgJIAAgBQAAgJAEgIIAEgGQAEgEAEgDIAKgEQANgBASAAIAQAAIAQAAIAdABIALABIAgAAQARAAAPgBIAtgFIANgCIAsgHIAYgFIASgEQASgFAPgHIAWgKIABgBIAVgHQAMgEAJgGIAEABIAIADIAEADIACACIADACIACACIADADIABADIAIAJIADAIIABADIACAHIABACIAAAAIABABQAFADAAAHQABAEgCAHQACACAAAEQABADgCAEQgBAEgEADIgBACQAAAAAAABQAAAAAAAAQAAAAAAABQAAAAgBAAIADAIIACAKIgCACIgDACIgCABIgCACIgCAAIgDABIgFAAIgDgBIgDgBIgIgFIgBgBIgDgBIgHgDIgJgDIgDgCIgRgDIgIAAIgQgBQgXABgRADQgWADgYAEIhSAWIgFADIgKAFQgSAJgNAIIgCACQgGAEgHAHIgPAOQgHAHgDAGIgGAHIgDADIgEAFIgCAAQgEACgEAAIgHABQgGAAgEgDg");
	this.shape_41.setTransform(30.0538,9.5114);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#E488B7").s().p("AgxBSIgHgCIgFAAQgEgBgMACIgQAAIgZgDIgSgEIgGgDQgMgCgHgEIgDgCQgFgFgDgHQgDgFAAgFIAAgBQAAgEABgEQAKgUAGgHIAHgGIAGgFIAFgEIAEgEIAKgHIABgBIACgCIAEgCIAQgJIATgJIAEgCIASgGIARgFIAfgIIAbgGIAdgFIAmgGIAQAAIABAAIACABIALABIAEABIACAAIADABIAIACIAAAAIAIADIADADIABABIAFAEIADACIAHAFIALALIACACIADAGQADADACABQABAFAAAGQgCAHgEAHQgDAGgEAEQgHAFgHAEIgGADIgOAGIgFACIgJACIgOADIgOAEIgLAEIgcALQgQAGgMAGIgGADIgaAQQgPAHgNABIgCAAIgHgBg");
	this.shape_42.setTransform(35.275,15.4813);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#531515").s().p("AiZBnIgDgCQgIgCgFgIIgEgDQgGgHgBgIIACgLIADgIIgEgBIgDgCIgBAAIgCAAQgGACgHAAIgIAAQgGAAgFgCQgEgBgCgDQgEgCgDgEQgEgFgBgGIAAgDQgCgGABgGIABgCIABgCQgFgHgCgIIAAgBQgBgJAEgIIAEgHQADgEAEgDQAFgDAFgBQAMgDASAAIAQABIAPAAIAdABIALABIAfAAIAfgBQAVgBAYgDIANgCIAsgHIAWgFIASgEQATgFANgHQAPgJAGgCIACgBIAVgGQAMgDAKgFIAEgBIAIADIAEADIACAAIAEABIADADIACADIABACQAFAEADAGIAEAIIACADIACAHIABABIAAAAIABAAQAGADAAAGQABAEgCAIQADABABAEQABAEAAAEQgBAEgDADIgCACQAAAAgBABQAAAAAAAAQgBAAAAAAQAAABgBAAIACAJIAAAJIgDACQAAABgBAAQAAAAgBAAQAAABgBAAQgBAAAAAAIgDAAIgDAAIgCAAIgDgBIgFgCIgDgCIgEgBIgHgEIgBgBIgIgEIgCgCIgDgDIgIgDIAAAAIgIgCIgDAAIgCgBIgEAAIgLgCIgCAAIgBAAIgQAAIgmAFIgcAFIgdAHIgfAHIgQAFIgSAFIgEACIgTAJIgQAJIgEADIgCACIgBAAIgKAIIgEADIgFAEIgLAKQgGAHgEAGIgFAHIgCAEQgCADAAAEIgBAAIgIAEQgIADgGAAIgEAAg");
	this.shape_43.setTransform(30.3713,9.2438);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#E488B7").s().p("AiEBJQgSgCgHgEQgIgFgEgJQgCgFAAgGIAAgHQADgLANgOQAZgZAygXQBNgWBLgOIASAAQATABAQAFIACADQADAEAGACIAJAFIAPAKIAEAFQADACAEABQAEAMgGAOQgGALgNAHQgKAGgPADIgbAEQgZADgaAHQgRAFgLAFIgeAVQgTAMgPgBIgMgBQgDgBgNADQgJABgNAAQgPAAgWgCg");
	this.shape_44.setTransform(35.0722,13.2985);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#531515").s().p("AiyBYQgJgNAGgOIAFgIIgFAAIgEgBQgJADgHABQgLACgIgDQgIgDgFgHQgFgGAAgIQAAgIAEgHIACgCQgGgGgCgJQgCgJAEgJQADgJAHgFQAMgJAaABQAUAAALgBIAcADQAwADBFgHQAzgHAagGQAfgGASgKIAUgMQAIgDAQgDQAPgDALgFIANAEIACgBQAHgBACAHIACACQAIAHAFALIACADIACAHIABABIACAAQAGABABAHQAAAEgCAIQAEAAACAEQACAEAAAEQAAAEgCAEQgDAFgFgBIAAAJQAAAGgBADQgEAFgFgBIgDgCIgEAAIAAAAQgDgBgDgCIgFgEIgPgLIgIgEQgGgDgEgDIgCgDQgQgFgTgBIgSAAQhMANhMAWQgxAXgaAZQgNAOgCAMIgBAHIgBABQgPANgKAAIgDAAQgNAAgIgLg");
	this.shape_45.setTransform(30.7025,9.0328);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#E488B7").s().p("AhlBAIgegCQgRgCgJgDIgEgDIgGgEIgCgEIgDgFIgBgCIAAgCIAAgBQAIgRAMgKIAcgRIAOgHQAPgIAVgJIAlgJQA7gNA3gJIANAAIAGAAQASABAQAEQAGAFAGACIAIAEIAQAIIAFAEIAEACQACAIgEAKIgDAFQgIALgMAGIgJAEIgEACIgMADIgbADIgNACIglAIIgFABIgXAHIgZANIgGADQgSAKgRAAIgHgBIgEAAQgEgBgLACIgLABIgJAAIgIAAg");
	this.shape_46.setTransform(33.2981,12.0239);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#531515").s().p("AiqBKQgHgHgBgHIABgFIAAgBIABgCIABgDIgFgBIgEgBIgJACIgGABQgLABgIgDQgHgDgGgGQgFgFgBgHIgBgDIAAgHIACgEIABgCIgBgBQgEgEgCgFIAAgCIgBgDIAAgEIACgJIABgEIABgDQAEgFAGgDIAHgDQAOgDAQABIABAAIAaABIAFAAIAcADIAXABQAnABA3gEQAvgGAfgFIAJgBQAZgFAOgHIABAAQAPgIAGgCIABAAQAIgDAOgDQAPgEAMgEQAHAAAGACIACgBIADAAQAEABACADIACACQAIAFAGAHIABACIABABIADADIAAABIACAAQAEAAACADIAAABIABABIAAADIgBADQAEAAACACIACAEIAAACIAAAEIAAABQgBAEgEgBIACAHIAAACQABAGgBADQgDAFgDAAIgDAAIgDAAIgCgBIgDgBIgDgCIgOgFIgBAAIgHgCIgCgBIgHgDIgCgCIgEAAIgJAAIgJAAIgDAAIgKgBIgSAAIgBAAIgOAAQg3AJg8ANIgkAIQgVAJgPAIIgOAHIgcASQgMAKgIARIAAABIAAACIABACQgJAFgIAAIgCAAQgOAAgJgKg");
	this.shape_47.setTransform(28.875,8.2043);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#E488B7").s().p("Ag4A0IgFAAQgFgBgKACIgKAAIgRgBIgegBQgPgCgKgDIgFgBIgGgDIgCgDIgEgFIgBgBIAAgBIAAgBQALgPANgIIAegNIANgGIAlgPIAmgHQA7gLA2gHIATgBIADAAQAQABAPACQAHAEAFACIAJADIAQAFIAFADIADACQAAAIgFAIIgEAEQgKAKgMAGQgEACgFABIgEACIgMADIgZAEIgOACIgkAGIgFACIgXAFQgHABgTAJIgGACQgRAHgSABIgHgBg");
	this.shape_48.setTransform(31.625,10.775);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#531515").s().p("AikA9QgIgFgEgFQABAAAAAAQAAgBAAAAQAAAAAAAAQAAgBAAAAIgBAAIAAgCIAAgCIgFgBIgEgBIgJABIgGAAQgKAAgJgDQgHgCgFgFQgGgFgCgFIgBgDIgCgGIABgFIAAgCIgBgBQgDgEgCgEIgBgDIgBgCIAAgEIADgJIABgDIABgDQAFgEAGgCIAHgBIAeABIABAAIAbABIAEAAIAdADIAWABQAnACA3gDIBOgIIAKgBQAbgEANgGIABAAQANgHAHgCIABAAIAXgFQAOgDAMgFIAOABIACgBIADAAQAEAAACACIACABQAJADAGAEIABABIABAAIADABIABABIABgBQAEgBACABIABAAIAAABIAAABIAAABQAEgBACABIACACIABABIABACIAAABQAAAAAAABQAAAAAAAAQAAABAAAAQAAAAgBgBIAAABQABADADADIAAACIAAAJQgBAFgDABIgBAAIgCABIgCAAIgCABIgCgBQgFACgHgBIgBAAIgIABIgCgBQgEAAgCgBIgDgBIgDAAIgJACIgJACIgDAAIgKgBIgSAAIgIABIgCAAIgTABQg2AHg9AKIgkAHIglAPIgOAGIgdAOQgNAIgMAPIAAABIAAABIABABIgGABIgDAAQgNAAgKgIg");
	this.shape_49.setTransform(27.2583,7.3553);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#E488B7").s().p("Ag8AqIgEAAIgOgBIgKAAIgRgBIgdgBQgPgBgLgCIgEgCIgHgBIgDgCIgGgEIAAgBIABgBIABgBIADAAQANAAAPgFIADAAIAFgDIACgCQAGgCAFgDIALgHIAYgJQAKgFAagGIAbgGQBQgKA8gHIAXACIAMADIAIACIASAEIAGABIACABQgEAHgGAHIgEAEQgMAKgMAEIgJAEIgEABIgLADIgaADIgMACIgjAGIgHABQgIACgOACQgJABgSAFIgHACQgQAFgTABIgIAAg");
	this.shape_50.setTransform(30,9.575);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#531515").s().p("AiIA7QgOgBgKgFIgOgIQAAABAAAAQAAABAAAAQAAAAAAAAQgBABAAAAIgBAAIgBgBIgBgBIgFgBIgEgBIgKgBIgFAAQgKgBgIgCQgHgDgGgEQgHgEgDgEIgBgCIgEgGIAAgEIAAgDIgBgBIgGgJIAAgCIgBgCIABgEIADgJIABgDIABgCQAFgCAHgBIAHAAIAdADIACAAIAaADIAFAAIAdADIAWABQAmACA4gCIBPgFIAJgBQAdgDALgEIABAAIAWgHIABAAIAWgFIAbgIIAOgBIACgBIADAAIAGAAIACABQAKAAAFABIACABIABgBQAAAAABAAQAAAAAAAAQABAAABgBQAAAAABgBIACgBIAFgCIAAgBIACAAIAAgBQADgCADgBIACAAIABABIACAAIABAAIACAAIAAABQACAEADACIABACIACAJQgBAEgBACIgBACIgBACIgBAAIgBABIgCACQgDAFgHACIgBAAQgCACgFABIgCAAIgHAAIgCAAIgDABQgGADgEABIgJADIgDABIgKgBIgRABIgOABQg8AGhRAKIgaAGQgaAGgKAFIgZAKIgLAHQgEADgGACIgCACIgFADIgDAAQgPAFgNAAIgDAAg");
	this.shape_51.setTransform(25.825,6.075);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#E488B7").s().p("AhRAeIgKgBIgQgBIgdgBIgZgCIgFgBIgHAAIgDgBIgHgCIAAgBIAAgBIAOgHIABAAQAOAAAQgCIACAAIAHgBIACgBIAMgEIAMgEIAagIQAKgDAbgEIAdgEICEgMIAQABIANABIAJABIARACIAGAAIACABIgOALIgEAEQgOAIgMAEIgJAEIgEABIgLACIgYAEIgOACIgiAFIgGABIgXACQgKAAgSADIgHABQgOADgVABIgHAAIgFABIgOgCg");
	this.shape_52.setTransform(28.375,8.375);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#531515").s().p("AiBA7QgPgBgMgDIgSgEQACADgEACIgBABIgCAAIgCgBIgFgBIgEgBIgKgBIgFgBIgRgEIgOgFQgHgEgEgDIgBgBIgGgFIgBgFIgBgDIgBgCIgFgIIgBgDIAAgBIAAgEIAFgIIABgDIAAgCIANAAIAHABIAdAHIACAAIAbABIAFABIAdADIAWACQAlABA4AAIBPgDIAKAAQAfgDAKgCIABAAIAVgFIABAAIAXgEQANgDAOgFIAOgCIADgBIACgBIAHgBIACAAIAQgEIACAAIAAgBQACgBACgEIABgBIACgBIAEgFIABgCIABgCIACgDIAFgFIACgCIACgBIADgBIABgBIAHAAIAAABQACADAEABIABADIADAJIAAAGIAAADIAAADIgBABIAAACIAAAFQgDAHgGAFIgBAAQgCADgFADIgCAAIgHABIgCABIgDABIgKAGIgJAEIgDACIgKAAIgQAAIgYACIiEALIgcAEQgbAEgKADIgaAJIgMAFIgMADIgCABIgHABIgCAAQgRADgNAAIgBAAg");
	this.shape_53.setTransform(24.4,3.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_15},{t:this.shape_14}]}).to({state:[{t:this.shape_17},{t:this.shape_16}]},1).to({state:[{t:this.shape_19},{t:this.shape_18}]},1).to({state:[{t:this.shape_21},{t:this.shape_20}]},1).to({state:[{t:this.shape_23},{t:this.shape_22}]},1).to({state:[{t:this.shape_25},{t:this.shape_24}]},1).to({state:[{t:this.shape_27},{t:this.shape_26}]},1).to({state:[{t:this.shape_29},{t:this.shape_28}]},1).to({state:[{t:this.shape_31},{t:this.shape_30}]},1).to({state:[{t:this.shape_33},{t:this.shape_32}]},1).to({state:[{t:this.shape_35},{t:this.shape_34}]},1).to({state:[{t:this.shape_37},{t:this.shape_36}]},1).to({state:[{t:this.shape_39},{t:this.shape_38}]},1).to({state:[{t:this.shape_41},{t:this.shape_40}]},1).to({state:[{t:this.shape_43},{t:this.shape_42}]},1).to({state:[{t:this.shape_45},{t:this.shape_44}]},1).to({state:[{t:this.shape_47},{t:this.shape_46}]},1).to({state:[{t:this.shape_49},{t:this.shape_48}]},1).to({state:[{t:this.shape_51},{t:this.shape_50}]},1).to({state:[{t:this.shape_53},{t:this.shape_52}]},1).to({state:[{t:this.shape_15},{t:this.shape_14}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4.7,-4.8,62.5,43.9);


(lib.girlhand3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFC3C3").s().p("AA2ESQgrgHhJgZQgugQgagNQgMgGgVgNIghgTIgdgPIgdgQQgbgSgkghQghgegLgXQgKgWAAgdQgCg6AcgdQAbgeA7gCQgcgQgMgPQgPgVACgcQADgdAUgRQAQgPAZgFQA2gMBFAmQAQAJAmAZQAiAXAUALIAhAQQAUAKAMAJIAdAYIAFAEQABgtALgZQARgnArgSQAsgSAnARQAmAQAdAsQAKARALAXIASAqQAYA1AHAeQAGAbAAA0QAAA1gKAbQgJAagjArQgSAXgMALQgSASgSAIQgSAJgaADQgQACgeAAQhLAAglgGg");
	this.shape.setTransform(37.5682,27.9651);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,75.2,56);


(lib.girleyes = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// eyelid
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AKRB7QgOgHgRgNIgdgWQghgZgjgUQgggRgdgGQgWgFgkAAQiAADhRA1QgVAOgKAEQgSAJgPgFQgKgDgHgJQgGgIAAgLQAAgPAUgUQAugsBEgaQA+gYBJgGQA/gGAxAMQArALA6AiQAxAcAVAWQAdAeAJAlQAGAagNAKQgGAGgKAAQgKAAgOgHgAq5BFQgJgLABgOQABgUAWgZQA1g+BLgjQBCgeBKgBQA9gBAuAYQAfARAiAiQAcAeAKAZQAIARgEAOQgCAKgJAEQgFACgLgDQgRgEgUgNIgvgkQgcgXgWgHQgZgJglADQg+AEg6AbQg5AagrAuIgOAPQgJAHgJAAIgBAAQgMAAgJgLg");
	this.shape.setTransform(67.5033,13.911);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AKRBNQgOgDgRgGIgdgLQghgMgjgKQgggIgdgDQgWgCgkAAQiAABhRAaQgVAHgKACQgSAEgPgDQgKgBgHgEQgGgEAAgFQAAgIAUgJQAugWBEgLQA+gMBJgDQA/gDAxAGQArAFA6AQQAxANAVALQAdAOAJASQAGANgNAFQgGADgKAAQgKAAgOgEgAq5AZQgJgGABgHQABgLAWgNQA1ghBLgSQBCgQBKgBQA9AAAuAMQAfAJAiATQAcAQAKANQAIAJgEAHQgCAFgJACQgFABgLgBQgRgDgUgHIgvgSQgcgMgWgEQgZgFglACQg+ACg6AOQg5APgrAXIgOAIQgJAEgJAAIgCAAQgLAAgJgGg");
	this.shape_1.setTransform(67.5033,18.8556);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AKLBDIgQgBIgPgCIgegFIhDgLIgUgDIgogEIg5gDIgsgBIhfgEQgbACgqgCIgWABIgIAAQgTgBgMgGQgHgEgDgFQgDgDAAgEIAAgBQACgIAMgGQAUgLAXgDQAQgDAdAAIAfAAQA9AABIABQA5ABA1ADIArAEQAhADAXAFQAiAEAWAGQAbALAIAIQAIAIAAAKQACANgMAGQgMAGgVAAIgEgBgAqeACIAAAAQgLgCgIgFIgGgFQgDgDAAgDIAAgBQAAgDAEgEQAIgIANgHQAZgMAfgFQAegGAsABIAKAAIBDgEQAlgCAYAAIAKAAQAZABAgACIAlACIASABIAhABQAIAAAHABQAIACAHADQAHAEAGAFQAGAGACAHIAAADQADAJgHAHQgDAEgGADIgFABIgJACQgSADgRgBQgIABgRgCIgVgCIgngEIgMgCQgUgCgiABIgHAAIgzACIg6AEIgIABIhPAEIgXACIgOACQgKAAgIgCg");
	this.shape_2.setTransform(67.0587,21.6019);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AHvBEQhcgDgugGQgqgFg0gMIhcgWQgcgHgIgLQgFgHADgKQACgJAJgHQAQgLAbABQAMAAAhAHQCCAcC3ABIA4AAQAfACAYADQAZAFAJALQAGAJgEAMQgEAKgLAHQgQAKgiADQgcADgnAAIhBgCgAoMATQgcgEg7gPQgkgIgTgJQgMgHgKgIQgEgDAAgCQgBgEAFgEQAegXAzAEQAcADA3AMQAbAEAoAAIBEAAIA4ACQAggBAWgIIAggNQAUgGANAEQAJADAGAHQAFAHAAAIQgBAOgZANQglATgaAHQgaAIgkABIhBABIg5AAQgiAAgXgCg");
	this.shape_3.setTransform(66.7989,23.4722);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AJ4BBIgOgCIgegDIhDgHIgUgCIgogDIg4gDIgsgDQgugCgxgGQgXABgugGIgWgCIgIAAQgUgDgKgHQgGgFgCgFQgCgDAAgEIAAAAQACgHALgIQAUgLAYgCQAOgBAeACIAgACICEAGQA3ACA2ADIArADQAjACAUADQAiAEAXAFQAbAKAHAHQAIAJgBALQgBALgLAHQgNAGgYABIgQAAgAkcAAIgWAAIgnAAIgNgBIg1gBIgGAAIg0ACIg5AAIgIAAQgiACgtgDIgXAAIgPgBIgRgDIAAAAQgKgDgIgGIgGgGQgDgCgBgCIAAgBQAAgEAEgEQAJgIANgGQAZgLAggCQAcgDAuAEIAJAAQAdAAAmgBIA8gBIALAAIA4ADIAlAAIASgBIAggFQAJgBAHABQAJABAGADQAIADAGAHQAGAGABAHIAAAEQABAIgIAHQgDAEgGACIgFACIgIACQgSAGgRABQgHACgKAAIgGgBg");
	this.shape_4.setTransform(66.9309,22.4);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AKNBHIgQgDIgPgDQgRgFgMgCIhEgOIgTgDQgWgEgTgBQgZgCgggBIgtAAIhfABIhFAEQgMADgKAAIgIABQgTABgNgFQgIgDgEgFQgEgDAAgEIAAgBQABgIAOgHQAVgKAWgFQASgEAagBIAfgCQA+gEBIgBQA7AAA0AEIArAFQAfAEAZAGQAjAGAVAHQAcALAHAIQAJAIACAJQAEAOgMAFQgKAFgPAAIgOgBgAqfAMIgBAAQgLgCgIgGIgGgEQgDgDAAgDIAAgBQAAgDAEgEQAHgIAOgIQAYgNAegHQAggJArgDIAJAAQAfgEAlgCQAigDAbAAIALAAQAbABAeACIAlAFIATACIAgAFIAPAEIAOAGQAIADAFAFQAHAGACAGIABADQAFAJgGAIQgDAEgHACIgGAAIgJABQgSACgSgDQgGABgTgEIgVgFIgngHIgMgCQgUgDgiABIgHAAQgdABgXACQgfACgbAEIgIABIhPAMIgWAFQgJADgGABIgJABIgIgBg");
	this.shape_5.setTransform(67.1895,20.6618);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AKRBkQgOgFgRgKIgdgQQghgTgjgOQgggNgdgFQgWgDgkAAQiAAChRAnQgVALgKADQgSAGgPgEQgXgOAAgIQAAgMAUgOQAuggBEgUQA+gRBJgFQA/gEAxAJQArAHA6AaQAxATAVASQAdAVAJAcQAGATgNAIQgGAEgKAAQgKAAgOgFgAq5AvQgJgIABgLQABgQAWgTQA1gvBLgbQBCgXBKAAQA9gBAuASQAfANAiAaQAcAXAKATQAIANgEALQgCAHgJADQgFACgLgCQgRgEgUgKIgvgbQgcgRgWgGQgZgGglACQg+ADg6AVQg5ATgrAkIgOALQgJAFgJAAIgBAAQgMAAgJgIg");
	this.shape_6.setTransform(67.5033,16.4038);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},27).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape}]},1).wait(1));

	// pupil
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#0000FF").s().p("AGTBsQgRgDgJgHQgPgKgFgWQgDgLAAgcQABgmAIgVQAFgOAJgMQAFgHAJgIQAKgJAIgDQAGgCAPgBQAdAAAMAKQAMAKAEAWQAIAqgKA2QgDASgFAMQgHAQgMAHQgMAIgSAAQgLAAgOgDgAm6AzQgYgDgMgTQgPgUAEgnQADgXAEgTQAEgQAGgGQAGgGAOgEQATgHANABQAMACALAKQAKAJAFANQAIAUgDAhQgEArgUASQgQAOgTAAIgGgBg");
	this.shape_7.setTransform(54.3719,22.484);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#0000FF").s().p("AGTBZQgRgEgJgGQgPgLgFgVQgDgLAAgcQABgVACgQIALgEIATgJQAOgFAfgFIAmgFIASgBQAGAngJAyQgDASgFALQgHAQgMAIQgMAIgSAAQgLAAgOgDgAm6AgQgYgEgMgSQgPgUAEgnIAEgbIAKACQASACAWgEQARgDAPgEQANgEAKgEQAFAUgCAcQgEArgUATQgQANgTAAIgGAAg");
	this.shape_8.setTransform(54.3741,24.4281);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#0000FF").s().p("AGoBFIgQgEIgKgDIgKgDIgJgGQgHgFgEgJIAAgBQgCgFAAgKIAAgOIAAgBQABgLADgKQAPgLAGgCIAOgEIAXgDIAPAAIAOAAIAOACIAFALIADAMQADAOgEAUIgBAGQgCAJgEAGIgDAGQgHAJgLAEIgDABQgJACgJAAIgFAAgAmyAVIgCAAIgGAAQgLgCgIgIIgFgEIgGgGQgFgGgCgJQgBgJABgLIADgUIAHgBIAGgDIAXgEIATgEIAFAAIASgCQAFAIACALIABANIAAAJQgBAPgEAKQgEAIgGAGIgGAEQgJAFgMAAIgCAAg");
	this.shape_9.setTransform(54.6193,23.9361);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#0000FF").s().p("AG2AxQgLAAgFgBIgQgHIgPgDQgJgBgDgGQgCgDAAgIIAAgKQACgJAFgFIADgDIANgFIAJAAQAQAAAIABQAMAEAJAEIAHAEIAGAGQAHAIgEAPQgDAKgFAEQgGAGgOAAIgEgBgAnBAIIgKgFQgHgDgDgEQgCgFABgIQACgPAIgIQAJgKATABQATACAGALQADAEACAKQACAKgDAIQgCAJgJAEQgFADgJAAIgCAAIgFABQgHAAgHgFg");
	this.shape_10.setTransform(54.8845,23.2519);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#0000FF").s().p("AGoA+IgPgEIgIgDIgKgDIgHgEQgJgEgDgIIAAgBQgCgEAAgJIAAgNIAAAAQABgLAEgIQAOgJAFgDIANgCIATgCIAOAAIAMABIANADIAGAJIAEAKQAFAMgEASIgCAFQgCAJgDAFIgEAEQgHAIgLACIgDABIgOABIgGAAgAmwASIgCAAIgFAAQgKgCgIgGIgEgDIgGgGQgGgEgCgIQgCgHABgKIAAAAQABgKADgIIAFgDIAFgDQAIgEAMgCQAIgCAKAAIAEgBIAQAAQAFAHADAJIACAMIAAAHQABAOgEAJQgDAHgGAFIgGAFQgIAEgLAAIgBAAg");
	this.shape_11.setTransform(54.6991,23.7292);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#0000FF").s().p("AGpBMIgTgDIgKgDQgHgCgFgDIgJgHQgHgGgDgKIAAgBQgCgGgBgLIAAgQIAAAAQABgNADgLQAPgMAIgDIAPgFIAZgEIARgBIAPAAIAQAAIAEAOIACAOQACAQgEAVIgCAHQgBAKgEAHIgDAHQgHAMgLAEIgEACQgJAEgKAAIgFgBgAm0AZIgCgBIgHAAQgMgDgIgJIgFgEIgGgIQgFgHgBgKQgCgKACgMIAAAAIADgXIAIAAIAHgBIAagEIAVgEIAGgBIATgEQAFAJABANIAAAPIAAALQgCAPgFAMQgEAJgHAGIgGAEQgLAHgNAAIgCAAg");
	this.shape_12.setTransform(54.508,24.1091);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#0000FF").s().p("AGcBiIgPgDQgJgCgGgEIgIgGQgLgJgEgQIgCgGQgCgLAAgZQAAgXADgSQAPgQAHgGIAHgGQAGgEAKgFQAJgGAJgCIAVgDIATAAQAMABAHACQAIAOABAUQADAbgEAgQgCAQgEAOIAAABQgFAPgGAJIgFAGQgHAIgKADQgKAEgOAAIgNgBgAm/AmQgSgEgKgNIgEgGQgNgTAEglIAEgdIAGgEQAIgIAKgEQAGgDAJgCIAEgBQARgFAMgBIACAAQANAAAJACQAHAKADAOQABAKAAAMQAAAOgCAOQgEAagMAPQgGAIgHAFQgMAHgOABQgHAAgGgCg");
	this.shape_13.setTransform(54.3467,23.625);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7}]}).to({state:[{t:this.shape_8}]},27).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_7}]},1).wait(1));

	// white
	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AFFCKQgLgCgVgGIghgIIg2gHIgHgBIgJgFIgagPQgPgKgGgMQgHgNACggQACgrAUgNQAKgHAdgBQAOAAAxgGQAOgCAFgDQAGgEALgKQAQgKAjAFICIAQIA+AKQAgAGATAKQAbAPAKAWQALgDALAFQAMAFAGAJQAGAKAAAMQgBANgHAJQgHAKgRAHIgcALQgLAEgVALIgDABQhlAShnAFIgYABQgTAAgOgCgAoaBTQgxAAgagGQgOgDgQgGIgQgXQgPgVgDgLQgHgUAMgOQAKgLAagCQAlgDAkAEQAAgHAFgLQAFgNABgFIAAgVQACgSAZgOQAXgOAVgDQARgCAmAGQBFANAoAKQAwAOAIAbQACAIACABQADACAIAAQAUAAAKAQQALAPgHATQgDAHgGAFIgnAQIhGAbIg5AVQghAKgaAEQgZAEguAAIgVgBgApGAaIARAAQAKAAAHgCQgEgDgFgGIgCgCQAAAAgBAAQAAAAgBAAQAAABgBAAQAAAAgBABQgKAJgOgEg");
	this.shape_14.setTransform(67.8978,19.9016);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AFFBkQgLgCgVgGIghgIIg2gHIgHgBIgJgFIgagPQgPgKgGgMQgHgNACgfIAAgDQALAAAMgCQAQgDAagJQAegKAMgDQAcgGAyAAIBeAAQAdAAAOACQAQACAuANQAnAKAYAAQAQgBAHACQAFACAPAMQARAMAVAGIAOACQgBALgGAHQgHAKgRAHIgcALQgLAEgVALIgDABQhlAShnAFIgYABQgTAAgOgCgAoaAtQgxAAgagGQgOgDgQgGIgQgXQgPgUgDgLQgHgVAMgOQAKgLAagCQAlgDAkAEQAAgHAFgLIAAgBIAOgEQAjgIBAABIA9AAQAcAAAQACQAZADASAIIATAJQALAGAIADIAPADQAJACAGADQAHAFAJALQgDAGgFAFIgnAQIhGAaIg5AVQghAKgaAEQgZAEguAAIgVgBg");
	this.shape_15.setTransform(67.8836,23.7058);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AFXBLIgCAAIgegGIghgHIgfgFIgXgEIgIgCIgJgEIgcgLIgRgIIgKgHQgLgIgEgNQgCgHACgJIAAgBIAAgDIASgJQAQgGAYgDQAVgEAVABIBRADQAvAEAxABIAqACQAYACAnAHIAfAEIAfACQAQgBAIACQALACALAFQAPAGAPADIAKADIAPAEQACAFAAAFIAAAGQgBAGgEAGQgEAFgHAFIgIAEQgKAFgKADIgdAIIgEABQg5AJhFABIhRABQgjAAgWgDgAoNAcIgKgBQgngCglgKIgdgJQgKgFgLgKIgBgBQgLgLgHgJQgDgDAAgCQgBgEACgEQAEgMAMgIQAOgJAYAAIAPgBQAaABAhAFIAMgHIACAAIACAAIAKgBIA4gCIAsgBIAZAAIAjABIAVABIAZAAIAdgBIAMAAQAHAAAMABIABAAIAUACIAMADIADABQAHABAFAEIACADQAEADACAHQABAEAAAGIgIAJIgNAHIgYALIgpAPIgfAJIgbAFQgOAEgVACIgaADIghAEIgYACIgPAAIgrgBg");
	this.shape_16.setTransform(67.2208,24.05);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AHvBEQhcgDgugGQgqgFg0gMIhcgWQgcgHgIgLQgFgHADgKQACgJAJgHQAQgLAbABQAMAAAhAHQCCAcC3ABIA4AAQAfACAYADQAZAFAJALQAGAJgEAMQgEAKgLAHQgQAKgiADQgcADgnAAIhBgCgAoMATQgcgEg7gPQgkgIgTgJQgMgHgKgIQgEgDAAgCQgBgEAFgEQAegXAzAEQAcADA3AMQAbAEAoAAIBEAAIA4ACQAggBAWgIIAggNQAUgGANAEQAJADAGAHQAFAHAAAIQgBAOgZANQglATgaAHQgaAIgkABIhBABIg5AAQgiAAgXgCg");
	this.shape_17.setTransform(66.7989,23.4722);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AGVBKQgigBgXgDIgCAAIgdgGIghgHIgfgFIgYgFIgIgCIgJgDIgcgKIgTgHIgLgGQgNgHgFgMQgDgGACgJIAAgBIABgDIAQgLQAQgHAYgCQATgDAYADIBRAHQAuAEAyADIAqACIA/AGIAgADQARABANAAIAYABQAMABALAEIAfAHIAKADIAOAFQAEAFABAEIABAHQAAAGgEAGQgDAGgHAEIgHAFQgKAFgLADIgdAIIgEAAQg3AHhHAAIhRAAgAoMAYIgLgBQgjgDgpgKIgcgIQgNgFgLgJIAAAAQgMgKgIgJQgDgCAAgDIAAAAQgBgEADgEQAGgLANgHQAPgIAXAAIAQAAQAYABAkAGIAOgDIACAAIABAAIALAAIA4gBIAsAAIAZAAIAjABIAUABIAagBIAcgDIANgBIATgDIABAAQALAAAJABQAFAAAHACIADABQAHACAFAFIACACQADAFACAGQABAFgCAFQgDAFgFAEIgNAHIgYAMQgWAJgSAFIggAIQgOADgOACQgMADgYABIgaACIghADIgYABIgMAAQgYAAgVgCg");
	this.shape_18.setTransform(67.0625,23.8917);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AFRBTIgBAAIgfgGIghgIIgfgEIgXgEIgHgCIgKgEIgbgMIgQgKIgJgHQgJgJgCgPQgCgHABgJIAAgBIABgDIATgGQAQgFAYgFQAXgGATAAQAjgCAuACQAvACAwABIArACQAUACAqAJIAfAFQASACAOAAQAPgBAIACQAKADAMAGQAOAHAOAEIALADIAPAEQABAFgBAGIgBAGQgCAFgFAGQgFAFgHAEIgIAEIgUAHIgdAKIgEACQg7AJhCADQgrADgnAAIgIAAQgdAAgUgDgAoOAiIgKgBQgqgBgigJQgOgDgPgGQgIgGgLgLIgCgCQgKgLgGgJIgDgGIAAAAQgBgEABgEQACgOALgJQANgJAYgBIAQgBQAbAAAfAFIAKgLIABAAIADgBIAKgBQAWgDAigBQAWgBAWABIAZAAIAjAAIAUABIAZAAIAdACIANABQAGABAMADIABAAIAUAEIAMADIADABQAHACAFADIACACQAEADADAGIADAJQgDAGgEAEIgNAHIgZALQgWAJgTAGIgfAJIgaAHQgRAFgRADIgaAEIghAFIgYACIgcAAIgeAAg");
	this.shape_19.setTransform(67.405,23.9198);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AFFB3QgLgCgVgGIghgIIg2gHIgHgBIgJgFIgagPQgPgKgGgMQgHgNACggQABgWAKgHQALgDAUgCQAPgBAmgIIAegJQARgFAfgFQAfgFApADQAwAEApAFQAiAEAdAIIA5ANQAVAHAIANQAkAQANAHQAHAGAEAGQgBAMgHAIQgHAKgRAHIgcALQgLAEgVALQhoAThnAFIgYABQgTAAgOgCgAoaBAQgxAAgagGQgOgDgQgGIgQgXQgPgVgDgKQgHgVAMgOQAKgLAagCQAlgDAkAEQAAgHAFgLIADgJQADgIAEgFQATgNAsgHQAbgGAZgCQAXgBAbAEQAvAIAdAJQAaAIALARQAHAHAFACIANADQAPABAIAJQAIAKACAPQgDAGgFAGIgoAQIhGAaIg5AVQghAKgaAEQgZADguAAIgVAAgApggZQgOABgGAGQgGAGACAKIABABQACAFAIALIAIAMIANAFIAEABQAOADAbAAQAgAAARgCIAJgCIAXgFQAKgDAVgIIAmgOIAPgEIAGgDIAEgGIgKgIIgHgDIgJgCIgKgGIgKgFIgHgDQgHgDgNgCIgTAAIgQABIgQAAQgiABgTAFIgIACIgDAKIgXgBIgRAAg");
	this.shape_20.setTransform(67.8961,21.8264);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_14}]}).to({state:[{t:this.shape_15}]},27).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_14}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.1,1,141.2,32.9);


(lib.star = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AAAAnIiCCjIByivIjEhKIDKA2IAKjQIALDQIDKg2IjEBKIByCvg");
	this.shape.setTransform(21.275,20.2);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,42.6,40.4);


(lib.button2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AttGqQgPgCgHgHQgHgIAAgPQAAgSAFgcQAGgZAJgXQAHgTAKgHQAPgLAaAJQALAEAFAGQAIAKgGAIQAJgDAJAFQAJAEAGAIQAJAOgBAXQAAAQgFANQgHANgNAKQgeAXgmAAIgPAAgAtIE7QABAFgGAOIgJAnQALgBAJgDQAHgEABgCQAHgHgBgRIgBgJQgHgKgCgFIACgCIgDgBQgFAAgEADgAlgF6IgtgDIg1gDQgegDgVgJQgPgGgBgIQgBgHAHgGQAGgFAKgDQAlgKA9gDQBRgDATgDQAwgIAYgDIABAAQgGgdAAgoQAAg6gBgeQgBgXgHgzQgGgxgBgYQgCgWAAgrQgBgmgGgaQgHgigSgaQgVgdgfgPQgjgPg5ACQgwACghAOIgSAIQgLADgIgCQgKgEgEgKQgEgKAFgJQAHgOAZgNQBKglBNAHQAnAEAkAPQAlAQAZAaQAtAsAOBNQAFAcACAnIAEBCIAKBzQAGBGgBAtQgBAlgIAfIABAAQBPAAAmALQAgAJAOARQgnAdhIAEIg8ABQglAAgXADIgpAGQgZAEgQABIgUAAIgYAAgAJWFjQgzgBgYgKQgjgOgXgkQgXgjgHgzQgFgfABg9IAFmWQAAgXAGgLQAFgIAIgEQAJgFAJACQATAFACAfQADAiACBDQAECdgCCsQAAArACATQAEAiALAaQALAYARAJQAOAHAeAAQA1AAA+gGQgIg1gChKQgBhjADjFQABhSADg1QACgkASgDQANgCAHAQQAFAKABATQADA1ABBPQADCSgBBqQAABLgEAtQgCAYgEAWQAwgGBEgLQAegEAMgIQAMgIAMgUQASgiACgxQABgMgDhLIABh0QABhHgGguQgDgUgIgjIgLg3QgFgdAOgJQAHgEAJABQAJABAHAEQAKAHAKATQAgA+AFBeIACCjIACB6QgEBGgYAvQgOAagTAPQgOAMgWAIQgPAEgbAGQiAAbiAAAIgaAAgACaCyQAAgdADhAQAEg8gBgfIgGhUIgVjaQgBgTAFgHQAGgFAJAAQAIAAAGAFQALAIAFASQALAdAJA9QAMBHAFAoQAHA+ABAyQAAAwgEA1QgFBHgGAqQgJA+gRAxIgPADQgRhMAAhPgAt7BRQABgoAdhDIAuhyIARguQAHgbAAgVQAAgXgNgsQgJglgUgJQgIgDgLgBQgWABgaAQQgPAJgcAVIgVANIgRAQQgLAMgHARIgKgDQgKgaABgQQACgTAUgaQAlgtAhgWQAugcAuAHQAtAJAgApQAaAiAKAyQAMAygIAqQgFAcgPApQgPAmgVAyIgqBkQgYA5gLAtQgFAUgHAGQghgwAEg6g");
	this.shape.setTransform(-3.0294,-3.3005);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(3));

	// Layer_3
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFFFFF").ss(16,1,1).p("EAgxAAAQAAHFpmFBQpmFAtlAAQtkAApmlAQpmlBAAnFQAAnEJmlBQJmlANkAAQNlAAJmFAQJmFBAAHEg");
	this.shape_1.setTransform(0.075,-0.025);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("A3KMGQpmlBAAnFQAAnEJmlBQJmlANkAAQNlAAJmFAQJmFBAAHEQAAHFpmFBQpmFAtlAAQtkAApmlAg");
	this.shape_2.setTransform(0.075,-0.025);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#3D7529").s().p("A3KMGQpmlBAAnFQAAnEJmlBQJmlANkAAQNlAAJmFAQJmFBAAHEQAAHFpmFBQpmFAtlAAQtkAApmlAg");
	this.shape_3.setTransform(0.075,-0.025);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#152D0C").s().p("A3KMGQpmlBAAnFQAAnEJmlBQJmlANkAAQNlAAJmFAQJmFBAAHEQAAHFpmFBQpmFAtlAAQtkAApmlAg");
	this.shape_4.setTransform(0.075,-0.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1}]}).to({state:[{t:this.shape_3},{t:this.shape_1}]},1).to({state:[{t:this.shape_4},{t:this.shape_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-217.6,-117.4,435.4,234.8);


(lib.button1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AHlGSQgVgBgLgCQgPgEgLgJQgPgNAAgWQAAgWAQgMQAMgJAVAAQAKAAAaAEQCIAYCCgtQAYgHAJgMQAIgKACgTQACgSgFgXIgLgoIhakYQgfgGhLAHQgiADgagBQADAGABAJQACAKAAAMQgBALgEAWIgSBkQAmAHAUgCIASgBQAKAAAGACQAOADAJANQAIAMgBAPQgBANgIAMQgJAMgOAGQgNAGgVgBQgIAAgcgDIglgGQgVgEgOgJQgPgKgKgRQgJgRAAgSQAAgKAEgUQAQhQAVg3QAGgRAIgKQgOgGgFgGQgMgOAGgNQAGgLAXgGQBvgYBRAAQAuAAAWAQQASAMAMAbQAGANAKAlQALAqAZBEIAmBtQAaBVgGA6QgFApgTAYQgRAWgoASQhFAdhbAHQgdACgjAAQgtAAg5gEgAkCGUQgZgBgMgIQgJgGgFgKQgGgLAAgMQABgLAGgKQAGgJAIgFQALgHAWgBQCEgBBBgDQBmgFBJgYQgggbgvg8Qg/hQgjg1QgzhLgfhKQgMgdAFgRQAEgNAMgEQALgFALAGQANAHATAfQBVCMBkB2QAaAfASAPIAXAUQAHAGAEAHQACgMAAgRQAChHgIhhQgFg3gMhwQgCgcAJgIQAIgHAKAIQAIAHAGAOQAPAjAMBCQATBwADB4QACBEgNAiQgYA+hRAaQhBAWhPAIQg4AFhbABQhAAAgggBgAwtGRQgQgHgGgOQgIgRAIgjIARhQQAKgwAEghQAKhfgdhCQgNgcgPgMQgSgMghgEQhpgNh4AlQgXAHgKgCQgIgBgHgFQgHgGgBgIQgBgKAKgNQAngzBdgSQBJgNBKAJQA6AGAhAVQBHAsARB6QAKBDgIA/QgDAbgJApIgNBFQgFAfgHAPQgKAagWAIQgGACgHAAQgIAAgJgEgAsmGUQgKgBgJgFQgKgFgDgJQgHgPAPgQQAJgKAVgKQBXglArgUQBMgiAmgpQAbgeAUgtQALgbASg4QASg7AGgfQADgUgIgIQgGgGgTgCQhrgIhrgCQgYgBgNgDQgTgEgLgKQgMgOgCgeQgFhSAIh3QABgXAHgLQAFgIAIgEQAKgFAJADQASAFADAhQAIBpgBBiQCWADBKAHQAiAEAUAGQAcAJAOASQASAVgCApQgCAogXBGQgUBCgPAiQgXA2ghAlQggAkg0AfQgnAWg+AbQg1AXglALQgXAHgOAAIgEAAgA1EGNQgJgHgFgLQgIgQAAggIgBhHIgCgaIgFgZQgDgPABgZQABgPADgFQAFgLANgCQAMgCAJAIQAIAFAJARQAQAbAHAUQAEAOADAdQAHA/gDAgQgCAWgIAOQgMATgSAAIgCAAQgKAAgKgHgAUwFiQgJgQAAgXQgBgXAGgfIAKg1QAHguAAhAQABglgChKQAAgegIgMQgFgIgOgIQgdgPgngFQgYgDgwAAIg3ABQgfACgYAFQgWAGgLAAQgTgBgJgMQgHgJgBgMQAAgMAEgLQAIgUAVgMQAVgNAlgIQCggiBqA0QAvAXATAjQAKATAFAbQADATACAfQAEBRgCA2QgCBKgPA7QgIAfgPArQgIAXgHAKQgMARgQAAQgSAAgKgUgARJFpQgIgCgGgGQgQgOgDgZQgCgLAAggIgBgnIAAgnQABgsANggQAEgJAFgFQAFgFAIAAQAIAAAGAFQAEADAGAOQAGATAIAzIAGAyIACAoQAAAogNAWQgGAJgIAGQgHAEgHAAIgFAAg");
	this.shape.setTransform(4.2045,-10.7263);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(3));

	// Layer_3
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFFFFF").ss(16,1,1).p("EAgxAAAQAAHFpmFBQpmFAtlAAQtkAApmlAQpmlBAAnFQAAnEJmlBQJmlANkAAQNlAAJmFAQJmFBAAHEg");
	this.shape_1.setTransform(0.075,-0.025);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("A3KMGQpmlBAAnFQAAnEJmlBQJmlANkAAQNlAAJmFAQJmFBAAHEQAAHFpmFBQpmFAtlAAQtkAApmlAg");
	this.shape_2.setTransform(0.075,-0.025);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#3D7529").s().p("A3KMGQpmlBAAnFQAAnEJmlBQJmlANkAAQNlAAJmFAQJmFBAAHEQAAHFpmFBQpmFAtlAAQtkAApmlAg");
	this.shape_3.setTransform(0.075,-0.025);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#152D0C").s().p("A3KMGQpmlBAAnFQAAnEJmlBQJmlANkAAQNlAAJmFAQJmFBAAHEQAAHFpmFBQpmFAtlAAQtkAApmlAg");
	this.shape_4.setTransform(0.075,-0.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1}]}).to({state:[{t:this.shape_3},{t:this.shape_1}]},1).to({state:[{t:this.shape_4},{t:this.shape_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-217.6,-117.4,435.4,234.8);


(lib.___Camera___ = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		this.visible = false;
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(2));

	// cameraBoundary
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(0,0,0,0)").ss(2,1,1,3,true).p("EAq+AfQMhV7AAAMAAAg+fMBV7AAAg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-641,-361,1282,722);


(lib.bubble3heart = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// big
	this.instance = new lib.big("synched",0,false);
	this.instance.setTransform(89.95,310.8,1,1,0,0,0,58.5,58);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(38).to({_off:false},0).wait(9));

	// your
	this.instance_1 = new lib.your("synched",0,false);
	this.instance_1.setTransform(-111.35,160.5,1,1,0,0,0,-62.6,37.8);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(22).to({_off:false},0).wait(25));

	// heart
	this.instance_2 = new lib.heart2("synched",0,false);
	this.instance_2.setTransform(230.25,175.65,1,1,0,0,0,78.2,83.1);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(11).to({_off:false},0).wait(36));

	// bubble
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AQYXYQjrhZhXjFQlXA1l/AAQwxAAr3meQr3mdAApIQAApIL3meQL3mdQxAAQQyAAL2GdQL4GeAAJIQAAJIr4GdQhoA5hvAxQArCDAqBMQA3BlBKAuQCwBvFHi9QhZB/jmBdQjhBakCAQQgyADgwAAQjZAAiphAg");
	this.shape.setTransform(242.55,219.2837);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(47));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.6,63.3,518.4,312);


(lib.bubble2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// but
	this.instance = new lib.but("synched",0,false);
	this.instance.setTransform(230.25,163.05,1,1,0,0,0,78.2,83.1);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(16).to({_off:false},0).wait(6));

	// bubble
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("A88QBQr/moAApZQAApXL/mpQMAmpQ8AAQQ+AAL+GpQMAGpAAJXQAAJZsAGoQhyBAh7A2QmKCvnWBLQljA5mMAAQw8AAsAmpg");
	this.shape.setTransform(244.35,205.3);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(22));

	// bubbleSHPITZ
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("EgmrARNQgigUgrgFQgfgFgzADIhRADQhQgChLgYQhvgkghhLIgWhJQgGgXgLgQQAoicBHitQEnq/KvpeQGCASGCAlIgJAqQi+AvjBgOQgtgDgOgBQgiAAgZAGQgeAHgXATQgZAVgGAbQgHAhAUAgQAUAfAgAPQAcAOAnAEQAXADAvAAIT/gGQggANgtAEQgRABg/AAQgxAAgeAFQgrAHgfASQgjAWgOAnQgRAqATAhQASAhAvAOQAhAKA2AAINVAAQAOAlAoAaQAjAXAuAHQAgAGA1AAQBDAAAUACQAwAEBKAUQBfAYAcAFQBeASBjgJIgcA2QEjC/FqAYQI3AlMClfQllGelrDgQk6DClUA/QkJAxlOgaQhugJirgVQjXgag4gHQh7CGiMCCIjSAuQiNAfhiAMQhTAKhqAEQg1ABiJABQmdACoEARQk3AKpqAYQgQgigngXgA3xyFIAHAHIgYAFIARgMg");
	this.shape_1.setTransform(396.05,199.15);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(22));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-17.6,60.3,719.1,290);


(lib.bubble1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// small
	this.instance = new lib.small("synched",0,false);
	this.instance.setTransform(89.95,310.8,1,1,0,0,0,58.5,58);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(48).to({_off:false},0).wait(5));

	// your
	this.instance_1 = new lib.your("synched",0,false);
	this.instance_1.setTransform(-111.35,160.5,1,1,0,0,0,-62.6,37.8);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(32).to({_off:false},0).wait(21));

	// head
	this.instance_2 = new lib.head("synched",0,false);
	this.instance_2.setTransform(230.25,163.05,1,1,0,0,0,78.2,83.1);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(21).to({_off:false},0).wait(32));

	// bubble
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AZcYwQj7gajfhfQj2hpi2i0QlXA0l/AAQwxAAr3mdQr3meAApHQAApJL3mdQL3meQxAAQQyAAL2GeQL4GdAAJJQAAJHr4GeQhoA5hvAxQBBBaAeAjQBCBQBPA+QDXCoFsBVQiSBXjSAmQiKAZiPAAQhUAAhXgJg");
	this.shape.setTransform(242.55,222.5016);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(53));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.6,63.3,518.4,318.5);


(lib.righteye = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// eyeliner
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AABBlIgagMQgHgEgGACQgCABgDAEIgGAFQgFADgJgCIgQgDIgIABIgJACQgIAAgJgHIgQgKQgEgCgQgCIgtgFQgkgEgOgFQgSgIgHgBQgOAAgHgCQgEgBgFgFIgJgGQgFgDgJgCIgOgDQgPgEgWgQQgJgGgFgGIgIAAQgRgDgigCQgjgCgRgDIg4gMQgigIgXgBIgOAAQgIgBgGgCQgHgDgEgFQgFgGABgHQABgGAEgDIAAgBIAAAAQAHgGAPgCQAbgEApAHIAWAEIAYABQAKAEAaAFIAlACQAjABARACQAUADAdAHIAwAMIAyALQB2AVBJAGQCaANCVgdQAUgIAagJIArgSQAfgFAkgLQAhgKAUgJQAYgMAPgQIAEAAIAHADIADgBQADAAAFAFIAJAFIAQAGIASAFQAKADAGAAIAKACIAGACIAFAAIAagBIAIgCQAIgBAFAEQAHAFgDAIQgCAEgGADQgGAEgHAAIgTABIgUgBIgDAAIADACQAFAGgEAKQgDAJgJAEQgOAGgUgKQABAIgIAIQgKAHgEAEIgFAGIgHAFQgEADgSAAQgOAAgdANQgbANgQgBQABAKgMAFQgOADgGACQgLAHgGACQgGACgIAAIgPgCQgMgBgGAEIgFAEIgGAFQgHAEgPgBQgRgBgHADIgNAIQgHADgJAAIgRgDQgOgCgMABIgUAFQgaAGgbgHQgQgFgGACIgMAHQgGACgKgCQgMgCgEAAIgRAFIgGAAQgJAAgMgFg");
	this.shape.setTransform(65.4256,53.9204);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AAoBWQgKgKgFABQgCABgGAGQgGAFgIABQgHABgGgEQgJgFgCAAIgIADQgVAJgjgaQgEAGgIACQgIACgIgCQgLgCgQgNQgMAKgSgFQgOgEgOgLQgIAGgLAAQgKAAgIgFIgKgKQgGgHgEgCIgTgIQgPgJgJgCQgUACgIgFQgDgCgCgDQgpgGgagFIhHgRQgpgKgfAAIghABQgTAAgNgCQgOgBAAgIQAAgFADgDIAAgBIACAAIAHgDQAXgIAsgDQBAgFAhAJIAlALQANADAZADQBAAJCAALIBlAJIBSAGQAuADAkgBQAugCA4gJQAigFBEgNIBNgPQBKgNAmgQQAPgHAGgBQANgEAJADIACAAQAEgEAFAAQAFgBAGADIAFACIAHgBIAKABIATAAIAQAFQAIAEAEAEQAEAEABAGQACAHgDAFQgEAMgMABQABAGgEAHQgDAHgHAEQgMAIgSgFQABAKgKAHIgTAJQgQAIgGABIgMABIgLABQgHABgJAEIgQAIQgYAMgdgEQgTgCgEAAQgHABgRAJQgKAGgJADQgOAFgPgBQgPgBgNgIQgQAUgTAEQgYAGgRgOQgCAJgMADQgIACgNgDQgTgDgKACQgFABgIAEIgOAFQgIADgHgCQgIgCgEgFQgJAIgNAAQgOAAgJgIg");
	this.shape_1.setTransform(62.2022,52.0708);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgMA1QgEgDgGgJIgEgFIgTgBIgGABIgWgBIgRAEQgKADgHgDIgHgGQhwgGhegMQgtgGgOgBQgqAAgUgCIg5gKQgggEgoAGQgMABgEgCQgEgBgCgDQgDgEABgEQAAgCADgDQgHAAAAgBIAJAAIAGgEQAdgMAqgBQAQAAA6AEQAbACBfAEIBgACQDfAGBwABQAsAAAVgCQAVgCAogIQAngHA2AAIBeAAQAtAAAYgHIAhgKQAUgDANAJQAEADACAEQAHgCAHACQAOAFACANQABAIgHANQgKAPgMACIgKACIgKAIQgKAJgTAAQgUgCgKABQgFAJgMACQgMABgIgHQgLAJgZgHIg3gOQADAFgDAGQgDAFgGADQgIAEgPgCIgrgEQgPgBgKgDIgHABIgNACIgKAGIgKAFQgNAFgYgNQgNAPgagHQgNgDgDABIgNADQgRADgagSIgDAAQgDAFgHAEQgHAEgIABQgJAAgVgHQgEAIgKADIgFABQgGAAgFgEg");
	this.shape_2.setTransform(60.3563,48.3169);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AA/AsQgNgDgYgPQgKALgQABQgRAAgLgKQgIAEgJAAQgKgBgHgFQgGAIgMgDQgMgEgHgBIgIgBIgBAAQgYABgSgBIgmgEIglgEQgXgCgggBIg2AAQhqgBhsgRQgTgDgKgFQgLAAAAgBIAJAAIACAAQAMgHAZgEQA2gHBGgCIB8gBQA1AAAjADIA6AGQATABAbgDIAtgFQBkgMC6AFQDIAEBYgHQAegDAOAGQALAFAHAKQAGALgEAKIgCADIABABQAGAHABAJQABAKgGAGQgJAKgSgGIgbgNQgEAGgHADQgHACgHgCIgHgEIgIgCQgEAAgGACQgHADgEgBQgDAAgHgDQgHgEgEAAIgIACQgGADgCAAIgJgCIgIgCQgEgBgOAFQgLAEgbAAQgbgBgNgCIgQgBQgLAEgGAAQgHAAgLgHQgMgIgGgBQAAAIgHAHQgGAFgJABQgLABgWgLQgEAGgHADQgIADgHgCIgRgFQgDAAgIADQgLAEgLgBQgMgCgIgIQgFAJgKAEQgGACgHAAIgIAAg");
	this.shape_3.setTransform(59.2321,47.1864);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AIkArQgGAAgTgGIAAAAQgJACgIgBQgPgHgJABQgEABgIAEQgJAFgEAAQgIABgHgGQgGgFAAgGIgTgBIgBAAIgEAAIg1gBIg/AAIgJACIgWAGQgKADgHgCQgHgDgCgHIg4AAIgGAEQgHAEgIgEIgGgEIgJAAQgFAGgIAAQgKAAgGgGIgxAAIgCABIgSAAQgFAAgIAEIgNAFQgHABgHgEQgEgDgBgEIguAAIgGAFQgHADgHgDQgFgCgCgDIhxABQg5ABgTACIg3AHQgaADgkAAQheAAhNgIQgLgBgFgDQgJgFACgJIgFAAIgJAAIAPgBQADgJASAAIBsACQA+AAAsgGIBAgMQAegFBIgCIA6gBIACgDQAJgHAMAAQAMABAGAIIADAAIAFAAIAxgBIAHgDIAIgIQAFgEAEgCQAKgDAPALIAGAGIAsAAIABgCQAHgGAGgDQAIgEAIACQAJACADAIQAEgDAIACIANADQAFAAAKgDQAGAAAFAEIA0AAIACgCQAJgHAFgBIAIACQAFADACAAQAEAAAGgCIAKgCQAFAAAEADQADACACAEIABAAIAigBIAJgFQANgHAIgBQAOgBAFALQAFgFAMAAQARABADgBIAQgEQAIgBAFAIIADAGIAOAAQASABAKAEIABAAIAOACIATgGQAKgBAOAHQAIADAEAEQAJACAEAGQADAFABAEIABADQAEAJgCAKQgDAJgIAFQgHAFgKAAIgHgBg");
	this.shape_4.setTransform(58.6731,45.8842);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AHlA7IglgJQgpgKhigOIh7gPQhNgIh5AFIimAJIhiAHQhiAGgxABQhRABhAgKQgRgCgCgKIAAgDIgEAAIABAAIgBgBIAEAAQAAgEAFgCQAGgFAIgBQAMgBAfAEQA7AGBugOICRgTIBngNQAbgMAOAAIANABQAIAAAFgBQAGgBAMgFQAJgCASADIAgAFQAXAEANgBQAIAAASgEQARgEAJABIATACQALABAHgBIAMgCQAHgCAFABQAHABAEAEQAFAFgBAFIABAAIADABQA6gBAeABQAzACAoAJQAJADAJAAIASgFQAXgIAXAFIAeAIIAUADQAKABAPAHQARAHAHACQARAFADACQAGADABAIQACAIgEAGQgGAKgSADIgBAGQgEAHgHAFQgLAJgTABIgGAAQgOAAgSgEg");
	this.shape_5.setTransform(59.3705,45.8441);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AIVBRQgSgDgbgLIgrgTQgXgIgtgGQgxgFgUgGIg2gRIgFgBIgjgDQgpgCg0AAQgoAAgrABQgrAEgqACIgPABQgiACgzAFIhdAJQhRAIg4AHIhAAHIg8AEQgrAAgYgCQgJAAAAgBIAAgBIAAAAQAAgBAOgBIAVgCQgIgDABgEQAAgGAKgDICQgeIBMgMQACgCAEgCQAFgDAQAAQAOABAHgFIAHgGQAEgEAEAAQADAAAHADQAGADAEAAQAHAAAMgJQAEgCAIABIANAAQADgBAOgHQALgFAHABIAGADQAEACADgBIAJgEQAEgCAHADIAKAFQAJACANgIQAQgJAFgBQAHgBAQADIAZAHQAIgGATgCQATgDAJgFIAIgGQAFgDAEgBQAIgCAJAFIAPAKQAGAFAGAAIAKgGQALgHAMAEIAJAEQAFABAEgBQAEgCAHgHQAIgFALAIQAPAKAEABQAFABAIgDIANgEQAIgCAHABQAHACACAHQAFgHAIgBQAJgBAGAFIAFAGIAFAFQAGADAMgCQAOgEAEABQAHAAAOAFIANAAQAHAAAFABQAGABAFAEQAFAFgBAFQALgCALAIQAGAGACAHIARADQAIgBAIADQAHACAHADIAnAPQAaALARADIARADQAKACAFAFQAIAGABALQACAKgGAJQgKAMgUAAIgLgBg");
	this.shape_6.setTransform(58.04,41.3875);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AHfBQQgLgFgPgLIgFgDIhUgbQgngNgbgGQgqgLgtgDQgpgEg0ABQguAAgyADQgpACgvAGQghAEg0AIIhdANIgUACIhMAOIg+AKQgdAGgRABIgNAAIgtADQgrACgYgDQgJgCAAgBIAAAAIAAgBQAAgBAOgCIAOgCQgHgFACgIQACgGAJgDQAGgCAQABIATAAIAEAAIACgCQAPgLAmgIIC9gmQAAgEADgEQAEgFANgCQAXgEAwgCQAXgCAOAEIAKgBQAEgHAIgFQAJgFAKABQABgIAHgFQAHgEAHACIAIADIAIADIAMgDQAJgCAKACQAJADAGAHQANgNAKgDQAQgEAKAJQANgOALgBQAIgBAGAFQAHAEABAHQAKgNAPgBIAKgBIAKAAIALgDQAGgBAFAAQAHABAFAGQAFAFAAAHQAVgKAMAEIALAHQAHAFAFABQAFACAIgCIANgDQAHgBAHADQAHADAAAGQALgBAHACQALAEAAAIQAMgDAXADQAYADAKgCIAMgEQAGgCAFABQAHABADAFQAFAGgEAFQATgCARAXIACAEQANAFALAIIAUAOQAMAIAKADQAIACAOAAIAVACQALACAIAHQAKAHgBAKQAAAOgOAHQgKAFgQABIgKABQgfAAgXgLg");
	this.shape_7.setTransform(58.5888,38.9075);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AH2BfIgVgMIgXgJIhXgkIgNgGIgbgIQhAgRgZgEQgpgGg6gBIhjAAIghAAQghAEglAFQghAEg0AKIhdARIhIAOQhSAVgzAPQgVAHgNACQgTADgOgFQgOAFgPABQgNABgHgHQgEgFABgFIgFgBQgKgCABgCQgBgCAPgCIADAAQADgGAJgCIAIgBIAJAAQADgBALgFQAJgFAGABIAAAAIABAAIAxgQQBrgjA2gNIAJgCQgBgEAFgFQAFgFAHgBQAKgCAWABQAUABALgDQAJgDAPgKQAPgKAIgDQAJgEAUgCQAVgCAKgDIABgBIACgHQADgHAFgEQALgIAPAHIAIAGIACABQAFgBAGABQAGACAEADIAEAAIAAAAIACgCIABgCIAAgGQgBgGAFgFQAFgFAGAAQAFAAAEAFQAEAFAAAGQAFgMAEgFQAJgIAJABQALACAFAPIACAKIAVgHQAQgCAEALQAPgNAIgCIAAAAIABAAQAEgHADgCQAGgGAJADQAKACADAIIABAEIADAAQALABAEAKIACAAQALgJANADIAOADQAEAAAHgDIAKgCQANACAEAQQAQgGAIABQAHABAFAEQAGAEAAAGQAPgCAHACQANADAEALQAhAIAmABQAYABADANQALACAMAKQAIAGAMAMQAIAKACAIIAOAIQAVAMAsAdQAPALgBAJQAAAIgIAEQgHAEgJAAIgCAAQgVAAgbgOg");
	this.shape_8.setTransform(57.8964,37.1146);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AIbCCQgWgCgNgIQgHgFgJgJIgHgIIgWgLIhXguQgngWgbgKQgSgHgTgEIgKgEQgZgHgQgBIgMABIgCgCIAAAAQgkgFgqABQguAAgyAGQgpAEgvAJQghAFg0ANIhVAUIibArQgQAFgIgBIgFAAIgaAGIgIACIAAAAQgMAHgFABQgKADgJgDIgFgDIgLACQgrACgYgFQgJgDAAgCQgBgDAPgCIA9gOIAKgCIAFgDIAJgCIAMgEQAigTAHgDQAJgEAHABIAEgDQALgFATgFIACgBQADgDAOgFIAggIQgBgFACgEQAEgMANgCIASABIARACIAAAAIAFgEIAPgIIALgEQAGgCAEgDIAHgKQAFgGAEAAQADgBAFACIAHADQAGABAHgBIASgCIAAgFQABgHAIgEQAHgEAGAEQACgHAIgDQAIgEAHAEQAFADACgBQAEAAACgFIAEgJQAFgFAJACIAPAEQADABASgEQAPgEAOADQAHABACgCQAEgCACgIQAEgGAIABIAPADQAGABANgCQAMgBAHACIALgCIADAAIAAgLQADgKAJgEQAKgDAHAHIAKAJQADADAKAAQAKABADAEIABABIAEABIAUABIAAAAIAGgFQAFgDAIgBIANgBIAOgCQAIgBAFADQAFADAGAHIAFAEIACAAQAOABALAGIAEADQANAEAFACIAPALQAJAHAIACQAHABAOAAQAJACASAJIAYAHQAPAGABAMQAZAOAcAJQAWAFAFAKQABAEABAKIASAPIApAiIAIAJIADACQASAMgBALIgBACIgBAHQgDAHgFADQgHAFgLAAIgIgBg");
	this.shape_9.setTransform(57.7976,35.2167);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AIoCPQgEgCgKgLIgCgCQgJACgJgDQgJgEgNgMIgEgEIgLgFIgigWIhWg4IgbgSIg4gdQgjgPgjgHQgqgIgzABQgvgBgxAIQgpAFgvAMQgiAIgzAQIhdAaQhRAXg5AVIgpANIgWAHIgBAAQgfAHgeAEQgrAEgYgIQgJgDABgCQgBgEAPgEQAcgGAhgKIA5gTIAUgHIAYgNIAQgJQACgMARgEIAOgCQAJgCAFgDQAFgCAGgGIAKgJQAKgHAVgIQAWgIAJgBQAPgBAFgDIAIgIQAFgEADgCQAEgBAJABQAHABAEgDQADgBADgGIAGgIQAFgDAKABQAMACAEgCQADAAAGgEQAFgDADgBQAFgBAMACQAIgBANgJQAEgBAJgBIANgCQAFgBAOgHQALgGAHAAQADAAAKADQAIADAEgBQAHgBAKgIQAKgFASACQAXACAHgBQAHgBAPgFQAOgEAJAEIALAEQADgBAEgDIAGgHQAFgGAJAAQAIgBAHAFIAGAGQAEADAEABQAEAAAEgDIAGgFQAKgGAMAEQAMADAFALQAMgEALAIQAMAIAAANQANgFARAMIAOAKQAIAFAHABIAKAAIAKABQAJACANAPQAIAKAHABIAPgBQAHAAAHAEQAHAFADAHIADAIQACAEADACQADACAEABIAHABQAIABAIAJIAGAHIAPAIIAgAXIASADQALAEAEAIQABAEgCAEIAMALQALAMACAMQAMAHAGAIQAKAMgEAOQgDAKgKAEQgFACgEAAQgGAAgFgDg");
	this.shape_10.setTransform(58.929,34.9738);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AIuCjQgJgDgOgMIgNgDQgWgIgUgNIgigZIhWhFQgbgWgUgNIgCgBIgxgaIgVgKQgRgGgRgFIgQgDQgTgCgcAAQg9AAgvACIgSADQgpAHgvAOQgiAJgzATIhdAgIgoAOIgXAJQghANgVALIgWALIgWALQgZALg2AJQgiAHgVgBQgJgBgEgDQgNgBgJgEQgJgDABgEQgBgEAPgEQAcgIAhgMIA5gXIAagLQAAgDACgFQAEgIAIgEQAGgEAKgCIAQgDQAPgFAUgOIAQgKQAPgLALgBIALAAQAHAAAEgBQAEgCAFgFQAGgGADgBIAKgCQAHAAADgCIAIgGQAEgFADgCQADgCAHgBIAJgEQAFgCAIgLQAIgJAGgCIALAAQAHABAEgBIAHgGIAIgGQADgCAIgBIALgDQADgBAFgGIAHgHQAFgDAJAAIAPABQAKgBATgGIAngCQAWAAAMgJIAQgMQALgFALAGQAHAEADAHQAFgFAKgFQAbgPAQAGIAIAEIAIADQAFABAHgDIALgGQAQgHAPAJIAKAHIALAGQADABAPAAQALABAFAFIAFAHQACAEADACQADADAMABQAMACAJAIQAKAIABALQALgEANAFQAMAFAFALQAFAKACACQAEADAGgBIALAAQANgBALAJQALAKABANQAKgDAKAEQAKAEAGAIIAHANQACADAOAHQAKAHgBAJQAJgCAIAIIAMAOQAGAFAOAGQAOAFAGAGQAFAGADAMIAHATQAEAJAMARQAKASgJALQgGAIgKAAIgJgBg");
	this.shape_11.setTransform(59.0368,32.2852);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AIzCyQgHgBgKgIIgBAAQgFACgEAAQgJgBgLgEQgVgJgUgQQgNgKgUgTIhWhRQgngmgbgSQgpgdgtgMQgpgMg0ABQgugBgyALQgoAIgwARQghALg1AWIhdAlQhRAig5AdQgxAWgQAHQgfAKgeAFQgqAFgZgKQgJgEABgEQgBgFAPgGQAcgIAhgOIA6gbIBagrIAwgWIAFgGQAJgFADgFQADgDACgHQAFgIANgBIAVAAIAMgCIAMgJIAFgDIADgEIAKgPQANgPASAFQABgIAHgGQAHgGAJAAQABgHAGgFQAHgFAGABIANABQADgBAEgEIAHgGQAEgDAIgBIANgBQAJgBAKgGIAegQQARgIAOAAIAQACQALABAGgBIANgFQAHgDAGAAIAKADQAGADAEgBQAGAAALgGQAHgDAHAEQAHADADAGQAIABAKgEIARgIQAWgMAMAJIAMAJQADABAIAAIAsAAQAUgBAKAHQAGAFABAJQABAJgHAEQAHADAMAAIAUACQALACAHAHQAIAIgCAJQAVAFAJAIQAHAGACAIQADAJgEAHQAGAEAKACIARAFQAKADAGAGQAGAHAAAIQARAJAXAPQASANABALIAAAHQAOANALAMQANgCALANQAIAJAGASQACAIACADIAGAIIAJALIAJAJQAFAFACAFQAGAOgKALQgHAJgLAAIgFgBg");
	this.shape_12.setTransform(59.5773,30.1175);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AIqC+IgKgDIgCABQgEACgFAAQgJgBgLgFQgVgKgUgSQgNgLgUgWIhVhcQgngrgbgVQgoghgtgOQgqgNgzABQgvAAgxAMQgpAJgwATQghAMg1AZIhdArQhRAng6AgQgwAagRAHQgeAMgeAFQgrAGgYgMQgJgEAAgFQAAgFAPgHQAcgKAhgQIA5geIBNgqIABAAQADgEAGgDIAKgHIAHgFQAFgDAEgBIAGABIALgFIABgHQAAgNAQgGQAHgDAUgBQAKgBAKgDIAYgMIABgFIAAgGQABgLARgDIAMgCQAHgCAEgDQAFgEAGgSQAEgQAKgDQAGgCANAGQAMAFAHgCIAIgFIAGgIQAJgIANgBQANgCAJAHIAVgQIAJgFQAGgLASgBIAPgBIAOgBQAMgDAWgLQAKgDAJACQAKADADAJQAhgXAoADQAZACACAQQAUgKAMABQAJAAAHAFQAIAGAAAIQAIACALgBIATgCQAYgDAMAKQAIAGABALQABALgIAEQAJAEAaAAQAYABAKAJQAGAGABAKQAAAKgHAEQAMAAAJAJQAJAKgBAMQAGAIASAEQAUAEAGAFQAIAFABALQABAKgGAFIABABIADACQAHADAMADQARADAGAHQAFAGAAAJQAAAGgDAFQANAPANATIAFAEIANAHQAIAEAEAEQAGAHAAAKQgBAJgGAHQASAEAJAHQAOALgCAOQgCAMgNAGQgIADgJAAIgJgBg");
	this.shape_13.setTransform(59.8876,28.2353);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AISDPQgJgBgLgFQgWgMgVgUQgNgNgWgZIhahpQgpgwgcgYQgqgmgugQQgqgPgzABQgvABgwANQgpALgvAVQghAOgzAcIhbAxQhPAsg4AkQgvAfgQAHQgeAOgeAFQgqAIgZgOQgJgFAAgFQgBgGAPgIQAbgLAggTIA4giIA7glIgBgBQgCgHADgEQAFgHAQgBIAMgBIAMgHIgDgDQgFgKAFgIQAEgFAJgBIAPgBQANAAANgDIAbgQIABgHQADgFAOgEQAJgCAJgEIARgJIAEgCQgEgGADgHQADgHAHgEQAGgDAIgBIAPgCQAFgBADgCIACgFIABgFQACgHAHgFQAHgEAHAAQAKAAATAHQAHgUAJgGQAHgEAJACQAJADAAAIQAbgGAUgUIANgNQAIgGAHACQAIABADAIQACAFAAAFIAIgCQALgFAHgJIAKgKQAGgGAFgBQAHgCAUAHQAeAKAbgJQANgGAFAAQAJgBAHAHQAHAHAAAIQAlgLARAMQADACAJALQAHAJAHADQAFACAIgBIAPgCQATgDAHAKQAHAJgIATQAXABAYAGQAOAEAFAHQAFAGgBAKQgCAJgHAEQAFAGAWAHQAVAHAAAOQABAEgDAGIgEAJQAXgDAMgBQATAAAGAIQAEAEAAAIQAAAGgEAFQgDAHgPALQgBAAgBAAQAAABgBAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABABAAQAAABABAAQAAAAABAAQAFADAJAAIAPAAQAUgBAHALQAEAHgDAJQgEAJgHAFQAJAPAIAHQAIAIAGACQAFACAQgBQANAAAGAEQAFAEACAHQACAGgCAGQgEAMgMAHQAFAGAMAAQAOgBAFADQAGACACAHQADAHgCAHQgFAOgPAEQgLAEgQgCIgJgCQgDAFgDACQgEACgFAAIAAAAg");
	this.shape_14.setTransform(60.244,26.5278);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AIFDsQgIAAgMgGQgWgNgVgXQgNgOgWgcIhch0Qgrg1gcgbQgrgqgugSQgqgQgzABQgvAAgwAPQgpAMgvAXQggARgyAeIhaA2QhOAyg4AoQguAhgRAJQgdAPgeAGQgqAIgagPQgJgFAAgGQAAgHAOgIQAbgNAggVIA3gmIAegUQgBgHAEgGQAFgIAJgEIAQgFQALgDAGgDQgRgQAHgMQAEgHAPgDQAMgCAWABIAOAAIANgJIAAgHQACgKAIgFQAKgHAVABIAdgTQgCgHACgJQADgIAIgEQAIgFAIADIAIAFIADACIAUgLQgEgXALgKQAEgEAHgBQAHgBAFACQAKAFACAJIAJgEQAIgLAEgNIAFgOQAEgHAFgEQAFgEAIABQAIABAFAGQAIAIgBALIABgBIAfgLIACgIIADgOQAEgSALgFQAMgFALAKQAIAJgBANIAFACIANgDIAGgEQAGgHAIgRQAJgPANAAQAHgBAGAGQAFAFACAHQABAJADADQADADAIgBQAbgDAJgKIAIgKQAEgGAEgCQAHgFAIADQAJACAFAGQAKAOgGASQAEgBAKABQAJABAFgCQAGgDAIgLQAGgFAKABQAJABAGAHQALAPgPAbIgCACIAMAGQAFgCALgDIASgLQAKgHAJAAQAJAAAFAGQAMAMgIASQgDAJgPARIAMAKIABAAQAGgEAKAAQAHgGAJgCQAIgBAIADQAIAEADAGQAGALgFAOQgDAGgKAQQAHABAJgBIARgDQAVgDAJALQAKALgIAPQgGALgNAIQAHABAKgBIAQgCQAVgEAJALQAJAKgGAOQgFAKgOAIQAHAJAPgEIAMgDQAGgCAFAAQALABAHAKQAGAJgDAKQgEAMgTAMQAGALAMAGQAMAFAMgBIARgEQAKgCAGACQAIACAFAIQAFAHgBAIQAAAPgOAOQgHAHgUAMQAIAAALgEIASgHQAKgDAJACQALADADAIQAFAMgLAMQgFAGgRAHQggANgWAAIgBAAIgEADQgEACgEAAIgBAAg");
	this.shape_15.setTransform(61.4773,23.5804);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AHxD/QgJAAgMgHQgWgOgVgZQgNgPgWgfIhch+Qgrg6gcgdQgrgtgugUQgqgSgzABQgvABgwAPQgpAOgvAZQggASgyAhIhaA7QhOA2g4ArQguAlgRAJQgdAQgeAHQgqAJgagQQgJgGAAgHQAAgHAOgJQAbgOAggWIA3gqIAQgMIAAAAQgDgSAQgNQAMgLATgCQgCgeANgKQAJgIAUACQAZACAHgCQgEgfAPgIQAIgFAQAEIAQAEIAKgHQABgVAOgOQAJgIAMgBQAMAAAIAGIAEgDQACgFAAgIQAAgOABgEQADgLALgFQAKgFAKAFIAHAFQAFACADABQALACAIgOIAIgWQAEgLAHgHQAIgIAKgBQASgDANATQAIgEAIgRQAHgQAIgEQAHgEAKACQAIADAHAHIAJAJQAGAFAFAAQAFgBAHgGQAHgIALgQQAKgOAPAAQAJABAGAIQAGAIAAAJQAFgBAKAFIAFADIAPAAQAFgCAEgGIAKgRQAHgJAMgDQANgDAJAHQAEAEAEAHIAFAMQAHAPAMACQAFgDAMgPQAKgMAJAAQAKABAFAKQAFAKgBALIgDAUQgBAKABAHIAFADQAMABAQgMQAUgRAJgDQAJgDAJACQAKADADAHQAFALgMAVIgTAgQAXgCAVgKQAOgHAHgCQAMgDAIAFQAKAGABAOQACAUgXAhQAMgMAIgEQAOgGAKAHQAJAGAAAMQAAALgFAMQgIAVgOAVIApgPQASgHAKAEQAJAEAEAJQAEAIgCAKQgCAOgPATQALAFAWgIQAXgGAKAIQAJAIgCAOQgBAJgIAMQgTAZgcAKQAeADAwgJQARgDAIAEQAJAGABANQAAAMgHAKQgFAGgLALQgLAKgEAGQAJABANgEIAWgIQAMgEALADQANADAEAKQAFANgNANQgIAIgRAGQgkANgXAAQgOgBgNgEQgDALgHAEQgDACgFAAIAAAAg");
	this.shape_16.setTransform(63.5559,21.7197);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape}]},9).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_16}]},1).wait(1));

	// eyelid
	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFC3C3").s().p("AgyFGQgZAAgTgFQgQgDgZgJIgpgNQgagIg2gIIhmgOQgZgEgOgFQgTgGgKgNIgXgEIgJgDIgVAAQgbABgLgCQgVgCgMgLIgCgBIgEgDIgKgCQgOgDgKgKQgGgFgDgGQgIgFgFgHQgNgRAFgWQABgHADgFIgBgIQABgNAGgLQAJgPAcgQQAhgSAhgRIAtgUQAagLASgKIBCgnQAagOBCgbQgCgHABgKQAAgMACgJQACgHAGgKIAKgPIAOgaQAIgQAGgJQALgPAYgTIBPg+QASgMAJgBQAPgDAKAMQALAMgIAOQgDAGgOAKQgqAbglAeQglAegIAaQAWgMAggMIA3gUQAigMAPgLIAYgTQASgOAZgCQANgCAKAEQANAFADAMQAEAOgNAOIAagFQAUgEAGABQAHABAFAEQAGAFAAAGQAWgEAcALIAvAWIAfANIAeAOQAjAUALAcIAAACIAWAMQAfAUAmAsQAgAjgCAaIgCAHIABABIAGAGQAPANAMAGQAQAIAkAJQAaAKATAPQAWASAFAUQAFASgLATIgDAIQgLAYgiAGQgMACgQgCQgQAYgnALQgaAIgvAEQgKANgXALQgkARgwAGQgfAEg5ABIjTAEIgbABIgSgBg");
	this.shape_17.setTransform(60.4811,23.7152);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFC3C3").s().p("AA4E7Qg6gBhzgUQi/gihngJQgagCgMgDIgJgDIgVAAQgbABgLgCQgVgCgMgLIgCgBIgEgDIgKgCQgOgDgKgKQgGgFgDgGQgIgFgFgHQgNgRAFgWQABgHADgGIgBgHQABgNAGgLQAJgPAcgQQAhgSAhgRIAtgUQAagMASgJIBCgnQAagOBCgcQgCgGABgKQAAgMACgJQACgHAGgKIAKgPIAOgaQAIgQAGgJQALgPAYgTIBPg+QASgMAJgBQAPgDAKAMQALAMgIAOQgDAGgOAKQgqAbglAeQglAegIAaQAWgMAggMIA3gUQAigMAPgLIAYgTQASgOAZgCQANgCAKAEQANAFADAMQAEAOgNAOIAagFQAUgEAGABQAHABAFAEQAGAFAAAGQAWgEAcALIAvAWIAfANIAeAOQAjAUALAcIAAACIAWAMQAfAUAmAsQAgAjgCAaIgCAHIABABIAGAGQAPANAMAGQAQAIAkAJQAaAKATAPQAWASAFAUQAFASgLASIgDAJQgLAYgiAGQgMACgQgDQgQAZgnALQgcAIgyAEQg5AFgWAEQgnALgUADQgRADgXABIgnAAIhCAEQgjACgXAAIgJAAg");
	this.shape_18.setTransform(60.4811,22.5318);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFC3C3").s().p("AgaEhQg5gBhwgPIhGgJQgzABgmgDIgVADQgVACgfABIg0AAQgbABgLgCQgVgCgMgLIgCgBIgEgDIgKgCQgOgDgKgKQgGgFgDgGQgIgFgFgHQgNgRAFgWQABgGADgGIgBgIQABgNAGgLQAJgPAcgQQAhgSAhgRIAtgUQAagMASgKIBCgmQAagOBCgbQgCgHABgKQAAgMACgJQACgHAGgKIAKgPIAOgaQAIgQAGgJQALgPAYgTIBPg+QASgMAJgBQAPgDAKAMQALAMgIAOQgDAGgOAKQgqAbglAeQglAegIAaQAWgMAggMIA3gUQAigMAPgLIAYgTQASgOAZgCQANgCAKAEQANAFADAMQAEAOgNAOIAagFQAUgEAGABQAHABAFAEQAGAFAAAGQAWgEAcALIAvAWIAfANIAeAOQAjAUALAcIAAACIAWAMQAfAUAmArQAgAkgCAaIgCAHIABABIAGAGQAPANAMAGQAQAIAkAJQAaAKATAPQAWASAFAUQAFATgLASIgDAIQgLAYgiAGQgQADgYgFQgOAGgTABQgPABgPgCIgMAAIgCAAIgFAAIhAAAIgRAGQgXAJgRAEQgZAGguAAIhpgEIhXACQgwADgcAAIgLgBg");
	this.shape_19.setTransform(60.4811,20.0068);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFC3C3").s().p("AA2EaQh+gMhAgCIh2ABQg6AAgqgDIgVADQgVADgfAAIg0ABQgbAAgLgBQgVgDgMgLIgCgBIgEgDIgKgBQgOgEgKgJQgGgGgDgGQgIgFgFgHQgNgQAFgWQABgHADgGIgBgHQABgNAGgLQAJgPAcgRQAhgSAhgQIAtgVQAagMASgJIBCgmQAagOBCgcQgCgHABgKQAAgLACgKQACgHAGgJIAKgQIAOgZQAIgRAGgIQALgQAYgSIBPg+QASgNAJgBQAPgCAKALQALAMgIAOQgDAHgOAJQgqAbglAfQglAdgIAbQAWgNAggLIA3gUQAigMAPgLIAYgUQASgNAZgDQANgBAKAEQANAFADAMQAEAOgNANIAagEQAUgFAGABQAHABAFAFQAGAEAAAHQAWgEAcAKIAvAWIAfANIAeAPQAjATALAcIAAACIAWAMQAfAVAmArQAgAkgCAaIgCAGIABABIAGAHQAPAMAMAGQAQAIAkAJQAaAKATAPQAWASAFAUQAFATgLASIgDAIQgLAZgiAFQgQADgYgFQgOAGgTACQgPAAgPgCIgMAAIgCAAIgFAAIhQAAIguAAQgPABg8AJQguAHg7AAQgoAAgtgDg");
	this.shape_20.setTransform(60.4811,19.5877);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFC3C3").s().p("AoFEWQgVgDgMgLIgCgBIgEgDIgKgBQgOgEgKgJQgGgFgDgHQgIgEgFgIQgNgQAFgWQABgHADgGIgBgHQABgNAGgLQAJgPAcgRQAhgSAhgQIAtgVQAagMASgJIBCgmQAagOBCgcQgCgHABgKQAAgLACgKQACgHAGgJIAKgQIAOgZQAIgRAGgIQALgQAYgSIBPg+QASgNAJgBQAPgCAKALQALAMgIAOQgDAHgOAJQgqAbglAfQglAdgIAbQAWgNAggLIA3gUQAigMAPgLIAYgUQASgNAZgDQANgBAKAEQANAFADAMQAEAOgNANIAagEQAUgFAGABQAHABAFAFQAGAEAAAHQAWgEAcAKIAvAWIAfANIAeAPQAjATALAcIAAADIAWALQAfAVAmArQAgAkgCAaIgCAHIABAAIAGAHQAPANAMAFQAQAIAkAJQAaAKATAPQAWASAFAUQAFATgLASIgDAIQgLAZgiAFQgQADgYgFQgOAHgTABQgPABgPgDIgMAAIgCAAIgFAAIjKAAQhBAAghgBIhFgFIhBADQgyABhTgDIgegBIhbACQg4ABgjgBIgpAFQgVADgfAAIg0ABIgNAAQgRAAgIgBg");
	this.shape_21.setTransform(60.4811,18.9589);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFC3C3").s().p("AG3ENIgYgLIgggDQhOgIg0gDQgzgChUAAQhnABgggBIg7gCQghAAgZADIg8AJQgmAGgzABIhKAAQgaACggAAIgHAAIgQACQgwALgZAAQgUAAgQgHIgJgFIgKgCQgOgDgKgKQgGgFgDgGQgIgFgFgHQgNgRAFgWQABgHADgFIgBgIQABgNAGgLQAJgPAcgQQAhgSAhgRIAtgUQAagMASgKIBCgmQAagOBCgbQgCgHABgKQAAgMACgJQACgHAGgKIAKgPIAOgaQAIgQAGgJQALgPAYgTIBPg+QASgMAJgBQAPgDAKAMQALAMgIAOQgDAGgOAKQgqAbglAeQglAegIAaQAWgMAggMIA3gUQAigMAPgLIAYgTQASgOAZgCQANgCAKAEQANAFADAMQAEAOgNAOIAagFQAUgEAGABQAHABAFAEQAGAFAAAGQAWgEAcALIAvAWIAfANIAeAOQAjAUALAcIAAACIAWAMQAfAUAmArQAgAkgCAaIgCAHIABABIAGAGQAPANAMAGQAQAIAkAJQAaAKATAPQAWASAFAUQAFATgLASIgDAIQgLAYgiAGQgQADgYgFQgOAGgTABIgIABQgYAAgXgJg");
	this.shape_22.setTransform(60.4811,18.8125);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFC3C3").s().p("AG3ENIgagMIgagMQgVgIgggDIg3gDIgqgFIgqgFQgkgEgrAAQhhgBiwASQg8AGgfAEQgzAJgaADQglAEg1ABIhHABIgIADQgMADgKgBQgLAAgJgFIAAAAIgGgBQgMACgMgDQgOgDgKgKQgGgFgDgGQgIgFgFgHQgNgRAFgWQABgHADgFIgBgIQABgNAGgLQAJgPAcgQQAhgSAhgRIAtgUQAagMASgKIBCgmQAagOBCgbQgCgHABgKQAAgMACgJQACgHAGgKIAKgPIAOgaQAIgQAGgJQALgPAYgTIBPg+QASgMAJgBQAPgDAKAMQALAMgIAOQgDAGgOAKQgqAbglAeQglAegIAaQAWgMAggMIA3gUQAigMAPgLIAYgTQASgOAZgCQANgCAKAEQANAFADAMQAEAOgNAOIAagFQAUgEAGABQAHABAFAEQAGAFAAAGQAWgEAcALIAvAWIAfANIAeAOQAjAUALAcIAAACIAWAMQAfAUAmArQAgAkgCAaIgCAHIABABIAGAGQAPANAMAGQAQAIAkAJQAaAKATAPQAWASAFAUQAFATgLASIgDAIQgLAYgiAGQgQADgYgFQgOAGgTABIgIABQgYAAgXgJg");
	this.shape_23.setTransform(60.4811,18.8125);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFC3C3").s().p("AIAEMQgagHgwgUQgygVgYgHQgPgFgygLIgCAAQhagGgVgDIgUgDIhwABQhHABgYACQglADhIAMIkXAvQgeAFgOAEIgVAHQgMADgKAAQgMgBgKgGIgBAAQgNADgOgDQgOgEgKgJQgGgFgDgHQgIgFgFgHQgNgQAFgWQABgHADgGIgBgHQABgNAGgLQAJgPAcgRQAhgSAhgQIAtgVQAagMASgJIBCgmQAagOBCgcQgCgHABgKQAAgLACgKQACgHAGgJIAKgQIAOgZQAIgRAGgIQALgQAYgSIBPg+QASgNAJgBQAPgCAKALQALAMgIAOQgDAHgOAJQgqAbglAfQglAdgIAbQAWgNAggLIA3gUQAigMAPgLIAYgUQASgNAZgDQANgBAKAEQANAFADAMQAEAOgNANIAagEQAUgFAGABQAHABAFAFQAGAEAAAHQAWgEAcAKIAvAWIAfANIAeAPQAjATALAcIAAADIAWALQAfAVAmArQAgAkgCAaIgCAHIABAAIAGAHQAPAMAMAGQAQAIAkAJQAaAKATAPQAWASAFAUQAFATgLASIgDAIQgLAZgiAFIgMABQgSAAgZgHg");
	this.shape_24.setTransform(60.4811,18.5748);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFC3C3").s().p("AIiENQgPgEgNgIQgMADgMgDQgPgDgWgRIAAAAIgggHQgrgIgXgNIgVgMQgIgEgXgGQjMgribAYIhlAUQhZAShaAKQg0AHgUAGIggAMQgTAHgNACQgcADgNAEQgUAIgKADQgNADgOgDQgOgEgKgJQgGgGgDgGQgIgFgFgHQgNgQAFgWQABgHADgGIgBgHQABgNAGgLQAJgPAcgRQAhgSAhgQIAtgVQAagMASgJIBCgnQAagNBCgcQgCgHABgKQAAgLACgKQACgHAGgJIAKgQIAOgZQAIgRAGgIQALgQAYgSIBPg+QASgNAJgBQAPgCAKALQALAMgIAOQgDAHgOAJQgqAbglAfQglAdgIAbQAWgNAggLIA3gUQAigMAPgLIAYgUQASgNAZgDQANgBAKAEQANAFADAMQAEAOgNANIAagEQAUgFAGABQAHABAFAFQAGAEAAAHQAWgEAcAKIAvAWIAfANIAeAPQAjATALAcIAAACIAWAMQAfAVAmArQAgAkgCAaIgCAGIABABIAGAHQAPAMAMAGQAQAIAkAJQAaAKATAPQAWASAFAUQAFATgLATQgLASgTAHQgLADgMAAQgIAAgIgBg");
	this.shape_25.setTransform(60.4808,18.0947);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFC3C3").s().p("AIiENQgPgEgNgIQgMADgMgDQgPgDgWgRQgwgjgdgOQghgRgtgLQgdgHg2gKQg4gJgXgCQgqgDhCAHQhLAIhCAMQg5AKhPARIhFAQIhoAdQg+ARgrAGQgSACgOgBQgMABgLgCQgXgEgLgQQgNgQAFgWQABgHADgGIgBgHQABgNAGgLQAJgPAcgRQAhgSAhgQIAtgVQAagMASgJIBCgnQAagNBCgcQgCgHABgKQAAgLACgKQACgHAGgJIAKgQIAOgZQAIgRAGgIQALgQAYgSIBPg+QASgNAJgBQAPgCAKALQALAMgIAOQgDAHgOAJQgqAbglAfQglAdgIAbQAWgNAggLIA3gUQAigMAPgLIAYgUQASgNAZgDQANgBAKAEQANAFADAMQAEAOgNANIAagEQAUgFAGABQAHABAFAFQAGAEAAAHQAWgEAcAKIAvAWIAfANIAeAPQAjATALAcIAAACIAWAMQAfAVAmArQAgAkgCAaIgCAGIABABIAGAHQAPAMAMAGQAQAIAkAJQAaAKATAPQAWASAFAUQAFATgLATQgLASgTAHQgLADgMAAQgIAAgIgBg");
	this.shape_26.setTransform(60.4808,18.0947);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFC3C3").s().p("AIiENQgUgFgPgNIgMgLIgMgJQgHgFgMgEIgTgIQgPgHgTgQIgBgBQgGgDgIgIIgNgMIgbgWQgVgNgqgOQglgNgZgEQgRgCgeAAIgvABQgLgBgzgHQgmgFgYADQgUADgdALIgwATQggALhEARIiFAgQg4ANgaAFIghAGQgTAEgNAFQgMAEgaANQgYALgOAEQgWAGgUgDQgXgEgLgQQgNgQAFgWQABgHADgGIgBgHQABgNAGgLQAJgPAcgRQAhgSAhgQIAtgVQAagMASgJIBCgnQAagNBCgcQgCgHABgKQAAgLACgKQACgHAGgJIAKgQIAOgZQAIgRAGgIQALgQAYgSIBPg+QASgNAJgBQAPgCAKALQALAMgIAOQgDAHgOAJQgqAbglAfQglAdgIAbQAWgNAggLIA3gUQAigMAPgLIAYgUQASgNAZgDQANgBAKAEQANAFADAMQAEAOgNANIAagEQAUgFAGABQAHABAFAFQAGAEAAAHQAWgEAcAKIAvAWIAfANIAeAPQAjATALAcIAAACIAWAMQAfAVAmArQAgAkgCAaIgCAGIABABIAGAHQAPAMAMAGQAQAIAkAJQAaAKATAPQAWASAFAUQAFATgLATQgLASgTAHQgLADgMAAQgIAAgIgBg");
	this.shape_27.setTransform(60.4808,18.0947);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFC3C3").s().p("AoLD2QgSgJgGgVIgCgJQgCgIAAgJQAAgNAGgLQAJgPAdgQQAggSAigRIAsgUQAbgMARgKIBDgnQAZgOBCgaQgBgHAAgKQAAgMACgJQACgHAGgKIALgPIANgaQAIgQAGgJQALgPAYgTIBQg+QASgMAJgBQAOgDAKAMQAKAMgHAOQgDAGgOAKQgqAbglAeQglAegHAaQAWgMAfgMIA4gUQAhgMAPgLIAYgTQATgOAYgCQANgCALAEQANAFADAMQADAOgNAOIAagFQAVgEAGABQAHABAFAEQAFAFABAGQAWgEAbALIAvAWIAfANIAfAOQAjAUAKAcIABACIAVAMQAfATAnAsQAfAkgCAaIgBAHIABABQAYAZgCAaQAAANgHALQgHALgLAFQgLAGgNAAQgNAAgLgGQgGgEgIgHIgMgNIgkgdQgigigTgOQgkgag8gGQgUgCgfgBIg0gCQg4gEgSABQgVABgrAKQhEAQglALQgoAMgbAMQgoAXgVAKQgWALgvARQg2AUgYAHQgrANgkAGIgPACIgTAIQgRAHgOAAQgOAAgMgHg");
	this.shape_28.setTransform(53.9294,16.3152);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFC3C3").s().p("AoAD2QgSgJgGgVIgCgJQgCgIAAgJQAAgNAGgLQAJgPAdgQQAggSAigRIAsgUQAbgMARgKIBDgnQAZgOBCgaQgBgHAAgKQAAgMACgJQACgHAGgKIALgPIANgaQAIgQAGgJQALgPAYgTIBQg+QASgMAIgBQAPgDAKAMQAKAMgHAOQgDAGgOAKQgqAbglAeQglAegHAaQAWgMAfgMIA3gUQAigMAPgLIAYgTQATgOAYgCQANgCALAEQANAFADAMQADAOgNAOIAagFQAVgEAGABQAHABAFAEQAFAFABAGQAWgEAbALIAvAWIAfANIAfAOQAjAUAKAcIABACIAVAMQAfATAnAsQAfAkgCAaQgCAZgWAMQgWAMgWgKQgQgGgQgUQgQgXgKgKQgXgYgzgTQgsgSgggFQgagEg0AAQguAAgXADQgdADgtANQhTAXgrAUQgnAUgTAJIgvATQgfALgQAHQgnAWgUAJQgRAHgmANQglANgSAJIgaAOQgQAIgKAEQgRAHgOAAQgOAAgMgHg");
	this.shape_29.setTransform(52.831,16.3152);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFC3C3").s().p("Am3D2QgMgBgLgHQgLgHgFgLQgGgLAAgNQABgNAGgLQAJgPAcgQQAhgSAhgRIAtgUQAagMASgKIBCgnQAagOBCgaQgCgHABgKQAAgMACgJQACgHAGgKIAKgPIAOgaQAIgQAGgJQALgPAYgTIBOg+QASgMAJgBQAPgDAKAMQALAMgIAOQgDAGgOAKQgqAbgkAeQglAegIAaQAWgMAfgMIA3gUQAigMAPgLIAYgTQATgOAZgCQANgCAKAEQANAFADAMQAEAOgNAOIAagFQAUgEAGABQAHABAFAEQAGAFAAAGQAWgEAcALIAvAWIAfANIAeAOQAjAUALAcIACAIIAEAJQAFAWgOASQgOASgXABQgMABgQgGIgbgLQgdgNgngHQgXgFgwgHQgegEgWAAQgRAAghAEQgfAFgfAHQg9APhvAwQg4AXgdAQQgjAXgSAKQgUALgxAVQgtAUgXAOIgiAVQgRAJgQAAIgEgBg");
	this.shape_30.setTransform(47.1526,15.7125);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFC3C3").s().p("Ak4CYQgLgCgHgLQgGgLAFgKQAFgLASgJQARgIATgIQgDgIAAgNQAAgLACgKQACgHAGgJIALgQIANgYQAIgRAGgIQALgQAYgSIBQg+QASgNAJgBQAPgCAKALQAKAMgHAOQgDAHgOAJQgrAbglAfQglAdgHAaQAWgNAfgKIA4gUQAigMAPgLIAYgUQASgNAYgDQANgBALAEQANAFADAMQADAOgNANIAagEQAVgFAGABQAHABAFAFQAFAEABAHQAWgEAbAKIAvAWIAfAMIAfAPQAjATAKAcQAFAMgCAMQgCANgMAEQgNAFgPgMQgNgPgIgGQgPgLgZgDIgsgBQgVgCg5gPQgxgNgeADQgOABgTAFIgiAJIguAIQgcAFgRAHQgMAFgSALIgeARQgMAFghAKQgdAJgPAIIgRAJQgIADgGAAIgDAAg");
	this.shape_31.setTransform(61.8071,6.2627);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFC3C3").s().p("AijB2QgIgIABgUQAAgMACgJQACgHAGgKIAKgPIAOgaQAIgPAGgJQALgPAYgTIBPg+QARgMAJgBQAPgDAKAMQALAMgIAOQgDAGgOAKQgpAbglAeQglAdgIAaQAWgMAggMIA2gTQAigMAPgLIAYgTQATgOAZgCQANgCAKAEQANAFADAMQAEAQgRAQQgNAKgYAKIgnARIgUALQgLAGgJADQgcAGgNAFIgjAPQgTAIgJAFIgPAKIgQALQgUAMgVADIgKABQgMAAgGgGg");
	this.shape_32.setTransform(51.3567,3.4436);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_17}]}).to({state:[{t:this.shape_17}]},9).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_28}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_31}]},1).to({state:[{t:this.shape_32}]},1).wait(2));

	// flare
	this.instance = new lib.eyeflare();
	this.instance.setTransform(61,35.75,1,1,0,0,0,22.6,15.7);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(26));

	// pupil
	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("AgCBlQgVgBgUgJQgUgKgOgQQgOgRgGgVQgGgWAEgVQADgVANgTQANgTASgLQATgMAXgCQAVgDAVAHQAcAKATAYQATAYADAdQACAVgHAUQgHAVgPAQQgPAQgUAIQgTAIgUAAIgCAAg");
	this.shape_33.setTransform(61.4316,30.8064);

	this.timeline.addTween(cjs.Tween.get(this.shape_33).wait(26));

	// kashtit
	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#4083FF").s().p("AAhDYQgCgCgBgHIgGgqQgJgEgKAQQgKARgOANQgJAIgFgEQgDgDAAgGQgBgUADgRQgLATgRAMQgFADgDgBQgHgCAEgNIARgmQgfAXglAOQAKgaARgTQgMAAgQAGIgbAMQgFACgDgBQgEgDABgGQABgJANgOQAOgOABgJIg+AQQgKAEgCgHQgBgEAGgEQAbgRAhgKQgegIgLgJQgIgGACgFQACgFAHgBQASgDARAAIgogiQgIgGACgFQADgEAIAAQAagDAWgIQgcgKghgRQgLgIAFgFQADgDAFABQAYADAWgHQgBgEgFgEIgIgHQgFgEgCgFQgCgFAEgEQACgCAIgBQAhgBAcAJIgWgwQAUgDAQAOIAAgjQAAgFADgDQACgCAEABQAEABADAEQADAFAFATQAEAPAIAFQAOgsAVgqQAFgIAEACQACABAAAIQgBAdgLAaIAhgnQAFgFACACQADACgDAGIgfA8QAMgCALgPIAJgNIAJgMQADgDADAAQAGACgEAIIgDAFQgCADABADQAPgUAWgNQAAAGgIAIIgbAbQgFAGgFAAQgCAAgCgDQgBAAAAgBQAAAAAAgBQgBAAABgBQAAAAAAgBQgNASgLAFQgFAEgEgCQgEgBgBgGQAAgFACgFIAFgJQACgFgBgEQgEAHgIAIQgFAEgCgBQgDgBABgIIAKgeQAHgSgCgNIgiBRQgDAGgEAAQgFABgDgIIgSgsIgDAwQgRgLgRgEQAQAZAHAaQglgLgnAEIASAUQAEAGAAADQgBAFgJACQgVAFgUgCQAKAKATAHIAgAMQAGADAAACQABAGgJACQgdAIgYADQAUAXAZAPQAIAGgDADQgBACgEAAIgsACQABALATAEIAxANQgtAHgmAZIBCgNQADAKgQASQgQAQADALQAegPAjgHQgIAYgPAUIA5ghQAIgFACAEQACADgDAGQgNAUgFAVQAQgGAJgRIAFgIQAEgFAEAEQACACAAAFIgCAmQATgMALgSQANgVALADQAKACABASIABAMQAAAHADAEIAQg1QADgIAEAAQAGgCAEAMIAMAnQAEABACgEQADgEAAgFQAAgUgGgVQgBgHACgCQACgDAFACQAFACAEAEQAWAcAUgFIgagwQgCgGABgCQACgDAIACQAZAIAagFQgIghgfgSQgFgCgCgEQgDgFADgDQABgBAHAAQAVAEAWgBQAIAAADgFQgJgMgWgGIglgLQgGgCABgCQAAgFAJABQAgAGAngEQgHgTgdgCIgXAAQgNAAgJgCQgIgBABgFQABgDAEgCIAxgeIg6AHQgDgFAIgIIAdghQgJAAgTALQgRALgKgDQALgVAMgUQgTAMgYAIQgKADgDgEQgDgEADgGQAMggAXgYQgTAdgNAhQANABAWgNQAXgOALAAIgjAwQAKABAUgMQATgMAKADQgRAZgVAVQAVgGAegCQAGAAACACQACADgCAEQgCADgFACIgsAaQAOACAcAAQAZACANAMQAIAIgCAIQgDAIgPgBIgLgBQgHAAgEABQAGAFARAGQAGADADAFQAEAGgDAGQgCAFgHACQgHADgOgBQgPgBgHABQAXASAMAZQAFAIgEAGQgDAFgJABQgZACgVgFQAOATAJAXQADAIgDAEQgEAGgLgDQgZgGgPgWQAGAfgCARQgCAKgFADQgEADgFgCQgGgCgDgEQgDgFgCgQQgBgNgGgHIgPA3QgCAHgDADQgDADgDAAIgEgBg");
	this.shape_34.setTransform(61.7931,29.3528);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#0033FF").s().p("AgGD5Qg0gBgxgYQgxgXgigoQgigqgPg1QgPg1AJg0QAIg1AgguQAfguAugcQAugcA3gGQA2gHAzARQBFAXAwA8QAvA7AGBIQAFA0gSAzQgRAzgkAnQgkAmgyAVQgvATgxAAIgGAAgAAbCZIAFAqQABAHADACQAFADAFgFQACgDACgHIAPg3QAGAHABANQACAQAEAFQADAEAFACQAGACAEgDQAEgDACgKQACgRgFgfQAPAWAZAGQAKADAEgGQADgEgDgIQgIgXgOgTQAVAFAZgCQAJgBADgFQADgGgFgIQgMgZgWgSQAGgBAPABQAOABAHgDQAHgCADgFQACgGgDgGQgEgFgGgDQgQgFgHgFQAFgBAGAAIALABQAPABAEgJQACgIgIgIQgNgMgagCQgcAAgOgCIAtgaQAEgCACgDQADgEgDgDQgBgCgHAAQgdACgWAGQAWgVARgZQgLgDgTAMQgUAMgKgBIAkgwQgMAAgXAOQgWANgNgBQAOghATgdQgXAYgMAgQgDAGACAEQADAEALgDQAYgIATgMQgNAUgLAVQAKADASgLQASgLAKAAIgeAhQgIAIADAFIA7gHIgyAeQgEACAAADQgBAFAIABQAIACAOAAIAWAAQAeACAHATQgnAEghgGQgIgBgBAFQAAADAFACIAlAKQAXAGAIAMQgCAFgJAAQgVABgVgEQgHAAgCABQgDADADAFQADAEAFACQAeASAJAhQgaAFgZgIQgIgCgCADQgCACADAGIAZAwQgUAFgWgcQgEgEgEgCQgFgCgDADQgBACABAHQAFAVAAAUQAAAFgCAEQgDAEgEgBIgMgnQgDgMgHACQgEAAgCAIIgQA1QgDgEgBgHIAAgMQgBgSgLgCQgLgDgNAVQgLASgSAMIACgmQAAgFgCgCQgEgEgFAFIgFAIQgJARgQAGQAFgVANgUQAEgGgCgDQgDgEgIAFIg5AhQAPgUAJgYQgjAHgeAPQgDgLAPgQQAQgSgDgKIhCANQAmgZAugHIgygNQgTgEAAgLIAsgCQADAAACgCQADgDgIgGQgZgPgUgXQAYgDAcgIQAJgCAAgGQgBgCgFgDIgggMQgTgHgLgKQAVACAUgFQAJgCABgFQABgDgFgGIgSgUQAngEAlALQgGgagQgZQARAEAQALIAEgwIASAsQADAIAFgBQADAAADgGIAihRQACANgGASIgLAeQgBAIAEABQACABAEgEQAIgIAFgHQAAAEgDAFIgEAJQgCAFABAFQABAGADABQAFACAFgEQALgGANgRQgBAAAAABQAAAAAAABQAAAAABABQAAABAAAAQACADADAAQAFAAAEgGIAbgbQAJgIgBgGQgWANgPAUQAAgDACgDIACgFQAFgIgGgCQgDAAgEADIgJAMIgIANQgMAPgMACIAfg8QAEgGgEgCQgCgCgFAFIghAnQALgaACgdQAAgIgDgBQgEgCgFAIQgVAqgNAsQgIgFgEgPQgFgTgEgFQgCgEgEgBQgEgBgDACQgCADAAAFIgBAjQgPgOgVADIAXAwQgdgJggABQgJABgCACQgDAEACAFQACAFAEAEIAIAHQAFAEABAEQgWAHgXgDQgGgBgCADQgGAFAMAIQAgARAdAKQgXAIgZADQgJAAgCAEQgDAGAJAGIAnAhQgRAAgRADQgIABgCAFQgBAFAHAGQAMAJAeAIQghAKgbARQgGAEAAAEQACAHAKgEIA+gQQgBAJgNAOQgNAOgCAJQgBAGAFADQACABAFgCIAcgMQAQgGAMAAQgSATgJAaQAlgOAegXIgQAmQgFANAHACQADABAGgDQARgMAKgTQgDARABAUQAAAGADADQAFAEAJgIQAOgNAKgRQAJgNAHAAIAEABg");
	this.shape_35.setTransform(61.5223,30.5901);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_35},{t:this.shape_34}]}).wait(26));

	// white
	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AjDDQQgzgNgXgOIgZgRQgPgLgKgFQgXgKghACIg6AHQghAEgagIQgfgJgMgYQgHgOABgQQACgQAJgNQAUgZAtgDIAkgBQAXAAANgDQgEgVANgWQAMgVAWgNQAQgJAbgKIAtgPQAmgPBDgxQBDgwAngPQAfgNBBgLQAxgIAeAAQAsAAAhAOQAYAKAZAWQAPAOAbAdQBeBmAmAzQAOASAHAIQANAOANAIQAGAEARAIQAPAIAIAGQARAOAGAZQAFAYgJAXQgQAqgxAWQgeAOg9AJQhpAOhpAAQi4AAi1gsg");
	this.shape_36.setTransform(58.5544,31.5407);

	this.timeline.addTween(cjs.Tween.get(this.shape_36).wait(26));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.7,-8.9,132.6,73.5);


(lib.lefteye = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// eyeliner
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AABBlIgagMQgHgEgGACQgCABgDAEIgGAFQgFADgJgCIgQgDIgIABIgJACQgIAAgJgHIgQgKQgEgCgQgCIgtgFQgkgEgOgFQgSgIgHgBQgOAAgHgCQgEgBgFgFIgJgGQgFgDgJgCIgOgDQgPgEgWgQQgJgGgFgGIgIAAQgRgDgigCQgjgCgRgDIg4gMQgigIgXgBIgOAAQgIgBgGgCQgHgDgEgFQgFgGABgHQABgGAEgDIAAgBIAAAAQAHgGAPgCQAbgEApAHIAWAEIAYABQAKAEAaAFIAlACQAjABARACQAUADAdAHIAwAMIAyALQB2AVBJAGQCaANCVgdQAUgIAagJIArgSQAfgFAkgLQAhgKAUgJQAYgMAPgQIAEAAIAHADIADgBQADAAAFAFIAJAFIAQAGIASAFQAKADAGAAIAKACIAGACIAFAAIAagBIAIgCQAIgBAFAEQAHAFgDAIQgCAEgGADQgGAEgHAAIgTABIgUgBIgDAAIADACQAFAGgEAKQgDAJgJAEQgOAGgUgKQABAIgIAIQgKAHgEAEIgFAGIgHAFQgEADgSAAQgOAAgdANQgbANgQgBQABAKgMAFQgOADgGACQgLAHgGACQgGACgIAAIgPgCQgMgBgGAEIgFAEIgGAFQgHAEgPgBQgRgBgHADIgNAIQgHADgJAAIgRgDQgOgCgMABIgUAFQgaAGgbgHQgQgFgGACIgMAHQgGACgKgCQgMgCgEAAIgRAFIgGAAQgJAAgMgFg");
	this.shape.setTransform(65.4256,53.9204);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AAoBWQgKgKgFABQgCABgGAGQgGAFgIABQgHABgGgEQgJgFgCAAIgIADQgVAJgjgaQgEAGgIACQgIACgIgCQgLgCgQgNQgMAKgSgFQgOgEgOgLQgIAGgLAAQgKAAgIgFIgKgKQgGgHgEgCIgTgIQgPgJgJgCQgUACgIgFQgDgCgCgDQgpgGgagFIhHgRQgpgKgfAAIghABQgTAAgNgCQgOgBAAgIQAAgFADgDIAAgBIACAAIAHgDQAXgIAsgDQBAgFAhAJIAlALQANADAZADQBAAJCAALIBlAJIBSAGQAuADAkgBQAugCA4gJQAigFBEgNIBNgPQBKgNAmgQQAPgHAGgBQANgEAJADIACAAQAEgEAFAAQAFgBAGADIAFACIAHgBIAKABIATAAIAQAFQAIAEAEAEQAEAEABAGQACAHgDAFQgEAMgMABQABAGgEAHQgDAHgHAEQgMAIgSgFQABAKgKAHIgTAJQgQAIgGABIgMABIgLABQgHABgJAEIgQAIQgYAMgdgEQgTgCgEAAQgHABgRAJQgKAGgJADQgOAFgPgBQgPgBgNgIQgQAUgTAEQgYAGgRgOQgCAJgMADQgIACgNgDQgTgDgKACQgFABgIAEIgOAFQgIADgHgCQgIgCgEgFQgJAIgNAAQgOAAgJgIg");
	this.shape_1.setTransform(62.2022,52.0708);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgMA1QgEgDgGgJIgEgFIgTgBIgGABIgWgBIgRAEQgKADgHgDIgHgGQhwgGhegMQgtgGgOgBQgqAAgUgCIg5gKQgggEgoAGQgMABgEgCQgEgBgCgDQgDgEABgEQAAgCADgDQgHAAAAgBIAJAAIAGgEQAdgMAqgBQAQAAA6AEQAbACBfAEIBgACQDfAGBwABQAsAAAVgCQAVgCAogIQAngHA2AAIBeAAQAtAAAYgHIAhgKQAUgDANAJQAEADACAEQAHgCAHACQAOAFACANQABAIgHANQgKAPgMACIgKACIgKAIQgKAJgTAAQgUgCgKABQgFAJgMACQgMABgIgHQgLAJgZgHIg3gOQADAFgDAGQgDAFgGADQgIAEgPgCIgrgEQgPgBgKgDIgHABIgNACIgKAGIgKAFQgNAFgYgNQgNAPgagHQgNgDgDABIgNADQgRADgagSIgDAAQgDAFgHAEQgHAEgIABQgJAAgVgHQgEAIgKADIgFABQgGAAgFgEg");
	this.shape_2.setTransform(60.3563,48.3169);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AA/AsQgNgDgYgPQgKALgQABQgRAAgLgKQgIAEgJAAQgKgBgHgFQgGAIgMgDQgMgEgHgBIgIgBIgBAAQgYABgSgBIgmgEIglgEQgXgCgggBIg2AAQhqgBhsgRQgTgDgKgFQgLAAAAgBIAJAAIACAAQAMgHAZgEQA2gHBGgCIB8gBQA1AAAjADIA6AGQATABAbgDIAtgFQBkgMC6AFQDIAEBYgHQAegDAOAGQALAFAHAKQAGALgEAKIgCADIABABQAGAHABAJQABAKgGAGQgJAKgSgGIgbgNQgEAGgHADQgHACgHgCIgHgEIgIgCQgEAAgGACQgHADgEgBQgDAAgHgDQgHgEgEAAIgIACQgGADgCAAIgJgCIgIgCQgEgBgOAFQgLAEgbAAQgbgBgNgCIgQgBQgLAEgGAAQgHAAgLgHQgMgIgGgBQAAAIgHAHQgGAFgJABQgLABgWgLQgEAGgHADQgIADgHgCIgRgFQgDAAgIADQgLAEgLgBQgMgCgIgIQgFAJgKAEQgGACgHAAIgIAAg");
	this.shape_3.setTransform(59.2321,47.1864);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AIkArQgGAAgTgGIAAAAQgJACgIgBQgPgHgJABQgEABgIAEQgJAFgEAAQgIABgHgGQgGgFAAgGIgTgBIgBAAIgEAAIg1gBIg/AAIgJACIgWAGQgKADgHgCQgHgDgCgHIg4AAIgGAEQgHAEgIgEIgGgEIgJAAQgFAGgIAAQgKAAgGgGIgxAAIgCABIgSAAQgFAAgIAEIgNAFQgHABgHgEQgEgDgBgEIguAAIgGAFQgHADgHgDQgFgCgCgDIhxABQg5ABgTACIg3AHQgaADgkAAQheAAhNgIQgLgBgFgDQgJgFACgJIgFAAIgJAAIAPgBQADgJASAAIBsACQA+AAAsgGIBAgMQAegFBIgCIA6gBIACgDQAJgHAMAAQAMABAGAIIADAAIAFAAIAxgBIAHgDIAIgIQAFgEAEgCQAKgDAPALIAGAGIAsAAIABgCQAHgGAGgDQAIgEAIACQAJACADAIQAEgDAIACIANADQAFAAAKgDQAGAAAFAEIA0AAIACgCQAJgHAFgBIAIACQAFADACAAQAEAAAGgCIAKgCQAFAAAEADQADACACAEIABAAIAigBIAJgFQANgHAIgBQAOgBAFALQAFgFAMAAQARABADgBIAQgEQAIgBAFAIIADAGIAOAAQASABAKAEIABAAIAOACIATgGQAKgBAOAHQAIADAEAEQAJACAEAGQADAFABAEIABADQAEAJgCAKQgDAJgIAFQgHAFgKAAIgHgBg");
	this.shape_4.setTransform(58.6731,45.8842);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AHlA7IglgJQgpgKhigOIh7gPQhNgIh5AFIimAJIhiAHQhiAGgxABQhRABhAgKQgRgCgCgKIAAgDIgEAAIABAAIgBgBIAEAAQAAgEAFgCQAGgFAIgBQAMgBAfAEQA7AGBugOICRgTIBngNQAbgMAOAAIANABQAIAAAFgBQAGgBAMgFQAJgCASADIAgAFQAXAEANgBQAIAAASgEQARgEAJABIATACQALABAHgBIAMgCQAHgCAFABQAHABAEAEQAFAFgBAFIABAAIADABQA6gBAeABQAzACAoAJQAJADAJAAIASgFQAXgIAXAFIAeAIIAUADQAKABAPAHQARAHAHACQARAFADACQAGADABAIQACAIgEAGQgGAKgSADIgBAGQgEAHgHAFQgLAJgTABIgGAAQgOAAgSgEg");
	this.shape_5.setTransform(59.3705,45.8441);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AIVBRQgSgDgbgLIgrgTQgXgIgtgGQgxgFgUgGIg2gRIgFgBIgjgDQgpgCg0AAQgoAAgrABQgrAEgqACIgPABQgiACgzAFIhdAJQhRAIg4AHIhAAHIg8AEQgrAAgYgCQgJAAAAgBIAAgBIAAAAQAAgBAOgBIAVgCQgIgDABgEQAAgGAKgDICQgeIBMgMQACgCAEgCQAFgDAQAAQAOABAHgFIAHgGQAEgEAEAAQADAAAHADQAGADAEAAQAHAAAMgJQAEgCAIABIANAAQADgBAOgHQALgFAHABIAGADQAEACADgBIAJgEQAEgCAHADIAKAFQAJACANgIQAQgJAFgBQAHgBAQADIAZAHQAIgGATgCQATgDAJgFIAIgGQAFgDAEgBQAIgCAJAFIAPAKQAGAFAGAAIAKgGQALgHAMAEIAJAEQAFABAEgBQAEgCAHgHQAIgFALAIQAPAKAEABQAFABAIgDIANgEQAIgCAHABQAHACACAHQAFgHAIgBQAJgBAGAFIAFAGIAFAFQAGADAMgCQAOgEAEABQAHAAAOAFIANAAQAHAAAFABQAGABAFAEQAFAFgBAFQALgCALAIQAGAGACAHIARADQAIgBAIADQAHACAHADIAnAPQAaALARADIARADQAKACAFAFQAIAGABALQACAKgGAJQgKAMgUAAIgLgBg");
	this.shape_6.setTransform(58.04,41.3875);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AHfBQQgLgFgPgLIgFgDIhUgbQgngNgbgGQgqgLgtgDQgpgEg0ABQguAAgyADQgpACgvAGQghAEg0AIIhdANIgUACIhMAOIg+AKQgdAGgRABIgNAAIgtADQgrACgYgDQgJgCAAgBIAAAAIAAgBQAAgBAOgCIAOgCQgHgFACgIQACgGAJgDQAGgCAQABIATAAIAEAAIACgCQAPgLAmgIIC9gmQAAgEADgEQAEgFANgCQAXgEAwgCQAXgCAOAEIAKgBQAEgHAIgFQAJgFAKABQABgIAHgFQAHgEAHACIAIADIAIADIAMgDQAJgCAKACQAJADAGAHQANgNAKgDQAQgEAKAJQANgOALgBQAIgBAGAFQAHAEABAHQAKgNAPgBIAKgBIAKAAIALgDQAGgBAFAAQAHABAFAGQAFAFAAAHQAVgKAMAEIALAHQAHAFAFABQAFACAIgCIANgDQAHgBAHADQAHADAAAGQALgBAHACQALAEAAAIQAMgDAXADQAYADAKgCIAMgEQAGgCAFABQAHABADAFQAFAGgEAFQATgCARAXIACAEQANAFALAIIAUAOQAMAIAKADQAIACAOAAIAVACQALACAIAHQAKAHgBAKQAAAOgOAHQgKAFgQABIgKABQgfAAgXgLg");
	this.shape_7.setTransform(58.5888,38.9075);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AH2BfIgVgMIgXgJIhXgkIgNgGIgbgIQhAgRgZgEQgpgGg6gBIhjAAIghAAQghAEglAFQghAEg0AKIhdARIhIAOQhSAVgzAPQgVAHgNACQgTADgOgFQgOAFgPABQgNABgHgHQgEgFABgFIgFgBQgKgCABgCQgBgCAPgCIADAAQADgGAJgCIAIgBIAJAAQADgBALgFQAJgFAGABIAAAAIABAAIAxgQQBrgjA2gNIAJgCQgBgEAFgFQAFgFAHgBQAKgCAWABQAUABALgDQAJgDAPgKQAPgKAIgDQAJgEAUgCQAVgCAKgDIABgBIACgHQADgHAFgEQALgIAPAHIAIAGIACABQAFgBAGABQAGACAEADIAEAAIAAAAIACgCIABgCIAAgGQgBgGAFgFQAFgFAGAAQAFAAAEAFQAEAFAAAGQAFgMAEgFQAJgIAJABQALACAFAPIACAKIAVgHQAQgCAEALQAPgNAIgCIAAAAIABAAQAEgHADgCQAGgGAJADQAKACADAIIABAEIADAAQALABAEAKIACAAQALgJANADIAOADQAEAAAHgDIAKgCQANACAEAQQAQgGAIABQAHABAFAEQAGAEAAAGQAPgCAHACQANADAEALQAhAIAmABQAYABADANQALACAMAKQAIAGAMAMQAIAKACAIIAOAIQAVAMAsAdQAPALgBAJQAAAIgIAEQgHAEgJAAIgCAAQgVAAgbgOg");
	this.shape_8.setTransform(57.8964,37.1146);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AIbCCQgWgCgNgIQgHgFgJgJIgHgIIgWgLIhXguQgngWgbgKQgSgHgTgEIgKgEQgZgHgQgBIgMABIgCgCIAAAAQgkgFgqABQguAAgyAGQgpAEgvAJQghAFg0ANIhVAUIibArQgQAFgIgBIgFAAIgaAGIgIACIAAAAQgMAHgFABQgKADgJgDIgFgDIgLACQgrACgYgFQgJgDAAgCQgBgDAPgCIA9gOIAKgCIAFgDIAJgCIAMgEQAigTAHgDQAJgEAHABIAEgDQALgFATgFIACgBQADgDAOgFIAggIQgBgFACgEQAEgMANgCIASABIARACIAAAAIAFgEIAPgIIALgEQAGgCAEgDIAHgKQAFgGAEAAQADgBAFACIAHADQAGABAHgBIASgCIAAgFQABgHAIgEQAHgEAGAEQACgHAIgDQAIgEAHAEQAFADACgBQAEAAACgFIAEgJQAFgFAJACIAPAEQADABASgEQAPgEAOADQAHABACgCQAEgCACgIQAEgGAIABIAPADQAGABANgCQAMgBAHACIALgCIADAAIAAgLQADgKAJgEQAKgDAHAHIAKAJQADADAKAAQAKABADAEIABABIAEABIAUABIAAAAIAGgFQAFgDAIgBIANgBIAOgCQAIgBAFADQAFADAGAHIAFAEIACAAQAOABALAGIAEADQANAEAFACIAPALQAJAHAIACQAHABAOAAQAJACASAJIAYAHQAPAGABAMQAZAOAcAJQAWAFAFAKQABAEABAKIASAPIApAiIAIAJIADACQASAMgBALIgBACIgBAHQgDAHgFADQgHAFgLAAIgIgBg");
	this.shape_9.setTransform(57.7976,35.2167);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AIoCPQgEgCgKgLIgCgCQgJACgJgDQgJgEgNgMIgEgEIgLgFIgigWIhWg4IgbgSIg4gdQgjgPgjgHQgqgIgzABQgvgBgxAIQgpAFgvAMQgiAIgzAQIhdAaQhRAXg5AVIgpANIgWAHIgBAAQgfAHgeAEQgrAEgYgIQgJgDABgCQgBgEAPgEQAcgGAhgKIA5gTIAUgHIAYgNIAQgJQACgMARgEIAOgCQAJgCAFgDQAFgCAGgGIAKgJQAKgHAVgIQAWgIAJgBQAPgBAFgDIAIgIQAFgEADgCQAEgBAJABQAHABAEgDQADgBADgGIAGgIQAFgDAKABQAMACAEgCQADAAAGgEQAFgDADgBQAFgBAMACQAIgBANgJQAEgBAJgBIANgCQAFgBAOgHQALgGAHAAQADAAAKADQAIADAEgBQAHgBAKgIQAKgFASACQAXACAHgBQAHgBAPgFQAOgEAJAEIALAEQADgBAEgDIAGgHQAFgGAJAAQAIgBAHAFIAGAGQAEADAEABQAEAAAEgDIAGgFQAKgGAMAEQAMADAFALQAMgEALAIQAMAIAAANQANgFARAMIAOAKQAIAFAHABIAKAAIAKABQAJACANAPQAIAKAHABIAPgBQAHAAAHAEQAHAFADAHIADAIQACAEADACQADACAEABIAHABQAIABAIAJIAGAHIAPAIIAgAXIASADQALAEAEAIQABAEgCAEIAMALQALAMACAMQAMAHAGAIQAKAMgEAOQgDAKgKAEQgFACgEAAQgGAAgFgDg");
	this.shape_10.setTransform(58.929,34.9738);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AIuCjQgJgDgOgMIgNgDQgWgIgUgNIgigZIhWhFQgbgWgUgNIgCgBIgxgaIgVgKQgRgGgRgFIgQgDQgTgCgcAAQg9AAgvACIgSADQgpAHgvAOQgiAJgzATIhdAgIgoAOIgXAJQghANgVALIgWALIgWALQgZALg2AJQgiAHgVgBQgJgBgEgDQgNgBgJgEQgJgDABgEQgBgEAPgEQAcgIAhgMIA5gXIAagLQAAgDACgFQAEgIAIgEQAGgEAKgCIAQgDQAPgFAUgOIAQgKQAPgLALgBIALAAQAHAAAEgBQAEgCAFgFQAGgGADgBIAKgCQAHAAADgCIAIgGQAEgFADgCQADgCAHgBIAJgEQAFgCAIgLQAIgJAGgCIALAAQAHABAEgBIAHgGIAIgGQADgCAIgBIALgDQADgBAFgGIAHgHQAFgDAJAAIAPABQAKgBATgGIAngCQAWAAAMgJIAQgMQALgFALAGQAHAEADAHQAFgFAKgFQAbgPAQAGIAIAEIAIADQAFABAHgDIALgGQAQgHAPAJIAKAHIALAGQADABAPAAQALABAFAFIAFAHQACAEADACQADADAMABQAMACAJAIQAKAIABALQALgEANAFQAMAFAFALQAFAKACACQAEADAGgBIALAAQANgBALAJQALAKABANQAKgDAKAEQAKAEAGAIIAHANQACADAOAHQAKAHgBAJQAJgCAIAIIAMAOQAGAFAOAGQAOAFAGAGQAFAGADAMIAHATQAEAJAMARQAKASgJALQgGAIgKAAIgJgBg");
	this.shape_11.setTransform(59.0368,32.2852);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AIzCyQgHgBgKgIIgBAAQgFACgEAAQgJgBgLgEQgVgJgUgQQgNgKgUgTIhWhRQgngmgbgSQgpgdgtgMQgpgMg0ABQgugBgyALQgoAIgwARQghALg1AWIhdAlQhRAig5AdQgxAWgQAHQgfAKgeAFQgqAFgZgKQgJgEABgEQgBgFAPgGQAcgIAhgOIA6gbIBagrIAwgWIAFgGQAJgFADgFQADgDACgHQAFgIANgBIAVAAIAMgCIAMgJIAFgDIADgEIAKgPQANgPASAFQABgIAHgGQAHgGAJAAQABgHAGgFQAHgFAGABIANABQADgBAEgEIAHgGQAEgDAIgBIANgBQAJgBAKgGIAegQQARgIAOAAIAQACQALABAGgBIANgFQAHgDAGAAIAKADQAGADAEgBQAGAAALgGQAHgDAHAEQAHADADAGQAIABAKgEIARgIQAWgMAMAJIAMAJQADABAIAAIAsAAQAUgBAKAHQAGAFABAJQABAJgHAEQAHADAMAAIAUACQALACAHAHQAIAIgCAJQAVAFAJAIQAHAGACAIQADAJgEAHQAGAEAKACIARAFQAKADAGAGQAGAHAAAIQARAJAXAPQASANABALIAAAHQAOANALAMQANgCALANQAIAJAGASQACAIACADIAGAIIAJALIAJAJQAFAFACAFQAGAOgKALQgHAJgLAAIgFgBg");
	this.shape_12.setTransform(59.5773,30.1175);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AIqC+IgKgDIgCABQgEACgFAAQgJgBgLgFQgVgKgUgSQgNgLgUgWIhVhcQgngrgbgVQgoghgtgOQgqgNgzABQgvAAgxAMQgpAJgwATQghAMg1AZIhdArQhRAng6AgQgwAagRAHQgeAMgeAFQgrAGgYgMQgJgEAAgFQAAgFAPgHQAcgKAhgQIA5geIBNgqIABAAQADgEAGgDIAKgHIAHgFQAFgDAEgBIAGABIALgFIABgHQAAgNAQgGQAHgDAUgBQAKgBAKgDIAYgMIABgFIAAgGQABgLARgDIAMgCQAHgCAEgDQAFgEAGgSQAEgQAKgDQAGgCANAGQAMAFAHgCIAIgFIAGgIQAJgIANgBQANgCAJAHIAVgQIAJgFQAGgLASgBIAPgBIAOgBQAMgDAWgLQAKgDAJACQAKADADAJQAhgXAoADQAZACACAQQAUgKAMABQAJAAAHAFQAIAGAAAIQAIACALgBIATgCQAYgDAMAKQAIAGABALQABALgIAEQAJAEAaAAQAYABAKAJQAGAGABAKQAAAKgHAEQAMAAAJAJQAJAKgBAMQAGAIASAEQAUAEAGAFQAIAFABALQABAKgGAFIABABIADACQAHADAMADQARADAGAHQAFAGAAAJQAAAGgDAFQANAPANATIAFAEIANAHQAIAEAEAEQAGAHAAAKQgBAJgGAHQASAEAJAHQAOALgCAOQgCAMgNAGQgIADgJAAIgJgBg");
	this.shape_13.setTransform(59.8876,28.2353);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AISDPQgJgBgLgFQgWgMgVgUQgNgNgWgZIhahpQgpgwgcgYQgqgmgugQQgqgPgzABQgvABgwANQgpALgvAVQghAOgzAcIhbAxQhPAsg4AkQgvAfgQAHQgeAOgeAFQgqAIgZgOQgJgFAAgFQgBgGAPgIQAbgLAggTIA4giIA7glIgBgBQgCgHADgEQAFgHAQgBIAMgBIAMgHIgDgDQgFgKAFgIQAEgFAJgBIAPgBQANAAANgDIAbgQIABgHQADgFAOgEQAJgCAJgEIARgJIAEgCQgEgGADgHQADgHAHgEQAGgDAIgBIAPgCQAFgBADgCIACgFIABgFQACgHAHgFQAHgEAHAAQAKAAATAHQAHgUAJgGQAHgEAJACQAJADAAAIQAbgGAUgUIANgNQAIgGAHACQAIABADAIQACAFAAAFIAIgCQALgFAHgJIAKgKQAGgGAFgBQAHgCAUAHQAeAKAbgJQANgGAFAAQAJgBAHAHQAHAHAAAIQAlgLARAMQADACAJALQAHAJAHADQAFACAIgBIAPgCQATgDAHAKQAHAJgIATQAXABAYAGQAOAEAFAHQAFAGgBAKQgCAJgHAEQAFAGAWAHQAVAHAAAOQABAEgDAGIgEAJQAXgDAMgBQATAAAGAIQAEAEAAAIQAAAGgEAFQgDAHgPALQgBAAgBAAQAAABgBAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABABAAQAAABABAAQAAAAABAAQAFADAJAAIAPAAQAUgBAHALQAEAHgDAJQgEAJgHAFQAJAPAIAHQAIAIAGACQAFACAQgBQANAAAGAEQAFAEACAHQACAGgCAGQgEAMgMAHQAFAGAMAAQAOgBAFADQAGACACAHQADAHgCAHQgFAOgPAEQgLAEgQgCIgJgCQgDAFgDACQgEACgFAAIAAAAg");
	this.shape_14.setTransform(60.244,26.5278);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AIFDsQgIAAgMgGQgWgNgVgXQgNgOgWgcIhch0Qgrg1gcgbQgrgqgugSQgqgQgzABQgvAAgwAPQgpAMgvAXQggARgyAeIhaA2QhOAyg4AoQguAhgRAJQgdAPgeAGQgqAIgagPQgJgFAAgGQAAgHAOgIQAbgNAggVIA3gmIAegUQgBgHAEgGQAFgIAJgEIAQgFQALgDAGgDQgRgQAHgMQAEgHAPgDQAMgCAWABIAOAAIANgJIAAgHQACgKAIgFQAKgHAVABIAdgTQgCgHACgJQADgIAIgEQAIgFAIADIAIAFIADACIAUgLQgEgXALgKQAEgEAHgBQAHgBAFACQAKAFACAJIAJgEQAIgLAEgNIAFgOQAEgHAFgEQAFgEAIABQAIABAFAGQAIAIgBALIABgBIAfgLIACgIIADgOQAEgSALgFQAMgFALAKQAIAJgBANIAFACIANgDIAGgEQAGgHAIgRQAJgPANAAQAHgBAGAGQAFAFACAHQABAJADADQADADAIgBQAbgDAJgKIAIgKQAEgGAEgCQAHgFAIADQAJACAFAGQAKAOgGASQAEgBAKABQAJABAFgCQAGgDAIgLQAGgFAKABQAJABAGAHQALAPgPAbIgCACIAMAGQAFgCALgDIASgLQAKgHAJAAQAJAAAFAGQAMAMgIASQgDAJgPARIAMAKIABAAQAGgEAKAAQAHgGAJgCQAIgBAIADQAIAEADAGQAGALgFAOQgDAGgKAQQAHABAJgBIARgDQAVgDAJALQAKALgIAPQgGALgNAIQAHABAKgBIAQgCQAVgEAJALQAJAKgGAOQgFAKgOAIQAHAJAPgEIAMgDQAGgCAFAAQALABAHAKQAGAJgDAKQgEAMgTAMQAGALAMAGQAMAFAMgBIARgEQAKgCAGACQAIACAFAIQAFAHgBAIQAAAPgOAOQgHAHgUAMQAIAAALgEIASgHQAKgDAJACQALADADAIQAFAMgLAMQgFAGgRAHQggANgWAAIgBAAIgEADQgEACgEAAIgBAAg");
	this.shape_15.setTransform(61.4773,23.5804);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AHxD/QgJAAgMgHQgWgOgVgZQgNgPgWgfIhch+Qgrg6gcgdQgrgtgugUQgqgSgzABQgvABgwAPQgpAOgvAZQggASgyAhIhaA7QhOA2g4ArQguAlgRAJQgdAQgeAHQgqAJgagQQgJgGAAgHQAAgHAOgJQAbgOAggWIA3gqIAQgMIAAAAQgDgSAQgNQAMgLATgCQgCgeANgKQAJgIAUACQAZACAHgCQgEgfAPgIQAIgFAQAEIAQAEIAKgHQABgVAOgOQAJgIAMgBQAMAAAIAGIAEgDQACgFAAgIQAAgOABgEQADgLALgFQAKgFAKAFIAHAFQAFACADABQALACAIgOIAIgWQAEgLAHgHQAIgIAKgBQASgDANATQAIgEAIgRQAHgQAIgEQAHgEAKACQAIADAHAHIAJAJQAGAFAFAAQAFgBAHgGQAHgIALgQQAKgOAPAAQAJABAGAIQAGAIAAAJQAFgBAKAFIAFADIAPAAQAFgCAEgGIAKgRQAHgJAMgDQANgDAJAHQAEAEAEAHIAFAMQAHAPAMACQAFgDAMgPQAKgMAJAAQAKABAFAKQAFAKgBALIgDAUQgBAKABAHIAFADQAMABAQgMQAUgRAJgDQAJgDAJACQAKADADAHQAFALgMAVIgTAgQAXgCAVgKQAOgHAHgCQAMgDAIAFQAKAGABAOQACAUgXAhQAMgMAIgEQAOgGAKAHQAJAGAAAMQAAALgFAMQgIAVgOAVIApgPQASgHAKAEQAJAEAEAJQAEAIgCAKQgCAOgPATQALAFAWgIQAXgGAKAIQAJAIgCAOQgBAJgIAMQgTAZgcAKQAeADAwgJQARgDAIAEQAJAGABANQAAAMgHAKQgFAGgLALQgLAKgEAGQAJABANgEIAWgIQAMgEALADQANADAEAKQAFANgNANQgIAIgRAGQgkANgXAAQgOgBgNgEQgDALgHAEQgDACgFAAIAAAAg");
	this.shape_16.setTransform(63.5559,21.7197);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape}]},9).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_16}]},1).wait(1));

	// eyelid
	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFC3C3").s().p("AgyFGQgZAAgTgFQgQgDgZgJIgpgNQgagIg2gIIhmgOQgZgEgOgFQgTgGgKgNIgXgEIgJgDIgVAAQgbABgLgCQgVgCgMgLIgCgBIgEgDIgKgCQgOgDgKgKQgGgFgDgGQgIgFgFgHQgNgRAFgWQABgHADgFIgBgIQABgNAGgLQAJgPAcgQQAhgSAhgRIAtgUQAagLASgKIBCgnQAagOBCgbQgCgHABgKQAAgMACgJQACgHAGgKIAKgPIAOgaQAIgQAGgJQALgPAYgTIBPg+QASgMAJgBQAPgDAKAMQALAMgIAOQgDAGgOAKQgqAbglAeQglAegIAaQAWgMAggMIA3gUQAigMAPgLIAYgTQASgOAZgCQANgCAKAEQANAFADAMQAEAOgNAOIAagFQAUgEAGABQAHABAFAEQAGAFAAAGQAWgEAcALIAvAWIAfANIAeAOQAjAUALAcIAAACIAWAMQAfAUAmAsQAgAjgCAaIgCAHIABABIAGAGQAPANAMAGQAQAIAkAJQAaAKATAPQAWASAFAUQAFASgLATIgDAIQgLAYgiAGQgMACgQgCQgQAYgnALQgaAIgvAEQgKANgXALQgkARgwAGQgfAEg5ABIjTAEIgbABIgSgBg");
	this.shape_17.setTransform(60.4811,23.7152);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFC3C3").s().p("AA4E7Qg6gBhzgUQi/gihngJQgagCgMgDIgJgDIgVAAQgbABgLgCQgVgCgMgLIgCgBIgEgDIgKgCQgOgDgKgKQgGgFgDgGQgIgFgFgHQgNgRAFgWQABgHADgGIgBgHQABgNAGgLQAJgPAcgQQAhgSAhgRIAtgUQAagMASgJIBCgnQAagOBCgcQgCgGABgKQAAgMACgJQACgHAGgKIAKgPIAOgaQAIgQAGgJQALgPAYgTIBPg+QASgMAJgBQAPgDAKAMQALAMgIAOQgDAGgOAKQgqAbglAeQglAegIAaQAWgMAggMIA3gUQAigMAPgLIAYgTQASgOAZgCQANgCAKAEQANAFADAMQAEAOgNAOIAagFQAUgEAGABQAHABAFAEQAGAFAAAGQAWgEAcALIAvAWIAfANIAeAOQAjAUALAcIAAACIAWAMQAfAUAmAsQAgAjgCAaIgCAHIABABIAGAGQAPANAMAGQAQAIAkAJQAaAKATAPQAWASAFAUQAFASgLASIgDAJQgLAYgiAGQgMACgQgDQgQAZgnALQgcAIgyAEQg5AFgWAEQgnALgUADQgRADgXABIgnAAIhCAEQgjACgXAAIgJAAg");
	this.shape_18.setTransform(60.4811,22.5318);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFC3C3").s().p("AgaEhQg5gBhwgPIhGgJQgzABgmgDIgVADQgVACgfABIg0AAQgbABgLgCQgVgCgMgLIgCgBIgEgDIgKgCQgOgDgKgKQgGgFgDgGQgIgFgFgHQgNgRAFgWQABgGADgGIgBgIQABgNAGgLQAJgPAcgQQAhgSAhgRIAtgUQAagMASgKIBCgmQAagOBCgbQgCgHABgKQAAgMACgJQACgHAGgKIAKgPIAOgaQAIgQAGgJQALgPAYgTIBPg+QASgMAJgBQAPgDAKAMQALAMgIAOQgDAGgOAKQgqAbglAeQglAegIAaQAWgMAggMIA3gUQAigMAPgLIAYgTQASgOAZgCQANgCAKAEQANAFADAMQAEAOgNAOIAagFQAUgEAGABQAHABAFAEQAGAFAAAGQAWgEAcALIAvAWIAfANIAeAOQAjAUALAcIAAACIAWAMQAfAUAmArQAgAkgCAaIgCAHIABABIAGAGQAPANAMAGQAQAIAkAJQAaAKATAPQAWASAFAUQAFATgLASIgDAIQgLAYgiAGQgQADgYgFQgOAGgTABQgPABgPgCIgMAAIgCAAIgFAAIhAAAIgRAGQgXAJgRAEQgZAGguAAIhpgEIhXACQgwADgcAAIgLgBg");
	this.shape_19.setTransform(60.4811,20.0068);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFC3C3").s().p("AA2EaQh+gMhAgCIh2ABQg6AAgqgDIgVADQgVADgfAAIg0ABQgbAAgLgBQgVgDgMgLIgCgBIgEgDIgKgBQgOgEgKgJQgGgGgDgGQgIgFgFgHQgNgQAFgWQABgHADgGIgBgHQABgNAGgLQAJgPAcgRQAhgSAhgQIAtgVQAagMASgJIBCgmQAagOBCgcQgCgHABgKQAAgLACgKQACgHAGgJIAKgQIAOgZQAIgRAGgIQALgQAYgSIBPg+QASgNAJgBQAPgCAKALQALAMgIAOQgDAHgOAJQgqAbglAfQglAdgIAbQAWgNAggLIA3gUQAigMAPgLIAYgUQASgNAZgDQANgBAKAEQANAFADAMQAEAOgNANIAagEQAUgFAGABQAHABAFAFQAGAEAAAHQAWgEAcAKIAvAWIAfANIAeAPQAjATALAcIAAACIAWAMQAfAVAmArQAgAkgCAaIgCAGIABABIAGAHQAPAMAMAGQAQAIAkAJQAaAKATAPQAWASAFAUQAFATgLASIgDAIQgLAZgiAFQgQADgYgFQgOAGgTACQgPAAgPgCIgMAAIgCAAIgFAAIhQAAIguAAQgPABg8AJQguAHg7AAQgoAAgtgDg");
	this.shape_20.setTransform(60.4811,19.5877);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFC3C3").s().p("AoFEWQgVgDgMgLIgCgBIgEgDIgKgBQgOgEgKgJQgGgFgDgHQgIgEgFgIQgNgQAFgWQABgHADgGIgBgHQABgNAGgLQAJgPAcgRQAhgSAhgQIAtgVQAagMASgJIBCgmQAagOBCgcQgCgHABgKQAAgLACgKQACgHAGgJIAKgQIAOgZQAIgRAGgIQALgQAYgSIBPg+QASgNAJgBQAPgCAKALQALAMgIAOQgDAHgOAJQgqAbglAfQglAdgIAbQAWgNAggLIA3gUQAigMAPgLIAYgUQASgNAZgDQANgBAKAEQANAFADAMQAEAOgNANIAagEQAUgFAGABQAHABAFAFQAGAEAAAHQAWgEAcAKIAvAWIAfANIAeAPQAjATALAcIAAADIAWALQAfAVAmArQAgAkgCAaIgCAHIABAAIAGAHQAPANAMAFQAQAIAkAJQAaAKATAPQAWASAFAUQAFATgLASIgDAIQgLAZgiAFQgQADgYgFQgOAHgTABQgPABgPgDIgMAAIgCAAIgFAAIjKAAQhBAAghgBIhFgFIhBADQgyABhTgDIgegBIhbACQg4ABgjgBIgpAFQgVADgfAAIg0ABIgNAAQgRAAgIgBg");
	this.shape_21.setTransform(60.4811,18.9589);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFC3C3").s().p("AG3ENIgYgLIgggDQhOgIg0gDQgzgChUAAQhnABgggBIg7gCQghAAgZADIg8AJQgmAGgzABIhKAAQgaACggAAIgHAAIgQACQgwALgZAAQgUAAgQgHIgJgFIgKgCQgOgDgKgKQgGgFgDgGQgIgFgFgHQgNgRAFgWQABgHADgFIgBgIQABgNAGgLQAJgPAcgQQAhgSAhgRIAtgUQAagMASgKIBCgmQAagOBCgbQgCgHABgKQAAgMACgJQACgHAGgKIAKgPIAOgaQAIgQAGgJQALgPAYgTIBPg+QASgMAJgBQAPgDAKAMQALAMgIAOQgDAGgOAKQgqAbglAeQglAegIAaQAWgMAggMIA3gUQAigMAPgLIAYgTQASgOAZgCQANgCAKAEQANAFADAMQAEAOgNAOIAagFQAUgEAGABQAHABAFAEQAGAFAAAGQAWgEAcALIAvAWIAfANIAeAOQAjAUALAcIAAACIAWAMQAfAUAmArQAgAkgCAaIgCAHIABABIAGAGQAPANAMAGQAQAIAkAJQAaAKATAPQAWASAFAUQAFATgLASIgDAIQgLAYgiAGQgQADgYgFQgOAGgTABIgIABQgYAAgXgJg");
	this.shape_22.setTransform(60.4811,18.8125);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFC3C3").s().p("AG3ENIgagMIgagMQgVgIgggDIg3gDIgqgFIgqgFQgkgEgrAAQhhgBiwASQg8AGgfAEQgzAJgaADQglAEg1ABIhHABIgIADQgMADgKgBQgLAAgJgFIAAAAIgGgBQgMACgMgDQgOgDgKgKQgGgFgDgGQgIgFgFgHQgNgRAFgWQABgHADgFIgBgIQABgNAGgLQAJgPAcgQQAhgSAhgRIAtgUQAagMASgKIBCgmQAagOBCgbQgCgHABgKQAAgMACgJQACgHAGgKIAKgPIAOgaQAIgQAGgJQALgPAYgTIBPg+QASgMAJgBQAPgDAKAMQALAMgIAOQgDAGgOAKQgqAbglAeQglAegIAaQAWgMAggMIA3gUQAigMAPgLIAYgTQASgOAZgCQANgCAKAEQANAFADAMQAEAOgNAOIAagFQAUgEAGABQAHABAFAEQAGAFAAAGQAWgEAcALIAvAWIAfANIAeAOQAjAUALAcIAAACIAWAMQAfAUAmArQAgAkgCAaIgCAHIABABIAGAGQAPANAMAGQAQAIAkAJQAaAKATAPQAWASAFAUQAFATgLASIgDAIQgLAYgiAGQgQADgYgFQgOAGgTABIgIABQgYAAgXgJg");
	this.shape_23.setTransform(60.4811,18.8125);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFC3C3").s().p("AIAEMQgagHgwgUQgygVgYgHQgPgFgygLIgCAAQhagGgVgDIgUgDIhwABQhHABgYACQglADhIAMIkXAvQgeAFgOAEIgVAHQgMADgKAAQgMgBgKgGIgBAAQgNADgOgDQgOgEgKgJQgGgFgDgHQgIgFgFgHQgNgQAFgWQABgHADgGIgBgHQABgNAGgLQAJgPAcgRQAhgSAhgQIAtgVQAagMASgJIBCgmQAagOBCgcQgCgHABgKQAAgLACgKQACgHAGgJIAKgQIAOgZQAIgRAGgIQALgQAYgSIBPg+QASgNAJgBQAPgCAKALQALAMgIAOQgDAHgOAJQgqAbglAfQglAdgIAbQAWgNAggLIA3gUQAigMAPgLIAYgUQASgNAZgDQANgBAKAEQANAFADAMQAEAOgNANIAagEQAUgFAGABQAHABAFAFQAGAEAAAHQAWgEAcAKIAvAWIAfANIAeAPQAjATALAcIAAADIAWALQAfAVAmArQAgAkgCAaIgCAHIABAAIAGAHQAPAMAMAGQAQAIAkAJQAaAKATAPQAWASAFAUQAFATgLASIgDAIQgLAZgiAFIgMABQgSAAgZgHg");
	this.shape_24.setTransform(60.4811,18.5748);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFC3C3").s().p("AIiENQgPgEgNgIQgMADgMgDQgPgDgWgRIAAAAIgggHQgrgIgXgNIgVgMQgIgEgXgGQjMgribAYIhlAUQhZAShaAKQg0AHgUAGIggAMQgTAHgNACQgcADgNAEQgUAIgKADQgNADgOgDQgOgEgKgJQgGgGgDgGQgIgFgFgHQgNgQAFgWQABgHADgGIgBgHQABgNAGgLQAJgPAcgRQAhgSAhgQIAtgVQAagMASgJIBCgnQAagNBCgcQgCgHABgKQAAgLACgKQACgHAGgJIAKgQIAOgZQAIgRAGgIQALgQAYgSIBPg+QASgNAJgBQAPgCAKALQALAMgIAOQgDAHgOAJQgqAbglAfQglAdgIAbQAWgNAggLIA3gUQAigMAPgLIAYgUQASgNAZgDQANgBAKAEQANAFADAMQAEAOgNANIAagEQAUgFAGABQAHABAFAFQAGAEAAAHQAWgEAcAKIAvAWIAfANIAeAPQAjATALAcIAAACIAWAMQAfAVAmArQAgAkgCAaIgCAGIABABIAGAHQAPAMAMAGQAQAIAkAJQAaAKATAPQAWASAFAUQAFATgLATQgLASgTAHQgLADgMAAQgIAAgIgBg");
	this.shape_25.setTransform(60.4808,18.0947);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFC3C3").s().p("AIiENQgPgEgNgIQgMADgMgDQgPgDgWgRQgwgjgdgOQghgRgtgLQgdgHg2gKQg4gJgXgCQgqgDhCAHQhLAIhCAMQg5AKhPARIhFAQIhoAdQg+ARgrAGQgSACgOgBQgMABgLgCQgXgEgLgQQgNgQAFgWQABgHADgGIgBgHQABgNAGgLQAJgPAcgRQAhgSAhgQIAtgVQAagMASgJIBCgnQAagNBCgcQgCgHABgKQAAgLACgKQACgHAGgJIAKgQIAOgZQAIgRAGgIQALgQAYgSIBPg+QASgNAJgBQAPgCAKALQALAMgIAOQgDAHgOAJQgqAbglAfQglAdgIAbQAWgNAggLIA3gUQAigMAPgLIAYgUQASgNAZgDQANgBAKAEQANAFADAMQAEAOgNANIAagEQAUgFAGABQAHABAFAFQAGAEAAAHQAWgEAcAKIAvAWIAfANIAeAPQAjATALAcIAAACIAWAMQAfAVAmArQAgAkgCAaIgCAGIABABIAGAHQAPAMAMAGQAQAIAkAJQAaAKATAPQAWASAFAUQAFATgLATQgLASgTAHQgLADgMAAQgIAAgIgBg");
	this.shape_26.setTransform(60.4808,18.0947);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFC3C3").s().p("AIiENQgUgFgPgNIgMgLIgMgJQgHgFgMgEIgTgIQgPgHgTgQIgBgBQgGgDgIgIIgNgMIgbgWQgVgNgqgOQglgNgZgEQgRgCgeAAIgvABQgLgBgzgHQgmgFgYADQgUADgdALIgwATQggALhEARIiFAgQg4ANgaAFIghAGQgTAEgNAFQgMAEgaANQgYALgOAEQgWAGgUgDQgXgEgLgQQgNgQAFgWQABgHADgGIgBgHQABgNAGgLQAJgPAcgRQAhgSAhgQIAtgVQAagMASgJIBCgnQAagNBCgcQgCgHABgKQAAgLACgKQACgHAGgJIAKgQIAOgZQAIgRAGgIQALgQAYgSIBPg+QASgNAJgBQAPgCAKALQALAMgIAOQgDAHgOAJQgqAbglAfQglAdgIAbQAWgNAggLIA3gUQAigMAPgLIAYgUQASgNAZgDQANgBAKAEQANAFADAMQAEAOgNANIAagEQAUgFAGABQAHABAFAFQAGAEAAAHQAWgEAcAKIAvAWIAfANIAeAPQAjATALAcIAAACIAWAMQAfAVAmArQAgAkgCAaIgCAGIABABIAGAHQAPAMAMAGQAQAIAkAJQAaAKATAPQAWASAFAUQAFATgLATQgLASgTAHQgLADgMAAQgIAAgIgBg");
	this.shape_27.setTransform(60.4808,18.0947);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFC3C3").s().p("AoLD2QgSgJgGgVIgCgJQgCgIAAgJQAAgNAGgLQAJgPAdgQQAggSAigRIAsgUQAbgMARgKIBDgnQAZgOBCgaQgBgHAAgKQAAgMACgJQACgHAGgKIALgPIANgaQAIgQAGgJQALgPAYgTIBQg+QASgMAJgBQAOgDAKAMQAKAMgHAOQgDAGgOAKQgqAbglAeQglAegHAaQAWgMAfgMIA4gUQAhgMAPgLIAYgTQATgOAYgCQANgCALAEQANAFADAMQADAOgNAOIAagFQAVgEAGABQAHABAFAEQAFAFABAGQAWgEAbALIAvAWIAfANIAfAOQAjAUAKAcIABACIAVAMQAfATAnAsQAfAkgCAaIgBAHIABABQAYAZgCAaQAAANgHALQgHALgLAFQgLAGgNAAQgNAAgLgGQgGgEgIgHIgMgNIgkgdQgigigTgOQgkgag8gGQgUgCgfgBIg0gCQg4gEgSABQgVABgrAKQhEAQglALQgoAMgbAMQgoAXgVAKQgWALgvARQg2AUgYAHQgrANgkAGIgPACIgTAIQgRAHgOAAQgOAAgMgHg");
	this.shape_28.setTransform(53.9294,16.3152);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFC3C3").s().p("AoAD2QgSgJgGgVIgCgJQgCgIAAgJQAAgNAGgLQAJgPAdgQQAggSAigRIAsgUQAbgMARgKIBDgnQAZgOBCgaQgBgHAAgKQAAgMACgJQACgHAGgKIALgPIANgaQAIgQAGgJQALgPAYgTIBQg+QASgMAIgBQAPgDAKAMQAKAMgHAOQgDAGgOAKQgqAbglAeQglAegHAaQAWgMAfgMIA3gUQAigMAPgLIAYgTQATgOAYgCQANgCALAEQANAFADAMQADAOgNAOIAagFQAVgEAGABQAHABAFAEQAFAFABAGQAWgEAbALIAvAWIAfANIAfAOQAjAUAKAcIABACIAVAMQAfATAnAsQAfAkgCAaQgCAZgWAMQgWAMgWgKQgQgGgQgUQgQgXgKgKQgXgYgzgTQgsgSgggFQgagEg0AAQguAAgXADQgdADgtANQhTAXgrAUQgnAUgTAJIgvATQgfALgQAHQgnAWgUAJQgRAHgmANQglANgSAJIgaAOQgQAIgKAEQgRAHgOAAQgOAAgMgHg");
	this.shape_29.setTransform(52.831,16.3152);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFC3C3").s().p("Am3D2QgMgBgLgHQgLgHgFgLQgGgLAAgNQABgNAGgLQAJgPAcgQQAhgSAhgRIAtgUQAagMASgKIBCgnQAagOBCgaQgCgHABgKQAAgMACgJQACgHAGgKIAKgPIAOgaQAIgQAGgJQALgPAYgTIBOg+QASgMAJgBQAPgDAKAMQALAMgIAOQgDAGgOAKQgqAbgkAeQglAegIAaQAWgMAfgMIA3gUQAigMAPgLIAYgTQATgOAZgCQANgCAKAEQANAFADAMQAEAOgNAOIAagFQAUgEAGABQAHABAFAEQAGAFAAAGQAWgEAcALIAvAWIAfANIAeAOQAjAUALAcIACAIIAEAJQAFAWgOASQgOASgXABQgMABgQgGIgbgLQgdgNgngHQgXgFgwgHQgegEgWAAQgRAAghAEQgfAFgfAHQg9APhvAwQg4AXgdAQQgjAXgSAKQgUALgxAVQgtAUgXAOIgiAVQgRAJgQAAIgEgBg");
	this.shape_30.setTransform(47.1526,15.7125);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFC3C3").s().p("Ak4CYQgLgCgHgLQgGgLAFgKQAFgLASgJQARgIATgIQgDgIAAgNQAAgLACgKQACgHAGgJIALgQIANgYQAIgRAGgIQALgQAYgSIBQg+QASgNAJgBQAPgCAKALQAKAMgHAOQgDAHgOAJQgrAbglAfQglAdgHAaQAWgNAfgKIA4gUQAigMAPgLIAYgUQASgNAYgDQANgBALAEQANAFADAMQADAOgNANIAagEQAVgFAGABQAHABAFAFQAFAEABAHQAWgEAbAKIAvAWIAfAMIAfAPQAjATAKAcQAFAMgCAMQgCANgMAEQgNAFgPgMQgNgPgIgGQgPgLgZgDIgsgBQgVgCg5gPQgxgNgeADQgOABgTAFIgiAJIguAIQgcAFgRAHQgMAFgSALIgeARQgMAFghAKQgdAJgPAIIgRAJQgIADgGAAIgDAAg");
	this.shape_31.setTransform(61.8071,6.2627);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFC3C3").s().p("AijB2QgIgIABgUQAAgMACgJQACgHAGgKIAKgPIAOgaQAIgPAGgJQALgPAYgTIBPg+QARgMAJgBQAPgDAKAMQALAMgIAOQgDAGgOAKQgpAbglAeQglAdgIAaQAWgMAggMIA2gTQAigMAPgLIAYgTQATgOAZgCQANgCAKAEQANAFADAMQAEAQgRAQQgNAKgYAKIgnARIgUALQgLAGgJADQgcAGgNAFIgjAPQgTAIgJAFIgPAKIgQALQgUAMgVADIgKABQgMAAgGgGg");
	this.shape_32.setTransform(51.3567,3.4436);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_17}]}).to({state:[{t:this.shape_17}]},9).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_28}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_31}]},1).to({state:[{t:this.shape_32}]},1).wait(2));

	// flare
	this.instance = new lib.eyeflare();
	this.instance.setTransform(61.7,34.35,1,1,0,0,180,22.6,15.7);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(26));

	// pupil
	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("AgCBlQgVgBgUgJQgUgKgOgQQgOgRgGgVQgGgWAEgVQADgVANgTQANgTASgLQATgMAXgCQAVgDAVAHQAcAKATAYQATAYADAdQACAVgHAUQgHAVgPAQQgPAQgUAIQgTAIgUAAIgCAAg");
	this.shape_33.setTransform(61.4316,30.8064);

	this.timeline.addTween(cjs.Tween.get(this.shape_33).wait(26));

	// kashtit
	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#4083FF").s().p("AAhDYQgCgCgBgHIgGgqQgJgEgKAQQgKARgOANQgJAIgFgEQgDgDAAgGQgBgUADgRQgLATgRAMQgFADgDgBQgHgCAEgNIARgmQgfAXglAOQAKgaARgTQgMAAgQAGIgbAMQgFACgDgBQgEgDABgGQABgJANgOQAOgOABgJIg+AQQgKAEgCgHQgBgEAGgEQAbgRAhgKQgegIgLgJQgIgGACgFQACgFAHgBQASgDARAAIgogiQgIgGACgFQADgEAIAAQAagDAWgIQgcgKghgRQgLgIAFgFQADgDAFABQAYADAWgHQgBgEgFgEIgIgHQgFgEgCgFQgCgFAEgEQACgCAIgBQAhgBAcAJIgWgwQAUgDAQAOIAAgjQAAgFADgDQACgCAEABQAEABADAEQADAFAFATQAEAPAIAFQAOgsAVgqQAFgIAEACQACABAAAIQgBAdgLAaIAhgnQAFgFACACQADACgDAGIgfA8QAMgCALgPIAJgNIAJgMQADgDADAAQAGACgEAIIgDAFQgCADABADQAPgUAWgNQAAAGgIAIIgbAbQgFAGgFAAQgCAAgCgDQgBAAAAgBQAAAAAAgBQgBAAABgBQAAAAAAgBQgNASgLAFQgFAEgEgCQgEgBgBgGQAAgFACgFIAFgJQACgFgBgEQgEAHgIAIQgFAEgCgBQgDgBABgIIAKgeQAHgSgCgNIgiBRQgDAGgEAAQgFABgDgIIgSgsIgDAwQgRgLgRgEQAQAZAHAaQglgLgnAEIASAUQAEAGAAADQgBAFgJACQgVAFgUgCQAKAKATAHIAgAMQAGADAAACQABAGgJACQgdAIgYADQAUAXAZAPQAIAGgDADQgBACgEAAIgsACQABALATAEIAxANQgtAHgmAZIBCgNQADAKgQASQgQAQADALQAegPAjgHQgIAYgPAUIA5ghQAIgFACAEQACADgDAGQgNAUgFAVQAQgGAJgRIAFgIQAEgFAEAEQACACAAAFIgCAmQATgMALgSQANgVALADQAKACABASIABAMQAAAHADAEIAQg1QADgIAEAAQAGgCAEAMIAMAnQAEABACgEQADgEAAgFQAAgUgGgVQgBgHACgCQACgDAFACQAFACAEAEQAWAcAUgFIgagwQgCgGABgCQACgDAIACQAZAIAagFQgIghgfgSQgFgCgCgEQgDgFADgDQABgBAHAAQAVAEAWgBQAIAAADgFQgJgMgWgGIglgLQgGgCABgCQAAgFAJABQAgAGAngEQgHgTgdgCIgXAAQgNAAgJgCQgIgBABgFQABgDAEgCIAxgeIg6AHQgDgFAIgIIAdghQgJAAgTALQgRALgKgDQALgVAMgUQgTAMgYAIQgKADgDgEQgDgEADgGQAMggAXgYQgTAdgNAhQANABAWgNQAXgOALAAIgjAwQAKABAUgMQATgMAKADQgRAZgVAVQAVgGAegCQAGAAACACQACADgCAEQgCADgFACIgsAaQAOACAcAAQAZACANAMQAIAIgCAIQgDAIgPgBIgLgBQgHAAgEABQAGAFARAGQAGADADAFQAEAGgDAGQgCAFgHACQgHADgOgBQgPgBgHABQAXASAMAZQAFAIgEAGQgDAFgJABQgZACgVgFQAOATAJAXQADAIgDAEQgEAGgLgDQgZgGgPgWQAGAfgCARQgCAKgFADQgEADgFgCQgGgCgDgEQgDgFgCgQQgBgNgGgHIgPA3QgCAHgDADQgDADgDAAIgEgBg");
	this.shape_34.setTransform(61.7931,29.3528);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#0033FF").s().p("AgGD5Qg0gBgxgYQgxgXgigoQgigqgPg1QgPg1AJg0QAIg1AgguQAfguAugcQAugcA3gGQA2gHAzARQBFAXAwA8QAvA7AGBIQAFA0gSAzQgRAzgkAnQgkAmgyAVQgvATgxAAIgGAAgAAbCZIAFAqQABAHADACQAFADAFgFQACgDACgHIAPg3QAGAHABANQACAQAEAFQADAEAFACQAGACAEgDQAEgDACgKQACgRgFgfQAPAWAZAGQAKADAEgGQADgEgDgIQgIgXgOgTQAVAFAZgCQAJgBADgFQADgGgFgIQgMgZgWgSQAGgBAPABQAOABAHgDQAHgCADgFQACgGgDgGQgEgFgGgDQgQgFgHgFQAFgBAGAAIALABQAPABAEgJQACgIgIgIQgNgMgagCQgcAAgOgCIAtgaQAEgCACgDQADgEgDgDQgBgCgHAAQgdACgWAGQAWgVARgZQgLgDgTAMQgUAMgKgBIAkgwQgMAAgXAOQgWANgNgBQAOghATgdQgXAYgMAgQgDAGACAEQADAEALgDQAYgIATgMQgNAUgLAVQAKADASgLQASgLAKAAIgeAhQgIAIADAFIA7gHIgyAeQgEACAAADQgBAFAIABQAIACAOAAIAWAAQAeACAHATQgnAEghgGQgIgBgBAFQAAADAFACIAlAKQAXAGAIAMQgCAFgJAAQgVABgVgEQgHAAgCABQgDADADAFQADAEAFACQAeASAJAhQgaAFgZgIQgIgCgCADQgCACADAGIAZAwQgUAFgWgcQgEgEgEgCQgFgCgDADQgBACABAHQAFAVAAAUQAAAFgCAEQgDAEgEgBIgMgnQgDgMgHACQgEAAgCAIIgQA1QgDgEgBgHIAAgMQgBgSgLgCQgLgDgNAVQgLASgSAMIACgmQAAgFgCgCQgEgEgFAFIgFAIQgJARgQAGQAFgVANgUQAEgGgCgDQgDgEgIAFIg5AhQAPgUAJgYQgjAHgeAPQgDgLAPgQQAQgSgDgKIhCANQAmgZAugHIgygNQgTgEAAgLIAsgCQADAAACgCQADgDgIgGQgZgPgUgXQAYgDAcgIQAJgCAAgGQgBgCgFgDIgggMQgTgHgLgKQAVACAUgFQAJgCABgFQABgDgFgGIgSgUQAngEAlALQgGgagQgZQARAEAQALIAEgwIASAsQADAIAFgBQADAAADgGIAihRQACANgGASIgLAeQgBAIAEABQACABAEgEQAIgIAFgHQAAAEgDAFIgEAJQgCAFABAFQABAGADABQAFACAFgEQALgGANgRQgBAAAAABQAAAAAAABQAAAAABABQAAABAAAAQACADADAAQAFAAAEgGIAbgbQAJgIgBgGQgWANgPAUQAAgDACgDIACgFQAFgIgGgCQgDAAgEADIgJAMIgIANQgMAPgMACIAfg8QAEgGgEgCQgCgCgFAFIghAnQALgaACgdQAAgIgDgBQgEgCgFAIQgVAqgNAsQgIgFgEgPQgFgTgEgFQgCgEgEgBQgEgBgDACQgCADAAAFIgBAjQgPgOgVADIAXAwQgdgJggABQgJABgCACQgDAEACAFQACAFAEAEIAIAHQAFAEABAEQgWAHgXgDQgGgBgCADQgGAFAMAIQAgARAdAKQgXAIgZADQgJAAgCAEQgDAGAJAGIAnAhQgRAAgRADQgIABgCAFQgBAFAHAGQAMAJAeAIQghAKgbARQgGAEAAAEQACAHAKgEIA+gQQgBAJgNAOQgNAOgCAJQgBAGAFADQACABAFgCIAcgMQAQgGAMAAQgSATgJAaQAlgOAegXIgQAmQgFANAHACQADABAGgDQARgMAKgTQgDARABAUQAAAGADADQAFAEAJgIQAOgNAKgRQAJgNAHAAIAEABg");
	this.shape_35.setTransform(61.5223,30.5901);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_35},{t:this.shape_34}]}).wait(26));

	// white
	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AjDDQQgzgNgXgOIgZgRQgPgLgKgFQgXgKghACIg6AHQghAEgagIQgfgJgMgYQgHgOABgQQACgQAJgNQAUgZAtgDIAkgBQAXAAANgDQgEgVANgWQAMgVAWgNQAQgJAbgKIAtgPQAmgPBDgxQBDgwAngPQAfgNBBgLQAxgIAeAAQAsAAAhAOQAYAKAZAWQAPAOAbAdQBeBmAmAzQAOASAHAIQANAOANAIQAGAEARAIQAPAIAIAGQARAOAGAZQAFAYgJAXQgQAqgxAWQgeAOg9AJQhpAOhpAAQi4AAi1gsg");
	this.shape_36.setTransform(58.5544,31.5407);

	this.timeline.addTween(cjs.Tween.get(this.shape_36).wait(26));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.7,-8.9,132.6,73.5);


(lib.girlface = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// eyes
	this.instance = new lib.lefteye("synched",0,false);
	this.instance.setTransform(101.05,243.9,1.0783,1.0783,0,0,180,64.5,27.9);

	this.instance_1 = new lib.righteye("synched",0,false);
	this.instance_1.setTransform(297.55,239.45,1.0783,1.0783,0,0,0,57.7,23.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(30));

	// eyebrows
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#C3A16A").s().p("A3PgoQCChKCcgYQCLgWCiAQQCGAOCjAqQBcAZA5AWQAiAMACAUQADATgZAPQgXAOgiACQgXABgngEIldgoQjJgPiSAhQhDAPifA8QiOA2hVANQBSh5CLhNgAXKBUQigg8hDgPQiRghjJAPIldAoQgnAEgXgBQgigCgXgOQgYgPABgTQAEgUAggMQA6gWBcgZQCjgqCGgOQCigQCLAWQCcAYCCBKQCLBNBSB5QhVgNiOg2g");
	this.shape.setTransform(205.6,175.8087);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(30));

	// gair_front
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#C3A16A").s().p("AdwTdIg5k6Qgii8gfh9QgWhZgahZIgSgOQgcgYghguQg2hMhBhtIhJh/QAiBQAZBFQBbD6AMDaQABAhgQAGQgTAHgUgdQhpiXhti8QAKAwAHAwQAFAlgGAaQgIAjgaAJQgeALgrgfQhUg7hBh0Qgfg4hEihQhjjoiKj0QgagMgagPQhSgthehOQAwBRA3BXQBdCWBKBtQAXAhAEAUQADAPgEAOQgEAQgMAIQgaASgzgcQjmh+i0kAQhLhrhFiHQg4hug+iUQhXjSgkiYIgHgeQgdg9gWg+QgaBPgvBZQg6BuhNBtIgVA+QiKGSkCFmQj7FclVERQgXATgYAGQgeAGgMgTQgLgRALgjQAnh3BiiFQgEgIAAgOQgBhqAQhwQg2Aig4AeIgYAhQjXExi6GNQiUE5ieG2IgdAFQgbhIABhxQACkkCClFQA2iHBRiYIAmhFIh4BXQADgiARgnQALgbAYgpQBChtBchvQhYBBg2AhQhSAyhLAWQgTAGgPgBQgTgCgIgMQgLgRAOgiQA8iIB4iGQBXhhCXiCQF9k7C4ilQBnhdBYhaIgSASQh8B5kHDeQiNB3hIA6Qh3BhhjBIQgfAXgVAMQgdARgbAGQggAGgegIQgggKgRgYQgUgdAHgpQAGgjAWglQAcguAugwQAfgfA6gzIGHlGQDrjECRiOQBphmA/hRQBShqAphqIAQgqQAJgXAMgQQAOgTATgLQAVgLAVACQAiAEAbAmQAaAkAIAyQAGAtgKAwQgJAqgXAuQgRAkgdAuQgVAhgXAgIAjgxQAxhIAZg2QAhhJAEhCIABgxQABgdAEgTQAFgZAPgTQAQgWAWgGQAggJAhAYIAJAIIAAgLQACgXALgSQAMgUATgGQAjgNArAiQA8AvAcBYQAMgKAPgFQAJgDAJAAQAbgkAzgFQApgEAdATQATgGATADQAXAEATASQARARAKAYQAIAUAEAbIAFAxQADAlAFAlQArACA2AiQAnAZArAlIAEgLQAJgVAUgMQAegRAqAEQBogYCEBQQBXA0BYBWQA+A9BZBoQDuEaDNE1QBNA3BGBPQBZBmBQCWQBuDLBSECQBBDPA6EYQAxDtATCwQAZDhgQDAQgFBBgMAsQgQA6ggAmQhojohJl4gAwhjSIgxB5QgfBKgeBAIBqh+QCTiuB4i7QiBB+iGBmg");
	this.shape_1.setTransform(203.6892,131.3052);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(30));

	// mouth
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E488B7").s().p("AhWCoQhwgNgkgJQgkgJgzgYQg0gZgmgYIgygiQgUgPglgRQgegPgTgIQgTgIgKgHQgLgGgrgWIg1gdQgKgGAzAHQAzAHAsgCQArgCBGgHQA3gFBIgRQAmgJASgHIAZgKIAagJQAzgPA7AVQArASArAmIAMgVQAJgTAIgIQALgKAZgHQBDgSA2AGQAiAEA5AVQBAAWAbAGQAfAGA4ACQBUADBUgBQAhgBAZgDQAYgEATgFQAUgGgyApQgxApgSAIIgMAFQgMAFg/AhQg/Ajg0AYQg0AYg4ATIhsAmQgzAShAAIQgcADghAAQgqAAg1gGg");
	this.shape_2.setTransform(202.8759,420.208);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(30));

	// face
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFC3C3").s().p("EgH2An2QlCiTk3kRQj7jckXlQQh+iYhDhqQheiWgjiMQgbhrgDiWQACitgBhXQAAhygLimIgSkXQgUlSAjjaQAxk7C4lVQCEj0EAlbQDFkLCSirQBThiA8g2QBVhNBWglQAygWBCgQQAsgKBMgMQDkgkCpgLQDWgPC3ASQDRAVC0BDQDFBICVB6QBrBYBpCHQBGBaBrClQEcGxCJEpQDDGkAdF5QAIBlgDCBQgBBJgICcQgQFXgPDUQgODOgWB5QggCzhDCDQhMCYiZCVQheBbjHCcIqiIOQijCAheA5QiWBciJAdQhIAPhNAAQjeAAkMh6g");
	this.shape_3.setTransform(205.3027,267.1701);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(30));

	// neck
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#E0ACAC").s().p("EADvAmUQjTgHhogHQiugLiLgWQh0gRiJggQhmgXiVgoQnHh5q4jVQhoghgygTQhVggg9goQhJgugxg/QgNgSgLgSQgQALgLAMQgSAUgMAjQgHATgMApQgbBLg5A5Qg5A6hKAZQhMAZhQgOQhRgPg8gyQg8gxgihQQgfhJgFhWQgIiDAxh+QAyh+BfhaQBihdCihCQBFgcDjhHQKMjMJClsQBwhHBCg2QBchLA3hRQA/hdAmiGQAUhHAWh/IgFg0Qgck7gnk7QgbjagEhhQgGiwAkiHQA1jCCai3QDEjqEdiBQEfiDEuANQDWAJCEBVQB7BPBXCnQAtBXBRDhQAXBCBgD5IAQApQANgFAOgCQBTgOBIBKQA9BAAeBjQAxCkABEeIABDmQADCDAPBhQA2FuECEyQD7EoFnCMQBUAhCrA+QCRA8BPBSQBUBYAvCPQAgBgAbCsQAcC2gFBuQgHCihKBrQhCBeh+A/QhcAtiXAnQoUCHquAYQiLAFi4AAQlvAAoigUg");
	this.shape_4.setTransform(156.3567,522.1704);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(30));

	// hair_back
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#C3A16A").s().p("EAXnA4mQgFgyANhGQAHgpAOgzQg5AJhAAHQjDAShiAKQjpAZmuBQQnGBUjPAZQlzAtksgXQlngbkjh9QiYhBhmhUQARBLgQAyQgKAigbAVQgbAXgegFQgWgDgUgSQgRgQgMgZQgJgTgIgcIgNgyQgKglgSgxIghhUIgNglIgKgCIgaABQAHA0AGA0QAFA0AAAaQAABbgxB8QgJAXgMADQgLAEgLgKQgIgIgHgPQgZg4gMhRQgFgggKhxQgDglgOh5IgFgoQgNgLgMgCIgGAAIAFAzQAHBPgCAyQgHB5g0BlQgNAbgRADQgVAEgTgkQggg7gOhYQgHgqgKhzQgQjCgrkcIAAAAQAIBUADAwQAHBhgDBNQgFDFg9COQgGAPgKAJQgLAKgLgFQgHgEgHgSQglhvgNh0QgFgrgGiAQgJiugRiqQAAAygEAqQgLB2gnBaQgGAPgIABQgLABgHgSQhEiXgejdQgFgjghlkQgSjEggjCQgPBCgUA8QgWgEgPgqQg7irgIjXQgDhDABhpQACkQAFjBQg+jKAAjyQAAg2ADg3QAOj+BRlFQAeh4AbhWQAjhuAphYIAJgQQgehJgHhTQgHhZAYh0QANhCAZhPQARg2AehYQBfkKBTioQAeg+Agg5QgDgUAEgYQAEgWALgiQBDjRBnjAQBojBCFimQCPi1C5ibQBAg2BBgvQAQg0Awg7QBNhdBwhOQBbhAB/g/QCKhEBwgdQBhgaBYABQAngBAkAFQCGASB5BQQCBgCBFAFQB8AHBgAeQBJAXAtAjQAoAcAiAuQAdgkAfgdQBxhkC7gcQClgYBxA1QBDAgAwA7IARAXQCLgOB5AeQB0AcB8BKQBfA4B7BkQByBbA/BLQAqAxAdAyIAZARQBJA3BUBoQEWFcCXGhQA0CQAiCRQBeBtBcCrQCSEOBaEtQBcEtAfE4QARC1gICTQAFATAEAcIAnEIQASB2AGBAQALBmAABSQgCCmguCrIgSA7QApD+gVEeQgYFZh8GkQg4C9g3B5QhLCjhkBoQgMAMgMAGQgPAGgKgIQgRgNAKgnQAWhWBDjqQgKACgKAAIiYG3QgqB4gaBEQgfBQgcAzQgmBEguAqQgZAZgTgKQgRgJgBglQgEidA3jAIARg4QgMgDgMgGQgbgNgRgcIgFgLIhQC8QggBNgTAmQgeA+geAuQgiAxgtAuQgaAagVAIQggAMgWgTQgVgTAAgzQABgsALgtQAJgnAehKQAZg8BUjFQgYAEgTgJQgUBzgmBuQgTA1gbAfQgjAngmgHQgUgDgPgPIghAOIgUA2QgqBugwBUQguBQgsAmQgkgpgHhDg");
	this.shape_5.setTransform(198.0225,256.3227);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(30));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-164.6,-116.7,679.7,886.1);


(lib.sunsglow = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.suns();
	this.instance.setTransform(334.35,317.95,1,1,0,0,0,142.3,180);
	this.instance.shadow = new cjs.Shadow("rgba(24,116,255,1)",0,0,123);

	this.instance_1 = new lib.glow();
	this.instance_1.setTransform(326.1,326.1,1,1,0,0,0,326.1,326.1);
	this.instance_1.filters = [new cjs.BlurFilter(255, 255, 1)];
	this.instance_1.cache(-2,-2,656,656);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-128,-128,912,912);


(lib.johnnyfromback = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// front_hand
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E4A985").s().p("AAlEgQhfgagZg+IgCgJQgIgMgCgQQgCgMABgXIAAgRQgLiIgViVQgHgugBgTQgCgdABgZIAGACQAcAHA1AGIAZACIABADQAEAeAFBAIAEA2QAMCbAFBjIAAAYQANAXAtAIIAiAHQASAGAKALQAOAPgCAXQgCAXgRANQgPAMgaAAQgSAAgXgGg");
	this.shape.setTransform(83.3555,61.825);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(89));

	// shirt
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#6633FF").s().p("AgOFLIgogOQgZgKgOgEIgdgFIgegGQgjgJgPgTQgSgWAFgdQACgJAEgIQgEgbAUgkQAMgWAagjIARgXIAKgqIgDAAIghAAQgUAAgOgDQgSgDgNgJQgPgKgGgPQgDgKAAgUQAAgTACgOQACgPAGgWIALgmQAHgYAPgfQAKgXALgLQAMgLAegIQAPgEAMgDIAQgJQAVgMAdgJIA1gQQAggIAOgBQAbgBAYANIAEACIAKAAQAXABAOAPQAGAHAIAQQAdA4AKAQIAgArQARAaAEAWQACARgEAOQgKAcgqANIgiAGIgLACIAFArQAKBLgMBGQgMBMgkA8QgUAhgWAMQgSAKgWAAQgTAAgWgHg");
	this.shape_1.setTransform(88.7696,33.1372);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(89));

	// pants
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#0033CC").s().p("AgwElIhEgfQgqgTgagJIgogOQgXgJgPgJQgKgHgUgQQgUgQgLgHIgOgIQgIgFgEgFQgRgUAPgvIAWhHQALglAQgOQANgMAUgCQAUgCARAJQAMAGAVARQAPAKAcAJIBMAZIgMgZIgOghQgKgUgDgIQgHgVAEgpQAHhDARgzQAPgpAWgPQASgMAZACQAWACATANQAeAUAcAwQAbAvATAvQAPAlAIAZIAOAuIARAwQAIAdgFAVIgCAHIATACQAtAFAnAaQAmAZAWAnQAVAmgJAcQgHAWgaAOQgRAKggAIIhXAXQg9AQggABIgJAAQg8AAhKgfg");
	this.shape_2.setTransform(58.1964,44.887);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(89));

	// head
	this.instance = new lib.johnnyheadback("synched",0);
	this.instance.setTransform(84.65,3.35,1,1,-14.9992,0,0,20.3,54.9);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:21,regY:26.5,rotation:-14.0228,x:78.4,y:-24.4},0).wait(1).to({rotation:-13.0576,x:78.9,y:-24.5},0).wait(1).to({rotation:-12.1036,x:79.4,y:-24.55},0).wait(1).to({rotation:-11.1605,x:79.85,y:-24.65},0).wait(1).to({rotation:-10.2291,x:80.25,y:-24.7},0).wait(1).to({rotation:-9.3085,x:80.7,y:-24.8},0).wait(1).to({rotation:-8.3988,x:81.15,y:-24.85},0).wait(1).to({rotation:-7.5008,x:81.6,y:-24.95},0).wait(1).to({rotation:-6.6136,x:82.05},0).wait(1).to({rotation:-5.7377,x:82.5,y:-25},0).wait(1).to({rotation:-4.8726,x:82.9,y:-25.05},0).wait(1).to({rotation:-4.0193,x:83.35,y:-25},0).wait(1).to({rotation:-3.1768,x:83.7,y:-25.05},0).wait(1).to({rotation:-2.3456,x:84.2,y:-25},0).wait(1).to({rotation:-1.5251,x:84.6,y:-25.05},0).wait(1).to({rotation:-0.7165,x:85},0).wait(1).to({rotation:0.0813,x:85.35},0).wait(1).to({rotation:0.8684,x:85.75},0).wait(1).to({rotation:1.6436,x:86.15,y:-25},0).wait(1).to({rotation:2.408,x:86.55,y:-24.95},0).wait(1).to({rotation:3.1612,x:86.9,y:-25},0).wait(1).to({rotation:3.9036,x:87.25,y:-24.9},0).wait(1).to({rotation:4.6341,x:87.65},0).wait(1).to({rotation:5.3539,x:88,y:-24.85},0).wait(1).to({rotation:6.0624,x:88.35},0).wait(1).to({rotation:6.76,x:88.7,y:-24.8},0).wait(1).to({rotation:7.4459,x:88.95,y:-24.7},0).wait(1).to({rotation:8.121,x:89.35,y:-24.65},0).wait(1).to({rotation:8.7853,x:89.65,y:-24.6},0).wait(1).to({rotation:9.4378,x:89.95,y:-24.55},0).wait(1).to({rotation:10.0795,x:90.3,y:-24.45},0).wait(1).to({rotation:10.7099,x:90.65,y:-24.4},0).wait(1).to({rotation:11.329,x:90.9,y:-24.3},0).wait(1).to({rotation:11.9373,x:91.15,y:-24.25},0).wait(1).to({rotation:12.5344,x:91.45},0).wait(1).to({rotation:13.1201,x:91.75,y:-24.15},0).wait(1).to({rotation:13.695,x:92.05,y:-24.1},0).wait(1).to({rotation:14.2582,x:92.25,y:-24},0).wait(1).to({rotation:14.8105,x:92.55,y:-23.95},0).wait(1).to({rotation:15.3521,x:92.8,y:-23.85},0).wait(1).to({rotation:15.8818,x:93.05,y:-23.75},0).wait(1).to({rotation:16.4008,x:93.3,y:-23.7},0).wait(1).to({rotation:16.9084,x:93.55,y:-23.65},0).wait(1).to({rotation:17.4048,x:93.75,y:-23.5},0).wait(1).to({rotation:17.8904,x:94},0).wait(1).to({rotation:18.3647,x:94.25,y:-23.4},0).wait(1).to({rotation:18.8276,x:94.45,y:-23.25},0).wait(1).to({rotation:19.2798,x:94.65,y:-23.2},0).wait(1).to({rotation:19.7202,x:94.85,y:-23.15},0).wait(1).to({rotation:20.1498,x:95,y:-23.05},0).wait(1).to({rotation:20.5686,x:95.25,y:-23},0).wait(1).to({rotation:20.9757,x:95.4,y:-22.95},0).wait(1).to({rotation:21.3719,x:95.6,y:-22.8},0).wait(1).to({rotation:21.7568,x:95.8,y:-22.75},0).wait(1).to({rotation:22.1304,x:95.95,y:-22.7},0).wait(1).to({rotation:22.4933,x:96.1,y:-22.6},0).wait(1).to({rotation:22.8448,x:96.25},0).wait(1).to({rotation:23.185,x:96.4,y:-22.5},0).wait(1).to({rotation:23.5145,x:96.6,y:-22.4},0).wait(1).to({rotation:23.8321,x:96.7,y:-22.3},0).wait(1).to({rotation:24.139,x:96.85,y:-22.25},0).wait(1).to({rotation:24.435,x:97,y:-22.2},0).wait(1).to({rotation:24.7193,x:97.15,y:-22.15},0).wait(1).to({rotation:24.9928,x:97.25},0).wait(1).to({rotation:25.255,x:97.35,y:-22.05},0).wait(1).to({rotation:25.5064,x:97.5,y:-22},0).wait(1).to({rotation:25.7459,x:97.55,y:-21.95},0).wait(1).to({rotation:25.9747,x:97.7,y:-21.9},0).wait(1).to({rotation:26.1922,x:97.75,y:-21.85},0).wait(1).to({rotation:26.3989,x:97.85,y:-21.75},0).wait(1).to({rotation:26.5939,x:98},0).wait(1).to({rotation:26.778,y:-21.7},0).wait(1).to({rotation:26.9513,x:98.1},0).wait(1).to({rotation:27.1128,x:98.15,y:-21.6},0).wait(1).to({rotation:27.2635,x:98.2},0).wait(1).to({rotation:27.403,x:98.3,y:-21.55},0).wait(1).to({rotation:27.5311,x:98.35,y:-21.5},0).wait(1).to({rotation:27.6485,x:98.4},0).wait(1).to({rotation:27.7545,x:98.45,y:-21.45},0).wait(1).to({rotation:27.8493},0).wait(1).to({rotation:27.9332,x:98.55,y:-21.4},0).wait(1).to({rotation:28.0054},0).wait(1).to({rotation:28.0668,x:98.6,y:-21.35},0).wait(1).to({rotation:28.1173,x:98.55,y:-21.4},0).wait(1).to({rotation:28.1561,x:98.6},0).wait(1).to({rotation:28.1841,x:98.65},0).wait(1).to({rotation:28.2008},0).wait(1).to({rotation:28.2067,y:-21.35},0).wait(1));

	// body
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E4A985").s().p("AhGFcQgUgHgQgPQiahDhqhCQiHhThbhjIgDgEQgdgFgQgRQgKgMgFgRQgEgLgEgXIgDgYIAAgaIABgqQAAgTACgPIAEgcQABgUABgGQADgLAIgJQAIgJAKgEQAYgJAVANQALAIAMAUQAIAMADAMQABAJABASIAFAXQADANgBAUIAAAZQAUACAUAKQAKAFALAJIAGg1QABgNAEgIQAEgIAIgFQAIgGAKAAQAJgBAIAFQAJAFAEAJQAFAHACASIAGAzIABAKQAYgTAggVIBZg4IAegWQASgMAOgGQASgIASgBQAMAAALADIAQgBQA0AAAXAcQAHAJAGAQIAKAbQAFALAJAPIAPAZIAHAPIAEgZQAUhxAhhCQAXgtAcgTIDsAAQAJANAKAVQA3BxAVA7QAZBBAiCGIAhCBQAJAEArAKQAgAIAOAOQAPAQABAXQAAAXgOAQQgVAXgogBQgOgBgTgDIghgGIgggGQgTgFgKgJQgMgKgIgSQgEgMgFgWIgch5Igch0IgLgpQgKA4gVBSQgNA1gKAaQgPArgWAeQgpA4hNAfQg5AXhXAJQgTACgQAAQgfAAgUgIgAk7ARIgIAHIA+AqQA1AjBPAiQALgLATgLIgSg9QgRgxgXgqIgtAQIg3ATQgZAKgRABIgEAAIgMAKg");
	this.shape_3.setTransform(66.7133,38.8779);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(89));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-61.8,133.4,153);


(lib.girlfromback = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// head
	this.instance = new lib.girlheadback("synched",0);
	this.instance.setTransform(36.95,82.55,1,1,7.5317,0,0,31.7,82.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:25.1,regY:40.2,rotation:6.9223,x:35.35,y:39.85},0).wait(1).to({rotation:6.3195,x:34.85},0).wait(1).to({rotation:5.7237,x:34.3},0).wait(1).to({rotation:5.1347,x:33.8},0).wait(1).to({rotation:4.5531,x:33.25},0).wait(1).to({rotation:3.9782,x:32.8,y:39.9},0).wait(1).to({rotation:3.41,x:32.3,y:39.95},0).wait(1).to({rotation:2.8493,x:31.8,y:39.9},0).wait(1).to({rotation:2.2952,x:31.35},0).wait(1).to({rotation:1.7482,x:30.85,y:40},0).wait(1).to({rotation:1.208,x:30.4,y:40.05},0).wait(1).to({rotation:0.6751,x:29.95},0).wait(1).to({rotation:0.1489,x:29.5},0).wait(1).to({rotation:-0.3702,x:29,y:40.1},0).wait(1).to({rotation:-0.8825,x:28.55},0).wait(1).to({rotation:-1.3875,x:28.15,y:40.2},0).wait(1).to({rotation:-1.8857,x:27.7},0).wait(1).to({rotation:-2.3772,x:27.3,y:40.25},0).wait(1).to({rotation:-2.8614,x:26.9,y:40.3},0).wait(1).to({rotation:-3.3388,x:26.5,y:40.4},0).wait(1).to({rotation:-3.8091,x:26.1,y:40.45},0).wait(1).to({rotation:-4.2727,x:25.75,y:40.55},0).wait(1).to({rotation:-4.7289,x:25.3},0).wait(1).to({rotation:-5.1784,x:25,y:40.65},0).wait(1).to({rotation:-5.6209,x:24.6,y:40.7},0).wait(1).to({rotation:-6.0565,x:24.2,y:40.75},0).wait(1).to({rotation:-6.4849,x:23.85,y:40.8},0).wait(1).to({rotation:-6.9065,x:23.5,y:40.9},0).wait(1).to({rotation:-7.3213,x:23.1,y:40.95},0).wait(1).to({rotation:-7.7288,x:22.75,y:41},0).wait(1).to({rotation:-8.1295,x:22.5,y:41.1},0).wait(1).to({rotation:-8.5232,x:22.1,y:41.2},0).wait(1).to({rotation:-8.9099,x:21.85},0).wait(1).to({rotation:-9.2898,x:21.5,y:41.3},0).wait(1).to({rotation:-9.6626,x:21.2,y:41.45},0).wait(1).to({rotation:-10.0284,x:20.85,y:41.5},0).wait(1).to({rotation:-10.3874,x:20.6,y:41.55},0).wait(1).to({rotation:-10.7391,x:20.3,y:41.6},0).wait(1).to({rotation:-11.084,x:20.05,y:41.65},0).wait(1).to({rotation:-11.4222,x:19.7,y:41.8},0).wait(1).to({rotation:-11.7531,x:19.45,y:41.85},0).wait(1).to({rotation:-12.0771,x:19.15,y:41.9},0).wait(1).to({rotation:-12.3942,x:18.9,y:41.95},0).wait(1).to({rotation:-12.7042,x:18.7,y:42.05},0).wait(1).to({rotation:-13.0074,x:18.4,y:42.1},0).wait(1).to({rotation:-13.3036,x:18.2,y:42.15},0).wait(1).to({rotation:-13.5927,x:17.95,y:42.25},0).wait(1).to({rotation:-13.8751,x:17.7,y:42.4},0).wait(1).to({rotation:-14.1501,x:17.5},0).wait(1).to({rotation:-14.4184,x:17.25,y:42.5},0).wait(1).to({rotation:-14.68,x:17.1,y:42.6},0).wait(1).to({rotation:-14.9341,x:16.85,y:42.65},0).wait(1).to({rotation:-15.1816,x:16.65,y:42.7},0).wait(1).to({rotation:-15.422,x:16.45,y:42.75},0).wait(1).to({rotation:-15.6553,x:16.25,y:42.85},0).wait(1).to({rotation:-15.8819,x:16.1,y:42.9},0).wait(1).to({rotation:-16.1014,x:15.9},0).wait(1).to({rotation:-16.3139,x:15.75,y:43},0).wait(1).to({rotation:-16.5196,x:15.55,y:43.05},0).wait(1).to({rotation:-16.718,x:15.4,y:43.15},0).wait(1).to({rotation:-16.9096,x:15.25},0).wait(1).to({rotation:-17.0945,x:15.1},0).wait(1).to({rotation:-17.272,x:14.95,y:43.3},0).wait(1).to({rotation:-17.4428,x:14.85,y:43.35},0).wait(1).to({rotation:-17.6066,x:14.65},0).wait(1).to({rotation:-17.7635,x:14.55,y:43.45},0).wait(1).to({rotation:-17.9132,x:14.45,y:43.5},0).wait(1).to({rotation:-18.056,x:14.3,y:43.45},0).wait(1).to({rotation:-18.1919,x:14.25,y:43.55},0).wait(1).to({rotation:-18.321,x:14.15},0).wait(1).to({rotation:-18.4427,x:14,y:43.6},0).wait(1).to({rotation:-18.5577,x:13.95,y:43.65},0).wait(1).to({rotation:-18.6659,x:13.85,y:43.7},0).wait(1).to({rotation:-18.7668,x:13.8},0).wait(1).to({rotation:-18.8609,x:13.7,y:43.75},0).wait(1).to({rotation:-18.948,x:13.65},0).wait(1).to({rotation:-19.028,x:13.6,y:43.8},0).wait(1).to({rotation:-19.1013,x:13.5,y:43.85},0).wait(1).to({rotation:-19.1675,x:13.45,y:43.8},0).wait(1).to({rotation:-19.2267,y:43.85},0).wait(1).to({rotation:-19.2791,x:13.35},0).wait(1).to({rotation:-19.3242,y:43.9},0).wait(1).to({rotation:-19.3625,y:43.95},0).wait(1).to({rotation:-19.3941,x:13.3,y:43.9},0).wait(1).to({rotation:-19.4183,x:13.25},0).wait(1).to({rotation:-19.4358},0).wait(1).to({rotation:-19.4462,y:43.95},0).wait(1).to({rotation:-19.4499},0).wait(1));

	// front_arm
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFC3C3").s().p("ABEG5QgigagSgLIgqgXQgagOgMgQQgNgSgEgbQgCgPAAgjQABhBgIhQQgEgwgMheIgMhJQgGgegehbQgOgpgHggIAAgNIABhAQABgkAFgbQABgLADgIQAegDARAIQAWALANAeQAGAOAKApQAHAcAPAqIAYBFQAfBhAPB/QAIBIAJCgQABAUAFAIQAFAJAPAJIAzAiQAiAXALAQQAJAOACAQQACARgGAPQgGAPgNAKQgNALgQACIgHABQgXAAgagSg");
	this.shape.setTransform(65.275,124.9618);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(89));

	// dress
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CC3399").s().p("Aj8GuQgWgFgOgUQgOgUADgWIACgMQAAgIgBgEQgCgGgGgFIgLgKQgWgWARg4QAJgaAIgOQAMgVARgJQAUgHAIgGQAJgFAJgQQARgbADgfQgLgqgUgtQgTgqgjg/QgWgngGgSQgKgkAKg0QAOg8AEgdIAGgfQAEgRAHgLQAJgLANgHQANgHAOABQAPABAMAHQANAIAHAMQAMAUgDAkIgCARIAAAAQARAEANAOQAPgJAGgYQAGgcAFgNQAIgWAVgMQAWgNAVAIQAhANAFA1QABANABAbQABAXAGAQQAEAJAGANIANAVQAPAZAJAkQAGAWAHArIAbCsIASgOIAUgRQANgKAJgFQAcgPAXAFQASAFAUAaIADADQAQAWAEARQAEAQgEAiQgCARgDANQAVADALADQAUAHAMALQAKAKAEAPQAEAOgDAOQgEAOgJALQgHAHgIAFIgJAEIgUAFQgMADgHAEQgFAEgIAJIgMAOQgJAIgOADQgJACgSACQglADhlAOQgKAcgfAMQgfALgagQQgJATgSALQgTAMgVAAQgVAAgSgMIgIgFIgDACQghAXgcAAQgIAAgIgCg");
	this.shape_1.setTransform(50.164,116.6672);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(89));

	// body
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFC3C3").s().p("AB0HXQgPgDgWgNQgagOgLgEQgegHgMgHQgXgMgMggQgHgUgFgnIgLhMQg7AshegDQg4gCgcgYQgfgbgGg0QgCgTACgZIADgtQAEg0gIgoQgHgqgXguIgIgQIgFAwQgDAggCBwQgBA4gFAiQgDAYgHAbQgJAigQARQgPAPgmAOIgmAOQgVAIgLADQgTAEgPgDQgVgEgNgRQgOgSADgVQAEghA1gbQAUgJAbgLQAMgEAEgFQAEgFACgLQAHgtALh0IAGg7QAGhHAKgjIAKgfQAFgSABgNIABgOIgCgFQgHgaAFgjQADgWALgnQAKgjAIgSQAOgcAVgNQARgLAngGIAKgBIAMAKIAAAOQAOgDAQAAQAdABAZANIAIAGIAAggQALAGALAKQAPACANAJQAQAMAYAgQAHAHAUARQARAPAIAKQAVAaAFAoQADAdgDAsQgDAqgLAZIAHAXIAeBqQAFgHAFgMQAHgRAGgHIADgDIgDAVIgHAIIAAAbQAWAhArAAQgFAHgFAGQAJAJAHAIIANgRIAJgKQgEAPgBARIgBAkQANAfALAhQgVAUgOAKQgUAQgTAHQAKA2AFAzQAQgCAVAJIAjARQALAEAVAHQATAHAJAKQANANAAAVQAAAUgMAPQgLAPgTAGQgLADgLAAQgIAAgIgCgACZCkQgWgZgagXQgCgPAAgPQgBgPAGgNIABAAQAdgWAUgJIAdgMQATgHAJgFQAKgFAMgMIAVgRQARgMAngTQAMgHAWgRQAVgQAOgIIAvgXQALgGAHgFIAEgHIAFgHIAAgBIAAAAIAMgOQAIgIASgKQAJgFABgDIABgJIAAglQgBgbAFgPQAHgbAYgNQAMgGAOAAQAOAAALAHQAQAJAIAUQAGAOACAXQACATAAA1IgBAfQgDAUgGAQIAEAFIgJAHIgCAEQgOAagZALQgOAGgZABIhIAqQhHAngaAUIgVAQQgNAJgLAGQgIAFgQAFIgXAKQgaAMgkAZIg2AkgAAhgJIAAgjIALgKIAEgbIAHgHIAMgLQAIgIALgVQANgVAogjQAQgQACgPQABgJgJgaQgHgTgEgnQgFghAJgQQAJgQATgFQAUgGARAIQATAJAPAgQAYAyAKA2QAIAlgGAYQgHAagYAbIgXAYQgPAPgHAKIgcAqQgSAXgUAFQgEAQgIAOQg7AAgfgpg");
	this.shape_2.setTransform(62.5985,120.1592);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(89));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-26.2,-8.5,151.4,179.4);


(lib.backsandhill = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// girl
	this.instance = new lib.girlfromback("synched",0);
	this.instance.setTransform(746.55,137.15,1.5025,1.5025,0,0,0,52.6,83.8);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(89));

	// johnny
	this.instance_1 = new lib.johnnyfromback("synched",0);
	this.instance_1.setTransform(1027.75,186.85,1.7188,1.7188,0,0,0,66.8,37.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(89));

	// hill
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#75483A").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape.setTransform(896.4285,404.1188);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(89));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-1.5,1792.9,685.6);


(lib.background2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// ground_moves
	this.instance = new lib.groundtomove("synched",0);
	this.instance.setTransform(976.2,228.1,1,1,0,0,0,976.2,228.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({y:229.45},0).wait(1).to({y:230.8},0).wait(1).to({y:232.15},0).wait(1).to({y:233.5},0).wait(1).to({y:234.8},0).wait(1).to({y:236.15},0).wait(1).to({y:237.45},0).wait(1).to({y:238.75},0).wait(1).to({y:240},0).wait(1).to({y:241.3},0).wait(1).to({y:242.55},0).wait(1).to({y:243.8},0).wait(1).to({y:245.05},0).wait(1).to({y:246.25},0).wait(1).to({y:247.5},0).wait(1).to({y:248.7},0).wait(1).to({y:249.9},0).wait(1).to({y:251.1},0).wait(1).to({y:252.25},0).wait(1).to({y:253.4},0).wait(1).to({y:254.55},0).wait(1).to({y:255.7},0).wait(1).to({y:256.85},0).wait(1).to({y:257.95},0).wait(1).to({y:259.05},0).wait(1).to({y:260.15},0).wait(1).to({y:261.25},0).wait(1).to({y:262.35},0).wait(1).to({y:263.4},0).wait(1).to({y:264.45},0).wait(1).to({y:265.5},0).wait(1).to({y:266.5},0).wait(1).to({y:267.55},0).wait(1).to({y:268.55},0).wait(1).to({y:269.55},0).wait(1).to({y:270.55},0).wait(1).to({y:271.5},0).wait(1).to({y:272.5},0).wait(1).to({y:273.45},0).wait(1).to({y:274.4},0).wait(1).to({y:275.3},0).wait(1).to({y:276.25},0).wait(1).to({y:277.15},0).wait(1).to({y:278.05},0).wait(1).to({y:278.95},0).wait(1).to({y:279.8},0).wait(1).to({y:280.7},0).wait(1).to({y:281.55},0).wait(1).to({y:282.4},0).wait(1).to({y:283.25},0).wait(1).to({y:284.05},0).wait(1).to({y:284.85},0).wait(1).to({y:285.65},0).wait(1).to({y:286.45},0).wait(1).to({y:287.25},0).wait(1).to({y:288},0).wait(1).to({y:288.75},0).wait(1).to({y:289.5},0).wait(1).to({y:290.25},0).wait(1).to({y:291},0).wait(1).to({y:291.7},0).wait(1).to({y:292.4},0).wait(1).to({y:293.1},0).wait(1).to({y:293.8},0).wait(1).to({y:294.45},0).wait(1).to({y:295.1},0).wait(1).to({y:295.75},0).wait(1).to({y:296.4},0).wait(1).to({y:297.05},0).wait(1).to({y:297.65},0).wait(1).to({y:298.25},0).wait(1).to({y:298.85},0).wait(1).to({y:299.45},0).wait(1).to({y:300},0).wait(1).to({y:300.55},0).wait(1).to({y:301.1},0).wait(1).to({y:301.65},0).wait(1).to({y:302.2},0).wait(1).to({y:302.7},0).wait(1).to({y:303.2},0).wait(1).to({y:303.7},0).wait(1).to({y:304.2},0).wait(1).to({y:304.7},0).wait(1).to({y:305.15},0).wait(1).to({y:305.6},0).wait(1).to({y:306.05},0).wait(1).to({y:306.45},0).wait(1).to({y:306.9},0).wait(1).to({y:307.3},0).wait(1).to({y:307.7},0).wait(1).to({y:308.1},0).wait(1).to({y:308.45},0).wait(1).to({y:308.85},0).wait(1).to({y:309.2},0).wait(1).to({y:309.55},0).wait(1).to({y:309.85},0).wait(1).to({y:310.2},0).wait(1).to({y:310.5},0).wait(1).to({y:310.8},0).wait(1).to({y:311.1},0).wait(1).to({y:311.35},0).wait(1).to({y:311.65},0).wait(1).to({y:311.9},0).wait(1).to({y:312.15},0).wait(1).to({y:312.35},0).wait(1).to({y:312.6},0).wait(1).to({y:312.8},0).wait(1).to({y:313},0).wait(1).to({y:313.2},0).wait(1).to({y:313.4},0).wait(1).to({y:313.55},0).wait(1).to({y:313.7},0).wait(1).to({y:313.85},0).wait(1).to({y:314},0).wait(1).to({y:314.1},0).wait(1).to({y:314.25},0).wait(1).to({y:314.35},0).wait(1).to({y:314.45},0).wait(1).to({y:314.5},0).wait(1).to({y:314.6},0).wait(1).to({y:314.65},0).wait(1).to({y:314.7},0).wait(1).to({y:314.75},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({y:314.8},0).wait(1));

	// suns
	this.instance_1 = new lib.sunsglow("synched",0);
	this.instance_1.setTransform(381.05,232.25,0.7363,0.7363,0,0,0,326.1,325.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).to({regY:326.1,rotation:0.121,x:385.45,y:226.05},0).wait(1).to({rotation:0.2485,x:389.8,y:219.75},0).wait(1).to({rotation:0.379,x:394.2,y:213.45},0).wait(1).to({rotation:0.5123,x:398.6,y:207.25},0).wait(1).to({rotation:0.6485,x:402.9,y:201},0).wait(1).to({rotation:0.7876,x:407.25,y:194.9},0).wait(1).to({scaleX:0.7362,scaleY:0.7362,rotation:0.9297,x:411.6,y:188.85},0).wait(1).to({scaleX:0.7363,scaleY:0.7363,rotation:1.0747,x:415.9,y:182.8},0).wait(1).to({rotation:1.2227,x:420.25,y:176.8},0).wait(1).to({rotation:1.3736,x:424.5,y:170.85},0).wait(1).to({rotation:1.5275,x:428.8,y:165},0).wait(1).to({rotation:1.6844,x:433.1,y:159.15},0).wait(1).to({rotation:1.8443,x:437.4,y:153.3},0).wait(1).to({rotation:2.0072,x:441.65,y:147.6},0).wait(1).to({rotation:2.1731,x:445.9,y:141.85},0).wait(1).to({rotation:2.342,x:450.15,y:136.25},0).wait(1).to({rotation:2.5139,x:454.35,y:130.6},0).wait(1).to({scaleX:0.7362,scaleY:0.7362,rotation:2.6887,x:458.6,y:125},0).wait(1).to({scaleX:0.7363,scaleY:0.7363,rotation:2.8666,x:462.85,y:119.5},0).wait(1).to({rotation:3.0474,x:467.1,y:114},0).wait(1).to({rotation:3.2312,x:471.25,y:108.55},0).wait(1).to({rotation:3.4179,x:475.5,y:103.1},0).wait(1).to({rotation:3.6076,x:479.7,y:97.75},0).wait(1).to({rotation:3.8002,x:483.95,y:92.4},0).wait(1).to({rotation:3.9957,x:488.1,y:87.15},0).wait(1).to({rotation:4.194,x:492.35,y:81.9},0).wait(1).to({scaleX:0.7362,scaleY:0.7362,rotation:4.3953,x:496.6,y:76.7},0).wait(1).to({scaleX:0.7363,scaleY:0.7363,rotation:4.5993,x:500.75,y:71.5},0).wait(1).to({rotation:4.8061,x:505,y:66.35},0).wait(1).to({rotation:5.0157,x:509.15,y:61.25},0).wait(1).to({rotation:5.2281,x:513.4,y:56.2},0).wait(1).to({rotation:5.4431,x:517.6,y:51.15},0).wait(1).to({rotation:5.6607,x:521.75,y:46.2},0).wait(1).to({rotation:5.881,x:526.05,y:41.3},0).wait(1).to({rotation:6.1038,x:530.25,y:36.4},0).wait(1).to({rotation:6.3292,x:534.45,y:31.4},0).wait(1).to({rotation:6.557,x:538.65,y:26.6},0).wait(1).to({rotation:6.7872,x:542.9,y:21.75},0).wait(1).to({rotation:7.0197,x:547.1,y:17.05},0).wait(1).to({rotation:7.2546,x:551.35,y:12.25},0).wait(1).to({rotation:7.4916,x:555.6,y:7.55},0).wait(1).to({rotation:7.7309,x:559.85,y:2.9},0).wait(1).to({scaleX:0.7362,scaleY:0.7362,rotation:7.9722,x:564.1,y:-1.8},0).wait(1).to({scaleX:0.7363,scaleY:0.7363,rotation:8.2156,x:568.35,y:-6.4},0).wait(1).to({rotation:8.4609,x:572.65,y:-11.05},0).wait(1).to({rotation:8.7081,x:576.9,y:-15.55},0).wait(1).to({rotation:8.9571,x:581.2,y:-20.05},0).wait(1).to({rotation:9.2078,x:585.55,y:-24.6},0).wait(1).to({rotation:9.4601,x:589.8,y:-29.05},0).wait(1).to({scaleX:0.7362,scaleY:0.7362,rotation:9.7141,x:594.15,y:-33.5},0).wait(1).to({scaleX:0.7363,scaleY:0.7363,rotation:9.9695,x:598.5,y:-37.9},0).wait(1).to({rotation:10.2263,x:602.85,y:-42.3},0).wait(1).to({rotation:10.4844,x:607.2,y:-46.6},0).wait(1).to({rotation:10.7437,x:611.55,y:-50.95},0).wait(1).to({rotation:11.0041,x:615.9,y:-55.3},0).wait(1).to({rotation:11.2655,x:620.3,y:-59.6},0).wait(1).to({scaleX:0.7362,scaleY:0.7362,rotation:11.5279,x:624.7,y:-63.8},0).wait(1).to({scaleX:0.7363,scaleY:0.7363,rotation:11.7911,x:629.15,y:-68.1},0).wait(1).to({rotation:12.0551,x:633.6,y:-72.25},0).wait(1).to({scaleX:0.7362,scaleY:0.7362,rotation:12.3196,x:638,y:-76.45},0).wait(1).to({scaleX:0.7363,scaleY:0.7363,rotation:12.5847,x:642.5,y:-80.65},0).wait(1).to({rotation:12.8503,x:647.05,y:-84.7},0).wait(1).to({rotation:13.1162,x:651.55,y:-88.8},0).wait(1).to({rotation:13.3823,x:656.05,y:-93},0).wait(1).to({rotation:13.6486,x:660.6,y:-97.05},0).wait(1).to({rotation:13.9149,x:665.15,y:-101.05},0).wait(1).to({rotation:14.1811,x:669.75,y:-105.15},0).wait(1).to({rotation:14.4471,x:674.35,y:-109.1},0).wait(1).to({rotation:14.7129,x:678.95,y:-113.15},0).wait(1).to({rotation:14.9783,x:683.6,y:-117.05},0).wait(1).to({rotation:15.2433,x:688.3,y:-121.05},0).wait(1).to({rotation:15.5076,x:692.95,y:-124.95},0).wait(1).to({rotation:15.7713,x:697.65,y:-128.9},0).wait(1).to({rotation:16.0342,x:702.4,y:-132.8},0).wait(1).to({rotation:16.2963,x:707.2,y:-136.7},0).wait(1).to({rotation:16.5574,x:711.95,y:-140.55},0).wait(1).to({rotation:16.8174,x:716.75,y:-144.4},0).wait(1).to({rotation:17.0763,x:721.55,y:-148.25},0).wait(1).to({scaleX:0.7362,scaleY:0.7362,rotation:17.334,x:726.45,y:-152},0).wait(1).to({scaleX:0.7363,scaleY:0.7363,rotation:17.5903,x:731.3,y:-155.85},0).wait(1).to({rotation:17.8452,x:736.25,y:-159.65},0).wait(1).to({scaleX:0.7362,scaleY:0.7362,rotation:18.0986,x:741.15,y:-163.4},0).wait(1).to({scaleX:0.7363,scaleY:0.7363,rotation:18.3505,x:746.15,y:-167.15},0).wait(1).to({rotation:18.6006,x:751.1,y:-170.9},0).wait(1).to({rotation:18.8491,x:756.15,y:-174.7},0).wait(1).to({rotation:19.0956,x:761.2,y:-178.35},0).wait(1).to({rotation:19.3403,x:766.3,y:-182.1},0).wait(1).to({rotation:19.5831,x:771.4,y:-185.85},0).wait(1).to({scaleX:0.7362,scaleY:0.7362,rotation:19.8238,x:776.55,y:-189.55},0).wait(1).to({scaleX:0.7363,scaleY:0.7363,rotation:20.0623,x:781.7,y:-193.25},0).wait(1).to({rotation:20.2987,x:786.95,y:-196.85},0).wait(1).to({scaleX:0.7362,scaleY:0.7362,rotation:20.5329,x:792.2,y:-200.55},0).wait(1).to({scaleX:0.7363,scaleY:0.7363,rotation:20.7648,x:797.45,y:-204.2},0).wait(1).to({rotation:20.9943,x:802.75,y:-207.85},0).wait(1).to({scaleX:0.7362,scaleY:0.7362,rotation:21.2214,x:808.1,y:-211.5},0).wait(1).to({scaleX:0.7363,scaleY:0.7363,rotation:21.4461,x:813.45,y:-215.1},0).wait(1).to({rotation:21.6682,x:818.85,y:-218.75},0).wait(1).to({rotation:21.8878,x:824.35,y:-222.35},0).wait(1).to({scaleX:0.7362,scaleY:0.7362,rotation:22.1048,x:829.85,y:-226},0).wait(1).to({scaleX:0.7363,scaleY:0.7363,rotation:22.3191,x:835.3,y:-229.6},0).wait(1).to({rotation:22.5308,x:840.9,y:-233.2},0).wait(1).to({rotation:22.7397,x:846.55,y:-236.8},0).wait(1).to({scaleX:0.7362,scaleY:0.7362,rotation:22.9459,x:852.15,y:-240.4},0).wait(1).to({scaleX:0.7363,scaleY:0.7363,rotation:23.1493,x:857.8,y:-244},0).wait(1).to({rotation:23.3499,x:863.55,y:-247.55},0).wait(1).to({rotation:23.5477,x:869.3,y:-251.2},0).wait(1).to({rotation:23.7426,x:875.05,y:-254.8},0).wait(1).to({rotation:23.9346,x:880.9,y:-258.35},0).wait(1).to({rotation:24.1238,x:886.8,y:-261.95},0).wait(1).to({scaleX:0.7362,scaleY:0.7362,rotation:24.31,x:892.7,y:-265.5},0).wait(1).to({scaleX:0.7363,scaleY:0.7363,rotation:24.4933,x:898.65,y:-269.05},0).wait(1).to({rotation:24.6737,x:904.7,y:-272.7},0).wait(1).to({rotation:24.8511,x:910.7,y:-276.25},0).wait(1).to({rotation:25.0255,x:916.85,y:-279.85},0).wait(1).to({scaleX:0.7362,scaleY:0.7362,rotation:25.197,x:922.95,y:-283.4},0).wait(1).to({scaleX:0.7363,scaleY:0.7363,rotation:25.3655,x:929.15,y:-287},0).wait(1).to({rotation:25.5311,x:935.35,y:-290.55},0).wait(1).to({rotation:25.6937,x:941.65,y:-294.15},0).wait(1).to({scaleX:0.7362,scaleY:0.7362,rotation:25.8533,x:947.95,y:-297.75},0).wait(1).to({scaleX:0.7363,scaleY:0.7363,rotation:26.01,x:954.3,y:-301.35},0).wait(1).to({rotation:26.1638,x:960.75,y:-304.95},0).wait(1).to({rotation:26.3145,x:967.2,y:-308.55},0).wait(1).to({rotation:26.4624,x:973.75,y:-312.15},0).wait(1).to({scaleX:0.7362,scaleY:0.7362,rotation:26.6073,x:980.25,y:-315.8},0).wait(1).to({scaleX:0.7363,scaleY:0.7363,rotation:26.7494,x:986.95,y:-319.4},0).wait(1).to({rotation:26.8885,x:993.6,y:-323},0).wait(1));

	// sky
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#544944").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape.setTransform(994.25,-270.025);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#564A45").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_1.setTransform(994.25,-268.725);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#584C46").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_2.setTransform(994.25,-267.375);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#594D48").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_3.setTransform(994.25,-266.075);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#5B4F49").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_4.setTransform(994.25,-264.725);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#5D504A").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_5.setTransform(994.25,-263.425);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#5F514B").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_6.setTransform(994.25,-262.125);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#61534C").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_7.setTransform(994.25,-260.775);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#63544D").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_8.setTransform(994.25,-259.475);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#64554F").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_9.setTransform(994.25,-258.125);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#665750").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_10.setTransform(994.25,-256.825);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#685851").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_11.setTransform(994.25,-255.525);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#6A5A52").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_12.setTransform(994.25,-254.175);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#6C5B53").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_13.setTransform(994.25,-252.875);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#6E5C54").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_14.setTransform(994.25,-251.525);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#6F5E56").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_15.setTransform(994.25,-250.225);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#715F57").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_16.setTransform(994.25,-248.925);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#736058").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_17.setTransform(994.25,-247.575);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#756259").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_18.setTransform(994.25,-246.275);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#77635A").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_19.setTransform(994.25,-244.925);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#79655C").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_20.setTransform(994.25,-243.625);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#7A665D").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_21.setTransform(994.25,-242.325);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#7C675E").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_22.setTransform(994.25,-240.975);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#7E695F").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_23.setTransform(994.25,-239.675);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#806A60").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_24.setTransform(994.25,-238.325);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#826B61").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_25.setTransform(994.25,-237.025);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#836D63").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_26.setTransform(994.25,-235.725);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#856E64").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_27.setTransform(994.25,-234.375);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#876F65").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_28.setTransform(994.25,-233.075);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#897166").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_29.setTransform(994.25,-231.725);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#8B7267").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_30.setTransform(994.25,-230.425);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#8D7468").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_31.setTransform(994.25,-229.125);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#8E756A").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_32.setTransform(994.25,-227.775);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#90766B").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_33.setTransform(994.25,-226.475);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#92786C").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_34.setTransform(994.25,-225.125);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#94796D").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_35.setTransform(994.25,-223.825);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#967A6E").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_36.setTransform(994.25,-222.525);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#987C6F").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_37.setTransform(994.25,-221.175);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#997D71").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_38.setTransform(994.25,-219.875);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#9B7F72").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_39.setTransform(994.25,-218.525);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#9D8073").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_40.setTransform(994.25,-217.225);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#9E8175").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_41.setTransform(994.25,-217.225);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#9E8276").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_42.setTransform(994.25,-217.225);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#9F8478").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_43.setTransform(994.25,-217.225);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#9F857A").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_44.setTransform(994.25,-217.225);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#A0867B").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_45.setTransform(994.25,-217.225);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#A0877D").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_46.setTransform(994.25,-217.225);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#A1897E").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_47.setTransform(994.25,-217.225);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#A18A80").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_48.setTransform(994.25,-217.225);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#A28B82").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_49.setTransform(994.25,-217.225);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#A38C83").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_50.setTransform(994.25,-217.225);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#A38D85").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_51.setTransform(994.25,-217.225);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#A48F87").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_52.setTransform(994.25,-217.225);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#A49088").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_53.setTransform(994.25,-217.225);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#A5918A").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_54.setTransform(994.25,-217.225);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#A5928B").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_55.setTransform(994.25,-217.225);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#A6948D").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_56.setTransform(994.25,-217.225);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#A6958F").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_57.setTransform(994.25,-217.225);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#A79690").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_58.setTransform(994.25,-217.225);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#A89792").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_59.setTransform(994.25,-217.225);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#A89894").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_60.setTransform(994.25,-217.225);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#A99A95").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_61.setTransform(994.25,-217.225);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#A99B97").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_62.setTransform(994.25,-217.225);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#AA9C98").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_63.setTransform(994.25,-217.225);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#AA9D9A").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_64.setTransform(994.25,-217.225);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#AB9F9C").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_65.setTransform(994.25,-217.225);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#ACA09D").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_66.setTransform(994.25,-217.225);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#ACA19F").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_67.setTransform(994.25,-217.225);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#ADA2A1").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_68.setTransform(994.25,-217.225);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#ADA3A2").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_69.setTransform(994.25,-217.225);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#AEA5A4").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_70.setTransform(994.25,-217.225);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#AEA6A5").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_71.setTransform(994.25,-217.225);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#AFA7A7").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_72.setTransform(994.25,-217.225);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#AFA8A9").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_73.setTransform(994.25,-217.225);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#B0AAAA").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_74.setTransform(994.25,-217.225);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#B1ABAC").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_75.setTransform(994.25,-217.225);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#B1ACAE").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_76.setTransform(994.25,-217.225);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#B2ADAF").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_77.setTransform(994.25,-217.225);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#B2AEB1").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_78.setTransform(994.25,-217.225);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#B3B0B2").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_79.setTransform(994.25,-217.225);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#B3B1B4").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_80.setTransform(994.25,-217.225);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#B4B2B6").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_81.setTransform(994.25,-217.225);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#B4B3B7").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_82.setTransform(994.25,-217.225);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#B5B5B9").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_83.setTransform(994.25,-217.225);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#B6B6BB").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_84.setTransform(994.25,-217.225);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#B6B7BC").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_85.setTransform(994.25,-217.225);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#B7B8BE").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_86.setTransform(994.25,-217.225);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#B7B9C0").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_87.setTransform(994.25,-217.225);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#B8BBC1").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_88.setTransform(994.25,-217.225);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#B8BCC3").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_89.setTransform(994.25,-217.225);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#B9BDC4").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_90.setTransform(994.25,-217.225);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#B9BEC6").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_91.setTransform(994.25,-217.225);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#BABFC8").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_92.setTransform(994.25,-217.225);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#BBC1C9").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_93.setTransform(994.25,-217.225);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#BBC2CB").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_94.setTransform(994.25,-217.225);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#BCC3CD").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_95.setTransform(994.25,-217.225);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#BCC4CE").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_96.setTransform(994.25,-217.225);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#BDC6D0").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_97.setTransform(994.25,-217.225);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#BDC7D1").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_98.setTransform(994.25,-217.225);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#BEC8D3").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_99.setTransform(994.25,-217.225);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#BEC9D5").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_100.setTransform(994.25,-217.225);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#BFCAD6").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_101.setTransform(994.25,-217.225);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#C0CCD8").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_102.setTransform(994.25,-217.225);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#C0CDDA").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_103.setTransform(994.25,-217.225);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#C1CEDB").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_104.setTransform(994.25,-217.225);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#C1CFDD").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_105.setTransform(994.25,-217.225);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#C2D1DE").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_106.setTransform(994.25,-217.225);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#C2D2E0").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_107.setTransform(994.25,-217.225);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#C3D3E2").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_108.setTransform(994.25,-217.225);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#C4D4E3").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_109.setTransform(994.25,-217.225);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#C4D5E5").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_110.setTransform(994.25,-217.225);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#C5D7E7").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_111.setTransform(994.25,-217.225);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#C5D8E8").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_112.setTransform(994.25,-217.225);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#C6D9EA").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_113.setTransform(994.25,-217.225);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#C6DAEB").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_114.setTransform(994.25,-217.225);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#C7DCED").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_115.setTransform(994.25,-217.225);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#C7DDEF").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_116.setTransform(994.25,-217.225);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#C8DEF0").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_117.setTransform(994.25,-217.225);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#C9DFF2").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_118.setTransform(994.25,-217.225);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#C9E0F4").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_119.setTransform(994.25,-217.225);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#CAE2F5").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_120.setTransform(994.25,-217.225);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#CAE3F7").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_121.setTransform(994.25,-217.225);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#CBE4F8").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_122.setTransform(994.25,-217.225);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#CBE5FA").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_123.setTransform(994.25,-217.225);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#CCE7FC").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_124.setTransform(994.25,-217.225);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#CCE8FD").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_125.setTransform(994.25,-217.225);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#CDE9FF").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_126.setTransform(994.25,-217.225);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_28}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_31}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_33}]},1).to({state:[{t:this.shape_34}]},1).to({state:[{t:this.shape_35}]},1).to({state:[{t:this.shape_36}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_38}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_41}]},1).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_43}]},1).to({state:[{t:this.shape_44}]},1).to({state:[{t:this.shape_45}]},1).to({state:[{t:this.shape_46}]},1).to({state:[{t:this.shape_47}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_49}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_51}]},1).to({state:[{t:this.shape_52}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_54}]},1).to({state:[{t:this.shape_55}]},1).to({state:[{t:this.shape_56}]},1).to({state:[{t:this.shape_57}]},1).to({state:[{t:this.shape_58}]},1).to({state:[{t:this.shape_59}]},1).to({state:[{t:this.shape_60}]},1).to({state:[{t:this.shape_61}]},1).to({state:[{t:this.shape_62}]},1).to({state:[{t:this.shape_63}]},1).to({state:[{t:this.shape_64}]},1).to({state:[{t:this.shape_65}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_67}]},1).to({state:[{t:this.shape_68}]},1).to({state:[{t:this.shape_69}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_71}]},1).to({state:[{t:this.shape_72}]},1).to({state:[{t:this.shape_73}]},1).to({state:[{t:this.shape_74}]},1).to({state:[{t:this.shape_75}]},1).to({state:[{t:this.shape_76}]},1).to({state:[{t:this.shape_77}]},1).to({state:[{t:this.shape_78}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_80}]},1).to({state:[{t:this.shape_81}]},1).to({state:[{t:this.shape_82}]},1).to({state:[{t:this.shape_83}]},1).to({state:[{t:this.shape_84}]},1).to({state:[{t:this.shape_85}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_87}]},1).to({state:[{t:this.shape_88}]},1).to({state:[{t:this.shape_89}]},1).to({state:[{t:this.shape_90}]},1).to({state:[{t:this.shape_91}]},1).to({state:[{t:this.shape_92}]},1).to({state:[{t:this.shape_93}]},1).to({state:[{t:this.shape_94}]},1).to({state:[{t:this.shape_95}]},1).to({state:[{t:this.shape_96}]},1).to({state:[{t:this.shape_97}]},1).to({state:[{t:this.shape_98}]},1).to({state:[{t:this.shape_99}]},1).to({state:[{t:this.shape_100}]},1).to({state:[{t:this.shape_101}]},1).to({state:[{t:this.shape_102}]},1).to({state:[{t:this.shape_103}]},1).to({state:[{t:this.shape_104}]},1).to({state:[{t:this.shape_105}]},1).to({state:[{t:this.shape_106}]},1).to({state:[{t:this.shape_107}]},1).to({state:[{t:this.shape_108}]},1).to({state:[{t:this.shape_109}]},1).to({state:[{t:this.shape_110}]},1).to({state:[{t:this.shape_111}]},1).to({state:[{t:this.shape_112}]},1).to({state:[{t:this.shape_113}]},1).to({state:[{t:this.shape_114}]},1).to({state:[{t:this.shape_115}]},1).to({state:[{t:this.shape_116}]},1).to({state:[{t:this.shape_117}]},1).to({state:[{t:this.shape_118}]},1).to({state:[{t:this.shape_119}]},1).to({state:[{t:this.shape_120}]},1).to({state:[{t:this.shape_121}]},1).to({state:[{t:this.shape_122}]},1).to({state:[{t:this.shape_123}]},1).to({state:[{t:this.shape_124}]},1).to({state:[{t:this.shape_125}]},1).to({state:[{t:this.shape_126}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-691.8,1952.5,1295.1);


(lib.johnnyheadtalking = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// facefeatures
	this.instance = new lib.johnnymouth();
	this.instance.setTransform(127.7,236.85,1,1,0,0,0,27.2,19.4);

	this.instance_1 = new lib.johnnyeyes();
	this.instance_1.setTransform(116.6,164.35,1,1,0,0,0,64.3,16.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	// hair
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#4C331F").s().p("AwLRFQgagzAIhLQADgZAHgiIgBABQgcgkgMg2QgJgngDg+QgFiGAHh/QgJg6gFg6QgwBWg0BQQgbAqgTAYQgdAigeATQAghwA8iDQAihMBJiMIABgiIgFAFQgTAWgpAoQg5A2gmAaQgFgfAGgiQAMhBBChSIAIgKQgFgLgDgOIgBgJIgGALQgcgegEgvQgDgjALgzQAWhjAvhaIAOgZIgPAJQhUAxhNAUQgXAGgFgLQgEgHAGgNQAMgaAigfQAugrBfhGQBbhDAsgeQBMg1A/glQAjgVAZgIQALgEAKgBIADgKQAJgYAFgKQARgiAlgbQAagSAwgXQCPhECZgvIAogfQB5hdBCgnQAVgLALACQAPADAGASQAEALgDATQgFAdgOAcQCPgbCSgIQBbgEBHAEQBXAGBIAUQA9AQAVAfQAPAUgDAaQgEAbgVAKQANAKAXAOQASgJAbACQAgADAkAPQAaALAmAWQBjA7BMA1QAwAiAdAZQAnAkAYAkQAKAPgDAJQgCAJgRAHQgwARg6gVIgTgIIDcEaQARAUAHANQALAUAAASQACAjglAUQgdAQgZgKQAMAfAIAcIAiAtQAUAdADAgQADAlgYATIgHAFIAEAfIAFA8IAFAGQAqA4AkBQQAWAzAiBhQAJAYADANQAFAWgDARQgFAagQAFQgOAFgUgLQgjgVgagtQgRgcgVg6IgXhCIgEAHIABAGQAFAgABARQABAQAABDQAAB8gBAQQgEBPgQA6QgGAXgNAEQgPAFgMgPQgGgHgFgUQgRhKAAh1QAAisgCgVQgDg0ABgTIABgNQgQgWgNgbQAQBrgXBdQgGAWgMABQgNACgKgYQgVgxg/iyIgBABQgaAKgjgpQgsg1gWghIgHgLQgggRgigbQgegXgxgvIgCgCIgDABQgXACgYAAIAXAMQBEAsApAqQgZAfg+gIQhNgKhQgqIgBAAQg2gMg3gjIgUgNIACAEQAQAZARAPQARAPAFAHQAEAHAAAJQAAAIgGAGQgGAGgQAAIgNgBIA4AxQguAXg+gWQgWgIgbgQIgvgeIibhfIgzggIABADQABAIgEAGQgIALgZgFQiTgchjhMQg/gwhGhcQgtg7gshFIAAAIQAHCchQDEQgyB2hCBpQggAygaAaQgYAYgfARQgLAigNAcQgNgQgIgVIgBgEIgbAHQgEA3gKAwIgBBEQgBA9gGAoIgDATQAZBJA2B7QAKAXAEANQAHAVABASQAAAVgJARQgKATgRAIQgWAJgagLQgWgJgTgVQgTgTgQgbIgHA5QgKBcgTAxQgGARgKADIgGABQgNAAgKgVgAtQCHIgBADQgOAbgNAVQAGA9ABAzIAOgZIADgFIAAgEQAAg/ALhHIgHAFgArDhAQgSBCgPBFIAihBQBMiXAliDQAVhNAMhQQg3C/hcCygAggkrIAQANQApAlAZAdQAoAvgNAjQgFAMgLAJIBLAuIAqAbQg0hJhChrIg1hZQgQAMgXACgAFNkWQgQAEgQADIA1ApQA5AqBUAvIAeARQhThVhKhTQgOAJgVAFgAKyjrIAaAaIglg5Qg6gqg1ggQBCAyA4A3gAvUjxIAAAHIAEgJIgEACg");
	this.shape.setTransform(105.1396,118.2257);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// beard
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#4C331F").s().p("Ah4KBQgLgIgJgRIgBgDIgEABQgLABgKgGQgNgIgLgaQgHgSgJghQgLgpAMgTIADgEQABgFADgGQAGgIAKgFIACAAIABgGQgtAjgRA1QgZAMgZgUQgYgUAFgbQgGASgQALQgRAKgSgBQgSgBgPgNQgOgMgEgSQgUAEgUgHQgVgHgMgQQgNgQgCgWQgCgVAJgSQgiACgTgCQgdgDgTgNQgXgPgNggQgJgWgGgmQgRAAgOgOQgNgMgFgSQgHgZAHguQAHgpAVgGQAIgCAKAEIgIgHIgXgcIgIgKIgDAJQgHAQgNAAQgIAAgGgGQgGgFgDgIQgDgKABgVIAAglIgigsQgQgVgKgLQAeA+AQBKQgOAFgRgEQgQgEgMgLQgTgQgPgkQgRgvgHgMIgNgUQgHgNgDgJQgDgMADgMQADgMAKgGQAIgFAKABIgEgIQgFgOgIgaIgNgKQgZgTgPgWQgRgZABgaQABgOAHgJQAJgLAMAEQAKADADAOQACAIABAPQADAOAMAPIADgVIACgpIACghQgGAAgIgHQgSgRgFgJQgMgRgCgZQgBgRACgeQACgOAEgEQAEgEAMgDIAFgBQAKAAAIAJQAHAJABALQACAIgBAOIAAAVQAAAIAFAXIAEAUQAEgBAFAEQAGAEAEAHQAHALAGAPQgEgOgFgcQgFgegEgNIgGgXQgDgOACgKQACgMAKgIQAKgJALAEQALAFAJAVQAYBAAFAjQAJA0gNAyQgbgMgQgfQAHATAHAZQAUBEACAhIABAMQAVALAHALQgJAAgTgMIAAAaIAYAgQAQAWAOAHIAEACQgJgVgKghQgIgbgCgNQgFgfAFghQADgPAFgIQAJgMAMACQALACAGAOQAFAKABASIACAWIAAgBQAEgLAKgGQAKgGAJAFQAIAEAFAPIAiBgQANgCAMAIQAMAHAHANQALATAAAiQAAAfgEAXQgBALgDAHIAKA3IAHAmIAGAFQAOAOABAnIAGCaQALAJAWgLQAcgPAKAAQATAAAJAWQAIARAAAZQABgQASgGQASgGAOAJQAXAQADAqIABAiQACATAFAMIAmhJQAGgNAHgHQgQgNgNgUQgggFgWgYQgKgNgNgbIgCgEIgEAEQgIAFgLgCQgdgDgRgXQgHgKgHgSQgMgggFgmQgCgRADgKQAFgQAOgDIADAAIgBgHQgDgcAFggQABgJADgGQACgFAEgCQgMgZgHgeQgGgegEg4QgCgbAKgLQAHgGAJgCQAKgBAIAEQAQAGAJAUQAIAPAFAaQAKAqACAXQACAkgLAbQgEAKgHAHQgIAHgJgDQgDgBgFgEQgCAUABAVQABAQgDAHQgCAEgDADIABABQAGAHAIASIAOAbIAAAAQADgHAHgEQAGgEAHABQANAAAJANIAMAYQAGAOAPAWIAIAMQAHgHAKgBQAPgBAQAMQAIAHANASIAkAxQAVAbACASQABANgHAMQgHAMgNABIgCAAIABAFQABAKgBAVQgCAUACALIA0hAQANgRALgBQAMgCAJALQAJAKACAOIABAHIAEACQAOAJAKAQQALgNAJgWQgHAAgGgFQgIgFgFgKQgMgaACgpIAIg6QgCAMgGAJQgJANgMAAQgXACgPgjQgchEAUhAQAHgWAMgGQAIgEAJABQAJABAGAGQAGAGAEAOQAIAZAGA2QACAfgBAQQACgWAHgHQAFgGAJgBQAIgBAHAEQAHAGAEALQACAGABAOIAFAjQADAVABAOIAAAKIAHgIQAJgHAKgCQAMgCAIAFQAJAHAEAUIAEASQABgRAFgPIAFgVIAAgLQAAgGACgFQAEgIAKgBQAKgCAGAGQAEAGADAMIAEAQIABgVQABgPAFgEQAEgEAHAAQAGABADAEQAEAEABALIACATQAKgIALgBQAOAAAMALQAJAJAEANQAEgMAFgMQADgJAGgDIADgBIAGgeIAMg0QADgNAFgFQAIgLANAFQALADAHAPIAGgeIAIggQAGgSAKgKQAKgJAIABQAMACAEASQADAQgFAYIgHAoIAAARIgCAQQgFAYgVAOQgJgFgHgJQgBAagJAaIAAABIBAhEQAVgWAQAEIADACIADgIQAEgIAIgEQAIgFAJABIAEAAQgDgFAAgFIgBgQQgFgJABgFIADgHQACgFAFgCIALgCIAFABQALAGAFAMIACAQIABANQABALgDAEQgEAFgLABIACACQAKAQAAAUQgBATgJASQgIARgQAQIAAAMQAQgCAdgcQAbgZATACIADAAIAAgEIANjkQABgVAKgFQAGgEAIACQAHACAGAGQARAOAGAbQAEAPACAjIADA8QAAAigJAYQgIAWgcAlIgDAEIAFABQAJACAEALQAEAKgBALIAAACIA6hOIAJgRIAohGQAJgOAFgFQAIgGAIAAQAFgZACgNIACgeQABgSAFgMQAEgLAJgIQAKgIAKAEQAJADAHAPQAFALADANQANgBAHAKQAKgqgJgqIgBgCQgVgLgMgUQgNgUAAgXQAAgYANgUQAJgQAPgKIACgaQgRAggWgFQgWgDgFghQgDgYAHgiQAJgmADgTIAHg2QAFgfALgUQAGgMAMgHQAMgIALAFQAPAGAEAeQAGAxgEAtIADADQADAGACAOIAJBTQgBhoAFg4QABgUAGgMQAFgHAHgEQAHgFAIACQAUADAEAlQAKBNgDAjQgDBAgeArQgJANgKAAQgHAAgEgGIgCAHQACA/gIApQgGAcgQACIgDAAIgEAWQgGArADAiIADAhQAAASgHANQgHAPgTADQgHABgFgBIgBACQgJAngMASQgHALgLAFQgMAGgKgFIgXAkQgMATgMABQgEABgDgBQgRANgWAEQgIgEADgRIAFgSIgvA8IgIAWQgGAOgQAcIgYAmQgOAVgPANQgKAIgHgCQgIgDgCgNQgCgXANgcIASgeQgMgJgFgPQgHgTAGgpQgUgCgaAiQgVAcgRAFQgBAKgEAOIgMAmQgKAegQAPQgNANgLgFQgLgFgBgSQAAgNAFgZQAJgsAKgTIAMgZIgCgMQgBgKADgXQACgVgBgMQg0AmgoA0QAEAcgDAWQAOAZAMArQAIAdABATQACAbgKATQgGAKgKAGQgKAHgKgDQgIgCgIgKIgGACQgEACgCACQgRgEgMgLIgLgLIgPgMQACAOgFAIQgFAIgKACQgKACgKgEQgNgFgMgQIgTgcIgSgcQgGgKgGgXQgEgQACgJQgKADgNgGQgUgJgIgTQgHgQABgWQABgNAFgaQgJAIgHAOIgHAMIAAABIgRAqQgGAOgJAKIAJAVQAMAgAEASQAIAcgBAXQAAAQgGAMQgHAOgMAEIgIABQgLAAgLgIgACgIxIgJggIgPg4IgCgKIgFgBQgigJgGg/IgIATIgGALQgBAWgFATQgFARgKAGIAFAJQAEAGAHAGIANALQAVATALAaIACgDQAGgFAHAAQABAAABgBQABAAAAAAQABAAAAgBQAAAAgBgBQAQAGALAFIAAAAgAAKHWIAGgKIgCgKIAAgEIgEAYgAKUEqIgLAWIADACIANgVIgEgGIgBADgAowCgQAAAPgEAGIACADQAEAIABARQABAQADAIQACgHAAgPIAAgjQABgNgDgJIgGgMQgDgHABgFIgBAAIACAegAp3CoQAIAAADgKIABAAQgHgLgFgMIAAAhgAqGA6IgJABQAHAGAIAFIAAgEIAGgbIgDgCQgDAJgGAMgAqlAkQgCgJgBgNQAAgcACgYQgCADgDABIgJgGIAAACQACAQgBAfIgBAGIAPAVIAAAAgAsXh7QAEAPALAQQAKAQAXAaIACADQACgRAEgMIAFgIQgJgCgLgMQgNgNgdgmQgBARACAJgAqphuQAEAXACAXQABgNAEgGQADgFAFgCQAEgCADABQACgHACgEQAIgKACgGQACgGgDgOQgIgagKgZQAAAqgVAlgAtRlvQAAAIABAFIACAJIAAAGIADADQAGAGAGADIACgCIgGgVQgEgNgEgHQgEgGABgDIgDAAIAAAMgAk/DPQgFgKAAgRQAAgeAFgeQACgPAFgGQADgFAGgCQAGgDAFACQAGACAEAHQALAPACAlQACAcgEAQQgGAZgTAJQgSgMgFgLgAJgDBQgHgFgFgJQgFgKgBgZQgCheAehZQANglANgWQAHgKAGgCIADhLQABgMACgEQACgEAEgCQAEgCAEACQAGADABANQADAcABAiQABAegFATQABALgBANIgJAtQgDASgDBIQgDA5gNAhQgKAagSACIgCAAQgHAAgIgEgAlwAnQgOgCgDgXQgHgtAJhYQABgVAMgCQAHgCAGAHQAFAFACAIQADAKACAcQAFBDgIAjQgFAXgOAAIgBAAgACEiBQgCgeAMgdQAHgSARgcQAKgRALAAQAIAAgBgEQAKAEAHAKQAGAKgBALQgBAHgGASQgFAMgFAVIgIAiQgNAqgcAMQgRgXgBgggAJUhMQgGgCgCgIQgHgQgBgRQAAgPAFgYIAHgmQACgNAAgZQAAgZACgNQACgRAGgJQAKgOAOAEQAPAEAGAcQAJAxgIAwQgIAygZApQgJANgIAAIgEgBgAiphQQgKAAgIgPQgUgmABhDQAAg1AHg0QADgVAIgHQAKgKAQAFQAPAEAIANQAHALACARIABAUQAJgIANAAQATgBAKAQQAIAKADAXQAEAfAAAUQgBAbgIAVQgLAbgUADQgQABgMgOIgDgEQgFAPgIAMQgJAOgLAAIgCAAgAjwhbQgWgVgFgQQgCgIAAgMQABgLACgDQADgIAHgCIAGgBQABAAABAAQAAgBABAAQAAAAABgBQAAAAAAgBQAJABAGAHQADAEACAHIAEALIAIAMQACAGgDANQgCAJgDADIgJAHIgCAFQAAAAgBABQAAAAgBAAQAAABgBAAQAAAAgBAAIgFgCgAGCh1QgEgLAGgYQAMguAIgQQAMgVAFgLIAIgWQAGgMALgCQANgCAIANQAGAJAAAQQAAATgLAmIgMAoQgIAXgHAMQgKASgQAHQgWgLgFgRgAEPh2QgHgLAAgSQAAgSAJgeQALgiABgOIAEgZQADgPAKgFQALgHALAHQALAHAEAZQADAagCAMQgBAKgGASQgHATgCAJIgCARIgDARQgDAIgFAHQgHAHgIABIgEAAQgMAAgJgNgAAthyQgHgGgFgKQgFgNABgZIAAhVQAAgbAGgMQAEgKAIgGQAJgGAKABQARACAIATQAEAJABAYIADBLQAAAVgBAKQgCARgHALQgLARgPAAIgBAAQgJAAgIgGgAIGh2QgJgEgFgIQgHgMAGgeQAGgaABgmIABgXQACgNAGgIQAJgNAPgDQANAAAJAMQAEAHAEARQAOBJgeAxQgKAPgKAFQgFABgEAAQgFAAgFgBgANslTQgHgHgDgMQgDgRADgZQAGgcACgOQACgMAAgRIABgeQABgbAJgLQAGgHALgDIgDgIQgDgJgBgSQgCgfADgQQAEgOAHgCQAKgDAFAJQAEAGABAMQACAQgCAXQAAAQgEAKIgDAJQAHACAFAFQAMALADAYQADAXgDAaQgGBFgcApQgKAQgLABIgCAAQgIAAgIgIg");
	this.shape_1.setTransform(116.554,228.6361);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// face
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E4A985").s().p("AhjS2QibgriJhfQh3hThuh8QhVhhhkiRIgYgiQgUAhgfAOQggAOgmgJQgmgKgSgbQgQgYgDgwQgEg/AEhAIg4gCQghgBgVgHQgVgHgQgQQgRgPgHgUQgKgYACgtQACgrAJgWQAPgkAhgLQAOgFAfgBIAkAAQhHi/AEiuQAGjdB/kIQAqhYArg/QA1hOA+g3QBthgDBhFQEGheDjANQDFALDPBeQDCBYB0B5QA2A5AxBNQAmA8AqBWQBlDJAgCYQAdCIgKCbQAUgEAagBQAxgEAZALQATAJAMARQALARACAUQACAjgZAmIgdAmQgRAVgFASQgEAOAAATIABAgQAAAhgLAZQgNAegZAQQgdASgogFQgXgDgTgJIgWBHQgvCRgxBoQg/CEhQBiQhcBwh4BLQiCBRiOAVQg2AJg3AAQhpAAhtgfg");
	this.shape_2.setTransform(113.1947,158.7883);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.johnnyheadtalking, new cjs.Rectangle(-29.7,6.8,269.8,286.8), null);


(lib.johnnyheadquiet = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// facefeatures
	this.instance = new lib.johnnymouth("single",0);
	this.instance.setTransform(127.7,236.85,1,1,0,0,0,27.2,19.4);

	this.instance_1 = new lib.johnnyeyes();
	this.instance_1.setTransform(116.6,164.35,1,1,0,0,0,64.3,16.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	// hair
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#4C331F").s().p("AwLRFQgagzAIhLQADgZAHgiIgBABQgcgkgMg2QgJgngDg+QgFiGAHh/QgJg6gFg6QgwBWg0BQQgbAqgTAYQgdAigeATQAghwA8iDQAihMBJiMIABgiIgFAFQgTAWgpAoQg5A2gmAaQgFgfAGgiQAMhBBChSIAIgKQgFgLgDgOIgBgJIgGALQgcgegEgvQgDgjALgzQAWhjAvhaIAOgZIgPAJQhUAxhNAUQgXAGgFgLQgEgHAGgNQAMgaAigfQAugrBfhGQBbhDAsgeQBMg1A/glQAjgVAZgIQALgEAKgBIADgKQAJgYAFgKQARgiAlgbQAagSAwgXQCPhECZgvIAogfQB5hdBCgnQAVgLALACQAPADAGASQAEALgDATQgFAdgOAcQCPgbCSgIQBbgEBHAEQBXAGBIAUQA9AQAVAfQAPAUgDAaQgEAbgVAKQANAKAXAOQASgJAbACQAgADAkAPQAaALAmAWQBjA7BMA1QAwAiAdAZQAnAkAYAkQAKAPgDAJQgCAJgRAHQgwARg6gVIgTgIIDcEaQARAUAHANQALAUAAASQACAjglAUQgdAQgZgKQAMAfAIAcIAiAtQAUAdADAgQADAlgYATIgHAFIAEAfIAFA8IAFAGQAqA4AkBQQAWAzAiBhQAJAYADANQAFAWgDARQgFAagQAFQgOAFgUgLQgjgVgagtQgRgcgVg6IgXhCIgEAHIABAGQAFAgABARQABAQAABDQAAB8gBAQQgEBPgQA6QgGAXgNAEQgPAFgMgPQgGgHgFgUQgRhKAAh1QAAisgCgVQgDg0ABgTIABgNQgQgWgNgbQAQBrgXBdQgGAWgMABQgNACgKgYQgVgxg/iyIgBABQgaAKgjgpQgsg1gWghIgHgLQgggRgigbQgegXgxgvIgCgCIgDABQgXACgYAAIAXAMQBEAsApAqQgZAfg+gIQhNgKhQgqIgBAAQg2gMg3gjIgUgNIACAEQAQAZARAPQARAPAFAHQAEAHAAAJQAAAIgGAGQgGAGgQAAIgNgBIA4AxQguAXg+gWQgWgIgbgQIgvgeIibhfIgzggIABADQABAIgEAGQgIALgZgFQiTgchjhMQg/gwhGhcQgtg7gshFIAAAIQAHCchQDEQgyB2hCBpQggAygaAaQgYAYgfARQgLAigNAcQgNgQgIgVIgBgEIgbAHQgEA3gKAwIgBBEQgBA9gGAoIgDATQAZBJA2B7QAKAXAEANQAHAVABASQAAAVgJARQgKATgRAIQgWAJgagLQgWgJgTgVQgTgTgQgbIgHA5QgKBcgTAxQgGARgKADIgGABQgNAAgKgVgAtQCHIgBADQgOAbgNAVQAGA9ABAzIAOgZIADgFIAAgEQAAg/ALhHIgHAFgArDhAQgSBCgPBFIAihBQBMiXAliDQAVhNAMhQQg3C/hcCygAggkrIAQANQApAlAZAdQAoAvgNAjQgFAMgLAJIBLAuIAqAbQg0hJhChrIg1hZQgQAMgXACgAFNkWQgQAEgQADIA1ApQA5AqBUAvIAeARQhThVhKhTQgOAJgVAFgAKyjrIAaAaIglg5Qg6gqg1ggQBCAyA4A3gAvUjxIAAAHIAEgJIgEACg");
	this.shape.setTransform(105.1396,118.2257);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// beard
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#4C331F").s().p("Ah4KBQgLgIgJgRIgBgDIgEABQgLABgKgGQgNgIgLgaQgHgSgJghQgLgpAMgTIADgEQABgFADgGQAGgIAKgFIACAAIABgGQgtAjgRA1QgZAMgZgUQgYgUAFgbQgGASgQALQgRAKgSgBQgSgBgPgNQgOgMgEgSQgUAEgUgHQgVgHgMgQQgNgQgCgWQgCgVAJgSQgiACgTgCQgdgDgTgNQgXgPgNggQgJgWgGgmQgRAAgOgOQgNgMgFgSQgHgZAHguQAHgpAVgGQAIgCAKAEIgIgHIgXgcIgIgKIgDAJQgHAQgNAAQgIAAgGgGQgGgFgDgIQgDgKABgVIAAglIgigsQgQgVgKgLQAeA+AQBKQgOAFgRgEQgQgEgMgLQgTgQgPgkQgRgvgHgMIgNgUQgHgNgDgJQgDgMADgMQADgMAKgGQAIgFAKABIgEgIQgFgOgIgaIgNgKQgZgTgPgWQgRgZABgaQABgOAHgJQAJgLAMAEQAKADADAOQACAIABAPQADAOAMAPIADgVIACgpIACghQgGAAgIgHQgSgRgFgJQgMgRgCgZQgBgRACgeQACgOAEgEQAEgEAMgDIAFgBQAKAAAIAJQAHAJABALQACAIgBAOIAAAVQAAAIAFAXIAEAUQAEgBAFAEQAGAEAEAHQAHALAGAPQgEgOgFgcQgFgegEgNIgGgXQgDgOACgKQACgMAKgIQAKgJALAEQALAFAJAVQAYBAAFAjQAJA0gNAyQgbgMgQgfQAHATAHAZQAUBEACAhIABAMQAVALAHALQgJAAgTgMIAAAaIAYAgQAQAWAOAHIAEACQgJgVgKghQgIgbgCgNQgFgfAFghQADgPAFgIQAJgMAMACQALACAGAOQAFAKABASIACAWIAAgBQAEgLAKgGQAKgGAJAFQAIAEAFAPIAiBgQANgCAMAIQAMAHAHANQALATAAAiQAAAfgEAXQgBALgDAHIAKA3IAHAmIAGAFQAOAOABAnIAGCaQALAJAWgLQAcgPAKAAQATAAAJAWQAIARAAAZQABgQASgGQASgGAOAJQAXAQADAqIABAiQACATAFAMIAmhJQAGgNAHgHQgQgNgNgUQgggFgWgYQgKgNgNgbIgCgEIgEAEQgIAFgLgCQgdgDgRgXQgHgKgHgSQgMgggFgmQgCgRADgKQAFgQAOgDIADAAIgBgHQgDgcAFggQABgJADgGQACgFAEgCQgMgZgHgeQgGgegEg4QgCgbAKgLQAHgGAJgCQAKgBAIAEQAQAGAJAUQAIAPAFAaQAKAqACAXQACAkgLAbQgEAKgHAHQgIAHgJgDQgDgBgFgEQgCAUABAVQABAQgDAHQgCAEgDADIABABQAGAHAIASIAOAbIAAAAQADgHAHgEQAGgEAHABQANAAAJANIAMAYQAGAOAPAWIAIAMQAHgHAKgBQAPgBAQAMQAIAHANASIAkAxQAVAbACASQABANgHAMQgHAMgNABIgCAAIABAFQABAKgBAVQgCAUACALIA0hAQANgRALgBQAMgCAJALQAJAKACAOIABAHIAEACQAOAJAKAQQALgNAJgWQgHAAgGgFQgIgFgFgKQgMgaACgpIAIg6QgCAMgGAJQgJANgMAAQgXACgPgjQgchEAUhAQAHgWAMgGQAIgEAJABQAJABAGAGQAGAGAEAOQAIAZAGA2QACAfgBAQQACgWAHgHQAFgGAJgBQAIgBAHAEQAHAGAEALQACAGABAOIAFAjQADAVABAOIAAAKIAHgIQAJgHAKgCQAMgCAIAFQAJAHAEAUIAEASQABgRAFgPIAFgVIAAgLQAAgGACgFQAEgIAKgBQAKgCAGAGQAEAGADAMIAEAQIABgVQABgPAFgEQAEgEAHAAQAGABADAEQAEAEABALIACATQAKgIALgBQAOAAAMALQAJAJAEANQAEgMAFgMQADgJAGgDIADgBIAGgeIAMg0QADgNAFgFQAIgLANAFQALADAHAPIAGgeIAIggQAGgSAKgKQAKgJAIABQAMACAEASQADAQgFAYIgHAoIAAARIgCAQQgFAYgVAOQgJgFgHgJQgBAagJAaIAAABIBAhEQAVgWAQAEIADACIADgIQAEgIAIgEQAIgFAJABIAEAAQgDgFAAgFIgBgQQgFgJABgFIADgHQACgFAFgCIALgCIAFABQALAGAFAMIACAQIABANQABALgDAEQgEAFgLABIACACQAKAQAAAUQgBATgJASQgIARgQAQIAAAMQAQgCAdgcQAbgZATACIADAAIAAgEIANjkQABgVAKgFQAGgEAIACQAHACAGAGQARAOAGAbQAEAPACAjIADA8QAAAigJAYQgIAWgcAlIgDAEIAFABQAJACAEALQAEAKgBALIAAACIA6hOIAJgRIAohGQAJgOAFgFQAIgGAIAAQAFgZACgNIACgeQABgSAFgMQAEgLAJgIQAKgIAKAEQAJADAHAPQAFALADANQANgBAHAKQAKgqgJgqIgBgCQgVgLgMgUQgNgUAAgXQAAgYANgUQAJgQAPgKIACgaQgRAggWgFQgWgDgFghQgDgYAHgiQAJgmADgTIAHg2QAFgfALgUQAGgMAMgHQAMgIALAFQAPAGAEAeQAGAxgEAtIADADQADAGACAOIAJBTQgBhoAFg4QABgUAGgMQAFgHAHgEQAHgFAIACQAUADAEAlQAKBNgDAjQgDBAgeArQgJANgKAAQgHAAgEgGIgCAHQACA/gIApQgGAcgQACIgDAAIgEAWQgGArADAiIADAhQAAASgHANQgHAPgTADQgHABgFgBIgBACQgJAngMASQgHALgLAFQgMAGgKgFIgXAkQgMATgMABQgEABgDgBQgRANgWAEQgIgEADgRIAFgSIgvA8IgIAWQgGAOgQAcIgYAmQgOAVgPANQgKAIgHgCQgIgDgCgNQgCgXANgcIASgeQgMgJgFgPQgHgTAGgpQgUgCgaAiQgVAcgRAFQgBAKgEAOIgMAmQgKAegQAPQgNANgLgFQgLgFgBgSQAAgNAFgZQAJgsAKgTIAMgZIgCgMQgBgKADgXQACgVgBgMQg0AmgoA0QAEAcgDAWQAOAZAMArQAIAdABATQACAbgKATQgGAKgKAGQgKAHgKgDQgIgCgIgKIgGACQgEACgCACQgRgEgMgLIgLgLIgPgMQACAOgFAIQgFAIgKACQgKACgKgEQgNgFgMgQIgTgcIgSgcQgGgKgGgXQgEgQACgJQgKADgNgGQgUgJgIgTQgHgQABgWQABgNAFgaQgJAIgHAOIgHAMIAAABIgRAqQgGAOgJAKIAJAVQAMAgAEASQAIAcgBAXQAAAQgGAMQgHAOgMAEIgIABQgLAAgLgIgACgIxIgJggIgPg4IgCgKIgFgBQgigJgGg/IgIATIgGALQgBAWgFATQgFARgKAGIAFAJQAEAGAHAGIANALQAVATALAaIACgDQAGgFAHAAQABAAABgBQABAAAAAAQABAAAAgBQAAAAgBgBQAQAGALAFIAAAAgAAKHWIAGgKIgCgKIAAgEIgEAYgAKUEqIgLAWIADACIANgVIgEgGIgBADgAowCgQAAAPgEAGIACADQAEAIABARQABAQADAIQACgHAAgPIAAgjQABgNgDgJIgGgMQgDgHABgFIgBAAIACAegAp3CoQAIAAADgKIABAAQgHgLgFgMIAAAhgAqGA6IgJABQAHAGAIAFIAAgEIAGgbIgDgCQgDAJgGAMgAqlAkQgCgJgBgNQAAgcACgYQgCADgDABIgJgGIAAACQACAQgBAfIgBAGIAPAVIAAAAgAsXh7QAEAPALAQQAKAQAXAaIACADQACgRAEgMIAFgIQgJgCgLgMQgNgNgdgmQgBARACAJgAqphuQAEAXACAXQABgNAEgGQADgFAFgCQAEgCADABQACgHACgEQAIgKACgGQACgGgDgOQgIgagKgZQAAAqgVAlgAtRlvQAAAIABAFIACAJIAAAGIADADQAGAGAGADIACgCIgGgVQgEgNgEgHQgEgGABgDIgDAAIAAAMgAk/DPQgFgKAAgRQAAgeAFgeQACgPAFgGQADgFAGgCQAGgDAFACQAGACAEAHQALAPACAlQACAcgEAQQgGAZgTAJQgSgMgFgLgAJgDBQgHgFgFgJQgFgKgBgZQgCheAehZQANglANgWQAHgKAGgCIADhLQABgMACgEQACgEAEgCQAEgCAEACQAGADABANQADAcABAiQABAegFATQABALgBANIgJAtQgDASgDBIQgDA5gNAhQgKAagSACIgCAAQgHAAgIgEgAlwAnQgOgCgDgXQgHgtAJhYQABgVAMgCQAHgCAGAHQAFAFACAIQADAKACAcQAFBDgIAjQgFAXgOAAIgBAAgACEiBQgCgeAMgdQAHgSARgcQAKgRALAAQAIAAgBgEQAKAEAHAKQAGAKgBALQgBAHgGASQgFAMgFAVIgIAiQgNAqgcAMQgRgXgBgggAJUhMQgGgCgCgIQgHgQgBgRQAAgPAFgYIAHgmQACgNAAgZQAAgZACgNQACgRAGgJQAKgOAOAEQAPAEAGAcQAJAxgIAwQgIAygZApQgJANgIAAIgEgBgAiphQQgKAAgIgPQgUgmABhDQAAg1AHg0QADgVAIgHQAKgKAQAFQAPAEAIANQAHALACARIABAUQAJgIANAAQATgBAKAQQAIAKADAXQAEAfAAAUQgBAbgIAVQgLAbgUADQgQABgMgOIgDgEQgFAPgIAMQgJAOgLAAIgCAAgAjwhbQgWgVgFgQQgCgIAAgMQABgLACgDQADgIAHgCIAGgBQABAAABAAQAAgBABAAQAAAAABgBQAAAAAAgBQAJABAGAHQADAEACAHIAEALIAIAMQACAGgDANQgCAJgDADIgJAHIgCAFQAAAAgBABQAAAAgBAAQAAABgBAAQAAAAgBAAIgFgCgAGCh1QgEgLAGgYQAMguAIgQQAMgVAFgLIAIgWQAGgMALgCQANgCAIANQAGAJAAAQQAAATgLAmIgMAoQgIAXgHAMQgKASgQAHQgWgLgFgRgAEPh2QgHgLAAgSQAAgSAJgeQALgiABgOIAEgZQADgPAKgFQALgHALAHQALAHAEAZQADAagCAMQgBAKgGASQgHATgCAJIgCARIgDARQgDAIgFAHQgHAHgIABIgEAAQgMAAgJgNgAAthyQgHgGgFgKQgFgNABgZIAAhVQAAgbAGgMQAEgKAIgGQAJgGAKABQARACAIATQAEAJABAYIADBLQAAAVgBAKQgCARgHALQgLARgPAAIgBAAQgJAAgIgGgAIGh2QgJgEgFgIQgHgMAGgeQAGgaABgmIABgXQACgNAGgIQAJgNAPgDQANAAAJAMQAEAHAEARQAOBJgeAxQgKAPgKAFQgFABgEAAQgFAAgFgBgANslTQgHgHgDgMQgDgRADgZQAGgcACgOQACgMAAgRIABgeQABgbAJgLQAGgHALgDIgDgIQgDgJgBgSQgCgfADgQQAEgOAHgCQAKgDAFAJQAEAGABAMQACAQgCAXQAAAQgEAKIgDAJQAHACAFAFQAMALADAYQADAXgDAaQgGBFgcApQgKAQgLABIgCAAQgIAAgIgIg");
	this.shape_1.setTransform(116.554,228.6361);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// face
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E4A985").s().p("AhjS2QibgriJhfQh3hThuh8QhVhhhkiRIgYgiQgUAhgfAOQggAOgmgJQgmgKgSgbQgQgYgDgwQgEg/AEhAIg4gCQghgBgVgHQgVgHgQgQQgRgPgHgUQgKgYACgtQACgrAJgWQAPgkAhgLQAOgFAfgBIAkAAQhHi/AEiuQAGjdB/kIQAqhYArg/QA1hOA+g3QBthgDBhFQEGheDjANQDFALDPBeQDCBYB0B5QA2A5AxBNQAmA8AqBWQBlDJAgCYQAdCIgKCbQAUgEAagBQAxgEAZALQATAJAMARQALARACAUQACAjgZAmIgdAmQgRAVgFASQgEAOAAATIABAgQAAAhgLAZQgNAegZAQQgdASgogFQgXgDgTgJIgWBHQgvCRgxBoQg/CEhQBiQhcBwh4BLQiCBRiOAVQg2AJg3AAQhpAAhtgfg");
	this.shape_2.setTransform(113.1947,158.7883);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.johnnyheadquiet, new cjs.Rectangle(-29.7,6.8,269.8,286.8), null);


(lib.girlheadtalking = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// eyes
	this.instance = new lib.girlmouth();
	this.instance.setTransform(90.75,188.8,1,1,0,0,0,26.8,17.8);

	this.instance_1 = new lib.girleyes();
	this.instance_1.setTransform(95.15,120.7,1,1,0,0,0,71.8,15.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	// front_hair
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#C3A16A").s().p("AOYMoIgYgyQgPgcgPgTQgVgdg2gwQiRiBgqgnQhnhghJhSQi7jWhEjVQgSg7gThaQgJgugCgaQgEgoAHgfQAFgYAMgQQAOgTATgEQAMgDAMAEIAAgoQgiAZg2AiQipBuiOBXQhbA3gqAgQioB/hqDcQg/CFgLASQgwBSg/AjQgaAOgZACQgeACgTgQIgGgHIgMAjQgjBmgUAoQgnBLg5AgQgcAQgTgIQgMgGgMgTQheijBokbQByk6DYkKQDWkJEdiyQBPgyA9gWQBSgeBGAIQAnAFAuASQAdALA0AZQAKAFAFAFQAbgPAYgGQAOgEAOAAIAOgPQAXgWAcgKQAegMAbAHQATAFARAOQAPANAJATQARAkgIArIgGAaIANgCQAjgEApAQQAbALArAbIDMB+QA2AkAbAYQApAmARApIAJAcQAGATAEAJQAKAUAiArQBaBwA0CHQAPAlAEAbQAGAlgKAdQgDAIgLAYQgJATgDANQgCAMABAXQACAYgCAKQgCAQgMAbQgMAdgDAOQgEAUAEAbIAKAwQASBRgFBUQgEBLgdAlQgdAlg0AGQgZADgWgGQgFBVgNBbgAJUjXQgCgIgEgEIgDgDIAJAPg");
	this.shape.setTransform(97.7881,75.5326);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// face
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFC3C3").s().p("AkASQQhcgOhIgjQhug2hnh9QgaggiNjJIhriaQg6hagahMQgahNgGhgQgFhHAFhrQAIixAZiCQAgilBAh/QBJiQCPiUQDvj3Dyg4QCmgnDdApQDHAkCCBPQBDApBIBEQAsApBQBWQBTBZAmAyQA+BRAcBNQAmBlgFCHQgDBVgbCdQgaCagSBNQgfB/gsBfQgnBRhBBbQgrA8hSBkQh4CThSBLQh6Bvh+AuQhvApirACIgXABQhTAAhCgKg");
	this.shape_1.setTransform(102.6544,117.7518);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// back_hair
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#C3A16A").s().p("AojZcQg0gOgfgyQgfgyAKg1QgcgCgZgUQgYAmglANQgcAKgggJQgfgJgVgXQgfgkgEg8QgBgTACgXQgYAKgZgBQgfgBgcgPQgdgQgRgZQgZglgDg4IABgfQgjACgcgTQg1gmAChtQABg1AIhBIAGgtQgLAEgMgBQgbgDgWgWQgTgUgKgeQgTg8AQhRQALg2AZhAQALgdAVgwQgJgKgHgOQgGgNgHgbQgmidgJhuQgLiTAkh4IAFgPIgQAUQgMAPgLgDQgJgDgEgRQgch1AfiMQAZhrBCiJQA5h2B7jSIAAgHQACgeAKgbQAJgXAdgwQAbgtAVgfQBriZChhYQBCglAxgBQAfgBAcANIAJAFQAfgOAjgLQAZgPAbgOQBug6BigSQAsgIA3gDQAigCBCAAQBPgBAqAFQBCAHAwAXQA2AaA/BAIBDBFIAPACQAUADAUAJQATAIAYAOQA2AhBKAzQCYBnBLA8QB6BgBQBgQBIBWAwBiQAyBmAWBqQAWBugKBuQgGBHgTBCIAQA6QBMEjgvDYQgEATgJAMQgMAPgOgCQgNgDgNgWIgFgJQAgCLAXC2QAWC4ACB4QACBhgOBEQgRBZguA7QgXAegXgBQgSgBgUgWQgsg0gThUQgLgygGhbQgCASgEAPQAEBZgFBQQgDA1gHAkQgKAwgVAjQgPAbgWAOQgaAQgYgKQgVgIgQghIgMgbIgIAFQgXAOgXAAQgWABgVgLIAAA+QAAAsgDAXQgGAkgQAYQgVAegkAMQglANgigMQgKgDgJgFIgKAFQgmARghgNQgWgJgQgUQgPgSgHgZQgIgagCgxQgGARgHAMQgQAcgcAQQgcARgggBQgfgBgcgRQgcgSgNgcIg3gDQgEAkgZAcQgYAdgiAIQgjAJgjgPQgigOgRggQgKgUgDgdQgCgQAAgkQADjugGj9QgBgoACgWQADgiAKgZIAKgUQAFgNACgJQACgIgBgMIgBgVQgCgoASgkQAKgVAQgMQASgPATACQAVADAPAWQALAOAKAcIA4CeQAQgDANgTIASgjQAJgSAQgUIAfghQAkglAVgMQAKgFAJgDQgBgOgHgHIgMgJQgHgFgDgFQgEgKAJgKQAIgIAMgFQAfgNAWAEQATADASASQgEgvgJgmQgFgYADgKQAGgQAZgLQAggOAXAHQAcAHAZAqQANg9ABhBIAChDQADgmANgZQATgjAngRQAngRAmAKQgEgaAegdQArgsAFgHQAIgOAFgUQACgLADgZQAEgqAGgaQAIglAPgbIAEgGQgmjmhCjhQgIgcAAgQQgBgZAMgPIAHgIIgVhHIg1hqIgnhJQgWgRgKgKIgLgNIgGgCQgWgJgIgEQgSgKgUgVQgWgZgMgLQgUgTgXgPIgaABIhTAAQANAWgDAcQgEAcgTASQgTASgcACQgcACgWgPQgTgNgagtQgYgpgWgMQgOgHgXgDIgmgEQgngHgfgbQgggbgNglQgKgbACgeIg6gCIhngGQhegChAAXQh6BQhIB8IgmBFQgXApgVAZQgcAggjAQQgPAHgPADQhEBngmBgQgYA/gSBOIACABQANAGAAATQAAAGgFAbQgDATADAZIAJAsQARBTgBBoQgBBEgKB2IgSDFQAIAHAGANQATAiAKA+QAJA2ADA1QANgFAPACQAeAEAXAmQAGAJAJAWQAKAUAGALQAHALASAVQARAVAHAMQASAcACAiQACAbgHAZQAHAHAGAIQAKAOAHgBQAEAAAJgIQAbgZAogCQApgCAdAXQAjAcANA3QAFAUADAcIAEAxQACAVAHAJQAGAHAKAFIATAIQAhARARAqQALAaAGAzQAFAwACAwQADBCgJAoQgPA6gpAeIgTAMQgKAHgFAIQgHALgBAXIgDAvQgDAagHAUQgTAyg0AbQgiARgiAAQgSAAgTgFg");
	this.shape_2.setTransform(105.8175,135.9289);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.girlheadtalking, new cjs.Rectangle(-28.1,-27.4,267.90000000000003,326.7), null);


(lib.girlheadquiet = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// eyes
	this.instance = new lib.girlmouth("single",0);
	this.instance.setTransform(90.75,188.8,1,1,0,0,0,26.8,17.8);

	this.instance_1 = new lib.girleyes();
	this.instance_1.setTransform(95.15,120.7,1,1,0,0,0,71.8,15.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	// front_hair
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#C3A16A").s().p("AOYMoIgYgyQgPgcgPgTQgVgdg2gwQiRiBgqgnQhnhghJhSQi7jWhEjVQgSg7gThaQgJgugCgaQgEgoAHgfQAFgYAMgQQAOgTATgEQAMgDAMAEIAAgoQgiAZg2AiQipBuiOBXQhbA3gqAgQioB/hqDcQg/CFgLASQgwBSg/AjQgaAOgZACQgeACgTgQIgGgHIgMAjQgjBmgUAoQgnBLg5AgQgcAQgTgIQgMgGgMgTQheijBokbQByk6DYkKQDWkJEdiyQBPgyA9gWQBSgeBGAIQAnAFAuASQAdALA0AZQAKAFAFAFQAbgPAYgGQAOgEAOAAIAOgPQAXgWAcgKQAegMAbAHQATAFARAOQAPANAJATQARAkgIArIgGAaIANgCQAjgEApAQQAbALArAbIDMB+QA2AkAbAYQApAmARApIAJAcQAGATAEAJQAKAUAiArQBaBwA0CHQAPAlAEAbQAGAlgKAdQgDAIgLAYQgJATgDANQgCAMABAXQACAYgCAKQgCAQgMAbQgMAdgDAOQgEAUAEAbIAKAwQASBRgFBUQgEBLgdAlQgdAlg0AGQgZADgWgGQgFBVgNBbgAJUjXQgCgIgEgEIgDgDIAJAPg");
	this.shape.setTransform(97.7881,75.5326);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// face
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFC3C3").s().p("AkASQQhcgOhIgjQhug2hnh9QgaggiNjJIhriaQg6hagahMQgahNgGhgQgFhHAFhrQAIixAZiCQAgilBAh/QBJiQCPiUQDvj3Dyg4QCmgnDdApQDHAkCCBPQBDApBIBEQAsApBQBWQBTBZAmAyQA+BRAcBNQAmBlgFCHQgDBVgbCdQgaCagSBNQgfB/gsBfQgnBRhBBbQgrA8hSBkQh4CThSBLQh6Bvh+AuQhvApirACIgXABQhTAAhCgKg");
	this.shape_1.setTransform(102.6544,117.7518);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// back_hair
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#C3A16A").s().p("AojZcQg0gOgfgyQgfgyAKg1QgcgCgZgUQgYAmglANQgcAKgggJQgfgJgVgXQgfgkgEg8QgBgTACgXQgYAKgZgBQgfgBgcgPQgdgQgRgZQgZglgDg4IABgfQgjACgcgTQg1gmAChtQABg1AIhBIAGgtQgLAEgMgBQgbgDgWgWQgTgUgKgeQgTg8AQhRQALg2AZhAQALgdAVgwQgJgKgHgOQgGgNgHgbQgmidgJhuQgLiTAkh4IAFgPIgQAUQgMAPgLgDQgJgDgEgRQgch1AfiMQAZhrBCiJQA5h2B7jSIAAgHQACgeAKgbQAJgXAdgwQAbgtAVgfQBriZChhYQBCglAxgBQAfgBAcANIAJAFQAfgOAjgLQAZgPAbgOQBug6BigSQAsgIA3gDQAigCBCAAQBPgBAqAFQBCAHAwAXQA2AaA/BAIBDBFIAPACQAUADAUAJQATAIAYAOQA2AhBKAzQCYBnBLA8QB6BgBQBgQBIBWAwBiQAyBmAWBqQAWBugKBuQgGBHgTBCIAQA6QBMEjgvDYQgEATgJAMQgMAPgOgCQgNgDgNgWIgFgJQAgCLAXC2QAWC4ACB4QACBhgOBEQgRBZguA7QgXAegXgBQgSgBgUgWQgsg0gThUQgLgygGhbQgCASgEAPQAEBZgFBQQgDA1gHAkQgKAwgVAjQgPAbgWAOQgaAQgYgKQgVgIgQghIgMgbIgIAFQgXAOgXAAQgWABgVgLIAAA+QAAAsgDAXQgGAkgQAYQgVAegkAMQglANgigMQgKgDgJgFIgKAFQgmARghgNQgWgJgQgUQgPgSgHgZQgIgagCgxQgGARgHAMQgQAcgcAQQgcARgggBQgfgBgcgRQgcgSgNgcIg3gDQgEAkgZAcQgYAdgiAIQgjAJgjgPQgigOgRggQgKgUgDgdQgCgQAAgkQADjugGj9QgBgoACgWQADgiAKgZIAKgUQAFgNACgJQACgIgBgMIgBgVQgCgoASgkQAKgVAQgMQASgPATACQAVADAPAWQALAOAKAcIA4CeQAQgDANgTIASgjQAJgSAQgUIAfghQAkglAVgMQAKgFAJgDQgBgOgHgHIgMgJQgHgFgDgFQgEgKAJgKQAIgIAMgFQAfgNAWAEQATADASASQgEgvgJgmQgFgYADgKQAGgQAZgLQAggOAXAHQAcAHAZAqQANg9ABhBIAChDQADgmANgZQATgjAngRQAngRAmAKQgEgaAegdQArgsAFgHQAIgOAFgUQACgLADgZQAEgqAGgaQAIglAPgbIAEgGQgmjmhCjhQgIgcAAgQQgBgZAMgPIAHgIIgVhHIg1hqIgnhJQgWgRgKgKIgLgNIgGgCQgWgJgIgEQgSgKgUgVQgWgZgMgLQgUgTgXgPIgaABIhTAAQANAWgDAcQgEAcgTASQgTASgcACQgcACgWgPQgTgNgagtQgYgpgWgMQgOgHgXgDIgmgEQgngHgfgbQgggbgNglQgKgbACgeIg6gCIhngGQhegChAAXQh6BQhIB8IgmBFQgXApgVAZQgcAggjAQQgPAHgPADQhEBngmBgQgYA/gSBOIACABQANAGAAATQAAAGgFAbQgDATADAZIAJAsQARBTgBBoQgBBEgKB2IgSDFQAIAHAGANQATAiAKA+QAJA2ADA1QANgFAPACQAeAEAXAmQAGAJAJAWQAKAUAGALQAHALASAVQARAVAHAMQASAcACAiQACAbgHAZQAHAHAGAIQAKAOAHgBQAEAAAJgIQAbgZAogCQApgCAdAXQAjAcANA3QAFAUADAcIAEAxQACAVAHAJQAGAHAKAFIATAIQAhARARAqQALAaAGAzQAFAwACAwQADBCgJAoQgPA6gpAeIgTAMQgKAHgFAIQgHALgBAXIgDAvQgDAagHAUQgTAyg0AbQgiARgiAAQgSAAgTgFg");
	this.shape_2.setTransform(105.8175,135.9289);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.girlheadquiet, new cjs.Rectangle(-28.1,-27.4,267.90000000000003,326.7), null);


(lib.girlarm1move = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// fingers
	this.instance = new lib.girlhand3("synched",0);
	this.instance.setTransform(-74.4,39,1,1,29.9992,0,0,68.2,49.6);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:37.6,regY:28,rotation:26.0633,x:-92.35,y:5.35},0).wait(1).to({rotation:22.2514,x:-94.5,y:5.85},0).wait(1).to({rotation:18.5635,x:-96.5,y:6.4},0).wait(1).to({rotation:14.9996,x:-98.35,y:7.15},0).wait(1).to({rotation:11.5637,x:-100,y:7.95},0).wait(1).to({rotation:8.2498,x:-101.55,y:8.75},0).wait(1).to({rotation:5.0639,x:-102.9,y:9.65},0).wait(1).to({rotation:1.9999,x:-104.2,y:10.55},0).wait(1).to({rotation:0.8259,x:-104.65,y:10.95},0).wait(1).to({rotation:3.3087,x:-103.65,y:10.15},0).wait(1).to({rotation:5.6787,x:-102.7,y:9.45},0).wait(1).to({rotation:7.941,x:-101.65,y:8.85},0).wait(1).to({rotation:10.0903,x:-100.7,y:8.25},0).wait(1).to({rotation:12.132,x:-99.75,y:7.75},0).wait(1).to({rotation:14.0608,x:-98.8,y:7.35},0).wait(1).to({rotation:15.8819,x:-97.9,y:7},0).wait(1).to({rotation:17.5901,x:-97,y:6.6},0).wait(1).to({rotation:19.1889,x:-96.15,y:6.3},0).wait(1).to({rotation:20.6783,x:-95.35,y:6.1},0).wait(1).to({rotation:22.0582,x:-94.6,y:5.85},0).wait(1).to({rotation:23.3253,x:-93.9,y:5.7},0).wait(1).to({rotation:24.4846,x:-93.25,y:5.6},0).wait(1).to({rotation:25.5311,x:-92.65,y:5.4},0).wait(1).to({rotation:26.4699,x:-92.15,y:5.3},0).wait(1).to({rotation:27.2957,x:-91.65,y:5.25},0).wait(1).to({rotation:28.0122,x:-91.25,y:5.15},0).wait(1).to({rotation:28.6192,x:-90.85},0).wait(1).to({rotation:29.1169,x:-90.55,y:5.1},0).wait(1).to({rotation:29.5016,x:-90.4,y:5},0).wait(1).to({rotation:29.7786,x:-90.15},0).wait(1).to({rotation:29.9427,x:-90.1},0).wait(1).to({rotation:29.9992},0).wait(1));

	// hand
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFC3C3").s().p("AFUK6QhcgVhRgxQhSgxg+hHQgggmgig1QgTgegnhDIhzjFQhjirgzhWQhViOhIhvQglg6gOglQgUg4AQgsQAKgdAiglQAwgxApgHQAzgKA8AnQAkAXAlAmQAVAWAqAzIKGMUQA2BCAZAmQAnA8ANA4QAQBCgVA/QgXBDg4AcQgiAQguAAQgiAAgpgJg");
	this.shape.setTransform(-32.872,91.0306);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(33));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-142.2,-32.2,168,194);


(lib.spinningstar = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// star
	this.instance = new lib.star("synched",0);
	this.instance.setTransform(21.2,22.4,1,1,0,0,0,21.2,22.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:21.3,regY:20.2,rotation:2.4138,x:21.4,y:20.25},0).wait(1).to({rotation:4.8276,x:21.45},0).wait(1).to({rotation:7.2414,x:21.55,y:20.3},0).wait(1).to({rotation:9.6552,x:21.6,y:20.25},0).wait(1).to({rotation:12.069,x:21.75,y:20.3},0).wait(1).to({rotation:14.4828,x:21.8,y:20.35},0).wait(1).to({rotation:16.8966,x:21.95,y:20.4},0).wait(1).to({rotation:19.3103,y:20.35},0).wait(1).to({rotation:21.7241,x:22.05,y:20.4},0).wait(1).to({rotation:24.1379,x:22.15,y:20.45},0).wait(1).to({rotation:26.5517,x:22.2},0).wait(1).to({rotation:28.9655,x:22.3,y:20.5},0).wait(1).to({rotation:31.3793,x:22.4,y:20.6},0).wait(1).to({rotation:33.7931,x:22.45,y:20.65},0).wait(1).to({rotation:36.2069,x:22.5,y:20.7},0).wait(1).to({rotation:38.6207,x:22.6,y:20.8},0).wait(1).to({rotation:41.0345,x:22.65,y:20.85},0).wait(1).to({rotation:43.4483,x:22.7},0).wait(1).to({rotation:45.8621,x:22.8,y:20.95},0).wait(1).to({rotation:48.2759,x:22.85,y:21.05},0).wait(1).to({rotation:50.6897,x:22.9,y:21.1},0).wait(1).to({rotation:53.1034,x:22.95,y:21.2},0).wait(1).to({rotation:55.5172,x:23,y:21.25},0).wait(1).to({rotation:57.931,x:23.05,y:21.3},0).wait(1).to({rotation:60.3448,x:23.1,y:21.4},0).wait(1).to({rotation:62.7586,x:23.15,y:21.5},0).wait(1).to({rotation:65.1724,y:21.6},0).wait(1).to({rotation:67.5862,x:23.2,y:21.65},0).wait(1).to({rotation:70,x:23.25,y:21.7},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.1,0,44.800000000000004,44.7);


(lib.Scene_1_speach_bubble3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// speach_bubble3
	this.instance = new lib.bubble3heart("synched",0,false);
	this.instance.setTransform(795.6,395.4,0.1614,0.1614,0,0,0,249.8,166.7);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(503).to({_off:false},0).wait(1).to({regX:242.6,regY:219.3,scaleX:0.3701,scaleY:0.3701,x:753.1,y:363.5,startPosition:1},0).wait(1).to({scaleX:0.5769,scaleY:0.5769,x:712.1,y:323.55,startPosition:2},0).wait(1).to({scaleX:0.7821,scaleY:0.7821,x:671.5,y:283.9,startPosition:3},0).wait(1).to({scaleX:0.9852,scaleY:0.9852,x:631.25,y:244.6,startPosition:4},0).wait(1).to({scaleX:1,scaleY:1,x:628.35,y:241.8,startPosition:5},0).wait(1).to({startPosition:6},0).wait(1).to({startPosition:7},0).wait(1).to({startPosition:8},0).wait(1).to({startPosition:9},0).wait(1).to({startPosition:10},0).wait(1).to({startPosition:11},0).wait(1).to({startPosition:12},0).wait(1).to({startPosition:13},0).wait(1).to({startPosition:14},0).wait(1).to({startPosition:15},0).wait(1).to({startPosition:16},0).wait(1).to({startPosition:17},0).wait(1).to({startPosition:18},0).wait(1).to({startPosition:19},0).wait(1).to({startPosition:20},0).wait(1).to({startPosition:21},0).wait(1).to({startPosition:22},0).wait(1).to({startPosition:23},0).wait(1).to({startPosition:24},0).wait(1).to({startPosition:25},0).wait(1).to({startPosition:26},0).wait(1).to({startPosition:27},0).wait(1).to({startPosition:28},0).wait(1).to({startPosition:29},0).wait(1).to({startPosition:30},0).wait(1).to({startPosition:31},0).wait(1).to({startPosition:32},0).wait(1).to({startPosition:33},0).wait(1).to({startPosition:34},0).wait(1).to({startPosition:35},0).wait(1).to({startPosition:36},0).wait(1).to({startPosition:37},0).wait(1).to({startPosition:38},0).wait(1).to({startPosition:39},0).wait(1).to({startPosition:40},0).wait(1).to({startPosition:41},0).wait(1).to({startPosition:42},0).wait(1).to({startPosition:43},0).wait(1).to({startPosition:44},0).wait(1).to({startPosition:45},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:46},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_speach_bubble2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// speach_bubble2
	this.instance = new lib.bubble2("synched",0,false);
	this.instance.setTransform(894.9,439.15,0.1614,0.1614,0,0,0,249.8,166.7);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(471).to({_off:false},0).wait(1).to({regX:341.9,regY:205.3,scaleX:0.6113,scaleY:0.6113,x:700.85,y:511.75,startPosition:1},0).wait(1).to({scaleX:0.6188,scaleY:0.6188,x:697.35,y:512.85,startPosition:2},0).wait(1).to({startPosition:3},0).wait(1).to({startPosition:4},0).wait(1).to({startPosition:5},0).wait(1).to({startPosition:6},0).wait(1).to({startPosition:7},0).wait(1).to({startPosition:8},0).wait(1).to({startPosition:9},0).wait(1).to({startPosition:10},0).wait(1).to({startPosition:11},0).wait(1).to({startPosition:12},0).wait(1).to({startPosition:13},0).wait(1).to({startPosition:14},0).wait(1).to({startPosition:15},0).wait(1).to({startPosition:16},0).wait(1).to({startPosition:17},0).wait(1).to({startPosition:18},0).wait(1).to({startPosition:19},0).wait(1).to({startPosition:20},0).wait(1).to({startPosition:21},0).wait(1).to({startPosition:21},0).wait(1).to({startPosition:21},0).wait(1).to({startPosition:21},0).wait(1).to({startPosition:21},0).wait(1).to({startPosition:21},0).wait(1).to({startPosition:21},0).wait(1).to({startPosition:21},0).wait(1).to({startPosition:21},0).wait(1).to({startPosition:21},0).wait(1).to({startPosition:21},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_speach_bubble1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// speach_bubble1
	this.instance = new lib.bubble1("synched",0,false);
	this.instance.setTransform(856.55,298.75,0.1614,0.1614,0,0,0,249.8,166.7);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(426).to({_off:false},0).wait(1).to({regX:242.6,regY:222.5,scaleX:0.4945,scaleY:0.4945,x:765.2,y:282.8,startPosition:1},0).wait(1).to({scaleX:0.8234,scaleY:0.8234,x:676.15,y:258.25,startPosition:2},0).wait(1).to({scaleX:1,scaleY:1,x:628.35,y:245.05,startPosition:3},0).wait(1).to({startPosition:4},0).wait(1).to({startPosition:5},0).wait(1).to({startPosition:6},0).wait(1).to({startPosition:7},0).wait(1).to({startPosition:8},0).wait(1).to({startPosition:9},0).wait(1).to({startPosition:10},0).wait(1).to({startPosition:11},0).wait(1).to({startPosition:12},0).wait(1).to({startPosition:13},0).wait(1).to({startPosition:14},0).wait(1).to({startPosition:15},0).wait(1).to({startPosition:16},0).wait(1).to({startPosition:17},0).wait(1).to({startPosition:18},0).wait(1).to({startPosition:19},0).wait(1).to({startPosition:20},0).wait(1).to({startPosition:21},0).wait(1).to({startPosition:22},0).wait(1).to({startPosition:23},0).wait(1).to({startPosition:24},0).wait(1).to({startPosition:25},0).wait(1).to({startPosition:26},0).wait(1).to({startPosition:27},0).wait(1).to({startPosition:28},0).wait(1).to({startPosition:29},0).wait(1).to({startPosition:30},0).wait(1).to({startPosition:31},0).wait(1).to({startPosition:32},0).wait(1).to({startPosition:33},0).wait(1).to({startPosition:34},0).wait(1).to({startPosition:35},0).wait(1).to({startPosition:36},0).wait(1).to({startPosition:37},0).wait(1).to({startPosition:38},0).wait(1).to({startPosition:39},0).wait(1).to({startPosition:40},0).wait(1).to({startPosition:41},0).wait(1).to({startPosition:42},0).wait(1).to({startPosition:43},0).wait(1).to({startPosition:44},0).wait(1).to({startPosition:45},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:47},0).wait(1).to({startPosition:48},0).wait(1).to({startPosition:49},0).wait(1).to({startPosition:50},0).wait(1).to({startPosition:51},0).wait(1).to({startPosition:52},0).wait(1).to({startPosition:52},0).wait(1).to({startPosition:52},0).wait(1).to({startPosition:52},0).wait(1).to({startPosition:52},0).wait(1).to({startPosition:52},0).wait(1).to({startPosition:52},0).wait(1).to({startPosition:52},0).wait(1).to({startPosition:52},0).wait(1).to({startPosition:52},0).wait(1).to({startPosition:52},0).wait(1).to({startPosition:52},0).wait(1).to({startPosition:52},0).wait(1).to({startPosition:52},0).wait(1).to({startPosition:52},0).wait(1).to({startPosition:52},0).wait(1).to({startPosition:52},0).wait(1).to({startPosition:52},0).wait(1).to({startPosition:52},0).wait(1).to({startPosition:52},0).wait(1).to({startPosition:52},0).wait(1).to({startPosition:52},0).wait(1).to({startPosition:52},0).wait(1).to({startPosition:52},0).wait(1).to({startPosition:52},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_buttons = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// buttons
	this.start = new lib.button1();
	this.start.name = "start";
	this.start.setTransform(682.5,285.35,0.9999,0.9999,0,0,0,0.1,0.1);
	new cjs.ButtonHelper(this.start, 0, 1, 2);

	this.replay = new lib.button2();
	this.replay.name = "replay";
	this.replay.setTransform(628.85,219.4,1.3777,1.3777);
	new cjs.ButtonHelper(this.replay, 0, 1, 2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.start}]}).to({state:[]},2).to({state:[{t:this.replay}]},615).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_both = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// both
	this.instance = new lib.backsandhill("synched",0,false);
	this.instance.setTransform(643.05,1173.9,1,1,0,0,0,896.4,342.1);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(227).to({_off:false},0).wait(1).to({regY:337.3,y:1158.7,startPosition:1},0).wait(1).to({y:1148.4,startPosition:2},0).wait(1).to({y:1138.25,startPosition:3},0).wait(1).to({y:1128.2,startPosition:4},0).wait(1).to({y:1118.3,startPosition:5},0).wait(1).to({y:1108.5,startPosition:6},0).wait(1).to({y:1098.8,startPosition:7},0).wait(1).to({y:1089.25,startPosition:8},0).wait(1).to({y:1079.8,startPosition:9},0).wait(1).to({y:1070.45,startPosition:10},0).wait(1).to({y:1061.25,startPosition:11},0).wait(1).to({y:1052.1,startPosition:12},0).wait(1).to({y:1043.15,startPosition:13},0).wait(1).to({y:1034.3,startPosition:14},0).wait(1).to({y:1025.55,startPosition:15},0).wait(1).to({y:1016.9,startPosition:16},0).wait(1).to({y:1008.4,startPosition:17},0).wait(1).to({y:1000,startPosition:18},0).wait(1).to({y:991.7,startPosition:19},0).wait(1).to({y:983.55,startPosition:20},0).wait(1).to({y:975.5,startPosition:21},0).wait(1).to({y:967.6,startPosition:22},0).wait(1).to({y:959.75,startPosition:23},0).wait(1).to({y:952.1,startPosition:24},0).wait(1).to({y:944.5,startPosition:25},0).wait(1).to({y:937.05,startPosition:26},0).wait(1).to({y:929.7,startPosition:27},0).wait(1).to({y:922.5,startPosition:28},0).wait(1).to({y:915.4,startPosition:29},0).wait(1).to({y:908.4,startPosition:30},0).wait(1).to({y:901.55,startPosition:31},0).wait(1).to({y:894.8,startPosition:32},0).wait(1).to({y:888.15,startPosition:33},0).wait(1).to({y:881.65,startPosition:34},0).wait(1).to({y:875.25,startPosition:35},0).wait(1).to({y:868.95,startPosition:36},0).wait(1).to({y:862.8,startPosition:37},0).wait(1).to({y:856.75,startPosition:38},0).wait(1).to({y:850.8,startPosition:39},0).wait(1).to({y:845,startPosition:40},0).wait(1).to({y:839.3,startPosition:41},0).wait(1).to({y:833.75,startPosition:42},0).wait(1).to({y:828.25,startPosition:43},0).wait(1).to({y:822.9,startPosition:44},0).wait(1).to({y:817.7,startPosition:45},0).wait(1).to({y:812.6,startPosition:46},0).wait(1).to({y:807.6,startPosition:47},0).wait(1).to({y:802.75,startPosition:48},0).wait(1).to({y:797.95,startPosition:49},0).wait(1).to({y:793.35,startPosition:50},0).wait(1).to({y:788.8,startPosition:51},0).wait(1).to({y:784.4,startPosition:52},0).wait(1).to({y:780.1,startPosition:53},0).wait(1).to({y:775.95,startPosition:54},0).wait(1).to({y:771.9,startPosition:55},0).wait(1).to({y:767.95,startPosition:56},0).wait(1).to({y:764.15,startPosition:57},0).wait(1).to({y:760.45,startPosition:58},0).wait(1).to({y:756.85,startPosition:59},0).wait(1).to({y:753.4,startPosition:60},0).wait(1).to({y:750.05,startPosition:61},0).wait(1).to({y:746.85,startPosition:62},0).wait(1).to({y:743.7,startPosition:63},0).wait(1).to({y:740.75,startPosition:64},0).wait(1).to({y:737.85,startPosition:65},0).wait(1).to({y:735.1,startPosition:66},0).wait(1).to({y:732.45,startPosition:67},0).wait(1).to({y:729.95,startPosition:68},0).wait(1).to({y:727.5,startPosition:69},0).wait(1).to({y:725.25,startPosition:70},0).wait(1).to({y:723.05,startPosition:71},0).wait(1).to({y:721,startPosition:72},0).wait(1).to({y:719.05,startPosition:73},0).wait(1).to({y:717.25,startPosition:74},0).wait(1).to({y:715.55,startPosition:75},0).wait(1).to({y:713.95,startPosition:76},0).wait(1).to({y:712.5,startPosition:77},0).wait(1).to({y:711.15,startPosition:78},0).wait(1).to({y:709.9,startPosition:79},0).wait(1).to({y:708.8,startPosition:80},0).wait(1).to({y:707.8,startPosition:81},0).wait(1).to({y:706.9,startPosition:82},0).wait(1).to({y:706.15,startPosition:83},0).wait(1).to({y:705.5,startPosition:84},0).wait(1).to({y:704.95,startPosition:85},0).wait(1).to({y:704.55,startPosition:86},0).wait(1).to({y:704.25,startPosition:87},0).wait(1).to({y:704.1,startPosition:88},0).wait(1).to({y:704.05},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.johnnytalking = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_3
	this.instance = new lib.johnnyheadtalking();
	this.instance.setTransform(296.8,264.2,1,1,-10.9708,0,0,128.1,283);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:105.1,regY:150.2,rotation:-10.4875,x:250,y:137.8},0).wait(1).to({rotation:-10.0036,x:251.1,y:137.45},0).wait(1).to({rotation:-9.5198,x:252.15,y:137.05},0).wait(1).to({rotation:-9.0359,x:253.25,y:136.7},0).wait(1).to({rotation:-8.552,x:254.35,y:136.3},0).wait(1).to({rotation:-8.0681,x:255.4,y:135.95},0).wait(1).to({rotation:-7.5842,x:256.45,y:135.65},0).wait(1).to({rotation:-7.1003,x:257.55,y:135.35},0).wait(1).to({rotation:-6.6165,x:258.65,y:135},0).wait(1).to({rotation:-6.1326,x:259.75,y:134.7},0).wait(1).to({rotation:-5.6487,x:260.85,y:134.35},0).wait(1).to({rotation:-5.1648,x:261.9,y:134.1},0).wait(1).to({rotation:-4.6809,x:263,y:133.8},0).wait(1).to({rotation:-4.197,x:264.1,y:133.5},0).wait(1).to({rotation:-3.7132,x:265.3,y:133.25},0).wait(1).to({rotation:-3.2293,x:266.35,y:133},0).wait(1).to({rotation:-2.7454,x:267.5,y:132.75},0).wait(1).to({rotation:-2.2615,x:268.55,y:132.5},0).wait(1).to({rotation:-1.7776,x:269.65,y:132.3},0).wait(1).to({rotation:-1.2938,x:270.8,y:132.05},0).wait(1).to({rotation:-0.8099,x:271.9,y:131.8},0).wait(1).to({rotation:-0.326,x:273.05,y:131.6},0).wait(1).to({rotation:0.1579,x:274.15,y:131.45},0).wait(1).to({rotation:0.6418,x:275.25,y:131.25},0).wait(1).to({rotation:1.1257,x:276.45,y:131},0).wait(1).to({rotation:1.6095,x:277.55,y:130.9},0).wait(1).to({rotation:2.0934,x:278.65,y:130.75},0).wait(1).to({rotation:2.5773,x:279.8,y:130.55},0).wait(1).to({rotation:3.0612,x:280.95,y:130.45},0).wait(1).to({rotation:3.5451,x:282.05,y:130.3},0).wait(1).to({rotation:4.029,x:283.2,y:130.25},0).wait(1).to({rotation:3.5878,x:282.15,y:130.3},0).wait(1).to({rotation:3.1466,x:281.1,y:130.4},0).wait(1).to({rotation:2.7054,x:280.1,y:130.55},0).wait(1).to({rotation:2.2642,x:279,y:130.7},0).wait(1).to({rotation:1.823,x:278,y:130.8},0).wait(1).to({rotation:1.3818,x:277,y:131},0).wait(1).to({rotation:0.9406,x:276,y:131.1},0).wait(1).to({rotation:0.4995,x:274.95,y:131.3},0).wait(1).to({rotation:0.0583,x:273.95,y:131.45},0).wait(1).to({rotation:-0.3829,x:272.9,y:131.65},0).wait(1).to({rotation:-0.8241,x:271.9,y:131.85},0).wait(1).to({rotation:-1.2653,x:270.8,y:132.05},0).wait(1).to({rotation:-1.7065,x:269.8,y:132.2},0).wait(1).to({rotation:-2.1477,x:268.85,y:132.45},0).wait(1).to({rotation:-2.5889,x:267.85,y:132.65},0).wait(1).to({rotation:-3.03,x:266.8,y:132.9},0).wait(1).to({rotation:-3.4712,x:265.8,y:133.1},0).wait(1).to({rotation:-3.9124,x:264.8,y:133.4},0).wait(1).to({rotation:-4.3536,x:263.8,y:133.55},0).wait(1).to({rotation:-4.7948,x:262.8,y:133.85},0).wait(1).to({rotation:-5.236,x:261.75,y:134.1},0).wait(1).to({rotation:-5.6772,x:260.75,y:134.4},0).wait(1).to({rotation:-6.1183,x:259.75,y:134.7},0).wait(1).to({rotation:-6.5595,x:258.75,y:134.95},0).wait(1).to({rotation:-7.0007,x:257.75,y:135.3},0).wait(1).to({rotation:-7.4419,x:256.75,y:135.55},0).wait(1).to({rotation:-7.8831,x:255.8,y:135.85},0).wait(1).to({rotation:-8.3243,x:254.8,y:136.15},0).wait(1).to({rotation:-8.7655,x:253.8,y:136.5},0).wait(1).to({rotation:-9.2067,x:252.85,y:136.8},0).wait(1).to({rotation:-9.6478,x:251.8,y:137.2},0).wait(1).to({rotation:-10.089,x:250.85,y:137.55},0).wait(1).to({rotation:-10.5302,x:249.95,y:137.85},0).wait(1).to({rotation:-10.9714,x:248.95,y:138.25},0).wait(1));

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#0033CC").s().p("AMrckQg/gRg0hFQgZgjg0hjQgvhYhFhkQguhChVhwQhdh7g2hBQhVhmhOhJQiJiDiqhdQhmg3hjgiQhTgdh9gdQiOgehGgRQj8g9iJhmQgwgjhBhAIhrhpIijiIQhghSgyhFQg9hVgDhNQAAgJABgJQCCglC0gjQBqgWDVgnQEtg6DNhCIBCgGQCAgPCLg2QBigmBzg+IBPhwQBch/BRhgQBXhnBIg4QAsgjBIgrIB4hIQA4gjBihIQBphNAwggQB5hPBggcQBHgUBUgDIABAAQBdgrBsAGQBpAGBcAzQBZAwBDBVQBBBRAgBlQAnB4gCCwQgCCyg7F2Qg6FoACC/QABBAgDAbQgHAygXAhQg7BViygPQhlgJh8gXQhMgOiSggQhDgQgjgOQg3gXgcgmQglgwADhOQABguAVheQAdiBAXi/IAGg2Ig4BMQgsA6grAnQgkAjgzAkQgiAYg8AmQhpBBhKAoIAsAcQBRAzAqAdQBCAwAuAuQAuAtAxBHIBUB+QDDEpDtEHQAiAlAVAUQAgAdAeASIA+AgQAnASAVARQAeAZAQAlIAGADQApAUAWAlQAWAmgCAtQgDAugaAiQgUAagoAZIhGAoQg8Amg7BCQglApg+BVQgfAsgLAYIgLAeQgHATgFAKQgWAxgyAcQgxAcg1gGQgZgCgWgKQgeAhgtANQgZAIgYAAQgUAAgUgGg");
	this.shape.setTransform(333.8465,644.8718);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(66));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E4A985").s().p("ARDdHQiUgbhDhOQgxg5gEhQIAAgdIgYgMQg4gdhEg2Qh7hig+hgIglg+IgDgGQgpgcgrgrQhKhQgmgnQgogphLhAQhWhLgfgdQgwguhEhKIhxh8QiKiThzhFQhIgrhQgbQhRgbhxgRIjHgXQj8gciBhEQhGglhOhCQgTgQh0hpIiIh9QhLhKgshCQgXgigUglQBzgdCPgrQFShmCDgcQB/gbECgsQDgguCOhPQBog6BthjQBKhEBvh8QBqh4A1hMIAWghQCCg8DMh9QD0iVBagvQBig0BLgYQBigeBWAHQBoAJBYBCQBYBBAmBhQAeBMABBoQABA8gNB+QgvHpABHrQAABggCApQgEBMgOA7QgOA5gaAwIB8BDQA/AjAeAVQAxAiAdAmQApA3AHBHQAHBHgfA9QgeA9g+AkQg9AlhEgEQgugDg0gWQgggNg8ggQh6hDg5gpIg0gmQgfgXgXgNQgSgKhtgvQhOghgngmQgogogTg9QgSg3ADhAQACg2AQg/QAJgjAUg/QgPhIgChUQgDhQAKiVQAKieAAhHQg6AxhPArIgCADQgcAlgrAmQgaAYg3AqQg9AwgiAZQg1AmguAbQhuA+iZAnQBdAZA0ATQBjAkBGAvQB8BVB0DBIBfClQA5BjAsA9QAaAkBBBQQA9BKAeAsIAXAjIBGAzQDaCkBGC0IAJAbIALgJIBPg7QAxglAdgZIBAg5QAmgiAggRQBNgqBeAQQBdARA6BDQA0A7AOBVQAOBQgWBTQgTBIgtBMQgkA8g7BJQhhB3hhBLQh2Bah7AeQhCAQhIAAQg/AAhEgMg");
	this.shape_1.setTransform(354.6604,653.2296);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(66));

	// Layer_2
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#6633FF").s().p("AzHaKQgtgMgdgdQgugsgHhQQgFg3ANhbQA+mjAtmzQAXjSAIhBQAUiaAch1QAKgpAMgmQgkASgjADQgwAFgxgXQgugWgjgoQgJgJgtg8QgggqgbgUQgagShNgdQhEgagcgeQgXgXgJghQgKggAGggQAFgdARgaQgKgRgEgUQgJgrATg0QANgjAhg2QA2haAggxQAyhMAvg4QAYgcApgsIBChGQBehuAwg1QBVheBKgyQBSg3BwgjQBWgcB9gUQBMgNA1gEQBGgEA6AKQA3AJAvAXQAQAAASAEQAzALAeAnQAOATAPAjQARAqAIAOQApBFBeAiQAlANAwAIQAcAEA7AGIDXAXQA5AGAcgFQAxgIAWgiQALgQAGgbQAFgfAEgPQAMgtAlghQAmghAugFQAugGAsAXQASgJAVgGQA5gQA+AJQBhAOB3BPQB4BQBIBVQA9BJA2BqQAiBDA1CCQAqBmATA/QAZBTATCOQAXCxAKA0QATBdABAnQACBLgkAsQglAuhJANQgvAIhYgEQifgGieALIhLADQgqABgggFIgPgDIgnKqQgHBxgEA5QgIBegKBLQgJA+gMAqQgRA4gcAnQgpA6hNAnQg6AdhaAWQiMAjjHAWQjkAWhxANQniA2l/CBQg9AVgVAGQgvANgmADIgVAAQgiAAgegIg");
	this.shape_2.setTransform(266.9544,445.1474);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(66));

	// Layer_1
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E4A985").s().p("EgfCAipQg2gMgkgxQgkgxADg4QAEg4AngtQAogtA3gMQgjgSgzgKIhbgMQg3gHgkgNQgwgQgdgeQgagagMgkQgMgkAEglQAFglAUggQATghAegWIAYgQQAOgJAIgJQALgMAPgeQAigzBHgRQAcgHAjgCQAWgBAqAAQBJAAAkACQA9AEAwAKIAFABIDOujQAciDAThLQAdhxAghZQAsh9BWirQCSkkCSjDQC6j2DbiMQDTiGC1ANQB5AIB3BIQAagLARgMQBFgtAshvQBPjAgNkOQgEhWADghQAFhCAdgqQAfgvA7gSIAMgEQAPgdAYgZQAogsA3gRQA3gSA6AMQA7AMArAmQA1AtAcBQQAVA9AIBaQACAWALDcQAHCSAVBeQAOBAAdBNQAQAtAmBdQAJATAHAGQAHAFAMACIAVABQAfABAeAKIAQgHQBbgiBXAMQB2ARBrBnQBOBLBXCKQBBBmAnBKQA0BjAcBZQAtCOAJDAQADBTgGECQgJGaAcGbIACgCIAXgbQANgPANgGQAPgIAUgCQANgBAYAAQAYABANADQAUAFALALQAPAOAGAeIAKA0QAQAAAigEQAhgEASAAQA9AAAfAhQAWAXAFAlQAFApgQAsQgOAngeAjQgaAegmAdIgyAjQAKAAAJACQAsAKAfAlQAfAlACAtQACAtgcAoQgbAngsAOQgTAFgZACQgQABgcgBQhygEg0gEQhcgHhHgRQgogJgWgNQgvARgzAAQhOABhHgoQhHgngqhCQgrhDgPhiQgJg9gCh1IgSzTIgBgwQgpDcgXCMQhEGZgXFLQgHBgAABBQAABXAMBIQAKA5AWBMQANAsAdBXIAZBOIgFgCQhtg7iDACQiBADhuA8Ig+AkQgkAVgdAHQgUAFgZABQgRABgeAAQhPgEgogBQhFAAgyAJQgtAJhOAdQhTAfgnAJQhLASiRgEQibgDhFAMQiPAZhxBlQgwhRgghRQhMjBgPkDQgJihAQk0QAIiqAHhcQALiRATh0QAUh9AmiZQAYhiAyixQggA6gmBIQg2BlgbA3QgrBYgdBJQgiBVghBwQgTA+glCLQhREygkCTQg+D9glDMQgVBwgOAxQgbBYguA4QgqAzg7AaQgdAqgrAeQgfAWgsASQgaALg3ATIjBBBQg2ASgdAFQgXAFgVAAQgVAAgTgFg");
	this.shape_3.setTransform(236.384,405.9184);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(66));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-28.1,551.4,868.9);


(lib.johnnynotalking = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_3
	this.instance = new lib.johnnyheadquiet();
	this.instance.setTransform(296.8,264.15,1,1,-10.9708,0,0,128.1,282.9);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:105.1,regY:150.2,rotation:-10.4875,x:250,y:137.85},0).wait(1).to({rotation:-10.0036,x:251.1,y:137.5},0).wait(1).to({rotation:-9.5198,x:252.15,y:137.1},0).wait(1).to({rotation:-9.0359,x:253.25,y:136.75},0).wait(1).to({rotation:-8.552,x:254.35,y:136.35},0).wait(1).to({rotation:-8.0681,x:255.4,y:136},0).wait(1).to({rotation:-7.5842,x:256.45,y:135.7},0).wait(1).to({rotation:-7.1003,x:257.55,y:135.4},0).wait(1).to({rotation:-6.6165,x:258.65,y:135.05},0).wait(1).to({rotation:-6.1326,x:259.75,y:134.75},0).wait(1).to({rotation:-5.6487,x:260.85,y:134.4},0).wait(1).to({rotation:-5.1648,x:261.9,y:134.15},0).wait(1).to({rotation:-4.6809,x:263,y:133.85},0).wait(1).to({rotation:-4.197,x:264.1,y:133.55},0).wait(1).to({rotation:-3.7132,x:265.3,y:133.3},0).wait(1).to({rotation:-3.2293,x:266.35,y:133.05},0).wait(1).to({rotation:-2.7454,x:267.5,y:132.8},0).wait(1).to({rotation:-2.2615,x:268.55,y:132.55},0).wait(1).to({rotation:-1.7776,x:269.65,y:132.35},0).wait(1).to({rotation:-1.2938,x:270.8,y:132.1},0).wait(1).to({rotation:-0.8099,x:271.9,y:131.85},0).wait(1).to({rotation:-0.326,x:273,y:131.65},0).wait(1).to({rotation:0.1579,x:274.15,y:131.5},0).wait(1).to({rotation:0.6418,x:275.25,y:131.3},0).wait(1).to({rotation:1.1257,x:276.4,y:131.05},0).wait(1).to({rotation:1.6095,x:277.55,y:130.95},0).wait(1).to({rotation:2.0934,x:278.65,y:130.8},0).wait(1).to({rotation:2.5773,x:279.8,y:130.6},0).wait(1).to({rotation:3.0612,x:280.9,y:130.5},0).wait(1).to({rotation:3.5451,x:282,y:130.35},0).wait(1).to({rotation:4.029,x:283.2,y:130.3},0).wait(1).to({rotation:3.5878,x:282.15,y:130.4},0).wait(1).to({rotation:3.1466,x:281.1,y:130.45},0).wait(1).to({rotation:2.7054,x:280.1,y:130.6},0).wait(1).to({rotation:2.2642,x:279,y:130.75},0).wait(1).to({rotation:1.823,x:278,y:130.85},0).wait(1).to({rotation:1.3818,x:277,y:131.05},0).wait(1).to({rotation:0.9406,x:276,y:131.15},0).wait(1).to({rotation:0.4995,x:274.95,y:131.35},0).wait(1).to({rotation:0.0583,x:273.9,y:131.5},0).wait(1).to({rotation:-0.3829,x:272.9,y:131.7},0).wait(1).to({rotation:-0.8241,x:271.9,y:131.9},0).wait(1).to({rotation:-1.2653,x:270.8,y:132.1},0).wait(1).to({rotation:-1.7065,x:269.8,y:132.25},0).wait(1).to({rotation:-2.1477,x:268.8,y:132.5},0).wait(1).to({rotation:-2.5889,x:267.85,y:132.7},0).wait(1).to({rotation:-3.03,x:266.8,y:132.95},0).wait(1).to({rotation:-3.4712,x:265.8,y:133.15},0).wait(1).to({rotation:-3.9124,x:264.75,y:133.45},0).wait(1).to({rotation:-4.3536,x:263.75,y:133.6},0).wait(1).to({rotation:-4.7948,x:262.8,y:133.9},0).wait(1).to({rotation:-5.236,x:261.75,y:134.15},0).wait(1).to({rotation:-5.6772,x:260.75,y:134.45},0).wait(1).to({rotation:-6.1183,x:259.75,y:134.75},0).wait(1).to({rotation:-6.5595,x:258.75,y:135},0).wait(1).to({rotation:-7.0007,x:257.75,y:135.35},0).wait(1).to({rotation:-7.4419,x:256.75,y:135.6},0).wait(1).to({rotation:-7.8831,x:255.8,y:135.9},0).wait(1).to({rotation:-8.3243,x:254.8,y:136.2},0).wait(1).to({rotation:-8.7655,x:253.8,y:136.55},0).wait(1).to({rotation:-9.2067,x:252.85,y:136.85},0).wait(1).to({rotation:-9.6478,x:251.8,y:137.25},0).wait(1).to({rotation:-10.089,x:250.85,y:137.6},0).wait(1).to({rotation:-10.5302,x:249.95,y:137.9},0).wait(1).to({rotation:-10.9714,x:248.95,y:138.3},0).wait(1));

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#0033CC").s().p("AMrckQg/gRg0hFQgZgjg0hjQgvhYhFhkQguhChVhwQhdh7g2hBQhVhmhOhJQiJiDiqhdQhmg3hjgiQhTgdh9gdQiOgehGgRQj8g9iJhmQgwgjhBhAIhrhpIijiIQhghSgyhFQg9hVgDhNQAAgJABgJQCCglC0gjQBqgWDVgnQEtg6DNhCIBCgGQCAgPCLg2QBigmBzg+IBPhwQBch/BRhgQBXhnBIg4QAsgjBIgrIB4hIQA4gjBihIQBphNAwggQB5hPBggcQBHgUBUgDIABAAQBdgrBsAGQBpAGBcAzQBZAwBDBVQBBBRAgBlQAnB4gCCwQgCCyg7F2Qg6FoACC/QABBAgDAbQgHAygXAhQg7BViygPQhlgJh8gXQhMgOiSggQhDgQgjgOQg3gXgcgmQglgwADhOQABguAVheQAdiBAXi/IAGg2Ig4BMQgsA6grAnQgkAjgzAkQgiAYg8AmQhpBBhKAoIAsAcQBRAzAqAdQBCAwAuAuQAuAtAxBHIBUB+QDDEpDtEHQAiAlAVAUQAgAdAeASIA+AgQAnASAVARQAeAZAQAlIAGADQApAUAWAlQAWAmgCAtQgDAugaAiQgUAagoAZIhGAoQg8Amg7BCQglApg+BVQgfAsgLAYIgLAeQgHATgFAKQgWAxgyAcQgxAcg1gGQgZgCgWgKQgeAhgtANQgZAIgYAAQgUAAgUgGg");
	this.shape.setTransform(333.8465,644.8718);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(66));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E4A985").s().p("ARDdHQiUgbhDhOQgxg5gEhQIAAgdIgYgMQg4gdhEg2Qh7hig+hgIglg+IgDgGQgpgcgrgrQhKhQgmgnQgogphLhAQhWhLgfgdQgwguhEhKIhxh8QiKiThzhFQhIgrhQgbQhRgbhxgRIjHgXQj8gciBhEQhGglhOhCQgTgQh0hpIiIh9QhLhKgshCQgXgigUglQBzgdCPgrQFShmCDgcQB/gbECgsQDgguCOhPQBog6BthjQBKhEBvh8QBqh4A1hMIAWghQCCg8DMh9QD0iVBagvQBig0BLgYQBigeBWAHQBoAJBYBCQBYBBAmBhQAeBMABBoQABA8gNB+QgvHpABHrQAABggCApQgEBMgOA7QgOA5gaAwIB8BDQA/AjAeAVQAxAiAdAmQApA3AHBHQAHBHgfA9QgeA9g+AkQg9AlhEgEQgugDg0gWQgggNg8ggQh6hDg5gpIg0gmQgfgXgXgNQgSgKhtgvQhOghgngmQgogogTg9QgSg3ADhAQACg2AQg/QAJgjAUg/QgPhIgChUQgDhQAKiVQAKieAAhHQg6AxhPArIgCADQgcAlgrAmQgaAYg3AqQg9AwgiAZQg1AmguAbQhuA+iZAnQBdAZA0ATQBjAkBGAvQB8BVB0DBIBfClQA5BjAsA9QAaAkBBBQQA9BKAeAsIAXAjIBGAzQDaCkBGC0IAJAbIALgJIBPg7QAxglAdgZIBAg5QAmgiAggRQBNgqBeAQQBdARA6BDQA0A7AOBVQAOBQgWBTQgTBIgtBMQgkA8g7BJQhhB3hhBLQh2Bah7AeQhCAQhIAAQg/AAhEgMg");
	this.shape_1.setTransform(354.6604,653.2296);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(66));

	// Layer_2
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#6633FF").s().p("AzHaKQgtgMgdgdQgugsgHhQQgFg3ANhbQA+mjAtmzQAXjSAIhBQAUiaAch1QAKgpAMgmQgkASgjADQgwAFgxgXQgugWgjgoQgJgJgtg8QgggqgbgUQgagShNgdQhEgagcgeQgXgXgJghQgKggAGggQAFgdARgaQgKgRgEgUQgJgrATg0QANgjAhg2QA2haAggxQAyhMAvg4QAYgcApgsIBChGQBehuAwg1QBVheBKgyQBSg3BwgjQBWgcB9gUQBMgNA1gEQBGgEA6AKQA3AJAvAXQAQAAASAEQAzALAeAnQAOATAPAjQARAqAIAOQApBFBeAiQAlANAwAIQAcAEA7AGIDXAXQA5AGAcgFQAxgIAWgiQALgQAGgbQAFgfAEgPQAMgtAlghQAmghAugFQAugGAsAXQASgJAVgGQA5gQA+AJQBhAOB3BPQB4BQBIBVQA9BJA2BqQAiBDA1CCQAqBmATA/QAZBTATCOQAXCxAKA0QATBdABAnQACBLgkAsQglAuhJANQgvAIhYgEQifgGieALIhLADQgqABgggFIgPgDIgnKqQgHBxgEA5QgIBegKBLQgJA+gMAqQgRA4gcAnQgpA6hNAnQg6AdhaAWQiMAjjHAWQjkAWhxANQniA2l/CBQg9AVgVAGQgvANgmADIgVAAQgiAAgegIg");
	this.shape_2.setTransform(266.9544,445.1474);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(66));

	// Layer_1
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E4A985").s().p("EgfCAipQg2gMgkgxQgkgxADg4QAEg4AngtQAogtA3gMQgjgSgzgKIhbgMQg3gHgkgNQgwgQgdgeQgagagMgkQgMgkAEglQAFglAUggQATghAegWIAYgQQAOgJAIgJQALgMAPgeQAigzBHgRQAcgHAjgCQAWgBAqAAQBJAAAkACQA9AEAwAKIAFABIDOujQAciDAThLQAdhxAghZQAsh9BWirQCSkkCSjDQC6j2DbiMQDTiGC1ANQB5AIB3BIQAagLARgMQBFgtAshvQBPjAgNkOQgEhWADghQAFhCAdgqQAfgvA7gSIAMgEQAPgdAYgZQAogsA3gRQA3gSA6AMQA7AMArAmQA1AtAcBQQAVA9AIBaQACAWALDcQAHCSAVBeQAOBAAdBNQAQAtAmBdQAJATAHAGQAHAFAMACIAVABQAfABAeAKIAQgHQBbgiBXAMQB2ARBrBnQBOBLBXCKQBBBmAnBKQA0BjAcBZQAtCOAJDAQADBTgGECQgJGaAcGbIACgCIAXgbQANgPANgGQAPgIAUgCQANgBAYAAQAYABANADQAUAFALALQAPAOAGAeIAKA0QAQAAAigEQAhgEASAAQA9AAAfAhQAWAXAFAlQAFApgQAsQgOAngeAjQgaAegmAdIgyAjQAKAAAJACQAsAKAfAlQAfAlACAtQACAtgcAoQgbAngsAOQgTAFgZACQgQABgcgBQhygEg0gEQhcgHhHgRQgogJgWgNQgvARgzAAQhOABhHgoQhHgngqhCQgrhDgPhiQgJg9gCh1IgSzTIgBgwQgpDcgXCMQhEGZgXFLQgHBgAABBQAABXAMBIQAKA5AWBMQANAsAdBXIAZBOIgFgCQhtg7iDACQiBADhuA8Ig+AkQgkAVgdAHQgUAFgZABQgRABgeAAQhPgEgogBQhFAAgyAJQgtAJhOAdQhTAfgnAJQhLASiRgEQibgDhFAMQiPAZhxBlQgwhRgghRQhMjBgPkDQgJihAQk0QAIiqAHhcQALiRATh0QAUh9AmiZQAYhiAyixQggA6gmBIQg2BlgbA3QgrBYgdBJQgiBVghBwQgTA+glCLQhREygkCTQg+D9glDMQgVBwgOAxQgbBYguA4QgqAzg7AaQgdAqgrAeQgfAWgsASQgaALg3ATIjBBBQg2ASgdAFQgXAFgVAAQgVAAgTgFg");
	this.shape_3.setTransform(236.384,405.9184);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(66));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-28.1,551.4,868.9);


(lib.girlarmnotmoving = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// hand_fingers
	this.instance = new lib.girlarm1move();
	this.instance.setTransform(148.75,179.55,1,1,29.9992,0,0,13.1,141.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:-58.6,regY:61.8,rotation:25.7305,x:118.55,y:76.8},0).wait(1).to({rotation:21.5743,x:111.25,y:79.25},0).wait(1).to({rotation:17.5306,x:104.25,y:82.2},0).wait(1).to({rotation:13.6037,x:97.7,y:85.4},0).wait(1).to({rotation:9.7871,x:91.55,y:89.05},0).wait(1).to({rotation:6.0874,x:85.85,y:92.95},0).wait(1).to({rotation:2.5002,x:80.55,y:97.05},0).wait(1).to({rotation:-0.9723,x:75.65,y:101.3},0).wait(1).to({rotation:-4.3323,x:71.15,y:105.7},0).wait(1).to({rotation:-7.5777,x:67.15,y:110.25},0).wait(1).to({rotation:-10.7083,x:63.5,y:114.75},0).wait(1).to({rotation:-13.7265,x:60.15,y:119.35},0).wait(1).to({rotation:-16.63,x:57.3,y:123.85},0).wait(1).to({rotation:-19.421,x:54.7,y:128.45},0).wait(1).to({rotation:-22.0952,x:52.4,y:132.85},0).wait(1).to({rotation:-24.659,x:50.4,y:137.2},0).wait(1).to({rotation:-27.106,x:48.7,y:141.45},0).wait(1).to({rotation:-29.4405,x:47.2,y:145.55},0).wait(1).to({rotation:-31.6625,x:45.95,y:149.5},0).wait(1).to({rotation:-33.7677,x:44.95,y:153.25},0).wait(1).to({rotation:-35.7603,x:44.05,y:156.95},0).wait(1).to({rotation:-37.6404,x:43.4,y:160.4},0).wait(1).to({rotation:-39.4037,x:42.85,y:163.6},0).wait(1).to({rotation:-41.0567,x:42.45,y:166.7},0).wait(1).to({rotation:-42.5928,x:42.1,y:169.5},0).wait(1).to({rotation:-44.0165,x:41.9,y:172.15},0).wait(1).to({rotation:-45.3254,x:41.8,y:174.6},0).wait(1).to({rotation:-46.5219,x:41.75,y:176.8},0).wait(1).to({rotation:-47.6037,x:41.7,y:178.9},0).wait(1).to({rotation:-48.5708,y:180.7},0).wait(1).to({rotation:-49.4254,x:41.75,y:182.25},0).wait(1).to({rotation:-50.1653,y:183.65},0).wait(1).to({rotation:-50.7928,x:41.8,y:184.8},0).wait(1).to({rotation:-51.3034,x:41.85,y:185.8},0).wait(1).to({rotation:-51.7036,x:41.9,y:186.55},0).wait(1).to({rotation:-51.9871,x:41.95,y:187},0).wait(1).to({rotation:-52.158,y:187.4},0).wait(1).to({rotation:-52.2164,y:187.45},0).wait(1));

	// shoulder
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFC3C3").s().p("ApWLmQg9gFgxgmQgzgpgKg5QgHgnANgvQAJggAYgxQA4h0BRiLQAvhQBoimQAwhMAcgoQAsg+AsgrQAXgWAtglQAxgoAUgSQATgRB8iIQBXhfBIgoQBIgnBTgIQBTgJBOAYQBOAXBCA0QBBAzAqBHQAfA0AJAzQALA6gTAwQgVA1g3AYQg6AYgsgdQgdgUgnhLQgjhFgngPQAKAygdA/QgRAkgqBGQgXAsghBZQgjBbgVApQg9B1iQB+QggAdhcBLQhQBBgrApIhVBRQgyAwgnAcQhmBLhiAAIgWgBg");
	this.shape.setTransform(208.2683,120.9606);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(39));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-59.8,-36.5,345.3,251);


(lib.girlarmmoving = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// hand_fingers
	this.instance = new lib.girlarm1move("synched",0);
	this.instance.setTransform(148.7,179.5,1,1,29.9992,0,0,11.3,142.8);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:-58.6,regY:61.8,rotation:29.9554,x:128.6,y:74.45,startPosition:1},0).wait(1).to({rotation:29.8211,x:128.25,startPosition:2},0).wait(1).to({rotation:29.5964,x:127.9,y:74.55,startPosition:3},0).wait(1).to({rotation:29.2811,x:127.3,y:74.65,startPosition:4},0).wait(1).to({rotation:28.8783,x:126.6,y:74.8,startPosition:5},0).wait(1).to({rotation:28.385,x:125.65,y:75,startPosition:6},0).wait(1).to({rotation:27.8012,x:124.6,y:75.2,startPosition:7},0).wait(1).to({rotation:27.127,x:123.35,y:75.55,startPosition:8},0).wait(1).to({rotation:26.3622,x:122,y:75.9,startPosition:9},0).wait(1).to({rotation:25.5099,x:120.45,y:76.25,startPosition:10},0).wait(1).to({rotation:24.567,x:118.75,y:76.8,startPosition:11},0).wait(1).to({rotation:23.5337,x:116.85,y:77.3,startPosition:12},0).wait(1).to({rotation:22.4099,x:114.95,y:78,startPosition:13},0).wait(1).to({rotation:21.1986,x:112.75,y:78.7,startPosition:14},0).wait(1).to({rotation:19.8967,x:110.5,y:79.55,startPosition:15},0).wait(1).to({rotation:18.5044,x:108.1,y:80.5,startPosition:16},0).wait(1).to({rotation:17.0216,x:105.5,y:81.6,startPosition:17},0).wait(1).to({rotation:15.4512,x:102.85,y:82.8,startPosition:18},0).wait(1).to({rotation:13.7903,x:100.05,y:84.2,startPosition:19},0).wait(1).to({rotation:12.0389,x:97.2,y:85.75,startPosition:20},0).wait(1).to({rotation:10.1971,x:94.2,y:87.4,startPosition:21},0).wait(1).to({rotation:8.2647,x:91.1,y:89.3,startPosition:22},0).wait(1).to({rotation:6.2448,x:88,y:91.45,startPosition:23},0).wait(1).to({rotation:4.1344,x:84.8,y:93.7,startPosition:24},0).wait(1).to({rotation:1.9335,x:81.55,y:96.15,startPosition:25},0).wait(1).to({rotation:-0.3579,x:78.25,y:98.95,startPosition:26},0).wait(1).to({rotation:-2.7368,x:74.95,y:101.95,startPosition:27},0).wait(1).to({rotation:-5.2062,x:71.7,y:105.2,startPosition:28},0).wait(1).to({rotation:-7.7661,x:68.45,y:108.7,startPosition:29},0).wait(1).to({rotation:-10.4165,x:65.2,y:112.5,startPosition:30},0).wait(1).to({rotation:-13.1545,x:62.15,y:116.6,startPosition:31},0).wait(1).to({rotation:-15.983,x:59.15,y:120.9,startPosition:32},0).wait(1).to({rotation:-18.9019,x:56.25,y:125.55,startPosition:0},0).wait(1).to({rotation:-21.9114,x:53.6,y:130.45,startPosition:1},0).wait(1).to({rotation:-25.0113,x:51.1,y:135.7,startPosition:2},0).wait(1).to({rotation:-24.3299,x:51.6,y:134.55,startPosition:3},0).wait(1).to({rotation:-22.976,x:52.65,y:132.25,startPosition:4},0).wait(1).to({rotation:-21.5846,x:53.85,y:129.9,startPosition:5},0).wait(1).to({rotation:-20.1559,x:55.15,y:127.55,startPosition:6},0).wait(1).to({rotation:-18.6911,x:56.5,y:125.25,startPosition:7},0).wait(1).to({rotation:-17.1888,x:57.9,y:122.8,startPosition:8},0).wait(1).to({rotation:-15.6492,x:59.45,y:120.35,startPosition:9},0).wait(1).to({rotation:-14.0722,x:61.2,y:117.95,startPosition:10},0).wait(1).to({rotation:-12.459,x:62.95,y:115.55,startPosition:11},0).wait(1).to({rotation:-10.8085,x:64.85,y:113.1,startPosition:12},0).wait(1).to({rotation:-9.1206,x:66.8,y:110.6,startPosition:13},0).wait(1).to({rotation:-7.3953,x:68.9,y:108.2,startPosition:14},0).wait(1).to({rotation:-5.6326,x:71.15,y:105.75,startPosition:15},0).wait(1).to({rotation:-3.8338,x:73.55,y:103.35,startPosition:16},0).wait(1).to({rotation:-1.9976,x:76,y:101,startPosition:17},0).wait(1).to({rotation:-0.124,x:78.6,y:98.7,startPosition:18},0).wait(1).to({rotation:1.7869,x:81.3,y:96.35,startPosition:19},0).wait(1).to({rotation:3.7341,x:84.25,y:94.15,startPosition:20},0).wait(1).to({rotation:5.7186,x:87.2,y:91.95,startPosition:21},0).wait(1).to({rotation:7.7404,x:90.35,y:89.85,startPosition:22},0).wait(1).to({rotation:9.7997,x:93.6,y:87.8,startPosition:23},0).wait(1).to({rotation:11.8951,x:96.95,y:85.8,startPosition:24},0).wait(1).to({rotation:14.0279,x:100.45,y:84,startPosition:25},0).wait(1).to({rotation:16.1981,x:104.15,y:82.2,startPosition:26},0).wait(1).to({rotation:18.4056,x:107.95,y:80.6,startPosition:27},0).wait(1).to({rotation:20.6506,x:111.8,y:79.1,startPosition:28},0).wait(1).to({rotation:22.9317,x:115.85,y:77.65,startPosition:29},0).wait(1).to({rotation:25.2501,x:120,y:76.4,startPosition:30},0).wait(1).to({rotation:27.606,x:124.2,y:75.3,startPosition:31},0).wait(1).to({rotation:29.998,x:128.6,y:74.35,startPosition:32},0).wait(1));

	// shoulder
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFC3C3").s().p("ApWLmQg9gFgxgmQgzgpgKg5QgHgnANgvQAJggAYgxQA4h0BRiLQAvhQBoimQAwhMAcgoQAsg+AsgrQAXgWAtglQAxgoAUgSQATgRB8iIQBXhfBIgoQBIgnBTgIQBTgJBOAYQBOAXBCA0QBBAzAqBHQAfA0AJAzQALA6gTAwQgVA1g3AYQg6AYgsgdQgdgUgnhLQgjhFgngPQAKAygdA/QgRAkgqBGQgXAsghBZQgjBbgVApQg9B1iQB+QggAdhcBLQhQBBgrApIhVBRQgyAwgnAcQhmBLhiAAIgWgBg");
	this.shape.setTransform(208.2683,120.9606);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(66));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-43.2,-31.3,328.7,232.8);


(lib.stars = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.spinningstar();
	this.instance.setTransform(288.15,169,0.4801,0.4801,60.0003,0,0,21.4,20.2);

	this.instance_1 = new lib.spinningstar();
	this.instance_1.setTransform(756.75,671.35,0.4801,0.4801,45,0,0,21.5,20.3);

	this.instance_2 = new lib.spinningstar();
	this.instance_2.setTransform(715.55,503.65,0.4801,0.4801,-29.9987,0,0,21.4,20.4);

	this.instance_3 = new lib.spinningstar();
	this.instance_3.setTransform(563.4,321.9,0.4801,0.4801,-29.9987,0,0,21.4,20.2);

	this.instance_4 = new lib.spinningstar();
	this.instance_4.setTransform(635.3,427.8,0.4801,0.4801,-14.9986,0,0,21.3,20.4);

	this.instance_5 = new lib.spinningstar();
	this.instance_5.setTransform(630.8,388,0.4801,0.4801,0,0,0,21.4,20.3);

	this.instance_6 = new lib.spinningstar();
	this.instance_6.setTransform(633.85,406.65,0.4801,0.4801,29.9987,0,0,21.4,20.3);

	this.instance_7 = new lib.spinningstar();
	this.instance_7.setTransform(75.15,20.25,1,1,14.9992,0,0,21.2,20.2);

	this.instance_8 = new lib.spinningstar();
	this.instance_8.setTransform(514.2,104.7,1,1,-14.9992,0,0,21.3,20.2);

	this.instance_9 = new lib.spinningstar();
	this.instance_9.setTransform(757.25,393.1,1,1,0,0,0,21.2,20.2);

	this.instance_10 = new lib.spinningstar();
	this.instance_10.setTransform(497.8,403.35,1,1,14.9992,0,0,21.2,20.2);

	this.instance_11 = new lib.spinningstar();
	this.instance_11.setTransform(21.2,473.65,1,1,0,0,0,21.2,20.2);

	this.instance_12 = new lib.spinningstar();
	this.instance_12.setTransform(323.1,731.45,1,1,14.9992,0,0,21.3,20.2);

	this.instance_13 = new lib.spinningstar();
	this.instance_13.setTransform(41.65,536.4,1,1,14.9992,0,0,21.3,20.2);

	this.instance_14 = new lib.spinningstar();
	this.instance_14.setTransform(700.7,731.7,1.8779,1.8779,-14.999,0,0,21.2,20.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.stars, new cjs.Rectangle(0,-4.7,778.6,783.2), null);


(lib.backgroundgraphic = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// ground
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#250B0D").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg4gLQh0gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDNlcQBLh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuIi6A6QmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape.setTransform(909.2285,820.1688);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#250B0D").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_1.setTransform(909.2285,820.1688);
	this.shape_1._off = true;

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#260C0E").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_2.setTransform(909.2285,820.1688);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#270C0E").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_3.setTransform(909.2285,820.1688);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#280D0F").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_4.setTransform(909.2285,820.1688);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#290D0F").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_5.setTransform(909.2285,820.1688);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#290E10").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_6.setTransform(909.2285,820.1688);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2A0E10").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_7.setTransform(909.2285,820.1688);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2B0F11").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_8.setTransform(909.2285,820.1688);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C0F12").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_9.setTransform(909.2285,820.1688);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2D1012").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_10.setTransform(909.2285,820.1688);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2E1013").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_11.setTransform(909.2285,820.1688);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2F1113").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_12.setTransform(909.2285,820.1688);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#301114").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_13.setTransform(909.2285,820.1688);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#301214").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_14.setTransform(909.2285,820.1688);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#311215").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_15.setTransform(909.2285,820.1688);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#321316").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_16.setTransform(909.2285,820.1688);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#331316").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_17.setTransform(909.2285,820.1688);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#341417").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_18.setTransform(909.2285,820.1688);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#351517").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_19.setTransform(909.2285,820.1688);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#361518").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_20.setTransform(909.2285,820.1688);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#371618").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_21.setTransform(909.2285,820.1688);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#371619").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_22.setTransform(909.2285,820.1688);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#38171A").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_23.setTransform(909.2285,820.1688);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#39171A").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_24.setTransform(909.2285,820.1688);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#3A181B").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_25.setTransform(909.2285,820.1688);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#3B181B").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_26.setTransform(909.2285,820.1688);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#3C191C").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_27.setTransform(909.2285,820.1688);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#3D191C").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_28.setTransform(909.2285,820.1688);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#3E1A1D").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_29.setTransform(909.2285,820.1688);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#3E1A1E").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_30.setTransform(909.2285,820.1688);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#3F1B1E").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_31.setTransform(909.2285,820.1688);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#401B1F").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_32.setTransform(909.2285,820.1688);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#411C1F").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_33.setTransform(909.2285,820.1688);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#421D20").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_34.setTransform(909.2285,820.1688);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#431D20").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_35.setTransform(909.2285,820.1688);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#441E21").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_36.setTransform(909.2285,820.1688);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#451E22").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_37.setTransform(909.2285,820.1688);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#451F22").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_38.setTransform(909.2285,820.1688);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#461F23").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_39.setTransform(909.2285,820.1688);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#472023").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_40.setTransform(909.2285,820.1688);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#482024").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_41.setTransform(909.2285,820.1688);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#492124").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_42.setTransform(909.2285,820.1688);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#4A2125").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_43.setTransform(909.2285,820.1688);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#4B2226").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_44.setTransform(909.2285,820.1688);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#4C2226").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_45.setTransform(909.2285,820.1688);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#4C2327").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_46.setTransform(909.2285,820.1688);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#4D2327").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_47.setTransform(909.2285,820.1688);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#4E2428").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_48.setTransform(909.2285,820.1688);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#4F2428").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_49.setTransform(909.2285,820.1688);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#502529").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_50.setTransform(909.2285,820.1688);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#51262A").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_51.setTransform(909.2285,820.1688);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#52262A").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_52.setTransform(909.2285,820.1688);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#53272B").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_53.setTransform(909.2285,820.1688);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#54272B").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_54.setTransform(909.2285,820.1688);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#54272C").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_55.setTransform(909.2285,820.1688);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#55282C").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_56.setTransform(909.2285,820.1688);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#55282D").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_57.setTransform(909.2285,820.1688);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#56292D").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_58.setTransform(909.2285,820.1688);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#57292E").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_59.setTransform(909.2285,820.1688);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#582A2E").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_60.setTransform(909.2285,820.1688);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#592A2F").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_61.setTransform(909.2285,820.1688);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#5A2B2F").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_62.setTransform(909.2285,820.1688);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#5A2B30").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_63.setTransform(909.2285,820.1688);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#5B2C30").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_64.setTransform(909.2285,820.1688);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#5C2C31").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_65.setTransform(909.2285,820.1688);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#5D2D31").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_66.setTransform(909.2285,820.1688);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#5E2D32").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_67.setTransform(909.2285,820.1688);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#5F2E32").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_68.setTransform(909.2285,820.1688);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#5F2E33").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_69.setTransform(909.2285,820.1688);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#602F33").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_70.setTransform(909.2285,820.1688);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#602F34").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_71.setTransform(909.2285,820.1688);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#612F34").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_72.setTransform(909.2285,820.1688);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#623034").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_73.setTransform(909.2285,820.1688);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#623035").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_74.setTransform(909.2285,820.1688);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#633035").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_75.setTransform(909.2285,820.1688);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#643136").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_76.setTransform(909.2285,820.1688);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#653237").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_77.setTransform(909.2285,820.1688);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_28}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_31}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_33}]},1).to({state:[{t:this.shape_34}]},1).to({state:[{t:this.shape_35}]},1).to({state:[{t:this.shape_36}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_38}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_41}]},1).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_43}]},1).to({state:[{t:this.shape_44}]},1).to({state:[{t:this.shape_45}]},1).to({state:[{t:this.shape_46}]},1).to({state:[{t:this.shape_47}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_49}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_51}]},1).to({state:[{t:this.shape_51}]},1).to({state:[{t:this.shape_52}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_54}]},1).to({state:[{t:this.shape_55}]},1).to({state:[{t:this.shape_56}]},1).to({state:[{t:this.shape_56}]},1).to({state:[{t:this.shape_57}]},1).to({state:[{t:this.shape_58}]},1).to({state:[{t:this.shape_58}]},1).to({state:[{t:this.shape_59}]},1).to({state:[{t:this.shape_60}]},1).to({state:[{t:this.shape_60}]},1).to({state:[{t:this.shape_61}]},1).to({state:[{t:this.shape_61}]},1).to({state:[{t:this.shape_62}]},1).to({state:[{t:this.shape_63}]},1).to({state:[{t:this.shape_63}]},1).to({state:[{t:this.shape_64}]},1).to({state:[{t:this.shape_64}]},1).to({state:[{t:this.shape_65}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_67}]},1).to({state:[{t:this.shape_67}]},1).to({state:[{t:this.shape_68}]},1).to({state:[{t:this.shape_69}]},1).to({state:[{t:this.shape_69}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_71}]},1).to({state:[{t:this.shape_72}]},1).to({state:[{t:this.shape_73}]},1).to({state:[{t:this.shape_74}]},1).to({state:[{t:this.shape_75}]},1).to({state:[{t:this.shape_75}]},1).to({state:[{t:this.shape_76}]},1).to({state:[{t:this.shape_76}]},1).to({state:[{t:this.shape_76}]},1).to({state:[{t:this.shape_77}]},1).to({state:[]},1).wait(9));
	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1).to({_off:false},0).wait(89).to({_off:true},1).wait(100));

	// moon
	this.instance = new lib.moon("synched",0);
	this.instance.setTransform(323.05,688.5,1,1,-29.9992,0,0,53.7,58.2);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(90).to({_off:false},0).wait(1).to({regX:59.4,regY:58.1,rotation:-29.482,x:332.55,y:679.7},0).wait(1).to({rotation:-28.9623,x:337.25,y:673.95},0).wait(1).to({rotation:-28.4507,x:342.05,y:668.15},0).wait(1).to({rotation:-27.9471,x:346.85,y:662.3},0).wait(1).to({rotation:-27.4514,x:351.8,y:656.6},0).wait(1).to({rotation:-26.9634,x:356.75,y:650.9},0).wait(1).to({rotation:-26.4832,x:361.75,y:645.2},0).wait(1).to({rotation:-26.0106,x:366.9,y:639.5},0).wait(1).to({rotation:-25.5454,x:372.05,y:633.9},0).wait(1).to({rotation:-25.0876,x:377.3,y:628.2},0).wait(1).to({rotation:-24.6371,x:382.55,y:622.65},0).wait(1).to({rotation:-24.1937,x:387.9,y:617.05},0).wait(1).to({rotation:-23.7574,x:393.3,y:611.5},0).wait(1).to({rotation:-23.3279,x:398.8,y:606},0).wait(1).to({rotation:-22.9053,x:404.25,y:600.45},0).wait(1).to({rotation:-22.4894,x:409.9,y:595},0).wait(1).to({rotation:-22.0801,x:415.55,y:589.45},0).wait(1).to({rotation:-21.6773,x:421.2,y:584},0).wait(1).to({rotation:-21.2809,x:427,y:578.6},0).wait(1).to({rotation:-20.8908,x:432.75,y:573.2},0).wait(1).to({rotation:-20.5068,x:438.65,y:567.8},0).wait(1).to({rotation:-20.129,x:444.55,y:562.45},0).wait(1).to({rotation:-19.757,x:450.55,y:557.1},0).wait(1).to({rotation:-19.391,x:456.55,y:551.8},0).wait(1).to({rotation:-19.0307,x:462.6,y:546.5},0).wait(1).to({rotation:-18.6761,x:468.7,y:541.25},0).wait(1).to({rotation:-18.3271,x:474.9,y:535.95},0).wait(1).to({rotation:-17.9835,x:481.15,y:530.7},0).wait(1).to({rotation:-17.6453,x:487.35,y:525.5},0).wait(1).to({rotation:-17.3124,x:493.7,y:520.3},0).wait(1).to({rotation:-16.9846,x:500.05,y:515.15},0).wait(1).to({rotation:-16.662,x:506.45,y:510},0).wait(1).to({rotation:-16.3444,x:512.9,y:504.95},0).wait(1).to({rotation:-16.0317,x:519.45,y:499.85},0).wait(1).to({rotation:-15.7238,x:526,y:494.75},0).wait(1).to({rotation:-15.4206,x:532.5,y:489.7},0).wait(1).to({rotation:-15.1222,x:539.15,y:484.65},0).wait(1).to({rotation:-14.8283,x:545.8,y:479.65},0).wait(1).to({rotation:-14.5389,x:552.55,y:474.7},0).wait(1).to({rotation:-14.2539,x:559.25,y:469.65},0).wait(1).to({rotation:-13.9733,x:566.1,y:464.75},0).wait(1).to({rotation:-13.6969,x:572.85,y:459.85},0).wait(1).to({rotation:-13.4247,x:579.8,y:454.9},0).wait(1).to({rotation:-13.1567,x:586.65,y:450.05},0).wait(1).to({rotation:-12.8926,x:593.55,y:445.25},0).wait(1).to({rotation:-12.6326,x:600.55,y:440.4},0).wait(1).to({rotation:-12.3764,x:607.55,y:435.55},0).wait(1).to({rotation:-12.1241,x:614.55,y:430.75},0).wait(1).to({rotation:-11.8756,x:621.65,y:426.05},0).wait(1).to({rotation:-11.6307,x:628.75,y:421.3},0).wait(1).to({rotation:-11.3895,x:635.9,y:416.5},0).wait(1).to({rotation:-11.1519,x:643.1,y:411.85},0).wait(1).to({rotation:-10.9177,x:650.25,y:407.2},0).wait(1).to({rotation:-10.6871,x:657.45,y:402.55},0).wait(1).to({rotation:-10.4598,x:664.7,y:397.9},0).wait(1).to({rotation:-10.2359,x:672,y:393.25},0).wait(1).to({rotation:-10.0152,x:679.35,y:388.65},0).wait(1).to({rotation:-9.7978,x:686.7,y:384.1},0).wait(1).to({rotation:-9.5835,x:694,y:379.55},0).wait(1).to({rotation:-9.3724,x:701.4,y:375.05},0).wait(1).to({rotation:-9.1643,x:708.8,y:370.55},0).wait(1).to({rotation:-8.9592,x:716.2,y:366.1},0).wait(1).to({rotation:-8.7571,x:723.7,y:361.6},0).wait(1).to({rotation:-8.5579,x:731.2,y:357.15},0).wait(1).to({rotation:-8.3616,x:738.65,y:352.75},0).wait(1).to({rotation:-8.1681,x:746.2,y:348.35},0).wait(1).to({rotation:-7.9774,x:753.7,y:344},0).wait(1).to({rotation:-7.7894,x:761.25,y:339.65},0).wait(1).to({rotation:-7.6042,x:768.9,y:335.35},0).wait(1).to({rotation:-7.4215,x:776.45,y:331.05},0).wait(1).to({rotation:-7.2415,x:784.05,y:326.75},0).wait(1).to({rotation:-7.064,x:791.7,y:322.5},0).wait(1).to({rotation:-6.8891,x:799.3,y:318.3},0).wait(1).to({rotation:-6.7167,x:807,y:314.05},0).wait(1).to({rotation:-6.5467,x:814.6,y:309.85},0).wait(1).to({rotation:-6.3791,x:822.35,y:305.7},0).wait(1).to({rotation:-6.2139,x:830.05,y:301.5},0).wait(1).to({rotation:-6.0511,x:837.7,y:297.45},0).wait(1).to({rotation:-5.8905,x:845.45,y:293.3},0).wait(1).to({rotation:-5.7323,x:853.15,y:289.2},0).wait(1).to({rotation:-5.5763,x:860.9,y:285.15},0).wait(1).to({rotation:-5.4225,x:868.7,y:281.15},0).wait(1).to({rotation:-5.2708,x:876.4,y:277.1},0).wait(1).to({rotation:-5.1214,x:884.15,y:273.1},0).wait(1).to({rotation:-4.974,x:891.95,y:269.15},0).wait(1).to({rotation:-4.8288,x:899.7,y:265.2},0).wait(1).to({rotation:-4.6856,x:907.45,y:261.25},0).wait(1).to({rotation:-4.5445,x:915.2,y:257.35},0).wait(1).to({rotation:-4.4053,x:923,y:253.5},0).wait(1).to({rotation:-4.2682,x:930.8,y:249.65},0).wait(1).to({rotation:-4.133,x:938.6,y:245.75},0).to({_off:true},1).wait(9));

	// stars
	this.instance_1 = new lib.stars();
	this.instance_1.setTransform(611.65,662.05,1,1,0,0,0,389.3,384.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).to({regX:390.8,regY:392.5,rotation:0.129,x:615.25,y:666.55},0).wait(1).to({rotation:0.262,x:617.4,y:663.2},0).wait(1).to({rotation:0.395,x:619.55,y:659.9},0).wait(1).to({rotation:0.528,x:621.7,y:656.6},0).wait(1).to({rotation:0.6611,x:623.8,y:653.25},0).wait(1).to({rotation:0.7941,x:626,y:649.95},0).wait(1).to({rotation:0.9272,x:628.2,y:646.7},0).wait(1).to({rotation:1.0602,x:630.4,y:643.45},0).wait(1).to({rotation:1.1933,x:632.55,y:640.15},0).wait(1).to({rotation:1.3264,x:634.75,y:636.9},0).wait(1).to({rotation:1.4595,x:636.9,y:633.6},0).wait(1).to({rotation:1.5926,x:639.15,y:630.35},0).wait(1).to({rotation:1.7256,x:641.35,y:627.05},0).wait(1).to({rotation:1.8587,x:643.6,y:623.8},0).wait(1).to({rotation:1.9918,x:645.8,y:620.6},0).wait(1).to({rotation:2.1249,x:648.1,y:617.35},0).wait(1).to({rotation:2.258,x:650.35,y:614.1},0).wait(1).to({rotation:2.391,x:652.6,y:610.9},0).wait(1).to({rotation:2.5241,x:654.8,y:607.65},0).wait(1).to({rotation:2.6571,x:657.1,y:604.4},0).wait(1).to({rotation:2.7902,x:659.4,y:601.2},0).wait(1).to({rotation:2.9232,x:661.7,y:598.05},0).wait(1).to({rotation:3.0562,x:663.95,y:594.85},0).wait(1).to({rotation:3.1892,x:666.25,y:591.65},0).wait(1).to({rotation:3.3222,x:668.55,y:588.45},0).wait(1).to({rotation:3.4552,x:670.9,y:585.25},0).wait(1).to({rotation:3.5881,x:673.25,y:582.05},0).wait(1).to({rotation:3.721,x:675.55,y:578.85},0).wait(1).to({rotation:3.854,x:677.85,y:575.7},0).wait(1).to({rotation:3.9868,x:680.2,y:572.5},0).wait(1).to({rotation:4.1197,x:682.6,y:569.35},0).wait(1).to({rotation:4.2525,x:684.9,y:566.2},0).wait(1).to({rotation:4.3853,x:687.3,y:563.1},0).wait(1).to({rotation:4.5181,x:689.7,y:559.95},0).wait(1).to({rotation:4.6509,x:692.05,y:556.8},0).wait(1).to({rotation:4.7836,x:694.45,y:553.7},0).wait(1).to({rotation:4.9163,x:696.8,y:550.55},0).wait(1).to({rotation:5.0489,x:699.25,y:547.4},0).wait(1).to({rotation:5.1815,x:701.65,y:544.3},0).wait(1).to({rotation:5.3141,x:704.05,y:541.15},0).wait(1).to({rotation:5.4466,x:706.55,y:538.1},0).wait(1).to({rotation:5.5791,x:708.95,y:534.95},0).wait(1).to({rotation:5.7116,x:711.4,y:531.85},0).wait(1).to({rotation:5.844,x:713.85,y:528.75},0).wait(1).to({rotation:5.9764,x:716.3,y:525.65},0).wait(1).to({rotation:6.1087,x:718.8,y:522.6},0).wait(1).to({rotation:6.241,x:721.25,y:519.5},0).wait(1).to({rotation:6.3732,x:723.75,y:516.45},0).wait(1).to({rotation:6.5054,x:726.25,y:513.4},0).wait(1).to({rotation:6.6375,x:728.75,y:510.25},0).wait(1).to({rotation:6.7696,x:731.2,y:507.25},0).wait(1).to({rotation:6.9017,x:733.7,y:504.2},0).wait(1).to({rotation:7.0336,x:736.2,y:501.15},0).wait(1).to({rotation:7.1656,x:738.75,y:498.15},0).wait(1).to({rotation:7.2974,x:741.3,y:495.05},0).wait(1).to({rotation:7.4292,x:743.8,y:492.05},0).wait(1).to({rotation:7.561,x:746.35,y:489},0).wait(1).to({rotation:7.6927,x:748.95,y:486},0).wait(1).to({rotation:7.8243,x:751.45,y:483},0).wait(1).to({rotation:7.9559,x:754.1,y:479.95},0).wait(1).to({rotation:8.0873,x:756.65,y:476.95},0).wait(1).to({rotation:8.2188,x:759.25,y:473.95},0).wait(1).to({rotation:8.3501,x:761.8,y:471},0).wait(1).to({rotation:8.4814,x:764.35,y:468},0).wait(1).to({rotation:8.6127,x:767,y:464.95},0).wait(1).to({rotation:8.7438,x:769.65,y:462.05},0).wait(1).to({rotation:8.8749,x:772.25,y:459.05},0).wait(1).to({rotation:9.0059,x:774.9,y:456.05},0).wait(1).to({rotation:9.1368,x:777.55,y:453.1},0).wait(1).to({rotation:9.2677,x:780.2,y:450.2},0).wait(1).to({rotation:9.3985,x:782.8,y:447.25},0).wait(1).to({rotation:9.5292,x:785.45,y:444.35},0).wait(1).to({rotation:9.6598,x:788.15,y:441.35},0).wait(1).to({rotation:9.7903,x:790.8,y:438.45},0).wait(1).to({rotation:9.9208,x:793.5,y:435.5},0).wait(1).to({rotation:10.0512,x:796.2,y:432.55},0).wait(1).to({rotation:10.1815,x:798.9,y:429.65},0).wait(1).to({rotation:10.3117,x:801.6,y:426.75},0).wait(1).to({rotation:10.4418,x:804.25,y:423.8},0).wait(1).to({rotation:10.5718,x:807,y:420.95},0).wait(1).to({rotation:10.7018,x:809.75,y:418},0).wait(1).to({rotation:10.8316,x:812.5,y:415.15},0).wait(1).to({rotation:10.9614,x:815.2,y:412.25},0).wait(1).to({rotation:11.091,x:818,y:409.35},0).wait(1).to({rotation:11.2206,x:820.8,y:406.5},0).wait(1).to({rotation:11.3501,x:823.5,y:403.6},0).wait(1).to({rotation:11.4794,x:826.3,y:400.7},0).wait(1).to({rotation:11.6087,x:829.05,y:397.85},0).wait(1).to({rotation:11.7379,x:831.8,y:395},0).wait(1).to({rotation:11.867,x:834.65,y:392.15},0).wait(1).to({rotation:11.996,x:837.4,y:389.25},0).wait(1).to({rotation:12.1248,x:840.25,y:386.5},0).wait(1).to({rotation:12.2536,x:843.1,y:383.65},0).wait(1).to({rotation:12.3823,x:845.9,y:380.8},0).wait(1).to({rotation:12.5108,x:848.75,y:378},0).wait(1).to({rotation:12.6393,x:851.55,y:375.15},0).wait(1).to({rotation:12.7676,x:854.45,y:372.3},0).wait(1).to({rotation:12.8959,x:857.3,y:369.5},0).wait(1).to({rotation:13.024,x:860.15,y:366.7},0).wait(1).to({rotation:13.152,x:863.05,y:363.9},0).wait(1).to({rotation:13.2799,x:865.9,y:361.1},0).wait(1).to({rotation:13.4077,x:868.8,y:358.3},0).wait(1).to({rotation:13.5354,x:871.7,y:355.5},0).wait(1).to({rotation:13.6629,x:874.6,y:352.75},0).wait(1).to({rotation:13.7904,x:877.5,y:350},0).wait(1).to({rotation:13.9177,x:880.45,y:347.25},0).wait(1).to({rotation:14.0449,x:883.3,y:344.45},0).wait(1).to({rotation:14.172,x:886.25,y:341.7},0).wait(1).to({rotation:14.299,x:889.2,y:338.9},0).wait(1).to({rotation:14.4258,x:892.1,y:336.15},0).wait(1).to({rotation:14.5525,x:895.1,y:333.45},0).wait(1).to({rotation:14.6791,x:898.1,y:330.7},0).wait(1).to({rotation:14.8056,x:901,y:327.9},0).wait(1).to({rotation:14.9319,x:904,y:325.25},0).wait(1).to({rotation:15.0582,x:907.05,y:322.5},0).wait(1).to({rotation:15.1842,x:910,y:319.8},0).wait(1).to({rotation:15.3102,x:913,y:317.05},0).wait(1).to({rotation:15.436,x:916,y:314.35},0).wait(1).to({rotation:15.5617,x:919,y:311.65},0).wait(1).to({rotation:15.6873,x:922,y:308.9},0).wait(1).to({rotation:15.8127,x:925.05,y:306.3},0).wait(1).to({rotation:15.938,x:928.1,y:303.55},0).wait(1).to({rotation:16.0632,x:931.15,y:300.9},0).wait(1).to({rotation:16.1882,x:934.2,y:298.25},0).wait(1).to({rotation:16.3131,x:937.25,y:295.55},0).wait(1).to({rotation:16.4379,x:940.3,y:292.9},0).wait(1).to({rotation:16.5625,x:943.4,y:290.2},0).wait(1).to({rotation:16.687,x:946.5,y:287.5},0).wait(1).to({rotation:16.8113,x:949.6,y:284.9},0).wait(1).to({rotation:16.9355,x:952.65,y:282.25},0).wait(1).to({rotation:17.0596,x:955.8,y:279.65},0).wait(1).to({rotation:17.1835,x:958.9,y:277},0).wait(1).to({rotation:17.3073,x:962.05,y:274.3},0).wait(1).to({rotation:17.4309,x:965.15,y:271.7},0).wait(1).to({rotation:17.5544,x:968.25,y:269.05},0).wait(1).to({rotation:17.6777,x:971.4,y:266.45},0).wait(1).to({rotation:17.8009,x:974.6,y:263.85},0).wait(1).to({rotation:17.9239,x:977.75,y:261.25},0).wait(1).to({rotation:18.0468,x:980.9,y:258.65},0).wait(1).to({rotation:18.1695,x:984.05,y:256.1},0).wait(1).to({rotation:18.2921,x:987.25,y:253.45},0).wait(1).to({rotation:18.4146,x:990.45,y:250.9},0).wait(1).to({rotation:18.5369,x:993.6,y:248.35},0).wait(1).to({rotation:18.659,x:996.85,y:245.75},0).wait(1).to({rotation:18.781,x:1000.1,y:243.15},0).wait(1).to({rotation:18.9028,x:1003.25,y:240.6},0).wait(1).to({rotation:19.0245,x:1006.5,y:238.05},0).wait(1).to({rotation:19.146,x:1009.75,y:235.5},0).wait(1).to({rotation:19.2673,x:1013,y:232.9},0).wait(1).to({rotation:19.3885,x:1016.25,y:230.45},0).wait(1).to({rotation:19.5096,x:1019.45,y:227.85},0).wait(1).to({rotation:19.6305,x:1022.8,y:225.35},0).wait(1).to({rotation:19.7512,x:1026.05,y:222.8},0).wait(1).to({rotation:19.8717,x:1029.35,y:220.25},0).wait(1).to({rotation:19.9922,x:1032.6,y:217.75},0).wait(1).to({rotation:20.1124,x:1035.9,y:215.25},0).wait(1).to({rotation:20.2325,x:1039.2,y:212.75},0).wait(1).to({rotation:20.3524,x:1042.55,y:210.2},0).wait(1).to({rotation:20.4721,x:1045.8,y:207.75},0).wait(1).to({rotation:20.5917,x:1049.2,y:205.2},0).wait(1).to({rotation:20.7111,x:1052.5,y:202.75},0).wait(1).to({rotation:20.8304,x:1055.85,y:200.25},0).wait(1).to({rotation:20.9495,x:1059.15,y:197.8},0).wait(1).to({rotation:21.0684,x:1062.6,y:195.35},0).wait(1).to({rotation:21.1872,x:1065.95,y:192.85},0).wait(1).to({rotation:21.3058,x:1069.3,y:190.4},0).wait(1).to({rotation:21.4242,x:1072.7,y:187.95},0).wait(1).to({rotation:21.5424,x:1076.1,y:185.5},0).wait(1).to({rotation:21.6605,x:1079.5,y:183.05},0).wait(1).to({rotation:21.7784,x:1082.9,y:180.6},0).wait(1).to({rotation:21.8961,x:1086.3,y:178.2},0).wait(1).to({rotation:22.0137,x:1089.7,y:175.75},0).wait(1).to({rotation:22.1311,x:1093.15,y:173.3},0).wait(1).to({rotation:22.2483,x:1096.55,y:170.85},0).wait(1).to({rotation:22.3654,x:1100,y:168.45},0).wait(1).to({rotation:22.4822,x:1103.45,y:166.05},0).wait(1).to({rotation:22.5989,x:1106.9,y:163.65},0).wait(1).to({rotation:22.7155,x:1110.4,y:161.25},0).wait(1).to({rotation:22.8318,x:1113.85,y:158.9},0).wait(1).to({rotation:22.948,x:1117.3,y:156.45},0).wait(1).to({rotation:23.064,x:1120.8,y:154.05},0).to({_off:true},1).wait(9));

	// sky
	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#000000").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBXhUBVgyQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QABA7gCAyIhRgZQAFAoAAApQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_78.setTransform(877.2538,425.4544);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#000000").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_79.setTransform(877.2538,425.4544);
	this.shape_79._off = true;

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#010101").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_80.setTransform(877.2538,425.4544);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#020202").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_81.setTransform(877.2538,425.4544);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#030303").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_82.setTransform(877.2538,425.4544);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#040404").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_83.setTransform(877.2538,425.4544);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#050504").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_84.setTransform(877.2538,425.4544);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#060605").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_85.setTransform(877.2538,425.4544);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#080706").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_86.setTransform(877.2538,425.4544);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#090807").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_87.setTransform(877.2538,425.4544);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#0A0808").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_88.setTransform(877.2538,425.4544);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#0B0909").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_89.setTransform(877.2538,425.4544);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#0C0A0A").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_90.setTransform(877.2538,425.4544);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#0D0B0B").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_91.setTransform(877.2538,425.4544);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#0E0C0B").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_92.setTransform(877.2538,425.4544);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#0F0D0C").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_93.setTransform(877.2538,425.4544);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#100E0D").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_94.setTransform(877.2538,425.4544);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#110F0E").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_95.setTransform(877.2538,425.4544);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#12100F").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_96.setTransform(877.2538,425.4544);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#131110").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_97.setTransform(877.2538,425.4544);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#151211").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_98.setTransform(877.2538,425.4544);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#161312").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_99.setTransform(877.2538,425.4544);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#171412").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_100.setTransform(877.2538,425.4544);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#181513").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_101.setTransform(877.2538,425.4544);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#191614").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_102.setTransform(877.2538,425.4544);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#1A1715").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_103.setTransform(877.2538,425.4544);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#1B1716").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_104.setTransform(877.2538,425.4544);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#1C1817").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_105.setTransform(877.2538,425.4544);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#1D1918").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_106.setTransform(877.2538,425.4544);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#1E1A19").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_107.setTransform(877.2538,425.4544);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#1F1B19").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_108.setTransform(877.2538,425.4544);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#201C1A").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_109.setTransform(877.2538,425.4544);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#221D1B").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_110.setTransform(877.2538,425.4544);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#231E1C").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_111.setTransform(877.2538,425.4544);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#241F1D").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_112.setTransform(877.2538,425.4544);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#25201E").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_113.setTransform(877.2538,425.4544);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#26211F").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_114.setTransform(877.2538,425.4544);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#272220").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_115.setTransform(877.2538,425.4544);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#282320").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_116.setTransform(877.2538,425.4544);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#292421").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_117.setTransform(877.2538,425.4544);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#2A2522").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_118.setTransform(877.2538,425.4544);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#2B2623").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_119.setTransform(877.2538,425.4544);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#2C2624").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_120.setTransform(877.2538,425.4544);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#2D2725").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_121.setTransform(877.2538,425.4544);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#2F2826").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_122.setTransform(877.2538,425.4544);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#302927").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_123.setTransform(877.2538,425.4544);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#312A27").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_124.setTransform(877.2538,425.4544);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#322B28").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_125.setTransform(877.2538,425.4544);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#332C29").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_126.setTransform(877.2538,425.4544);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#342D2A").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_127.setTransform(877.2538,425.4544);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#352E2B").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_128.setTransform(877.2538,425.4544);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#362F2B").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_129.setTransform(877.2538,425.4544);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#362F2C").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_130.setTransform(877.2538,425.4544);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#37302C").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_131.setTransform(877.2538,425.4544);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#37302D").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_132.setTransform(877.2538,425.4544);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#38312E").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_133.setTransform(877.2538,425.4544);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#39312E").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_134.setTransform(877.2538,425.4544);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#39322F").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_135.setTransform(877.2538,425.4544);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#3A322F").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_136.setTransform(877.2538,425.4544);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#3A3330").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_137.setTransform(877.2538,425.4544);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#3B3330").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_138.setTransform(877.2538,425.4544);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#3C3430").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_139.setTransform(877.2538,425.4544);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#3C3431").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_140.setTransform(877.2538,425.4544);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#3D3531").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_141.setTransform(877.2538,425.4544);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#3D3532").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_142.setTransform(877.2538,425.4544);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#3E3633").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_143.setTransform(877.2538,425.4544);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#3F3633").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_144.setTransform(877.2538,425.4544);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#3F3734").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_145.setTransform(877.2538,425.4544);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#403734").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_146.setTransform(877.2538,425.4544);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#403835").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_147.setTransform(877.2538,425.4544);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#413935").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_148.setTransform(877.2538,425.4544);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#423935").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_149.setTransform(877.2538,425.4544);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#423A36").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_150.setTransform(877.2538,425.4544);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#433A36").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_151.setTransform(877.2538,425.4544);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#433B37").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_152.setTransform(877.2538,425.4544);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#443B38").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_153.setTransform(877.2538,425.4544);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#453C38").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_154.setTransform(877.2538,425.4544);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#453C39").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_155.setTransform(877.2538,425.4544);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#463D39").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_156.setTransform(877.2538,425.4544);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#463D3A").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_157.setTransform(877.2538,425.4544);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#473E3A").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_158.setTransform(877.2538,425.4544);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#483E3A").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_159.setTransform(877.2538,425.4544);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#483F3B").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_160.setTransform(877.2538,425.4544);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#493F3B").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_161.setTransform(877.2538,425.4544);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#49403C").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_162.setTransform(877.2538,425.4544);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#4A403D").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_163.setTransform(877.2538,425.4544);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#4B413D").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_164.setTransform(877.2538,425.4544);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#4B413E").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_165.setTransform(877.2538,425.4544);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#4C423E").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_166.setTransform(877.2538,425.4544);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#4C423F").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_167.setTransform(877.2538,425.4544);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#4D433F").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_168.setTransform(877.2538,425.4544);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#4E4440").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_169.setTransform(877.2538,425.4544);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_78}]}).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_78}]},1).to({state:[{t:this.shape_80}]},1).to({state:[{t:this.shape_81}]},1).to({state:[{t:this.shape_82}]},1).to({state:[{t:this.shape_83}]},1).to({state:[{t:this.shape_84}]},1).to({state:[{t:this.shape_85}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_87}]},1).to({state:[{t:this.shape_88}]},1).to({state:[{t:this.shape_89}]},1).to({state:[{t:this.shape_90}]},1).to({state:[{t:this.shape_91}]},1).to({state:[{t:this.shape_92}]},1).to({state:[{t:this.shape_93}]},1).to({state:[{t:this.shape_94}]},1).to({state:[{t:this.shape_95}]},1).to({state:[{t:this.shape_96}]},1).to({state:[{t:this.shape_97}]},1).to({state:[{t:this.shape_98}]},1).to({state:[{t:this.shape_99}]},1).to({state:[{t:this.shape_100}]},1).to({state:[{t:this.shape_101}]},1).to({state:[{t:this.shape_102}]},1).to({state:[{t:this.shape_103}]},1).to({state:[{t:this.shape_104}]},1).to({state:[{t:this.shape_105}]},1).to({state:[{t:this.shape_106}]},1).to({state:[{t:this.shape_107}]},1).to({state:[{t:this.shape_108}]},1).to({state:[{t:this.shape_109}]},1).to({state:[{t:this.shape_110}]},1).to({state:[{t:this.shape_111}]},1).to({state:[{t:this.shape_112}]},1).to({state:[{t:this.shape_113}]},1).to({state:[{t:this.shape_114}]},1).to({state:[{t:this.shape_115}]},1).to({state:[{t:this.shape_116}]},1).to({state:[{t:this.shape_117}]},1).to({state:[{t:this.shape_118}]},1).to({state:[{t:this.shape_119}]},1).to({state:[{t:this.shape_120}]},1).to({state:[{t:this.shape_121}]},1).to({state:[{t:this.shape_122}]},1).to({state:[{t:this.shape_123}]},1).to({state:[{t:this.shape_124}]},1).to({state:[{t:this.shape_125}]},1).to({state:[{t:this.shape_126}]},1).to({state:[{t:this.shape_127}]},1).to({state:[{t:this.shape_128}]},1).to({state:[{t:this.shape_129}]},1).to({state:[{t:this.shape_130}]},1).to({state:[{t:this.shape_131}]},1).to({state:[{t:this.shape_132}]},1).to({state:[{t:this.shape_133}]},1).to({state:[{t:this.shape_134}]},1).to({state:[{t:this.shape_135}]},1).to({state:[{t:this.shape_136}]},1).to({state:[{t:this.shape_137}]},1).to({state:[{t:this.shape_138}]},1).to({state:[{t:this.shape_139}]},1).to({state:[{t:this.shape_140}]},1).to({state:[{t:this.shape_141}]},1).to({state:[{t:this.shape_142}]},1).to({state:[{t:this.shape_143}]},1).to({state:[{t:this.shape_144}]},1).to({state:[{t:this.shape_145}]},1).to({state:[{t:this.shape_146}]},1).to({state:[{t:this.shape_147}]},1).to({state:[{t:this.shape_148}]},1).to({state:[{t:this.shape_149}]},1).to({state:[{t:this.shape_150}]},1).to({state:[{t:this.shape_151}]},1).to({state:[{t:this.shape_152}]},1).to({state:[{t:this.shape_153}]},1).to({state:[{t:this.shape_154}]},1).to({state:[{t:this.shape_155}]},1).to({state:[{t:this.shape_156}]},1).to({state:[{t:this.shape_157}]},1).to({state:[{t:this.shape_158}]},1).to({state:[{t:this.shape_159}]},1).to({state:[{t:this.shape_160}]},1).to({state:[{t:this.shape_161}]},1).to({state:[{t:this.shape_162}]},1).to({state:[{t:this.shape_163}]},1).to({state:[{t:this.shape_164}]},1).to({state:[{t:this.shape_165}]},1).to({state:[{t:this.shape_166}]},1).to({state:[{t:this.shape_167}]},1).to({state:[{t:this.shape_168}]},1).to({state:[{t:this.shape_168}]},1).to({state:[{t:this.shape_169}]},1).to({state:[]},1).wait(9));
	this.timeline.addTween(cjs.Tween.get(this.shape_79).wait(1).to({_off:false},0).wait(88).to({_off:true},1).wait(101));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-328.9,1805.7,1429);


(lib.Scene_1_background = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// background
	this.instance = new lib.backgroundgraphic("single",134);
	this.instance.setTransform(668.2,375.6,1,1,0,0,0,902.8,549.5);

	this.instance_1 = new lib.background2("synched",0,false);
	this.instance_1.setTransform(628.15,676.2,1,1,0,0,0,976.2,228.1);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#95E5FC").ss(1,1,1).p("EiYhgjoMExDAAAMAAABHRMkxDAAAg");
	this.shape.setTransform(628.175,676.175);

	this.instance_2 = new lib.sky3("synched",0,false);
	this.instance_2.setTransform(605.6,389.55,1,1,0,0,0,821.6,476);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#6BB9DE").s().p("EjCcBx7MAAAjj1MGE5AAAMAAADj1g");
	this.shape_1.setTransform(673.125,283.15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance,p:{mode:"single",startPosition:134,loop:undefined}}]}).to({state:[{t:this.instance,p:{mode:"synched",startPosition:0,loop:false}}]},2).to({state:[{t:this.shape},{t:this.instance_1}]},182).to({state:[{t:this.instance_2}]},133).to({state:[{t:this.shape_1}]},58).wait(244));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.girltalking = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// head
	this.instance = new lib.girlheadtalking();
	this.instance.setTransform(80,60.95,1,1,0,0,0,91.7,265.7);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:105.8,regY:135.9,rotation:0.0048,x:94.15,y:-68.85},0).wait(1).to({rotation:0.0196,y:-68.8},0).wait(1).to({rotation:0.0443,x:94.25},0).wait(1).to({rotation:0.0791,x:94.3},0).wait(1).to({rotation:0.1234,x:94.4,y:-68.75},0).wait(1).to({rotation:0.1777,x:94.55},0).wait(1).to({rotation:0.242,x:94.7},0).wait(1).to({rotation:0.3162,x:94.85},0).wait(1).to({rotation:0.4004,x:95.05,y:-68.7},0).wait(1).to({rotation:0.4943,x:95.25},0).wait(1).to({rotation:0.5981,x:95.5,y:-68.65},0).wait(1).to({rotation:0.7118,x:95.75},0).wait(1).to({rotation:0.8356,x:96,y:-68.6},0).wait(1).to({rotation:0.969,x:96.35,y:-68.55},0).wait(1).to({rotation:1.1123,x:96.65},0).wait(1).to({rotation:1.2656,x:96.95,y:-68.5},0).wait(1).to({rotation:1.4288,x:97.35,y:-68.45},0).wait(1).to({rotation:1.6017,x:97.75,y:-68.4},0).wait(1).to({rotation:1.7846,x:98.15,y:-68.3},0).wait(1).to({rotation:1.9774,x:98.6},0).wait(1).to({rotation:2.1802,x:99.05,y:-68.2},0).wait(1).to({rotation:2.393,x:99.55,y:-68.1},0).wait(1).to({rotation:2.6154,x:100,y:-68.05},0).wait(1).to({rotation:2.8477,x:100.5,y:-67.95},0).wait(1).to({rotation:3.09,x:101.1,y:-67.9},0).wait(1).to({rotation:3.3423,x:101.6,y:-67.8},0).wait(1).to({rotation:3.6042,x:102.2,y:-67.65},0).wait(1).to({rotation:3.8761,x:102.8,y:-67.55},0).wait(1).to({rotation:4.158,x:103.45,y:-67.45},0).wait(1).to({rotation:4.4498,x:104.1,y:-67.35},0).wait(1).to({rotation:4.7512,x:104.8,y:-67.2},0).wait(1).to({rotation:5.0626,x:105.5,y:-67.1},0).wait(1).to({rotation:5.384,x:106.2,y:-66.9},0).wait(1).to({rotation:5.7154,x:106.9,y:-66.8},0).wait(1).to({rotation:6.0567,x:107.65,y:-66.6},0).wait(1).to({rotation:6.4076,x:108.5,y:-66.45},0).wait(1).to({rotation:6.7685,x:109.3,y:-66.25},0).wait(1).to({rotation:7.1394,x:110.1,y:-66.05},0).wait(1).to({rotation:7.5202,x:110.95,y:-65.85},0).wait(1).to({rotation:7.5973,x:111.1,y:-65.8},0).wait(1).to({rotation:7.3629,x:110.65,y:-65.95},0).wait(1).to({rotation:7.1227,x:110.1,y:-66.1},0).wait(1).to({rotation:6.8766,x:109.55,y:-66.25},0).wait(1).to({rotation:6.6249,x:108.95,y:-66.3},0).wait(1).to({rotation:6.3674,x:108.4,y:-66.45},0).wait(1).to({rotation:6.104,x:107.8,y:-66.55},0).wait(1).to({rotation:5.8348,x:107.2,y:-66.7},0).wait(1).to({rotation:5.5598,x:106.6,y:-66.85},0).wait(1).to({rotation:5.2791,x:105.95,y:-67},0).wait(1).to({rotation:4.9926,x:105.3,y:-67.1},0).wait(1).to({rotation:4.7003,x:104.65,y:-67.25},0).wait(1).to({rotation:4.4021,x:104,y:-67.4},0).wait(1).to({rotation:4.0983,x:103.35,y:-67.5},0).wait(1).to({rotation:3.7886,x:102.6,y:-67.6},0).wait(1).to({rotation:3.4731,x:101.9,y:-67.75},0).wait(1).to({rotation:3.1518,x:101.2,y:-67.85},0).wait(1).to({rotation:2.8249,x:100.45,y:-67.95},0).wait(1).to({rotation:2.4921,x:99.75,y:-68.1},0).wait(1).to({rotation:2.1534,x:98.95,y:-68.25},0).wait(1).to({rotation:1.809,x:98.2,y:-68.3},0).wait(1).to({rotation:1.4587,x:97.4,y:-68.4},0).wait(1).to({rotation:1.1028,x:96.65,y:-68.55},0).wait(1).to({rotation:0.741,x:95.8,y:-68.65},0).wait(1).to({rotation:0.3734,x:94.95,y:-68.7},0).wait(1).to({rotation:0.0002,x:94.15,y:-68.85},0).wait(1));

	// dress
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CC3399").s().p("AE9a1QgOgFgagRQgagQgPgFQgagLgogBQguABgXgBQgngCgdgPQghgQgKgeQg+AUhCgCQhBgBg9gWQg2gXgcgIQgMgEgrgIQgigHgUgJQgcgLgSgWQgUgYACgbQglAAgggXQgggXgNgjQhmAPhrgEQgqgCgbgFQglgIgbgSQgegVgMgiQgMgkAQgdQhAASgkAFQg5AIgsgLQg0gMgigpQgkgsAJgwQg7AMgfACQgyAFgngJQgvgKghggQgkgigDgrQgDgeAPgmIAehAIAWgqQANgXAPgNQAigcA/ACQBJAKAjACQBhAHBug1QBIgiBzhUQBAguAfgYQAzgoAmgkQBZhTBBhqQAyhPAghWIgCgGQgdhVgWieQgYiugUhHIgcheQgRg5gGgnQgJhBALheQAQhqAFg1IAHhjQAFg6AIgnQAJgsAbhJIBpkoQAOgoANgUIAKgPQAHgsAJgYQAPgsAfgTQAcgSAkAGQAkAGAUAaQARAWAGAiQADAWAAApIgDDnQgBA7ADAgQAFAyAQAlQAlBUBoA1QBOApBeALQBZALBbgRQCvgjCTh9QBYhKAWhKQAKgeACgpIABhJQABgTACgRIABgNQAIg5AYghQAWgfAkgLQAmgNAfASQAdARANAoQAJAdACAwQAHCrgEDXIgBAvQAFB7APB3IAKBXQAFAygBAmQgEBegxB7QgcBGg+CKQg4CMgWCOIgIA0QAPAWANAZQAUAnAeBQQAfBRATAlQA2BqBuBjQBGA+CPBkIDLCOQAxAjAYATQAnAhAWAhQAcAnAGAtQAIAwgUAnQgbA1hHAXQgyARhTAEQgYA8hFAUQhFAVg0gmQggANgfBAQggBAgfAPQgXALg2gDQg2gEgXAMQgQAIgUAXQgXAagKAHQgeAYg6ACQhCgBggAEQgiAFgvATIhPAiQg7AYguAAQgbAAgXgJg");
	this.shape.setTransform(63.2089,220.5418);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(66));

	// other_hand
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFC3C3").s().p("ALNY+QgQgIgXgRIgmgbQgQgKgZgLIgpgUIgqgXQgTgIgRgNIgPgJQg/gegdgSQgzgegXglQgVghgDgoQgCgoAQgkQAQgkAggZQANgKAPgHIhAklQgWhlgGgnQgViGALiJQAEg1AIg1Qg4hVhpi7Qhpi4hEhfIgrg7QgagjgQgaQgSgegVgqIgjhKQhHiHgphXQhyhbiBhRQg/gogagVQgvgngTgrQgag7AZhCQAZhCA6gcIhegXQg5gNgjgOQgxgTgjgeQgogigQgqQgSgvAQgwQARgzAsgSQAdgMApAFIBJAOQAfAGA0AFQA/AGATADQBLAMBYAgQA8AWBhArQBEAfAmAUQA5AeArAfQAqAfAuAuQAdAbA1A6QBwB4AyBBQBRBqBKCTQAxBgBKCvIAJAUIADAGQANAbATA1QA4CfAUBFQBLEAAXFDQARDsgIFkQgCBEgEAiQgGAwgOAmIACABIBmBMIBFAsQAlAcATAdQAdAvgKA8QgLA7grAkQgqAkg7AFIgRAAQgwAAgrgXg");
	this.shape_1.setTransform(194.0182,225.8336);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(66));

	// legs
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFC3C3").s().p("AEHUKQhOgHg5gtQgegWgUgfQgVgggIgjQgKgxAOg/QAJglAchIQAdhKASg7IAxigQAihZA0gxQA2gzBOgOQBOgOBFAdIAJAFQAagNASgIQAvgUDjhGQBhgeBIgiIhcgMQjeggiUhDQhCgehMgvQgugehYg7QhjhEgwglQgsgiglghIgSAeQg+BjhfA7QgyAdhdAkIgPAGQAqASAlANIArAPIAUgIQAxgRAwAGQAwAHApAeQApAgARAtQAPAogEA1QgCAlgOA6QgfCBgqCBQgVBAgQAgQgRAigaAlQgSAaghAoQgYAbgNANQgVAWgVANQgyAghBgFQhAgEgygkQgrgggSgrQgNghgCg7QgDiIAjh/IhZgLQlMgpicgXQkPgojWguQhqgXhBgVQhcgfhDgsQhshHg6h0QgZgxgLgyQgsg9gIhUQgJhjAshaQAohTBPhCQBHg8BfgnQBPghBqgXQA8gNCDgUIFpg3QBzgSA9gMIAngJQAcgPApgeIBCgxIBHgtQAqgbAXgZQAbgdAihCQAlhGAWgbQAhgnAvgXQAvgXAyABQAzABAuAZQAvAaAZAsQAgA3gDBWQgBAygPBlQA1AQAkAvQAkAwgBA3QAAAhgNAjIAKAAQAmACApAZQALAGANAKQgQg+AFhDQAHhoA2hVQArhCBAgiQBIgmBBAWQAUAGATANQADgWATgVQAYgZAngRQA7gYA8gEQBAgFA3AUQAkAMAnAaQAYAQAsAhIDzC6QBxBWA/AzQBgBNBKBEQA0AyA4A6QBHAaA0AiQBgBABIBwQBGBrAgCBQAeB+gkBSIgHAQQACATABAUQACBegsBQQgfA6g6A2QgrAohIAyQh+BXhaAlQhdAmiZAZQiJAXitANQhnAJjQALQhYAFguAAQgUAdgIAQQgMAXgJAiIgPA6QgSA+gbA6QgdA5gdAZQgeAbgsALQgcAHgfAAIgagBg");
	this.shape_2.setTransform(49.8473,375.967);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(66));

	// torso
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFC3C3").s().p("Ag+ZhQiwgXifhLQiUhFhfhsQhth7gGiMQgChDAYhcQAghnANg0QAkiHAAiOQAAiNgliHQgJgjgfhdQgahRgLgvQgYhpABh9QAAhlASiDQAKhLAMgzQAPhEAYg2QAcg9ApgvQAtgyA4gbQA6gbB1gLQBagIA0gMIABgDQAFgTAHgnQAUhsAJhKQALhkgDhUQgCg7ABgMQABgnALgdQAQgqAngbQAogbAtAAQAsABAnAbQAnAbAQAqIACAFQANAHAOALQAiAaANAcQAKAVABAcIAAAbQAIAqgCA5QgCBJACAaQAEA2ATAlQAgA9BYApQAyAYBpAqQBAAgAzAyQA0AyAiA/QAwBbAWCXQAYCqgYB5QgMA9geBPQgRAtgmBZQheDsgSDXQgUD6BXDGIAxBnQAfA+ANArQASA7gEA3QgEA9ggAsQgiAvg+ALQgfAFgagHQgYA7gvAoQgmAgg3AUQgsAQg9ALQhhAShjAAQhLAAhMgLg");
	this.shape_3.setTransform(79.0043,164.3613);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(66));

	// Layer_1
	this.instance_1 = new lib.girlarmmoving("synched",0);
	this.instance_1.setTransform(18.05,116.25,1,1,-29.9992,0,0,243.7,86.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).to({regX:109,regY:103.9,rotation:-28.1759,x:-92.25,y:195.55,startPosition:1},0).wait(1).to({rotation:-26.3801,x:-94.7,y:192.05,startPosition:2},0).wait(1).to({rotation:-24.6128,x:-97,y:188.5,startPosition:3},0).wait(1).to({rotation:-22.874,x:-99.1,y:185.05,startPosition:4},0).wait(1).to({rotation:-21.1628,x:-101.1,y:181.5,startPosition:5},0).wait(1).to({rotation:-19.4801,x:-103,y:177.95,startPosition:6},0).wait(1).to({rotation:-17.8258,x:-104.75,y:174.45,startPosition:7},0).wait(1).to({rotation:-16.2001,x:-106.3,y:170.9,startPosition:8},0).wait(1).to({rotation:-14.6028,x:-107.75,y:167.45,startPosition:9},0).wait(1).to({rotation:-13.0331,x:-109.1,y:163.95,startPosition:10},0).wait(1).to({rotation:-11.4919,x:-110.4,y:160.55,startPosition:11},0).wait(1).to({rotation:-9.9792,x:-111.5,y:157.15,startPosition:12},0).wait(1).to({rotation:-8.495,x:-112.5,y:153.75,startPosition:13},0).wait(1).to({rotation:-7.0383,x:-113.4,y:150.4,startPosition:14},0).wait(1).to({rotation:-5.6102,x:-114.2,y:147.15,startPosition:15},0).wait(1).to({rotation:-4.2105,x:-114.95,y:143.9,startPosition:16},0).wait(1).to({rotation:-2.8393,x:-115.6,y:140.7,startPosition:17},0).wait(1).to({rotation:-1.5221,x:-116.1,y:137.6,startPosition:18},0).wait(1).to({rotation:-2.7212,x:-115.6,y:140.5,startPosition:19},0).wait(1).to({rotation:-3.8943,x:-115.1,y:143.15,startPosition:20},0).wait(1).to({rotation:-5.0414,x:-114.5,y:145.8,startPosition:21},0).wait(1).to({rotation:-6.1625,x:-113.95,y:148.4,startPosition:22},0).wait(1).to({rotation:-7.2586,x:-113.25,y:150.95,startPosition:23},0).wait(1).to({rotation:-8.3286,x:-112.6,y:153.35,startPosition:24},0).wait(1).to({rotation:-9.3727,x:-111.95,y:155.75,startPosition:25},0).wait(1).to({rotation:-10.3908,x:-111.2,y:158.1,startPosition:26},0).wait(1).to({rotation:-11.3837,x:-110.45,y:160.3,startPosition:27},0).wait(1).to({rotation:-12.3507,x:-109.7,y:162.5,startPosition:28},0).wait(1).to({rotation:-13.2917,x:-108.9,y:164.55,startPosition:29},0).wait(1).to({rotation:-14.2067,x:-108.15,y:166.55,startPosition:30},0).wait(1).to({rotation:-15.0966,x:-107.35,y:168.5,startPosition:31},0).wait(1).to({rotation:-15.9605,x:-106.55,y:170.45,startPosition:32},0).wait(1).to({rotation:-16.7984,x:-105.7,y:172.2,startPosition:33},0).wait(1).to({rotation:-17.6104,x:-104.9,y:173.95,startPosition:34},0).wait(1).to({rotation:-18.3964,x:-104.1,y:175.65,startPosition:35},0).wait(1).to({rotation:-19.1572,x:-103.35,y:177.3,startPosition:36},0).wait(1).to({rotation:-19.8921,x:-102.55,y:178.8,startPosition:37},0).wait(1).to({rotation:-20.601,x:-101.75,y:180.3,startPosition:38},0).wait(1).to({rotation:-21.2847,x:-101,y:181.75,startPosition:39},0).wait(1).to({rotation:-21.9416,x:-100.25,y:183.05,startPosition:40},0).wait(1).to({rotation:-22.5734,x:-99.45,y:184.4,startPosition:41},0).wait(1).to({rotation:-23.1793,x:-98.75,y:185.6,startPosition:42},0).wait(1).to({rotation:-23.7591,x:-98.05,y:186.85,startPosition:43},0).wait(1).to({rotation:-24.3138,x:-97.3,y:187.9,startPosition:44},0).wait(1).to({rotation:-24.8426,x:-96.7,y:189,startPosition:45},0).wait(1).to({rotation:-25.3453,x:-96,y:190,startPosition:46},0).wait(1).to({rotation:-25.8221,x:-95.45,y:190.95,startPosition:47},0).wait(1).to({rotation:-26.2729,x:-94.8,y:191.8,startPosition:48},0).wait(1).to({rotation:-26.6986,x:-94.25,y:192.65,startPosition:49},0).wait(1).to({rotation:-27.0983,x:-93.7,y:193.45,startPosition:50},0).wait(1).to({rotation:-27.472,x:-93.2,y:194.2,startPosition:51},0).wait(1).to({rotation:-27.8197,x:-92.75,y:194.9,startPosition:52},0).wait(1).to({rotation:-28.1423,x:-92.3,y:195.45,startPosition:53},0).wait(1).to({rotation:-28.439,x:-91.85,y:196.05,startPosition:54},0).wait(1).to({rotation:-28.7096,x:-91.55,y:196.6,startPosition:55},0).wait(1).to({rotation:-28.9543,x:-91.15,y:197.05,startPosition:56},0).wait(1).to({rotation:-29.1738,x:-90.9,y:197.4,startPosition:57},0).wait(1).to({rotation:-29.3674,x:-90.6,y:197.8,startPosition:58},0).wait(1).to({rotation:-29.535,x:-90.35,y:198.1,startPosition:59},0).wait(1).to({rotation:-29.6766,x:-90.15,y:198.4,startPosition:60},0).wait(1).to({rotation:-29.7922,x:-90,y:198.6,startPosition:61},0).wait(1).to({rotation:-29.8827,x:-89.85,y:198.8,startPosition:62},0).wait(1).to({rotation:-29.9472,x:-89.75,y:198.95,startPosition:63},0).wait(1).to({rotation:-29.9858,x:-89.7,startPosition:64},0).wait(1).to({rotation:-29.9984,y:199,startPosition:65},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-250.9,-232.1,543.2,737.2);


(lib.girlnotalking = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// head
	this.instance = new lib.girlheadquiet();
	this.instance.setTransform(80,60.95,1,1,0,0,0,91.7,265.7);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:105.8,regY:135.9,rotation:0.1641,x:94.5,y:-68.8},0).wait(1).to({rotation:0.3282,x:94.85,y:-68.75},0).wait(1).to({rotation:0.4923,x:95.25,y:-68.7},0).wait(1).to({rotation:0.6564,x:95.65,y:-68.65},0).wait(1).to({rotation:0.8205,x:96,y:-68.6},0).wait(1).to({rotation:0.9846,x:96.35,y:-68.55},0).wait(1).to({rotation:1.1488,x:96.75},0).wait(1).to({rotation:1.3129,x:97.1,y:-68.5},0).wait(1).to({rotation:1.477,x:97.45,y:-68.4},0).wait(1).to({rotation:1.6411,x:97.8,y:-68.35},0).wait(1).to({rotation:1.8052,x:98.2,y:-68.3},0).wait(1).to({rotation:1.9693,x:98.6,y:-68.25},0).wait(1).to({rotation:2.1334,x:99,y:-68.2},0).wait(1).to({rotation:2.2975,x:99.3,y:-68.15},0).wait(1).to({rotation:2.4616,x:99.65,y:-68.1},0).wait(1).to({rotation:2.6257,x:100,y:-68.05},0).wait(1).to({rotation:2.7898,x:100.35,y:-67.95},0).wait(1).to({rotation:2.9539,x:100.75},0).wait(1).to({rotation:3.118,x:101.1,y:-67.85},0).wait(1).to({rotation:3.2821,x:101.5,y:-67.8},0).wait(1).to({rotation:3.4463,x:101.85,y:-67.75},0).wait(1).to({rotation:3.6104,x:102.25,y:-67.65},0).wait(1).to({rotation:3.7745,x:102.55},0).wait(1).to({rotation:3.9386,x:102.95,y:-67.55},0).wait(1).to({rotation:4.1027,x:103.35,y:-67.5},0).wait(1).to({rotation:4.2668,x:103.7,y:-67.45},0).wait(1).to({rotation:4.4309,x:104.1,y:-67.35},0).wait(1).to({rotation:4.595,x:104.4,y:-67.25},0).wait(1).to({rotation:4.7591,x:104.85,y:-67.15},0).wait(1).to({rotation:4.9232,x:105.15,y:-67.1},0).wait(1).to({rotation:5.0873,x:105.55,y:-67.05},0).wait(1).to({rotation:5.2514,x:105.9,y:-66.95},0).wait(1).to({rotation:5.4155,x:106.25,y:-66.9},0).wait(1).to({rotation:5.5796,x:106.65,y:-66.85},0).wait(1).to({rotation:5.7438,x:107,y:-66.75},0).wait(1).to({rotation:5.9079,x:107.35,y:-66.65},0).wait(1).to({rotation:6.072,x:107.75,y:-66.6},0).wait(1).to({rotation:6.2361,x:108.1,y:-66.5},0).wait(1).to({rotation:6.4002,x:108.45,y:-66.45},0).wait(1).to({rotation:6.5643,x:108.8,y:-66.35},0).wait(1).to({rotation:6.7284,x:109.2,y:-66.3},0).wait(1).to({rotation:6.8925,x:109.55,y:-66.2},0).wait(1).to({rotation:7.0566,x:109.9,y:-66.1},0).wait(1).to({rotation:7.2207,x:110.25,y:-66.05},0).wait(1).to({rotation:7.3848,x:110.65,y:-65.95},0).wait(1).to({rotation:7.5489,x:111.05,y:-65.85},0).wait(1).to({rotation:7.713,x:111.35,y:-65.75},0).wait(1).to({rotation:7.6178,x:111.15,y:-65.85},0).wait(1).to({rotation:7.5226,x:110.95},0).wait(1).to({rotation:7.4274,x:110.75,y:-65.9},0).wait(1).to({rotation:7.3321,x:110.55,y:-65.95},0).wait(1).to({rotation:7.2369,x:110.35,y:-66},0).wait(1).to({rotation:7.1417,x:110.1,y:-66.05},0).wait(1).to({rotation:7.0465,x:109.9,y:-66.1},0).wait(1).to({rotation:6.9513,x:109.65,y:-66.15},0).wait(1).to({rotation:6.856,x:109.5},0).wait(1).to({rotation:6.7608,x:109.25,y:-66.25},0).wait(1).to({rotation:6.6656,x:109.1},0).wait(1).to({rotation:6.5704,x:108.85,y:-66.35},0).wait(1).to({rotation:6.4751,x:108.6},0).to({_off:true},1).wait(68));

	// dress
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CC3399").s().p("AE9a1QgOgFgagRQgagQgPgFQgagLgogBQguABgXgBQgngCgdgPQghgQgKgeQg+AUhCgCQhBgBg9gWQg2gXgcgIQgMgEgrgIQgigHgUgJQgcgLgSgWQgUgYACgbQglAAgggXQgggXgNgjQhmAPhrgEQgqgCgbgFQglgIgbgSQgegVgMgiQgMgkAQgdQhAASgkAFQg5AIgsgLQg0gMgigpQgkgsAJgwQg7AMgfACQgyAFgngJQgvgKghggQgkgigDgrQgDgeAPgmIAehAIAWgqQANgXAPgNQAigcA/ACQBJAKAjACQBhAHBug1QBIgiBzhUQBAguAfgYQAzgoAmgkQBZhTBBhqQAyhPAghWIgCgGQgdhVgWieQgYiugUhHIgcheQgRg5gGgnQgJhBALheQAQhqAFg1IAHhjQAFg6AIgnQAJgsAbhJIBpkoQAOgoANgUIAKgPQAHgsAJgYQAPgsAfgTQAcgSAkAGQAkAGAUAaQARAWAGAiQADAWAAApIgDDnQgBA7ADAgQAFAyAQAlQAlBUBoA1QBOApBeALQBZALBbgRQCvgjCTh9QBYhKAWhKQAKgeACgpIABhJQABgTACgRIABgNQAIg5AYghQAWgfAkgLQAmgNAfASQAdARANAoQAJAdACAwQAHCrgEDXIgBAvQAFB7APB3IAKBXQAFAygBAmQgEBegxB7QgcBGg+CKQg4CMgWCOIgIA0QAPAWANAZQAUAnAeBQQAfBRATAlQA2BqBuBjQBGA+CPBkIDLCOQAxAjAYATQAnAhAWAhQAcAnAGAtQAIAwgUAnQgbA1hHAXQgyARhTAEQgYA8hFAUQhFAVg0gmQggANgfBAQggBAgfAPQgXALg2gDQg2gEgXAMQgQAIgUAXQgXAagKAHQgeAYg6ACQhCgBggAEQgiAFgvATIhPAiQg7AYguAAQgbAAgXgJg");
	this.shape.setTransform(63.2089,220.5418);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(60).to({_off:true},1).wait(68));

	// other_hand
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFC3C3").s().p("ALNY+QgQgIgXgRIgmgbQgQgKgZgLIgpgUIgqgXQgTgIgRgNIgPgJQg/gegdgSQgzgegXglQgVghgDgoQgCgoAQgkQAQgkAggZQANgKAPgHIhAklQgWhlgGgnQgViGALiJQAEg1AIg1Qg4hVhpi7Qhpi4hEhfIgrg7QgagjgQgaQgSgegVgqIgjhKQhHiHgphXQhyhbiBhRQg/gogagVQgvgngTgrQgag7AZhCQAZhCA6gcIhegXQg5gNgjgOQgxgTgjgeQgogigQgqQgSgvAQgwQARgzAsgSQAdgMApAFIBJAOQAfAGA0AFQA/AGATADQBLAMBYAgQA8AWBhArQBEAfAmAUQA5AeArAfQAqAfAuAuQAdAbA1A6QBwB4AyBBQBRBqBKCTQAxBgBKCvIAJAUIADAGQANAbATA1QA4CfAUBFQBLEAAXFDQARDsgIFkQgCBEgEAiQgGAwgOAmIACABIBmBMIBFAsQAlAcATAdQAdAvgKA8QgLA7grAkQgqAkg7AFIgRAAQgwAAgrgXg");
	this.shape_1.setTransform(194.0182,225.8336);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(60).to({_off:true},1).wait(68));

	// legs
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFC3C3").s().p("AEHUKQhOgHg5gtQgegWgUgfQgVgggIgjQgKgxAOg/QAJglAchIQAdhKASg7IAxigQAihZA0gxQA2gzBOgOQBOgOBFAdIAJAFQAagNASgIQAvgUDjhGQBhgeBIgiIhcgMQjeggiUhDQhCgehMgvQgugehYg7QhjhEgwglQgsgiglghIgSAeQg+BjhfA7QgyAdhdAkIgPAGQAqASAlANIArAPIAUgIQAxgRAwAGQAwAHApAeQApAgARAtQAPAogEA1QgCAlgOA6QgfCBgqCBQgVBAgQAgQgRAigaAlQgSAaghAoQgYAbgNANQgVAWgVANQgyAghBgFQhAgEgygkQgrgggSgrQgNghgCg7QgDiIAjh/IhZgLQlMgpicgXQkPgojWguQhqgXhBgVQhcgfhDgsQhshHg6h0QgZgxgLgyQgsg9gIhUQgJhjAshaQAohTBPhCQBHg8BfgnQBPghBqgXQA8gNCDgUIFpg3QBzgSA9gMIAngJQAcgPApgeIBCgxIBHgtQAqgbAXgZQAbgdAihCQAlhGAWgbQAhgnAvgXQAvgXAyABQAzABAuAZQAvAaAZAsQAgA3gDBWQgBAygPBlQA1AQAkAvQAkAwgBA3QAAAhgNAjIAKAAQAmACApAZQALAGANAKQgQg+AFhDQAHhoA2hVQArhCBAgiQBIgmBBAWQAUAGATANQADgWATgVQAYgZAngRQA7gYA8gEQBAgFA3AUQAkAMAnAaQAYAQAsAhIDzC6QBxBWA/AzQBgBNBKBEQA0AyA4A6QBHAaA0AiQBgBABIBwQBGBrAgCBQAeB+gkBSIgHAQQACATABAUQACBegsBQQgfA6g6A2QgrAohIAyQh+BXhaAlQhdAmiZAZQiJAXitANQhnAJjQALQhYAFguAAQgUAdgIAQQgMAXgJAiIgPA6QgSA+gbA6QgdA5gdAZQgeAbgsALQgcAHgfAAIgagBg");
	this.shape_2.setTransform(49.8473,375.967);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(60).to({_off:true},1).wait(68));

	// torso
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFC3C3").s().p("Ag+ZhQiwgXifhLQiUhFhfhsQhth7gGiMQgChDAYhcQAghnANg0QAkiHAAiOQAAiNgliHQgJgjgfhdQgahRgLgvQgYhpABh9QAAhlASiDQAKhLAMgzQAPhEAYg2QAcg9ApgvQAtgyA4gbQA6gbB1gLQBagIA0gMIABgDQAFgTAHgnQAUhsAJhKQALhkgDhUQgCg7ABgMQABgnALgdQAQgqAngbQAogbAtAAQAsABAnAbQAnAbAQAqIACAFQANAHAOALQAiAaANAcQAKAVABAcIAAAbQAIAqgCA5QgCBJACAaQAEA2ATAlQAgA9BYApQAyAYBpAqQBAAgAzAyQA0AyAiA/QAwBbAWCXQAYCqgYB5QgMA9geBPQgRAtgmBZQheDsgSDXQgUD6BXDGIAxBnQAfA+ANArQASA7gEA3QgEA9ggAsQgiAvg+ALQgfAFgagHQgYA7gvAoQgmAgg3AUQgsAQg9ALQhhAShjAAQhLAAhMgLg");
	this.shape_3.setTransform(79.0043,164.3613);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(60).to({_off:true},1).wait(68));

	// Layer_1
	this.instance_1 = new lib.girlarmnotmoving("synched",0,false);
	this.instance_1.setTransform(18.05,116.25,1,1,-29.9992,0,0,243.7,86.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).to({regX:98.3,regY:130.8,rotation:-30.0423,x:-85.4,y:227.75,startPosition:1},0).wait(1).to({rotation:-30.0855,x:-85.35,y:227.8,startPosition:2},0).wait(1).to({rotation:-30.1286,x:-85.25,y:227.9,startPosition:3},0).wait(1).to({rotation:-30.1717,x:-85.15,y:228,startPosition:4},0).wait(1).to({rotation:-30.2148,x:-85.1,y:228.1,startPosition:5},0).wait(1).to({rotation:-30.258,x:-85,startPosition:6},0).wait(1).to({rotation:-30.3011,x:-84.9,y:228.2,startPosition:7},0).wait(1).to({rotation:-30.3442,x:-84.8,y:228.3,startPosition:8},0).wait(1).to({rotation:-30.3873,x:-84.75,y:228.4,startPosition:9},0).wait(1).to({rotation:-30.4305,x:-84.65,y:228.45,startPosition:10},0).wait(1).to({rotation:-30.4736,x:-84.6,y:228.55,startPosition:11},0).wait(1).to({rotation:-30.5167,x:-84.5,y:228.6,startPosition:12},0).wait(1).to({rotation:-30.5598,x:-84.4,y:228.65,startPosition:13},0).wait(1).to({rotation:-30.603,x:-84.3,y:228.75,startPosition:14},0).wait(1).to({rotation:-30.6461,y:228.85,startPosition:15},0).wait(1).to({rotation:-30.6892,x:-84.15,y:228.95,startPosition:16},0).wait(1).to({rotation:-30.7323,x:-84.05,startPosition:17},0).wait(1).to({rotation:-30.7755,x:-83.95,y:229.05,startPosition:18},0).wait(1).to({rotation:-30.8186,x:-83.9,y:229.15,startPosition:19},0).wait(1).to({rotation:-30.8617,x:-83.8,y:229.25,startPosition:20},0).wait(1).to({rotation:-30.9048,x:-83.7,y:229.3,startPosition:21},0).wait(1).to({rotation:-30.948,x:-83.65,y:229.4,startPosition:22},0).wait(1).to({rotation:-30.9911,x:-83.55,y:229.45,startPosition:23},0).wait(1).to({rotation:-31.0342,x:-83.45,y:229.5,startPosition:24},0).wait(1).to({rotation:-31.0773,x:-83.4,y:229.6,startPosition:25},0).wait(1).to({rotation:-31.1205,x:-83.3,y:229.7,startPosition:26},0).wait(1).to({rotation:-31.1636,x:-83.2,y:229.75,startPosition:27},0).wait(1).to({rotation:-31.2067,x:-83.1,startPosition:28},0).wait(1).to({rotation:-31.2498,x:-83.05,y:229.85,startPosition:29},0).wait(1).to({rotation:-31.293,x:-82.95,y:229.95,startPosition:30},0).wait(1).to({rotation:-31.3361,x:-82.9,y:230.05,startPosition:31},0).wait(1).to({rotation:-31.3792,x:-82.8,y:230.1,startPosition:32},0).wait(1).to({rotation:-31.4223,x:-82.65,y:230.15,startPosition:33},0).wait(1).to({rotation:-31.4655,y:230.25,startPosition:34},0).wait(1).to({rotation:-31.5086,x:-82.55,y:230.35,startPosition:35},0).wait(1).to({rotation:-31.4924,startPosition:36},0).wait(1).to({rotation:-31.4761,y:230.25,startPosition:37},0).wait(1).to({rotation:-31.4599,x:-82.65,startPosition:38},0).wait(1).to({rotation:-31.4437,y:230.2},0).wait(1).to({rotation:-31.4274},0).wait(1).to({rotation:-31.4112,x:-82.75,y:230.15},0).wait(1).to({rotation:-31.395},0).wait(1).to({rotation:-31.3787,x:-82.8,y:230.1},0).wait(1).to({rotation:-31.3625,x:-82.85},0).wait(1).to({rotation:-31.3463,y:230.05},0).wait(1).to({rotation:-31.33,x:-82.9},0).wait(1).to({rotation:-31.3138,y:230},0).wait(1).to({rotation:-31.2976,x:-82.95,y:229.95},0).wait(1).to({rotation:-31.2814,x:-83},0).wait(1).to({rotation:-31.2651},0).wait(1).to({rotation:-31.2489,x:-83.05,y:229.85},0).wait(1).to({rotation:-31.2327,x:-83.1,y:229.9},0).wait(1).to({rotation:-31.2164,y:229.8},0).wait(1).to({rotation:-31.2002,x:-83.15,y:229.85},0).wait(1).to({rotation:-31.184,y:229.75},0).wait(1).to({rotation:-31.1677,x:-83.2},0).wait(1).to({rotation:-31.1515,x:-83.25,y:229.7},0).wait(1).to({rotation:-31.1353,y:229.65},0).wait(1).to({rotation:-31.119,x:-83.3,y:229.7},0).wait(1).to({rotation:-31.1028,x:-83.35,y:229.6},0).to({_off:true},1).wait(68));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-224.6,-232.1,516.9,737.2);


(lib.Scene_1_johnny = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// johnny
	this.instance = new lib.girlnotalking("single",0);
	this.instance.setTransform(946.9,484.55,0.4596,0.4596,0,0,0,20,137.3);

	this.instance_1 = new lib.johnnynotalking();
	this.instance_1.setTransform(377.45,474.25,0.4151,0.4151,0,0,0,276.4,385);

	this.instance_2 = new lib.johnnytalking("synched",56);
	this.instance_2.setTransform(518.2,396.9,0.5928,0.5928,0,0,0,275.8,384.4);

	this.instance_3 = new lib.johnnyear("synched",0);
	this.instance_3.setTransform(211.95,350.95,0.7311,0.7311,0,0,0,346.4,458.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1,p:{regX:276.4,regY:385,scaleX:0.4151,scaleY:0.4151,x:377.45,y:474.25,mode:"independent",startPosition:undefined,loop:undefined}},{t:this.instance}]}).to({state:[{t:this.instance_1,p:{regX:275.8,regY:384.4,scaleX:0.5928,scaleY:0.5928,x:518.2,y:396.9,mode:"synched",startPosition:1,loop:undefined}}]},2).to({state:[{t:this.instance_2}]},54).to({state:[{t:this.instance_1,p:{regX:275.8,regY:384.4,scaleX:0.5928,scaleY:0.5928,x:518.2,y:396.9,mode:"synched",startPosition:52,loop:false}}]},67).to({state:[]},61).to({state:[{t:this.instance_3}]},191).wait(244));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_girl = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// girl
	this.instance = new lib.girlnotalking("single",0);
	this.instance.setTransform(815.5,388.5,0.6296,0.6296,0,0,0,25,129.8);

	this.instance_1 = new lib.girltalking("synched",0,false);
	this.instance_1.setTransform(815.5,388.5,0.6296,0.6296,0,0,0,25,129.8);

	this.instance_2 = new lib.girlface("synched",0,false);
	this.instance_2.setTransform(642.05,369.9,1,1,0,0,0,205.3,267.1);

	this.instance_3 = new lib.girlprofiletalking("single",0);
	this.instance_3.setTransform(1222.7,307,0.874,0.874,0,0,0,36.1,72.2);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance,p:{regX:25,x:815.5,mode:"single",loop:undefined}}]},2).to({state:[{t:this.instance_1}]},54).to({state:[{t:this.instance,p:{regX:24.9,x:815.45,mode:"synched",loop:false}}]},67).to({state:[]},61).to({state:[{t:this.instance_2}]},133).to({state:[{t:this.instance_3}]},58).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).wait(194));
	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(375).to({_off:false},0).wait(1).to({regX:464.4,regY:-107.7,x:1597,y:149.65},0).wait(1).to({x:1596.85,y:149.4},0).wait(1).to({x:1596.7,y:149},0).wait(1).to({x:1596.4,y:148.45},0).wait(1).to({x:1596.05,y:147.75},0).wait(1).to({x:1595.65,y:146.9},0).wait(1).to({x:1595.15,y:145.85},0).wait(1).to({x:1594.55,y:144.65},0).wait(1).to({x:1593.9,y:143.35},0).wait(1).to({x:1593.15,y:141.85},0).wait(1).to({x:1592.35,y:140.15},0).wait(1).to({x:1591.45,y:138.35},0).wait(1).to({x:1590.5,y:136.4},0).wait(1).to({x:1589.45,y:134.25},0).wait(1).to({x:1588.35,y:131.95},0).wait(1).to({x:1587.15,y:129.5},0).wait(1).to({x:1585.85,y:126.9},0).wait(1).to({x:1584.5,y:124.15},0).wait(1).to({x:1583.1,y:121.25},0).wait(1).to({x:1581.55,y:118.15},0).wait(1).to({x:1580,y:114.9},0).wait(1).to({x:1578.35,y:111.5},0).wait(1).to({x:1576.6,y:107.95},0).wait(1).to({x:1574.75,y:104.25},0).wait(1).to({x:1572.9,y:100.4},0).wait(1).to({x:1570.9,y:96.35},0).wait(1).to({x:1568.85,y:92.2},0).wait(1).to({x:1566.75,y:87.85},0).wait(1).to({x:1564.55,y:83.35},0).wait(1).to({x:1562.25,y:78.65},0).wait(1).to({x:1559.9,y:73.85},0).wait(1).to({x:1557.45,y:68.9},0).wait(1).to({x:1554.95,y:63.75},0).wait(1).to({x:1552.35,y:58.45},0).wait(1).to({x:1549.7,y:53},0).wait(1).to({x:1546.95,y:47.4},0).wait(1).to({x:1544.15,y:41.65},0).wait(1).to({x:1541.25,y:35.75},0).wait(1).to({x:1538.25,y:29.65},0).wait(1).to({x:1535.2,y:23.4},0).wait(1).to({x:1532.1,y:17},0).wait(1).to({x:1528.9,y:10.45},0).wait(1).to({x:1525.6,y:3.75},0).wait(1).to({x:1522.25,y:-3.1},0).wait(1).to({x:1518.8,y:-10.15},0).wait(1).to({x:1515.3,y:-17.3},0).wait(1).to({x:1511.7,y:-24.65},0).wait(1).to({x:1508,y:-32.15},0).wait(1).to({x:1504.25,y:-39.85},0).wait(1).to({regX:36.1,regY:72.2,x:1129.9,y:117.4,mode:"synched",loop:false},0).wait(194));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


// stage content:
(lib.johnnyfinal = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,1,2,617,618];
	this.streamSoundSymbolsList[1] = [{id:"johnny_1",startFrame:1,endFrame:619,loop:1,offset:0}];
	this.___GetDepth___ = function(obj) {
		var depth = obj.depth;
		var cameraObj = this.___camera___instance;
		if(cameraObj && cameraObj.depth && obj.isAttachedToCamera)
		{
			depth += depth + cameraObj.depth;
		}
		return depth;
		}
	this.___needSorting___ = function() {
		for (var i = 0; i < this.numChildren - 1; i++)
		{
			var prevDepth = this.___GetDepth___(this.getChildAt(i));
			var nextDepth = this.___GetDepth___(this.getChildAt(i + 1));
			if (prevDepth < nextDepth)
				return true;
		}
		return false;
	}
	this.___sortFunction___ = function(obj1, obj2) {
		return (this.exportRoot.___GetDepth___(obj2) - this.exportRoot.___GetDepth___(obj1));
	}
	this.on('tick', function (event){
		var curTimeline = event.currentTarget;
		if (curTimeline.___needSorting___()){
			this.sortChildren(curTimeline.___sortFunction___);
		}
	});

	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		this.start = this.buttons.start;
		var self=this;
		self.stop();
		
		self.start.addEventListener("click",startPlaying);
		
		function startPlaying()
		{
			self.gotoAndPlay(1);
		}
	}
	this.frame_1 = function() {
		var soundInstance = playSound("johnny_1",0);
		this.InsertIntoSoundStreamData(soundInstance,1,619,1);
	}
	this.frame_2 = function() {
		this.start = undefined;
	}
	this.frame_617 = function() {
		this.replay = this.buttons.replay;
		var self=this;
		self.stop();
		
		self.replay.addEventListener("click",playAgain);
		
		function playAgain()
		{
		self.gotoAndPlay(1);	
			}
	}
	this.frame_618 = function() {
		this.___loopingOver___ = true;
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1).call(this.frame_2).wait(615).call(this.frame_617).wait(1).call(this.frame_618).wait(1));

	// Camera
	this.___camera___instance = new lib.___Camera___();
	this.___camera___instance.name = "___camera___instance";
	this.___camera___instance.setTransform(672.7,394.6,0.9111,0.9111);
	this.___camera___instance.depth = 0;
	this.___camera___instance.visible = false;

	this.timeline.addTween(cjs.Tween.get(this.___camera___instance).wait(1).to({x:672.6991,y:394.5991},0).wait(1).to({x:672.6962,y:394.596},0).wait(1).to({x:672.6912,y:394.5907},0).wait(1).to({scaleX:0.9112,scaleY:0.9112,x:672.6844,y:394.5836},0).wait(1).to({x:672.6757,y:394.5743},0).wait(1).to({scaleX:0.9113,scaleY:0.9113,x:672.6649,y:394.5629},0).wait(1).to({scaleX:0.9114,scaleY:0.9114,x:672.6522,y:394.5495},0).wait(1).to({scaleX:0.9115,scaleY:0.9115,x:672.6375,y:394.534},0).wait(1).to({scaleX:0.9116,scaleY:0.9116,x:672.6209,y:394.5164},0).wait(1).to({scaleX:0.9118,scaleY:0.9118,x:672.6023,y:394.4968},0).wait(1).to({scaleX:0.9119,scaleY:0.9119,x:672.5817,y:394.475},0).wait(1).to({scaleX:0.9121,scaleY:0.9121,x:672.5593,y:394.4514},0).wait(1).to({scaleX:0.9123,scaleY:0.9123,x:672.5348,y:394.4255},0).wait(1).to({scaleX:0.9125,scaleY:0.9125,x:672.5083,y:394.3975},0).wait(1).to({scaleX:0.9127,scaleY:0.9127,x:672.48,y:394.3676},0).wait(1).to({scaleX:0.9129,scaleY:0.9129,x:672.4497,y:394.3357},0).wait(1).to({scaleX:0.9131,scaleY:0.9131,x:672.4173,y:394.3015},0).wait(1).to({scaleX:0.9134,scaleY:0.9134,x:672.3831,y:394.2653},0).wait(1).to({scaleX:0.9136,scaleY:0.9136,x:672.347,y:394.2272},0).wait(1).to({scaleX:0.9139,scaleY:0.9139,x:672.3088,y:394.1869},0).wait(1).to({scaleX:0.9142,scaleY:0.9142,x:672.2687,y:394.1445},0).wait(1).to({scaleX:0.9145,scaleY:0.9145,x:672.2266,y:394.1001},0).wait(1).to({scaleX:0.9148,scaleY:0.9148,x:672.1826,y:394.0536},0).wait(1).to({scaleX:0.9152,scaleY:0.9152,x:672.1366,y:394.005},0).wait(1).to({scaleX:0.9155,scaleY:0.9155,x:672.0886,y:393.9543},0).wait(1).to({scaleX:0.9159,scaleY:0.9159,x:672.0389,y:393.9018},0).wait(1).to({scaleX:0.9163,scaleY:0.9163,x:671.9869,y:393.8469},0).wait(1).to({scaleX:0.9166,scaleY:0.9166,x:671.9331,y:393.79},0).wait(1).to({scaleX:0.9171,scaleY:0.9171,x:671.8774,y:393.7312},0).wait(1).to({scaleX:0.9175,scaleY:0.9175,x:671.8196,y:393.6702},0).wait(1).to({scaleX:0.9179,scaleY:0.9179,x:671.7599,y:393.6072},0).wait(1).to({scaleX:0.9184,scaleY:0.9184,x:671.6983,y:393.5422},0).wait(1).to({scaleX:0.9188,scaleY:0.9188,x:671.6348,y:393.475},0).wait(1).to({scaleX:0.9193,scaleY:0.9193,x:671.5693,y:393.4058},0).wait(1).to({scaleX:0.9198,scaleY:0.9198,x:671.5018,y:393.3346},0).wait(1).to({scaleX:0.9203,scaleY:0.9203,x:671.4323,y:393.2612},0).wait(1).to({scaleX:0.9208,scaleY:0.9208,x:671.3609,y:393.1858},0).wait(1).to({scaleX:0.9214,scaleY:0.9214,x:671.2875,y:393.1082},0).wait(1).to({scaleX:0.9219,scaleY:0.9219,x:671.2121,y:393.0286},0).wait(1).to({scaleX:0.9225,scaleY:0.9225,x:671.1348,y:392.947},0).wait(1).to({scaleX:0.923,scaleY:0.923,x:671.0556,y:392.8634},0).wait(1).to({scaleX:0.9236,scaleY:0.9236,x:670.9744,y:392.7775},0).wait(1).to({scaleX:0.9242,scaleY:0.9242,x:670.8913,y:392.6898},0).wait(1).to({scaleX:0.9249,scaleY:0.9249,x:670.8061,y:392.5998},0).wait(1).to({scaleX:0.9255,scaleY:0.9255,x:670.7191,y:392.5079},0).wait(1).to({scaleX:0.9262,scaleY:0.9262,x:670.6301,y:392.414},0).wait(1).to({scaleX:0.9268,scaleY:0.9268,x:670.539,y:392.3177},0).wait(1).to({scaleX:0.9275,scaleY:0.9275,x:670.4461,y:392.2196},0).wait(1).to({scaleX:0.9282,scaleY:0.9282,x:670.3512,y:392.1194},0).wait(1).to({scaleX:0.9289,scaleY:0.9289,x:670.2543,y:392.0171},0).wait(1).to({scaleX:0.9296,scaleY:0.9296,x:670.1555,y:391.9127},0).wait(1).to({scaleX:0.9303,scaleY:0.9303,x:670.0549,y:391.8065},0).wait(1).to({scaleX:0.9311,scaleY:0.9311,x:669.9521,y:391.698},0).wait(1).to({scaleX:0.9319,scaleY:0.9319,x:669.8474,y:391.5873},0).wait(1).to({scaleX:0.9326,scaleY:0.9326,x:669.7407,y:391.4747},0).wait(1).to({scaleX:0.9334,scaleY:0.9334,x:669.6322,y:391.3601},0).wait(1).to({scaleX:0.9342,scaleY:0.9342,x:669.5216,y:391.2432},0).wait(1).to({scaleX:0.9351,scaleY:0.9351,x:669.4091,y:391.1245},0).wait(1).to({scaleX:0.9359,scaleY:0.9359,x:669.2947,y:391.0037},0).wait(1).to({scaleX:0.9367,scaleY:0.9367,x:669.1782,y:390.8806},0).wait(1).to({scaleX:0.9376,scaleY:0.9376,x:669.0598,y:390.7556},0).wait(1).to({scaleX:0.9385,scaleY:0.9385,x:668.9395,y:390.6286},0).wait(1).to({scaleX:0.9394,scaleY:0.9394,x:668.8173,y:390.4994},0).wait(1).to({scaleX:0.9403,scaleY:0.9403,x:668.693,y:390.3682},0).wait(1).to({scaleX:0.9412,scaleY:0.9412,x:668.5668,y:390.2349},0).wait(1).to({scaleX:0.9421,scaleY:0.9421,x:668.4386,y:390.0995},0).wait(1).to({scaleX:0.9431,scaleY:0.9431,x:668.3085,y:389.9621},0).wait(1).to({scaleX:0.944,scaleY:0.944,x:668.1765,y:389.8227},0).wait(1).to({scaleX:0.945,scaleY:0.945,x:668.0424,y:389.6811},0).wait(1).to({scaleX:0.946,scaleY:0.946,x:667.9066,y:389.5376},0).wait(1).to({scaleX:0.947,scaleY:0.947,x:667.7685,y:389.3919},0).wait(1).to({scaleX:0.948,scaleY:0.948,x:667.6287,y:389.2442},0).wait(1).to({scaleX:0.9491,scaleY:0.9491,x:667.4867,y:389.0943},0).wait(1).to({scaleX:0.9501,scaleY:0.9501,x:667.343,y:388.9424},0).wait(1).to({scaleX:0.9512,scaleY:0.9512,x:667.1973,y:388.7885},0).wait(1).to({scaleX:0.9523,scaleY:0.9523,x:667.0496,y:388.6325},0).wait(1).to({scaleX:0.9534,scaleY:0.9534,x:666.8999,y:388.4745},0).wait(1).to({scaleX:0.9545,scaleY:0.9545,x:666.7483,y:388.3143},0).wait(1).to({scaleX:0.9556,scaleY:0.9556,x:666.5946,y:388.1521},0).wait(1).to({scaleX:0.9567,scaleY:0.9567,x:666.4391,y:387.9878},0).wait(1).to({scaleX:0.9579,scaleY:0.9579,x:666.2815,y:387.8214},0).wait(1).to({scaleX:0.959,scaleY:0.959,x:666.122,y:387.653},0).wait(1).to({scaleX:0.9602,scaleY:0.9602,x:665.9607,y:387.4826},0).wait(1).to({scaleX:0.9614,scaleY:0.9614,x:665.7973,y:387.31},0).wait(1).to({scaleX:0.9626,scaleY:0.9626,x:665.632,y:387.1355},0).wait(1).to({scaleX:0.9638,scaleY:0.9638,x:665.4646,y:386.9587},0).wait(1).to({scaleX:0.965,scaleY:0.965,x:665.2954,y:386.78},0).wait(1).to({scaleX:0.9663,scaleY:0.9663,x:665.1243,y:386.5993},0).wait(1).to({scaleX:0.9676,scaleY:0.9676,x:664.951,y:386.4163},0).wait(1).to({scaleX:0.9688,scaleY:0.9688,x:664.7759,y:386.2313},0).wait(1).to({scaleX:0.9701,scaleY:0.9701,x:664.5989,y:386.0444},0).wait(1).to({scaleX:0.9714,scaleY:0.9714,x:664.4198,y:385.8553},0).wait(1).to({scaleX:0.9728,scaleY:0.9728,x:664.2388,y:385.6641},0).wait(1).to({scaleX:0.9741,scaleY:0.9741,x:664.0559,y:385.4709},0).wait(1).to({scaleX:0.9754,scaleY:0.9754,x:663.8711,y:385.2758},0).wait(1).to({scaleX:0.9768,scaleY:0.9768,x:663.6842,y:385.0784},0).wait(1).to({scaleX:0.9782,scaleY:0.9782,x:663.4953,y:384.8789},0).wait(1).to({scaleX:0.9796,scaleY:0.9796,x:663.3047,y:384.6776},0).wait(1).to({scaleX:0.981,scaleY:0.981,x:663.1119,y:384.4739},0).wait(1).to({scaleX:0.9824,scaleY:0.9824,x:662.9173,y:384.2684},0).wait(1).to({scaleX:0.9838,scaleY:0.9838,x:662.7205,y:384.0606},0).wait(1).to({scaleX:0.9853,scaleY:0.9853,x:662.522,y:383.8509},0).wait(1).to({scaleX:0.9867,scaleY:0.9867,x:662.3215,y:383.6392},0).wait(1).to({scaleX:0.9882,scaleY:0.9882,x:662.119,y:383.4253},0).wait(1).to({scaleX:0.9897,scaleY:0.9897,x:661.9145,y:383.2094},0).wait(1).to({scaleX:0.9912,scaleY:0.9912,x:661.7081,y:382.9914},0).wait(1).to({scaleX:0.9927,scaleY:0.9927,x:661.4997,y:382.7713},0).wait(1).to({scaleX:0.9943,scaleY:0.9943,x:661.2894,y:382.5492},0).wait(1).to({scaleX:0.9958,scaleY:0.9958,x:661.077,y:382.3249},0).wait(1).to({scaleX:0.9974,scaleY:0.9974,x:660.8627,y:382.0986},0).wait(1).to({scaleX:0.9989,scaleY:0.9989,x:660.6467,y:381.8704},0).wait(1).to({scaleX:1.0005,scaleY:1.0005,x:660.4284,y:381.6399},0).wait(1).to({scaleX:1.0021,scaleY:1.0021,x:660.2084,y:381.4076},0).wait(1).to({scaleX:1.0038,scaleY:1.0038,x:659.9862,y:381.1729},0).wait(1).to({scaleX:1.0054,scaleY:1.0054,x:659.7623,y:380.9364},0).wait(1).to({scaleX:1.007,scaleY:1.007,x:659.5361,y:380.6976},0).wait(1).to({scaleX:1.0087,scaleY:1.0087,x:659.3082,y:380.4569},0).wait(1).to({scaleX:1.0104,scaleY:1.0104,x:659.0784,y:380.2142},0).wait(1).to({scaleX:1.0121,scaleY:1.0121,x:658.8465,y:379.9693},0).wait(1).to({scaleX:1.0138,scaleY:1.0138,x:658.6127,y:379.7224},0).wait(1).to({scaleX:1.0155,scaleY:1.0155,x:658.3769,y:379.4734},0).wait(1).to({scaleX:1.0172,scaleY:1.0172,x:658.1392,y:379.2223},0).wait(1).to({scaleX:1.019,scaleY:1.019,x:657.8995,y:378.9691},0).wait(1).to({scaleX:1.0207,scaleY:1.0207,x:657.658,y:378.7141},0).wait(1).to({scaleX:1.0225,scaleY:1.0225,x:657.4143,y:378.4567},0).wait(1).to({scaleX:1.0243,scaleY:1.0243,x:657.1687,y:378.1973},0).wait(1).to({scaleX:1.0261,scaleY:1.0261,x:656.9213,y:377.936},0).wait(1).to({scaleX:1.0279,scaleY:1.0279,x:656.6717,y:377.6725},0).wait(1).to({scaleX:1.0298,scaleY:1.0298,x:656.4204,y:377.407},0).wait(1).to({scaleX:1.0316,scaleY:1.0316,x:656.167,y:377.1395},0).wait(1).to({scaleX:1.0335,scaleY:1.0335,x:655.9117,y:376.8699},0).wait(1).to({scaleX:1.0354,scaleY:1.0354,x:655.6543,y:376.598},0).wait(1).to({scaleX:1.0372,scaleY:1.0372,x:655.3951,y:376.3242},0).wait(1).to({scaleX:1.0391,scaleY:1.0391,x:655.1339,y:376.0484},0).wait(1).to({scaleX:1.0411,scaleY:1.0411,x:654.8707,y:375.7704},0).wait(1).to({scaleX:1.043,scaleY:1.043,x:654.6056,y:375.4904},0).wait(1).to({scaleX:1.0449,scaleY:1.0449,x:654.3386,y:375.2085},0).wait(1).to({scaleX:1.0469,scaleY:1.0469,x:654.0696,y:374.9243},0).wait(1).to({scaleX:1.0489,scaleY:1.0489,x:653.7985,y:374.6381},0).wait(1).to({scaleX:1.0509,scaleY:1.0509,x:653.5257,y:374.3499},0).wait(1).to({scaleX:1.0529,scaleY:1.0529,x:653.2507,y:374.0595},0).wait(1).to({scaleX:1.0549,scaleY:1.0549,x:652.9739,y:373.7672},0).wait(1).to({scaleX:1.0569,scaleY:1.0569,x:652.695,y:373.4726},0).wait(1).to({scaleX:1.059,scaleY:1.059,x:652.4143,y:373.1762},0).wait(1).to({scaleX:1.061,scaleY:1.061,x:652.1316,y:372.8776},0).wait(1).to({scaleX:1.0631,scaleY:1.0631,x:651.8469,y:372.577},0).wait(1).to({scaleX:1.0652,scaleY:1.0652,x:651.5603,y:372.2743},0).wait(1).to({scaleX:1.0673,scaleY:1.0673,x:651.2717,y:371.9695},0).wait(1).to({scaleX:1.0694,scaleY:1.0694,x:650.9812,y:371.6627},0).wait(1).to({scaleX:1.0716,scaleY:1.0716,x:650.6886,y:371.3537},0).wait(1).to({scaleX:1.0737,scaleY:1.0737,x:650.3941,y:371.0427},0).wait(1).to({scaleX:1.0759,scaleY:1.0759,x:650.0977,y:370.7296},0).wait(1).to({scaleX:1.078,scaleY:1.078,x:649.7992,y:370.4144},0).wait(1).to({scaleX:1.0802,scaleY:1.0802,x:649.499,y:370.0973},0).wait(1).to({scaleX:1.0824,scaleY:1.0824,x:649.1966,y:369.778},0).wait(1).to({scaleX:1.0847,scaleY:1.0847,x:648.8925,y:369.4568},0).wait(1).to({scaleX:1.0869,scaleY:1.0869,x:648.5863,y:369.1335},0).wait(1).to({scaleX:1.0891,scaleY:1.0891,x:648.278,y:368.8079},0).wait(1).to({scaleX:1.0914,scaleY:1.0914,x:647.968,y:368.4804},0).wait(1).to({scaleX:1.0937,scaleY:1.0937,x:647.6559,y:368.1509},0).wait(1).to({scaleX:1.096,scaleY:1.096,x:647.3419,y:367.8192},0).wait(1).to({scaleX:1.0983,scaleY:1.0983,x:647.0259,y:367.4855},0).wait(1).to({scaleX:1.1006,scaleY:1.1006,x:646.708,y:367.1497},0).wait(1).to({scaleX:1.1029,scaleY:1.1029,x:646.388,y:366.8119},0).wait(1).to({scaleX:1.1053,scaleY:1.1053,x:646.0662,y:366.4719},0).wait(1).to({scaleX:1.1076,scaleY:1.1076,x:645.7423,y:366.1299},0).wait(1).to({scaleX:1.11,scaleY:1.11,x:645.4166,y:365.786},0).wait(1).to({scaleX:1.1124,scaleY:1.1124,x:645.0888,y:365.4398},0).wait(1).to({scaleX:1.1148,scaleY:1.1148,x:644.7591,y:365.0915},0).wait(1).to({scaleX:1.1172,scaleY:1.1172,x:644.4275,y:364.7413},0).wait(1).to({scaleX:1.1196,scaleY:1.1196,x:644.094,y:364.3891},0).wait(1).to({scaleX:1.1221,scaleY:1.1221,x:643.7583,y:364.0346},0).wait(1).to({scaleX:1.1246,scaleY:1.1246,x:643.4209,y:363.6782},0).wait(1).to({scaleX:1.127,scaleY:1.127,x:643.0814,y:363.3197},0).wait(1).to({scaleX:1.1295,scaleY:1.1295,x:642.74,y:362.9592},0).wait(1).to({scaleX:1.132,scaleY:1.132,x:642.3966,y:362.5965},0).wait(1).to({scaleX:1.1345,scaleY:1.1345,x:642.0513,y:362.2318},0).wait(1).to({scaleX:1.1371,scaleY:1.1371,x:641.704,y:361.865},0).wait(1).to({scaleX:1.1396,scaleY:1.1396,x:641.3547,y:361.4961},0).wait(1).to({scaleX:1.1422,scaleY:1.1422,x:641.0035,y:361.1252},0).wait(1).to({scaleX:1.1448,scaleY:1.1448,x:640.6504,y:360.7523},0).wait(1).to({scaleX:1.1473,scaleY:1.1473,x:640.2952,y:360.3772},0).wait(1).to({scaleX:1.15,scaleY:1.15,x:639.9381,y:360},0).wait(1).to({regX:0.1,regY:0.1,scaleX:1,scaleY:1,x:377.9,y:388.05},0).wait(1).to({regX:0,regY:0,scaleX:1.0037,scaleY:1.0037,x:382.0862,y:387.7355},0).wait(1).to({scaleX:1.0073,scaleY:1.0073,x:386.3401,y:387.5227},0).wait(1).to({scaleX:1.011,scaleY:1.011,x:390.5618,y:387.3114},0).wait(1).to({scaleX:1.0146,scaleY:1.0146,x:394.7512,y:387.1018},0).wait(1).to({scaleX:1.0182,scaleY:1.0182,x:398.9083,y:386.8938},0).wait(1).to({scaleX:1.0217,scaleY:1.0217,x:403.0331,y:386.6874},0).wait(1).to({scaleX:1.0252,scaleY:1.0252,x:407.1235,y:386.4827},0).wait(1).to({scaleX:1.0287,scaleY:1.0287,x:411.1838,y:386.2795},0).wait(1).to({scaleX:1.0322,scaleY:1.0322,x:415.2096,y:386.0781},0).wait(1).to({scaleX:1.0356,scaleY:1.0356,x:419.2032,y:385.8782},0).wait(1).to({scaleX:1.039,scaleY:1.039,x:423.1645,y:385.68},0).wait(1).to({scaleX:1.0424,scaleY:1.0424,x:427.0935,y:385.4834},0).wait(1).to({scaleX:1.0458,scaleY:1.0458,x:430.9881,y:385.2885},0).wait(1).to({scaleX:1.0491,scaleY:1.0491,x:434.8526,y:385.0952},0).wait(1).to({scaleX:1.0524,scaleY:1.0524,x:438.6826,y:384.9035},0).wait(1).to({scaleX:1.0556,scaleY:1.0556,x:442.4804,y:384.7135},0).wait(1).to({scaleX:1.0589,scaleY:1.0589,x:446.2459,y:384.5251},0).wait(1).to({scaleX:1.0621,scaleY:1.0621,x:449.9791,y:384.3383},0).wait(1).to({scaleX:1.0653,scaleY:1.0653,x:453.68,y:384.1531},0).wait(1).to({scaleX:1.0684,scaleY:1.0684,x:457.3465,y:383.9696},0).wait(1).to({scaleX:1.0716,scaleY:1.0716,x:460.9829,y:383.7877},0).wait(1).to({scaleX:1.0747,scaleY:1.0747,x:464.5849,y:383.6074},0).wait(1).to({scaleX:1.0777,scaleY:1.0777,x:468.1546,y:383.4288},0).wait(1).to({scaleX:1.0808,scaleY:1.0808,x:471.692,y:383.2518},0).wait(1).to({scaleX:1.0838,scaleY:1.0838,x:475.1971,y:383.0764},0).wait(1).to({scaleX:1.0868,scaleY:1.0868,x:478.6678,y:382.9027},0).wait(1).to({scaleX:1.0897,scaleY:1.0897,x:482.1084,y:382.7306},0).wait(1).to({scaleX:1.0927,scaleY:1.0927,x:485.5145,y:382.5601},0).wait(1).to({scaleX:1.0956,scaleY:1.0956,x:488.8884,y:382.3913},0).wait(1).to({scaleX:1.0984,scaleY:1.0984,x:492.23,y:382.2241},0).wait(1).to({scaleX:1.1013,scaleY:1.1013,x:495.5394,y:382.0585},0).wait(1).to({scaleX:1.1041,scaleY:1.1041,x:498.8164,y:381.8945},0).wait(1).to({scaleX:1.1069,scaleY:1.1069,x:502.0612,y:381.7322},0).wait(1).to({scaleX:1.1097,scaleY:1.1097,x:505.2715,y:381.5715},0).wait(1).to({scaleX:1.1124,scaleY:1.1124,x:508.4496,y:381.4125},0).wait(1).to({scaleX:1.1151,scaleY:1.1151,x:511.5954,y:381.2551},0).wait(1).to({scaleX:1.1178,scaleY:1.1178,x:514.7089,y:381.0993},0).wait(1).to({scaleX:1.1204,scaleY:1.1204,x:517.7902,y:380.9451},0).wait(1).to({scaleX:1.123,scaleY:1.123,x:520.8391,y:380.7925},0).wait(1).to({scaleX:1.1256,scaleY:1.1256,x:523.8537,y:380.6417},0).wait(1).to({scaleX:1.1282,scaleY:1.1282,x:526.8381,y:380.4924},0).wait(1).to({scaleX:1.1307,scaleY:1.1307,x:529.7881,y:380.3447},0).wait(1).to({scaleX:1.1333,scaleY:1.1333,x:532.7058,y:380.1987},0).wait(1).to({scaleX:1.1357,scaleY:1.1357,x:535.5913,y:380.0544},0).wait(1).to({scaleX:1.1382,scaleY:1.1382,x:538.4444,y:379.9116},0).wait(1).to({scaleX:1.1406,scaleY:1.1406,x:541.2632,y:379.7705},0).wait(1).to({scaleX:1.143,scaleY:1.143,x:544.0518,y:379.631},0).wait(1).to({scaleX:1.1454,scaleY:1.1454,x:546.806,y:379.4932},0).wait(1).to({scaleX:1.1477,scaleY:1.1477,x:549.5279,y:379.357},0).wait(1).to({scaleX:1.15,scaleY:1.15,x:552.2175,y:379.2224},0).wait(1).to({scaleX:1.1523,scaleY:1.1523,x:554.8749,y:379.0894},0).wait(1).to({scaleX:1.1546,scaleY:1.1546,x:557.5,y:378.9581},0).wait(1).to({scaleX:1.1568,scaleY:1.1568,x:560.0906,y:378.8284},0).wait(1).to({scaleX:1.159,scaleY:1.159,x:562.6512,y:378.7003},0).wait(1).to({scaleX:1.1612,scaleY:1.1612,x:565.1773,y:378.5739},0).wait(1).to({scaleX:1.1633,scaleY:1.1633,x:567.6711,y:378.4491},0).wait(1).to({scaleX:1.1654,scaleY:1.1654,x:570.1326,y:378.326},0).wait(1).to({scaleX:1.1675,scaleY:1.1675,x:572.5619,y:378.2044},0).wait(1).to({scaleX:1.1696,scaleY:1.1696,x:574.9568,y:378.0846},0).wait(1).to({scaleX:1.1716,scaleY:1.1716,x:577.3215,y:377.9662},0).wait(1).to({scaleX:1.1736,scaleY:1.1736,x:579.6518,y:377.8496},0).wait(1).to({scaleX:1.1756,scaleY:1.1756,x:581.9498,y:377.7346},0).wait(1).to({scaleX:1.1776,scaleY:1.1776,x:584.2156,y:377.6213},0).wait(1).to({scaleX:1.1795,scaleY:1.1795,x:586.4491,y:377.5095},0).wait(1).to({scaleX:1.1814,scaleY:1.1814,x:588.6503,y:377.3994},0).wait(1).to({scaleX:1.1832,scaleY:1.1832,x:590.8192,y:377.2908},0).wait(1).to({scaleX:1.1851,scaleY:1.1851,x:592.9537,y:377.184},0).wait(1).to({scaleX:1.1869,scaleY:1.1869,x:595.0559,y:377.0788},0).wait(1).to({scaleX:1.1887,scaleY:1.1887,x:597.1258,y:376.9753},0).wait(1).to({scaleX:1.1904,scaleY:1.1904,x:599.1635,y:376.8733},0).wait(1).to({scaleX:1.1921,scaleY:1.1921,x:601.1689,y:376.773},0).wait(1).to({scaleX:1.1938,scaleY:1.1938,x:603.142,y:376.6742},0).wait(1).to({scaleX:1.1955,scaleY:1.1955,x:605.0807,y:376.5772},0).wait(1).to({scaleX:1.1971,scaleY:1.1971,x:606.9893,y:376.4817},0).wait(1).to({scaleX:1.1988,scaleY:1.1988,x:608.8634,y:376.3879},0).wait(1).to({scaleX:1.2003,scaleY:1.2003,x:610.7053,y:376.2958},0).wait(1).to({scaleX:1.2019,scaleY:1.2019,x:612.5149,y:376.2052},0).wait(1).to({scaleX:1.2034,scaleY:1.2034,x:614.2922,y:376.1163},0).wait(1).to({scaleX:1.2049,scaleY:1.2049,x:616.0351,y:376.0291},0).wait(1).to({scaleX:1.2064,scaleY:1.2064,x:617.7478,y:375.9434},0).wait(1).to({scaleX:1.2078,scaleY:1.2078,x:619.4261,y:375.8594},0).wait(1).to({scaleX:1.2093,scaleY:1.2093,x:621.0722,y:375.777},0).wait(1).to({scaleX:1.2107,scaleY:1.2107,x:622.686,y:375.6963},0).wait(1).to({scaleX:1.212,scaleY:1.212,x:624.2675,y:375.6171},0).wait(1).to({scaleX:1.2133,scaleY:1.2133,x:625.8167,y:375.5396},0).wait(1).to({scaleX:1.2146,scaleY:1.2146,x:627.3315,y:375.4638},0).wait(1).to({scaleX:1.2159,scaleY:1.2159,x:628.8162,y:375.3895},0).wait(1).to({scaleX:1.2172,scaleY:1.2172,x:630.2665,y:375.317},0).wait(1).to({scaleX:1.2184,scaleY:1.2184,x:631.6844,y:375.246},0).wait(1).to({scaleX:1.2196,scaleY:1.2196,x:633.0701,y:375.1767},0).wait(1).to({scaleX:1.2207,scaleY:1.2207,x:634.4236,y:375.1089},0).wait(1).to({scaleX:1.2219,scaleY:1.2219,x:635.7426,y:375.0429},0).wait(1).to({scaleX:1.223,scaleY:1.223,x:637.0314,y:374.9784},0).wait(1).to({scaleX:1.2241,scaleY:1.2241,x:638.2859,y:374.9157},0).wait(1).to({scaleX:1.2251,scaleY:1.2251,x:639.508,y:374.8545},0).wait(1).to({scaleX:1.2261,scaleY:1.2261,x:640.6979,y:374.795},0).wait(1).to({scaleX:1.2271,scaleY:1.2271,x:641.8556,y:374.7371},0).wait(1).to({scaleX:1.2281,scaleY:1.2281,x:642.9809,y:374.6807},0).wait(1).to({scaleX:1.2291,scaleY:1.2291,x:644.074,y:374.626},0).wait(1).to({scaleX:1.23,scaleY:1.23,x:645.1326,y:374.5731},0).wait(1).to({scaleX:1.2308,scaleY:1.2308,x:646.159,y:374.5217},0).wait(1).to({scaleX:1.2317,scaleY:1.2317,x:647.1531,y:374.472},0).wait(1).to({scaleX:1.2325,scaleY:1.2325,x:648.1149,y:374.4238},0).wait(1).to({scaleX:1.2333,scaleY:1.2333,x:649.0444,y:374.3773},0).wait(1).to({scaleX:1.2341,scaleY:1.2341,x:649.9417,y:374.3324},0).wait(1).to({scaleX:1.2348,scaleY:1.2348,x:650.8045,y:374.2893},0).wait(1).to({scaleX:1.2356,scaleY:1.2356,x:651.6372,y:374.2476},0).wait(1).to({scaleX:1.2362,scaleY:1.2362,x:652.4355,y:374.2076},0).wait(1).to({scaleX:1.2369,scaleY:1.2369,x:653.2015,y:374.1693},0).wait(1).to({scaleX:1.2375,scaleY:1.2375,x:653.9353,y:374.1326},0).wait(1).to({scaleX:1.2381,scaleY:1.2381,x:654.6367,y:374.0975},0).wait(1).to({scaleX:1.2387,scaleY:1.2387,x:655.3037,y:374.0641},0).wait(1).to({scaleX:1.2393,scaleY:1.2393,x:655.9406,y:374.0323},0).wait(1).to({scaleX:1.2398,scaleY:1.2398,x:656.5431,y:374.0021},0).wait(1).to({scaleX:1.2403,scaleY:1.2403,x:657.1133,y:373.9736},0).wait(1).to({scaleX:1.2407,scaleY:1.2407,x:657.6513,y:373.9467},0).wait(1).to({scaleX:1.2412,scaleY:1.2412,x:658.1569,y:373.9214},0).wait(1).to({scaleX:1.2416,scaleY:1.2416,x:658.6303,y:373.8977},0).wait(1).to({scaleX:1.2419,scaleY:1.2419,x:659.0692,y:373.8757},0).wait(1).to({scaleX:1.2423,scaleY:1.2423,x:659.4781,y:373.8553},0).wait(1).to({scaleX:1.2426,scaleY:1.2426,x:659.8525,y:373.8365},0).wait(1).to({scaleX:1.2429,scaleY:1.2429,x:660.1946,y:373.8194},0).wait(1).to({scaleX:1.2432,scaleY:1.2432,x:660.5044,y:373.8039},0).wait(1).to({scaleX:1.2434,scaleY:1.2434,x:660.782,y:373.79},0).wait(1).to({scaleX:1.2436,scaleY:1.2436,x:661.0251,y:373.7778},0).wait(1).to({scaleX:1.2438,scaleY:1.2438,x:661.2382,y:373.7672},0).wait(1).to({scaleX:1.244,scaleY:1.244,x:661.4167,y:373.7582},0).wait(1).to({scaleX:1.2441,scaleY:1.2441,x:661.5631,y:373.7509},0).wait(1).to({scaleX:1.2442,scaleY:1.2442,x:661.6771,y:373.7452},0).wait(1).to({scaleX:1.2443,scaleY:1.2443,x:661.7589,y:373.7411},0).wait(1).to({x:661.8084,y:373.7386},0).wait(1).to({x:661.8256,y:373.7378},0).wait(1).to({regX:0.1,scaleX:1.0123,scaleY:1.0123,x:639.55,y:359.55},0).wait(1).to({regX:0,scaleX:1.0016,scaleY:1.0016,x:639.1677,y:359.0423},0).wait(1).to({scaleX:0.991,scaleY:0.991,x:638.8904,y:358.5436},0).wait(1).to({scaleX:0.9806,scaleY:0.9806,x:638.6179,y:358.0536},0).wait(1).to({scaleX:0.9704,scaleY:0.9704,x:638.3505,y:357.5729},0).wait(1).to({scaleX:0.9604,scaleY:0.9604,x:638.0881,y:357.101},0).wait(1).to({scaleX:0.9506,scaleY:0.9506,x:637.8307,y:356.6382},0).wait(1).to({scaleX:0.941,scaleY:0.941,x:637.5783,y:356.1843},0).wait(1).to({scaleX:0.9316,scaleY:0.9316,x:637.3309,y:355.7394},0).wait(1).to({scaleX:0.9224,scaleY:0.9224,x:637.0886,y:355.3037},0).wait(1).to({scaleX:0.9133,scaleY:0.9133,x:636.8512,y:354.8767},0).wait(1).to({scaleX:0.9045,scaleY:0.9045,x:636.6187,y:354.4587},0).wait(1).to({scaleX:0.8958,scaleY:0.8958,x:636.3914,y:354.0499},0).wait(1).to({scaleX:0.8873,scaleY:0.8873,x:636.1689,y:353.6498},0).wait(1).to({scaleX:0.879,scaleY:0.879,x:635.9515,y:353.2589},0).wait(1).to({scaleX:0.871,scaleY:0.871,x:635.7392,y:352.877},0).wait(1).to({scaleX:0.8631,scaleY:0.8631,x:635.5318,y:352.5041},0).wait(1).to({scaleX:0.8553,scaleY:0.8553,x:635.3294,y:352.1401},0).wait(1).to({scaleX:0.8478,scaleY:0.8478,x:635.1319,y:351.7851},0).wait(1).to({scaleX:0.8405,scaleY:0.8405,x:634.9395,y:351.4391},0).wait(1).to({scaleX:0.8334,scaleY:0.8334,x:634.7521,y:351.102},0).wait(1).to({scaleX:0.8264,scaleY:0.8264,x:634.5696,y:350.7739},0).wait(1).to({scaleX:0.8196,scaleY:0.8196,x:634.3922,y:350.455},0).wait(1).to({scaleX:0.8131,scaleY:0.8131,x:634.2198,y:350.1448},0).wait(1).to({scaleX:0.8067,scaleY:0.8067,x:634.0524,y:349.8438},0).wait(1).to({scaleX:0.8005,scaleY:0.8005,x:633.8899,y:349.5516},0).wait(1).to({scaleX:0.7945,scaleY:0.7945,x:633.7325,y:349.2685},0).wait(1).to({scaleX:0.7887,scaleY:0.7887,x:633.5801,y:348.9945},0).wait(1).to({scaleX:0.7831,scaleY:0.7831,x:633.4326,y:348.7294},0).wait(1).to({scaleX:0.7777,scaleY:0.7777,x:633.2902,y:348.4732},0).wait(1).to({scaleX:0.7724,scaleY:0.7724,x:633.1527,y:348.226},0).wait(1).to({scaleX:0.7674,scaleY:0.7674,x:633.0203,y:347.9878},0).wait(1).to({scaleX:0.7625,scaleY:0.7625,x:632.8928,y:347.7586},0).wait(1).to({scaleX:0.7579,scaleY:0.7579,x:632.7704,y:347.5386},0).wait(1).to({scaleX:0.7534,scaleY:0.7534,x:632.6529,y:347.3272},0).wait(1).to({scaleX:0.7491,scaleY:0.7491,x:632.5405,y:347.1251},0).wait(1).to({scaleX:0.745,scaleY:0.745,x:632.433,y:346.9318},0).wait(1).to({scaleX:0.7411,scaleY:0.7411,x:632.3306,y:346.7476},0).wait(1).to({scaleX:0.7374,scaleY:0.7374,x:632.2331,y:346.5724},0).wait(1).to({scaleX:0.7339,scaleY:0.7339,x:632.1407,y:346.4062},0).wait(1).to({scaleX:0.7305,scaleY:0.7305,x:632.0532,y:346.2489},0).wait(1).to({scaleX:0.7274,scaleY:0.7274,x:631.9708,y:346.1006},0).wait(1).to({scaleX:0.7244,scaleY:0.7244,x:631.8933,y:345.9612},0).wait(1).to({scaleX:0.7217,scaleY:0.7217,x:631.8208,y:345.8309},0).wait(1).to({scaleX:0.7191,scaleY:0.7191,x:631.7533,y:345.7095},0).wait(1).to({scaleX:0.7167,scaleY:0.7167,x:631.6909,y:345.5973},0).wait(1).to({scaleX:0.7145,scaleY:0.7145,x:631.6333,y:345.4938},0).wait(1).to({scaleX:0.7125,scaleY:0.7125,x:631.5809,y:345.3995},0).wait(1).to({scaleX:0.7107,scaleY:0.7107,x:631.5335,y:345.3142},0).wait(1).to({scaleX:0.7091,scaleY:0.7091,x:631.4909,y:345.2376},0).wait(1).to({scaleX:0.7077,scaleY:0.7077,x:631.4534,y:345.1703},0).wait(1).to({scaleX:0.7064,scaleY:0.7064,x:631.421,y:345.1119},0).wait(1).to({scaleX:0.7054,scaleY:0.7054,x:631.3935,y:345.0624},0).wait(1).to({scaleX:0.7045,scaleY:0.7045,x:631.371,y:345.022},0).wait(1).to({scaleX:0.7039,scaleY:0.7039,x:631.3534,y:344.9905},0).wait(1).to({scaleX:0.7034,scaleY:0.7034,x:631.341,y:344.9682},0).wait(1).to({scaleX:0.7031,scaleY:0.7031,x:631.3335,y:344.9546},0).wait(1).to({scaleX:0.703,scaleY:0.703,x:631.3309,y:344.95},0).wait(1).to({regX:0.2,regY:0.1,scaleX:1.9295,scaleY:1.9295,x:722.15,y:292.9},0).wait(1).to({regX:0,regY:0,scaleX:1.8992,scaleY:1.8992,x:708.4183,y:295.4778},0).wait(1).to({scaleX:1.8695,scaleY:1.8695,x:695.3287,y:298.2052},0).wait(1).to({scaleX:1.8403,scaleY:1.8403,x:682.4745,y:300.8835},0).wait(1).to({scaleX:1.8116,scaleY:1.8116,x:669.8625,y:303.5114},0).wait(1).to({scaleX:1.7835,scaleY:1.7835,x:657.4926,y:306.0888},0).wait(1).to({scaleX:1.756,scaleY:1.756,x:645.3582,y:308.6172},0).wait(1).to({scaleX:1.7289,scaleY:1.7289,x:633.4659,y:311.0951},0).wait(1).to({scaleX:1.7025,scaleY:1.7025,x:621.8158,y:313.5225},0).wait(1).to({scaleX:1.6766,scaleY:1.6766,x:610.4078,y:315.8995},0).wait(1).to({scaleX:1.6512,scaleY:1.6512,x:599.2352,y:318.2274},0).wait(1).to({scaleX:1.6264,scaleY:1.6264,x:588.3048,y:320.5049},0).wait(1).to({scaleX:1.6021,scaleY:1.6021,x:577.6165,y:322.7319},0).wait(1).to({scaleX:1.5783,scaleY:1.5783,x:567.1637,y:324.9099},0).wait(1).to({scaleX:1.5551,scaleY:1.5551,x:556.953,y:327.0374},0).wait(1).to({scaleX:1.5325,scaleY:1.5325,x:546.9845,y:329.1145},0).wait(1).to({scaleX:1.5104,scaleY:1.5104,x:537.2581,y:331.1411},0).wait(1).to({scaleX:1.4888,scaleY:1.4888,x:527.7671,y:333.1187},0).wait(1).to({scaleX:1.4678,scaleY:1.4678,x:518.5183,y:335.0458},0).wait(1).to({scaleX:1.4474,scaleY:1.4474,x:509.5116,y:336.9224},0).wait(1).to({scaleX:1.4274,scaleY:1.4274,x:500.7404,y:338.75},0).wait(1).to({scaleX:1.4081,scaleY:1.4081,x:492.2113,y:340.5271},0).wait(1).to({scaleX:1.3892,scaleY:1.3892,x:483.9244,y:342.2538},0).wait(1).to({scaleX:1.371,scaleY:1.371,x:475.8796,y:343.9301},0).wait(1).to({scaleX:1.3532,scaleY:1.3532,x:468.0702,y:345.5572},0).wait(1).to({scaleX:1.336,scaleY:1.336,x:460.503,y:347.1339},0).wait(1).to({scaleX:1.3194,scaleY:1.3194,x:453.178,y:348.6602},0).wait(1).to({scaleX:1.3033,scaleY:1.3033,x:446.0883,y:350.1374},0).wait(1).to({scaleX:1.2877,scaleY:1.2877,x:439.2409,y:351.5642},0).wait(1).to({scaleX:1.2727,scaleY:1.2727,x:432.6355,y:352.9405},0).wait(1).to({scaleX:1.2583,scaleY:1.2583,x:426.2723,y:354.2663},0).wait(1).to({scaleX:1.2444,scaleY:1.2444,x:420.1446,y:355.5431},0).wait(1).to({scaleX:1.231,scaleY:1.231,x:414.259,y:356.7695},0).wait(1).to({scaleX:1.2182,scaleY:1.2182,x:408.6155,y:357.9453},0).wait(1).to({scaleX:1.2059,scaleY:1.2059,x:403.2075,y:359.0722},0).wait(1).to({scaleX:1.1941,scaleY:1.1941,x:398.0416,y:360.1485},0).wait(1).to({scaleX:1.183,scaleY:1.183,x:393.1179,y:361.1745},0).wait(1).to({scaleX:1.1723,scaleY:1.1723,x:388.4363,y:362.1499},0).wait(1).to({scaleX:1.1622,scaleY:1.1622,x:383.9901,y:363.0763},0).wait(1).to({scaleX:1.1527,scaleY:1.1527,x:379.7861,y:363.9523},0).wait(1).to({scaleX:1.1437,scaleY:1.1437,x:375.8243,y:364.7778},0).wait(1).to({scaleX:1.1352,scaleY:1.1352,x:372.0978,y:365.5542},0).wait(1).to({scaleX:1.1273,scaleY:1.1273,x:368.6136,y:366.2802},0).wait(1).to({scaleX:1.1199,scaleY:1.1199,x:365.3714,y:366.9558},0).wait(1).to({scaleX:1.1131,scaleY:1.1131,x:362.3715,y:367.5808},0).wait(1).to({scaleX:1.1068,scaleY:1.1068,x:359.6069,y:368.1569},0).wait(1).to({scaleX:1.1011,scaleY:1.1011,x:357.0845,y:368.6824},0).wait(1).to({scaleX:1.0959,scaleY:1.0959,x:354.8042,y:369.1576},0).wait(1).to({scaleX:1.0913,scaleY:1.0913,x:352.7594,y:369.5836},0).wait(1).to({scaleX:1.0872,scaleY:1.0872,x:350.9567,y:369.9592},0).wait(1).to({scaleX:1.0836,scaleY:1.0836,x:349.3962,y:370.2844},0).wait(1).to({scaleX:1.0806,scaleY:1.0806,x:348.0778,y:370.5591},0).wait(1).to({scaleX:1.0782,scaleY:1.0782,x:346.9949,y:370.7847},0).wait(1).to({scaleX:1.0763,scaleY:1.0763,x:346.1541,y:370.9599},0).wait(1).to({scaleX:1.0749,scaleY:1.0749,x:345.5554,y:371.0847},0).wait(1).to({scaleX:1.0741,scaleY:1.0741,x:345.1922,y:371.1603},0).wait(1).to({scaleX:1.0738,scaleY:1.0738,x:345.0711,y:371.1856},0).wait(1).to({regX:0.1,regY:0.2,x:349.2,y:370.45},0).wait(1).to({regX:0,regY:0,x:400.1833,y:362.5305},0).wait(1).to({x:447.1757,y:355.4292},0).wait(1).to({x:490.0772,y:348.9461},0).wait(1).to({x:528.9143,y:343.0772},0).wait(1).to({x:563.634,y:337.8305},0).wait(1).to({x:594.2893,y:333.1979},0).wait(1).to({x:620.8537,y:329.1836},0).wait(1).to({x:643.3271,y:325.7875},0).wait(1).to({x:661.7362,y:323.0056},0).wait(1).to({x:676.0279,y:320.8459},0).wait(1).to({x:686.2552,y:319.3004},0).wait(1).to({x:692.3915,y:318.3731},0).wait(1).to({x:694.437,y:318.064},0).wait(1).to({regX:0.1,regY:0.2,x:694.5,y:318.3},0).wait(1).to({regX:0,regY:0,x:694.4,y:318.1},0).wait(172));

	// buttons_obj_
	this.buttons = new lib.Scene_1_buttons();
	this.buttons.name = "buttons";
	this.buttons.setTransform(682.45,285.15,1.0976,1.0976,0,0,0,711.3,326.4);
	this.buttons.depth = 0;
	this.buttons.isAttachedToCamera = 0
	this.buttons.isAttachedToMask = 0
	this.buttons.layerDepth = 0
	this.buttons.layerIndex = 0
	this.buttons.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.buttons).wait(2).to({regY:326.5,y:285.2},0).wait(615).to({regX:740,regY:237.9,scaleX:0.9313,scaleY:0.9313,x:682.5},0).wait(2));

	// speach_bubble3_obj_
	this.speach_bubble3 = new lib.Scene_1_speach_bubble3();
	this.speach_bubble3.name = "speach_bubble3";
	this.speach_bubble3.setTransform(-0.05,0,1.0976,1.0976,0,0,0,89.5,66.6);
	this.speach_bubble3.depth = 0;
	this.speach_bubble3.isAttachedToCamera = 0
	this.speach_bubble3.isAttachedToMask = 0
	this.speach_bubble3.layerDepth = 0
	this.speach_bubble3.layerIndex = 1
	this.speach_bubble3.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.speach_bubble3).wait(1).to({x:0},0).wait(502).to({regX:7.2,regY:-68.4,scaleX:0.9313,scaleY:0.9313,x:0.05,y:-0.05},0).wait(1).to({regX:628.3,regY:257.4,scaleX:1,scaleY:1,x:621.2,y:325.7},0).wait(113).to({_off:true},1).wait(1));

	// speach_bubble2_obj_
	this.speach_bubble2 = new lib.Scene_1_speach_bubble2();
	this.speach_bubble2.name = "speach_bubble2";
	this.speach_bubble2.setTransform(-0.05,0,1.0976,1.0976,0,0,0,89.5,66.6);
	this.speach_bubble2.depth = 0;
	this.speach_bubble2.isAttachedToCamera = 0
	this.speach_bubble2.isAttachedToMask = 0
	this.speach_bubble2.layerDepth = 0
	this.speach_bubble2.layerIndex = 2
	this.speach_bubble2.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.speach_bubble2).wait(1).to({x:0},0).wait(470).to({regX:7.2,regY:-68.4,scaleX:0.9313,scaleY:0.9313,x:0.05,y:-0.05},0).wait(1).to({regX:721.3,regY:512.3,scaleX:1,scaleY:1,x:714.2,y:580.6},0).wait(30).to({_off:true},1).wait(116));

	// speach_bubble1_obj_
	this.speach_bubble1 = new lib.Scene_1_speach_bubble1();
	this.speach_bubble1.name = "speach_bubble1";
	this.speach_bubble1.setTransform(-0.05,0,1.0976,1.0976,0,0,0,89.5,66.6);
	this.speach_bubble1.depth = 0;
	this.speach_bubble1.isAttachedToCamera = 0
	this.speach_bubble1.isAttachedToMask = 0
	this.speach_bubble1.layerDepth = 0
	this.speach_bubble1.layerIndex = 3
	this.speach_bubble1.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.speach_bubble1).wait(1).to({x:0},0).wait(425).to({regX:-343.4,regY:-18.4,scaleX:0.9254,scaleY:0.9254,y:-0.05},0).wait(1).to({regX:633.2,regY:245.1,scaleX:1,scaleY:1,x:976.6,y:263.45},0).wait(75).to({_off:true},1).wait(116));

	// both_obj_
	this.both = new lib.Scene_1_both();
	this.both.name = "both";
	this.both.setTransform(-0.05,0,1.0976,1.0976,0,0,0,89.5,66.6);
	this.both.depth = 0;
	this.both.isAttachedToCamera = 0
	this.both.isAttachedToMask = 0
	this.both.layerDepth = 0
	this.both.layerIndex = 4
	this.both.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.both).wait(1).to({x:0},0).wait(226).to({regX:-192.6,regY:-27.6,scaleX:0.8824,scaleY:0.8824,x:-0.05},0).wait(1).to({regX:643.1,regY:936.6,scaleX:1,scaleY:1,x:835.6,y:964.15},0).wait(88).to({_off:true},1).wait(302));

	// johnny_obj_
	this.johnny = new lib.Scene_1_johnny();
	this.johnny.name = "johnny";
	this.johnny.setTransform(667.4,483.15,1.0976,1.0976,0,0,0,697.6,506.8);
	this.johnny.depth = 0;
	this.johnny.isAttachedToCamera = 0
	this.johnny.isAttachedToMask = 0
	this.johnny.layerDepth = 0
	this.johnny.layerIndex = 5
	this.johnny.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.johnny).wait(2).to({y:483.1},0).wait(54).to({regX:695.1,regY:506.2,scaleX:1.0713,scaleY:1.0713,x:667.35,y:483.05},0).wait(67).to({regX:685.7,regY:504.4,scaleX:0.9814,scaleY:0.9814,y:483.1},0).wait(61).to({regX:405.2,regY:511.1,scaleX:1,scaleY:1,x:667.4,y:483.15},0).wait(191).to({regX:774.6,regY:530.4,scaleX:0.5183,scaleY:0.5183,x:667.35},0).wait(244));

	// girl_obj_
	this.girl = new lib.Scene_1_girl();
	this.girl.name = "girl";
	this.girl.setTransform(-0.05,0,1.0976,1.0976,0,0,0,89.5,66.6);
	this.girl.depth = 0;
	this.girl.isAttachedToCamera = 0
	this.girl.isAttachedToMask = 0
	this.girl.layerDepth = 0
	this.girl.layerIndex = 6
	this.girl.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.girl).wait(2).to({regY:66.7,y:0.05},0).wait(54).to({regX:72.2,regY:55.3,scaleX:1.0713,scaleY:1.0713,x:0,y:0},0).wait(67).to({regX:5.7,regY:12.2,scaleX:0.9814,scaleY:0.9814,y:0.05},0).wait(61).to({regX:-262.2,regY:27.9,scaleX:1,scaleY:1,y:-0.05},0).wait(133).to({regX:-8.3,regY:-4.8,scaleX:0.9878,scaleY:0.9878,x:0.05,y:0},0).wait(58).to({regX:-513,regY:-401.8,scaleX:0.5183,scaleY:0.5183},0).wait(1).to({regX:1267.3,regY:55,scaleX:1,scaleY:1,x:1780.35,y:456.8},0).wait(49).to({regX:-344.1,regY:-19.8,scaleX:0.9229,scaleY:0.9229,x:-0.05,y:0},0).wait(194));

	// background_obj_
	this.background = new lib.Scene_1_background();
	this.background.name = "background";
	this.background.setTransform(668.25,264,1.0976,1.0976,0,0,0,698.4,307.1);
	this.background.depth = 0;
	this.background.isAttachedToCamera = 0
	this.background.isAttachedToMask = 0
	this.background.layerDepth = 0
	this.background.layerIndex = 7
	this.background.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.background).wait(2).to({regY:307.2,y:264.05},0).wait(182).to({regX:406,regY:291.9,scaleX:1,scaleY:1,x:668.2,y:263.95},0).wait(133).to({regX:668.1,regY:262.4,scaleX:0.9878,scaleY:0.9878},0).wait(58).to({regX:776.2,regY:107.5,scaleX:0.5183,scaleY:0.5183,x:668.15},0).wait(244));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(-62,-662.7,2324.6,2178.6000000000004);
// library properties:
lib.properties = {
	id: '8510FADC23ABDB4096D925E264CB2F33',
	width: 1280,
	height: 720,
	fps: 30,
	color: "#000000",
	opacity: 1.00,
	manifest: [
		{src:"images/CachedBmp_2.png", id:"CachedBmp_2"},
		{src:"sounds/johnny_1.mp3", id:"johnny_1"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['8510FADC23ABDB4096D925E264CB2F33'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}

p._getProjectionMatrix = function(container, totalDepth) {	var focalLength = 528.25;
	var projectionCenter = { x : lib.properties.width/2, y : lib.properties.height/2 };
	var scale = (totalDepth + focalLength)/focalLength;
	var scaleMat = new createjs.Matrix2D;
	scaleMat.a = 1/scale;
	scaleMat.d = 1/scale;
	var projMat = new createjs.Matrix2D;
	projMat.tx = -projectionCenter.x;
	projMat.ty = -projectionCenter.y;
	projMat = projMat.prependMatrix(scaleMat);
	projMat.tx += projectionCenter.x;
	projMat.ty += projectionCenter.y;
	return projMat;
}
p._handleTick = function(event) {
	var cameraInstance = exportRoot.___camera___instance;
	if(cameraInstance !== undefined && cameraInstance.pinToObject !== undefined)
	{
		cameraInstance.x = cameraInstance.pinToObject.x + cameraInstance.pinToObject.pinOffsetX;
		cameraInstance.y = cameraInstance.pinToObject.y + cameraInstance.pinToObject.pinOffsetY;
		if(cameraInstance.pinToObject.parent !== undefined && cameraInstance.pinToObject.parent.depth !== undefined)
		cameraInstance.depth = cameraInstance.pinToObject.parent.depth + cameraInstance.pinToObject.pinOffsetZ;
	}
	stage._applyLayerZDepth(exportRoot);
}
p._applyLayerZDepth = function(parent)
{
	var cameraInstance = parent.___camera___instance;
	var focalLength = 528.25;
	var projectionCenter = { 'x' : 0, 'y' : 0};
	if(parent === exportRoot)
	{
		var stageCenter = { 'x' : lib.properties.width/2, 'y' : lib.properties.height/2 };
		projectionCenter.x = stageCenter.x;
		projectionCenter.y = stageCenter.y;
	}
	for(child in parent.children)
	{
		var layerObj = parent.children[child];
		if(layerObj == cameraInstance)
			continue;
		stage._applyLayerZDepth(layerObj, cameraInstance);
		if(layerObj.layerDepth === undefined)
			continue;
		if(layerObj.currentFrame != layerObj.parent.currentFrame)
		{
			layerObj.gotoAndPlay(layerObj.parent.currentFrame);
		}
		var matToApply = new createjs.Matrix2D;
		var cameraMat = new createjs.Matrix2D;
		var totalDepth = layerObj.layerDepth ? layerObj.layerDepth : 0;
		var cameraDepth = 0;
		if(cameraInstance && !layerObj.isAttachedToCamera)
		{
			var mat = cameraInstance.getMatrix();
			mat.tx -= projectionCenter.x;
			mat.ty -= projectionCenter.y;
			cameraMat = mat.invert();
			cameraMat.prependTransform(projectionCenter.x, projectionCenter.y, 1, 1, 0, 0, 0, 0, 0);
			cameraMat.appendTransform(-projectionCenter.x, -projectionCenter.y, 1, 1, 0, 0, 0, 0, 0);
			if(cameraInstance.depth)
				cameraDepth = cameraInstance.depth;
		}
		if(layerObj.depth)
		{
			totalDepth = layerObj.depth;
		}
		//Offset by camera depth
		totalDepth -= cameraDepth;
		if(totalDepth < -focalLength)
		{
			matToApply.a = 0;
			matToApply.d = 0;
		}
		else
		{
			if(layerObj.layerDepth)
			{
				var sizeLockedMat = stage._getProjectionMatrix(parent, layerObj.layerDepth);
				if(sizeLockedMat)
				{
					sizeLockedMat.invert();
					matToApply.prependMatrix(sizeLockedMat);
				}
			}
			matToApply.prependMatrix(cameraMat);
			var projMat = stage._getProjectionMatrix(parent, totalDepth);
			if(projMat)
			{
				matToApply.prependMatrix(projMat);
			}
		}
		layerObj.transformMatrix = matToApply;
	}
}
an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}

// Virtual camera API : 

an.VirtualCamera = new function() {
var _camera = new Object();
function VC(timeline) {
	this.timeline = timeline;
	this.camera = timeline.___camera___instance;
	this.centerX = lib.properties.width / 2;
	this.centerY = lib.properties.height / 2;
	this.camAxisX = this.camera.x;
	this.camAxisY = this.camera.y;
	if(timeline.___camera___instance == null || timeline.___camera___instance == undefined ) {
		timeline.___camera___instance = new cjs.MovieClip();
		timeline.___camera___instance.visible = false;
		timeline.___camera___instance.parent = timeline;
		timeline.___camera___instance.setTransform(this.centerX, this.centerY);
	}
	this.camera = timeline.___camera___instance;
}

VC.prototype.moveBy = function(x, y, z) {
z = typeof z !== 'undefined' ? z : 0;
	var position = this.___getCamPosition___();
	var rotAngle = this.getRotation()*Math.PI/180;
	var sinTheta = Math.sin(rotAngle);
	var cosTheta = Math.cos(rotAngle);
	var offX= x*cosTheta + y*sinTheta;
	var offY = y*cosTheta - x*sinTheta;
	this.camAxisX = this.camAxisX - x;
	this.camAxisY = this.camAxisY - y;
	var posX = position.x + offX;
	var posY = position.y + offY;
	this.camera.x = this.centerX - posX;
	this.camera.y = this.centerY - posY;
	this.camera.depth += z;
};

VC.prototype.setPosition = function(x, y, z) {
	z = typeof z !== 'undefined' ? z : 0;

	const MAX_X = 10000;
	const MIN_X = -10000;
	const MAX_Y = 10000;
	const MIN_Y = -10000;
	const MAX_Z = 10000;
	const MIN_Z = -5000;

	if(x > MAX_X)
	  x = MAX_X;
	else if(x < MIN_X)
	  x = MIN_X;
	if(y > MAX_Y)
	  y = MAX_Y;
	else if(y < MIN_Y)
	  y = MIN_Y;
	if(z > MAX_Z)
	  z = MAX_Z;
	else if(z < MIN_Z)
	  z = MIN_Z;

	var rotAngle = this.getRotation()*Math.PI/180;
	var sinTheta = Math.sin(rotAngle);
	var cosTheta = Math.cos(rotAngle);
	var offX= x*cosTheta + y*sinTheta;
	var offY = y*cosTheta - x*sinTheta;
	
	this.camAxisX = this.centerX - x;
	this.camAxisY = this.centerY - y;
	this.camera.x = this.centerX - offX;
	this.camera.y = this.centerY - offY;
	this.camera.depth = z;
};

VC.prototype.getPosition = function() {
	var loc = new Object();
	loc['x'] = this.centerX - this.camAxisX;
	loc['y'] = this.centerY - this.camAxisY;
	loc['z'] = this.camera.depth;
	return loc;
};

VC.prototype.resetPosition = function() {
	this.setPosition(0, 0);
};

VC.prototype.zoomBy = function(zoom) {
	this.setZoom( (this.getZoom() * zoom) / 100);
};

VC.prototype.setZoom = function(zoom) {
	const MAX_zoom = 10000;
	const MIN_zoom = 1;
	if(zoom > MAX_zoom)
	zoom = MAX_zoom;
	else if(zoom < MIN_zoom)
	zoom = MIN_zoom;
	this.camera.scaleX = 100 / zoom;
	this.camera.scaleY = 100 / zoom;
};

VC.prototype.getZoom = function() {
	return 100 / this.camera.scaleX;
};

VC.prototype.resetZoom = function() {
	this.setZoom(100);
};

VC.prototype.rotateBy = function(angle) {
	this.setRotation( this.getRotation() + angle );
};

VC.prototype.setRotation = function(angle) {
	const MAX_angle = 180;
	const MIN_angle = -179;
	if(angle > MAX_angle)
		angle = MAX_angle;
	else if(angle < MIN_angle)
		angle = MIN_angle;
	this.camera.rotation = -angle;
};

VC.prototype.getRotation = function() {
	return -this.camera.rotation;
};

VC.prototype.resetRotation = function() {
	this.setRotation(0);
};

VC.prototype.reset = function() {
	this.resetPosition();
	this.resetZoom();
	this.resetRotation();
	this.unpinCamera();
};
VC.prototype.setZDepth = function(zDepth) {
	const MAX_zDepth = 10000;
	const MIN_zDepth = -5000;
	if(zDepth > MAX_zDepth)
		zDepth = MAX_zDepth;
	else if(zDepth < MIN_zDepth)
		zDepth = MIN_zDepth;
	this.camera.depth = zDepth;
}
VC.prototype.getZDepth = function() {
	return this.camera.depth;
}
VC.prototype.resetZDepth = function() {
	this.camera.depth = 0;
}

VC.prototype.pinCameraToObject = function(obj, offsetX, offsetY, offsetZ) {

	offsetX = typeof offsetX !== 'undefined' ? offsetX : 0;

	offsetY = typeof offsetY !== 'undefined' ? offsetY : 0;

	offsetZ = typeof offsetZ !== 'undefined' ? offsetZ : 0;
	if(obj === undefined)
		return;
	this.camera.pinToObject = obj;
	this.camera.pinToObject.pinOffsetX = offsetX;
	this.camera.pinToObject.pinOffsetY = offsetY;
	this.camera.pinToObject.pinOffsetZ = offsetZ;
};

VC.prototype.setPinOffset = function(offsetX, offsetY, offsetZ) {
	if(this.camera.pinToObject != undefined) {
	this.camera.pinToObject.pinOffsetX = offsetX;
	this.camera.pinToObject.pinOffsetY = offsetY;
	this.camera.pinToObject.pinOffsetZ = offsetZ;
	}
};

VC.prototype.unpinCamera = function() {
	this.camera.pinToObject = undefined;
};
VC.prototype.___getCamPosition___ = function() {
	var loc = new Object();
	loc['x'] = this.centerX - this.camera.x;
	loc['y'] = this.centerY - this.camera.y;
	loc['z'] = this.depth;
	return loc;
};

this.getCamera = function(timeline) {
	timeline = typeof timeline !== 'undefined' ? timeline : null;
	if(timeline === null) timeline = exportRoot;
	if(_camera[timeline] == undefined)
	_camera[timeline] = new VC(timeline);
	return _camera[timeline];
}

this.getCameraAsMovieClip = function(timeline) {
	timeline = typeof timeline !== 'undefined' ? timeline : null;
	if(timeline === null) timeline = exportRoot;
	return this.getCamera(timeline).camera;
}
}


// Layer depth API : 

an.Layer = new function() {
	this.getLayerZDepth = function(timeline, layerName)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline." + layerName + ".depth; else 0;";
		return eval(script);
	}
	this.setLayerZDepth = function(timeline, layerName, zDepth)
	{
		const MAX_zDepth = 10000;
		const MIN_zDepth = -5000;
		if(zDepth > MAX_zDepth)
			zDepth = MAX_zDepth;
		else if(zDepth < MIN_zDepth)
			zDepth = MIN_zDepth;
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline." + layerName + ".depth = " + zDepth + ";";
		eval(script);
	}
	this.removeLayer = function(timeline, layerName)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline.removeChild(timeline." + layerName + ");";
		eval(script);
	}
	this.addNewLayer = function(timeline, layerName, zDepth)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		zDepth = typeof zDepth !== 'undefined' ? zDepth : 0;
		var layer = new createjs.MovieClip();
		layer.name = layerName;
		layer.depth = zDepth;
		layer.layerIndex = 0;
		timeline.addChild(layer);
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;