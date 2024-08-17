"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ObjectSystem = void 0);
const Log_1 = require("../Common/Log"),
	Stats_1 = require("../Common/Stats");
class ObjectSystem {
	constructor() {}
	static Initialize() {
		return (
			(this.Objects.length = 0), (this.rY.length = 0), !(this.nY.length = 0)
		);
	}
	static IsValid(t) {
		var e;
		return (
			!!t &&
			void 0 !== t.Index &&
			void 0 !== t.Id &&
			(e = this.Objects[t.Index]) &&
			e.Id === t.Id
		);
	}
	static Create(t) {
		Stats_1.Stat.Enable && !this.sY.get(t) && this.sY.set(t, void 0);
		let e = void 0,
			s = 0,
			i = 0;
		if (this.Objects.length <= this.aY)
			(s = this.Objects.length),
				(e = new t(0, s)),
				this.Objects.push(e),
				this.rY.push(1),
				(i = 1);
		else {
			if (!(0 < this.nY.length))
				return void (
					Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"RenderEffect",
						3,
						"无法分配Object的Id，超出设计最大数量",
						["MaxIndex", this.aY],
						["Effects.length", this.Objects.length],
					)
				);
			(s = this.nY.pop()),
				(e = new t(0, s)),
				(this.Objects[s] = e),
				(i = ++this.rY[s]) > this.hY && ((i = 1), (this.rY[s] = i));
		}
		t = (s << this.VersionDigit) | i;
		return (e.Id = t), e;
	}
	static CreateExternal(t) {
		let e = 0,
			s = 0;
		if (this.Objects.length < this.aY)
			(e = this.Objects.length), this.Objects.push(t), this.rY.push(1), (s = 1);
		else {
			if (!(0 < this.nY.length))
				return void (
					Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"RenderEffect",
						3,
						"无法分配Object的Id，超出设计最大数量",
						["MaxIndex", this.aY],
						["Effects.length", this.Objects.length],
					)
				);
			(e = this.nY.pop()),
				(this.Objects[e] = t),
				(s = ++this.rY[e]) > this.hY && ((s = 1), (this.rY[e] = s));
		}
		var i = (e << this.VersionDigit) | s;
		return (t.Id = i), (t.Index = e), !0;
	}
	static Destroy(t) {
		return this.IsValid(t)
			? ((this.Objects[t.Index] = void 0), this.nY.push(t.Index), !0)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("Object", 1, "对象重复销毁", [
						"class",
						t.constructor.name,
					]),
				!1);
	}
}
((exports.ObjectSystem = ObjectSystem).sY = new WeakMap()),
	(ObjectSystem.lY = 32),
	(ObjectSystem._Y = 16),
	(ObjectSystem.VersionDigit = ObjectSystem.lY - ObjectSystem._Y),
	(ObjectSystem.aY = (1 << (ObjectSystem._Y - 1)) - 1),
	(ObjectSystem.hY = (1 << ObjectSystem.VersionDigit) - 1),
	(ObjectSystem.Objects = new Array()),
	(ObjectSystem.rY = new Array()),
	(ObjectSystem.nY = new Array());
//# sourceMappingURL=ObjectSystem.js.map
