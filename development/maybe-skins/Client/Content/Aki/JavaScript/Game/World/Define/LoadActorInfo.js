"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LoadActorInfo = void 0);
const zero = 0n;
class LoadActorInfo {
	constructor(o, t, r) {
		(this.EntityId = o), (this.Entity = t), (this.Actor = r);
	}
	IsValid() {
		return (
			this.EntityId !== zero &&
			void 0 !== this.Entity &&
			void 0 !== this.Actor &&
			!!this.Actor
		);
	}
	static Create(o, t = void 0, r = void 0) {
		return new LoadActorInfo(o, t, r);
	}
}
(exports.LoadActorInfo = LoadActorInfo).Undefined = new LoadActorInfo(
	zero,
	void 0,
	void 0,
);
