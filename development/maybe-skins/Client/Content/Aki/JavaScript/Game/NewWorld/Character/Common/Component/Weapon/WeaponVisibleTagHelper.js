"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WeaponVisibleTagHelper = void 0);
const GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils");
class WeaponVisibleTagHelper {
	constructor() {
		(this.CZo = 0),
			(this.gZo = (s, i) => {
				var t = this.CZo;
				i ? this.CZo++ : this.CZo--,
					0 === t && 0 < this.CZo
						? this.fZo(!0, this.Owner)
						: 0 < t && 0 === this.CZo && this.fZo(!1, this.Owner);
			}),
			(this.Tags = []),
			(this.TagComp = void 0),
			(this.pZo = new Array()),
			(this.fZo = void 0),
			(this.Owner = void 0);
	}
	Init(s, i, t, o) {
		if (t) {
			this.Clear(),
				(this.CZo = 0),
				(this.TagComp = i),
				(this.fZo = o),
				(this.Owner = s);
			for (const s of t) {
				var e;
				"" !== s &&
					((e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(s)),
					this.Tags.push(e));
			}
			for (const s of this.Tags)
				i.HasTag(s) && this.CZo++,
					this.pZo.push(i.ListenForTagAddOrRemove(s, this.gZo));
			0 < this.CZo && this.fZo(!0, this.Owner);
		}
	}
	Clear() {
		(this.Owner = void 0), (this.TagComp = void 0), (this.fZo = void 0);
		for (const s of this.pZo) s.EndTask();
		(this.pZo.length = 0), (this.Tags.length = 0);
	}
}
exports.WeaponVisibleTagHelper = WeaponVisibleTagHelper;
