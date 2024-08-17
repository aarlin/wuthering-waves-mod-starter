"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.Deque = void 0);
const Log_1 = require("../Common/Log"),
	MINIMUM_GROW = 4,
	THREE_QUARTER = 0.75;
class Deque {
	constructor(t = MINIMUM_GROW) {
		(this.t7 = 0),
			(this.i7 = 0),
			(this.n6 = 0),
			(this.o7 = t),
			(this.r7 = new Array(t));
	}
	Clone(i) {
		this.Clear(), (this.r7.length = i.r7.length);
		for (let t = 0; t < i.Size; t++) {
			var s = i.r7[(i.t7 + t) % i.r7.length];
			this.r7[t] = s;
		}
		(this.n6 = i.Size), (this.i7 = i.Size);
	}
	get Size() {
		return this.n6;
	}
	AddFront(t) {
		if (this.n6 === this.r7.length) {
			let t = 2 * this.r7.length;
			t < this.r7.length + MINIMUM_GROW && (t = this.r7.length + MINIMUM_GROW),
				this.n7(t);
		}
		var i = (this.t7 - 1 + this.r7.length) % this.r7.length;
		(this.r7[i] = t), (this.t7 = i), this.n6++;
	}
	AddRear(t) {
		if (this.n6 === this.r7.length) {
			let t = 2 * this.r7.length;
			t < this.r7.length + MINIMUM_GROW && (t = this.r7.length + MINIMUM_GROW),
				this.n7(t);
		}
		(this.r7[this.i7] = t),
			(this.i7 = (this.i7 + 1) % this.r7.length),
			this.n6++;
	}
	get Front() {
		if (this.n6) return this.r7[this.t7];
		Log_1.Log.CheckError() && Log_1.Log.Error("Container", 15, "队列为空");
	}
	get Rear() {
		var t;
		if (this.n6)
			return (t = (this.i7 - 1 + this.r7.length) % this.r7.length), this.r7[t];
		Log_1.Log.CheckError() && Log_1.Log.Error("Container", 15, "队列为空");
	}
	RemoveFront() {
		var t, i, s;
		if (this.n6)
			return (
				(t = this.r7[this.t7]),
				(this.r7[this.t7] = void 0),
				(this.t7 = (this.t7 + 1) % this.r7.length),
				this.n6--,
				(i = this.r7.length) > MINIMUM_GROW &&
					i > this.o7 &&
					((s = Math.floor(i / 2)), this.n6 === s) &&
					(s = Math.floor(i * THREE_QUARTER)) > this.o7 &&
					this.n7(s),
				t
			);
		Log_1.Log.CheckError() && Log_1.Log.Error("Container", 3, "队列为空");
	}
	RemoveRear() {
		var t, i, s;
		if (this.n6)
			return (
				(i = (this.i7 - 1 + this.r7.length) % this.r7.length),
				(t = this.r7[i]),
				(this.r7[i] = void 0),
				(this.i7 = i),
				this.n6--,
				(i = this.r7.length) > MINIMUM_GROW &&
					i > this.o7 &&
					((s = Math.floor(i / 2)), this.n6 === s) &&
					(s = Math.floor(i * THREE_QUARTER)) > this.o7 &&
					this.n7(s),
				t
			);
		Log_1.Log.CheckError() && Log_1.Log.Error("Container", 15, "队列为空");
	}
	Get(t) {
		if (this.n6) {
			if (!(t < 0 || t >= this.n6))
				return this.r7[(this.t7 + t) % this.r7.length];
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Container",
					15,
					"下标越界",
					["index", t],
					["size", this.n6],
				);
		} else
			Log_1.Log.CheckError() && Log_1.Log.Error("Container", 15, "队列为空");
	}
	n7(t) {
		if (0 === this.n6) (this.r7.length = t), (this.t7 = 0), (this.i7 = 0);
		else {
			var i = this.r7.length;
			if (t < i)
				if (0 === this.t7) (this.r7.length = t), (this.i7 = this.i7 % t);
				else {
					var s = i - t,
						h = i - s;
					if (this.t7 < this.i7) {
						let i = 0;
						for (let t = h; t < this.i7; ++t)
							(this.r7[i++] = this.r7[t]), (this.r7[t] = void 0);
						h <= this.t7 && (this.t7 = (this.t7 + s) % t);
						s = this.i7 - h;
						(this.i7 = 0 < s ? s % t : this.i7 % t), void (this.r7.length = t);
					} else if (this.t7 >= this.i7) {
						var e = i - this.t7,
							r = t - e;
						for (let t = 0; t < e; ++t)
							(this.r7[r + t] = this.r7[this.t7 + t]),
								(this.r7[this.t7 + t] = void 0);
						(this.r7.length = t), (this.t7 = r);
					}
				}
			else if (((this.r7.length = t), 0 === this.i7)) this.i7 = this.n6;
			else if (this.t7 >= this.i7) {
				var o = i - this.t7,
					a = this.r7.length - o;
				for (let t = 0; t < o; ++t)
					(this.r7[a + t] = this.r7[this.t7 + t]),
						(this.r7[this.t7 + t] = void 0);
				this.t7 = a;
			}
		}
	}
	get Empty() {
		return 0 === this.n6;
	}
	Clear() {
		(this.r7.length = 0), (this.t7 = 0), (this.i7 = 0), (this.n6 = 0);
	}
}
exports.Deque = Deque;
//# sourceMappingURL=Deque.js.map
