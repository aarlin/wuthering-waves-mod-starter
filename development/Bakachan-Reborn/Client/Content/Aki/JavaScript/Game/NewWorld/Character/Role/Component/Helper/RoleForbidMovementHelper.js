"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleForbidMovementHelper = void 0);
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
	MAX_PRIORITY = 3;
class LimitTagHandler {
	constructor(t, e, i, r) {
		(this.TagId = t),
			(this.Priority = e),
			(this.TagExist = i),
			(this.CallBack = r),
			(this.MutuallyTags = []),
			(this.Active = !1),
			(this.Priority = MathUtils_1.MathUtils.Clamp(this.Priority, 0, 3));
	}
}
class RoleForbidMovementHelper {
	constructor() {
		(this.TagComp = void 0),
			(this.pZo = new Array()),
			(this.CurrentActiveHandlers = new Array()),
			(this.Handlers = new Map()),
			(this.ytr = (t, e) => {
				var i = this.Handlers.get(t);
				if (
					i &&
					((i.TagExist = e), !i.TagExist || !i.Active) &&
					(i.TagExist || i.Active)
				)
					if (e) {
						let t, e;
						for (const s of i.MutuallyTags) {
							var r = this.Handlers.get(s);
							if (r) {
								if (r.Priority > i.Priority && r.Active) {
									t = r;
									break;
								}
								if (r.Priority <= i.Priority && r.Active) {
									e = r;
									break;
								}
							}
						}
						t || (e && this.ActiveHandler(e, !1), this.ActiveHandler(i, !0));
					} else {
						let t;
						this.ActiveHandler(i, !1);
						for (const e of i.MutuallyTags) {
							var s = this.Handlers.get(e);
							if (s && s.Priority <= i.Priority && s.TagExist) {
								t = s;
								break;
							}
						}
						t && this.ActiveHandler(t, !0);
					}
			});
	}
	RegisterMutuallyTags(t) {
		for (const i of t) {
			var e = this.Handlers.get(i);
			if (e) for (const i of t) i !== e.TagId && e.MutuallyTags.push(i);
		}
	}
	Awake() {
		for (const e of this.Handlers) {
			var t = this.TagComp.HasTag(e[0]);
			this.ytr(e[0], t);
		}
	}
	ActiveHandler(t, e) {
		(t.Active = e),
			t.CallBack(e),
			e
				? this.CurrentActiveHandlers.push(t)
				: (e = this.CurrentActiveHandlers.indexOf(t)) < 0 ||
					this.CurrentActiveHandlers.splice(e, 1);
	}
	CreateTagHandler(t, e, i) {
		var r = this.TagComp.HasTag(t);
		this.Handlers.set(t, new LimitTagHandler(t, e, r, i)),
			this.pZo.push(this.TagComp.ListenForTagAddOrRemove(t, this.ytr));
	}
	Clear() {
		(this.CurrentActiveHandlers.length = 0), this.Handlers.clear();
		for (const t of this.pZo) t.EndTask();
		this.pZo.length = 0;
	}
}
exports.RoleForbidMovementHelper = RoleForbidMovementHelper;
